import React, { useState } from 'react';
import {
  Compass,
  GitCommit,
  GitBranch,
  Flame,
  Cloud,
  GitPullRequest,
  Cpu,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  ChevronRight,
  Award,
  MapPin,
  HelpCircle,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { REGIONS, Region } from '../../data/regions';
import { MISSIONS } from '../../data/missions';
import { playClickSound } from '../../utils/audio';

export const OverworldMap: React.FC = () => {
  const {
    completedMissions,
    startMission,
    setActiveTab,
    soundEnabled,
  } = useGame();

  const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]);

  const getRegionStatus = (region: Region): 'completed' | 'available' | 'locked' => {
    // Check if all missions in region are completed
    const allDone = region.missions.every((mId) => completedMissions.includes(mId));
    if (allDone) return 'completed';

    // Region 1 is always available
    if (region.number === 1) return 'available';

    // Previous region must have at least 1 completed mission to unlock
    const prevRegion = REGIONS.find((r) => r.number === region.number - 1);
    if (prevRegion) {
      const prevDone = prevRegion.missions.some((mId) => completedMissions.includes(mId));
      if (prevDone) return 'available';
    }

    return 'locked';
  };

  const getRegionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return Compass;
      case 'GitCommit':
        return GitCommit;
      case 'GitBranch':
        return GitBranch;
      case 'Flame':
        return Flame;
      case 'Cloud':
        return Cloud;
      case 'GitPullRequest':
        return GitPullRequest;
      case 'Cpu':
        return Cpu;
      default:
        return Compass;
    }
  };

  const handleSelectRegion = (region: Region) => {
    if (soundEnabled) playClickSound();
    setSelectedRegion(region);
  };

  const handleStartQuest = (missionId: string) => {
    if (soundEnabled) playClickSound();
    startMission(missionId);
    setActiveTab('missions');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-r from-[#101726] via-[#141c30] to-[#0d121f] border-2 border-rpg-gold/40 shadow-pixelGold overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🗺️</span>
              <span className="font-pixel text-xs text-rpg-gold tracking-widest uppercase">
                Codédex Overworld
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-pixel text-dev-heading tracking-wide">
              THE 7 REALMS OF GIT
            </h1>
            <p className="text-sm text-dev-subtext font-mono mt-1 max-w-2xl">
              Journey from the local shores of <span className="text-git-blue font-bold">The Origin Coast</span> all the way to the automated clouds of the <span className="text-cyan-400 font-bold">Automaton Tower</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/40 px-4 py-2.5 rounded-xl border border-dev-border">
            <div className="text-center">
              <div className="font-pixel text-base text-rpg-xp font-bold">
                {completedMissions.length}/15
              </div>
              <div className="text-[10px] font-mono text-dev-subtext uppercase">
                Missions Cleared
              </div>
            </div>
            <div className="h-8 w-[1px] bg-dev-border/70" />
            <div className="text-center">
              <div className="font-pixel text-base text-rpg-gold font-bold">
                {REGIONS.filter((r) => getRegionStatus(r) === 'completed').length}/7
              </div>
              <div className="text-[10px] font-mono text-dev-subtext uppercase">
                Realms Conquered
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
      </div>

      {/* Main Grid: Interactive Map Path (Left) & Region Details Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Overworld Journey Path (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-[#0c111c] border-2 border-dev-border shadow-inner">
            <h2 className="text-xs font-mono text-dev-subtext uppercase tracking-wider mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-rpg-gold" />
              <span>World Progression Route</span>
            </h2>

            <div className="relative space-y-4">
              {REGIONS.map((region, index) => {
                const status = getRegionStatus(region);
                const isSelected = selectedRegion.id === region.id;
                const IconComponent = getRegionIcon(region.icon);
                const isLast = index === REGIONS.length - 1;

                return (
                  <div key={region.id} className="relative">
                    {/* Connecting line to next region */}
                    {!isLast && (
                      <div
                        className={`absolute left-6 top-12 bottom-[-16px] w-0.5 z-0 ${
                          status === 'completed'
                            ? 'bg-emerald-500/60'
                            : status === 'available'
                            ? 'bg-git-blue/50 border-dashed border-l border-git-blue/50'
                            : 'bg-slate-800'
                        }`}
                      />
                    )}

                    {/* Region Card */}
                    <button
                      onClick={() => handleSelectRegion(region)}
                      className={`relative z-10 w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-4 group ${
                        isSelected
                          ? 'border-rpg-gold bg-[#151c2e] shadow-pixelGold scale-[1.02]'
                          : status === 'completed'
                          ? 'border-emerald-500/40 bg-[#0e1722] hover:border-emerald-500/70'
                          : status === 'available'
                          ? 'border-git-blue/40 bg-[#0e1628] hover:border-git-blue/70'
                          : 'border-slate-800/80 bg-slate-950/40 opacity-60 hover:opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Region Number / Status Icon */}
                        <div
                          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-inner ${
                            status === 'completed'
                              ? 'border-emerald-500 bg-emerald-950/50 text-emerald-400'
                              : status === 'available'
                              ? 'border-git-blue bg-blue-950/50 text-git-blue'
                              : 'border-slate-700 bg-slate-900 text-slate-500'
                          }`}
                        >
                          {status === 'completed' ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : status === 'locked' ? (
                            <Lock className="w-5 h-5" />
                          ) : (
                            <IconComponent className="w-6 h-6" />
                          )}
                        </div>

                        {/* Region Name & Codename */}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-pixel text-[10px] text-rpg-gold">
                              ACT 0{region.number}
                            </span>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.2 rounded border uppercase font-bold ${
                                status === 'completed'
                                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                                  : status === 'available'
                                  ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                                  : 'bg-slate-900 text-slate-500 border-slate-700'
                              }`}
                            >
                              {status}
                            </span>
                          </div>
                          <h3 className="font-pixel text-xs sm:text-sm text-dev-heading font-bold mt-0.5">
                            {region.name}
                          </h3>
                          <p className="text-[11px] font-mono text-dev-subtext line-clamp-1">
                            {region.landmark}
                          </p>
                        </div>
                      </div>

                      {/* Right: XP and arrow */}
                      <div className="text-right font-mono shrink-0">
                        <span className="text-xs font-pixel text-rpg-xp font-bold block">
                          +{region.xpReward} XP
                        </span>
                        <span className="text-[10px] text-dev-subtext">
                          {region.missions.length} Quests
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Region Dossier (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 p-5 sm:p-6 rounded-2xl bg-[#0e1422] border-2 border-dev-border shadow-xl space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-pixel text-rpg-gold uppercase tracking-wider">
                  REALM DOSSIER • ACT 0{selectedRegion.number}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-dev-surface border border-dev-border text-dev-subtext">
                  {selectedRegion.codename}
                </span>
              </div>
              <h2 className="font-pixel text-base sm:text-lg text-dev-heading font-bold">
                {selectedRegion.name}
              </h2>
              <p className="text-xs font-mono text-git-blue mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedRegion.landmark}</span>
              </p>
            </div>

            {/* Description & Lore */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-dev-border/70 space-y-2 text-xs">
              <p className="text-dev-text leading-relaxed">
                {selectedRegion.description}
              </p>
              <p className="text-dev-subtext italic border-t border-dev-border/40 pt-2 font-mono">
                "{selectedRegion.lore}"
              </p>
            </div>

            {/* Collectible Artifact */}
            <div className="p-3.5 rounded-xl bg-rpg-gold/5 border border-rpg-gold/30 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rpg-gold/10 border border-rpg-gold/50 flex items-center justify-center text-2xl shrink-0">
                {selectedRegion.artifact.icon}
              </div>
              <div>
                <div className="text-[10px] font-mono text-rpg-gold uppercase font-bold">
                  Realm Artifact
                </div>
                <div className="font-pixel text-xs text-dev-heading font-bold">
                  {selectedRegion.artifact.name}
                </div>
                <div className="text-[11px] text-dev-subtext font-mono mt-0.5">
                  {selectedRegion.artifact.description}
                </div>
              </div>
            </div>

            {/* Missions in this Region */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-dev-subtext uppercase tracking-wider font-bold">
                Quests in this Realm ({selectedRegion.missions.length})
              </div>
              <div className="space-y-1.5">
                {selectedRegion.missions.map((missionId) => {
                  const mission = MISSIONS.find((m) => m.id === missionId);
                  const isDone = completedMissions.includes(missionId);

                  if (!mission) return null;

                  return (
                    <div
                      key={missionId}
                      className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 text-xs font-mono ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-dev-surface/40 border-dev-border text-dev-text'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-dev-subtext/40 shrink-0" />
                        )}
                        <span className="font-medium line-clamp-1">{mission.title}</span>
                      </div>

                      <button
                        onClick={() => handleStartQuest(missionId)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors flex items-center gap-1 shrink-0 ${
                          isDone
                            ? 'bg-dev-surface hover:bg-dev-surface/80 text-dev-subtext'
                            : 'bg-git-blue hover:bg-git-blue/80 text-white shadow-sm'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{isDone ? 'Replay' : 'Start'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Button: Enter First Incomplete Quest */}
            <button
              onClick={() => {
                const nextMission =
                  selectedRegion.missions.find((mId) => !completedMissions.includes(mId)) ||
                  selectedRegion.missions[0];
                handleStartQuest(nextMission);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rpg-gold via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-pixel text-xs tracking-wider font-bold shadow-pixelGold transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>EXPLORE {selectedRegion.codename}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
