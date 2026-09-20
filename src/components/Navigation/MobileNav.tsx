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
  Menu,
  X,
} from 'lucide-react';
import { useGame, TabType } from '../../context/GameContext';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, currentMission } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: Array<{ id: TabType; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learning-map', label: 'Learning Map', icon: Map },
    { id: 'missions', label: 'Missions', icon: Gamepad2 },
    { id: 'practice-lab', label: 'Practice Lab', icon: TerminalIcon },
    { id: 'branch-lab', label: 'Branch Lab', icon: GitBranch },
    { id: 'github-lab', label: 'GitHub Lab', icon: Cloud },
    { id: 'conflict-lab', label: 'Conflict Lab', icon: Flame },
    { id: 'progress', label: 'Progress', icon: Trophy },
  ];

  return (
    <div className="md:hidden border-b border-dev-border bg-dev-panel sticky top-0 z-40">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-git-orange/15 border border-git-orange/40 flex items-center justify-center text-git-orange font-mono font-bold text-sm">
            &gt;_
          </div>
          <span className="font-bold font-mono text-dev-heading">GitQuest</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-dev-surface text-git-blue border border-dev-border">
            {currentMission.badge}
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-md border border-dev-border bg-dev-surface text-dev-text hover:text-dev-heading"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Slide-down Drawer */}
      {isOpen && (
        <div className="border-t border-dev-border bg-dev-panel p-2 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'bg-dev-surface text-git-blue font-semibold border border-dev-border'
                    : 'text-dev-text hover:bg-dev-surface/40 hover:text-dev-heading'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
