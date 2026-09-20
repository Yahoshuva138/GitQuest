import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Terminal, Users, Play, Quote, ChevronRight } from 'lucide-react';
import { CODEX_COURSE } from '../../data/codexCourse';
import { ANIME_QUOTES } from '../../data/animeQuotes';
import { useGame } from '../../context/GameContext';
import { playPowerUpSound, playClickSound } from '../../utils/audio';

interface AnimeCourseHeroProps {
  onStartLearning: () => void;
}

export const AnimeCourseHero: React.FC<AnimeCourseHeroProps> = ({
  onStartLearning,
}) => {
  const { soundEnabled } = useGame();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ANIME_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = ANIME_QUOTES[quoteIndex];

  const handleStart = () => {
    if (soundEnabled) playPowerUpSound();
    onStartLearning();
  };

  const handleNextQuote = () => {
    if (soundEnabled) playClickSound();
    setQuoteIndex((prev) => (prev + 1) % ANIME_QUOTES.length);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-purple-900/40 shadow-2xl mb-8 select-none">
      {/* Anime Panoramic Landscape Background */}
      <div className="relative min-h-[340px] sm:min-h-[380px] flex flex-col justify-center px-6 sm:px-12 py-10 overflow-hidden bg-gradient-to-r from-[#201538] via-[#3d2452] to-[#1a122e]">
        {/* Sky gradient & celestial clouds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#ff79c630,transparent_60%),radial-gradient(ellipse_at_bottom_left,#8be9fd25,transparent_60%)]" />

        {/* Soft pink / purple cloud banks */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-pink-500/20 via-purple-600/20 to-transparent blur-2xl pointer-events-none" />

        {/* 🌸 Falling Sakura Petals Animation Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <div className="absolute -top-4 left-1/6 text-2xl animate-sakura-1 opacity-80">🌸</div>
          <div className="absolute -top-6 left-1/3 text-xl animate-sakura-2 opacity-70">🌸</div>
          <div className="absolute -top-4 left-2/3 text-2xl animate-sakura-3 opacity-85">🌸</div>
          <div className="absolute -top-5 left-5/6 text-lg animate-sakura-1 opacity-60">🌸</div>
          <div className="absolute -top-8 left-1/2 text-2xl animate-sakura-2 opacity-75">🌸</div>
        </div>

        {/* Cherry Blossom Branches on the left */}
        <div className="absolute -top-4 -left-6 sm:left-4 w-48 sm:w-72 h-64 sm:h-80 pointer-events-none z-10 flex flex-col justify-start">
          <div className="w-full h-full bg-gradient-to-br from-pink-400/20 via-rose-300/30 to-transparent blur-lg rounded-full" />
          <div className="absolute top-6 left-6 text-5xl sm:text-7xl filter drop-shadow-[0_0_20px_rgba(244,114,182,0.9)] opacity-90 animate-pulse">
            🌸
          </div>
          <div className="absolute top-20 left-24 text-2xl sm:text-3xl filter drop-shadow-[0_0_12px_rgba(244,114,182,0.8)] opacity-80">
            🌸
          </div>
        </div>

        {/* Streetlamp 1 on the left */}
        <div className="absolute bottom-0 left-1/4 flex flex-col items-center pointer-events-none z-10 opacity-70 sm:opacity-85">
          <div className="w-5 h-5 rounded-full bg-amber-300/90 blur-sm shadow-[0_0_25px_#fde047]" />
          <div className="w-1.5 h-36 bg-slate-900 border-x border-slate-700" />
        </div>

        {/* Streetlamp 2 on the right */}
        <div className="absolute bottom-0 right-1/4 flex flex-col items-center pointer-events-none z-10 opacity-70 sm:opacity-85">
          <div className="w-5 h-5 rounded-full bg-amber-300/90 blur-sm shadow-[0_0_25px_#fde047]" />
          <div className="w-1.5 h-36 bg-slate-900 border-x border-slate-700" />
        </div>

        {/* Distant Tokyo Skyline Silhouette */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0d0a17] via-[#130e22] to-transparent opacity-80 pointer-events-none flex items-end justify-around px-8">
          <div className="w-10 h-16 bg-[#1f1738] opacity-50" />
          <div className="w-14 h-20 bg-[#251b42] opacity-60" />
          <div className="w-2 h-24 bg-[#ff4b82] opacity-80 shadow-[0_0_10px_#ff4b82]" title="Tokyo Tower" />
          <div className="w-16 h-18 bg-[#1f1738] opacity-50" />
          <div className="w-12 h-14 bg-[#1b1430] opacity-40" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 max-w-2xl space-y-4">
          {/* Badge & Dialogue Ticker Header */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-git-blue animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-200">
                {CODEX_COURSE.badge}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 backdrop-blur-md text-[10px] font-mono text-purple-200">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>GOAT ANIME CODING EDITION</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-tight drop-shadow-md">
            {CODEX_COURSE.title}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed drop-shadow">
            {CODEX_COURSE.description}
          </p>

          {/* GOAT Anime Dialogue Card Ticker */}
          <div
            onClick={handleNextQuote}
            className="group cursor-pointer p-3 rounded-xl bg-black/40 hover:bg-black/60 border border-pink-500/30 hover:border-pink-500/60 backdrop-blur-md transition-all duration-300 flex items-start gap-3 text-left shadow-lg relative overflow-hidden"
            title="Click to cycle next anime developer quote"
          >
            <div className="text-2xl shrink-0 p-1.5 rounded-lg bg-pink-500/20 border border-pink-500/30">
              {currentQuote.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="font-bold text-pink-300">{currentQuote.character}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">{currentQuote.anime}</span>
                <span className="text-slate-500 hidden sm:inline">({currentQuote.japaneseTitle})</span>
              </div>
              <p className="text-xs italic text-slate-200 font-sans mt-0.5 line-clamp-2">
                "{currentQuote.quote}"
              </p>
            </div>
            <div className="shrink-0 self-center text-slate-400 group-hover:text-pink-300 group-hover:translate-x-0.5 transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Start Learning for Free CTA Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleStart}
              className="px-6 py-3.5 rounded-xl bg-rpg-gold hover:bg-amber-400 text-black font-sans font-extrabold text-sm tracking-wide shadow-pixelGold border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2.5 group"
            >
              <span>Start Learning for Free</span>
              <Play className="w-4 h-4 fill-black group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] font-mono text-slate-300/90">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-git-blue" />
              <span>
                Prerequisite: <strong className="text-white">{CODEX_COURSE.prerequisite}</strong>
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>
                Time to complete: <strong className="text-white">{CODEX_COURSE.timeToComplete}</strong>
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-pink-300" />
              <span className="text-white font-bold">{CODEX_COURSE.totalLearners}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
