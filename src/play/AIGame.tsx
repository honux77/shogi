import { useEffect, useRef, useState } from 'react';
import { usiToSquareNames } from 'shogiops/compat';
import type { Color, Role, SquareName } from 'shogiops/types';
import type { Position } from 'shogiops/variant/position';
import { Board } from '../board/Board';
import { PieceStand } from '../board/PieceStand';
import { PromotionPrompt } from '../board/PromotionPrompt';
import {
  applyDrop,
  applyMove,
  createInitialPosition,
  describeUsiMove,
  legalDropDestsFor,
  legalMoveDestsFrom,
  pieceAt,
  playUsi,
  promotionChoice,
} from '../rules/position';
import { createAiOpponent, DIFFICULTY_LABELS, type AiOpponent, type Difficulty } from './aiOpponent';

type Selection = { kind: 'square'; square: SquareName } | { kind: 'drop'; color: Color; role: Role } | null;

const RESULT_LABELS: Record<string, string> = {
  checkmate: '외통(체크메이트)',
  stalemate: '움직일 수 없음',
  bareKing: '옥이 남지 않음',
  kingsLost: '옥이 잡힘',
  tryRule: '트라이 규칙',
  draw: '무승부',
};

const COLOR_LABELS: Record<Color, string> = { sente: '선수(先手)', gote: '후수(後手)' };
const DIFFICULTIES: Difficulty[] = ['easy', 'normal', 'hard'];

