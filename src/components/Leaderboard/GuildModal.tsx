import React, { useState } from 'react';
import { X, Trophy, Flame, Sparkles, Users, Award, Shield, Star } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { playClickSound } from '../../utils/audio';

interface GuildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type GuildType = 'Terminal Knights' | 'Branch Rangers' | 'Octo Guild';

interface LeaderboardUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
  guild: GuildType;
  xp: number;
  level: number;
  streak: number;
  isPlayer?: boolean;
}

export const GuildModal: React.FC<GuildModalProps> = ({ isOpen, onClose }) => {
  const { xp, level, streakDays, playerTitle, soundEnabled } = useGame();
  const [selectedTab, setSelectedTab] = useState<'individual' | 'guilds'>('individual');

  if (!isOpen) return null;

  const rawUsers: LeaderboardUser[] = [
    {
      id: 'u-1',
      name: 'Maya Lin',
      role: 'Senior Staff Engineer',
      avatar: '👩‍💻',
      guild: 'Terminal Knights',
      xp: 2840,
      level: 12,
      streak: 18,
    },
    {
      id: 'player',
      name: 'You (Adventurer)',
      role: playerTitle,
      avatar: '🧙‍♂️',
      guild: 'Terminal Knights',
      xp: Math.max(xp, 1250),
      level: Math.max(level, 5),
      streak: Math.max(streakDays, 3),
      isPlayer: true,
    },
    {
      id: 'u-2',
      name: 'Arjun Patel',
      role: 'DevOps & CI Alchemist',
      avatar: '🧙‍♂️',
      guild: 'Octo Guild',
      xp: 2420,
      level: 10,
      streak: 14,
    },
    {
      id: 'u-3',
      name: 'Sam Rodriguez',
      role: 'Frontend Architect',
      avatar: '🎨',
      guild: 'Branch Rangers',
      xp: 1980,
      level: 8,
      streak: 9,
    },
    {
      id: 'u-4',
      name: 'Byte',
      role: 'Rubber Duck Sentinel',
      avatar: '🦆',
      guild: 'Terminal Knights',
      xp: 1650,
      level: 7,
      streak: 30,
    },
    {
      id: 'u-5',
      name: 'Alex Rivera',
      role: 'Open Source Contributor',
      avatar: '⚡',
      guild: 'Octo Guild',
      xp: 1420,
      level: 6,
      streak: 5,
    },
  ];

  const users = [...rawUsers].sort((a, b) => b.xp - a.xp);

  const guilds = [
    {
      name: 'Terminal Knights',
      badge: '⚔️',
      color: 'text-git-orange border-git-orange/40 bg-git-orange/10',
      description: 'Masters of the sacred CLI commands and pristine commit histories.',
      members: 428,
      totalXp: '142,500 XP',
      rank: 1,
    },
    {
      name: 'Octo Guild',
      badge: '🐙',
      color: 'text-purple-400 border-purple-500/40 bg-purple-950/20',
      description: 'Collaborative warriors opening PRs, reviewing code, and shipping across the world.',
      members: 395,
      totalXp: '131,200 XP',
      rank: 2,
    },
    {
      name: 'Branch Rangers',
      badge: '🌿',
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20',
      description: 'Navigators of parallel feature timelines, rebases, and clean fast-forwards.',
      members: 362,
      totalXp: '118,900 XP',
      rank: 3,
    },
  ];

  const handleClose = () => {
    if (soundEnabled) playClickSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0d121c] border-2 border-rpg-gold/70 rounded-xl shadow-pixelGold overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#141b29] border-b-2 border-rpg-gold/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rpg-gold/20 border-2 border-rpg-gold flex items-center justify-center text-xl">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-pixel text-sm sm:text-base text-rpg-gold tracking-wide">
                  GUILD LEADERBOARD
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rpg-gold/20 text-rpg-gold border border-rpg-gold/40 font-bold">
                  SEASON 1
                </span>
              </div>
              <p className="text-xs text-dev-subtext font-mono">
                Compete with Maya, Arjun, Sam and developers worldwide
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

        {/* Tab switch */}
        <div className="px-5 py-2.5 bg-[#0a0e17] border-b border-dev-border/60 flex items-center gap-2">
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setSelectedTab('individual');
            }}
            className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${
              selectedTab === 'individual'
                ? 'bg-rpg-gold text-black font-bold shadow-pixel'
                : 'text-dev-subtext hover:text-dev-heading hover:bg-dev-surface/50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>INDIVIDUAL RANKINGS</span>
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setSelectedTab('guilds');
            }}
            className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${
              selectedTab === 'guilds'
                ? 'bg-rpg-gold text-black font-bold shadow-pixel'
                : 'text-dev-subtext hover:text-dev-heading hover:bg-dev-surface/50'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>GUILD HOUSES</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {selectedTab === 'individual' ? (
            <div className="space-y-2.5">
              {users.map((user, idx) => {
                const rank = idx + 1;
                const isTop3 = rank <= 3;
                const medalColor =
                  rank === 1
                    ? 'text-amber-400 bg-amber-500/20 border-amber-500/50'
                    : rank === 2
                    ? 'text-slate-300 bg-slate-400/20 border-slate-400/50'
                    : rank === 3
                    ? 'text-amber-600 bg-amber-700/20 border-amber-700/50'
                    : 'text-dev-subtext bg-dev-surface/50 border-dev-border';

                return (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      user.isPlayer
                        ? 'bg-git-blue/10 border-git-blue shadow-pixelBlue'
                        : 'bg-[#141b29] border-dev-border hover:border-dev-border/90'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank badge */}
                      <div
                        className={`w-7 h-7 rounded-lg border font-pixel text-xs flex items-center justify-center font-bold ${medalColor}`}
                      >
                        {rank}
                      </div>

                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-dev-surface border border-dev-border flex items-center justify-center text-xl shadow-inner">
                        {user.avatar}
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-mono font-bold ${
                              user.isPlayer ? 'text-git-blue' : 'text-dev-heading'
                            }`}
                          >
                            {user.name}
                          </span>
                          {user.isPlayer && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-git-blue text-white font-bold">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-dev-subtext flex items-center gap-2">
                          <span>{user.role}</span>
                          <span>•</span>
                          <span className="text-dev-subtext/80">{user.guild}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-right font-mono">
                      <div className="hidden sm:block">
                        <div className="flex items-center gap-1 text-xs text-rpg-streak font-bold justify-end">
                          <Flame className="w-3.5 h-3.5" />
                          <span>{user.streak}d streak</span>
                        </div>
                        <span className="text-[10px] text-dev-subtext">Level {user.level}</span>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-dev-border/70 min-w-[90px]">
                        <span className="font-pixel text-xs text-rpg-xp font-bold">
                          {user.xp} XP
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {guilds.map((g) => (
                <div
                  key={g.name}
                  className="p-4 rounded-xl bg-[#141b29] border-2 border-dev-border hover:border-rpg-gold/50 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-dev-surface border border-dev-border flex items-center justify-center text-2xl">
                        {g.badge}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-pixel text-xs sm:text-sm text-dev-heading font-bold">
                            {g.name}
                          </h3>
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${g.color}`}
                          >
                            RANK #{g.rank}
                          </span>
                        </div>
                        <p className="text-xs text-dev-subtext font-sans mt-0.5">
                          {g.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-pixel text-xs text-rpg-xp font-bold block">
                        {g.totalXp}
                      </span>
                      <span className="text-[10px] text-dev-subtext">
                        {g.members} Adventurers
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#141b29] border-t border-dev-border flex items-center justify-between text-xs font-mono text-dev-subtext">
          <span>Weekly reset in: 4 days, 12 hours</span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-heading font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
