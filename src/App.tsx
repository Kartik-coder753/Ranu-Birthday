/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Navigation } from './components/Navigation';
import { FloatingEffects } from './components/FloatingEffects';
import { BirthdayHero } from './components/BirthdayHero';
import { BirthdayCake } from './components/BirthdayCake';
import { GiftSection } from './components/GiftSection';
import { BrotherLetter } from './components/BrotherLetter';
import { MemoryGallery } from './components/MemoryGallery';
import { MusicPlayer } from './components/MusicPlayer';
import { SecretRoom } from './components/SecretRoom';
import { Wishlist } from './components/Wishlist';
import { MiniGames } from './components/MiniGames';
import { FinalSurprise } from './components/FinalSurprise';
import { soundEngine } from './utils/soundEffects';
import { triggerGrandCelebration, triggerFireworks } from './utils/confetti';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    // Check if user already entered in session
    return sessionStorage.getItem('ranu_birthday_entered') === 'true';
  });

  const [activeSection, setActiveSection] = useState<string>('celebration');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());

  const handleEnterWorld = () => {
    setHasEntered(true);
    sessionStorage.setItem('ranu_birthday_entered', 'true');
    setIsPlayingMusic(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayBirthdaySong = () => {
    soundEngine.playBirthdaySong(() => {
      // Return to ambient loop on song complete
    });
    setIsPlayingMusic(true);
    triggerFireworks();
    triggerGrandCelebration(4000);
    handleNavigate('cake');
  };

  const handleToggleMute = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
    if (nextMuted) {
      setIsPlayingMusic(false);
    } else {
      setIsPlayingMusic(true);
      soundEngine.resumeMusic();
    }
  };

  // Sync scroll position with active navigation item
  useEffect(() => {
    if (!hasEntered) return;

    const sections = ['celebration', 'cake', 'gifts', 'letter', 'memories', 'music', 'secret', 'wishlist', 'games', 'final'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  return (
    <div className="min-h-screen bg-[#fff8fa] text-slate-800 selection:bg-pink-200 selection:text-pink-900 font-sans relative pb-20 lg:pb-12">
      
      {/* 1. Grand Welcome Full-Screen Entry */}
      {!hasEntered && (
        <WelcomeScreen onEnter={handleEnterWorld} />
      )}

      {/* 2. Ambient Floating Sparkles, Butterflies, & Petals */}
      <FloatingEffects />

      {/* 3. Top Navigation Bar (with 3-Zone Contract) & Mobile Thumb Bar */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onPlayBirthdaySong={handlePlayBirthdaySong}
        isPlayingMusic={isPlayingMusic}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Sections Flow */}
      <main className="relative z-10 space-y-4 md:space-y-8">
        
        {/* Section 1: Birthday Celebration Hero */}
        <div id="celebration">
          <BirthdayHero
            onNavigate={handleNavigate}
            onOpenCake={() => handleNavigate('cake')}
          />
        </div>

        {/* Section 2: Interactive Birthday Cake */}
        <BirthdayCake />

        {/* Section 3: The Hilarious Escaping Gifts (Gift Chahiye?) */}
        <GiftSection />

        {/* Section 4: Special Brother's Letter */}
        <BrotherLetter />

        {/* Section 5: Memory Photo Gallery */}
        <MemoryGallery />

        {/* Section 6: Jukebox & Music Player */}
        <MusicPlayer
          onPlayBirthdaySong={handlePlayBirthdaySong}
          isPlaying={isPlayingMusic}
          setIsPlaying={setIsPlayingMusic}
        />

        {/* Section 7: Secret Surprise Room */}
        <SecretRoom />

        {/* Section 8: Ranu's Wishlist */}
        <Wishlist />

        {/* Section 9: Birthday Mini Games */}
        <MiniGames />

        {/* Section 10: The Final Heartfelt Surprise */}
        <FinalSurprise />

      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 pt-8 pb-12 border-t border-pink-100/90 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5 text-pink-600 font-semibold">
            <span>Made with endless love by Kartik for Kritika aka Ranu</span>
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            RANU&apos;S MAGICAL BIRTHDAY WORLD · A LITTLE WORLD CREATED JUST FOR YOU ✨
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
            <button
              onClick={() => {
                sessionStorage.removeItem('ranu_birthday_entered');
                setHasEntered(false);
              }}
              className="hover:text-pink-600 transition-colors underline"
            >
              Replay Welcome Screen
            </button>
            <span>·</span>
            <button
              onClick={handlePlayBirthdaySong}
              className="hover:text-pink-600 transition-colors underline"
            >
              Play Birthday Song
            </button>
            <span>·</span>
            <span>Happy Birthday Queen! 👑</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
