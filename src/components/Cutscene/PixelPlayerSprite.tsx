import React from 'react';

interface PixelPlayerSpriteProps {
  className?: string;
  size?: number; // size in pixels
}

/**
 * Authentic 8-bit / 16-bit retro RPG pixel art character
 * matching the Codédex intro screen aesthetic.
 */
export const PixelPlayerSprite: React.FC<PixelPlayerSpriteProps> = ({
  className = '',
  size = 96,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-pixel-walk drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
        style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
      >
        {/* Hat / Cap (Red & White) */}
        <rect x="7" y="1" width="10" height="2" fill="#D9383A" />
        <rect x="6" y="3" width="12" height="3" fill="#D9383A" />
        <rect x="8" y="3" width="8" height="2" fill="#FFFFFF" />
        <rect x="5" y="5" width="14" height="2" fill="#BA2626" />
        {/* Visor */}
        <rect x="15" y="5" width="4" height="2" fill="#8E1818" />

        {/* Hair (Dark Brown) */}
        <rect x="5" y="6" width="3" height="4" fill="#5C341F" />
        <rect x="16" y="6" width="3" height="4" fill="#5C341F" />
        <rect x="6" y="7" width="2" height="2" fill="#3D2012" />

        {/* Face / Skin (Warm peach) */}
        <rect x="7" y="7" width="10" height="6" fill="#FFD1A4" />
        <rect x="6" y="9" width="1" height="3" fill="#FFD1A4" />
        <rect x="17" y="9" width="1" height="3" fill="#FFD1A4" />

        {/* Eyes */}
        <rect x="9" y="9" width="2" height="2" fill="#1C1427" />
        <rect x="14" y="9" width="2" height="2" fill="#1C1427" />
        <rect x="9" y="9" width="1" height="1" fill="#FFFFFF" />
        <rect x="14" y="9" width="1" height="1" fill="#FFFFFF" />

        {/* Blush & Smile */}
        <rect x="8" y="11" width="1" height="1" fill="#FFA5A5" />
        <rect x="15" y="11" width="1" height="1" fill="#FFA5A5" />
        <rect x="11" y="11" width="2" height="1" fill="#A8573C" />

        {/* Neck / Shirt Collar */}
        <rect x="9" y="13" width="6" height="1" fill="#FFD1A4" />
        <rect x="8" y="14" width="8" height="2" fill="#FFFFFF" />

        {/* Jacket / Hoodie (Navy Blue & Teal) */}
        <rect x="6" y="15" width="12" height="5" fill="#2563EB" />
        <rect x="7" y="15" width="10" height="4" fill="#3B82F6" />
        <rect x="11" y="15" width="2" height="5" fill="#F8FAFC" /> {/* Zipper */}
        {/* Backpack Straps */}
        <rect x="7" y="15" width="2" height="5" fill="#B45309" />
        <rect x="15" y="15" width="2" height="5" fill="#B45309" />

        {/* Hands / Arms */}
        <rect x="4" y="16" width="2" height="4" fill="#3B82F6" />
        <rect x="18" y="16" width="2" height="4" fill="#3B82F6" />
        <rect x="4" y="20" width="2" height="2" fill="#FFD1A4" />
        <rect x="18" y="20" width="2" height="2" fill="#FFD1A4" />

        {/* Pants (Dark Denim) */}
        <rect x="7" y="20" width="4" height="4" fill="#1E293B" />
        <rect x="13" y="20" width="4" height="4" fill="#1E293B" />
        <rect x="11" y="20" width="2" height="1" fill="#0F172A" />

        {/* Shoes (Red & White Sneakers) */}
        <rect x="6" y="24" width="5" height="3" fill="#DC2626" />
        <rect x="13" y="24" width="5" height="3" fill="#DC2626" />
        <rect x="6" y="26" width="5" height="1" fill="#FFFFFF" />
        <rect x="13" y="26" width="5" height="1" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
