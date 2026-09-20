import React, { useState } from 'react';
import { GitBranch, GitMerge, Plus, ArrowRightLeft, Trash2, CheckCircle2, Play } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const BranchVisualizer: React.FC = () => {
  const { repoState, executeCommand } = useGame();
  const [newBranchName, setNewBranchName] = useState('');
  const [commitMessage, setCommitMessage] = useState('Add new feature component');
  const [mergeTarget, setMergeTarget] = useState('');

  const branches = Object.keys(repoState.branches);
  const currentBranch = repoState.currentBranch;

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchName.trim()) return;
    executeCommand(`git branch ${newBranchName.trim()}`);
    setNewBranchName('');
  };

  const handleSwitchBranch = (branch: string) => {
    executeCommand(`git switch ${branch}`);
  };

  const handleQuickCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitMessage.trim()) return;
    // Stage and commit
    executeCommand(`git add .`);
    executeCommand(`git commit -m "${commitMessage.trim()}"`);
    setCommitMessage('Update on ' + currentBranch);
  };

  const handleMerge = () => {
    if (!mergeTarget) return;
    executeCommand(`git merge ${mergeTarget}`);
    setMergeTarget('');
  };

  const handleDeleteBranch = (branch: string) => {
    executeCommand(`git branch -d ${branch}`);
  };

  return (
    <div className="dev-panel p-4 bg-dev-panel border-dev-border shadow-panel space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-dev-border">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-git-blue" />
          <h3 className="font-semibold text-xs text-dev-heading uppercase tracking-wider">
            Branch Sandbox &amp; Graph Visualizer
          </h3>
        </div>
        <span className="text-[11px] text-dev-subtext">
          Active HEAD: <span className="text-emerald-400 font-bold">{currentBranch}</span>
        </span>
      </div>

      {/* Dynamic Visual SVG Branch Graph */}
      <div className="p-4 rounded-lg bg-[#0B0F14] border border-dev-border overflow-x-auto min-h-[140px] flex items-center justify-center">
        <div className="flex items-center gap-6 py-2 min-w-[340px]">
          {/* Main line */}
          <div className="flex flex-col gap-4 w-full">
            {branches.map((bName) => {
              const isCurrent = bName === currentBranch;
              const branchCommits = repoState.commits.filter((c) => c.branch === bName);

              return (
                <div key={bName} className="flex items-center gap-3">
                  <div
                    className={`w-28 shrink-0 px-2 py-1 rounded text-[11px] font-bold border flex items-center justify-between ${
                      isCurrent
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-sm'
                        : 'bg-dev-surface text-dev-text border-dev-border'
                    }`}
                  >
                    <span className="truncate">{bName}</span>
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  </div>

                  {/* Connected Commits Nodes */}
                  <div className="flex items-center gap-2 flex-1 overflow-x-auto">
                    {branchCommits.length === 0 ? (
                      <div className="flex items-center gap-1.5 text-dev-subtext/60 italic text-[10.5px]">
                        <span>●</span> (branched from main)
                      </div>
                    ) : (
                      branchCommits.map((c, idx) => (
                        <React.Fragment key={c.hash}>
                          {idx > 0 && <div className="w-4 h-0.5 bg-dev-border shrink-0" />}
                          <div
                            className={`px-2 py-1 rounded border text-[10.5px] shrink-0 font-mono ${
                              c.hash === repoState.branches[bName]?.commitHash
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                                : 'bg-dev-surface text-dev-text border-dev-border'
                            }`}
                            title={c.message}
                          >
                            ● {c.shortHash}
                          </div>
                        </React.Fragment>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1. Create New Branch */}
        <div className="p-3 rounded bg-dev-surface/50 border border-dev-border flex flex-col justify-between">
          <div className="mb-2">
            <span className="font-bold text-dev-heading text-[11px] uppercase tracking-wide">
              Create Branch
            </span>
            <p className="text-[10px] text-dev-subtext mt-0.5">
              Spins off a new pointer from current HEAD.
            </p>
          </div>
          <form onSubmit={handleCreateBranch} className="flex gap-1.5">
            <input
              type="text"
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
              placeholder="feature/xyz"
              className="flex-1 bg-[#0D1117] border border-dev-border rounded px-2 py-1 text-xs text-dev-heading outline-none focus:border-git-blue"
            />
            <button type="submit" className="dev-button-accent shrink-0">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 2. Switch Branch */}
        <div className="p-3 rounded bg-dev-surface/50 border border-dev-border flex flex-col justify-between">
          <div className="mb-2">
            <span className="font-bold text-dev-heading text-[11px] uppercase tracking-wide">
              Switch Branch
            </span>
            <p className="text-[10px] text-dev-subtext mt-0.5">
              Moves HEAD and updates working files.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => handleSwitchBranch(b)}
                disabled={b === currentBranch}
                className={`px-2 py-1 rounded text-xs border transition-all ${
                  b === currentBranch
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                    : 'bg-dev-panel hover:bg-dev-border text-dev-text border-dev-border'
                }`}
              >
                {b === currentBranch ? `✓ ${b}` : b}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Merge Branch */}
        <div className="p-3 rounded bg-dev-surface/50 border border-dev-border flex flex-col justify-between">
          <div className="mb-2">
            <span className="font-bold text-dev-heading text-[11px] uppercase tracking-wide">
              Merge into {currentBranch}
            </span>
            <p className="text-[10px] text-dev-subtext mt-0.5">
              Bring another branch into {currentBranch}.
            </p>
          </div>
          <div className="flex gap-1.5">
            <select
              value={mergeTarget}
              onChange={(e) => setMergeTarget(e.target.value)}
              className="flex-1 bg-[#0D1117] border border-dev-border rounded px-2 py-1 text-xs text-dev-heading outline-none"
            >
              <option value="">Select source...</option>
              {branches
                .filter((b) => b !== currentBranch)
                .map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
            </select>
            <button
              onClick={handleMerge}
              disabled={!mergeTarget}
              className="dev-button-primary shrink-0"
            >
              <GitMerge className="w-3.5 h-3.5" /> Merge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
