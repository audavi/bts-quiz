import { useState } from 'react';
import { loadHistory, clearHistory, getScoreTitle, formatDate, formatTime } from '../utils/history';
import type { QuizResult } from '../utils/history';

interface HistoryScreenProps {
  onBack: () => void;
}

export default function HistoryScreen({ onBack }: HistoryScreenProps) {
  const [history, setHistory] = useState<QuizResult[]>(() => loadHistory());
  const [confirmClear, setConfirmClear] = useState(false);

  const totalQuizzes = history.length;
  const bestPct = totalQuizzes > 0 ? Math.max(...history.map((r) => r.pct)) : 0;
  const avgPct = totalQuizzes > 0
    ? Math.round(history.reduce((sum, r) => sum + r.pct, 0) / totalQuizzes)
    : 0;
  const totalCorrect = history.reduce((sum, r) => sum + r.score, 0);
  const totalAnswered = history.reduce((sum, r) => sum + r.total, 0);

  function handleClear() {
    if (!confirmClear) { setConfirmClear(true); return; }
    clearHistory();
    setHistory([]);
    setConfirmClear(false);
  }

  return (
    <div className="min-h-screen star-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-slide-up space-y-5">

        {/* ── Header ── */}
        <div className="glass-card card-glow rounded-3xl p-7 sm:p-9">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-semibold
                         text-purple-700 dark:text-purple-300
                         hover:text-purple-950 dark:hover:text-white transition-colors"
            >
              ← Back
            </button>
            {totalQuizzes > 0 && (
              <button
                onClick={handleClear}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  confirmClear
                    ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-300/60 dark:border-red-600/40'
                    : 'text-purple-500/70 dark:text-purple-500/60 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                {confirmClear ? 'Tap again to confirm' : 'Clear History'}
              </button>
            )}
          </div>

          <div className="text-center mb-7">
            <div className="text-5xl mb-3 animate-float inline-block">📊</div>
            <h2 className="text-3xl font-black tracking-tight text-purple-950 dark:text-white mb-1">
              Your History
            </h2>
            <p className="text-purple-600/70 dark:text-purple-400/70 text-sm font-medium">
              All-time quiz stats
            </p>
          </div>

          {totalQuizzes === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🎵</div>
              <p className="text-purple-600/70 dark:text-purple-400/70 font-medium">
                No quizzes yet — take your first one!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: totalQuizzes, label: 'Quizzes Taken', emoji: '📝' },
                { value: `${bestPct}%`, label: 'Best Score', emoji: '🏆' },
                { value: `${avgPct}%`, label: 'Average Score', emoji: '📈' },
                { value: `${totalCorrect}/${totalAnswered}`, label: 'Total Correct', emoji: '✓' },
              ].map(({ value, label, emoji }) => (
                <div
                  key={label}
                  className="bg-purple-50/80 dark:bg-purple-950/40 rounded-2xl p-4 text-center
                             border border-purple-200/60 dark:border-purple-800/30"
                >
                  <div className="text-xl mb-1">{emoji}</div>
                  <div className="text-2xl font-black text-purple-950 dark:text-white">{value}</div>
                  <div className="text-purple-600/70 dark:text-purple-400/60 text-xs font-semibold uppercase tracking-wider mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Results list ── */}
        {history.length > 0 && (
          <div className="glass-card card-glow rounded-3xl p-6 sm:p-8">
            <h3 className="text-purple-950 dark:text-white font-bold text-lg mb-5 tracking-tight">
              Recent Attempts
            </h3>
            <div className="space-y-3">
              {history.map((result, idx) => {
                const { color } = getScoreTitle(result.pct);
                const barColor =
                  result.pct === 100 ? 'bg-amber-400'
                  : result.pct >= 80 ? 'bg-purple-500'
                  : result.pct >= 60 ? 'bg-blue-500'
                  : result.pct >= 40 ? 'bg-pink-400'
                  : 'bg-red-400';
                return (
                  <div
                    key={result.id}
                    className="rounded-2xl p-4 border
                               bg-purple-50/60 dark:bg-purple-950/30
                               border-purple-200/50 dark:border-purple-800/30
                               flex items-center gap-4"
                  >
                    <div className="text-2xl flex-shrink-0 w-8 text-center">{result.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-sm font-bold ${color}`}>{result.title}</span>
                        <span className="text-xs text-purple-500/70 dark:text-purple-400/60 flex-shrink-0">
                          {formatDate(result.date)} · {formatTime(result.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-purple-200/70 dark:bg-purple-900/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${barColor}`}
                            style={{ width: `${result.pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 flex-shrink-0">
                          {result.score}/{result.total} · {result.pct}%
                        </span>
                      </div>
                    </div>
                    {idx === 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50
                                       text-purple-600 dark:text-purple-300 border border-purple-300/50 dark:border-purple-700/40
                                       font-semibold flex-shrink-0">
                        Latest
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
