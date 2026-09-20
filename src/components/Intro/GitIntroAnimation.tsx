import React, { useState, useEffect } from 'react';
import { X, Play, Zap, Terminal, Sparkles, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { playPowerUpSound, playJutsuSound, playHackerTypingSound, playSuccessSound } from '../../utils/audio';

interface GitIntroAnimationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitIntroAnimation: React.FC<GitIntroAnimationProps> = ({
  isOpen,
  onClose,
}) => {
  const { soundEnabled, toggleSound } = useGame();
  const [stage, setStage] = useState<number>(0); // 0: Boot, 1: Git Branching, 2: GitHub Logo Morph, 3: Final Launch
  const [bootLines, setBootLines] = useState<string[]>([]);

  const terminalSequence = [
    '> INITIALIZING GITQUEST ENGINE v2.5...',
    '> LOADING ANIME & JUTSU PROTOCOLS...',
    '> CONNECTING TO GITHUB ORIGIN: origin/main...',
    '> BRANCH TREE: 15 TIMELINES DETECTED...',
    '> STATUS: REPOSITORY SYNCHRONIZED. READY!',
  ];

  useEffect(() => {
    if (!isOpen) {
      setStage(0);
      setBootLines([]);
      return;
    }

    // Stage 0: Boot sequence terminal typing
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalSequence.length) {
        if (soundEnabled) playHackerTypingSound();
        setBootLines((prev) => [...prev, terminalSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        // Transition to Stage 1: Git Branching motion graphics
        setTimeout(() => {
          if (soundEnabled) playJutsuSound();
          setStage(1);
        }, 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isOpen, soundEnabled]);

  useEffect(() => {
    if (stage === 1) {
      // Transition from Git Branching to GitHub Octocat Reveal
      const timer = setTimeout(() => {
        if (soundEnabled) playPowerUpSound();
        setStage(2);
      }, 1600);
      return () => clearTimeout(timer);
    }

    if (stage === 2) {
      // Transition to Final Launch
      const timer = setTimeout(() => {
        if (soundEnabled) playSuccessSound();
        setStage(3);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [stage, soundEnabled]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090e]/95 backdrop-blur-xl animate-fadeIn select-none overflow-hidden">
      {/* Background Cyberpunk Grid & Floating Kanji Watermarks */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#388bfd15_1px,transparent_1px),linear-gradient(to_bottom,#388bfd15_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Ambient Floating Japanese Kanji */}
      <div className="absolute top-12 left-12 text-6xl font-extrabold text-purple-500/10 pointer-events-none font-mono">
        時空分岐
      </div>
      <div className="absolute bottom-12 right-12 text-6xl font-extrabold text-blue-500/10 pointer-events-none font-mono">
        究極統合
      </div>
      <div className="absolute top-1/3 right-8 text-5xl font-extrabold text-pink-500/10 pointer-events-none font-mono writing-vertical">
        電脳忍者
      </div>
      <div className="absolute bottom-1/4 left-8 text-5xl font-extrabold text-emerald-500/10 pointer-events-none font-mono writing-vertical">
        開拓者
      </div>

      {/* Top Action Bar: Sound Toggle & Skip Button */}
      <div className="absolute top-6 inset-x-6 sm:inset-x-12 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-slate-300 font-bold tracking-wider">
            GITQUEST CINEMATIC ENGINE
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-500/40">
            『始動演出』
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-all active:scale-95 flex items-center gap-1.5"
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-git-blue" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-rpg-gold/20 hover:bg-rpg-gold/40 text-rpg-gold font-mono font-bold text-xs border border-rpg-gold/50 active:scale-95 transition-all flex items-center gap-1.5 shadow-pixelGold"
          >
            <span>SKIP INTRO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Center Motion Graphics Stage */}
      <div className="relative z-20 max-w-2xl w-full mx-4 flex flex-col items-center justify-center text-center">
        {/* STAGE 0: Terminal Boot Sequence */}
        {stage === 0 && (
          <div className="w-full max-w-lg p-5 rounded-2xl bg-[#0d121c] border-2 border-git-blue/50 shadow-2xl space-y-3 font-mono text-xs text-left animate-stage-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-git-blue" />
                <span className="font-bold text-slate-200">GitQuest Kernel Boot</span>
              </div>
              <span className="text-[10px] text-git-blue">v2.5.0-anime</span>
            </div>
            <div className="space-y-1.5 min-h-[140px] text-slate-300">
              {bootLines.map((line, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">➜</span>
                  <span className={idx === bootLines.length - 1 ? 'text-white font-bold' : 'text-slate-400'}>
                    {line}
                  </span>
                </div>
              ))}
              <div className="w-2 h-4 bg-git-blue animate-pulse inline-block" />
            </div>
          </div>
        )}

        {/* STAGE 1: Git Branching Motion Graphics */}
        {stage === 1 && (
          <div className="flex flex-col items-center space-y-6 animate-stage-in">
            {/* Japanese Kanji Accent */}
            <div className="text-sm font-mono tracking-widest text-purple-300 bg-purple-950/60 px-4 py-1 rounded-full border border-purple-500/40">
              『時空の分岐点』 • THE DIVERGENCE
            </div>

            {/* SVG Git Branching Animation */}
            <div className="relative w-72 h-44 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 300 180">
                {/* Main Branch Line */}
                <line x1="20" y1="90" x2="280" y2="90" stroke="#388bfd" strokeWidth="4" strokeDasharray="6 4" className="animate-pulse" />
                {/* Feature Branch Curve */}
                <path d="M 80 90 Q 140 20 220 90" fill="none" stroke="#f472b6" strokeWidth="4" className="animate-branch-draw" />
                {/* Hotfix Branch Curve */}
                <path d="M 120 90 Q 170 160 250 90" fill="none" stroke="#eab308" strokeWidth="3" className="animate-branch-draw" />

                {/* Commit Nodes */}
                <circle cx="50" cy="90" r="10" fill="#388bfd" className="animate-ping" opacity="0.3" />
                <circle cx="50" cy="90" r="8" fill="#388bfd" stroke="#ffffff" strokeWidth="2" />
                
                <circle cx="150" cy="55" r="10" fill="#f472b6" className="animate-ping" opacity="0.4" />
                <circle cx="150" cy="55" r="8" fill="#f472b6" stroke="#ffffff" strokeWidth="2" />

                <circle cx="185" cy="125" r="8" fill="#eab308" stroke="#ffffff" strokeWidth="2" />
                
                <circle cx="260" cy="90" r="12" fill="#10b981" className="animate-pulse" />
                <circle cx="260" cy="90" r="9" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>

            <div className="font-mono text-xs text-slate-300">
              Parallel Timelines Converging into <strong className="text-git-blue font-bold">origin/main</strong>
            </div>
          </div>
        )}

        {/* STAGE 2: GitHub Octocat & Git Logo Morph */}
        {stage === 2 && (
          <div className="flex flex-col items-center space-y-6 animate-stage-in">
            {/* Japanese Kanji Accent */}
            <div className="text-sm font-mono tracking-widest text-amber-300 bg-amber-950/60 px-4 py-1 rounded-full border border-amber-500/40">
              『ギットハブの霊魂』 • THE OCTOCAT AWAKENS
            </div>

            {/* Glowing GitHub Octocat Motion Graphic */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Outer Pulsing Aura Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-60 animate-pulse" />

              {/* Rotating Dashed Circle */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-400/80 animate-spin" style={{ animationDuration: '8s' }} />

              {/* GitHub Octocat Silhouette SVG */}
              <div className="relative w-28 h-28 rounded-full bg-[#161b22] border-2 border-amber-400/70 flex items-center justify-center shadow-2xl text-white">
                <svg className="w-16 h-16 fill-white drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>

              {/* Orbiting Commit Nodes */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-git-orange border border-white shadow-[0_0_8px_#f05133]" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-git-blue border border-white shadow-[0_0_8px_#388bfd]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-pixel text-lg text-white tracking-widest drop-shadow">
                GITQUEST × GITHUB
              </h3>
              <p className="font-mono text-xs text-slate-300">
                Synchronized with Global Open-Source Constellations
              </p>
            </div>
          </div>
        )}

        {/* STAGE 3: Final Launch Screen */}
        {stage === 3 && (
          <div className="flex flex-col items-center space-y-5 animate-stage-in">
            {/* Title with Japanese Typographic Accent */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rpg-gold/20 border border-rpg-gold/50 text-rpg-gold font-mono text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>『完全始動』• SYSTEM ONLINE</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-sans tracking-tight drop-shadow-lg">
                GitQuest <span className="text-git-orange">Codédex</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-sans max-w-md mx-auto leading-relaxed">
                Master Git & GitHub through anime storytelling, branching time-travel, and hands-on terminal quests!
              </p>
            </div>

            {/* Launch Button */}
            <button
              onClick={onClose}
              className="px-8 py-4 rounded-2xl bg-rpg-gold hover:bg-amber-400 text-black font-pixel text-sm font-bold shadow-pixelGold border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-3 group"
            >
              <span>ENTER THE REALM</span>
              <Play className="w-4 h-4 fill-black group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer Credits */}
      <div className="absolute bottom-6 inset-x-6 text-center text-[11px] font-mono text-slate-400/80 pointer-events-none">
        GitQuest Interactive Learning Engine • Distributed Version Control System
      </div>
    </div>
  );
};
