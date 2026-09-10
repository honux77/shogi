export interface GoOptions {
  /** Milliseconds to think. */
  movetime?: number;
  /** Search depth limit, used instead of movetime for weaker/faster levels. */
  depth?: number;
}

export interface EngineClient {
  /** Resolves once the USI handshake (usi/usiok, isready/readyok) completes. */
  ready: Promise<void>;
  setOption(name: string, value: string | number): void;
  /** Sets the current position from the game's start plus a list of USI moves played so far. */
  setPosition(moves: string[]): void;
  /** Asks the engine to search and resolves with its chosen move in USI notation (or "resign"). */
  go(options: GoOptions): Promise<string>;
  terminate(): void;
}

const BESTMOVE_PREFIX = 'bestmove ';

export function createEngineClient(): EngineClient {
  const worker = new Worker(new URL('./usiWorker.js', import.meta.url), { type: 'classic' });

  let resolveReady: () => void;
  const ready = new Promise<void>((resolve) => {
    resolveReady = resolve;
  });

  let pendingBestmove: ((move: string) => void) | null = null;
  let sawUsiOk = false;

  worker.onmessage = (event: MessageEvent<string>) => {
    const line = event.data;
    if (!sawUsiOk && line === 'usiok') {
      sawUsiOk = true;
      worker.postMessage('isready');
      return;
    }
    if (line === 'readyok') {
      resolveReady();
      return;
    }
    if (line.startsWith(BESTMOVE_PREFIX)) {
      const move = line.slice(BESTMOVE_PREFIX.length).split(' ')[0];
      pendingBestmove?.(move);
      pendingBestmove = null;
    }
  };

  worker.postMessage('usi');

  return {
    ready,
    setOption(name, value) {
      worker.postMessage(`setoption name ${name} value ${value}`);
    },
    setPosition(moves) {
      const suffix = moves.length > 0 ? ` moves ${moves.join(' ')}` : '';
      worker.postMessage(`position startpos${suffix}`);
    },
    go({ movetime, depth }) {
      return new Promise((resolve) => {
        pendingBestmove = resolve;
        const constraint = depth != null ? `depth ${depth}` : `movetime ${movetime ?? 1000}`;
        worker.postMessage(`go ${constraint}`);
      });
    },
    terminate() {
      worker.terminate();
    },
  };
}
