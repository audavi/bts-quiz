interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-semibold mb-2.5 tracking-wide">
        <span className="text-purple-700/80 dark:text-purple-300/80">
          Question <span className="text-purple-800 dark:text-purple-200 font-bold">{current}</span>
          <span className="text-purple-600 dark:text-purple-500"> / {total}</span>
        </span>
        <span className="text-purple-700/80 dark:text-purple-300/80">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-purple-200/60 dark:bg-purple-950/50 border border-purple-200/50 dark:border-purple-800/30 rounded-full h-2.5 overflow-hidden">
        <div
          className="progress-bar h-full rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
