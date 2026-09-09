import { parseSfen } from 'shogiops/sfen';
import { describe, expect, it } from 'vitest';
import {
  applyDrop,
  applyMove,
  createInitialPosition,
  handCount,
  legalDropDestsFor,
  legalMoveDestsFrom,
  promotionChoice,
  STANDARD_RULES,
} from '../position';

describe('legalMoveDestsFrom', () => {
  it("lists a rook pawn's single forward step from the initial position", () => {
    const pos = createInitialPosition();
    expect(legalMoveDestsFrom(pos, '7g')).toEqual(['7f']);
  });

  it('returns empty for a square with no piece', () => {
    const pos = createInitialPosition();
    expect(legalMoveDestsFrom(pos, '5e')).toEqual([]);
  });
});

describe('promotionChoice', () => {
  it('is "none" for an ordinary move outside the promotion zone', () => {
    const pos = createInitialPosition();
    expect(promotionChoice(pos, '7g', '7f')).toBe('none');
  });

  it('is "optional" when a promotable piece enters the promotion zone', () => {
    const pos = createInitialPosition();
    applyMove(pos, '7g', '7f', false);
    applyMove(pos, '3c', '3d', false);
    expect(promotionChoice(pos, '8h', '2b')).toBe('optional');
  });

  it('is "forced" when a pawn would otherwise have no further moves', () => {
    const sfen = '8k/4P4/9/9/9/9/9/9/4K4 b - 1';
    const pos = parseSfen(STANDARD_RULES, sfen).unwrap();
    expect(promotionChoice(pos, '5b', '5a')).toBe('forced');
  });
});

describe('applyMove / applyDrop', () => {
  it('captures into hand and lets the capturing side drop it back', () => {
    const pos = createInitialPosition();
    applyMove(pos, '7g', '7f', false);
    applyMove(pos, '3c', '3d', false);
    applyMove(pos, '8h', '2b', true);
    applyMove(pos, '8c', '8d', false);

    expect(handCount(pos, 'sente', 'bishop')).toBe(1);
    expect(legalDropDestsFor(pos, 'sente', 'bishop')).toContain('5e');

    applyDrop(pos, 'bishop', '5e');
    expect(handCount(pos, 'sente', 'bishop')).toBe(0);
  });

  it('rejects a forced-promotion move without promoting', () => {
    const sfen = '8k/4P4/9/9/9/9/9/9/4K4 b - 1';
    const pos = parseSfen(STANDARD_RULES, sfen).unwrap();
    expect(() => applyMove(pos, '5b', '5a', false)).toThrow();
  });

  it('rejects an illegal drop (nifu: two pawns on the same file)', () => {
    const sfen = '8k/9/9/9/4P4/9/9/9/4K4 b P 1';
    const pos = parseSfen(STANDARD_RULES, sfen).unwrap();
    expect(() => applyDrop(pos, 'pawn', '5f')).toThrow();
  });
});
