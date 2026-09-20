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
  Trophy,
  Award,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { MISSIONS } from '../data/missions';
import { REGIONS } from '../data/regions';
import { TEAM_CHARACTERS } from '../data/characters';
import { playClickSound } from '../utils/audio';

export const Home: React.FC = () => {
  const {
    currentMission,
    completedMissions,
    startMission,
    setActiveTab,
    xp,
    level,
    coins,
    streakDays,
    playerTitle,
    soundEnabled,
  } = useGame();

  const totalMissions = MISSIONS.length;
  const completedCount = completedMissions.length;
  const progressPercent = Math.round((completedCount / totalMissions) * 100);

  // Next incomplete mission or current
  const nextMission =
    MISSIONS.find((m) => !completedMissions.includes(m.id)) || currentMission;

  // XP calculations for next level
  const currentLevelBaseXP = (level - 1) * 250;
  const nextLevelXP = level * 250;
  const currentLevelProgress = xp - currentLevelBaseXP;
  const xpPercent = Math.min(100, Math.round((currentLevelProgress / 250) * 100));

  const handleStartQuest = (missionId: string) => {
    if (soundEnabled) playClickSound();
    startMission(missionId);
    setActiveTab('missions');
  };

  const handleNav = (tab: any) => {
    if (soundEnabled) playClickSound();
    setActiveTab(tab);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-mono text-xs animate-fadeIn pb-12">
      {/* Codédex RPG Hero Section */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#121929] via-[#101726] to-[#0A0E17] border-2 border-rpg-gold/40 shadow-pixelGold overflow-hidden">
        {/* Decorative Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-git-orange animate-ping" />
              <span className="font-pixel text-[10px] text-rpg-gold tracking-widest uppercase">
                CONTINUE YOUR ADVENTURE
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-git-orange/20 text-git-orange border border-git-orange/40 font-bold">
                {nextMission.badge}
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-pixel text-dev-heading tracking-wide">
              {nextMission.title}
            </h1>

            <p className="text-xs sm:text-sm text-dev-subtext font-sans leading-relaxed">
              {nextMission.objective}
            </p>

            {/* Quest Reward Pills */}
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-purple-950/40 border border-purple-500/40 text-purple-300 font-mono text-[11px] flex items-center gap-1 font-bold">
                <Sparkles className="w-3.5 h-3.5" /> +100 XP
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-yellow-950/40 border border-yellow-500/40 text-yellow-300 font-mono text-[11px] flex items-center gap-1 font-bold">
                🪙 +25 Coins
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-950/40 border border-blue-500/40 text-blue-300 font-mono text-[11px] flex items-center gap-1">
                📍 {nextMission.levelName}
              </span>
            </div>

            {/* Action Buttons with 3D tactile borders */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleStartQuest(nextMission.id)}
                className="px-5 py-3 rounded-xl bg-rpg-gold hover:bg-amber-400 text-black font-pixel text-xs tracking-wider font-bold border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all shadow-pixelGold flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>START QUEST</span>
              </button>

              <button
                onClick={() => handleNav('world-map')}
                className="px-4 py-3 rounded-xl bg-[#1a2336] hover:bg-[#202c44] text-dev-heading font-mono text-xs font-bold border-b-4 border-slate-800 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 border border-dev-border"
              >
                <Map className="w-4 h-4 text-rpg-gold" />
                <span>Overworld Map</span>
              </button>

              <button
                onClick={() => handleNav('practice-lab')}
                className="px-4 py-3 rounded-xl bg-[#1a2336] hover:bg-[#202c44] text-dev-heading font-mono text-xs font-bold border-b-4 border-slate-800 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 border border-dev-border"
              >
                <TerminalIcon className="w-4 h-4 text-dev-subtext" />
                <span>Terminal Sandbox</span>
              </button>
            </div>
          </div>

          {/* Right Card: Player RPG HUD */}
          <div className="p-5 rounded-xl bg-[#0c111c] border-2 border-dev-border min-w-[280px] space-y-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-300 font-pixel text-xs font-bold">
                  {level}
                </div>
                <div>
                  <div className="text-[10px] font-pixel text-purple-300">LEVEL {level}</div>
                  <div className="text-xs font-mono font-bold text-dev-heading truncate max-w-[130px]">
                    {playerTitle}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs font-mono text-rpg-streak font-bold justify-end">
                  <Flame className="w-3.5 h-3.5 text-git-orange animate-pulse" />
                  <span>{streakDays}d</span>
                </div>
                <div className="text-[10px] text-dev-subtext">STREAK</div>
              </div>
            </div>

            {/* XP progress bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-dev-subtext">Level Progress</span>
                <span className="text-rpg-xp font-bold">{currentLevelProgress}/250 XP</span>
              </div>
              <div className="w-full h-2.5 bg-dev-bg rounded-full overflow-hidden border border-dev-border">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-git-blue rounded-full transition-all duration-300"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>

            {/* Stats Pills */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-center font-mono">
              <div className="p-2 rounded-lg bg-black/40 border border-dev-border/60">
                <div className="text-xs font-pixel text-rpg-gold font-bold">🪙 {coins}</div>
                <div className="text-[9px] text-dev-subtext uppercase">Coins</div>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-dev-border/60">
                <div className="text-xs font-pixel text-emerald-400 font-bold">
                  {completedCount}/{totalMissions}
                </div>
                <div className="text-[9px] text-dev-subtext uppercase">Cleared</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 7 Realms of Git (Codédex Journey Carousel Preview) */}
      <div className="p-5 rounded-xl bg-dev-panel border border-dev-border space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dev-border">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-rpg-gold" />
            <h2 className="font-pixel text-xs text-dev-heading tracking-wide">
              THE 7 REALMS OF THE OVERWORLD
            </h2>
          </div>
          <button
            onClick={() => handleNav('world-map')}
            className="text-xs font-mono text-git-blue hover:underline flex items-center gap-1"
          >
            <span>Explore full map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {REGIONS.slice(0, 4).map((region) => {
            const isCompleted = region.missions.every((mId) => completedMissions.includes(mId));
            const isAvailable =
              region.number === 1 ||
              REGIONS[region.number - 2]?.missions.some((mId) => completedMissions.includes(mId));

            return (
              <div
                key={region.id}
                onClick={() => handleNav('world-map')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${
                  isCompleted
                    ? 'border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-500'
                    : isAvailable
                    ? 'border-git-blue/40 bg-blue-950/20 hover:border-git-blue'
                    : 'border-slate-800 bg-slate-950/40 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-2 font-mono">
                    <span className="font-pixel text-rpg-gold">ACT 0{region.number}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded border uppercase font-bold text-[9px] ${
                        isCompleted
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                          : isAvailable
                          ? 'bg-blue-950 text-blue-300 border-blue-500/40'
                          : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}
                    >
                      {isCompleted ? 'Cleared' : isAvailable ? 'Available' : 'Locked'}
                    </span>
                  </div>
                  <h3 className="font-pixel text-xs text-dev-heading font-bold mb-1">
                    {region.name}
                  </h3>
                  <p className="text-[11px] text-dev-subtext font-mono line-clamp-2">
                    {region.landmark}
                  </p>
                </div>

                <div className="pt-3 border-t border-dev-border/40 mt-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-rpg-xp font-bold">+{region.xpReward} XP</span>
                  <span className="text-dev-subtext">{region.artifact.icon} {region.artifact.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Quests Roadmap & Specialized Laboratories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Quests Roadmap */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-dev-panel border border-dev-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dev-border">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-git-blue" />
              <h3 className="font-pixel text-xs text-dev-heading tracking-wide">
                QUEST ROADMAP
              </h3>
            </div>
            <button
              onClick={() => handleNav('missions')}
              className="text-xs font-mono text-git-blue hover:underline flex items-center gap-1"
            >
              <span>View all quests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {MISSIONS.slice(0, 6).map((mission) => {
              const isCompleted = completedMissions.includes(mission.id);
              const isCurrent = mission.id === nextMission.id;

              return (
                <div
                  key={mission.id}
                  onClick={() => handleStartQuest(mission.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
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
                        <span className="text-[10px] uppercase font-bold text-dev-subtext font-mono">
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

                  <div className="shrink-0 text-[10px] font-mono">
                    {isCompleted ? (
                      <span className="text-git-green font-semibold">Done</span>
                    ) : isCurrent ? (
                      <span className="text-git-blue font-semibold">Current</span>
                    ) : (
                      <span className="text-dev-subtext">Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Specialized Labs & Companion Advice */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-dev-panel border border-dev-border space-y-3">
            <h3 className="font-pixel text-xs text-dev-heading tracking-wide pb-2 border-b border-dev-border">
              SPECIALIZED LABS
            </h3>

            {/* Branch Lab */}
            <div
              onClick={() => handleNav('branch-lab')}
              className="p-3 rounded-lg border border-dev-border bg-dev-surface/30 hover:bg-dev-surface/70 hover:border-git-blue/40 cursor-pointer transition-all space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-dev-heading flex items-center gap-1.5 text-xs font-sans">
                  <GitBranch className="w-3.5 h-3.5 text-git-blue" /> Branch Lab
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-dev-subtext" />
              </div>
              <p className="text-[11px] text-dev-subtext font-sans">
                Live interactive branch graph and fast-forward merges.
              </p>
            </div>

            {/* Conflict Lab */}
            <div
              onClick={() => handleNav('conflict-lab')}
              className="p-3 rounded-lg border border-dev-border bg-dev-surface/30 hover:bg-dev-surface/70 hover:border-git-orange/40 cursor-pointer transition-all space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-dev-heading flex items-center gap-1.5 text-xs font-sans">
                  <Flame className="w-3.5 h-3.5 text-git-orange" /> Conflict Lab
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-dev-subtext" />
              </div>
              <p className="text-[11px] text-dev-subtext font-sans">
                Interactive 3-way merge conflict resolution mini-game.
              </p>
            </div>

            {/* GitHub Lab */}
            <div
              onClick={() => handleNav('github-lab')}
              className="p-3 rounded-lg border border-dev-border bg-dev-surface/30 hover:bg-dev-surface/70 hover:border-git-purple/40 cursor-pointer transition-all space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-dev-heading flex items-center gap-1.5 text-xs font-sans">
                  <Cloud className="w-3.5 h-3.5 text-git-purple" /> GitHub Lab
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-dev-subtext" />
              </div>
              <p className="text-[11px] text-dev-subtext font-sans">
                Code, Pull Requests, Issues, and Actions CI/CD.
              </p>
            </div>
          </div>

          {/* Byte the Rubber Duck Companion Box */}
          <div className="p-4 rounded-xl bg-[#0c111c] border-2 border-rpg-gold/40 space-y-2.5 shadow-pixelGold">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦆</span>
              <div>
                <span className="font-pixel text-[10px] text-rpg-gold font-bold">
                  BYTE'S WISDOM
                </span>
                <p className="text-[10px] text-dev-subtext font-mono">
                  Your loyal rubber duck companion
                </p>
              </div>
            </div>
            <p className="text-xs text-dev-text font-sans italic leading-relaxed bg-black/40 p-2.5 rounded-lg border border-dev-border/60">
              "Never panic when you see conflict markers! The code between &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD and ======= is what you wrote; the code below is what your teammate wrote."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
