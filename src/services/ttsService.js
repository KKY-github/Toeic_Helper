// Web Speech API and Web Audio Sound Effects Service

class TTSService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.currentUtterance = null;
    this.onStateChange = null;
    this.audioCtx = null;
    
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  getVoicesByAccent() {
    const enVoices = this.voices.filter(v => v.lang.startsWith('en'));
    const us = enVoices.filter(v => v.lang.includes('US') || v.name.includes('United States'));
    const gb = enVoices.filter(v => v.lang.includes('GB') || v.name.includes('UK') || v.name.includes('United Kingdom'));
    const au = enVoices.filter(v => v.lang.includes('AU') || v.name.includes('Australia'));

    return {
      us: us[0] || enVoices[0] || null,
      gb: gb[0] || enVoices[1] || enVoices[0] || null,
      au: au[0] || enVoices[2] || enVoices[0] || null,
      all: enVoices
    };
  }

  speak({ text, rate = 1.0, pitch = 1.0, accent = 'us', onEnd, onStart, onError }) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      if (onError) onError(new Error('TTS not supported'));
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // 0.75, 1.0, 1.25, 1.5
    utterance.pitch = pitch;

    const voices = this.getVoicesByAccent();
    if (accent === 'gb' && voices.gb) {
      utterance.voice = voices.gb;
    } else if (accent === 'au' && voices.au) {
      utterance.voice = voices.au;
    } else if (voices.us) {
      utterance.voice = voices.us;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      if (onError) onError(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  isPlaying() {
    return !!(this.synth && this.synth.speaking && !this.synth.paused);
  }

  // --- Sound Effects via Web Audio API (Zero external assets needed) ---
  initAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
  }

  playChime(type = 'correct') {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        // Bright two-tone chime
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'wrong') {
        // Low gentle buzz
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.exponentialRampToValueAtTime(164.81, now + 0.25); // E3
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'click') {
        // Subtle click
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      console.warn('Audio effect error:', e);
    }
  }
}

export const ttsService = new TTSService();
