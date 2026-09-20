import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { TopicCurriculum, SlideContent } from '../../data/curriculum';
import { SlideRenderer } from './SlideRenderer';
import { useGame } from '../../context/GameContext';
import { playClickSound, playSuccessSound } from '../../utils/audio';

interface PresentationViewerProps {
  topic: TopicCurriculum | null;
  isOpen: boolean;
  onClose: () => void;
  onLaunchMission?: (missionId: string) => void;
}

export const PresentationViewer: React.FC<PresentationViewerProps> = ({
  topic,
  isOpen,
  onClose,
  onLaunchMission,
}) => {
  const { soundEnabled, addXP } = useGame();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Reset slide index when topic changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentSlideIndex(0);
      setShowNotes(false);
    }
  }, [isOpen, topic?.id]);

  // Keyboard navigation listener (Left, Right, Escape)
  useEffect(() => {
    if (!isOpen || !topic) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex, topic]);

  if (!isOpen || !topic) return null;

  const slides = topic.slides;
  const currentSlide = slides[currentSlideIndex] || slides[0];
  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === slides.length - 1;

  const handleNext = () => {
    if (soundEnabled) playClickSound();
    if (!isLastSlide) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      // Completed presentation
      if (soundEnabled) playSuccessSound();
      addXP(50); // Bonus XP for finishing the PPT
      if (onLaunchMission) {
        onLaunchMission(topic.missionId);
      }
      onClose();
    }
  };

  const handlePrev = () => {
    if (soundEnabled) playClickSound();
    if (!isFirstSlide) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    if (soundEnabled) playClickSound();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn ${
        isFullscreen ? 'p-0' : ''
      }`}
    >
      <div
        className={`relative w-full bg-[#0d121c] border-2 border-rpg-gold/70 rounded-2xl shadow-pixelGold overflow-hidden flex flex-col transition-all ${
          isFullscreen
            ? 'h-screen max-w-none rounded-none border-none'
            : 'max-w-4xl max-h-[92vh] h-[780px]'
        }`}
      >
        {/* Presentation Top Header */}
        <div className="px-5 py-3.5 bg-[#141b29] border-b-2 border-rpg-gold/40 flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rpg-gold/20 border border-rpg-gold flex items-center justify-center text-sm font-pixel text-rpg-gold">
              PPT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-rpg-gold tracking-wide uppercase">
                  {topic.id}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-dev-surface text-dev-subtext border border-dev-border">
                  CHAPTER 0{topic.chapterNumber}
                </span>
              </div>
              <h1 className="text-xs sm:text-sm font-mono font-bold text-dev-heading truncate max-w-sm sm:max-w-md">
                {topic.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Presenter Notes Button */}
            {currentSlide.presenterNotes && (
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`p-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  showNotes
                    ? 'bg-rpg-gold text-black border-rpg-gold font-bold'
                    : 'bg-dev-surface border-dev-border text-dev-subtext hover:text-dev-heading'
                }`}
                title="Toggle Presenter Speaker Notes"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Notes</span>
              </button>
            )}

            {/* Fullscreen toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-dev-surface border border-dev-border text-dev-subtext hover:text-dev-heading transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg bg-dev-surface hover:bg-white/10 border border-dev-border text-dev-subtext hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Viewport */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#0a0e17]">
          <SlideRenderer
            slide={currentSlide}
            onLaunchMission={() => {
              if (onLaunchMission) {
                onLaunchMission(topic.missionId);
              }
              onClose();
            }}
          />
        </div>

        {/* Presenter Notes Drawer if active */}
        {showNotes && currentSlide.presenterNotes && (
          <div className="p-4 bg-[#141b29] border-t-2 border-rpg-gold/40 text-xs font-mono text-dev-subtext space-y-1 animate-slideDown">
            <div className="text-[10px] uppercase font-bold text-rpg-gold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Presenter Speaker Notes:
            </div>
            <p className="text-dev-text leading-relaxed italic">
              "{currentSlide.presenterNotes}"
            </p>
          </div>
        )}

        {/* Footer Navigation Bar */}
        <div className="px-5 py-3.5 bg-[#141b29] border-t border-dev-border flex items-center justify-between select-none">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={isFirstSlide}
            className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1 transition-all ${
              isFirstSlide
                ? 'opacity-40 cursor-not-allowed border-dev-border text-dev-subtext'
                : 'bg-dev-surface hover:bg-dev-surface/80 border-dev-border text-dev-heading active:translate-y-0.5'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Slide Indicator Dots & Count */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setCurrentSlideIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentSlideIndex
                      ? 'bg-rpg-gold scale-125 shadow-pixelGold'
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="font-pixel text-[10px] text-dev-subtext">
              SLIDE {currentSlideIndex + 1} OF {slides.length}
            </span>
          </div>

          {/* Next / Finish Button */}
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1 transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
              isLastSlide
                ? 'bg-rpg-gold hover:bg-amber-400 text-black border-amber-600 shadow-pixelGold'
                : 'bg-git-blue hover:bg-blue-500 text-white border-blue-700 shadow-sm'
            }`}
          >
            <span>{isLastSlide ? 'Complete & Start Quest' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
