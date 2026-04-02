import { useMemo, useState } from 'react';
import type { Question } from '../data/questions';
import { categoryLabels } from '../data/questions';
import { getRandomImage } from '../utils/images';
import ProgressBar from './ProgressBar';

interface QuizScreenProps {
  questions: Question[];
  onFinish: (answers: (number | null)[]) => void;
}

export default function QuizScreen({ questions, onFinish }: QuizScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [revealed, setRevealed] = useState(false);

  const question = questions[currentIdx];

  const questionImage = useMemo(
    () => getRandomImage(question.member),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentIdx],
  );

  function handleSelect(idx: number) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  }

  function handleNext() {
    const newAnswers = [...answers, selected];
    if (currentIdx + 1 >= questions.length) {
      onFinish(newAnswers);
    } else {
      setAnswers(newAnswers);
      setSelected(null);
      setRevealed(false);
      setCurrentIdx((i) => i + 1);
    }
  }

  function getOptionClass(idx: number): string {
    const base = 'option-btn w-full text-left rounded-xl px-5 py-4 text-sm sm:text-base font-medium flex items-center gap-3';
    if (!revealed) return base;
    if (idx === question.correctIndex) return `${base} option-correct`;
    if (idx === selected && selected !== question.correctIndex) return `${base} option-wrong`;
    return `${base} opacity-40`;
  }

  const isCorrect = revealed && selected === question.correctIndex;

  return (
    <div className="min-h-screen star-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-slide-up">
        {/* Progress */}
        <div className="mb-6">
          <ProgressBar current={currentIdx + 1} total={questions.length} />
        </div>

        {/* Card */}
        <div className="bg-bts-card card-glow rounded-2xl p-6 sm:p-8 border border-bts-border">
          {/* Category badge */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-bts-dark border border-bts-border text-purple-300 font-medium">
              {categoryLabels[question.category]}
            </span>
            {question.songTitle && (
              <span className="text-xs text-purple-500 italic">{question.songTitle}{question.albumYear ? ` · ${question.albumYear}` : ''}</span>
            )}
          </div>

          {/* Member / Group image */}
          <div className="flex justify-center mb-6">
            <img
              key={questionImage}
              src={questionImage}
              alt={question.member}
              className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-2xl border border-bts-border shadow-lg"
            />
          </div>

          {/* Question */}
          <p className="text-white text-lg sm:text-xl font-medium leading-relaxed mb-7 whitespace-pre-line">
            {question.question}
          </p>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={revealed}
                className={getOptionClass(idx)}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full border border-bts-border flex items-center justify-center text-xs font-bold text-purple-400">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
                {revealed && idx === question.correctIndex && (
                  <span className="text-green-400 text-lg">✓</span>
                )}
                {revealed && idx === selected && selected !== question.correctIndex && (
                  <span className="text-red-400 text-lg">✗</span>
                )}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {revealed && (
            <div className={`rounded-xl p-4 mb-5 text-sm animate-fade-in ${
              isCorrect
                ? 'bg-green-950/50 border border-green-800 text-green-300'
                : 'bg-red-950/50 border border-red-800 text-red-300'
            }`}>
              <div className="font-bold mb-1">{isCorrect ? '🎉 Correct!' : '😔 Not quite!'}</div>
              <div className="text-white/80">{question.explanation}</div>
            </div>
          )}

          {/* Next button */}
          {revealed && (
            <button onClick={handleNext} className="btn-gold w-full rounded-xl py-3 text-base animate-fade-in">
              {currentIdx + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
