import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Mail, Cake, PartyPopper } from 'lucide-react';
import { triggerFireworks, triggerGrandCelebration } from '../utils/confetti';
import { soundEngine } from '../utils/soundEffects';

interface BirthdayHeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenCake: () => void;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({ onNavigate, onOpenCake }) => {
  const [celebrationActive, setCelebrationActive] = useState(false);

  const handleCelebrate = () => {
    setCelebrationActive(true);
    triggerFireworks();
    triggerGrandCelebration(4500);
    soundEngine.playBirthdaySong();

    setTimeout(() => {
      setCelebrationActive(false);
    }, 4500);
  };

  return (
    <section className="relative pt-6 pb-14 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-0 right-10 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-36 left-4 w-72 h-72 bg-purple-200/35 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Card Container */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-10 md:p-12 text-center border border-white/80 shadow-xl overflow-hidden">
        
        {/* Floating Balloon Cluster Graphic */}
        <div className="flex justify-center items-center gap-2 mb-4 animate-float">
          <span className="text-3xl sm:text-4xl">🎈</span>
          <span className="text-4xl sm:text-5xl -translate-y-2">🌸</span>
          <span className="text-3xl sm:text-4xl">🎈</span>
        </div>

        {/* Quiet Kicker */}
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-pink-500 uppercase mb-2">
          Today the Queen was born ✨
        </p>

        {/* Grand Glowing Birthday Title */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-800 tracking-tight leading-tight">
          HAPPY BIRTHDAY <br className="sm:hidden" />
          <span className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 block sm:inline sm:ml-3">
            RANUUUU! 🎂❤️
          </span>
        </h1>

        {/* Personalized subtitle */}
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
          Welcome to your official digital paradise, crafted with boundless love, endless memories, and just the right amount of brotherly teasing.
        </p>

        {/* Action Buttons Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Main Celebration Trigger */}
          <button
            onClick={handleCelebrate}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-semibold text-sm sm:text-base shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PartyPopper className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>LET&apos;S CELEBRATE! 🎉</span>
          </button>

          {/* Cut Cake Jump */}
          <button
            onClick={onOpenCake}
            className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-pink-50/80 text-pink-700 font-medium text-sm sm:text-base border border-pink-200 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Cake className="w-5 h-5 text-pink-500" />
            <span>Light & Cut Cake 🎂</span>
          </button>

          {/* Gift Jump */}
          <button
            onClick={() => onNavigate('gifts')}
            className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-pink-100/70 hover:bg-pink-100 text-pink-800 font-semibold text-sm sm:text-base border border-pink-300/80 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Gift className="w-5 h-5 text-pink-600 animate-bounce" />
            <span>Gift Chahiye? 🎁</span>
          </button>
        </div>

        {/* Sibling Highlight Strip */}
        <div className="mt-10 pt-6 border-t border-pink-100/80 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-pink-500 text-base">👑</span>
            <span>Birthday Girl: <strong>Kritika (Ranu)</strong></span>
          </div>
          <span className="hidden sm:inline text-slate-300">·</span>
          <div className="flex items-center gap-2">
            <span className="text-purple-500 text-base">🛡️</span>
            <span>Chief Supporter & Annoyer: <strong>Kartik</strong></span>
          </div>
          <span className="hidden sm:inline text-slate-300">·</span>
          <div className="flex items-center gap-2">
            <span className="text-rose-500 text-base">✨</span>
            <span>Status: <strong>Queen for the day & forever</strong></span>
          </div>
        </div>

        {/* Interactive Feature Shortcuts Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <button
            onClick={() => onNavigate('letter')}
            className="p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-pink-100 shadow-sm hover:shadow transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-slate-800">Brother&apos;s Letter</div>
            <div className="text-[11px] text-slate-500">Emotional surprise</div>
          </button>

          <button
            onClick={() => onNavigate('memories')}
            className="p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-pink-100 shadow-sm hover:shadow transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-slate-800">Memory Polaroids</div>
            <div className="text-[11px] text-slate-500">Childhood & smiles</div>
          </button>

          <button
            onClick={() => onNavigate('secret')}
            className="p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-pink-100 shadow-sm hover:shadow transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-slate-800">Secret Room 👀</div>
            <div className="text-[11px] text-slate-500">Locked surprises</div>
          </button>

          <button
            onClick={() => onNavigate('final')}
            className="p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-pink-100 shadow-sm hover:shadow transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-slate-800">Final Heart Note</div>
            <div className="text-[11px] text-slate-500">The biggest wish</div>
          </button>
        </div>

      </div>

      {celebrationActive && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full border border-pink-300 shadow-2xl flex items-center gap-2 text-pink-600 font-semibold text-sm animate-bounce">
          <PartyPopper className="w-4 h-4" />
          <span>WISHING YOU THE HAPPIEST BIRTHDAY EVER, RANU! 💖🎉</span>
        </div>
      )}
    </section>
  );
};
