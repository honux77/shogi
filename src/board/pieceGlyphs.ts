import type { Color, Role } from 'shogiops/types';

/** Conventional single/two-character kanji used on digital shogi sets. */
const ROLE_GLYPHS: Partial<Record<Role, string>> = {
  king: '玉',
  rook: '飛',
  bishop: '角',
  gold: '金',
  silver: '銀',
  knight: '桂',
  lance: '香',
  pawn: '歩',
  dragon: '龍',
  horse: '馬',
  promotedsilver: '全',
  promotedknight: '圭',
  promotedlance: '杏',
  tokin: 'と',
};

/** Sente's king is traditionally written 王 rather than 玉. */
export function pieceGlyph(color: Color, role: Role): string {
  if (role === 'king' && color === 'sente') return '王';
  return ROLE_GLYPHS[role] ?? role;
}

const PROMOTED_ROLES = new Set<Role>([
  'tokin',
  'promotedlance',
  'promotedsilver',
  'promotedknight',
  'horse',
  'dragon',
]);

/** Whether `role` is a promoted piece (used to color its glyph as cinnabar coral). */
export function isPromotedRole(role: Role): boolean {
  return PROMOTED_ROLES.has(role);
}
