import React, { useState } from 'react';
import { Volume2, VolumeX, ChevronRight, Play, BookOpen, Sparkles } from 'lucide-react';
import { TopicCurriculum } from '../../data/curriculum';
import { useGame } from '../../context/GameContext';
import { playClickSound } from '../../utils/audio';

interface LessonIntroCutsceneProps {
  topic: TopicCurriculum | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPresentation: () => void;
  onStartMission: (missionId: string) => void;
}

export const LessonIntroCutscene: React.FC<LessonIntroCutsceneProps> = ({
  topic,
  isOpen,
  onClose,
  onOpenPresentation,
  onStartMission,
}) => {
  const { soundEnabled, toggleSound } = useGame();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  if (!isOpen || !topic) return null;

  const dialogue = topic.cutscene.dialogue;
  const isLastLine = currentLineIndex >= dialogue.length - 1;

  const handleNextLine = () => {
    if (soundEnabled) playClickSound();
    if (!isLastLine) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      onOpenPresentation();
      onClose();
    }
  };

  const handleSkip = () => {
    if (soundEnabled) playClickSound();
    onOpenPresentation();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black select-none animate-fadeIn overflow-hidden">
      {/* Top Bar - Exactly as in user's reference image */}
      <div className="relative z-20 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-black/40 backdrop-blur-sm border-b border-white/10">
        {/* Top-Left: [🔊 Sound on / Sound off] tactile button */}
        <button
          onClick={toggleSound}
          className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 border border-white/20 text-white font-mono text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-git-blue" />
              <span>Sound on</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>Sound off</span>
            </>
          )}
        </button>

        {/* Top-Center: 🪙 Codédex / GitQuest Logo */}
        <div className="flex items-center gap-2">
          <span className="text-lg animate-bounce">🪙</span>
          <span className="font-pixel text-sm sm:text-base text-white tracking-widest font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Codédex
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-git-orange/30 text-git-orange border border-git-orange/40 font-bold hidden sm:inline">
            GIT & GITHUB
          </span>
        </div>

        {/* Top-Right: [Skip >] tactile button */}
        <button
          onClick={handleSkip}
          className="px-3.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 border border-white/20 text-white font-mono text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
        >
          <span>Skip</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Scenic Background matching image: Tokyo Twilight / Lofi City Skyline */}
      <div className="relative flex-1 flex flex-col justify-end p-4 sm:p-10 overflow-hidden">
        {/* Multi-layered CSS Art / Gradient Skyline */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b1947] via-[#482c5f] to-[#121026] z-0">
          {/* Distant Stars & Clouds */}
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(#ff79c6_1px,transparent_1px),radial-gradient(#8be9fd_1px,transparent_1px)] bg-[size:32px_32px] [background-position:0_0,16px_16px]" />

          {/* Cloud drifts */}
          <div className="absolute top-1/4 left-[-10%] w-[120%] h-48 bg-gradient-to-r from-pink-500/20 via-purple-500/30 to-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

          {/* City Skyline Silhouette */}
          <div className="absolute bottom-16 inset-x-0 h-48 bg-gradient-to-t from-[#090814] via-[#100d24] to-transparent opacity-90">
            {/* Building blocks */}
            <div className="absolute bottom-10 inset-x-0 flex items-end justify-between px-6 opacity-30 gap-1 sm:gap-2">
              <div className="w-12 h-36 bg-[#1a153b] border-t border-purple-400/30" />
              <div className="w-16 h-48 bg-[#1f1947] border-t border-purple-400/30" />
              <div className="w-10 h-28 bg-[#181338]" />
              <div className="w-20 h-56 bg-[#251d54] border-t border-pink-400/30" />
              <div className="w-14 h-40 bg-[#1b153f]" />
              <div className="w-8 h-64 bg-[#2b2160] border-t border-cyan-400/30" />
              <div className="w-16 h-36 bg-[#1a153b]" />
            </div>
          </div>

          {/* Glowing Cherry Blossom Tree Silhouette on the Left */}
          <div className="absolute bottom-12 left-2 sm:left-8 w-44 sm:w-64 h-64 sm:h-80 pointer-events-none z-10 flex flex-col justify-end">
            <div className="w-full h-full bg-gradient-to-tr from-pink-400/20 via-rose-300/30 to-transparent blur-md rounded-full" />
            <div className="absolute bottom-4 left-6 text-4xl sm:text-6xl filter drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]">
              🌸
            </div>
          </div>

          {/* Streetlamps with warm golden glow */}
          <div className="absolute bottom-16 left-1/4 flex flex-col items-center pointer-events-none z-10">
            <div className="w-6 h-6 rounded-full bg-amber-300/80 blur-md shadow-[0_0_20px_#fde047]" />
            <div className="w-1 h-28 bg-slate-800" />
          </div>

          <div className="absolute bottom-16 right-1/4 flex flex-col items-center pointer-events-none z-10">
            <div className="w-6 h-6 rounded-full bg-amber-300/80 blur-md shadow-[0_0_20px_#fde047]" />
            <div className="w-1 h-28 bg-slate-800" />
          </div>

          {/* Bridge Railing & Bicycle Silhouette */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-[#07060e] border-t-2 border-purple-900/60 z-10">
            <div className="absolute -top-10 left-1/3 text-4xl filter drop-shadow">
              🚲
            </div>
          </div>
        </div>

        {/* Narrative Dialogue Box */}
        <div className="relative z-20 max-w-3xl mx-auto w-full bg-[#0d121c]/95 border-2 border-rpg-gold/80 rounded-2xl p-5 sm:p-6 shadow-pixelGold backdrop-blur-md space-y-4">
          {/* Speaker Header */}
          <div className="flex items-center justify-between border-b border-dev-border/70 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-dev-surface border-2 border-rpg-gold/50 flex items-center justify-center text-2xl shadow-inner">
                {topic.cutscene.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-xs text-rpg-gold font-bold">
                    {topic.cutscene.speaker}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-300 border border-purple-500/40">
                    ACT 0{topic.chapterNumber}
                  </span>
                </div>
                <div className="text-xs font-mono text-dev-subtext mt-0.5">
                  {topic.title}
                </div>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-dev-subtext">
              <span>{currentLineIndex + 1}</span> / <span>{dialogue.length}</span>
            </div>
          </div>

          {/* Dialogue Text */}
          <div className="min-h-[60px] flex items-center">
            <p className="text-sm sm:text-base font-sans text-dev-heading leading-relaxed">
              "{dialogue[currentLineIndex]}"
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onOpenPresentation();
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-heading font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-rpg-gold" />
                <span>Open PPT Slides</span>
              </button>

              <button
                onClick={() => {
                  onStartMission(topic.missionId);
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-heading font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Play className="w-4 h-4 text-git-blue" />
                <span>Jump to Mission</span>
              </button>
            </div>

            <button
              onClick={handleNextLine}
              className="px-6 py-2.5 rounded-xl bg-rpg-gold hover:bg-amber-400 text-black font-pixel text-xs font-bold border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all shadow-pixelGold flex items-center gap-2"
            >
              <span>{isLastLine ? 'Begin Lesson' : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
