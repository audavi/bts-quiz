import { useMemo, useState } from 'react';
import type { Question } from '../data/questions';
import { categoryLabels, isMemberGuessQuestion } from '../data/questions';
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

  const isMemberGuess = isMemberGuessQuestion(question);

  const memberImage = useMemo(
    () => getRandomImage(question.member),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentIdx],
  );

  const groupImage = useMemo(
    () => getRandomImage('BTS'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentIdx],
  );

  // For "which member" questions, hide the answer by showing a group photo until revealed
  const questionImage = isMemberGuess && !revealed ? groupImage : memberImage;
  const questionImageAlt = isMemberGuess && !revealed ? 'BTS' : question.member;

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
    const base =
      'option-btn w-full text-left rounded-xl px-5 py-3.5 text-sm sm:text-base font-medium flex items-center gap-3 cursor-pointer';
    if (!revealed) return base;
    if (idx === question.correctIndex) return `${base} option-correct`;
    if (idx === selected && selected !== question.correctIndex) return `${base} option-wrong`;
    return `${base} opacity-35`;
  }

  const isCorrect = revealed && selected === question.correctIndex;

  return (
    <div className="min-h-screen star-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-slide-up">

        {/* Progress */}
        <div className="mb-5">
          <ProgressBar current={currentIdx + 1} total={questions.length} />
        </div>

        {/* Main card */}
        <div className="glass-card card-glow rounded-3xl p-6 sm:p-8">

          {/* Top meta row */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs px-3 py-1.5 rounded-full font-semibold uppercase tracking-wider
                             bg-purple-100/80 dark:bg-purple-950/60
                             border border-purple-300/50 dark:border-purple-700/35
                             text-purple-700 dark:text-purple-300">
              {categoryLabels[question.category]}
            </span>
            {question.songTitle && (
              <span className="text-xs text-purple-600/70 dark:text-purple-500/70 italic truncate ml-3 max-w-[180px]">
                {question.songTitle}
                {question.albumYear ? ` · ${question.albumYear}` : ''}
              </span>
            )}
          </div>

          {/* Member image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-500/20 blur-xl scale-110" />
              <img
                key={questionImage}
                src={questionImage}
                alt={questionImageAlt}
                className="relative w-44 h-44 sm:w-52 sm:h-52 object-cover rounded-2xl
                           border border-purple-600/30 shadow-2xl animate-fade-in"
              />
            </div>
          </div>

          {/* Question */}
          <p className="text-purple-950 dark:text-white text-lg sm:text-xl font-semibold leading-relaxed mb-6 whitespace-pre-line">
            {question.question}
          </p>

          {/* Options */}
          <div className="space-y-2.5 mb-5">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={revealed}
                className={getOptionClass(idx)}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full
                                 bg-purple-100/80 dark:bg-purple-900/50
                                 border border-purple-300/50 dark:border-purple-600/40
                                 flex items-center justify-center text-xs font-bold
                                 text-purple-700 dark:text-purple-300">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-snug">{option}</span>
                {revealed && idx === question.correctIndex && (
                  <span className="text-base font-bold">✓</span>
                )}
                {revealed && idx === selected && selected !== question.correctIndex && (
                  <span className="text-base font-bold">✗</span>
                )}
              </button>
            ))}
          </div>

          {/* Explanation banner */}
          {revealed && (
            <div
              className={`rounded-xl p-4 mb-5 text-sm animate-fade-in border ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-950/50 border-green-300/60 dark:border-green-700/40 text-green-700 dark:text-green-300'
                  : 'bg-red-50 dark:bg-red-950/50 border-red-300/60 dark:border-red-700/40 text-red-700 dark:text-red-300'
              }`}
            >
              <div className="font-bold mb-1 text-base">
                {isCorrect ? '🎉 Correct!' : '😔 Not quite!'}
              </div>
              <div className="text-purple-900/80 dark:text-white/75 leading-relaxed">{question.explanation}</div>
            </div>
          )}

          {/* Next button */}
          {revealed && (
            <button
              onClick={handleNext}
              className="btn-gold w-full rounded-xl py-3.5 text-base font-bold tracking-wide animate-fade-in"
            >
              {currentIdx + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
