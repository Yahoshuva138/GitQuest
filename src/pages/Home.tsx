import React from 'react';
import {
  Play,
  CheckCircle2,
  Lock,
  ArrowRight,
  Terminal as TerminalIcon,
  GitBranch,
  Flame,
  Cloud,
  Sparkles,
  Map,
  Compass,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { MISSIONS } from '../data/missions';
import { LEVELS } from '../data/levels';

export const Home: React.FC = () => {
  const {
    currentMission,
    completedMissions,
    startMission,
    setActiveTab,
  } = useGame();

  const totalMissions = MISSIONS.length;
  const completedCount = completedMissions.length;
  const progressPercent = Math.round((completedCount / totalMissions) * 100);

  // Find the next incomplete mission or current
  const nextMission =
    MISSIONS.find((m) => !completedMissions.includes(m.id)) || currentMission;

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-mono text-xs animate-stage-in">
      {/* Header Banner: WELCOME BACK, DEVELOPER */}
      <div className="dev-panel p-6 bg-gradient-to-br from-[#131923] to-[#0D1117] border-dev-border shadow-panel">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-git-orange">
              <span className="w-2 h-2 rounded-full bg-git-orange animate-ping" />
              <span className="text-[11px] uppercase font-bold tracking-wider">
                WELCOME BACK, DEVELOPER
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-dev-heading font-sans tracking-tight">
              {nextMission.badge} — {nextMission.title}
            </h1>

            <p className="text-sm text-dev-subtext font-sans max-w-xl leading-relaxed">
              {nextMission.objective}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => startMission(nextMission.id)}
                className="dev-button-primary text-xs px-4 py-2 font-bold shadow-glow"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>START MISSION</span>
              </button>

              <button
                onClick={() => setActiveTab('learning-map')}
                className="dev-button text-xs px-3.5 py-2"
              >
                <Map className="w-4 h-4 text-dev-subtext" />
                <span>View Learning Map</span>
              </button>

              <button
                onClick={() => setActiveTab('practice-lab')}
                className="dev-button text-xs px-3.5 py-2"
              >
                <TerminalIcon className="w-4 h-4 text-dev-subtext" />
                <span>Open Practice Sandbox</span>
              </button>
            </div>
          </div>

          {/* Current Skill Card */}
          <div className="p-4 rounded-lg bg-[#0B0F14] border border-dev-border min-w-[260px] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] uppercase text-dev-subtext font-bold tracking-wider">
                CURRENT SKILL
              </span>
              <span className="text-emerald-400 font-bold">{progressPercent}%</span>
            </div>

            <div className="font-sans">
              <div className="text-sm font-bold text-dev-heading">
                {nextMission.levelName}
              </div>
              <p className="text-[11px] text-dev-subtext mt-0.5">
                Level 0{nextMission.levelNumber} Progression
              </p>
            </div>

            {/* ASCII progress bar representation + HTML bar */}
            <div className="space-y-1">
              <div className="w-full h-2 bg-dev-surface rounded-full overflow-hidden border border-dev-border">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-dev-subtext/70 flex justify-between">
                <span>0%</span>
                <span>{completedCount} of {totalMissions} missions completed</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Missions & Quick Labs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Mission Path / Recent Missions */}
        <div className="lg:col-span-2 dev-panel p-5 bg-dev-panel border-dev-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dev-border">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-git-blue" />
              <h3 className="font-bold text-xs text-dev-heading uppercase tracking-wider">
                Missions Roadmap
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('learning-map')}
              className="text-[11px] text-git-blue hover:underline flex items-center gap-1"
            >
              <span>Explore full tree</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {MISSIONS.slice(0, 7).map((mission, idx) => {
              const isCompleted = completedMissions.includes(mission.id);
              const isCurrent = mission.id === nextMission.id;

              return (
                <div
                  key={mission.id}
                  onClick={() => startMission(mission.id)}
                  className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                    isCurrent
                      ? 'border-git-blue bg-git-blue/10 ring-1 ring-git-blue shadow-sm'
                      : isCompleted
                      ? 'border-dev-border bg-dev-surface/30 hover:bg-dev-surface/60'
                      : 'border-dev-border/50 bg-dev-surface/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-git-green" />
                      ) : isCurrent ? (
                        <span className="text-git-blue font-bold text-sm">→</span>
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-dev-subtext/60" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-dev-subtext">
                          {mission.badge}
                        </span>
                        <span className="font-bold text-dev-heading font-sans text-xs">
                          {mission.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-dev-subtext font-sans">
                        {mission.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-[10px] font-mono text-dev-subtext">
                    {isCompleted ? (
                      <span className="text-git-green font-semibold">Done</span>
                    ) : isCurrent ? (
                      <span className="text-git-blue font-semibold">Current</span>
                    ) : (
                      'Locked'
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Specialized Labs */}
        <div className="space-y-4">
          <div className="dev-panel p-4 bg-dev-panel border-dev-border space-y-3">
            <h3 className="font-bold text-xs text-dev-heading uppercase tracking-wider pb-2 border-b border-dev-border">
              Interactive Laboratories
            </h3>

            {/* Branch Lab */}
            <div
              onClick={() => setActiveTab('branch-lab')}
              className="p-3 rounded-lg border border-dev-border bg-dev-surface/30 hover:bg-dev-surface/70 hover:border-git-blue/40 cursor-pointer transition-all space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-dev-heading flex items-center gap-1.5 text-xs font-sans">
                  <GitBranch className="w-3.5 h-3.5 text-git-blue" /> Branch Lab
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-dev-subtext" />
              </div>
              <p className="text-[11px] text-dev-subtext font-sans">
                Create, switch, and merge branches on a live interactive graph.
              </p>
            </div>

            {/* Conflict Lab */}
            <div
              onClick={() => setActiveTab('conflict-lab')}
              className="p-3 rounded-lg border border-dev-border bg-dev-surface/30 hover:bg-dev-surface/70 hover:border-git-orange/40 cursor-pointer transition-all space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-dev-heading flex items-center gap-1.5 text-xs font-sans">
                  <Flame className="w-3.5 h-3.5 text-git-orange" /> Conflict Lab
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-dev-subtext" />
              </div>
              <p className="text-[11px] text-dev-subtext font-sans">
                Play the 3-way merge conflict resolution game.
              </p>
            </div>

            {/* GitHub Lab */}
            <div
              onClick={() => setActiveTab('github-lab')}
              className="p-3 rounded-lg border border-dev-border bg-dev-surface/30 hover:bg-dev-surface/70 hover:border-git-purple/40 cursor-pointer transition-all space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-dev-heading flex items-center gap-1.5 text-xs font-sans">
                  <Cloud className="w-3.5 h-3.5 text-git-purple" /> GitHub Lab
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-dev-subtext" />
              </div>
              <p className="text-[11px] text-dev-subtext font-sans">
                Simulated GitHub repo: Code, Issues, Pull Requests, and Actions CI/CD.
              </p>
            </div>
          </div>

          {/* Philosophy / Mental Model Quote Box */}
          <div className="p-4 rounded-lg bg-[#0B0F14] border border-dev-border space-y-2">
            <div className="text-[10.5px] uppercase font-bold text-git-yellow">
              THE GITQUEST PHILOSOPHY
            </div>
            <p className="text-xs text-dev-text font-sans italic leading-relaxed">
              "Don't teach Git by showing a list of commands. Teach Git by making the learner need the command."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
