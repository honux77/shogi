import { shogigroundDropDests, shogigroundMoveDests } from 'shogiops/compat';
import { initialSfen, makeSfen, parseSfen } from 'shogiops/sfen';
import type { Color, Piece, Role, Rules, SquareName } from 'shogiops/types';
import { makeUsi, parseSquareName, parseUsi } from 'shogiops/util';
import type { Position } from 'shogiops/variant/position';
import { dimensions, handRoles, pieceCanPromote, pieceForcePromote } from 'shogiops/variant/util';

/** Standard 9x9 shogi rules, as opposed to shogiops's other supported variants. */
export const STANDARD_RULES: Rules = 'standard';

/** Hand piece roles in conventional display order (most to least valuable). */
export const HAND_ROLES: Role[] = handRoles(STANDARD_RULES);

export function boardDimensions(): { files: number; ranks: number } {
  return dimensions(STANDARD_RULES);
}

export function createInitialPosition(): Position {
  const sfen = initialSfen(STANDARD_RULES);
  return parseSfen(STANDARD_RULES, sfen).unwrap();
}

export function toSfen(pos: Position): string {
  return makeSfen(pos);
}

export function pieceAt(pos: Position, square: SquareName): Piece | undefined {
  return pos.board.get(parseSquareName(square));
}

export function handCount(pos: Position, color: Color, role: Role): number {
  return pos.hands.color(color).get(role);
}

/** Legal destination squares for the piece currently on `from`, empty if none/not movable. */
export function legalMoveDestsFrom(pos: Position, from: SquareName): SquareName[] {
  return shogigroundMoveDests(pos).get(from) ?? [];
}

/** Legal destination squares for dropping `role` from `color`'s hand. */
export function legalDropDestsFor(pos: Position, color: Color, role: Role): SquareName[] {
  return shogigroundDropDests(pos).get(`${color} ${role}`) ?? [];
}

export type PromotionChoice = 'forced' | 'optional' | 'none';

/** Whether moving the piece on `from` to `to` triggers a promotion prompt. */
export function promotionChoice(pos: Position, from: SquareName, to: SquareName): PromotionChoice {
  const fromSq = parseSquareName(from);
  const toSq = parseSquareName(to);
  const piece = pos.board.get(fromSq);
  if (!piece) return 'none';
  if (pieceForcePromote(STANDARD_RULES)(piece, toSq)) return 'forced';
  const capture = pos.board.get(toSq);
  if (pieceCanPromote(STANDARD_RULES)(piece, fromSq, toSq, capture)) return 'optional';
  return 'none';
}

/** Plays a normal (board-to-board) move, mutating `pos`. Returns its USI notation. */
export function applyMove(pos: Position, from: SquareName, to: SquareName, promotion: boolean): string {
  const move = { from: parseSquareName(from), to: parseSquareName(to), promotion };
  if (!pos.isLegal(move)) throw new Error(`Illegal move: ${from}${to}${promotion ? '+' : ''}`);
  pos.play(move);
  return makeUsi(move);
}

/** Plays a drop-from-hand move, mutating `pos`. Returns its USI notation. */
export function applyDrop(pos: Position, role: Role, to: SquareName): string {
  const move = { role, to: parseSquareName(to) };
  if (!pos.isLegal(move)) throw new Error(`Illegal drop: ${role}*${to}`);
  pos.play(move);
  return makeUsi(move);
}

export function playUsi(pos: Position, usi: string): void {
  const move = parseUsi(usi);
  if (!move) throw new Error(`Invalid USI move: ${usi}`);
  if (!pos.isLegal(move)) throw new Error(`Illegal move: ${usi}`);
  pos.play(move);
}

