import type { Color, SquareName } from 'shogiops/types';
import type { Position } from 'shogiops/variant/position';
import { pieceAt } from '../rules/position';
import { pieceGlyph } from './pieceGlyphs';
import './board.css';

const FILES_ASCENDING = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const RANKS_ASCENDING = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] as const;

interface BoardProps {
  pos: Position;
  selectedSquare?: SquareName;
  legalDests: SquareName[];
  lastMoveSquares?: SquareName[];
  onSquareClick: (square: SquareName) => void;
  /** Which side's pieces sit at the bottom of the board. Defaults to sente. */
  orientation?: Color;
}

export function Board({
  pos,
  selectedSquare,
  legalDests,
  lastMoveSquares,
  onSquareClick,
  orientation = 'sente',
}: BoardProps) {
  const legalSet = new Set(legalDests);
  const lastMoveSet = new Set(lastMoveSquares ?? []);
  const files = orientation === 'sente' ? [...FILES_ASCENDING].reverse() : FILES_ASCENDING;
  const ranks = orientation === 'sente' ? RANKS_ASCENDING : [...RANKS_ASCENDING].reverse();

  return (
    <div className="shogi-board" role="grid" aria-label="쇼기 보드">
      {ranks.map((rank) =>
        files.map((file) => {
          const square = `${file}${rank}` as SquareName;
          const piece = pieceAt(pos, square);
          const isSelected = square === selectedSquare;
          const isLegalDest = legalSet.has(square);
          const isLastMove = lastMoveSet.has(square);

          return (
            <button
              key={square}
              type="button"
              className={[
                'shogi-square',
                isSelected && 'is-selected',
                isLegalDest && 'is-legal-dest',
                isLastMove && 'is-last-move',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSquareClick(square)}
              aria-label={`${square}${piece ? ` ${piece.color} ${piece.role}` : ''}`}
            >
              {piece && (
                <span className={`shogi-piece${piece.color !== orientation ? ' piece-flipped' : ''}`}>
                  {pieceGlyph(piece.color, piece.role)}
                </span>
              )}
              {isLegalDest && !piece && <span className="dest-marker" />}
            </button>
          );
        }),
      )}
    </div>
  );
}
