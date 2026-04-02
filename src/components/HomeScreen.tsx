interface HomeScreenProps {
  onStart: (count: number) => void;
}

const quizOptions = [
  { count: 5, label: 'Quick Quiz', desc: '5 questions · ~3 min', emoji: '⚡' },
  { count: 10, label: 'Standard Quiz', desc: '10 questions · ~6 min', emoji: '🎵' },
  { count: 20, label: 'Full ARMY Test', desc: '20 questions · ~12 min', emoji: '💜' },
];

export default function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="min-h-screen star-bg flex items-center justify-center p-4">
      <div className="max-w-lg w-full animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">💜</div>
          <h1 className="text-5xl font-bold mb-2 font-display">
            <span className="text-gradient-gold">BTS</span>
            <span className="text-white"> Quiz</span>
          </h1>
          <p className="text-purple-300 text-lg mt-3">
            Test your knowledge of BTS lyrics, songs & albums
          </p>
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {['🎤 Lyrics', '🎵 Songs', '💿 Albums', '⭐ Trivia'].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-bts-card border border-bts-border text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quiz mode selector */}
        <div className="space-y-3 mb-8">
          <p className="text-center text-purple-400 text-sm uppercase tracking-widest mb-4">
            Choose your quiz length
          </p>
          {quizOptions.map(({ count, label, desc, emoji }) => (
            <button
              key={count}
              onClick={() => onStart(count)}
              className="w-full option-btn rounded-2xl px-6 py-4 flex items-center gap-4 group"
            >
              <span className="text-3xl">{emoji}</span>
              <div className="text-left flex-1">
                <div className="text-white font-semibold text-lg">{label}</div>
                <div className="text-purple-400 text-sm">{desc}</div>
              </div>
              <div className="text-purple-500 group-hover:text-bts-gold group-hover:translate-x-1 transition-all">
                →
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-purple-500 text-xs">
          Questions randomly selected from a pool of 20
        </p>
      </div>
    </div>
  );
}
