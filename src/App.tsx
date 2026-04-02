import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import { questions as allQuestions } from './data/questions';
import type { Question } from './data/questions';

type Screen = 'home' | 'quiz' | 'results';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  function handleStart(count: number) {
    const selected = shuffle(allQuestions).slice(0, count);
    setQuizQuestions(selected);
    setAnswers([]);
    setScreen('quiz');
  }

  function handleFinish(userAnswers: (number | null)[]) {
    setAnswers(userAnswers);
    setScreen('results');
  }

  function handleRestart() {
    setScreen('home');
    setQuizQuestions([]);
    setAnswers([]);
  }

  if (screen === 'quiz') {
    return <QuizScreen questions={quizQuestions} onFinish={handleFinish} />;
  }

  if (screen === 'results') {
    return <ResultsScreen questions={quizQuestions} answers={answers} onRestart={handleRestart} />;
  }

  return <HomeScreen onStart={handleStart} />;
}
