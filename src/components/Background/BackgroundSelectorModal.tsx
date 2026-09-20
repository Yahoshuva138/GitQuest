import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Sliders,
  Check,
  Image as ImageIcon,
  RotateCcw,
  Eye,
  Layers,
  Wand2,
  Lock,
} from 'lucide-react';
import {
  BACKGROUND_THEMES,
  BackgroundTheme,
  PAGE_BACKGROUND_MAP,
} from '../../data/backgroundThemes';
import { safeStorage } from '../../utils/security';
import { playClickSound, playLevelUpSound } from '../../utils/audio';
import { useGame } from '../../context/GameContext';

interface BackgroundSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackgroundSelectorModal: React.FC<BackgroundSelectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { soundEnabled, activeTab } = useGame();

  const [mode, setMode] = useState<'dynamic' | 'fixed'>(() => {
    return (safeStorage.getItem('gitquest_bg_mode', 'dynamic') as 'dynamic' | 'fixed') || 'dynamic';
  });

  const [selectedThemeId, setSelectedThemeId] = useState<string>(() => {
    return safeStorage.getItem('gitquest_bg_theme', 'codedex-twilight');
  });

  const [opacity, setOpacity] = useState<number>(() => {
    const saved = safeStorage.getItem('gitquest_bg_opacity', '0.24');
    return parseFloat(saved) || 0.24;
  });

  const [blur, setBlur] = useState<number>(() => {
    const saved = safeStorage.getItem('gitquest_bg_blur', '0');
    return parseInt(saved, 10) || 0;
  });

  if (!isOpen) return null;

  const handleSelectMode = (newMode: 'dynamic' | 'fixed') => {
    if (soundEnabled) playClickSound();
    setMode(newMode);
    safeStorage.setItem('gitquest_bg_mode', newMode);
    window.dispatchEvent(new Event('gitquest_bg_updated'));
  };

  const handleSelectTheme = (theme: BackgroundTheme) => {
    if (soundEnabled) playClickSound();
    setSelectedThemeId(theme.id);
    setMode('fixed');
    safeStorage.setItem('gitquest_bg_mode', 'fixed');
    safeStorage.setItem('gitquest_bg_theme', theme.id);
    window.dispatchEvent(new Event('gitquest_bg_updated'));
  };

  const handleOpacityChange = (val: number) => {
    setOpacity(val);
    safeStorage.setItem('gitquest_bg_opacity', val.toString());
    window.dispatchEvent(new Event('gitquest_bg_updated'));
  };

  const handleBlurChange = (val: number) => {
    setBlur(val);
    safeStorage.setItem('gitquest_bg_blur', val.toString());
    window.dispatchEvent(new Event('gitquest_bg_updated'));
  };

  const handleResetDefaults = () => {
    if (soundEnabled) playClickSound();
    const defaultOp = 0.24;
    const defaultBl = 0;
    setMode('dynamic');
    setOpacity(defaultOp);
    setBlur(defaultBl);
    safeStorage.setItem('gitquest_bg_mode', 'dynamic');
    safeStorage.setItem('gitquest_bg_opacity', defaultOp.toString());
    safeStorage.setItem('gitquest_bg_blur', defaultBl.toString());
    window.dispatchEvent(new Event('gitquest_bg_updated'));
  };

  // Determine active theme on the current page
  const currentPageThemeId = PAGE_BACKGROUND_MAP[activeTab] || 'codedex-twilight';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none font-mono text-xs">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#090D15] border-2 border-dev-border/90 p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-dev-border/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-dev-heading uppercase tracking-wide">
                  Aesthetic Wallpapers & Atmosphere
                </span>
                <span className="text-xs text-purple-300 font-bold hidden sm:inline">
                  『壁紙・背景テーマ設定』
                </span>
              </div>
              <p className="text-[11px] text-dev-subtext mt-0.5">
                8K anime aesthetic coding backdrops uniquely tailored for each quest zone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-dev-subtext hover:text-white hover:bg-dev-surface transition-colors border border-dev-border"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector: Dynamic vs Fixed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-[#06090F] border border-dev-border/80">
          {/* Dynamic Option */}
          <button
            onClick={() => handleSelectMode('dynamic')}
            className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
              mode === 'dynamic'
                ? 'bg-purple-950/40 border-purple-400 text-white shadow-lg shadow-purple-950/50 ring-1 ring-purple-400/50'
                : 'bg-dev-surface/30 border-dev-border/60 text-dev-subtext hover:text-white hover:border-dev-border'
            }`}
          >
            <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 shrink-0">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-xs text-dev-heading">
                <span>Unique Per-Page (Recommended)</span>
                {mode === 'dynamic' && (
                  <span className="px-1.5 py-0.2 rounded bg-purple-500 text-black text-[9px] font-bold">
                    ACTIVE
                  </span>
                )}
              </div>
              <p className="text-[10.5px] text-dev-subtext mt-1 leading-snug">
                Automatically switches to unique aesthetic anime wallpapers as you navigate (Codédex Twilight Bridge on Home, Neo-Tokyo on Build, Cosmic Void on Branches, etc.).
              </p>
            </div>
          </button>

          {/* Fixed Option */}
          <button
            onClick={() => handleSelectMode('fixed')}
            className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
              mode === 'fixed'
                ? 'bg-blue-950/40 border-blue-400 text-white shadow-lg shadow-blue-950/50 ring-1 ring-blue-400/50'
                : 'bg-dev-surface/30 border-dev-border/60 text-dev-subtext hover:text-white hover:border-dev-border'
            }`}
          >
            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-xs text-dev-heading">
                <span>Fixed Single Wallpaper</span>
                {mode === 'fixed' && (
                  <span className="px-1.5 py-0.2 rounded bg-blue-500 text-black text-[9px] font-bold">
                    ACTIVE
                  </span>
                )}
              </div>
              <p className="text-[10.5px] text-dev-subtext mt-1 leading-snug">
                Lock your favorite aesthetic wallpaper to remain constant across all pages and labs.
              </p>
            </div>
          </button>
        </div>

        {/* Wallpaper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {BACKGROUND_THEMES.map((theme) => {
            const isCurrentlyActive =
              mode === 'dynamic'
                ? theme.id === currentPageThemeId
                : theme.id === selectedThemeId;

            return (
              <div
                key={theme.id}
                onClick={() => handleSelectTheme(theme)}
                className={`group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isCurrentlyActive
                    ? 'border-purple-400/90 shadow-[0_0_20px_rgba(168,85,247,0.35)] ring-2 ring-purple-400/40 bg-[#090D15]'
                    : 'border-dev-border/70 hover:border-git-blue/60 bg-[#06090F]'
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="h-28 w-full relative overflow-hidden bg-black/60">
                  {theme.image ? (
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] flex items-center justify-center text-gray-500">
                      <Layers className="w-6 h-6 text-gray-600" />
                    </div>
                  )}

                  {/* Tag Pill */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur border border-white/20 text-[9px] text-white font-bold">
                    {theme.tag}
                  </div>

                  {/* Active Pill */}
                  {isCurrentlyActive && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-purple-500 text-black font-bold text-[9px] flex items-center gap-1 shadow-md">
                      <Check className="w-3 h-3" />
                      <span>{mode === 'dynamic' ? 'ON PAGE' : 'LOCKED'}</span>
                    </div>
                  )}
                </div>

                {/* Info Container */}
                <div className="p-3 space-y-1 bg-[#090D15]">
                  <span className="font-bold text-[11px] text-dev-heading group-hover:text-purple-300 transition-colors line-clamp-1">
                    {theme.name}
                  </span>
                  <div className="text-[10px] text-purple-300 font-bold">
                    {theme.japanese}
                  </div>
                  <p className="text-[10px] text-dev-subtext line-clamp-2 leading-relaxed">
                    {theme.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Atmosphere Controls (Opacity & Blur) */}
        <div className="p-4 rounded-xl bg-[#06090F] border border-dev-border/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-xs text-dev-heading uppercase tracking-wide">
                Atmosphere & Contrast Tuning
              </span>
            </div>

            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1 text-[10px] text-dev-subtext hover:text-white px-2 py-1 rounded bg-dev-surface border border-dev-border transition-colors"
              title="Reset to recommended readability levels"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Recommended</span>
            </button>
          </div>

          {/* Opacity Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-dev-subtext">Wallpaper Opacity:</span>
              <span className="font-bold text-purple-300">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.45"
              step="0.01"
              value={opacity}
              onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-dev-subtext/60">
              <span>Subtle (5%)</span>
              <span className="text-purple-400 font-bold">Recommended (24%)</span>
              <span>Vivid (45%)</span>
            </div>
          </div>

          {/* Blur Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-dev-subtext">Background Soft Blur:</span>
              <span className="font-bold text-purple-300">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="1"
              value={blur}
              onChange={(e) => handleBlurChange(parseInt(e.target.value, 10))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-dev-subtext/60">
              <span>Sharp (0px)</span>
              <span>Soft (4px)</span>
              <span>Heavy (8px)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-1">
          <button
            onClick={() => {
              if (soundEnabled) playLevelUpSound();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all text-xs shadow-lg shadow-purple-500/20"
          >
            Apply & Close 『決定』
          </button>
        </div>
      </div>
    </div>
  );
};
