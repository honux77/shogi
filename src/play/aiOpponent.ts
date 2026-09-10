import { createEngineClient } from '../engine/engineClient';

export type Difficulty = 'easy' | 'normal' | 'hard';

interface DifficultySettings {
  skillLevel: number;
  movetime: number;
}

const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySettings> = {
  easy: { skillLevel: 3, movetime: 500 },
  normal: { skillLevel: 10, movetime: 1000 },
  hard: { skillLevel: 20, movetime: 2000 },
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: '쉬움',
  normal: '보통',
  hard: '어려움',
};

export interface AiOpponent {
  ready: Promise<void>;
  /** Requests a move given the game's USI move history so far. Resolves to a USI move, or "resign". */
  requestMove(moves: string[]): Promise<string>;
  terminate(): void;
}

export function createAiOpponent(difficulty: Difficulty): AiOpponent {
  const client = createEngineClient();
  const settings = DIFFICULTY_SETTINGS[difficulty];

  const ready = client.ready.then(() => {
    client.setOption('SkillLevel', settings.skillLevel);
  });

  return {
    ready,
    async requestMove(moves) {
      await ready;
      client.setPosition(moves);
      return client.go({ movetime: settings.movetime });
    },
    terminate() {
      client.terminate();
    },
  };
}
