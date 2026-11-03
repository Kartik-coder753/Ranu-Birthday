import React, { useState } from 'react';
import { 
  Sparkles, 
  Gift, 
  Mail, 
  Camera, 
  Music, 
  Lock, 
  HeartHandshake, 
  Gamepad2, 
  Cake, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  Heart
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onPlayBirthdaySong: () => void;
  isPlayingMusic: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  onPlayBirthdaySong,
  isPlayingMusic,
  isMuted,
  onToggleMute
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'celebration', label: 'Celebration', icon: Sparkles },
    { id: 'cake', label: 'Birthday Cake', icon: Cake },
    { id: 'gifts', label: 'Gift Chahiye?', icon: Gift, highlight: true },
    { id: 'letter', label: "Brother's Letter", icon: Mail },
    { id: 'memories', label: 'Memories', icon: Camera },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'secret', label: 'Secret Room', icon: Lock },
    { id: 'wishlist', label: 'Wishlist', icon: HeartHandshake },
    { id: 'games', label: 'Mini Games', icon: Gamepad2 },
    { id: 'final', label: 'Final Surprise', icon: Heart, badge: '❤️' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* DESKTOP TOP BAR (Contract compliant: 3 zones separated by gap-8) */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-pink-100/80 px-4 md:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <button
            onClick={() => handleNavClick('celebration')}
            className="text-lg md:text-xl font-display font-bold text-slate-900 tracking-tight whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left"
          >
            <span>Ranu&apos;s World</span>
            <span className="text-pink-500 font-script text-2xl">❤️</span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
            {navItems.slice(0, 7).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-pink-600 cursor-pointer ${
                  activeSection === item.id ? 'text-pink-600 font-semibold underline underline-offset-4 decoration-pink-400' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('games')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-pink-600 cursor-pointer ${
                activeSection === 'games' ? 'text-pink-600 font-semibold underline underline-offset-4 decoration-pink-400' : ''
              }`}
            >
              Games
            </button>
            <button
              onClick={() => handleNavClick('final')}
              className={`transition-colors whitespace-nowrap shrink-0 text-rose-500 hover:text-rose-700 font-semibold cursor-pointer ${
                activeSection === 'final' ? 'underline underline-offset-4 decoration-rose-400' : ''
              }`}
            >
              Surprise ✨
            </button>
          </nav>

          {/* Zone 3: Primary action + sound button */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 transition-colors flex items-center justify-center cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Play Birthday Song CTA */}
            <button
              onClick={onPlayBirthdaySong}
              className="px-3.5 py-2 text-xs md:text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-500/20 active:scale-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Music className="w-3.5 h-3.5" />
              <span>Play Song 🎶</span>
            </button>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-pink-50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE POPUP DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-72 max-w-[85vw] h-full bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-pink-100">
                <span className="font-display font-bold text-slate-900 text-lg">All Sections</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-pink-100 text-pink-700 font-semibold'
                          : 'text-slate-700 hover:bg-pink-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-pink-600' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                      {item.badge && <span className="ml-auto text-xs">{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-pink-100">
              <button
                onClick={() => {
                  onPlayBirthdaySong();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-pink-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <Music className="w-4 h-4" />
                <span>Play Birthday Song</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM ERGONOMIC TAB BAR (Natural thumb zone) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-pink-100 px-2 py-1 shadow-lg pb-safe">
        <div className="grid grid-cols-5 items-center h-14">
          <button
            onClick={() => handleNavClick('celebration')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeSection === 'celebration' ? 'text-pink-600 font-semibold' : 'text-slate-400'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5">Celebrate</span>
          </button>

          <button
            onClick={() => handleNavClick('gifts')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeSection === 'gifts' ? 'text-pink-600 font-semibold' : 'text-slate-400'
            }`}
          >
            <Gift className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5">Gifts</span>
          </button>

          <button
            onClick={() => handleNavClick('letter')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeSection === 'letter' ? 'text-pink-600 font-semibold' : 'text-slate-400'
            }`}
          >
            <Mail className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5">Letter</span>
          </button>

          <button
            onClick={() => handleNavClick('games')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeSection === 'games' ? 'text-pink-600 font-semibold' : 'text-slate-400'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5">Games</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-pink-600 transition-colors"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5">More</span>
          </button>
        </div>
      </div>
    </>
  );
};
