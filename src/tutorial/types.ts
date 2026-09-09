import type { SquareName } from 'shogiops/types';

export interface LessonStep {
  /** Instruction shown to the learner for this step. */
  prompt: string;
  /** The single square the learner must select to act from. */
  from: SquareName;
  /** Any of these destinations completes the step. */
  targets: SquareName[];
  /** Shown once the step is completed. */
  successMessage: string;
}

export interface Lesson {
  id: string;
  title: string;
  /** Shown before the first step, introduces the piece/rule. */
  summary: string;
  /** Starting position for the lesson, as SFEN. */
  initialSfen: string;
  steps: LessonStep[];
}