export function AIGame() {
  const [phase, setPhase] = useState<'setup' | 'playing'>('setup');
  const [humanColor, setHumanColor] = useState<Color>('sente');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');

  // `positions[0]` is the game's start; `positions[i]` is the position after the i-th played move
  // (so `history[i-1]`/`positions[i-1]` is the move/position-before for `positions[i]`). Keeping
  // every snapshot (instead of just the current one) is what makes 무르기(undo) straightforward.
  const [positions, setPositions] = useState<Position[]>(() => [createInitialPosition()]);
  const [history, setHistory] = useState<string[]>([]);
  const [selection, setSelection] = useState<Selection>(null);
  const [legalDests, setLegalDests] = useState<SquareName[]>([]);
  const [lastMoveSquares, setLastMoveSquares] = useState<SquareName[]>([]);
  const [pendingPromotion, setPendingPromotion] = useState<{ from: SquareName; to: SquareName } | null>(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [resignedColor, setResignedColor] = useState<Color | null>(null);

  const opponentRef = useRef<AiOpponent | null>(null);
  const pos = positions[positions.length - 1];
  const aiColor: Color = humanColor === 'sente' ? 'gote' : 'sente';
  const outcome = pos.outcome();
  const gameOver = outcome != null || resignedColor != null;
  const canAct = !gameOver && !pendingPromotion && !aiThinking && pos.turn === humanColor;
  const canUndo = canAct && positions.length > 1;

  useEffect(() => {
    return () => opponentRef.current?.terminate();
  }, []);

  // Ask the engine to move whenever it's the AI's turn. `aiThinking` is deliberately NOT a
  // dependency: setting it inside this effect would otherwise re-run the effect (since it's a
  // state change on the same component), whose cleanup would then cancel the request it just sent.
  useEffect(() => {
    if (phase !== 'playing' || gameOver || pos.turn === humanColor) return;
    const opponent = opponentRef.current;
    if (!opponent) return;

    let cancelled = false;
    setAiThinking(true);
    opponent.requestMove(history).then((usiMove) => {
      if (cancelled) return;
      setAiThinking(false);
      if (usiMove === 'resign') {
        setResignedColor(aiColor);
        return;
      }
      const next = pos.clone();
      playUsi(next, usiMove);
      setPositions((ps) => [...ps, next]);
      setHistory((h) => [...h, usiMove]);
      setLastMoveSquares(usiToSquareNames(usiMove));
      setSelection(null);
      setLegalDests([]);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, pos, humanColor, aiColor, gameOver]);

  function clearSelection() {
    setSelection(null);
    setLegalDests([]);
  }

  function commitMove(from: SquareName, to: SquareName, promote: boolean) {
    const next = pos.clone();
    const usi = applyMove(next, from, to, promote);
    setPositions((ps) => [...ps, next]);
    setHistory((h) => [...h, usi]);
    setLastMoveSquares([from, to]);
    clearSelection();
    setPendingPromotion(null);
  }

  function commitDrop(role: Role, to: SquareName) {
    const next = pos.clone();
    const usi = applyDrop(next, role, to);
    setPositions((ps) => [...ps, next]);
    setHistory((h) => [...h, usi]);
    setLastMoveSquares([to]);
    clearSelection();
  }

  function handleSquareClick(square: SquareName) {
    if (!canAct) return;

    if (selection?.kind === 'square' && legalDests.includes(square)) {
      const choice = promotionChoice(pos, selection.square, square);
      if (choice === 'forced') commitMove(selection.square, square, true);
      else if (choice === 'optional') setPendingPromotion({ from: selection.square, to: square });
      else commitMove(selection.square, square, false);
      return;
    }

    if (selection?.kind === 'drop' && legalDests.includes(square)) {
      commitDrop(selection.role, square);
      return;
    }

    const piece = pieceAt(pos, square);
    if (piece && piece.color === humanColor) {
      setSelection({ kind: 'square', square });
      setLegalDests(legalMoveDestsFrom(pos, square));
    } else {
      clearSelection();
    }
  }

  function handleHandPieceClick(color: Color, role: Role) {
    if (!canAct || color !== humanColor) return;
    setSelection({ kind: 'drop', color, role });
    setLegalDests(legalDropDestsFor(pos, color, role));
  }

  function handleUndo() {
    if (!canUndo) return;
    // Step back over the AI's reply, then one more ply for the human move that preceded it.
    let n = positions.length - 1;
    while (n > 0 && positions[n - 1].turn === aiColor) n--;
    if (n > 0) n--;
    const newHistory = history.slice(0, n);
    setPositions(positions.slice(0, n + 1));
    setHistory(newHistory);
    setLastMoveSquares(newHistory.length > 0 ? usiToSquareNames(newHistory[newHistory.length - 1]) : []);
    clearSelection();
  }

  function handleStart() {
    opponentRef.current?.terminate();
    opponentRef.current = createAiOpponent(difficulty);
    setPositions([createInitialPosition()]);
    setHistory([]);
    clearSelection();
    setLastMoveSquares([]);
    setPendingPromotion(null);
    setResignedColor(null);
    setPhase('playing');
  }

  function handleBackToSetup() {
    opponentRef.current?.terminate();
    opponentRef.current = null;
    setPhase('setup');
  }

  if (phase === 'setup') {
    return (
      <div className="ai-game-setup">
        <h2>AI와 대국</h2>
        <fieldset>
          <legend>내 기물</legend>
          {(['sente', 'gote'] as const).map((color) => (
            <label key={color}>
              <input
                type="radio"
                name="color"
                checked={humanColor === color}
                onChange={() => setHumanColor(color)}
              />
              {COLOR_LABELS[color]}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>난이도</legend>
          {DIFFICULTIES.map((level) => (
            <label key={level}>
              <input
                type="radio"
                name="difficulty"
                checked={difficulty === level}
                onChange={() => setDifficulty(level)}
              />
              {DIFFICULTY_LABELS[level]}
            </label>
          ))}
        </fieldset>
        <button type="button" onClick={handleStart}>
          대국 시작
        </button>
      </div>
    );
  }

  return (
    <div className="ai-game">
      <div className="ai-game-board">
        <PieceStand pos={pos} color={aiColor} canSelect={false} onRoleClick={() => {}} orientation={humanColor} />

        <Board
          pos={pos}
          selectedSquare={selection?.kind === 'square' ? selection.square : undefined}
          legalDests={legalDests}
          lastMoveSquares={lastMoveSquares}
          onSquareClick={handleSquareClick}
          orientation={humanColor}
        />

        <PieceStand
          pos={pos}
          color={humanColor}
          selectedRole={selection?.kind === 'drop' ? selection.role : undefined}
          canSelect={canAct}
          onRoleClick={(role) => handleHandPieceClick(humanColor, role)}
          orientation={humanColor}
        />

        <div className="game-status">
          {resignedColor ? (
            <p>
              {COLOR_LABELS[resignedColor]}가 기권했습니다 — {COLOR_LABELS[resignedColor === 'sente' ? 'gote' : 'sente']} 승
            </p>
          ) : outcome ? (
            <p>
              대국 종료: {RESULT_LABELS[outcome.result] ?? outcome.result}
              {outcome.winner && ` — ${COLOR_LABELS[outcome.winner]} 승`}
            </p>
          ) : aiThinking ? (
            <p>AI가 생각 중...</p>
          ) : (
            <p>{pos.turn === humanColor ? '내 차례' : '상대 차례'}</p>
          )}
          <button type="button" onClick={handleUndo} disabled={!canUndo}>
            무르기
          </button>
          <button type="button" onClick={handleBackToSetup}>
            새 대국
          </button>
        </div>
      </div>

      <ol className="kifu-list" aria-label="기보">
        {history.map((usi, i) => (
          <li key={i}>{describeUsiMove(positions[i], usi)}</li>
        ))}
      </ol>

      {pendingPromotion && (
        <PromotionPrompt onChoose={(promote) => commitMove(pendingPromotion.from, pendingPromotion.to, promote)} />
      )}
    </div>
  );
}
