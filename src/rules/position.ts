import { initialSfen, makeSfen, parseSfen } from 'shogiops/sfen';
import type { Rules } from 'shogiops/types';
import { parseUsi } from 'shogiops/util';
import type { Position } from 'shogiops/variant/position';

/** Standard 9x9 shogi rules, as opposed to shogiops's other supported variants. */
export const STANDARD_RULES: Rules = 'standard';

export function createInitialPosition(): Position {
  const sfen = initialSfen(STANDARD_RULES);
  return parseSfen(STANDARD_RULES, sfen).unwrap();
}

export function playUsi(pos: Position, usi: string): void {
  const move = parseUsi(usi);
  if (!move) throw new Error(`Invalid USI move: ${usi}`);
  if (!pos.isLegal(move)) throw new Error(`Illegal move: ${usi}`);
  pos.play(move);
}

export function toSfen(pos: Position): string {
  return makeSfen(pos);
}
