const STORAGE_KEY = 'shogi.tutorial.completedLessons';

function readCompletedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
}

function writeCompletedIds(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage unavailable (e.g. private browsing) — progress just won't persist.
  }
}

export function isLessonCompleted(lessonId: string): boolean {
  return readCompletedIds().has(lessonId);
}

export function markLessonCompleted(lessonId: string): void {
  const ids = readCompletedIds();
  ids.add(lessonId);
  writeCompletedIds(ids);
}
