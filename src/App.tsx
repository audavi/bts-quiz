import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryScreen from './components/HistoryScreen';
import { questions as allQuestions } from './data/questions';
import type { Question } from './data/questions';
import { saveResult, getScoreTitle } from './utils/history';

type Screen = 'home' | 'quiz' | 'results' | 'history';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useTheme() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark'),
  );

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('bts-quiz-theme', next ? 'dark' : 'light');
    setIsDark(next);
  }

  return { isDark, toggle };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const { isDark, toggle } = useTheme();

  function handleStart(count: number) {
    const selected = shuffle(allQuestions).slice(0, count);
    setQuizQuestions(selected);
    setAnswers([]);
    setScreen('quiz');
  }

  function handleFinish(userAnswers: (number | null)[]) {
    const score = userAnswers.filter((a, i) => a === quizQuestions[i].correctIndex).length;
    const pct = Math.round((score / quizQuestions.length) * 100);
    const { title, emoji } = getScoreTitle(pct);
    saveResult({ total: quizQuestions.length, score, pct, title, emoji });
    setAnswers(userAnswers);
    setScreen('results');
  }

  function handleRestart() {
    setScreen('home');
    setQuizQuestions([]);
    setAnswers([]);
  }

  return (
    <>
      {/* ── Theme toggle ── */}
      <button
        onClick={toggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full
                   flex items-center justify-center text-lg
                   backdrop-blur-md transition-all duration-200
                   bg-purple-900/50 dark:bg-purple-950/60
                   border border-purple-400/40 dark:border-purple-700/40
                   text-purple-900 dark:text-purple-300
                   hover:scale-110 hover:border-purple-500/60
                   shadow-lg shadow-purple-900/20"
      >
        {isDark ? '☀' : '🌙'}
      </button>

      {screen === 'quiz' && (
        <QuizScreen questions={quizQuestions} onFinish={handleFinish} />
      )}
      {screen === 'results' && (
        <ResultsScreen
          questions={quizQuestions}
          answers={answers}
          onRestart={handleRestart}
          onViewHistory={() => setScreen('history')}
        />
      )}
      {screen === 'history' && (
        <HistoryScreen onBack={() => setScreen('home')} />
      )}
      {screen === 'home' && (
        <HomeScreen onStart={handleStart} onViewHistory={() => setScreen('history')} />
      )}
    </>
  );
}
