import { parseSfen } from 'shogiops/sfen';
import { describe, expect, it } from 'vitest';
import { legalMoveDestsFrom, STANDARD_RULES } from '../../rules/position';
import { LESSONS } from '../lessons';

describe('LESSONS data', () => {
  for (const lesson of LESSONS) {
    it(`${lesson.id}: initial position is legal and each step's targets are reachable`, () => {
      const result = parseSfen(STANDARD_RULES, lesson.initialSfen);
      expect(result.isOk).toBe(true);
      const pos = result.unwrap();

      for (const step of lesson.steps) {
        const dests = legalMoveDestsFrom(pos, step.from);
        for (const target of step.targets) {
          expect(dests).toContain(target);
        }
      }
    });
  }
});
