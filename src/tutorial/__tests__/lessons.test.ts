import { parseSfen } from 'shogiops/sfen';
import { describe, expect, it } from 'vitest';
import { applyDrop, legalDropDestsFor, legalMoveDestsFrom, STANDARD_RULES } from '../../rules/position';
import { LESSONS } from '../lessons';

describe('LESSONS data', () => {
  for (const lesson of LESSONS) {
    it(`${lesson.id}: initial position is legal and each step's targets are reachable`, () => {
      const result = parseSfen(STANDARD_RULES, lesson.initialSfen);
      expect(result.isOk).toBe(true);
      const pos = result.unwrap();

      for (const step of lesson.steps) {
        const dests =
          step.kind === 'move' ? legalMoveDestsFrom(pos, step.from) : legalDropDestsFor(pos, 'sente', step.role);
        for (const target of step.targets) {
          expect(dests).toContain(target);
        }
      }
    });
  }

  it('checkmate-puzzle: the target drop actually delivers checkmate', () => {
    const lesson = LESSONS.find((l) => l.id === 'checkmate-puzzle')!;
    const step = lesson.steps[0];
    if (step.kind !== 'drop') throw new Error('expected a drop step');

    const pos = parseSfen(STANDARD_RULES, lesson.initialSfen).unwrap();
    applyDrop(pos, step.role, step.targets[0]);

    expect(pos.isEnd()).toBe(true);
    expect(pos.outcome()).toEqual({ result: 'checkmate', winner: 'sente' });
  });
});
