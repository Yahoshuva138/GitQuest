import React, { useEffect, useState } from 'react';
import { BACKGROUND_THEMES, BackgroundTheme } from '../../data/backgroundThemes';
import { safeStorage } from '../../utils/security';

export const AestheticBackground: React.FC = () => {
  const [currentThemeId, setCurrentThemeId] = useState<string>(() => {
    return safeStorage.getItem('gitquest_bg_theme', 'neo-tokyo');
  });

  const [opacity, setOpacity] = useState<number>(() => {
    const saved = safeStorage.getItem('gitquest_bg_opacity', '0.22');
    return parseFloat(saved) || 0.22;
  });

  const [blur, setBlur] = useState<number>(() => {
    const saved = safeStorage.getItem('gitquest_bg_blur', '0');
    return parseInt(saved, 10) || 0;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const themeId = safeStorage.getItem('gitquest_bg_theme', 'neo-tokyo');
      const op = parseFloat(safeStorage.getItem('gitquest_bg_opacity', '0.22')) || 0.22;
      const bl = parseInt(safeStorage.getItem('gitquest_bg_blur', '0'), 10) || 0;
      setCurrentThemeId(themeId);
      setOpacity(op);
      setBlur(bl);
    };

    window.addEventListener('gitquest_bg_updated', handleUpdate);
    return () => window.removeEventListener('gitquest_bg_updated', handleUpdate);
  }, []);

  const activeTheme =
    BACKGROUND_THEMES.find((t) => t.id === currentThemeId) || BACKGROUND_THEMES[0];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-all duration-700"
    >
      {/* 1. Underlying Base Background Image */}
      {activeTheme.image ? (
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/80 via-transparent to-[#0B0F17]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/60 via-transparent to-[#0B0F17]/60" />

      {/* 3. Subtle Cyber Scanline / Ambient Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
    </div>
  );
};
