// 8-Bit Retro Sound Synthesizer using Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

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
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.start(now);
  osc.stop(now + 0.04);
}

export function playLevelUpSound(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Fanfare arpeggio
  const notes = [440, 554.37, 659.25, 880, 880, 880, 1108.73];
  const durations = [0.08, 0.08, 0.08, 0.12, 0.08, 0.08, 0.35];

  let timeOffset = 0;
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.connect(gain);
    gain.connect(ctx.destination);

    const start = now + timeOffset;
    const dur = durations[idx];
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.14, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

    osc.start(start);
    osc.stop(start + dur);
    timeOffset += dur;
  });
}
