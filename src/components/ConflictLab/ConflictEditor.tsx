import React, { useState } from 'react';
import { Flame, CheckCircle2, ArrowRight, ShieldCheck, Edit3, SplitSquareVertical, Zap } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { CharacterAvatar } from '../Characters/CharacterAvatar';
import { TEAM_CHARACTERS } from '../../data/characters';

export const ConflictEditor: React.FC = () => {
  const { repoState, resolveConflict, executeCommand } = useGame();
  const conflict = repoState.conflictState;

  const [selectedChoice, setSelectedChoice] = useState<'current' | 'incoming' | 'both' | 'custom' | null>(null);
  const [customText, setCustomText] = useState('');

  if (!conflict || !conflict.active) {
    return (
      <div className="dev-panel p-8 bg-dev-panel border-dev-border text-center font-mono">
        <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-dev-heading">No Active Merge Conflicts</h3>
        <p className="text-xs text-dev-subtext mt-1 max-w-md mx-auto">
          Your working directory is clean! When two branches modify the same lines and you attempt to merge, Git will trigger an interactive conflict here for you to resolve.
        </p>
      </div>
    );
  }

  const handleApplyResolution = () => {
    if (!selectedChoice) return;
    resolveConflict(selectedChoice, customText);
  };

  const handleFinalizeMerge = () => {
    executeCommand(`git commit -m "Merge branch '${conflict.incomingBranch}' and resolve conflicts"`);
  };

  return (
    <div className="dev-panel p-5 bg-dev-panel border-dev-border shadow-panel space-y-4 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-dev-border">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-git-orange animate-pulse" />
          <h3 className="font-bold text-xs text-dev-heading uppercase tracking-wider">
            Merge Conflict Resolution Game
          </h3>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
            {conflict.filePath}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-dev-subtext">
          <span>Base: <b className="text-emerald-400">{conflict.baseBranch}</b></span>
          <span>⇄</span>
          <span>Incoming: <b className="text-blue-400">{conflict.incomingBranch}</b></span>
        </div>
      </div>

      {/* Character Dialogue Box: Arjun Explains */}
      <div className="p-3.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/30 text-dev-text flex items-start gap-3">
        <CharacterAvatar character={TEAM_CHARACTERS['arjun']} mood="warning" size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-dev-heading text-xs font-sans">Arjun Patel</span>
            <span className="text-[10px] text-amber-400 font-mono">· Merge Conflict Detected</span>
          </div>
          <p className="text-xs text-dev-text font-sans leading-relaxed">
            "Hey! We both edited <code>{conflict.filePath}</code>. I updated the title on my branch, while you changed it on {conflict.baseBranch}. Git stopped because it wants us to decide the final version. Pick which one to keep!"
          </p>
        </div>
      </div>

      {/* 3-Way Comparison Grid with Clash Spark */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* Animated Clash Lightning Spark in the center */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
          <div className="w-9 h-9 rounded-full bg-git-orange/20 border border-git-orange/60 flex items-center justify-center text-git-orange animate-clash-spark shadow-glow">
            <Zap className="w-5 h-5 fill-git-orange" />
          </div>
        </div>
        {/* Left: Your Version (HEAD) */}
        <div className={`p-3 rounded-lg border flex flex-col justify-between transition-all ${
          selectedChoice === 'current' ? 'border-emerald-500 bg-emerald-950/20' : 'border-dev-border bg-dev-surface/40'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-emerald-400">
                1. YOUR VERSION (HEAD / {conflict.baseBranch})
              </span>
              <span className="text-[10px] text-dev-subtext">Current Branch</span>
            </div>
            <pre className="p-3 rounded bg-[#090D12] text-dev-heading border border-dev-border/70 overflow-x-auto text-[11px]">
              {conflict.currentContent}
            </pre>
          </div>
          <button
            onClick={() => setSelectedChoice('current')}
            className={`mt-3 dev-button w-full ${
              selectedChoice === 'current' ? 'bg-emerald-600 text-white border-emerald-500' : ''
            }`}
          >
            Accept Your Version
          </button>
        </div>

        {/* Right: Teammate Version (Incoming) */}
        <div className={`p-3 rounded-lg border flex flex-col justify-between transition-all ${
          selectedChoice === 'incoming' ? 'border-blue-500 bg-blue-950/20' : 'border-dev-border bg-dev-surface/40'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-blue-400">
                2. TEAMMATE VERSION ({conflict.incomingBranch})
              </span>
              <span className="text-[10px] text-dev-subtext">Incoming Branch</span>
            </div>
            <pre className="p-3 rounded bg-[#090D12] text-dev-heading border border-dev-border/70 overflow-x-auto text-[11px]">
              {conflict.incomingContent}
            </pre>
          </div>
          <button
            onClick={() => setSelectedChoice('incoming')}
            className={`mt-3 dev-button w-full ${
              selectedChoice === 'incoming' ? 'bg-blue-600 text-white border-blue-500' : ''
            }`}
          >
            Accept Teammate Version
          </button>
        </div>
      </div>

      {/* Alternative: Keep Both or Custom */}
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          onClick={() => setSelectedChoice('both')}
          className={`dev-button ${selectedChoice === 'both' ? 'border-purple-500 bg-purple-950/40 text-purple-300' : ''}`}
        >
          <SplitSquareVertical className="w-3.5 h-3.5" /> Keep Both Versions
        </button>
        <button
          onClick={() => {
            setSelectedChoice('custom');
            setCustomText(`${conflict.currentContent} & ${conflict.incomingContent}`);
          }}
          className={`dev-button ${selectedChoice === 'custom' ? 'border-amber-500 bg-amber-950/40 text-amber-300' : ''}`}
        >
          <Edit3 className="w-3.5 h-3.5" /> Custom Manual Edit
        </button>
      </div>

      {/* Custom Edit Textarea */}
      {selectedChoice === 'custom' && (
        <div className="space-y-1 animate-stage-in">
          <label className="text-[10.5px] text-dev-subtext">Edit final resolved lines:</label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={3}
            className="w-full bg-[#0B0F14] border border-dev-border rounded p-2 text-dev-heading font-mono text-xs outline-none focus:border-git-blue"
          />
        </div>
      )}

      {/* Simulated Raw File with Markers */}
      <div className="rounded-lg border border-dev-border overflow-hidden">
        <div className="bg-[#12171F] px-3 py-1.5 border-b border-dev-border flex items-center justify-between text-[11px] text-dev-subtext">
          <span>Simulated File on Disk: {conflict.filePath}</span>
          <span className="text-rose-400">Conflict Markers Active</span>
        </div>
        <pre className="p-3 bg-[#0B0F14] text-[11px] overflow-x-auto text-dev-text leading-relaxed">
          <span className="text-rose-400">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD ({conflict.baseBranch})</span>{'\n'}
          <span className="text-emerald-300 font-bold">{conflict.currentContent}</span>{'\n'}
          <span className="text-amber-400">=======</span>{'\n'}
          <span className="text-blue-300 font-bold">{conflict.incomingContent}</span>{'\n'}
          <span className="text-rose-400">&gt;&gt;&gt;&gt;&gt;&gt;&gt; {conflict.incomingBranch}</span>
        </pre>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-dev-border">
        <div>
          {conflict.isResolved ? (
            <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4" /> Marked as Resolved &amp; Staged!
            </span>
          ) : (
            <span className="text-dev-subtext text-[11px]">
              {selectedChoice ? `Selected: ${selectedChoice}` : 'Choose a resolution above to continue'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!conflict.isResolved ? (
            <button
              onClick={handleApplyResolution}
              disabled={!selectedChoice}
              className="dev-button-primary"
            >
              <ShieldCheck className="w-4 h-4" /> Mark as Resolved (git add)
            </button>
          ) : (
            <button onClick={handleFinalizeMerge} className="dev-button-accent">
              <CheckCircle2 className="w-4 h-4" /> Complete Merge Commit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
