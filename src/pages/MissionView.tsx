import React, { useState } from 'react';
import {
  Target,
  BookOpen,
  Brain,
  Gamepad2,
  Lightbulb,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FolderTree,
  GitCommit,
  Workflow,
  ArrowRight,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { PipelineVisualizer } from '../components/GitFlow/PipelineVisualizer';
import { Terminal } from '../components/Terminal/Terminal';
import { CommitGraph } from '../components/CommitGraph/CommitGraph';
import { FileTree } from '../components/FileTree/FileTree';
import { ExplanationCard } from '../components/Explanation/ExplanationCard';
import { TeamCompanion } from '../components/Characters/TeamCompanion';

type ViewMode = 'pipeline' | 'commits' | 'files';

export const MissionView: React.FC = () => {
  const {
    currentMission,
    currentStepIndex,
    hintsRevealed,
    revealNextHint,
    resetCurrentMission,
  } = useGame();

  const [activeView, setActiveView] = useState<ViewMode>('pipeline');

  const currentStep = currentMission.steps[currentStepIndex] || currentMission.steps[0];
  const totalSteps = currentMission.steps.length;

  return (
    <div className="space-y-4 max-w-6xl mx-auto font-mono text-xs animate-stage-in">
      {/* Team Companion / Peer Developer Dialogue */}
      <TeamCompanion />

      {/* Mission Briefing Card */}
      <div className="dev-panel p-5 bg-dev-panel border-dev-border shadow-panel space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-dev-border">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-git-orange/15 text-git-orange border border-git-orange/40">
              {currentMission.badge}
            </span>
            <h1 className="text-base font-bold text-dev-heading font-sans">
              {currentMission.title}
            </h1>
            <span className="text-dev-subtext hidden md:inline">·</span>
            <span className="text-dev-subtext text-xs font-sans hidden md:inline">
              {currentMission.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-dev-subtext">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
            <button
              onClick={resetCurrentMission}
              className="dev-button text-[11px] py-1 px-2.5 text-dev-subtext hover:text-dev-heading"
              title="Reset mission state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Mission Situation & Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
          {/* 1. Situation */}
          <div className="p-3 rounded-lg bg-dev-surface/40 border border-dev-border space-y-1.5">
            <div className="flex items-center gap-1.5 text-git-blue font-bold text-xs uppercase tracking-wide font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Situation</span>
            </div>
            <p className="text-xs text-dev-text leading-relaxed">
              {currentMission.situation}
            </p>
          </div>

          {/* 2. What You Know */}
          <div className="p-3 rounded-lg bg-dev-surface/40 border border-dev-border space-y-1.5">
            <div className="flex items-center gap-1.5 text-git-yellow font-bold text-xs uppercase tracking-wide font-mono">
              <Brain className="w-3.5 h-3.5" />
              <span>What You Know</span>
            </div>
            <ul className="text-xs text-dev-text space-y-1 list-disc list-inside leading-relaxed">
              {currentMission.whatYouKnow.map((item, idx) => (
                <li key={idx} className="text-dev-subtext">
                  <span className="text-dev-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Your Task */}
          <div className="p-3 rounded-lg bg-git-blue/10 border border-git-blue/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-git-blue font-bold text-xs uppercase tracking-wide font-mono">
              <Target className="w-3.5 h-3.5" />
              <span>Your Current Objective</span>
            </div>
            <div className="text-xs font-semibold text-dev-heading leading-relaxed">
              {currentStep ? currentStep.title : currentMission.objective}
            </div>
            <p className="text-[11.5px] text-dev-text leading-snug">
              {currentStep?.taskHint || currentMission.yourTask}
            </p>
          </div>
        </div>

        {/* Hints Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-dev-border/60">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-git-yellow shrink-0" />
            {hintsRevealed > 0 ? (
              <span className="text-xs text-amber-200 font-sans">
                {currentMission.hints[hintsRevealed - 1]}
              </span>
            ) : (
              <span className="text-xs text-dev-subtext font-sans">
                Stuck on what command to run? Hints are available.
              </span>
            )}
          </div>

          {hintsRevealed < currentMission.hints.length && (
            <button
              onClick={revealNextHint}
              className="dev-button text-[11px] py-1 px-2.5 text-amber-300 border-amber-500/30 hover:bg-amber-500/10 shrink-0"
            >
              <span>Need a Hint? ({hintsRevealed + 1}/{currentMission.hints.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Center Interactive Playground Split */}
      <div className="space-y-4">
        {/* Visualizer Mode Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-dev-panel border border-dev-border rounded p-0.5">
            <button
              onClick={() => setActiveView('pipeline')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${
                activeView === 'pipeline'
                  ? 'bg-dev-surface text-dev-heading font-semibold shadow-sm border border-dev-border'
                  : 'text-dev-subtext hover:text-dev-text'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Architecture Pipeline</span>
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
              <span>Commit Graph</span>
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
              <span>File Explorer</span>
            </button>
          </div>
        </div>

        {/* Top Visualizer Area */}
        {activeView === 'pipeline' && <PipelineVisualizer />}
        {activeView === 'commits' && <CommitGraph />}
        {activeView === 'files' && <FileTree />}

        {/* Explanation Card */}
        <ExplanationCard />

        {/* Bottom: Simulated Interactive Terminal */}
        <Terminal
          quickSuggestions={[
            'git status',
            'git add index.html',
            'git add .',
            'git commit -m "Update homepage"',
            'git log --oneline',
            'git diff',
          ]}
        />
      </div>
    </div>
  );
};
