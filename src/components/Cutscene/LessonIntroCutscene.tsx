import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  ChevronRight,
  Play,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { TopicCurriculum } from '../../data/curriculum';
import { useGame } from '../../context/GameContext';
import { playClickSound, playLevelUpSound, playPowerUpSound } from '../../utils/audio';
import { PixelPlayerSprite } from './PixelPlayerSprite';

interface LessonIntroCutsceneProps {
  topic: TopicCurriculum | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPresentation: () => void;
  onStartMission: (missionId: string) => void;
}

// Chapter-specific prologue quotes and Japanese titles
const CHAPTER_PROLOGUES: Record<number, { text: string; japanese: string }> = {
  1: {
    text: 'And thus, began your journey to the land of Git & GitHub...',
    japanese: '『第1章：GitとGitHubの大地への旅立ち』',
  },
  2: {
    text: 'Stepping into the command line realm: the language of machines...',
    japanese: '『第2章：コマンドラインの世界への第一歩』',
  },
  3: {
    text: 'Awakening the hidden power of your first repository...',
    japanese: '『第3章：最初の暗号リポジトリの覚醒』',
  },
  4: {
    text: 'Mastering the three sacred states: working, staging, and commits...',
    japanese: '『第4章：作業・ステージ・コミットの三界』',
  },
  5: {
    text: 'Standing at the dimensional crossroads of parallel branches...',
    japanese: '『第5章：並行時空の分岐点』',
  },
  6: {
    text: 'Clashing timelines: the fiery trial of merge conflicts...',
    japanese: '『第6章：衝突の炎と調停の術』',
  },
  7: {
    text: 'Ascending to the global cloud: origin, push, and remote sync...',
    japanese: '『第7章：電脳クラウドへの昇天』',
  },
  8: {
    text: 'The master ninja workflows: rebase, cherry-pick, and time manipulation...',
    japanese: '『第8章：究極の時空跳躍の奥義』',
  },
};

export const LessonIntroCutscene: React.FC<LessonIntroCutsceneProps> = ({
  topic,
  isOpen,
  onClose,
  onOpenPresentation,
  onStartMission,
}) => {
  const { soundEnabled, toggleSound } = useGame();
  const [stage, setStage] = useState<'intro' | 'dialogue'>('intro');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Reset stage to 'intro' whenever a new topic opens
  useEffect(() => {
    if (isOpen) {
      setStage('intro');
      setCurrentLineIndex(0);
      if (soundEnabled) {
        playPowerUpSound();
      }
    }
  }, [isOpen, topic?.id]);

  // Keyboard navigation: Space / Enter to advance
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (stage === 'intro') {
          handleAdvanceFromIntro();
        } else {
          handleNextLine();
        }
      } else if (e.code === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, stage, currentLineIndex, topic]);

  if (!isOpen || !topic) return null;

  const chapterNum = topic.chapterNumber || 1;
  const prologue = CHAPTER_PROLOGUES[chapterNum] || {
    text: `And thus, began Chapter ${chapterNum} in the land of Git & GitHub...`,
    japanese: `『第${chapterNum}章：新たな試練への突入』`,
  };

  const dialogue = topic.cutscene.dialogue;
  const isLastLine = currentLineIndex >= dialogue.length - 1;

  const handleAdvanceFromIntro = () => {
    if (soundEnabled) playLevelUpSound();
    setStage('dialogue');
  };

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
    <div className="fixed inset-0 z-50 flex flex-col select-none animate-fadeIn overflow-hidden">
      {/* 1. STAGE 1: RETRO 8-BIT INTRO SCREEN (Matching GitQuest Aesthetic) */}
      {stage === 'intro' ? (
        <div
          onClick={handleAdvanceFromIntro}
          className="relative flex-1 flex flex-col justify-between bg-[#0B0D13] p-4 sm:p-8 cursor-pointer overflow-hidden animate-fadeIn"
        >
          {/* Subtle Ambient Starfield */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Top Bar matching screenshot */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-20 flex items-center justify-between"
          >
            {/* Top-Left: [🔊 Sound on / Sound off] */}
            <button
              onClick={toggleSound}
              className="px-3.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/90 border border-white/20 text-white font-mono text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
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

            {/* Top-Center: 🪙 GitQuest Logo */}
            <div className="flex items-center gap-2">
              <span className="text-base animate-bounce">🪙</span>
              <span className="font-pixel text-sm sm:text-base text-white tracking-widest font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                GitQuest
              </span>
            </div>

            {/* Top-Right: [Skip >] */}
            <button
              onClick={handleSkip}
              className="px-4 py-1.5 rounded-lg bg-black/60 hover:bg-black/90 border border-white/20 text-white font-mono text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <span>Skip</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Walking Pixel Player & Narrative Quote */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto space-y-6">
            {/* Pixel Sprite */}
            <div className="transform hover:scale-110 transition-transform">
              <PixelPlayerSprite size={110} />
            </div>

            {/* Pixel Prologue Quote */}
            <div className="space-y-3">
              <h1 className="font-pixel text-sm sm:text-base md:text-lg text-white leading-relaxed tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] max-w-xl mx-auto">
                {prologue.text}
              </h1>

              <div className="text-xs text-purple-300 font-bold tracking-widest">
                {prologue.japanese}
              </div>
            </div>
          </div>

          {/* Bottom Prompt */}
          <div className="relative z-10 text-center pb-4 text-[11px] font-mono text-white/50 animate-pulse">
            <span>[ Click anywhere or press Space to continue ▼ ]</span>
          </div>
        </div>
      ) : (
        /* 2. STAGE 2: CINEMATIC DIALOGUE SCENE (Matching Twilight Bridge Screenshot) */
        <div className="relative flex-1 flex flex-col justify-between overflow-hidden bg-black animate-fadeIn">
          {/* Top Bar */}
          <div className="relative z-20 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-black/40 backdrop-blur-sm border-b border-white/10">
            {/* Top-Left: [🔊 Sound on / Sound off] */}
            <button
              onClick={toggleSound}
              className="px-3.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 border border-white/20 text-white font-mono text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
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

            {/* Top-Center: 🪙 GitQuest Logo */}
            <div className="flex items-center gap-2">
              <span className="text-base animate-bounce">🪙</span>
              <span className="font-pixel text-sm sm:text-base text-white tracking-widest font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                GitQuest
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-git-orange/30 text-git-orange border border-git-orange/40 font-bold hidden sm:inline">
                GIT & GITHUB
              </span>
            </div>

            {/* Top-Right: [Skip >] */}
            <button
              onClick={handleSkip}
              className="px-3.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 border border-white/20 text-white font-mono text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <span>Skip</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Twilight Bridge Scenic Wallpaper Background */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: 'url(/backgrounds/tokyo_twilight_bridge.jpg)',
            }}
          >
            {/* Atmospheric overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </div>

          {/* Center Spacer */}
          <div className="flex-1" />

          {/* Narrative Dialogue Box at Bottom */}
          <div className="relative z-20 max-w-3xl mx-auto w-full px-4 pb-6 sm:pb-8">
            <div className="bg-[#0d121c]/95 border-2 border-rpg-gold/80 rounded-2xl p-5 sm:p-6 shadow-pixelGold backdrop-blur-md space-y-4">
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
      )}
    </div>
  );
};
