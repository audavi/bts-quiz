import type { Question } from '../data/questions';
import { categoryLabels } from '../data/questions';

interface ResultsScreenProps {
  questions: Question[];
  answers: (number | null)[];
  onRestart: () => void;
}

function getScoreTitle(pct: number): { title: string; emoji: string; color: string } {
  if (pct === 100) return { title: 'Perfect ARMY!', emoji: '🏆', color: 'text-yellow-400' };
  if (pct >= 80) return { title: 'BTS Expert!', emoji: '💜', color: 'text-purple-400' };
  if (pct >= 60) return { title: 'True ARMY!', emoji: '🎵', color: 'text-blue-400' };
  if (pct >= 40) return { title: 'Getting There!', emoji: '🌸', color: 'text-pink-400' };
  return { title: 'Keep Listening!', emoji: '🎧', color: 'text-red-400' };
}

export default function ResultsScreen({ questions, answers, onRestart }: ResultsScreenProps) {
  const score = answers.filter((a, i) => a === questions[i].correctIndex).length;
  const pct = Math.round((score / questions.length) * 100);
  const { title, emoji, color } = getScoreTitle(pct);

  const categoryBreakdown = (['trivia', 'song-title', 'album'] as const).map((cat) => {
    const catQs = questions
      .map((q, i) => ({ q, i }))
      .filter(({ q }) => q.category === cat);
    if (catQs.length === 0) return null;
    const correct = catQs.filter(({ i }) => answers[i] === questions[i].correctIndex).length;
    return { cat, correct, total: catQs.length };
  }).filter(Boolean);

  return (
    <div className="min-h-screen star-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-slide-up">
        {/* Score card */}
        <div className="bg-bts-card card-glow rounded-2xl p-6 sm:p-8 border border-bts-border mb-6 text-center">
          <div className="text-6xl mb-3">{emoji}</div>
          <h2 className={`text-3xl font-bold mb-1 ${color}`}>{title}</h2>
          <p className="text-purple-300 mb-5">Here's how you did</p>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient-gold">{score}</div>
              <div className="text-purple-400 text-sm mt-1">correct</div>
            </div>
            <div className="text-purple-600 text-3xl">/</div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white">{questions.length}</div>
              <div className="text-purple-400 text-sm mt-1">total</div>
            </div>
            <div className="text-purple-600 text-3xl">·</div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-300">{pct}%</div>
              <div className="text-purple-400 text-sm mt-1">score</div>
            </div>
          </div>

          {/* Category breakdown */}
          {categoryBreakdown.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {categoryBreakdown.map((item) => {
                if (!item) return null;
                const barPct = Math.round((item.correct / item.total) * 100);
                return (
                  <div key={item.cat} className="bg-bts-dark rounded-xl p-3 text-left">
                    <div className="text-xs text-purple-400 mb-1">{categoryLabels[item.cat]}</div>
                    <div className="text-white font-bold text-sm mb-2">
                      {item.correct}/{item.total}
                    </div>
                    <div className="h-1.5 bg-bts-border rounded-full overflow-hidden">
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

          <button onClick={onRestart} className="btn-gold rounded-xl py-3 px-8 text-base">
            Play Again 💜
          </button>
        </div>

        {/* Answer review */}
        <div className="bg-bts-card card-glow rounded-2xl p-6 border border-bts-border">
          <h3 className="text-white font-bold text-lg mb-4">Review Answers</h3>
          <div className="space-y-4">
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              const correct = userAnswer === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`rounded-xl p-4 border text-sm ${
                    correct
                      ? 'bg-green-950/30 border-green-800/50'
                      : 'bg-red-950/30 border-red-800/50'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">{correct ? '✓' : '✗'}</span>
                    <p className="text-white/90 font-medium leading-snug whitespace-pre-line">{q.question}</p>
                  </div>
                  {!correct && (
                    <div className="ml-7 text-xs text-purple-300">
                      <span className="text-red-400">You answered: </span>
                      {userAnswer !== null ? q.options[userAnswer] : 'Skipped'}
                      <span className="text-green-400 ml-3">Correct: </span>
                      {q.options[q.correctIndex]}
                    </div>
                  )}
                  <div className="ml-7 mt-1 text-xs text-purple-400">{q.explanation}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
