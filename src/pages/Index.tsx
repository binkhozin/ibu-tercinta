import { useRef, useState, useEffect, useCallback } from "react";

const PETALS = ['🌸', '🌺', '✿', '❀', '🌷'];

const FallingPetals = () => {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${8 + Math.random() * 7}s`,
    emoji: PETALS[i % PETALS.length],
    size: `${0.8 + Math.random() * 0.6}rem`,
    opacity: 0.4 + Math.random() * 0.4,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

const IslamicOrnament = () => (
  <svg
    className="absolute opacity-[0.06] pointer-events-none"
    viewBox="0 0 200 200"
    width="200"
    height="200"
    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
  >
    <g fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold">
      {[0, 45, 90, 135].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 100 100)`}>
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="60" />
          <line x1="100" y1="20" x2="100" y2="180" />
        </g>
      ))}
      <circle cx="100" cy="100" r="40" />
      <circle cx="100" cy="100" r="95" />
    </g>
  </svg>
);

const Index = () => {
  const messageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [messageVisible, setMessageVisible] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const handleOpenMessage = useCallback(() => {
    setHasClicked(true);
    setMessageVisible(true);

    // Play audio (user gesture = no autoplay block)
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }

    // Smooth scroll to message
    setTimeout(() => {
      messageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  // Intersection observer for fade-in on scroll
  const [cardInView, setCardInView] = useState(false);
  useEffect(() => {
    if (!messageRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCardInView(true); },
      { threshold: 0.2 }
    );
    observer.observe(messageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FallingPetals />

      {/* Hidden audio element for background music */}
      <audio ref={audioRef} loop preload="none">
        {/* Ganti src di bawah ini dengan link MP3 instrumen selawat */}
        <source src="" type="audio/mpeg" />
      </audio>

      {/* ===== HERO SECTION ===== */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center islamic-pattern overflow-hidden">
        <IslamicOrnament />

        <div className="relative z-10 max-w-lg mx-auto">
          {/* Bismillah */}
          <p className="animate-fade-in-up text-lg md:text-xl text-sage-dark mb-6 tracking-wide">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          {/* Main Heading */}
          <h1 className="animate-fade-in-up-delay-1 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Mabruk Alfa Mabruk,
            <br />
            <span className="text-accent italic">Ibu Tercinta</span>
          </h1>

          {/* Sub-text */}
          <p className="animate-fade-in-up-delay-2 font-display text-xl sm:text-2xl text-sage-dark italic mt-2 mb-10">
            Barakallah fii umrik
          </p>

          {/* Decorative divider */}
          <div className="animate-fade-in-up-delay-2 flex items-center justify-center gap-3 mb-10">
            <span className="h-px w-12 bg-accent/40" />
            <span className="text-accent text-sm">✦</span>
            <span className="h-px w-12 bg-accent/40" />
          </div>

          {/* CTA Button */}
          <button
            onClick={handleOpenMessage}
            disabled={hasClicked}
            className={`
              animate-fade-in-up-delay-3
              gold-shimmer animate-pulse-gold
              font-display font-semibold
              text-base sm:text-lg
              px-8 py-4 rounded-full
              shadow-lg hover:shadow-xl
              transform hover:scale-105 active:scale-95
              transition-transform duration-300 ease-out
              disabled:opacity-60 disabled:cursor-default disabled:hover:scale-100
              focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background
            `}
          >
            ✉️ Sentuh untuk Buka Pesan
          </button>
        </div>

        {/* Scroll indicator */}
        {hasClicked && (
          <div className="absolute bottom-8 animate-bounce text-gold/50 text-2xl">
            ↓
          </div>
        )}
      </section>

      {/* ===== MESSAGE REVEAL SECTION ===== */}
      {messageVisible && (
        <section
          ref={messageRef}
          className="relative min-h-screen flex items-center justify-center px-4 py-16 md:py-24 islamic-pattern"
        >
          <div
            className={`
              relative max-w-xl w-full mx-auto
              bg-card rounded-2xl
              border-2 border-gold/30
              shadow-[0_8px_40px_-12px_hsla(43,72%,55%,0.25)]
              p-6 sm:p-10
              ornament-corner
              transition-all duration-1000 ease-out
              ${cardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            {/* Photo Frame */}
            <div className="flex justify-center -mt-16 sm:-mt-20 mb-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[3px] border-gold/50 shadow-lg overflow-hidden bg-sage-light flex items-center justify-center animate-float">
                <img
                  src="/placeholder.svg"
                  alt="Foto keluarga"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Decorative top */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <span className="text-gold text-xs tracking-widest font-display">❁ UNTUK IBU ❁</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>

            {/* Letter Content */}
            <div className="space-y-4 text-foreground/90 text-base sm:text-lg leading-relaxed text-center">
              <p className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-4">
                Ibu yang Tercinta,
              </p>
              <p>
                Semoga di usia yang baru ini, Ibu senantiasa diberikan <strong className="text-sage-dark">kesehatan</strong>, 
                dilimpahkan <strong className="text-sage-dark">keberkahan</strong> dalam setiap langkah, 
                dan selalu berada dalam <strong className="text-sage-dark">lindungan Allah SWT</strong>.
              </p>
              <p>
                Terima kasih atas segala doa, ketulusan, dan kasih sayang Ibu yang tak pernah putus untuk kami.
              </p>
              <p className="text-accent font-display italic text-lg">
                اللهم بارك لها في عمرها
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-8">
              <span className="h-px w-16 bg-gold/30" />
              <span className="text-gold text-sm">♡</span>
              <span className="h-px w-16 bg-gold/30" />
            </div>

            {/* Sign-off */}
            <div className="text-center">
              <p className="font-handwritten text-2xl sm:text-3xl text-sage-dark leading-relaxed">
                Penuh cinta dan doa dari
              </p>
              <p className="font-handwritten text-2xl sm:text-3xl text-accent font-bold mt-1">
                Mustafid, Dzata, dan cucu kesayangan, Fadli.
              </p>
            </div>

            {/* Bottom ornament */}
            <div className="flex justify-center mt-8 text-gold/30 text-2xl tracking-[0.5em]">
              ✦ ✦ ✦
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
