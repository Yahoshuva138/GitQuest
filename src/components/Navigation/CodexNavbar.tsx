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
} from 'lucide-react';
import { useGame, TabType } from '../../context/GameContext';
import { InventoryModal } from '../Inventory/InventoryModal';
import { GuildModal } from '../Leaderboard/GuildModal';
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
  } = useGame();

  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isGuildOpen, setIsGuildOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // XP calculations for current level
  const currentLevelBaseXP = (level - 1) * 250;
  const nextLevelXP = level * 250;
  const currentLevelProgress = xp - currentLevelBaseXP;
  const xpPercent = Math.min(100, Math.round((currentLevelProgress / 250) * 100));

  const navLinks: Array<{ id: TabType; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'world-map', label: 'Journey', icon: Map },
    { id: 'missions', label: 'Quests', icon: Gamepad2 },
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
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand / Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-git-orange to-rose-600 border border-git-orange/50 flex items-center justify-center text-white font-pixel text-xs shadow-pixelOrange group-hover:scale-105 transition-transform">
                &gt;
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-pixel text-xs text-dev-heading tracking-wider font-bold">
                    GITQUEST
                  </span>
                  <span className="text-[9px] font-mono px-1 rounded bg-git-orange/15 text-git-orange border border-git-orange/30">
                    RPG
                  </span>
                </div>
                <div className="text-[10px] text-dev-subtext font-mono hidden sm:flex items-center gap-1">
                  <span>⋆˙⟡ A Codédex Adventure</span>
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 pl-3 border-l border-dev-border/70">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
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

          {/* Right: Gamified Stats (XP, Streak, Coins, Audio, Inventory, Guild) */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs font-mono">
            {/* XP & Level Badge */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-dev-surface/60 border border-dev-border">
              <div className="w-6 h-6 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center font-pixel text-[9px] font-bold">
                {level}
              </div>
              <div>
                <div className="flex items-center justify-between text-[10px] text-dev-subtext leading-none mb-1">
                  <span className="font-bold text-dev-heading truncate max-w-[110px]">
                    {playerTitle}
                  </span>
                  <span className="text-purple-300 font-bold ml-1.5">{xp} XP</span>
                </div>
                <div className="w-24 h-1.5 bg-dev-bg rounded-full overflow-hidden border border-dev-border/60">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-git-blue rounded-full transition-all duration-300"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Daily Streak Flame */}
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs shadow-sm cursor-help"
              title={`${streakDays} Day Coding Streak`}
            >
              <Flame className="w-4 h-4 text-git-orange animate-pulse" />
              <span>{streakDays}</span>
            </div>

            {/* Coins / Gems */}
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-bold text-xs cursor-help"
              title="GitQuest Coins earned from quests"
            >
              <span>🪙</span>
              <span>{coins}</span>
            </div>

            {/* Inventory / Backpack Button */}
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setIsInventoryOpen(true);
              }}
              className="p-1.5 rounded-lg bg-dev-surface hover:bg-dev-border border border-dev-border text-dev-heading transition-all active:scale-95"
              title="Open Inventory / Backpack"
            >
              <Backpack className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Guild / Leaderboard Button */}
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

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-dev-surface border border-dev-border text-dev-heading"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-dev-border bg-[#0C1017] p-3 space-y-1">
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

      {/* Modals */}
      <InventoryModal isOpen={isInventoryOpen} onClose={() => setIsInventoryOpen(false)} />
      <GuildModal isOpen={isGuildOpen} onClose={() => setIsGuildOpen(false)} />
    </>
  );
};
