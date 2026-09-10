import type { SquareName } from 'shogiops/types';

/** Traditional kanji numerals used for rank labels alongside the board. */
export const RANK_KANJI: Record<string, string> = {
  a: '一',
  b: '二',
  c: '三',
  d: '四',
  e: '五',
  f: '六',
  g: '七',
  h: '八',
  i: '九',
};

/**
 * Displays a square the way the board's own coordinate labels do: digit file + kanji rank
 * (e.g. "5g" -> "5七"), instead of the internal SquareName letter (`5g`) that no label on
 * screen actually shows.
 */
export function formatSquare(square: SquareName): string {
  const file = square.slice(0, -1);
  const rank = square.slice(-1);
  return `${file}${RANK_KANJI[rank] ?? rank}`;
}
