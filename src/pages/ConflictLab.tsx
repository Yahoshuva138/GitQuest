import React from 'react';
import { Flame, CheckCircle2, ShieldAlert, SplitSquareVertical } from 'lucide-react';
import { ConflictEditor } from '../components/ConflictLab/ConflictEditor';
import { Terminal } from '../components/Terminal/Terminal';
import { useGame } from '../context/GameContext';

export const ConflictLab: React.FC = () => {
  const { repoState, updateRepoState } = useGame();

  const handleSimulateSampleConflict = () => {
    const nextState = JSON.parse(JSON.stringify(repoState));
    nextState.conflictState = {
      active: true,
      filePath: 'index.html',
      baseBranch: 'main',
      incomingBranch: 'feature/header-update',
      currentContent: '<h1>GitQuest</h1>',
      incomingContent: '<h1>GitQuest Learning Lab</h1>',
      isResolved: false,
    };
    updateRepoState(nextState);
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto font-mono text-xs animate-stage-in">
      {/* Header */}
      <div className="dev-panel p-5 bg-dev-panel border-dev-border shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-git-orange mb-1">
            <Flame className="w-4 h-4" />
            <span className="text-[11px] uppercase font-bold tracking-wider">
              CONFLICT LABORATORY
            </span>
          </div>
          <h1 className="text-xl font-bold text-dev-heading font-sans">
            Merge Conflict Demystified
          </h1>
          <p className="text-xs text-dev-subtext font-sans mt-0.5">
            Conflicts are not errors — they are Git asking for human judgement when code overlaps.
          </p>
        </div>

        <button
          onClick={handleSimulateSampleConflict}
          className="dev-button text-xs py-1.5 px-3"
        >
          <Flame className="w-3.5 h-3.5 text-git-orange" />
          <span>Load Sample Conflict</span>
        </button>
      </div>

      {/* Playable Conflict Editor */}
      <ConflictEditor />

      {/* Terminal & Conflict Anatomy Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Conflict Markers Guide */}
        <div className="dev-panel p-4 bg-dev-panel border-dev-border space-y-3 font-sans">
          <h3 className="font-bold text-xs text-dev-heading uppercase tracking-wider font-mono pb-2 border-b border-dev-border">
            Anatomy of Conflict Markers
          </h3>

          <div className="p-3 rounded bg-[#090D12] border border-dev-border font-mono text-xs space-y-1.5">
            <div className="text-rose-400 font-bold">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</div>
            <div className="text-emerald-300 pl-4">The lines currently on your checked-out branch</div>
            <div className="text-amber-400 font-bold">=======</div>
            <div className="text-blue-300 pl-4">The conflicting lines from the incoming branch</div>
            <div className="text-rose-400 font-bold">&gt;&gt;&gt;&gt;&gt;&gt;&gt; incoming-branch</div>
          </div>

          <p className="text-xs text-dev-subtext leading-relaxed">
            <b>Rule:</b> To resolve a conflict in real life, you open the file in your code editor, pick the winning code, delete the marker lines (<code className="text-amber-400">&lt;&lt;&lt;</code>, <code className="text-amber-400">===</code>, <code className="text-amber-400">&gt;&gt;&gt;</code>), stage the file with <code className="text-emerald-400">git add</code>, and run <code className="text-blue-400">git commit</code>.
          </p>
        </div>

        {/* Right: Terminal */}
        <Terminal
          quickSuggestions={[
            'git status',
            'git add index.html',
            'git commit -m "Resolve merge conflict in index.html"',
            'git log --oneline',
          ]}
        />
      </div>
    </div>
  );
};
