import React, { useState } from 'react';
import { Sparkles, Flame, Wind, Scissors, PartyPopper, Check, RotateCcw } from 'lucide-react';
import { triggerConfettiExplosion, triggerFireworks, triggerHeartConfetti } from '../utils/confetti';
import { soundEngine } from '../utils/soundEffects';

interface BirthdayCakeProps {
  onWishDone?: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [sliceServed, setSliceServed] = useState(false);
  const [userWishText, setUserWishText] = useState('');
  const [showWishInput, setShowWishInput] = useState(false);

  const handleLightCandles = () => {
    setCandlesLit(true);
    setWishMade(false);
    soundEngine.playSparkle();
    triggerConfettiExplosion();
  };

  const handleBlowCandles = () => {
    setIsBlowing(true);
    soundEngine.playCandleBlow();

    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);
      setWishMade(true);
      triggerHeartConfetti();
    }, 600);
  };

  const handleCutCake = () => {
    setCakeCut(true);
    soundEngine.playSparkle();

    setTimeout(() => {
      setSliceServed(true);
      triggerFireworks();
      soundEngine.playBirthdaySong();
    }, 500);
  };

  const handleReset = () => {
    setCandlesLit(true);
    setWishMade(false);
    setCakeCut(false);
    setSliceServed(false);
    setShowWishInput(false);
  };

  return (
    <section id="cake" className="py-12 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/80 shadow-xl text-center">
        
        {/* Section Header */}
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-pink-500 uppercase mb-1">
          Interactive Birthday Ritual ✨
        </p>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-800">
          The Birthday Cake Celebration 🎂
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Light the candles, make your heart&apos;s deepest wish, blow them out, and cut the first slice!
        </p>

        {/* Interactive Cake Visual Box */}
        <div className="relative mt-8 max-w-md mx-auto rounded-3xl overflow-hidden shadow-xl border border-pink-100 bg-gradient-to-b from-pink-50 to-purple-50 p-6 flex flex-col items-center">
          
          {/* Flickering Candles Row */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-2 z-10">
            {[1, 2, 3, 4, 5].map((candleIndex) => (
              <div key={candleIndex} className="flex flex-col items-center">
                {/* Flame or Smoke */}
                <div className="h-7 flex items-end">
                  {candlesLit ? (
                    <div className="relative flex flex-col items-center animate-flicker">
                      {/* Outer flame */}
                      <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-lg shadow-amber-400/80" />
                      {/* Inner blue base */}
                      <div className="w-1.5 h-2 rounded-full bg-blue-400/80 absolute bottom-0" />
                    </div>
                  ) : (
                    <div className="text-slate-400 text-xs animate-fade-out opacity-80 flex flex-col items-center">
                      <span className="text-[10px]">💨</span>
                    </div>
                  )}
                </div>

                {/* Candle Stick */}
                <div
                  className={`w-3 h-10 rounded-t-sm shadow-sm transition-colors ${
                    candleIndex % 2 === 0
                      ? 'bg-gradient-to-b from-pink-300 via-rose-300 to-pink-400'
                      : 'bg-gradient-to-b from-purple-300 via-indigo-300 to-purple-400'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Birthday Cake Photo / Artwork */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-inner group">
            <img
              src="/src/assets/images/birthday_cake_deluxe_1793698841440.jpg"
              alt="Deluxe pastel tiered birthday cake"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-700 ${
                cakeCut ? 'scale-105 filter contrast-105' : 'group-hover:scale-102'
              }`}
            />

            {/* Glowing Golden Aura when candles are lit */}
            {candlesLit && (
              <div className="absolute inset-0 bg-gradient-to-b from-amber-400/15 via-transparent to-pink-500/10 pointer-events-none mix-blend-screen" />
            )}

            {/* Cake Slicing Effect Overlay */}
            {cakeCut && (
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-2xl shadow-xl border border-pink-200 text-pink-600 font-bold text-sm sm:text-base animate-bounce">
                  ✨ Sliced with Love! 🍰
                </div>
              </div>
            )}
          </div>

          {/* Real-time Status Text */}
          <div className="mt-4 min-h-[3rem] flex items-center justify-center">
            {candlesLit ? (
              <div className="text-amber-800 font-medium text-xs sm:text-sm bg-amber-50/80 border border-amber-200/70 px-4 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>The candles are glowing! Make a wish, Ranu! ✨</span>
              </div>
            ) : wishMade && !sliceServed ? (
              <div className="text-pink-700 font-semibold text-xs sm:text-sm bg-pink-100/90 border border-pink-200 px-4 py-1.5 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>Wish sent to the stars! Now cut the cake! 🍰</span>
              </div>
            ) : sliceServed ? (
              <div className="text-purple-700 font-bold text-sm sm:text-base bg-purple-100/90 border border-purple-200 px-5 py-2 rounded-full flex items-center gap-2">
                <span>👑 First slice for the Birthday Queen Ranu! 🍰❤️</span>
              </div>
            ) : (
              <span className="text-slate-400 text-xs">Ready for celebration</span>
            )}
          </div>

          {/* Interactive Cake Controls */}
          <div className="mt-4 w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {candlesLit ? (
              <>
                <button
                  onClick={handleBlowCandles}
                  disabled={isBlowing}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-xs sm:text-sm shadow-md hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Wind className="w-4 h-4" />
                  <span>BLOW THE CANDLES 🕯️💨</span>
                </button>
                <button
                  onClick={() => setShowWishInput(!showWishInput)}
                  className="py-3 px-3.5 rounded-xl bg-white text-slate-700 font-medium text-xs sm:text-sm border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>Write Wish ✍️</span>
                </button>
              </>
            ) : (
              <>
                {!sliceServed ? (
                  <button
                    onClick={handleCutCake}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:from-pink-600 hover:to-rose-600 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Scissors className="w-4 h-4" />
                    <span>CUT THE CAKE! 🍰🎉</span>
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Celebrate Again</span>
                  </button>
                )}

                {!candlesLit && (
                  <button
                    onClick={handleLightCandles}
                    className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-medium text-xs border border-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Relight Candles</span>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Optional: Sister's Custom Wish input modal/field */}
          {showWishInput && (
            <div className="mt-4 w-full p-4 rounded-2xl bg-white/90 border border-pink-200 text-left">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Whisper your secret birthday wish here:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userWishText}
                  onChange={(e) => setUserWishText(e.target.value)}
                  placeholder="e.g. Endless trips, peace, and Kartik doing my chores!"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                />
                <button
                  onClick={() => {
                    if (userWishText) {
                      soundEngine.playSparkle();
                      triggerConfettiExplosion();
                    }
                    setShowWishInput(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-pink-500 text-white text-xs font-semibold hover:bg-pink-600 transition-colors"
                >
                  Seal Wish ✨
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
