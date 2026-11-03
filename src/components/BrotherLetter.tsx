import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, RotateCcw, Volume2, Edit3, Check } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundEngine } from '../utils/soundEffects';
import { triggerHeartConfetti } from '../utils/confetti';

export const BrotherLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [letterContent, setLetterContent] = useState(BIRTHDAY_CONFIG.letter);

  const fullText = letterContent.paragraphs.join('\n\n');

  // Typewriter effect when opened
  useEffect(() => {
    if (!isOpen) {
      setTypedIndex(0);
      return;
    }

    if (typedIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedIndex((prev) => Math.min(prev + 2, fullText.length));
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, typedIndex, fullText.length]);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      soundEngine.playEnvelopeOpen();
      soundEngine.playSparkle();
      triggerHeartConfetti();
      setIsOpen(true);
    }
  };

  const handleResetLetter = () => {
    setIsOpen(false);
    setTypedIndex(0);
  };

  return (
    <section id="letter" className="py-14 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-rose-500 uppercase mb-1">
          From The Heart ❤️
        </p>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-800">
          {letterContent.title}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          A personal, sealed digital letter written just for Ranu.
        </p>
      </div>

      {!isOpen ? (
        /* SEALED ENVELOPE INTERACTION */
        <div className="flex flex-col items-center">
          <div
            onClick={handleOpenEnvelope}
            className="group relative w-full max-w-md aspect-[1.45/1] rounded-2xl bg-gradient-to-br from-rose-100 via-pink-100 to-amber-50 border-2 border-rose-200/80 shadow-2xl p-6 flex flex-col items-center justify-between cursor-pointer hover:scale-102 hover:border-pink-400 active:scale-98 transition-all"
          >
            {/* Stamp in upper corner */}
            <div className="w-full flex justify-between items-start">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                Air Mail · Priority Sister
              </span>
              <div className="w-10 h-12 rounded border border-dashed border-pink-400 bg-pink-50 flex flex-col items-center justify-center p-1 shadow-sm">
                <span className="text-xs">🎂</span>
                <span className="text-[8px] font-bold text-pink-600">RANU</span>
              </div>
            </div>

            {/* Central Wax Seal */}
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-500 shadow-xl shadow-rose-500/40 border-2 border-rose-200 flex items-center justify-center text-white text-xl font-script group-hover:scale-110 transition-transform">
                <span>K & R</span>
              </div>
              <p className="mt-3 text-xs font-semibold text-rose-800 tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>TAP TO BREAK WAX SEAL & OPEN LETTER</span>
              </p>
            </div>

            {/* Recipient note */}
            <div className="w-full text-center border-t border-rose-200/60 pt-2 text-xs text-slate-600 font-medium">
              To: <strong>Kritika (Ranu)</strong> — With Love, From Kartik
            </div>
          </div>
        </div>
      ) : (
        /* OPENED LETTER CONTAINER */
        <div className="max-w-2xl mx-auto glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-rose-200 shadow-2xl relative transition-all">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-100 text-xs">
            <span className="font-script text-xl text-rose-600">Special Letter for Ranu</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg flex items-center gap-1"
                title="Edit letter"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="text-[11px]">{isEditing ? 'Done' : 'Edit'}</span>
              </button>
              <button
                onClick={handleResetLetter}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg flex items-center gap-1"
                title="Reseal envelope"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[11px]">Fold</span>
              </button>
            </div>
          </div>

          {/* Letter parchment look */}
          <div className="bg-[#fffdfa] rounded-2xl p-6 sm:p-8 border border-amber-100 shadow-sm text-left">
            
            <h3 className="font-display font-bold text-lg sm:text-xl text-slate-800 mb-4">
              {letterContent.salutation}
            </h3>

            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  rows={8}
                  value={letterContent.paragraphs.join('\n\n')}
                  onChange={(e) =>
                    setLetterContent({
                      ...letterContent,
                      paragraphs: e.target.value.split('\n\n'),
                    })
                  }
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white leading-relaxed"
                />
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 bg-pink-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            ) : (
              <div className="font-sans text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {fullText.slice(0, typedIndex)}
                {typedIndex < fullText.length && (
                  <span className="inline-block w-2 h-4 bg-pink-500 ml-1 animate-pulse" />
                )}
              </div>
            )}

            {/* Sign off */}
            <div className="mt-8 pt-6 border-t border-rose-100 text-right">
              <p className="font-semibold text-xs sm:text-sm text-slate-800">
                {letterContent.closing}
              </p>
              <p className="font-script text-2xl sm:text-3xl text-rose-600 mt-1">
                {letterContent.signOff}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                soundEngine.playCelebrationFanfare();
                triggerHeartConfetti();
              }}
              className="px-6 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Send Brother a Virtual Hug 🤗</span>
            </button>
          </div>

        </div>
      )}
    </section>
  );
};
