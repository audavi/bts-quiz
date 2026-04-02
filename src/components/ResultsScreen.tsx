import { useEffect, useRef, useState } from 'react';
import type { Question } from '../data/questions';
import { categoryLabels } from '../data/questions';
import { getScoreTitle } from '../utils/history';

interface ResultsScreenProps {
  questions: Question[];
  answers: (number | null)[];
  onRestart: () => void;
  onViewHistory: () => void;
}

function useCountUp(target: number, duration = 1200): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setCount(0);
    if (target === 0) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return count;
}

export default function ResultsScreen({ questions, answers, onRestart, onViewHistory }: ResultsScreenProps) {
  const score = answers.filter((a, i) => a === questions[i].correctIndex).length;
  const pct   = Math.round((score / questions.length) * 100);
  const { title, emoji, color } = getScoreTitle(pct);

  const animatedScore = useCountUp(score);
  const animatedPct   = useCountUp(pct);

  const [copied, setCopied] = useState(false);

  function handleShare() {
    const text =
      `BTS Quiz result: ${score}/${questions.length} (${pct}%) — ${title} ${emoji}\n` +
      `Think you can beat me? 💜 #BTSQuiz #ARMY`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const categoryBreakdown = (['trivia', 'song-title', 'album'] as const)
    .map((cat) => {
      const catQs = questions
        .map((q, i) => ({ q, i }))
        .filter(({ q }) => q.category === cat);
      if (catQs.length === 0) return null;
      const correct = catQs.filter(({ i }) => answers[i] === questions[i].correctIndex).length;
      return { cat, correct, total: catQs.length };
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen star-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-slide-up space-y-5">

        {/* ── Score card ── */}
        <div className="glass-card card-glow rounded-3xl p-7 sm:p-9 text-center">
          <div className="text-7xl mb-4 animate-float inline-block">{emoji}</div>
          <h2 className={`text-4xl font-black tracking-tight mb-1 ${color}`}>{title}</h2>
          <p className="text-purple-600/70 dark:text-purple-400/70 text-sm font-medium tracking-wide mb-7">
            Here's how you did
          </p>

          {/* Stat trio */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-black text-gradient-gold stat-number">{animatedScore}</div>
              <div className="text-purple-600/70 dark:text-purple-400/70 text-xs font-semibold uppercase tracking-wider mt-1.5">Correct</div>
            </div>
            <div className="text-purple-400 dark:text-purple-700 text-2xl font-light">/</div>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-black text-purple-950/80 dark:text-white/80">{questions.length}</div>
              <div className="text-purple-600/70 dark:text-purple-400/70 text-xs font-semibold uppercase tracking-wider mt-1.5">Total</div>
            </div>
            <div className="text-purple-400 dark:text-purple-700 text-2xl font-light">·</div>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-black text-purple-700 dark:text-purple-300">{animatedPct}%</div>
              <div className="text-purple-600/70 dark:text-purple-400/70 text-xs font-semibold uppercase tracking-wider mt-1.5">Score</div>
            </div>
          </div>

          {/* Category breakdown */}
          {categoryBreakdown.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-7">
              {categoryBreakdown.map((item) => {
                if (!item) return null;
                const barPct = Math.round((item.correct / item.total) * 100);
                return (
                  <div
                    key={item.cat}
                    className="bg-purple-50/80 dark:bg-purple-950/40 rounded-2xl p-4 text-left
                               border border-purple-200/60 dark:border-purple-800/30"
                  >
                    <div className="text-xs text-purple-600/70 dark:text-purple-400/70 font-semibold uppercase tracking-wider mb-1.5">
                      {categoryLabels[item.cat]}
                    </div>
                    <div className="text-purple-950 dark:text-white font-bold text-lg mb-2.5">
                      {item.correct}
                      <span className="text-purple-500 font-normal text-sm">/{item.total}</span>
                    </div>
                    <div className="h-1.5 bg-purple-200/70 dark:bg-purple-900/50 rounded-full overflow-hidden">
                      <div
                        className="progress-bar h-full rounded-full"
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
            <button
              onClick={onRestart}
              className="btn-gold rounded-xl py-3.5 px-10 text-base font-bold tracking-wide"
            >
              Play Again 💜
            </button>
            <button
              onClick={handleShare}
              className="rounded-xl py-3.5 px-7 text-base font-bold tracking-wide transition-all
                         bg-purple-100/70 dark:bg-purple-900/50
                         border border-purple-300/50 dark:border-purple-600/40
                         text-purple-800 dark:text-purple-200
                         hover:bg-purple-200/80 dark:hover:bg-purple-800/60
                         hover:border-purple-400/60 dark:hover:border-purple-500/60
                         hover:text-purple-950 dark:hover:text-white"
            >
              {copied ? 'Copied! ✓' : 'Share Results'}
            </button>
            <button
              onClick={onViewHistory}
              className="rounded-xl py-3.5 px-7 text-base font-bold tracking-wide transition-all
                         bg-purple-100/70 dark:bg-purple-900/50
                         border border-purple-300/50 dark:border-purple-600/40
                         text-purple-800 dark:text-purple-200
                         hover:bg-purple-200/80 dark:hover:bg-purple-800/60
                         hover:border-purple-400/60 dark:hover:border-purple-500/60
                         hover:text-purple-950 dark:hover:text-white"
            >
              📊 History
            </button>
          </div>
        </div>

        {/* ── Answer review ── */}
        <div className="glass-card card-glow rounded-3xl p-6 sm:p-8">
          <h3 className="text-purple-950 dark:text-white font-bold text-lg mb-5 tracking-tight">
            Review Answers
          </h3>
          <div className="space-y-3">
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              const correct = userAnswer === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`rounded-2xl p-4 border text-sm transition-all ${
                    correct
                      ? 'bg-green-50/80 dark:bg-green-950/30 border-green-300/50 dark:border-green-700/30'
                      : 'bg-red-50/80 dark:bg-red-950/30 border-red-300/50 dark:border-red-700/30'
                  }`}
                >
                  <div className="flex items-start gap-2.5 mb-1.5">
                    <span className={`text-base font-bold flex-shrink-0 ${
                      correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {correct ? '✓' : '✗'}
                    </span>
                    <p className="text-purple-950/90 dark:text-white/90 font-medium leading-snug whitespace-pre-line">
                      {q.question}
                    </p>
                  </div>
                  {!correct && (
                    <div className="ml-7 text-xs mt-1 space-x-3">
                      <span className="text-red-600/80 dark:text-red-400/80">
                        You: <span className="text-red-700 dark:text-red-300">
                          {userAnswer !== null ? q.options[userAnswer] : 'Skipped'}
                        </span>
                      </span>
                      <span className="text-green-600/80 dark:text-green-400/80">
                        Correct: <span className="text-green-700 dark:text-green-300">{q.options[q.correctIndex]}</span>
                      </span>
                    </div>
                  )}
                  <div className="ml-7 mt-1.5 text-xs text-purple-600/60 dark:text-purple-400/60 leading-relaxed">
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
