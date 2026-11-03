import React, { useState } from 'react';
import { Lock, Sparkles, Key, CheckCircle, Heart, X, Gift } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundEngine } from '../utils/soundEffects';
import { triggerFireworks, triggerHeartConfetti } from '../utils/confetti';

export const SecretRoom: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealedFirstSecret, setRevealedFirstSecret] = useState(false);
  const [revealedFinalSecret, setRevealedFinalSecret] = useState(false);

  const quiz = BIRTHDAY_CONFIG.secretRoomQuiz;

  const handleOpenRoom = () => {
    soundEngine.playSparkle();
    setIsOpen(true);
  };

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    soundEngine.playCatchDing();
    soundEngine.playCelebrationFanfare();
    triggerHeartConfetti();
    setRevealedFirstSecret(true);
  };

  const handleRevealFinal = () => {
    soundEngine.playCelebrationFanfare();
    triggerFireworks();
    setRevealedFinalSecret(true);
  };

  return (
    <section id="secret" className="py-14 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      {/* Locked Teaser Banner */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white text-center shadow-2xl border border-purple-400/30">
        
        {/* Celestial Star Particles Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
        
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-900 flex items-center justify-center shadow-lg shadow-amber-400/30 animate-pulse">
            <Key className="w-8 h-8" />
          </div>

          <p className="text-xs sm:text-sm font-semibold tracking-widest text-amber-300 uppercase mb-2">
            Restricted Sibling Chamber 🔐
          </p>

          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            The Hidden Vault
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-purple-200 leading-relaxed font-normal">
            A secret chamber concealed beneath stars and moonlight. Only someone with royal birthday clearance can enter.
          </p>

          <div className="mt-8">
            <button
              onClick={handleOpenRoom}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-yellow-200" />
              <span>THERE IS SOMETHING ELSE... 👀</span>
            </button>
          </div>
        </div>
      </div>

      {/* THE SECRET ROOM FULL MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full bg-slate-900/95 border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden relative text-white">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Backdrop Celestial Image Header */}
            <div className="relative h-44 sm:h-56 w-full overflow-hidden">
              <img
                src="/src/assets/images/magic_secret_room_1793698843668.jpg"
                alt="Magical fairy bedroom universe"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest bg-purple-900/80 px-2.5 py-1 rounded-full border border-purple-400/40">
                  ✨ Secret Dimension Unlocked
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  Welcome to Your Secret Treasure
                </h3>
              </div>
            </div>

            {/* Room Content & Brother Question */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Question */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-purple-300 font-semibold mb-1">
                  SECURITY QUESTION #1
                </div>
                <h4 className="font-display font-semibold text-base sm:text-lg text-white">
                  {quiz.question}
                </h4>

                {/* Multiple choice options */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {quiz.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedOption === idx
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-400 text-white shadow-lg'
                          : 'bg-white/5 hover:bg-white/15 border-white/10 text-purple-100'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedOption === idx && <CheckCircle className="w-4 h-4 text-white shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reveal Phase 1: Brother Funny Confirmation */}
              {revealedFirstSecret && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-900/60 to-purple-900/60 border border-pink-500/40 text-center animate-fade-in">
                  <div className="text-2xl mb-1">🎉</div>
                  <h4 className="font-display text-lg font-bold text-amber-200">
                    {quiz.brotherReveal}
                  </h4>
                  <p className="text-xs text-purple-200 mt-1">
                    Your loyalty has unlocked the final hidden treasure chest!
                  </p>

                  {!revealedFinalSecret && (
                    <button
                      onClick={handleRevealFinal}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 text-slate-900 font-bold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <Gift className="w-4 h-4" />
                      <span>REVEAL FINAL SECRET WAITING FOR YOU...</span>
                    </button>
                  )}
                </div>
              )}

              {/* Reveal Phase 2: Heartfelt Brother Secret Message */}
              {revealedFinalSecret && (
                <div className="p-6 rounded-2xl bg-white/10 border border-amber-300/50 backdrop-blur text-left animate-fade-in shadow-2xl">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">
                    <Heart className="w-4 h-4 fill-amber-300" />
                    <span>Kartik&apos;s Unfiltered Words</span>
                  </div>
                  
                  <p className="text-sm sm:text-base text-purple-50 leading-relaxed font-sans italic">
                    &ldquo;{quiz.secretNote}&rdquo;
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-300">
                    <span>Stored forever in Kartik&apos;s heart ❤️</span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-pink-400 hover:text-pink-300 font-semibold"
                    >
                      Return to Celebration →
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
