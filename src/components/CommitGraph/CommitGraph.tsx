import React, { useState } from 'react';
import { GitCommit, GitBranch, Calendar, User, ArrowLeft, X, FileDiff, CheckCircle2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { Commit } from '../../engine/types';

export const CommitGraph: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { repoState } = useGame();
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);

  const commits = repoState.commits.slice().reverse(); // Newest first

  const getBranchTagsForCommit = (hash: string) => {
    const tags: Array<{ name: string; isHead: boolean }> = [];
    for (const [branchName, branch] of Object.entries(repoState.branches)) {
      if (branch.commitHash === hash) {
        tags.push({
          name: branchName,
          isHead: repoState.currentBranch === branchName,
        });
      }
    }
    return tags;
  };

  return (
    <div className={`dev-panel p-4 bg-dev-panel border-dev-border shadow-panel flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-dev-border">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-git-yellow" />
          <h3 className="font-semibold text-xs text-dev-heading uppercase tracking-wider font-mono">
            Commit Graph (DAG)
          </h3>
          <span className="text-[10px] text-dev-subtext font-mono px-2 py-0.5 rounded bg-dev-surface border border-dev-border">
            {commits.length} snapshots
          </span>
        </div>
        <span className="text-[11px] text-dev-subtext font-mono">Click commit to inspect diff</span>
      </div>

      {commits.length === 0 ? (
        <div className="p-8 text-center text-xs text-dev-subtext font-mono">
          No commits in repository yet. Run <code className="text-emerald-400">git commit</code> to record history.
        </div>
      ) : (
        <div className="space-y-3 relative pl-4 font-mono text-xs overflow-y-auto max-h-[380px]">
          {/* Vertical connecting line */}
          <div className="absolute left-[26px] top-4 bottom-4 w-0.5 bg-dev-border/70 z-0" />

          {commits.map((commit, idx) => {
            const branchTags = getBranchTagsForCommit(commit.hash);
            const isSelected = selectedCommit?.hash === commit.hash;
            const isHead = branchTags.some((t) => t.isHead);

            return (
              <div
                key={commit.hash}
                onClick={() => setSelectedCommit(commit)}
                className={`relative z-10 flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'bg-dev-surface border-dev-highlight shadow-glow ring-1 ring-dev-highlight'
                    : isHead
                    ? 'bg-dev-surface/60 border-emerald-500/40 hover:bg-dev-surface'
                    : 'bg-dev-surface/30 border-dev-border/60 hover:bg-dev-surface/60 hover:border-dev-border'
                }`}
              >
                {/* Commit Dot */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border text-[10px] font-bold ${
                    isHead
                      ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-500/20'
                      : 'bg-dev-panel text-amber-400 border-amber-500/40'
                  }`}
                >
                  ●
                </div>

                {/* Commit Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="font-bold text-amber-400 text-xs">{commit.shortHash}</span>

                    {branchTags.map((tag) => (
                      <span
                        key={tag.name}
                        className={`text-[10px] px-1.5 py-0.2 rounded font-semibold border flex items-center gap-1 ${
                          tag.isHead
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                            : 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                        }`}
                      >
                        <GitBranch className="w-2.5 h-2.5" />
                        {tag.isHead ? `HEAD -> ${tag.name}` : tag.name}
                      </span>
                    ))}

                    <span className="text-[10.5px] text-dev-subtext ml-auto">
                      {new Date(commit.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="font-medium text-dev-heading text-xs truncate">{commit.message}</p>

                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-dev-subtext">
                    <span className="flex items-center gap-1 truncate">
                      <User className="w-3 h-3" /> {commit.author.split('<')[0]}
                    </span>
                    {commit.diffs && (
                      <span className="text-dev-subtext">
                        {commit.diffs.length} file{commit.diffs.length > 1 ? 's' : ''} modified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Commit Diff Drawer / Inspector Modal */}
      {selectedCommit && (
        <div className="mt-4 p-3.5 rounded-lg border border-dev-border bg-[#0B0F14] text-xs font-mono animate-stage-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-dev-border">
            <div className="flex items-center gap-2">
              <FileDiff className="w-4 h-4 text-dev-highlight" />
              <span className="font-bold text-dev-heading">Commit Inspector: {selectedCommit.shortHash}</span>
            </div>
            <button
              onClick={() => setSelectedCommit(null)}
              className="p-1 rounded text-dev-subtext hover:text-dev-heading hover:bg-dev-surface"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-[11px] text-dev-subtext">
            <div>
              <span className="text-dev-subtext/70">Full SHA:</span>{' '}
              <span className="text-amber-400 select-all">{selectedCommit.hash}</span>
            </div>
            <div>
              <span className="text-dev-subtext/70">Author:</span>{' '}
              <span className="text-dev-text">{selectedCommit.author}</span>
            </div>
            <div>
              <span className="text-dev-subtext/70">Message:</span>{' '}
              <span className="text-dev-heading font-semibold">"{selectedCommit.message}"</span>
            </div>
            <div>
              <span className="text-dev-subtext/70">Parent(s):</span>{' '}
              <span className="text-dev-text">
                {selectedCommit.parentHashes.length > 0
                  ? selectedCommit.parentHashes.map((p) => p.substring(0, 7)).join(', ')
                  : 'initial commit'}
              </span>
            </div>
          </div>

          {/* Diffs */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-dev-heading uppercase tracking-wide">
              Changed Files:
            </div>
            {selectedCommit.diffs && selectedCommit.diffs.length > 0 ? (
              selectedCommit.diffs.map((diff, i) => (
                <div key={i} className="rounded border border-dev-border/70 overflow-hidden">
                  <div className="bg-dev-surface/80 px-2 py-1 text-[11px] font-semibold text-dev-heading flex items-center justify-between">
                    <span>{diff.path}</span>
                    <span className="text-[10px] text-dev-subtext">
                      <span className="text-emerald-400">+{diff.linesAdded}</span> /{' '}
                      <span className="text-rose-400">-{diff.linesDeleted}</span>
                    </span>
                  </div>
                  <pre className="p-2 text-[10.5px] bg-[#090D12] text-dev-text overflow-x-auto whitespace-pre leading-snug">
                    {diff.diff.split('\n').map((line, lIdx) => {
                      let color = 'text-dev-text';
                      if (line.startsWith('+') && !line.startsWith('+++')) color = 'text-emerald-400 bg-emerald-950/20';
                      if (line.startsWith('-') && !line.startsWith('---')) color = 'text-rose-400 bg-rose-950/20';
                      if (line.startsWith('@@')) color = 'text-cyan-400';
                      return (
                        <div key={lIdx} className={color}>
                          {line}
                        </div>
                      );
                    })}
                  </pre>
                </div>
              ))
            ) : (
              <div className="text-[11px] text-dev-subtext italic">
                Files: {Object.keys(selectedCommit.tree).join(', ') || 'No file changes recorded.'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
