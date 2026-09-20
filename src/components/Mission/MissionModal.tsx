import React from 'react';
import { Trophy, CheckCircle2, ArrowRight, RotateCcw, Map } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { MISSIONS } from '../../data/missions';

export const MissionModal: React.FC = () => {
  const {
    isMissionCompleteModalOpen,
    currentMission,
    closeMissionCompleteModal,
    goToNextMission,
    resetCurrentMission,
    setActiveTab,
  } = useGame();

  if (!isMissionCompleteModalOpen) return null;

  const nextMission = currentMission.nextMissionId
    ? MISSIONS.find((m) => m.id === currentMission.nextMissionId)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-stage-in">
      <div className="dev-panel w-full max-w-md bg-[#121720] border-emerald-500/50 shadow-2xl p-6 space-y-5 font-mono">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
            <Trophy className="w-7 h-7" />
          </div>
          <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
            {currentMission.badge} COMPLETE!
          </div>
          <h2 className="text-lg font-bold text-dev-heading font-sans">
            {currentMission.title}
          </h2>
          <p className="text-xs text-dev-subtext font-sans">
            {currentMission.subtitle}
          </p>
        </div>

        {/* Takeaways */}
        <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-dev-border space-y-2">
          <div className="text-[11px] font-bold text-dev-heading uppercase tracking-wide">
            Key Concepts Mastered:
          </div>
          <div className="space-y-1.5 font-sans text-xs">
            {currentMission.takeaways.map((takeaway, i) => (
              <div key={i} className="flex items-start gap-2 text-dev-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Mission Preview */}
        {nextMission ? (
          <div className="p-3 rounded bg-dev-surface/50 border border-dev-border text-xs font-sans">
            <div className="text-[10px] uppercase font-mono text-dev-subtext">Up Next:</div>
            <div className="font-bold text-dev-heading mt-0.5">
              {nextMission.badge}: {nextMission.title}
            </div>
            <p className="text-xs text-dev-subtext mt-0.5">{nextMission.subtitle}</p>
          </div>
        ) : (
          <div className="p-3 rounded bg-dev-surface/50 border border-dev-border text-xs text-center font-sans text-emerald-300">
            🎉 You have completed all missions in this tier! Explore the sandbox or learning map.
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
          <button
            onClick={() => {
              closeMissionCompleteModal();
              setActiveTab('learning-map');
            }}
            className="dev-button w-full sm:w-auto"
          >
            <Map className="w-3.5 h-3.5" /> Map
          </button>

          <button
            onClick={() => {
              closeMissionCompleteModal();
              resetCurrentMission();
            }}
            className="dev-button w-full sm:w-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Replay
          </button>

          <button
            onClick={goToNextMission}
            className="dev-button-primary w-full flex-1 py-2"
          >
            <span>Continue Next Mission</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
