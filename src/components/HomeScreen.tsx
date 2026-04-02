interface HomeScreenProps {
  onStart: (count: number) => void;
  onViewHistory: () => void;
}

const quizOptions = [
  { count: 5,  label: 'Quick Quiz',     desc: '5 questions · ~3 min',  emoji: '⚡' },
  { count: 10, label: 'Standard Quiz',  desc: '10 questions · ~6 min', emoji: '🎵' },
  { count: 50, label: 'Full ARMY Test', desc: '50 questions · ~30 min', emoji: '💜' },
];

const links = [
  { label: '🎤 Lyrics',        href: 'https://genius.com/artists/Bts' },
  { label: '🛍️ Official Store', href: 'https://shop.bts-official.us/' },
  { label: '🌍 Tour',          href: 'https://2026bts.com' },
  { label: '📸 Instagram',     href: 'https://www.instagram.com/bts.bighitofficial/' },
];

export default function HomeScreen({ onStart, onViewHistory }: HomeScreenProps) {
  return (
    <div className="min-h-screen star-bg flex items-center justify-center p-4">
      <div className="max-w-lg w-full animate-slide-up">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-7xl mb-5 animate-float inline-block select-none">💜</div>

          <h1 className="text-6xl font-black tracking-tight mb-3 leading-none">
            <span className="text-gradient-gold">BTS</span>
            <span className="text-purple-950 dark:text-white"> Quiz</span>
          </h1>

          <p className="text-purple-700/80 dark:text-purple-300/80 text-base font-medium mt-3 tracking-wide">
            Test your knowledge of BTS lyrics, songs &amp; albums
          </p>

          <div className="flex justify-center gap-3 mt-5 flex-wrap">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-4 py-2 rounded-full font-semibold
                           bg-purple-100/70 dark:bg-purple-950/40
                           border border-purple-300/50 dark:border-purple-700/30
                           text-purple-700 dark:text-purple-300
                           backdrop-blur-sm
                           hover:bg-purple-200/80 dark:hover:bg-purple-800/50
                           hover:border-purple-400/70 dark:hover:border-purple-500/50
                           hover:text-purple-900 dark:hover:text-white
                           transition-all duration-200 cursor-pointer"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Mode cards */}
        <div className="space-y-3 mb-8">
          <p className="text-center text-purple-600/70 dark:text-purple-400/70 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            Choose your quiz length
          </p>

          {quizOptions.map(({ count, label, desc, emoji }) => (
            <button
              key={count}
              onClick={() => onStart(count)}
              className="w-full option-btn rounded-2xl px-5 py-4 flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl
                              bg-purple-100/80 dark:bg-purple-900/40
                              border border-purple-300/50 dark:border-purple-700/30
                              flex items-center justify-center text-2xl flex-shrink-0
                              group-hover:bg-purple-200/80 dark:group-hover:bg-purple-800/50
                              group-hover:border-purple-400/60 dark:group-hover:border-purple-500/50
                              transition-all">
                {emoji}
              </div>
              <div className="text-left flex-1">
                <div className="text-purple-950 dark:text-white font-semibold text-base">{label}</div>
                <div className="text-purple-600/70 dark:text-purple-400/70 text-sm mt-0.5">{desc}</div>
              </div>
              <div className="text-purple-500 dark:text-purple-600
                              group-hover:text-purple-700 dark:group-hover:text-bts-purple-glow
                              group-hover:translate-x-1 transition-all text-lg">
                →
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-purple-500/60 dark:text-purple-600/60 text-xs font-medium tracking-wide mb-4">
          Questions randomly selected from a pool of 50
        </p>

        <div className="text-center">
          <button
            onClick={onViewHistory}
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl
                       bg-purple-100/70 dark:bg-purple-950/40
                       border border-purple-300/50 dark:border-purple-700/30
                       text-purple-700 dark:text-purple-300
                       hover:bg-purple-200/80 dark:hover:bg-purple-800/50
                       hover:border-purple-400/70 dark:hover:border-purple-500/50
                       hover:text-purple-900 dark:hover:text-white
                       transition-all duration-200"
          >
            📊 View My History
          </button>
        </div>
      </div>
    </div>
  );
}
