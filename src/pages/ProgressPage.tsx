import React from 'react';
import {
  Trophy,
  CheckCircle2,
  Lock,
  RotateCcw,
  Sparkles,
  GitCommit,
  GitBranch,
  Flame,
  Cloud,
  GitPullRequest,
  Cpu,
  Search,
  CheckSquare,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ACHIEVEMENTS } from '../data/achievements';
import { MISSIONS } from '../data/missions';
import { LEVELS } from '../data/levels';

export const ProgressPage: React.FC = () => {
  const {
    completedMissions,
    unlockedAchievements,
    resetAllProgress,
  } = useGame();

  const totalMissions = MISSIONS.length;
  const completedCount = completedMissions.length;
  const overallPercent = Math.round((completedCount / totalMissions) * 100);

  // Skill Domains Breakdown
  const skillDomains = [
    { name: 'Git Fundamentals', levels: [1], icon: 'Compass' },
    { name: 'Commits & History', levels: [2], icon: 'GitCommit' },
    { name: 'Branches & HEAD', levels: [3], icon: 'GitBranch' },
    { name: 'Merge Conflicts', levels: [4], icon: 'Flame' },
    { name: 'GitHub & Remotes', levels: [5], icon: 'Cloud' },
    { name: 'Team & Pull Requests', levels: [6, 7], icon: 'GitPullRequest' },
    { name: 'CI/CD & Recovery', levels: [8], icon: 'Cpu' },
  ];

  const getDomainProgress = (levelNumbers: number[]) => {
    const domainMissions = MISSIONS.filter((m) => levelNumbers.includes(m.levelNumber));
    if (domainMissions.length === 0) return 0;
    const done = domainMissions.filter((m) => completedMissions.includes(m.id)).length;
    return Math.round((done / domainMissions.length) * 100);
  };

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitCommit': return GitCommit;
      case 'CheckSquare': return CheckSquare;
      case 'Search': return Search;
      case 'GitBranch': return GitBranch;
      case 'Flame': return Flame;
      case 'Cloud': return Cloud;
      case 'GitPullRequest': return GitPullRequest;
      case 'Cpu': return Cpu;
      default: return Trophy;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-mono text-xs animate-stage-in">
      {/* Header */}
      <div className="dev-panel p-5 bg-dev-panel border-dev-border shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-git-yellow mb-1">
            <Trophy className="w-4 h-4" />
            <span className="text-[11px] uppercase font-bold tracking-wider">
              DEVELOPER PROGRESS &amp; MASTERY
            </span>
          </div>
          <h1 className="text-xl font-bold text-dev-heading font-sans">
            Your Git Mastery Portfolio
          </h1>
          <p className="text-xs text-dev-subtext font-sans mt-0.5">
            Real skills and authentic milestones verified through hands-on practice.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all mission progress and achievements?')) {
              resetAllProgress();
            }
          }}
          className="dev-button-danger text-xs py-1.5 px-3"
          title="Reset progress"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Progress</span>
        </button>
      </div>

      {/* Overall Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="dev-panel p-4 bg-dev-surface/40 border-dev-border">
          <span className="text-[10px] uppercase text-dev-subtext font-bold">Overall Completion</span>
          <div className="text-2xl font-bold text-dev-heading mt-1 font-sans">{overallPercent}%</div>
          <div className="w-full h-1.5 bg-dev-panel rounded-full mt-2 overflow-hidden border border-dev-border">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallPercent}%` }} />
          </div>
        </div>

        <div className="dev-panel p-4 bg-dev-surface/40 border-dev-border">
          <span className="text-[10px] uppercase text-dev-subtext font-bold">Missions Solved</span>
          <div className="text-2xl font-bold text-git-blue mt-1 font-sans">
            {completedCount} <span className="text-xs text-dev-subtext font-normal font-mono">/ {totalMissions}</span>
          </div>
          <p className="text-[10px] text-dev-subtext mt-2 font-sans">Hands-on problem scenarios solved</p>
        </div>

        <div className="dev-panel p-4 bg-dev-surface/40 border-dev-border">
          <span className="text-[10px] uppercase text-dev-subtext font-bold">Skill Badges</span>
          <div className="text-2xl font-bold text-git-yellow mt-1 font-sans">
            {unlockedAchievements.length} <span className="text-xs text-dev-subtext font-normal font-mono">/ {ACHIEVEMENTS.length}</span>
          </div>
          <p className="text-[10px] text-dev-subtext mt-2 font-sans">Developer milestones awarded</p>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="dev-panel p-5 bg-dev-panel border-dev-border space-y-4">
        <h3 className="font-bold text-xs text-dev-heading uppercase tracking-wider pb-2 border-b border-dev-border">
          Skills Competency Matrix
        </h3>

        <div className="space-y-3">
          {skillDomains.map((domain, i) => {
            const pct = getDomainProgress(domain.levels);
            const isDone = pct === 100;

            return (
              <div key={i} className="p-3 rounded-lg bg-dev-surface/30 border border-dev-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded flex items-center justify-center font-bold border ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : pct > 0
                      ? 'bg-git-blue/20 text-git-blue border-git-blue/40'
                      : 'bg-dev-panel text-dev-subtext border-dev-border'
                  }`}>
                    {isDone ? '✓' : `${i + 1}`}
                  </div>
                  <div>
                    <div className="font-bold text-dev-heading text-xs font-sans">{domain.name}</div>
                    <div className="text-[10.5px] text-dev-subtext">Level {domain.levels.join(', ')} Competencies</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="flex-1 h-2 bg-dev-panel rounded-full overflow-hidden border border-dev-border">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isDone ? 'bg-emerald-500' : 'bg-git-blue'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-bold text-dev-heading text-[11px] w-10 text-right">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements Badges Showcase */}
      <div className="dev-panel p-5 bg-dev-panel border-dev-border space-y-4">
        <h3 className="font-bold text-xs text-dev-heading uppercase tracking-wider pb-2 border-b border-dev-border">
          Earned Skill Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            const Icon = getAchievementIcon(ach.icon);

            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-lg border flex flex-col justify-between transition-all ${
                  isUnlocked
                    ? 'bg-dev-surface/50 border-git-yellow/40 shadow-sm'
                    : 'bg-dev-surface/10 border-dev-border/40 opacity-50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center border ${
                      isUnlocked
                        ? 'bg-git-yellow/20 text-git-yellow border-git-yellow/40'
                        : 'bg-dev-panel text-dev-subtext border-dev-border'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-dev-subtext" />
                    )}
                  </div>

                  <h4 className="font-bold text-dev-heading text-xs font-sans">{ach.title}</h4>
                  <p className="text-[10.5px] text-dev-subtext font-sans leading-snug">{ach.description}</p>
                </div>

                <div className="mt-2 pt-2 border-t border-dev-border/40 text-[10px]">
                  <span className={isUnlocked ? 'text-git-yellow font-semibold' : 'text-dev-subtext'}>
                    {isUnlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
