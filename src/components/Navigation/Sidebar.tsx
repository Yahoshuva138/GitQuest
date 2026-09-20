import React, { useState } from 'react';
import {
  Home,
  Map,
  Gamepad2,
  Terminal as TerminalIcon,
  GitBranch,
  Cloud,
  Flame,
  Trophy,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useGame, TabType } from '../../context/GameContext';
import { MISSIONS } from '../../data/missions';
import { TeamRosterModal } from '../Characters/TeamRosterModal';
import { CharacterAvatar } from '../Characters/CharacterAvatar';
import { TEAM_CHARACTERS } from '../../data/characters';
import { playClickSound } from '../../utils/audio';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, completedMissions, currentMission, soundEnabled } = useGame();
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const navItems: Array<{ id: TabType; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'world-map', label: 'Journey (Overworld)', icon: Map },
    { id: 'home', label: 'Home Base', icon: Home },
    { id: 'missions', label: 'Quests', icon: Gamepad2 },
    { id: 'practice-lab', label: 'Sandbox Lab', icon: TerminalIcon },
    { id: 'branch-lab', label: 'Branch Lab', icon: GitBranch },
    { id: 'github-lab', label: 'GitHub Lab', icon: Cloud },
    { id: 'conflict-lab', label: 'Conflict Lab', icon: Flame },
    { id: 'learning-map', label: 'Skill Tree', icon: Map },
    { id: 'progress', label: 'Progress & Badges', icon: Trophy },
  ];

  const totalMissions = MISSIONS.length;
  const completedCount = completedMissions.length;
  const progressPercent = Math.round((completedCount / totalMissions) * 100);

  const handleNavClick = (id: TabType) => {
    if (soundEnabled) playClickSound();
    setActiveTab(id);
  };

  return (
    <aside className="w-64 bg-dev-panel border-r border-dev-border flex flex-col justify-between h-[calc(100vh-50px)] sticky top-[50px] select-none shrink-0 hidden md:flex overflow-y-auto">
      {/* Brand & Quick Info */}
      <div>
        {/* Current Active Mission Quick Bar */}
        <div className="p-3 mx-3 my-3 rounded-lg bg-dev-surface/70 border border-dev-border text-xs shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase text-dev-subtext flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-git-yellow" /> Active Quest
            </span>
            <span className="text-[10px] font-mono text-git-blue font-bold">
              {currentMission.badge}
            </span>
          </div>
          <p className="font-semibold text-dev-heading truncate">{currentMission.title}</p>
        </div>

        {/* Navigation Items */}
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-all duration-150 ${
                  isActive
                    ? 'bg-dev-surface text-git-blue border border-dev-border font-semibold shadow-subtle'
                    : 'text-dev-text hover:bg-dev-surface/50 hover:text-dev-heading'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-git-blue' : 'text-dev-subtext'}`} />
                  <span>{item.label}</span>
                </div>
                {item.id === 'missions' && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-git-blue/15 text-git-blue border border-git-blue/30">
                    {completedCount}/{totalMissions}
                  </span>
                )}
                {item.id === 'progress' && completedCount > 0 && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-git-green" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Team Avatars Quick Dock */}
        <div className="px-3 pt-3">
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setIsTeamModalOpen(true);
            }}
            className="w-full p-2.5 rounded-md bg-[#0D1219] border border-dev-border/70 hover:border-git-blue/50 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase text-dev-subtext group-hover:text-dev-heading">
                Engineering Companions
              </span>
              <span className="text-[9px] text-git-blue font-mono">View All &gt;</span>
            </div>
            <div className="flex items-center -space-x-1.5 overflow-hidden">
              {Object.values(TEAM_CHARACTERS).map((member) => (
                <CharacterAvatar key={member.id} character={member} size="sm" showStatus={false} />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Team Roster Modal */}
      <TeamRosterModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} />

      {/* Footer / Skill Progress */}
      <div className="p-4 border-t border-dev-border bg-dev-panel/50">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-dev-subtext font-mono text-[11px]">Git Mastery</span>
          <span className="font-mono text-dev-heading text-[11px] font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-dev-surface rounded-full overflow-hidden border border-dev-border">
          <div
            className="h-full bg-gradient-to-r from-git-orange to-git-green transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-3 pt-2 border-t border-dev-border/50 flex items-center justify-between text-[11px] text-dev-subtext">
          <span>Mode: In-Browser Simulator</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Engine Online" />
        </div>
      </div>
    </aside>
  );
};
