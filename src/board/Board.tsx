import type { SquareName } from 'shogiops/types';
import type { Position } from 'shogiops/variant/position';
import { pieceAt } from '../rules/position';
import { pieceGlyph } from './pieceGlyphs';
import './board.css';

const FILES = [9, 8, 7, 6, 5, 4, 3, 2, 1] as const;
const RANKS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] as const;

interface BoardProps {
  pos: Position;
  selectedSquare?: SquareName;
  legalDests: SquareName[];
  lastMoveSquares?: SquareName[];
  onSquareClick: (square: SquareName) => void;
}

export function Board({ pos, selectedSquare, legalDests, lastMoveSquares, onSquareClick }: BoardProps) {
  const legalSet = new Set(legalDests);
  const lastMoveSet = new Set(lastMoveSquares ?? []);

  return (
    <div className="shogi-board" role="grid" aria-label="쇼기 보드">
      {RANKS.map((rank) =>
        FILES.map((file) => {
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
                <span className={`shogi-piece piece-${piece.color}`}>{pieceGlyph(piece.color, piece.role)}</span>
              )}
              {isLegalDest && !piece && <span className="dest-marker" />}
            </button>
          );
        }),
      )}
    </div>
  );
}
