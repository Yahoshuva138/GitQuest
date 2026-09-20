import React from 'react';
import { GitBranch, GitMerge, Info, Sparkles } from 'lucide-react';
import { BranchVisualizer } from '../components/BranchVisualizer/BranchVisualizer';
import { CommitGraph } from '../components/CommitGraph/CommitGraph';
import { Terminal } from '../components/Terminal/Terminal';

export const BranchLab: React.FC = () => {
  return (
    <div className="space-y-4 max-w-6xl mx-auto font-mono text-xs animate-stage-in">
      {/* Header */}
      <div className="dev-panel p-5 bg-dev-panel border-dev-border shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-git-blue mb-1">
            <GitBranch className="w-4 h-4" />
            <span className="text-[11px] uppercase font-bold tracking-wider">
              BRANCH LABORATORY
            </span>
          </div>
          <h1 className="text-xl font-bold text-dev-heading font-sans">
            Parallel Development &amp; Merging
          </h1>
          <p className="text-xs text-dev-subtext font-sans mt-0.5">
            Branches let you experiment freely without affecting production. Merge back when ready.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-dev-subtext">
          <span className="px-2 py-1 rounded bg-dev-surface border border-dev-border">
            Fast-Forward &amp; 3-Way Merges Supported
          </span>
        </div>
      </div>

      {/* Interactive Branch Visualizer */}
      <BranchVisualizer />

      {/* Grid: Commit Graph & Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CommitGraph />
        <Terminal
          quickSuggestions={[
            'git branch',
            'git branch feature/cart',
            'git switch feature/cart',
            'git commit -m "Add shopping cart"',
            'git switch main',
            'git merge feature/cart',
          ]}
        />
      </div>
    </div>
  );
};
