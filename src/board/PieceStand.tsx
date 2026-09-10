import type { Color, Role } from 'shogiops/types';
import type { Position } from 'shogiops/variant/position';
import { HAND_ROLES, handCount } from '../rules/position';
import { pieceGlyph } from './pieceGlyphs';
import './board.css';

interface PieceStandProps {
  pos: Position;
  color: Color;
  selectedRole?: Role;
  canSelect: boolean;
  onRoleClick: (role: Role) => void;
  /** Matches Board's orientation so hand pieces aren't shown upside-down for the viewer. Defaults to sente. */
  orientation?: Color;
}

export function PieceStand({ pos, color, selectedRole, canSelect, onRoleClick, orientation = 'sente' }: PieceStandProps) {
  const heldRoles = HAND_ROLES.map((role) => ({ role, count: handCount(pos, color, role) })).filter(
    ({ count }) => count > 0,
  );

  return (
    <div className={`piece-stand piece-stand-${color}`} aria-label={`${color === 'sente' ? '선수' : '후수'} 잡은 말`}>
      {heldRoles.length === 0 && <span className="piece-stand-empty">-</span>}
      {heldRoles.map(({ role, count }) => (
        <button
          key={role}
          type="button"
          className={['stand-piece', role === selectedRole && 'is-selected'].filter(Boolean).join(' ')}
          disabled={!canSelect}
          onClick={() => onRoleClick(role)}
        >
          <span className={`shogi-piece${color !== orientation ? ' piece-flipped' : ''}`}>{pieceGlyph(color, role)}</span>
          {count > 1 && <span className="stand-count">{count}</span>}
        </button>
      ))}
    </div>
  );
}
