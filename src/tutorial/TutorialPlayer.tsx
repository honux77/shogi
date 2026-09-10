import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { parseSfen } from 'shogiops/sfen';
import type { Role, SquareName } from 'shogiops/types';
import type { Position } from 'shogiops/variant/position';
import { Board } from '../board/Board';
import { PieceStand } from '../board/PieceStand';
import { PromotionPrompt } from '../board/PromotionPrompt';
import {
  applyDrop,
  applyMove,
  legalDropDestsFor,
  legalMoveDestsFrom,
  promotionChoice,
  STANDARD_RULES,
} from '../rules/position';
import { LESSONS } from './lessons';
import { markLessonCompleted } from './progress';

function loadPosition(sfen: string): Position {
  return parseSfen(STANDARD_RULES, sfen).unwrap();
}

export function TutorialPlayer() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const lesson = LESSONS.find((l) => l.id === lessonId);

  const [loadedLessonId, setLoadedLessonId] = useState(lessonId);
  const [pos, setPos] = useState<Position | null>(() => (lesson ? loadPosition(lesson.initialSfen) : null));
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'retry'>('idle');
  const [pendingPromotion, setPendingPromotion] = useState<{ from: SquareName; to: SquareName } | null>(null);

  // Navigating between lesson routes reuses this component instance; reset state to match.
  if (lessonId !== loadedLessonId) {
    setLoadedLessonId(lessonId);
    setPos(lesson ? loadPosition(lesson.initialSfen) : null);
    setStepIndex(0);
    setSelected(false);
    setStatus('idle');
    setPendingPromotion(null);
  }

  if (!lesson) {
    return (
      <div className="tutorial-player">
        <p>레슨을 찾을 수 없습니다.</p>
        <Link to="/tutorial">레슨 목록으로</Link>
      </div>
    );
  }

  if (!pos) return null;

  const step = lesson.steps[stepIndex];
  const isLastStep = stepIndex === lesson.steps.length - 1;
  const canAct = status === 'idle' && !pendingPromotion;
  const legalDests =
    canAct && selected
      ? step.kind === 'move'
        ? legalMoveDestsFrom(pos, step.from)
        : legalDropDestsFor(pos, 'sente', step.role)
      : [];

  function finishAction(reachedSquare: SquareName) {
    setSelected(false);
    setStatus(step.targets.includes(reachedSquare) ? 'success' : 'retry');
  }

  function resetStep() {
    if (!lesson) return;
    setPos(loadPosition(lesson.initialSfen));
    setSelected(false);
    setStatus('idle');
    setPendingPromotion(null);
  }

  function commitMove(from: SquareName, to: SquareName, promote: boolean) {
    if (!pos) return;
    const next = pos.clone();
    applyMove(next, from, to, promote);
    setPos(next);
    setPendingPromotion(null);
    finishAction(to);
  }

  function commitDrop(role: Role, to: SquareName) {
    if (!pos) return;
    const next = pos.clone();
    applyDrop(next, role, to);
    setPos(next);
    finishAction(to);
  }

  function handleSquareClick(square: SquareName) {
    if (!canAct || !pos) return;

    if (selected && legalDests.includes(square)) {
      if (step.kind === 'move') {
        const choice = promotionChoice(pos, step.from, square);
        if (choice === 'forced') commitMove(step.from, square, true);
        else if (choice === 'optional') setPendingPromotion({ from: step.from, to: square });
        else commitMove(step.from, square, false);
      } else {
        commitDrop(step.role, square);
      }
      return;
    }

    setSelected(step.kind === 'move' && square === step.from);
  }

  function handleHandPieceClick(role: Role) {
    if (!canAct || step.kind !== 'drop' || role !== step.role) return;
    setSelected(true);
  }

  function handleNext() {
    if (!lesson) return;
    if (isLastStep) {
      markLessonCompleted(lesson.id);
      navigate('/tutorial');
    } else {
      // A later step continues from wherever the previous step's move/drop left the position.
      setStepIndex((i) => i + 1);
      setSelected(false);
      setStatus('idle');
    }
  }

  return (
    <div className="tutorial-player">
      <h2>{lesson.title}</h2>
      <p className="tutorial-summary">{lesson.summary}</p>
      <p className="tutorial-prompt">{step.prompt}</p>

      <Board pos={pos} selectedSquare={step.kind === 'move' && selected ? step.from : undefined} legalDests={legalDests} onSquareClick={handleSquareClick} />

      <PieceStand
        pos={pos}
        color="sente"
        selectedRole={step.kind === 'drop' && selected ? step.role : undefined}
        canSelect={canAct && step.kind === 'drop'}
        onRoleClick={handleHandPieceClick}
      />

      <div className="tutorial-feedback">
        {status === 'success' && (
          <>
            <p className="tutorial-success">{step.successMessage}</p>
            <button type="button" onClick={handleNext}>
              {isLastStep ? '레슨 완료' : '다음 단계'}
            </button>
          </>
        )}
        {status === 'retry' && (
          <>
            <p>합법적인 수이지만, 이번 목표는 아니에요. 다시 시도해볼까요?</p>
            <button type="button" onClick={resetStep}>
              다시 시도
            </button>
          </>
        )}
      </div>

      {pendingPromotion && (
        <PromotionPrompt onChoose={(promote) => commitMove(pendingPromotion.from, pendingPromotion.to, promote)} />
      )}

      <Link to="/tutorial">레슨 목록으로</Link>
    </div>
  );
}
