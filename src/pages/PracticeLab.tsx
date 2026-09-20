import React, { useState } from 'react';
import {
  Terminal as TerminalIcon,
  Workflow,
  FolderTree,
  GitCommit,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Terminal } from '../components/Terminal/Terminal';
import { PipelineVisualizer } from '../components/GitFlow/PipelineVisualizer';
import { FileTree } from '../components/FileTree/FileTree';
import { CommitGraph } from '../components/CommitGraph/CommitGraph';
import { ExplanationCard } from '../components/Explanation/ExplanationCard';

export const PracticeLab: React.FC = () => {
  const { resetCurrentMission } = useGame();
  const [activeView, setActiveView] = useState<'pipeline' | 'files' | 'commits'>('pipeline');

  const cheatSheet = [
    { cmd: 'git status', desc: 'Inspect working directory & staging area state' },
    { cmd: 'git add <file>', desc: 'Stage specific file for next commit' },
    { cmd: 'git add .', desc: 'Stage all modified/untracked files' },
    { cmd: 'git commit -m "<msg>"', desc: 'Create permanent commit snapshot' },
    { cmd: 'git log --oneline', desc: 'View compact history of commits' },
    { cmd: 'git diff', desc: 'View line changes in working directory' },
    { cmd: 'git branch <name>', desc: 'Create a new feature branch' },
    { cmd: 'git switch <name>', desc: 'Switch active HEAD to another branch' },
    { cmd: 'git merge <name>', desc: 'Merge another branch into current' },
    { cmd: 'git stash', desc: 'Save uncommitted work temporarily' },
    { cmd: 'git stash pop', desc: 'Restore stashed changes' },
    { cmd: 'git restore --staged <file>', desc: 'Unstage file while preserving edits' },
  ];

  return (
    <div className="space-y-4 max-w-6xl mx-auto font-mono text-xs animate-stage-in">
      {/* Header */}
      <div className="dev-panel p-5 bg-dev-panel border-dev-border shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-git-blue mb-1">
            <TerminalIcon className="w-4 h-4" />
            <span className="text-[11px] uppercase font-bold tracking-wider">
              PRACTICE SANDBOX
            </span>
          </div>
          <h1 className="text-xl font-bold text-dev-heading font-sans">
            Free-Form Git Laboratory
          </h1>
          <p className="text-xs text-dev-subtext font-sans mt-0.5">
            Test any Git command safely. Watch how your actions mutate the live working tree, index, and commit DAG.
          </p>
        </div>

        <button
          onClick={resetCurrentMission}
          className="dev-button text-xs py-1.5 px-3"
          title="Reset sandbox state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sandbox</span>
        </button>
      </div>

      {/* Main Grid: Visualizers + Terminal + Cheat Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Visualizer & Terminal */}
        <div className="lg:col-span-2 space-y-4">
          {/* View Mode Buttons */}
          <div className="flex items-center gap-1 bg-dev-panel border border-dev-border rounded p-0.5 w-fit">
            <button
              onClick={() => setActiveView('pipeline')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
                activeView === 'pipeline'
                  ? 'bg-dev-surface text-dev-heading font-semibold shadow-sm border border-dev-border'
                  : 'text-dev-subtext hover:text-dev-text'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Pipeline</span>
            </button>

            <button
              onClick={() => setActiveView('files')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
                activeView === 'files'
                  ? 'bg-dev-surface text-dev-heading font-semibold shadow-sm border border-dev-border'
                  : 'text-dev-subtext hover:text-dev-text'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>Files</span>
            </button>

            <button
              onClick={() => setActiveView('commits')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
                activeView === 'commits'
                  ? 'bg-dev-surface text-dev-heading font-semibold shadow-sm border border-dev-border'
                  : 'text-dev-subtext hover:text-dev-text'
              }`}
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Graph</span>
            </button>
          </div>

          {activeView === 'pipeline' && <PipelineVisualizer />}
          {activeView === 'files' && <FileTree />}
          {activeView === 'commits' && <CommitGraph />}

          <ExplanationCard />

          <Terminal
            quickSuggestions={[
              'git status',
              'git add .',
              'git commit -m "My update"',
              'git log --oneline',
              'git branch feature/test',
              'git switch feature/test',
            ]}
          />
        </div>

        {/* Right Col: Interactive Command Reference */}
        <div className="dev-panel p-4 bg-dev-panel border-dev-border space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-dev-border">
            <BookOpen className="w-4 h-4 text-git-yellow" />
            <h3 className="font-bold text-xs text-dev-heading uppercase tracking-wider">
              Command Cheatsheet
            </h3>
          </div>

          <p className="text-[11px] text-dev-subtext font-sans leading-relaxed">
            Click any command below to stage it into your terminal prompt:
          </p>

          <div className="space-y-2 overflow-y-auto max-h-[520px]">
            {cheatSheet.map((item, idx) => (
              <div
                key={idx}
                className="p-2 rounded bg-dev-surface/40 border border-dev-border/70 hover:border-git-blue/50 transition-all cursor-pointer group"
                onClick={() => {
                  const input = document.querySelector('input');
                  if (input) {
                    input.value = item.cmd;
                    input.focus();
                  }
                }}
              >
                <div className="text-git-blue font-bold group-hover:text-git-orange transition-colors">
                  {item.cmd}
                </div>
                <div className="text-[10.5px] text-dev-subtext font-sans mt-0.5">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
