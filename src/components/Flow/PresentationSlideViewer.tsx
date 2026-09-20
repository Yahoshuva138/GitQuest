import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Terminal,
  BookOpen,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { GIT_ESSENTIALS_DECK, EssentialSlide } from '../../data/gitEssentialsDeck';
import { playClickSound, playLevelUpSound } from '../../utils/audio';
import { useGame } from '../../context/GameContext';

export const PresentationSlideViewer: React.FC = () => {
  const { soundEnabled } = useGame();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const slides = GIT_ESSENTIALS_DECK;
  const currentSlide: EssentialSlide = slides[currentSlideIndex] || slides[0];
  const isFirst = currentSlideIndex === 0;
  const isLast = currentSlideIndex === slides.length - 1;

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const handleNext = () => {
    if (!isLast) {
      if (soundEnabled) playClickSound();
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      if (soundEnabled) playClickSound();
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleCopy = (cmd: string) => {
    if (soundEnabled) playClickSound();
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="rounded-2xl bg-[#090D15] border-2 border-dev-border/90 p-5 shadow-2xl space-y-4 font-mono text-xs select-none">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dev-border/70">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-dev-heading uppercase tracking-wider">
                Git & GitHub Essentials PPT Deck (21 Slides)
              </h3>
              <span className="text-xs text-purple-300 font-bold hidden sm:inline">
                『公式スライド教材』
              </span>
            </div>
            <p className="text-[11px] text-dev-subtext mt-0.5">
              Extracted directly from the official guide with full diagrams, mental models, and procedures.
            </p>
          </div>
        </div>

        {/* Slide Counter & Prev/Next Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="p-1.5 rounded-lg bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-heading disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
            title="Previous slide (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-1 rounded-lg bg-black/60 border border-dev-border text-dev-heading text-xs font-bold font-mono">
            {currentSlideIndex + 1} / {slides.length}
          </span>

          <button
            onClick={handleNext}
            disabled={isLast}
            className="p-1.5 rounded-lg bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-heading disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
            title="Next slide (Right Arrow / Space)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="relative min-h-[380px] rounded-2xl bg-gradient-to-br from-[#0C1017] via-[#101622] to-[#0A0D14] border border-dev-border/80 p-6 flex flex-col justify-between space-y-6 shadow-inner">
        {/* Slide Header */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-git-blue tracking-widest flex items-center gap-1.5">
              <span>SLIDE 0{currentSlide.slideNumber}</span>
              <span>·</span>
              <span className="text-purple-300 font-bold">{currentSlide.japaneseTitle}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-dev-surface border border-dev-border text-[9px] text-dev-subtext uppercase font-bold">
              {currentSlide.category}
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-dev-heading font-sans">
            {currentSlide.title}
          </h2>
          <p className="text-xs text-dev-subtext font-sans">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Slide Content Bullets */}
        <div className="space-y-2.5 font-sans">
          {currentSlide.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-dev-text leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-git-blue mt-1.5 shrink-0" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        {/* Metaphor / Analogy Card */}
        {currentSlide.metaphor && (
          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start gap-3">
            <span className="text-2xl">{currentSlide.metaphor.icon}</span>
            <div>
              <div className="font-bold text-purple-300 text-xs font-mono">
                {currentSlide.metaphor.concept}
              </div>
              <p className="text-dev-subtext text-[11px] font-sans mt-0.5 leading-relaxed">
                {currentSlide.metaphor.analogy}
              </p>
            </div>
          </div>
        )}

        {/* Command Snippets */}
        {currentSlide.commandSnippets && currentSlide.commandSnippets.length > 0 && (
          <div className="space-y-2">
            <div className="text-[11px] text-dev-subtext font-bold font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-git-blue" />
              <span>Command Procedure</span>
            </div>
            <div className="space-y-1.5">
              {currentSlide.commandSnippets.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-black/70 border border-dev-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                >
                  <code className="text-amber-300 font-bold">{item.command}</code>
                  <div className="flex items-center gap-2">
                    <span className="text-dev-subtext text-[11px] font-sans">{item.explanation}</span>
                    <button
                      onClick={() => handleCopy(item.command)}
                      className="p-1 rounded bg-dev-surface hover:bg-dev-surface/80 text-dev-subtext hover:text-white transition-colors border border-dev-border shrink-0"
                      title="Copy command"
                    >
                      {copiedCmd === item.command ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warning Box */}
        {currentSlide.warningNotice && (
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 flex items-start gap-2.5 text-xs text-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="font-sans leading-relaxed">{currentSlide.warningNotice}</span>
          </div>
        )}

        {/* Key Takeaway Footer */}
        <div className="pt-3 border-t border-dev-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2 text-dev-subtext">
            <Lightbulb className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-bold text-white font-sans">Key Takeaway:</span>
            <span className="font-sans text-dev-text">{currentSlide.keyTakeaway}</span>
          </div>

          <span className="text-purple-300/80 font-mono text-[10px]">
            Press Space or Arrow keys to navigate
          </span>
        </div>
      </div>
    </div>
  );
};
