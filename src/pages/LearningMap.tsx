import React from 'react';
import {
  CheckCircle2,
  Lock,
  Play,
  GitBranch,
  GitCommit,
  Flame,
  Cloud,
  GitPullRequest,
  Cpu,
  Compass,
  ArrowDown,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { MISSIONS } from '../data/missions';
import { LEVELS } from '../data/levels';

export const LearningMap: React.FC = () => {
  const { completedMissions, startMission } = useGame();

  // Group missions by level
  const levelsWithMissions = LEVELS.map((lvl) => {
    const missions = MISSIONS.filter((m) => m.levelId === lvl.id);
    const isCompleted = missions.every((m) => completedMissions.includes(m.id));
    const isUnlocked =
      lvl.number === 1 ||
      LEVELS[lvl.number - 2].missions.some((mId) => completedMissions.includes(mId));

    return {
      ...lvl,
      missions,
      isCompleted,
      isUnlocked,
    };
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono text-xs animate-stage-in">
      {/* Header */}
      <div className="dev-panel p-5 bg-dev-panel border-dev-border shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-git-blue mb-1">
            <Compass className="w-4 h-4" />
            <span className="text-[11px] uppercase font-bold tracking-wider">
              Visual Progression Map
            </span>
          </div>
          <h1 className="text-xl font-bold text-dev-heading font-sans">
            The Git &amp; GitHub Knowledge Tree
          </h1>
          <p className="text-xs text-dev-subtext font-sans mt-0.5">
            Click any unlocked node to embark on that hands-on mission.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-dev-subtext">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-git-green" /> Mastered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-git-blue animate-pulse" /> In Progress
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-dev-subtext/60" /> Locked
          </span>
        </div>
      </div>

      {/* Vertical Map Timeline */}
      <div className="space-y-4 relative">
        {levelsWithMissions.map((level, lvlIdx) => {
          return (
            <div key={level.id} className="relative">
              {/* Connecting line to next level */}
              {lvlIdx < levelsWithMissions.length - 1 && (
                <div className="absolute left-[34px] top-12 bottom-[-16px] w-0.5 bg-dev-border/70 z-0" />
              )}

              <div
                className={`dev-panel p-4 rounded-lg border transition-all relative z-10 ${
                  level.isCompleted
                    ? 'bg-dev-surface/40 border-emerald-500/30'
                    : level.isUnlocked
                    ? 'bg-dev-surface/70 border-git-blue/50 ring-1 ring-git-blue/20'
                    : 'bg-dev-panel/40 border-dev-border/50 opacity-60'
                }`}
              >
                {/* Level Title Row */}
                <div className="flex items-center justify-between pb-3 border-b border-dev-border/60">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-md flex items-center justify-center font-bold border text-sm ${
                        level.isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : level.isUnlocked
                          ? 'bg-git-blue/20 text-git-blue border-git-blue/40'
                          : 'bg-dev-panel text-dev-subtext border-dev-border'
                      }`}
                    >
                      0{level.number}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-sm text-dev-heading font-sans">
                          {level.title}
                        </h2>
                        <span className="text-[10px] text-dev-subtext uppercase">
                          {level.subtitle}
                        </span>
                      </div>
                      <p className="text-[11px] text-dev-subtext font-sans mt-0.5">
                        {level.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {level.isCompleted ? (
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Level Complete
                      </span>
                    ) : level.isUnlocked ? (
                      <span className="text-[11px] font-bold text-git-blue">Unlocked</span>
                    ) : (
                      <span className="text-[11px] text-dev-subtext flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </div>
                </div>

                {/* Missions inside this level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mt-3">
                  {level.missions.map((mission) => {
                    const isMissionDone = completedMissions.includes(mission.id);

                    return (
                      <div
                        key={mission.id}
                        onClick={() => {
                          if (level.isUnlocked) startMission(mission.id);
                        }}
                        className={`p-3 rounded-md border flex flex-col justify-between transition-all ${
                          level.isUnlocked
                            ? 'cursor-pointer hover:scale-[1.01] hover:border-git-blue active:scale-[0.99]'
                            : 'cursor-not-allowed opacity-60'
                        } ${
                          isMissionDone
                            ? 'bg-[#0E151E] border-emerald-500/40'
                            : level.isUnlocked
                            ? 'bg-[#0B0F14] border-dev-border hover:bg-dev-surface/40'
                            : 'bg-[#080B0F] border-dev-border/40'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-dev-subtext">
                              {mission.badge}
                            </span>
                            {isMissionDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : level.isUnlocked ? (
                              <Play className="w-3 h-3 text-git-blue" />
                            ) : (
                              <Lock className="w-3 h-3 text-dev-subtext" />
                            )}
                          </div>
                          <h4 className="font-bold text-dev-heading text-xs font-sans">
                            {mission.title}
                          </h4>
                          <p className="text-[10.5px] text-dev-subtext font-sans line-clamp-2">
                            {mission.subtitle}
                          </p>
                        </div>

                        <div className="mt-2 pt-2 border-t border-dev-border/40 flex items-center justify-between text-[10px]">
                          <span className="text-dev-subtext/70">
                            {mission.steps.length} step{mission.steps.length > 1 ? 's' : ''}
                          </span>
                          <span className={isMissionDone ? 'text-emerald-400 font-semibold' : 'text-git-blue'}>
                            {isMissionDone ? 'Completed' : 'Play Mission →'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
