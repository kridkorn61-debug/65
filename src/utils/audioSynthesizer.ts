// Web Audio API Synthesizer for InGen Park Systems
// Completely self-contained - zero external network requests or broken audio links!

class SoundSystem {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public playTerminalClick() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio fallback silent
    }
  }

  public playSonarPing() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1250, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(580, this.ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    } catch {
      // Audio fallback silent
    }
  }

  public playAlertSiren() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(950, now + 0.3);
      osc.frequency.linearRampToValueAtTime(600, now + 0.6);
      osc.frequency.linearRampToValueAtTime(950, now + 0.9);
      osc.frequency.linearRampToValueAtTime(600, now + 1.2);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.35);
    } catch {
      // Audio fallback silent
    }
  }

  // Create White Noise buffer helper
  private createNoiseBuffer(durationSeconds: number): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * durationSeconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * Specialized acoustic synthesizer for each prehistoric species
   */
  public playSpeciesSound(speciesId: string, baseFreq: number = 85) {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    try {
      switch (speciesId) {
        case 't-rex': {
          // T-Rex: Low subterranean chest rumble + explosive guttural roar
          const subOsc = this.ctx.createOscillator();
          const subGain = this.ctx.createGain();
          subOsc.type = 'sawtooth';
          subOsc.frequency.setValueAtTime(55, now);
          subOsc.frequency.linearRampToValueAtTime(110, now + 0.3);
          subOsc.frequency.exponentialRampToValueAtTime(35, now + 1.6);

          const noiseBuf = this.createNoiseBuffer(1.6);
          if (noiseBuf) {
            const noise = this.ctx.createBufferSource();
            noise.buffer = noiseBuf;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, now);
            filter.frequency.linearRampToValueAtTime(850, now + 0.35);
            filter.frequency.exponentialRampToValueAtTime(100, now + 1.6);

            const noiseGain = this.ctx.createGain();
            noiseGain.gain.setValueAtTime(0.22, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

            noise.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(this.ctx.destination);
            noise.start(now);
            noise.stop(now + 1.65);
          }

          subGain.gain.setValueAtTime(0.28, now);
          subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

          subOsc.connect(subGain);
          subGain.connect(this.ctx.destination);
          subOsc.start(now);
          subOsc.stop(now + 1.65);
          break;
        }

        case 'velociraptor': {
          // Velociraptor: High-pitched piercing bird/reptilian shriek, rapid double bark + hiss
          [0, 0.28].forEach((offset) => {
            if (!this.ctx) return;
            const t = now + offset;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(650, t);
            osc.frequency.exponentialRampToValueAtTime(320, t + 0.22);

            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.23);
          });

          // Breath hiss
          const noiseBuf = this.createNoiseBuffer(0.7);
          if (noiseBuf) {
            const noise = this.ctx.createBufferSource();
            noise.buffer = noiseBuf;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1800, now);
            filter.Q.setValueAtTime(3.0, now);

            const nGain = this.ctx.createGain();
            nGain.gain.setValueAtTime(0.12, now);
            nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

            noise.connect(filter);
            filter.connect(nGain);
            nGain.connect(this.ctx.destination);
            noise.start(now);
            noise.stop(now + 0.7);
          }
          break;
        }

        case 'mosasaurus': {
          // Mosasaurus: Sub-aquatic leviathan boom & underwater resonance
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc1.type = 'sine';
          osc2.type = 'triangle';
          osc1.frequency.setValueAtTime(45, now);
          osc1.frequency.linearRampToValueAtTime(95, now + 0.4);
          osc1.frequency.exponentialRampToValueAtTime(30, now + 1.8);

          osc2.frequency.setValueAtTime(90, now);
          osc2.frequency.exponentialRampToValueAtTime(40, now + 1.8);

          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 1.85);
          osc2.stop(now + 1.85);
          break;
        }

        case 'indominus-rex': {
          // Indominus Rex: Menacing dual-tone hybrid shriek + metallic roar distortion
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc1.type = 'sawtooth';
          osc2.type = 'square';

          osc1.frequency.setValueAtTime(180, now);
          osc1.frequency.linearRampToValueAtTime(260, now + 0.3);
          osc1.frequency.exponentialRampToValueAtTime(70, now + 1.7);

          osc2.frequency.setValueAtTime(340, now);
          osc2.frequency.exponentialRampToValueAtTime(120, now + 1.7);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(950, now);
          filter.frequency.exponentialRampToValueAtTime(200, now + 1.7);

          gain.gain.setValueAtTime(0.24, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.7);

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 1.75);
          osc2.stop(now + 1.75);
          break;
        }

        case 'parasaurolophus': {
          // Parasaurolophus: Famous hollow crest acoustic trombone horn!
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc1.type = 'triangle';
          osc2.type = 'sine';

          // Resonant brass horn frequency (fundamental + 3rd harmonic)
          osc1.frequency.setValueAtTime(185, now);
          osc1.frequency.linearRampToValueAtTime(215, now + 0.5);
          osc1.frequency.linearRampToValueAtTime(175, now + 1.5);

          osc2.frequency.setValueAtTime(370, now);
          osc2.frequency.linearRampToValueAtTime(430, now + 0.5);
          osc2.frequency.linearRampToValueAtTime(350, now + 1.5);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(400, now);
          filter.Q.setValueAtTime(4.0, now);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.25, now + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

          osc1.connect(gain);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 1.65);
          osc2.stop(now + 1.65);
          break;
        }

        case 'apatosaurus': {
          // Apatosaurus: Deep majestic low-frequency sauropod drone echoing across valleys
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(55, now);
          osc.frequency.linearRampToValueAtTime(75, now + 0.6);
          osc.frequency.exponentialRampToValueAtTime(40, now + 2.0);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.28, now + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 2.05);
          break;
        }

        case 'triceratops': {
          // Triceratops: Heavy snort and aggressive rhino-like bellow
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(140, now);
          osc.frequency.linearRampToValueAtTime(190, now + 0.25);
          osc.frequency.exponentialRampToValueAtTime(65, now + 1.2);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, now);

          gain.gain.setValueAtTime(0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 1.25);
          break;
        }

        case 'pteranodon': {
          // Pteranodon: Piercing aerial raptor screech & wind cry
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(550, now);
          osc.frequency.linearRampToValueAtTime(950, now + 0.3);
          osc.frequency.exponentialRampToValueAtTime(420, now + 1.1);

          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 1.15);
          break;
        }

        case 'dimorphodon': {
          // Dimorphodon: Rapid chattering clicks & screech
          [0, 0.12, 0.24, 0.36].forEach((offset) => {
            if (!this.ctx) return;
            const t = now + offset;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800 + Math.random() * 200, t);
            osc.frequency.exponentialRampToValueAtTime(350, t + 0.09);

            gain.gain.setValueAtTime(0.14, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.1);
          });
          break;
        }

        case 'gallimimus': {
          // Gallimimus: Rapid flock chirps and staccato bird-like squeaks
          [0, 0.15, 0.3].forEach((offset, idx) => {
            if (!this.ctx) return;
            const t = now + offset;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const f = idx % 2 === 0 ? 420 : 580;
            osc.frequency.setValueAtTime(f, t);
            osc.frequency.linearRampToValueAtTime(f * 1.3, t + 0.06);
            osc.frequency.exponentialRampToValueAtTime(f * 0.7, t + 0.12);

            gain.gain.setValueAtTime(0.16, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.13);
          });
          break;
        }

        case 'ankylosaurus': {
          // Ankylosaurus: Deep armored low-frequency rumble & tail thud
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(85, now);
          osc.frequency.linearRampToValueAtTime(115, now + 0.2);
          osc.frequency.exponentialRampToValueAtTime(45, now + 1.3);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(260, now);

          gain.gain.setValueAtTime(0.26, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 1.35);
          break;
        }

        case 'stegosaurus': {
          // Stegosaurus: Low rasping throat rumble & tail rattle
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(105, now);
          osc.frequency.exponentialRampToValueAtTime(50, now + 1.2);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, now);

          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 1.25);
          break;
        }

        case 'pachycephalosaurus': {
          // Pachycephalosaurus: Forceful snort and charging headbutt grunt
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(210, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.7);

          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.75);
          break;
        }

        default: {
          // Default roar with given base frequency
          this.playGenericRoar(baseFreq);
          break;
        }
      }
    } catch {
      // Audio fallback silent
    }
  }

  private playGenericRoar(baseFreq: number = 85) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(baseFreq * 0.7, now);
    subOsc.frequency.linearRampToValueAtTime(baseFreq * 1.4, now + 0.4);
    subOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 1.2);

    subGain.gain.setValueAtTime(0.18, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 1.25);
  }

  public playDinosaurRoar(baseFreq: number = 85, speciesId?: string) {
    if (speciesId) {
      this.playSpeciesSound(speciesId, baseFreq);
    } else {
      this.playGenericRoar(baseFreq);
    }
  }
}

export const soundManager = new SoundSystem();
