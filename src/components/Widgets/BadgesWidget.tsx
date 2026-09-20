import React from 'react';
import { Award, Lock } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const BadgesWidget: React.FC = () => {
  const { completedMissions } = useGame();

  const badges = [
    {
      id: 'b-origin',
      name: 'Origin Explorer',
      icon: '💎',
      unlocked: completedMissions.length >= 3,
      requirement: 'Complete Chapter 1',
    },
    {
      id: 'b-merge',
      name: 'Merge Guardian',
      icon: '🛡️',
      unlocked: completedMissions.includes('m-10-merge-conflict'),
      requirement: 'Resolve a 3-way conflict',
    },
    {
      id: 'b-octo',
      name: 'Octo Champion',
      icon: '🐙',
      unlocked: completedMissions.includes('m-14-pr-review'),
      requirement: 'Complete Chapter 2',
    },
  ];

  return (
    <div className="rounded-2xl bg-[#0e1320] border-2 border-dev-border/80 p-5 shadow-lg select-none mb-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold text-dev-heading uppercase tracking-wide">
          Course Badges
        </h3>
        <span className="text-[10px] font-mono text-dev-subtext">
          {badges.filter((b) => b.unlocked).length}/{badges.length}
        </span>
      </div>

      <p className="text-[11px] font-mono text-dev-subtext">
        Complete all chapters to earn a badge - collect 'em all!
      </p>

      {/* Badges row */}
      <div className="flex items-center gap-3 pt-1">
        {badges.map((b) => (
          <div
            key={b.id}
            className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl transition-transform hover:scale-105 relative group cursor-help ${
              b.unlocked
                ? 'border-rpg-gold bg-rpg-gold/10 shadow-pixelGold'
                : 'border-slate-800 bg-slate-950/40 opacity-40'
            }`}
            title={`${b.name}: ${b.requirement}`}
          >
            <span>{b.unlocked ? b.icon : '🔒'}</span>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-30 px-2.5 py-1 rounded bg-black/90 border border-dev-border text-[10px] font-mono text-dev-heading whitespace-nowrap shadow-lg">
              {b.name} ({b.unlocked ? 'Unlocked' : b.requirement})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
