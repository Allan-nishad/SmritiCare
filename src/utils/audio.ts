import { LanguageCode } from '../types';

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play a soft peaceful tone
  playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.15) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent catch
    }
  }

  // Card Flip Sound (warm click)
  playCardFlip() {
    this.playTone(320, 'sine', 0.12, 0.1);
  }

  playFlip() {
    this.playCardFlip();
  }

  // Positive Encouragement / Match Success Chime (ascending pentatonic notes)
  playSuccess() {
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.35, 0.12);
      }, idx * 75);
    });
  }

  // Soft Mistake / Try Again (warm non-harsh tone)
  playGentleTryAgain() {
    this.playTone(392, 'sine', 0.25, 0.08);
    setTimeout(() => {
      this.playTone(330, 'sine', 0.3, 0.08);
    }, 120);
  }

  playSoftTryAgain() {
    this.playGentleTryAgain();
  }

  // Alarm Ringing Tone (pulsing high-visibility notification)
  playAlarm() {
    const tones = [587.33, 880, 587.33, 880];
    tones.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.2, 0.2);
      }, idx * 180);
    });
  }

  // Phone Ringtone Simulation for SOS calls
  playPhoneRing() {
    this.playTone(440, 'sine', 0.8, 0.18);
    setTimeout(() => this.playTone(480, 'sine', 0.8, 0.18), 50);
  }

  // Soft Chime for notifications
  playChime() {
    this.playTone(523.25, 'sine', 0.3, 0.15);
    setTimeout(() => this.playTone(659.25, 'sine', 0.35, 0.12), 100);
  }

  // Warning Tone for geofence/safety alerts
  playWarning() {
    this.playTone(330, 'sawtooth', 0.25, 0.12);
    setTimeout(() => this.playTone(293.66, 'sawtooth', 0.3, 0.12), 150);
  }

  // Background Soothing Music Synthesizer (Assamese Flute / Peaceful Chords)
  startBackgroundMusic(trackType: 'folk' | 'flute' | 'river_ambient' | 'bihu' = 'flute') {
    this.initCtx();
    if (!this.ctx) return;
    this.stopBackgroundMusic();
    this.isMusicPlaying = true;

    // Peaceful pentatonic scales (Sa-Re-Ga-Pa-Dha)
    const scale = trackType === 'flute'
      ? [293.66, 329.63, 369.99, 440.00, 493.88, 587.33] // D Major Pentatonic
      : trackType === 'bihu'
      ? [329.63, 369.99, 440.00, 493.88, 554.37, 659.25] // E Major Folk Rhythm
      : [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C Major Peaceful Ambient

    let step = 0;
    const playNextNote = () => {
      if (!this.isMusicPlaying || !this.ctx) return;
      const note = scale[Math.floor(Math.random() * scale.length)];
      const duration = trackType === 'bihu' ? 0.6 : 1.4;
      this.playTone(note, 'sine', duration, 0.04);

      // Add gentle sub-harmonic drone every 4th note
      if (step % 4 === 0) {
        this.playTone(scale[0] / 2, 'triangle', 2.2, 0.02);
      }
      step++;
    };

    playNextNote();
    this.musicInterval = setInterval(playNextNote, trackType === 'bihu' ? 900 : 1600);
  }

  stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  isMusicActive() {
    return this.isMusicPlaying;
  }
}

export const sounds = new SoundSynthesizer();

/**
 * Enhanced Web Speech API Voice Synthesis with regional NER language codes & Male/Female profile variations
 */
export function speakText(
  text: string, 
  lang: string = 'en', 
  options?: { gender?: 'female' | 'male'; rate?: number }
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Web Speech API not supported in this browser.');
    return;
  }

  // Cancel ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Language mappings for Indian regional voices
  const langMap: Record<string, string> = {
    en: 'en-IN',
    'en-IN': 'en-IN',
    as: 'as-IN',
    'as-IN': 'as-IN',
    bn: 'bn-IN',
    'bn-IN': 'bn-IN',
    hi: 'hi-IN',
    'hi-IN': 'hi-IN',
    mni: 'mni-IN',
    'mni-IN': 'mni-IN'
  };

  utterance.lang = langMap[lang] || 'en-IN';
  utterance.rate = options?.rate || 0.88; // Slightly gentle, slower pace for elderly ease
  
  // Pitch adjustment for male / female family member personalization
  if (options?.gender === 'male') {
    utterance.pitch = 0.82; // Lower, deeper tone for Son (Rahul / Ravi)
  } else {
    utterance.pitch = 1.15; // Warmer, maternal/daughter tone for Meera / Priya
  }

  // Attempt to find best matching voice
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    const cleanLang = lang.split('-')[0];
    const targetLangPrefix = cleanLang === 'as' ? 'bn' : cleanLang === 'mni' ? 'bn' : cleanLang;
    const matchingVoice = voices.find(v => v.lang.startsWith(targetLangPrefix) || v.lang.startsWith('hi') || v.lang.startsWith('en-IN'));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
  }

  window.speechSynthesis.speak(utterance);
}
