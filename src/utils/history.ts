export interface QuizResult {
  id: string;
  date: string;
  total: number;
  score: number;
  pct: number;
  title: string;
  emoji: string;
}

export function getScoreTitle(pct: number): { title: string; emoji: string; color: string } {
  if (pct === 100) return { title: 'Perfect ARMY!',  emoji: '🏆', color: 'text-amber-600 dark:text-yellow-300' };
  if (pct >= 80)   return { title: 'BTS Expert!',    emoji: '💜', color: 'text-purple-700 dark:text-purple-300' };
  if (pct >= 60)   return { title: 'True ARMY!',     emoji: '🎵', color: 'text-blue-700 dark:text-blue-300'    };
  if (pct >= 40)   return { title: 'Getting There!', emoji: '🌸', color: 'text-pink-600 dark:text-pink-300'    };
  return             { title: 'Keep Listening!', emoji: '🎧', color: 'text-red-600 dark:text-red-300'     };
}

const STORAGE_KEY = 'bts-quiz-history';
const MAX_RESULTS = 50;

export function loadHistory(): QuizResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as QuizResult[];
  } catch {
    return [];
  }
}

export function saveResult(result: Omit<QuizResult, 'id' | 'date'>): QuizResult {
  const entry: QuizResult = {
    ...result,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: new Date().toISOString(),
  };
  const history = loadHistory();
  const updated = [entry, ...history].slice(0, MAX_RESULTS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // storage full — skip silently
  }
  return entry;
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}
