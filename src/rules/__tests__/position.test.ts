import { describe, expect, it } from 'vitest';
import { createInitialPosition, playUsi, toSfen } from '../position';

describe('createInitialPosition', () => {
  it('starts with sente to move and no game-ending condition', () => {
    const pos = createInitialPosition();
    expect(pos.turn).toBe('sente');
    expect(pos.isEnd()).toBe(false);
  });

  it('applies a legal opening move and advances the turn', () => {
    const pos = createInitialPosition();
    const sfenBefore = toSfen(pos);

    playUsi(pos, '7g7f');

    expect(pos.turn).toBe('gote');
    expect(toSfen(pos)).not.toBe(sfenBefore);
  });

  it('rejects an illegal move', () => {
    const pos = createInitialPosition();
    expect(() => playUsi(pos, '1a1b')).toThrow();
  });
});
