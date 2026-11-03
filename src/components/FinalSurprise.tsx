import React, { useState } from 'react';
import { Heart, Sparkles, PartyPopper, Star, Volume2 } from 'lucide-react';
import { triggerFireworks, triggerGrandCelebration, triggerHeartConfetti } from '../utils/confetti';
import { soundEngine } from '../utils/soundEffects';

export const FinalSurprise: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlockFinal = () => {
    setUnlocked(true);
    soundEngine.playCelebrationFanfare();
    triggerFireworks();
    triggerGrandCelebration(5000);
  };

  return (
    <section id="final" className="py-16 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="glass-panel-elevated rounded-3xl p-8 sm:p-14 border border-rose-200/90 shadow-2xl text-center relative overflow-hidden bg-gradient-to-b from-white/90 via-rose-50/50 to-pink-100/70">
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-rose-500 uppercase mb-2">
            The Emotional Finale ❤️
          </p>

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            ONE LAST THING, RANU...
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Before your birthday day ends, there is one forever promise your brother wants you to always keep in mind.
          </p>

          {!unlocked ? (
            /* Sealed Glowing Heart Trigger */
            <div className="mt-10 flex flex-col items-center">
              <button
                onClick={handleUnlockFinal}
                className="group relative p-8 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 text-white shadow-2xl shadow-rose-400/50 hover:scale-110 active:scale-95 transition-all cursor-pointer animate-pulse"
                title="Tap to reveal final surprise"
              >
                <Heart className="w-16 h-16 fill-white drop-shadow-md group-hover:scale-110 transition-transform" />
                <span className="absolute -bottom-2 bg-white text-rose-600 px-3 py-1 rounded-full text-[10px] font-bold shadow border border-rose-200 whitespace-nowrap">
                  TAP TO UNLOCK 💖
                </span>
              </button>
              
              <p className="mt-8 text-xs text-rose-700 font-medium">
                Tap the beating heart to open Kartik&apos;s final message ✨
              </p>
            </div>
          ) : (
            /* Unlocked Emotional Reveal */
            <div className="mt-8 p-6 sm:p-10 rounded-3xl bg-white/95 border border-rose-200 shadow-2xl text-left animate-fade-in relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-rose-100 mb-6">
                <div className="flex items-center gap-2 text-rose-600 font-semibold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>A Brother&apos;s Lifetime Promise</span>
                </div>
                <span className="text-2xl">❤️</span>
              </div>

              <div className="space-y-4 font-sans text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  No matter how much we fight, tease each other, or annoy one another, you will always have a permanent place in my heart.
                </p>
                <p>
                  I might not say it every day, but I am genuinely lucky to have you as my sister.
                </p>
                <p>
                  Keep smiling, keep shining, and keep achieving everything you dream of.
                </p>
                <p className="font-bold text-slate-900 pt-2">
                  Happy Birthday, Ranu!
                </p>
                <p className="font-script text-2xl sm:text-3xl text-rose-600">
                  Your annoying but forever-loving brother, <br />
                  Kartik ❤️
                </p>
              </div>

              {/* Grand Final Quote */}
              <div className="mt-8 pt-6 border-t border-rose-100 text-center">
                <h3 className="font-display font-black text-lg sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
                  THE WORLD IS YOURS, RANU. KEEP SHINING! ✨
                </h3>
              </div>

              {/* Re-trigger Celebration Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    triggerFireworks();
                    triggerGrandCelebration(4000);
                    soundEngine.playCelebrationFanfare();
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:from-pink-600 hover:to-rose-600 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <PartyPopper className="w-4 h-4" />
                  <span>Celebrate One More Time! 🎉</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};
