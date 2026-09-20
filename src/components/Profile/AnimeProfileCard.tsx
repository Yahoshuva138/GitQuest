import React from 'react';
import { User, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { ANIME_CHARACTERS } from '../../data/animeCharacters';
import { playClickSound } from '../../utils/audio';

interface AnimeProfileCardProps {
  onOpenProfileModal: () => void;
}

export const AnimeProfileCard: React.FC<AnimeProfileCardProps> = ({
  onOpenProfileModal,
}) => {
  const { level, playerTitle, soundEnabled } = useGame();

  // Get active anime character from localStorage or default to Sakura Coder
  const activeCharId = localStorage.getItem('gitquest_anime_char') || 'sakura-coder';
  const character =
    ANIME_CHARACTERS.find((c) => c.id === activeCharId) || ANIME_CHARACTERS[0];

  const username = localStorage.getItem('gitquest_username') || 'yahoshuva138';

  const handleClick = () => {
    if (soundEnabled) playClickSound();
    onOpenProfileModal();
  };

  return (
    <div className="rounded-2xl bg-[#0e1320] border-2 border-dev-border/80 p-5 shadow-lg select-none mb-4">
      <div className="flex items-center gap-3.5 mb-3.5">
        {/* Anime Character Avatar */}
        <div
          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shadow-inner bg-gradient-to-br ${character.accentBg} border-purple-500/40`}
        >
          {character.avatar}
        </div>

        {/* Username & Level */}
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-sm text-dev-heading">
              {username}
            </span>
          </div>
          <div className="text-[11px] font-mono text-dev-subtext">
            Level {level} • {character.name}
          </div>
        </div>
      </div>

      {/* View Profile Button */}
      <button
        onClick={handleClick}
        className="w-full py-2 rounded-xl bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-xs font-mono font-bold text-dev-heading transition-all active:scale-95"
      >
        View Profile
      </button>
    </div>
  );
};
