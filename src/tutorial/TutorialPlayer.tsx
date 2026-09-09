import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { parseSfen } from 'shogiops/sfen';
import type { SquareName } from 'shogiops/types';
import type { Position } from 'shogiops/variant/position';
import { Board } from '../board/Board';
import { applyMove, legalMoveDestsFrom, promotionChoice, STANDARD_RULES } from '../rules/position';
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
  const [selected, setSelected] = useState<SquareName | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'retry'>('idle');

  // Navigating between lesson routes reuses this component instance; reset state to match.
  if (lessonId !== loadedLessonId) {
    setLoadedLessonId(lessonId);
    setPos(lesson ? loadPosition(lesson.initialSfen) : null);
    setStepIndex(0);
    setSelected(null);
    setStatus('idle');
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
  const legalDests = status === 'idle' && selected ? legalMoveDestsFrom(pos, selected) : [];

  function resetStep() {
    if (!lesson) return;
    setPos(loadPosition(lesson.initialSfen));
    setSelected(null);
    setStatus('idle');
  }

  function handleSquareClick(square: SquareName) {
    if (status !== 'idle' || !pos) return;

    if (selected && legalDests.includes(square)) {
      const choice = promotionChoice(pos, selected, square);
      const next = pos.clone();
      applyMove(next, selected, square, choice === 'forced');
      setPos(next);
      setSelected(null);
      setStatus(step.targets.includes(square) ? 'success' : 'retry');
      return;
    }

    setSelected(square === step.from ? square : null);
  }

  function handleNext() {
    if (!lesson) return;
    if (isLastStep) {
      markLessonCompleted(lesson.id);
      navigate('/tutorial');
    } else {
      setStepIndex((i) => i + 1);
      setPos(loadPosition(lesson.initialSfen));
      setSelected(null);
      setStatus('idle');
    }
  }

  return (
    <div className="tutorial-player">
      <h2>{lesson.title}</h2>
      <p className="tutorial-summary">{lesson.summary}</p>
      <p className="tutorial-prompt">{step.prompt}</p>

      <Board pos={pos} selectedSquare={selected ?? undefined} legalDests={legalDests} onSquareClick={handleSquareClick} />

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

      <Link to="/tutorial">레슨 목록으로</Link>
    </div>
  );
}
