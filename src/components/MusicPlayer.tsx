import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Music, 
  Sparkles, 
  Upload, 
  Disc,
  Radio
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import { triggerConfettiExplosion, triggerFireworks, triggerHeartConfetti } from '../utils/confetti';

interface MusicPlayerProps {
  onPlayBirthdaySong: () => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  onPlayBirthdaySong,
  isPlaying,
  setIsPlaying
}) => {
  const [activeTrackId, setActiveTrackId] = useState<string>('ambient');
  const [volume, setVolume] = useState<number>(soundEngine.getVolume());
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const [customTrackName, setCustomTrackName] = useState<string | null>(null);

  const playlist = [
    {
      id: 'ambient',
      title: 'Inside Your Dreams (Ambient Piano)',
      subtitle: 'Dream Protocol · Soothing background melody',
      mood: 'Peaceful & Loving',
      play: () => soundEngine.startAmbientMusic(),
    },
    {
      id: 'birthday',
      title: 'Happy Birthday To You (Celebration Song)',
      subtitle: 'SigmaMusicArt · Official birthday celebration anthem',
      mood: 'Joyful & Energetic',
      play: () => soundEngine.playBirthdaySong(),
    },
    {
      id: 'celebration',
      title: 'Grand Birthday Fanfare',
      subtitle: 'Harmonic brass & glockenspiel chimes',
      mood: 'Festive & Royal',
      play: () => soundEngine.playCelebrationFanfare(),
    },
  ];

  const handleTrackSelect = (trackId: string) => {
    setActiveTrackId(trackId);
    const track = playlist.find((t) => t.id === trackId);
    if (track) {
      track.play();
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundEngine.pauseMusic();
      setIsPlaying(false);
    } else {
      const track = playlist.find((t) => t.id === activeTrackId);
      if (track) {
        track.play();
      } else {
        soundEngine.startAmbientMusic();
      }
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    const currentIndex = playlist.findIndex((t) => t.id === activeTrackId);
    const nextIndex = (currentIndex + 1) % playlist.length;
    handleTrackSelect(playlist[nextIndex].id);
  };

  const handlePrevTrack = () => {
    const currentIndex = playlist.findIndex((t) => t.id === activeTrackId);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    handleTrackSelect(playlist[prevIndex].id);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Custom audio file upload
  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomTrackName(file.name);
      soundEngine.playCustomAudio(url);
      setActiveTrackId('custom');
      setIsPlaying(true);
    }
  };

  return (
    <section id="music" className="py-14 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-pink-200/90 shadow-2xl relative overflow-hidden">
        
        {/* Background decorative music disc */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-pink-100/50 pointer-events-none flex items-center justify-center">
          <Disc className={`w-36 h-36 text-pink-200 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        </div>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-pink-500 uppercase mb-1">
            Melodies Of Magic 🎵
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-800">
            Ranu&apos;s Birthday Jukebox
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Soft ambient piano chords, chime music box tunes, or your own uploaded song.
          </p>
        </div>

        {/* Grand Birthday Song Special Action */}
        <div className="mb-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-pink-200 block">
              Highlight Track
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold">
              The Happy Birthday Song
            </h3>
            <p className="text-xs text-pink-100 mt-0.5">
              Synchronized with full confetti burst & celebration lights
            </p>
          </div>

          <button
            onClick={() => {
              onPlayBirthdaySong();
              setIsPlaying(true);
              setActiveTrackId('birthday');
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-pink-600 font-bold text-xs sm:text-sm shadow-md hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>PLAY THE BIRTHDAY SONG 🎶</span>
          </button>
        </div>

        {/* Current Track Display with Visualizer Bars */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-pink-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center shadow-md shadow-pink-300/40 shrink-0">
              <Radio className={`w-7 h-7 ${isPlaying ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <div className="text-xs text-pink-500 font-semibold tracking-wide">
                NOW PLAYING
              </div>
              <h4 className="font-display font-bold text-base sm:text-lg text-slate-800">
                {activeTrackId === 'custom'
                  ? customTrackName || 'Custom Brother Song'
                  : playlist.find((t) => t.id === activeTrackId)?.title}
              </h4>
              <p className="text-xs text-slate-500">
                {activeTrackId === 'custom'
                  ? 'Personal MP3 Audio'
                  : playlist.find((t) => t.id === activeTrackId)?.subtitle}
              </p>
            </div>
          </div>

          {/* Sound Visualizer Bars */}
          <div className="flex items-end gap-1 h-8 px-4 py-1">
            {[40, 75, 55, 90, 65, 30, 85, 45, 95, 60].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-pink-400 rounded-full transition-all"
                style={{
                  height: isPlaying ? `${h}%` : '20%',
                  animation: isPlaying ? `bounce 0.8s ease-in-out infinite alternate ${i * 0.1}s` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-pink-50/70 rounded-2xl border border-pink-100 relative z-10">
          
          {/* Play/Pause & Skip Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevTrack}
              className="p-2.5 rounded-xl bg-white hover:bg-pink-100 text-slate-700 shadow-xs transition-colors cursor-pointer"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>

            <button
              onClick={handleNextTrack}
              className="p-2.5 rounded-xl bg-white hover:bg-pink-100 text-slate-700 shadow-xs transition-colors cursor-pointer"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleToggleMute}
              className="p-2 text-slate-600 hover:text-pink-600 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-pink-600" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-28 accent-pink-500 cursor-pointer"
            />
            <span className="text-[11px] font-mono text-slate-400 w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Upload Custom MP3 */}
          <div>
            <label className="px-3 py-2 rounded-xl bg-white hover:bg-pink-100 border border-pink-200 text-pink-700 font-medium text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Load My MP3</span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleCustomAudioUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Tracklist selection */}
        <div className="mt-6 space-y-2 relative z-10">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
            Available Tracks
          </div>
          {playlist.map((track) => (
            <div
              key={track.id}
              onClick={() => handleTrackSelect(track.id)}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                activeTrackId === track.id
                  ? 'bg-pink-100/80 border-pink-300 text-pink-900 font-semibold shadow-xs'
                  : 'bg-white/60 hover:bg-white border-pink-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Music className={`w-4 h-4 ${activeTrackId === track.id ? 'text-pink-600' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs sm:text-sm">{track.title}</div>
                  <div className="text-[11px] text-slate-400 font-normal">{track.subtitle}</div>
                </div>
              </div>
              <span className="text-[10px] text-pink-600 font-medium bg-white px-2 py-0.5 rounded-full border border-pink-200">
                {track.mood}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
