import React, { useEffect, useState } from 'react';
import {
  BACKGROUND_THEMES,
  BackgroundTheme,
  PAGE_BACKGROUND_MAP,
} from '../../data/backgroundThemes';
import { safeStorage } from '../../utils/security';
import { useGame } from '../../context/GameContext';

export const AestheticBackground: React.FC = () => {
  const { activeTab } = useGame();

  const [mode, setMode] = useState<'dynamic' | 'fixed'>(() => {
    return (safeStorage.getItem('gitquest_bg_mode', 'dynamic') as 'dynamic' | 'fixed') || 'dynamic';
  });

  const [fixedThemeId, setFixedThemeId] = useState<string>(() => {
    const saved = safeStorage.getItem('gitquest_bg_theme', 'tokyo-twilight');
    return saved === 'codedex-twilight' ? 'tokyo-twilight' : saved;
  });

  const [opacity, setOpacity] = useState<number>(() => {
    const saved = safeStorage.getItem('gitquest_bg_opacity', '0.24');
    return parseFloat(saved) || 0.24;
  });

  const [blur, setBlur] = useState<number>(() => {
    const saved = safeStorage.getItem('gitquest_bg_blur', '0');
    return parseInt(saved, 10) || 0;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const savedMode = (safeStorage.getItem('gitquest_bg_mode', 'dynamic') as 'dynamic' | 'fixed') || 'dynamic';
      const savedThemeId = safeStorage.getItem('gitquest_bg_theme', 'tokyo-twilight');
      const themeId = savedThemeId === 'codedex-twilight' ? 'tokyo-twilight' : savedThemeId;
      const op = parseFloat(safeStorage.getItem('gitquest_bg_opacity', '0.24')) || 0.24;
      const bl = parseInt(safeStorage.getItem('gitquest_bg_blur', '0'), 10) || 0;
      setMode(savedMode);
      setFixedThemeId(themeId);
      setOpacity(op);
      setBlur(bl);
    };

    window.addEventListener('gitquest_bg_updated', handleUpdate);
    return () => window.removeEventListener('gitquest_bg_updated', handleUpdate);
  }, []);

  // Determine active theme based on dynamic page mapping or user fixed preference
  const targetThemeId = mode === 'dynamic' 
    ? (PAGE_BACKGROUND_MAP[activeTab] || 'tokyo-twilight')
    : fixedThemeId;

  const activeTheme =
    BACKGROUND_THEMES.find((t) => t.id === targetThemeId) || BACKGROUND_THEMES[0];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Underlying Base Background Image with Smooth Crossfade */}
      {activeTheme.image ? (
        <div
          key={activeTheme.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out animate-fade-in"
          style={{
            backgroundImage: `url(${activeTheme.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: opacity,
            filter: blur > 0 ? `blur(${blur}px)` : 'none',
          }}
        />
      ) : (
        /* Pure Cyber Grid Fallback */
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"
        />
      )}

      {/* 2. Top & Bottom Atmospheric Vignette Gradients for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/85 via-transparent to-[#0B0F17]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/65 via-transparent to-[#0B0F17]/65" />

      {/* 3. Subtle Cyber Scanline / Ambient Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
    </div>
  );
};
