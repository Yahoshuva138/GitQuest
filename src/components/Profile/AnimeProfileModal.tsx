import React, { useState } from 'react';
import { X, Check, Sparkles, User, Shield, Zap } from 'lucide-react';
import { ANIME_CHARACTERS, AnimeCharacter } from '../../data/animeCharacters';
import { useGame } from '../../context/GameContext';
import { playClickSound, playSuccessSound } from '../../utils/audio';

interface AnimeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnimeProfileModal: React.FC<AnimeProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { soundEnabled, level, xp, coins, streakDays } = useGame();

  const [username, setUsername] = useState<string>(
    () => localStorage.getItem('gitquest_username') || 'yahoshuva138'
  );

  const [selectedCharId, setSelectedCharId] = useState<string>(
    () => localStorage.getItem('gitquest_anime_char') || 'sakura-coder'
  );

  if (!isOpen) return null;

  const selectedChar =
    ANIME_CHARACTERS.find((c) => c.id === selectedCharId) || ANIME_CHARACTERS[0];

  const handleSelectCharacter = (char: AnimeCharacter) => {
    if (soundEnabled) playClickSound();
    setSelectedCharId(char.id);
  };

  const handleSave = () => {
    if (soundEnabled) playSuccessSound();
    localStorage.setItem('gitquest_username', username);
    localStorage.setItem('gitquest_anime_char', selectedCharId);
    onClose();
  };

  const handleClose = () => {
    if (soundEnabled) playClickSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0d121c] border-2 border-rpg-gold/70 rounded-2xl shadow-pixelGold overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#141b29] border-b-2 border-rpg-gold/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rpg-gold/20 border-2 border-rpg-gold flex items-center justify-center text-xl">
              🌸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-pixel text-xs sm:text-sm text-rpg-gold tracking-wide">
                  ANIME CHARACTER PROFILE
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
                  LEVEL {level}
                </span>
              </div>
              <p className="text-xs text-dev-subtext font-mono">
                Choose your anime developer persona and customize your profile
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-dev-subtext hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Character Selector (Left) + Character Dossier (Right) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Character Roster (Left 6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="text-[10px] font-mono uppercase text-dev-subtext font-bold mb-2">
              Select Your Anime Companion ({ANIME_CHARACTERS.length})
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {ANIME_CHARACTERS.map((char) => {
                const isSelected = char.id === selectedCharId;

                return (
                  <button
                    key={char.id}
                    onClick={() => handleSelectCharacter(char)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-rpg-gold bg-rpg-gold/10 shadow-pixelGold scale-[1.01]'
                        : 'border-dev-border bg-[#111726] hover:border-dev-border/90'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${char.accentBg}`}
                        style={{ borderColor: char.themeColor }}
                      >
                        {char.avatar}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-dev-heading">
                            {char.name}
                          </span>
                          <span className="text-[10px] font-mono text-dev-subtext">
                            {char.japaneseName}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-dev-subtext">
                          {char.title}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-rpg-gold text-black flex items-center justify-center font-bold text-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Character Dossier (Right 6 cols) */}
          <div className="md:col-span-6 bg-[#131929] border-2 border-dev-border rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Profile Username Input */}
              <div>
                <label className="text-[10px] font-mono uppercase text-dev-subtext font-bold block mb-1">
                  Developer Handle
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-dev-border text-dev-heading font-mono text-xs focus:outline-none focus:border-rpg-gold"
                  placeholder="Enter your username"
                />
              </div>

              {/* Character Details */}
              <div className="p-4 rounded-xl bg-black/40 border border-dev-border/70 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{selectedChar.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-pixel text-xs text-dev-heading font-bold">
                        {selectedChar.name}
                      </h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                        {selectedChar.element}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-rpg-gold">
                      {selectedChar.role}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-dev-text font-sans leading-relaxed">
                  {selectedChar.bio}
                </p>

                <div className="p-2.5 rounded-lg bg-dev-surface/40 border border-dev-border/40 text-xs font-mono italic text-dev-subtext">
                  "{selectedChar.quote}"
                </div>

                <div className="pt-2 border-t border-dev-border/50 flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Passive Bonus: {selectedChar.passiveBonus}</span>
                </div>
              </div>
            </div>

            {/* Save & Confirm Button */}
            <button
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-rpg-gold hover:bg-amber-400 text-black font-pixel text-xs font-bold border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all shadow-pixelGold flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>CONFIRM & EQUIP CHARACTER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
