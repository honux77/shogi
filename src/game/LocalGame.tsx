import { useState } from 'react';
import type { Color, Role, SquareName } from 'shogiops/types';
import type { Position } from 'shogiops/variant/position';
import { Board } from '../board/Board';
import { PieceStand } from '../board/PieceStand';
import { PromotionPrompt } from '../board/PromotionPrompt';
import {
  applyDrop,
  applyMove,
  createInitialPosition,
  legalDropDestsFor,
  legalMoveDestsFrom,
  pieceAt,
  promotionChoice,
} from '../rules/position';

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

export function LocalGame() {
  const [pos, setPos] = useState<Position>(() => createInitialPosition());
  const [selection, setSelection] = useState<Selection>(null);
  const [legalDests, setLegalDests] = useState<SquareName[]>([]);
  const [lastMoveSquares, setLastMoveSquares] = useState<SquareName[]>([]);
  const [pendingPromotion, setPendingPromotion] = useState<{ from: SquareName; to: SquareName } | null>(null);

  const outcome = pos.outcome();

  function clearSelection() {
    setSelection(null);
    setLegalDests([]);
  }

  function commitMove(from: SquareName, to: SquareName, promote: boolean) {
    const next = pos.clone();
    applyMove(next, from, to, promote);
    setPos(next);
    setLastMoveSquares([from, to]);
    clearSelection();
    setPendingPromotion(null);
  }

  function commitDrop(role: Role, to: SquareName) {
    const next = pos.clone();
    applyDrop(next, role, to);
    setPos(next);
    setLastMoveSquares([to]);
    clearSelection();
  }

  function handleSquareClick(square: SquareName) {
    if (outcome || pendingPromotion) return;

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
    if (piece && piece.color === pos.turn) {
      setSelection({ kind: 'square', square });
      setLegalDests(legalMoveDestsFrom(pos, square));
    } else {
      clearSelection();
    }
  }

  function handleHandPieceClick(color: Color, role: Role) {
    if (outcome || pendingPromotion || color !== pos.turn) return;
    setSelection({ kind: 'drop', color, role });
    setLegalDests(legalDropDestsFor(pos, color, role));
  }

  function handleNewGame() {
    setPos(createInitialPosition());
    clearSelection();
    setLastMoveSquares([]);
    setPendingPromotion(null);
  }

  return (
    <div className="local-game">
      <PieceStand
        pos={pos}
        color="gote"
        selectedRole={selection?.kind === 'drop' && selection.color === 'gote' ? selection.role : undefined}
        canSelect={!outcome && !pendingPromotion && pos.turn === 'gote'}
        onRoleClick={(role) => handleHandPieceClick('gote', role)}
      />

      <Board
        pos={pos}
        selectedSquare={selection?.kind === 'square' ? selection.square : undefined}
        legalDests={legalDests}
        lastMoveSquares={lastMoveSquares}
        onSquareClick={handleSquareClick}
      />

      <PieceStand
        pos={pos}
        color="sente"
        selectedRole={selection?.kind === 'drop' && selection.color === 'sente' ? selection.role : undefined}
        canSelect={!outcome && !pendingPromotion && pos.turn === 'sente'}
        onRoleClick={(role) => handleHandPieceClick('sente', role)}
      />

      <div className="game-status">
        {outcome ? (
          <p>
            대국 종료: {RESULT_LABELS[outcome.result] ?? outcome.result}
            {outcome.winner && ` — ${COLOR_LABELS[outcome.winner]} 승`}
          </p>
        ) : (
          <p>{COLOR_LABELS[pos.turn]} 차례</p>
        )}
        <button type="button" onClick={handleNewGame}>
          새 대국
        </button>
      </div>

      {pendingPromotion && (
        <PromotionPrompt
          onChoose={(promote) => commitMove(pendingPromotion.from, pendingPromotion.to, promote)}
        />
      )}
    </div>
  );
}
