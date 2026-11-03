import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Volume2, Music } from 'lucide-react';
import { triggerConfettiExplosion, triggerHeartConfetti } from '../utils/confetti';
import { soundEngine } from '../utils/soundEffects';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [stage, setStage] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Staggered cinematic reveal
    const timer1 = setTimeout(() => setStage(1), 600);
    const timer2 = setTimeout(() => setStage(2), 1600);
    const timer3 = setTimeout(() => setStage(3), 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleEnter = () => {
    triggerConfettiExplosion();
    triggerHeartConfetti();
    soundEngine.playCelebrationFanfare();

    if (soundEnabled) {
      setTimeout(() => {
        soundEngine.startAmbientMusic();
      }, 700);
    }

    onEnter();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100 overflow-hidden">
      {/* Dreamy background glow circles */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-pink-300/30 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-300/30 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-lg w-full text-center glass-panel-elevated p-8 md:p-12 rounded-3xl border border-white/90 shadow-2xl transition-all duration-700">
        {/* Floating icon seal */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center shadow-lg shadow-pink-300/50 animate-bounce">
          <Heart className="w-8 h-8 fill-white" />
        </div>

        {/* Phase 1: Whispered introductory teaser */}
        <p
          className={`text-sm md:text-base tracking-wide text-purple-900/70 font-medium transition-all duration-1000 ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          Someone very special has entered her birthday universe...
        </p>

        {/* Phase 2: Grand Welcome Title */}
        <div
          className={`mt-4 transition-all duration-1000 ${
            stage >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
            Welcome, <br />
            <span className="font-script text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
              Kritika aka RANU ❤️
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-pink-800/80 font-medium italic">
            &ldquo;Made with endless love, just for you.&rdquo;
          </p>
        </div>

        {/* Phase 3: Enter CTA Button and Music prompt */}
        <div
          className={`mt-8 space-y-4 transition-all duration-1000 ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={handleEnter}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-medium text-base sm:text-lg shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-semibold tracking-wide">ENTER YOUR MAGICAL WORLD ✨</span>
          </button>

          {/* Sound permission toggle */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <Music className="w-3.5 h-3.5 text-pink-500" />
              <span>Background music: </span>
              <span className={`font-semibold ${soundEnabled ? 'text-pink-600' : 'text-slate-400'}`}>
                {soundEnabled ? 'ON 🎵' : 'OFF 🔇'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
