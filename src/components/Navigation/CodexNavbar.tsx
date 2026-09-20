import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Gamepad2,
  Backpack,
  Trophy,
  Terminal,
  ChevronDown,
  Layers,
  Map,
  Menu,
  X,
  BookOpen,
  Scale,
  Search,
  Bell,
  User,
} from 'lucide-react';
import { useGame, TabType } from '../../context/GameContext';
import { InventoryModal } from '../Inventory/InventoryModal';
import { GuildModal } from '../Leaderboard/GuildModal';
import { AnimeProfileModal } from '../Profile/AnimeProfileModal';
import { ANIME_CHARACTERS } from '../../data/animeCharacters';
import { playClickSound } from '../../utils/audio';

export const CodexNavbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    xp,
    level,
    coins,
    streakDays,
    soundEnabled,
    toggleSound,
    playerTitle,
    openTermsModal,
  } = useGame();

  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isGuildOpen, setIsGuildOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active character avatar
  const activeCharId = localStorage.getItem('gitquest_anime_char') || 'sakura-coder';
  const character =
    ANIME_CHARACTERS.find((c) => c.id === activeCharId) || ANIME_CHARACTERS[0];

  // XP calculations for current level
  const currentLevelBaseXP = (level - 1) * 250;
  const nextLevelXP = level * 250;
  const currentLevelProgress = xp - currentLevelBaseXP;
  const xpPercent = Math.min(100, Math.round((currentLevelProgress / 250) * 100));

  const navLinks: Array<{ id: TabType; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'home', label: 'Learn', icon: BookOpen },
    { id: 'world-map', label: 'Journey', icon: Map },
    { id: 'missions', label: 'Build', icon: Gamepad2 },
    { id: 'branch-lab', label: 'Branches', icon: Compass },
    { id: 'conflict-lab', label: 'Conflicts', icon: Flame },
    { id: 'github-lab', label: 'GitHub Lab', icon: Layers },
    { id: 'practice-lab', label: 'Sandbox', icon: Terminal },
  ];

  const handleNavClick = (id: TabType) => {
    if (soundEnabled) playClickSound();
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0C1017]/95 backdrop-blur border-b border-dev-border select-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand & Links matching reference image */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Codédex Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-git-orange flex items-center justify-center text-black font-pixel text-xs shadow-pixelGold group-hover:scale-105 transition-transform">
                🪙
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-pixel text-xs sm:text-sm text-white tracking-widest font-bold drop-shadow">
                  Codédex
                </span>
                <span className="text-[9px] font-mono px-1 rounded bg-git-orange/20 text-git-orange border border-git-orange/40 font-bold hidden sm:inline">
                  GIT & GITHUB
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 pl-2 border-l border-dev-border/70">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      isActive
                        ? 'bg-dev-surface text-git-blue font-bold border border-dev-border shadow-sm'
                        : 'text-dev-subtext hover:text-dev-heading hover:bg-dev-surface/40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: User Stats, Avatar, and Join Club Button */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
            {/* Daily Streak */}
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs cursor-help"
              title={`${streakDays} Day Coding Streak`}
            >
              <Flame className="w-4 h-4 text-git-orange animate-pulse" />
              <span>{streakDays}</span>
            </div>

            {/* Coins */}
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-bold text-xs cursor-help"
              title="GitQuest Coins earned from quests"
            >
              <span>🪙</span>
              <span>{coins}</span>
            </div>

            {/* Backpack Button */}
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setIsInventoryOpen(true);
              }}
              className="p-1.5 rounded-lg bg-dev-surface hover:bg-dev-border border border-dev-border text-dev-heading transition-all active:scale-95"
              title="Open Backpack / Artifacts"
            >
              <Backpack className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Guild Button */}
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setIsGuildOpen(true);
              }}
              className="p-1.5 rounded-lg bg-dev-surface hover:bg-dev-border border border-dev-border text-dev-heading transition-all active:scale-95"
              title="View Leaderboard & Guilds"
            >
              <Trophy className="w-4 h-4 text-git-yellow" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg bg-dev-surface hover:bg-dev-border border border-dev-border text-dev-heading transition-all active:scale-95"
              title={soundEnabled ? 'Mute 8-bit sound effects' : 'Enable 8-bit sound effects'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-git-blue" />
              ) : (
                <VolumeX className="w-4 h-4 text-dev-subtext" />
              )}
            </button>

            {/* Terms Button */}
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                openTermsModal();
              }}
              className="p-1.5 rounded-lg bg-dev-surface hover:bg-dev-border border border-dev-border text-dev-subtext hover:text-dev-heading transition-all active:scale-95"
              title="Terms and Conditions"
            >
              <Scale className="w-4 h-4 text-slate-300" />
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setIsProfileOpen(true);
              }}
              className="w-8 h-8 rounded-full bg-purple-600/30 border-2 border-purple-500/60 flex items-center justify-center text-sm shadow-sm hover:scale-105 transition-transform"
              title="Edit Anime Profile & Character"
            >
              <span>{character.avatar}</span>
            </button>

            {/* Join Club Button - Matching reference image */}
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setIsGuildOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-full bg-rpg-gold hover:bg-amber-400 text-black font-sans font-bold text-xs shadow-pixelGold active:scale-95 transition-all hidden sm:flex items-center gap-1"
            >
              <span>Join Club</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg bg-dev-surface border border-dev-border text-dev-heading"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-dev-border bg-[#0C1017] p-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                    isActive
                      ? 'bg-dev-surface text-git-blue font-bold border border-dev-border'
                      : 'text-dev-subtext hover:text-dev-heading hover:bg-dev-surface/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Modals */}
      <InventoryModal isOpen={isInventoryOpen} onClose={() => setIsInventoryOpen(false)} />
      <GuildModal isOpen={isGuildOpen} onClose={() => setIsGuildOpen(false)} />
      <AnimeProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};
