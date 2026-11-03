/**
 * Audio Engine with Dedicated User Audio Tracks and Web Audio API Synthesis.
 * Track 1 (Background Ambient): Dream Protocol - Inside Your Dreams Ambient Piano
 * Track 2 (Birthday Celebration): SigmaMusicArt - Happy Birthday
 */

export const AUDIO_TRACKS = {
  ambient: '/assets/aistudio/dream-protocol-inside-your-dreams-ambient-piano-111082_e325f568.mp3',
  birthday: '/assets/aistudio/sigmamusicart-happy-birthday-258264_8f7a65de.mp3',
};

class BirthdayAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private currentTrack: 'ambient' | 'birthday' | 'synth' | 'custom' = 'ambient';

  private ambientAudio: HTMLAudioElement | null = null;
  private birthdayAudio: HTMLAudioElement | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElements();
    }
  }

  private initAudioElements() {
    // 1. Ambient Background Piano Track
    if (!this.ambientAudio) {
      this.ambientAudio = new Audio(AUDIO_TRACKS.ambient);
      this.ambientAudio.loop = true;
      this.ambientAudio.preload = 'auto';
      this.ambientAudio.volume = this.volume;
    }

    // 2. Happy Birthday Celebration Song Track
    if (!this.birthdayAudio) {
      this.birthdayAudio = new Audio(AUDIO_TRACKS.birthday);
      this.birthdayAudio.loop = false;
      this.birthdayAudio.preload = 'auto';
      this.birthdayAudio.volume = this.volume;
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ambientAudio) this.ambientAudio.volume = this.volume;
    if (this.birthdayAudio) this.birthdayAudio.volume = this.volume;
    if (this.customAudio) this.customAudio.volume = this.volume;
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ambientAudio) this.ambientAudio.muted = this.isMuted;
    if (this.birthdayAudio) this.birthdayAudio.muted = this.isMuted;
    if (this.customAudio) this.customAudio.muted = this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentTrack(): string {
    return this.currentTrack;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // ================= 1. BACKGROUND AMBIENT MUSIC =================
  public startAmbientMusic() {
    this.initAudioElements();
    this.initContext();

    // Pause birthday or custom track if playing
    if (this.birthdayAudio && !this.birthdayAudio.paused) {
      this.birthdayAudio.pause();
      this.birthdayAudio.currentTime = 0;
    }
    if (this.customAudio && !this.customAudio.paused) {
      this.customAudio.pause();
    }

    this.currentTrack = 'ambient';

    if (this.ambientAudio) {
      this.ambientAudio.currentTime = this.ambientAudio.currentTime || 0;
      this.ambientAudio.muted = this.isMuted;
      this.ambientAudio.volume = this.volume;

      const playPromise = this.ambientAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
          })
          .catch((err) => {
            console.warn("Ambient audio play waiting for user touch/gesture:", err);
            // Fallback synthesis if blocked
            this.startSynthesizedAmbient();
          });
      }
    } else {
      this.startSynthesizedAmbient();
    }
  }

  // ================= 2. HAPPY BIRTHDAY SONG =================
  public playBirthdaySong(onComplete?: () => void) {
    this.initAudioElements();
    this.initContext();

    // Pause background ambient music while birthday song plays
    if (this.ambientAudio && !this.ambientAudio.paused) {
      this.ambientAudio.pause();
    }
    if (this.customAudio && !this.customAudio.paused) {
      this.customAudio.pause();
    }

    this.currentTrack = 'birthday';

    if (this.birthdayAudio) {
      this.birthdayAudio.currentTime = 0;
      this.birthdayAudio.muted = this.isMuted;
      this.birthdayAudio.volume = this.volume;

      // On finish, smoothly transition back to background ambient music
      this.birthdayAudio.onended = () => {
        if (onComplete) onComplete();
        this.startAmbientMusic();
      };

      const playPromise = this.birthdayAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
          })
          .catch((err) => {
            console.warn("Birthday audio play error or blocked:", err);
            this.playSynthesizedBirthday(onComplete);
          });
      }
    } else {
      this.playSynthesizedBirthday(onComplete);
    }
  }

  // ================= 3. CUSTOM AUDIO =================
  public playCustomAudio(audioUrl: string) {
    this.stopAllMusic();
    this.currentTrack = 'custom';
    if (!this.customAudio) {
      this.customAudio = new Audio();
    }
    this.customAudio.src = audioUrl;
    this.customAudio.volume = this.volume;
    this.customAudio.muted = this.isMuted;
    this.customAudio.loop = true;
    this.customAudio.play().then(() => {
      this.isPlaying = true;
    }).catch(err => {
      console.warn("Audio play prevented:", err);
      this.startAmbientMusic();
    });
  }

  public pauseMusic() {
    this.isPlaying = false;
    if (this.ambientAudio) this.ambientAudio.pause();
    if (this.birthdayAudio) this.birthdayAudio.pause();
    if (this.customAudio) this.customAudio.pause();
    this.stopSynthesizedMusic();
  }

  public resumeMusic() {
    if (this.currentTrack === 'birthday') {
      if (this.birthdayAudio) {
        this.birthdayAudio.play().then(() => { this.isPlaying = true; });
      } else {
        this.playBirthdaySong();
      }
    } else if (this.currentTrack === 'custom' && this.customAudio) {
      this.customAudio.play().then(() => { this.isPlaying = true; });
    } else {
      this.startAmbientMusic();
    }
  }

  public stopAllMusic() {
    this.isPlaying = false;
    if (this.ambientAudio) {
      this.ambientAudio.pause();
    }
    if (this.birthdayAudio) {
      this.birthdayAudio.pause();
      this.birthdayAudio.currentTime = 0;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.stopSynthesizedMusic();
  }

  // ================= 4. SOUND EFFECTS (Web Audio API) =================
  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', delay: number = 0, gainMultiplier: number = 1) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    const peakGain = 0.25 * this.volume * gainMultiplier;
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  private playChime(freq: number, duration: number = 1.2, delay: number = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    this.playTone(freq, duration, 'sine', delay, 0.7);
    this.playTone(freq * 2.02, duration * 0.7, 'triangle', delay, 0.3);
    this.playTone(freq * 3.01, duration * 0.4, 'sine', delay, 0.15);
  }

  public playCelebrationFanfare() {
    this.initContext();
    const fanfareNotes = [523.25, 659.25, 783.99, 1046.50];
    fanfareNotes.forEach((f, i) => {
      this.playChime(f, 0.8, i * 0.12);
    });
    setTimeout(() => {
      this.playChime(1046.50, 2.0, 0);
      this.playChime(1318.51, 2.0, 0);
    }, 550);
  }

  public playBalloonPop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, startTime);
    osc.frequency.exponentialRampToValueAtTime(70, startTime + 0.12);

    gain.gain.setValueAtTime(0.3 * this.volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.13);

    this.playChime(880, 0.4, 0.08);
  }

  public playWhoosh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(250, startTime);
    osc.frequency.exponentialRampToValueAtTime(750, startTime + 0.15);

    gain.gain.setValueAtTime(0.18 * this.volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.2);
  }

  public playCandleBlow() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, startTime);
    osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.35);

    gain.gain.setValueAtTime(0.25 * this.volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.36);

    this.playSparkle();
  }

  public playSparkle() {
    if (this.isMuted) return;
    const sparkleNotes = [880, 1108.73, 1318.51, 1760];
    sparkleNotes.forEach((f, i) => {
      this.playChime(f, 0.9, i * 0.08);
    });
  }

  public playCatchDing() {
    this.playChime(1046.50, 0.5, 0);
  }

  public playEnvelopeOpen() {
    this.playTone(440, 0.6, 'sine', 0, 0.3);
    this.playChime(880, 1.2, 0.2);
  }

  // ================= SYNTHESIS FALLBACKS =================
  private synthInterval: number | null = null;
  private startSynthesizedAmbient() {
    this.stopSynthesizedMusic();
    const chords = [
      [261.63, 329.63, 392.00, 523.25],
      [220.00, 261.63, 329.63, 440.00],
      [174.61, 220.00, 261.63, 349.23],
      [196.00, 246.94, 293.66, 392.00]
    ];
    let idx = 0;
    const step = () => {
      if (this.isMuted) return;
      const c = chords[idx % chords.length];
      idx++;
      c.forEach((f, i) => this.playTone(f, 2.5, 'triangle', i * 0.45, 0.4));
    };
    step();
    this.synthInterval = window.setInterval(step, 4500);
    this.isPlaying = true;
  }

  private playSynthesizedBirthday(onComplete?: () => void) {
    const notes = [
      { f: 261.63, d: 0.35, pause: 0.4 },
      { f: 261.63, d: 0.35, pause: 0.4 },
      { f: 293.66, d: 0.7,  pause: 0.75 },
      { f: 261.63, d: 0.7,  pause: 0.75 },
      { f: 349.23, d: 0.7,  pause: 0.75 },
      { f: 329.63, d: 1.2,  pause: 1.3 },
      { f: 261.63, d: 0.35, pause: 0.4 },
      { f: 261.63, d: 0.35, pause: 0.4 },
      { f: 293.66, d: 0.7,  pause: 0.75 },
      { f: 261.63, d: 0.7,  pause: 0.75 },
      { f: 392.00, d: 0.7,  pause: 0.75 },
      { f: 349.23, d: 1.2,  pause: 1.3 },
    ];
    let t = 0;
    notes.forEach((n) => {
      this.playChime(n.f, n.d * 1.5, t);
      t += n.pause;
    });
    setTimeout(() => {
      if (onComplete) onComplete();
      this.startAmbientMusic();
    }, t * 1000 + 500);
  }

  private stopSynthesizedMusic() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const soundEngine = new BirthdayAudioEngine();
