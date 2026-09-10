import type { Role, SquareName } from 'shogiops/types';

/** A step where the learner moves a piece already on the board. */
export interface MoveLessonStep {
  kind: 'move';
  /** Instruction shown to the learner for this step. */
  prompt: string;
  /** The single square the learner must select to act from. */
  from: SquareName;
  /** Any of these destinations completes the step. */
  targets: SquareName[];
  /** Shown once the step is completed. */
  successMessage: string;
}

/** A step where the learner drops a piece from their hand onto the board. */
export interface DropLessonStep {
  kind: 'drop';
  prompt: string;
  /** The hand piece the learner must select (always sente in lessons). */
  role: Role;
  /** Any of these destinations completes the step. */
  targets: SquareName[];
  successMessage: string;
}

export type LessonStep = MoveLessonStep | DropLessonStep;

export interface Lesson {
  id: string;
  title: string;
  /** Shown before the first step, introduces the piece/rule. */
  summary: string;
  /** Starting position for the lesson, as SFEN. */
  initialSfen: string;
  steps: LessonStep[];
}
