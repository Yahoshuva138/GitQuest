// 8-Bit & Anime Sound Synthesizer using Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 🪙 Classic Coin Sound
export function playCoinSound(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(987.77, now); // B5
  osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.start(now);
  osc.stop(now + 0.35);
}

// 🌟 Success Fanfare
export function playSuccessSound(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(ctx.destination);

    const noteStart = now + idx * 0.09;
    osc.frequency.setValueAtTime(freq, noteStart);
    gain.gain.setValueAtTime(0.15, noteStart);
    gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25);

    osc.start(noteStart);
    osc.stop(noteStart + 0.25);
  });
}

// ❌ Error Sawtooth Buzz
export function playErrorSound(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.setValueAtTime(120, now + 0.1);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.start(now);
  osc.stop(now + 0.25);
}

// 🕹️ Button Click Blip
export function playClickSound(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.start(now);
  osc.stop(now + 0.04);
}

// ⚡ Super Saiyan / Power-Up Anime Sound
export function playPowerUpSound(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.connect(gain);
  gain.connect(ctx.destination);

  // Sweep frequency rapidly from 220Hz up to 1760Hz
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(1760, now + 0.35);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc.start(now);
  osc.stop(now + 0.4);
}

// 🥷 Anime Jutsu Chime (Resonant bell for atomic commits & staging)
export function playJutsuSound(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const frequencies = [880, 1320, 1760]; // Harmonics

  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.08 / (i + 1), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.start(now);
    osc.stop(now + 0.6);
  });
}

// 🏆 Epic Mission Complete Anime Fanfare (Multi-harmony victory)
export function playMissionCompleteAnimeSound(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Glorious victory progression: F5, A5, C6, E6, G6
  const chords = [
    { freq: 698.46, delay: 0.0 },
    { freq: 880.0, delay: 0.1 },
    { freq: 1046.5, delay: 0.2 },
    { freq: 1318.51, delay: 0.3 },
    { freq: 1567.98, delay: 0.45 },
  ];

  chords.forEach(({ freq, delay }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(ctx.destination);

    const start = now + delay;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.16, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

    osc.start(start);
    osc.stop(start + 0.5);
  });
}

// ⌨️ Mechanical Hacker Keystroke Click
export function playHackerTypingSound(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.connect(gain);
  gain.connect(ctx.destination);

  // High pitch short click
  const randomPitch = 1200 + Math.random() * 300;
  osc.frequency.setValueAtTime(randomPitch, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.02);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

  osc.start(now);
  osc.stop(now + 0.02);
}

// 🔔 Anime Notification Chime
export function playNotificationSound(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [783.99, 1046.5]; // G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(ctx.destination);

    const start = now + idx * 0.08;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.12, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

    osc.start(start);
    osc.stop(start + 0.3);
  });
}

// 👑 Level-Up Melody
export function playLevelUpSound(enabled = true) {
  if (!enabled) return;
  playMissionCompleteAnimeSound(enabled);
}
