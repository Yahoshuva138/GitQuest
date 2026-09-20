import React, { useState, useEffect } from 'react';
import {
  Code,
  Radar,
  Package,
  Boxes,
  CloudUpload,
  ArrowRight,
  RotateCw,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { playClickSound, playPowerUpSound } from '../../utils/audio';
import { useGame } from '../../context/GameContext';

const LOOP_STEPS = [
  {
    step: 1,
    title: 'WRITE CODE',
    japanese: '『コード執筆』',
    command: 'Edit files in IDE / Editor',
    color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20',
    icon: Code,
    description: 'Modify code, implement features, and create new files in your working tree.',
  },
  {
    step: 2,
    title: 'RADAR CHECK',
    japanese: '『ステータス照合』',
    command: '$ git status',
    color: 'text-amber-400 border-amber-500/40 bg-amber-950/20',
    icon: Radar,
    description: 'Inspect what changed. Untracked files appear in red; modified files show unsaved deltas.',
  },
  {
    step: 3,
    title: 'STAGE CHANGES',
    japanese: '『インデックス登録』',
    command: '$ git add .',
    color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20',
    icon: Package,
    description: 'Selectively pack the open moving box. Files turn green in staging area (.git/index).',
  },
  {
    step: 4,
    title: 'SEAL SNAPSHOT',
    japanese: '『コミット封印』',
    command: '$ git commit -m "Message"',
    color: 'text-blue-400 border-blue-500/40 bg-blue-950/20',
    icon: Boxes,
    description: 'Seal the box with a descriptive message and commit hash in the local .git warehouse.',
  },
  {
    step: 5,
    title: 'SYNC TO CLOUD',
    japanese: '『クラウド同期』',
    command: '$ git push',
    color: 'text-purple-400 border-purple-500/40 bg-purple-950/20',
    icon: CloudUpload,
    description: 'Stream snapshots across the "origin" bridge to GitHub for team collaboration.',
  },
];

export const GoldenLoopVisualizer: React.FC = () => {
  const { soundEnabled } = useGame();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [autoLoop, setAutoLoop] = useState<boolean>(false);

  useEffect(() => {
    if (!autoLoop) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 5) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, [autoLoop]);

  const handleStepClick = (stepNum: number) => {
    if (soundEnabled) playClickSound();
    setActiveStep(stepNum);
    setAutoLoop(false);
  };

  const handleToggleAutoLoop = () => {
    if (soundEnabled) playPowerUpSound();
    setAutoLoop(!autoLoop);
  };

  const currentStepData = LOOP_STEPS[activeStep - 1];

  return (
    <div className="rounded-2xl bg-[#090D15] border-2 border-dev-border/90 p-5 shadow-2xl space-y-5 font-mono text-xs select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-dev-border/70">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
            <RotateCw className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-dev-heading uppercase tracking-wider">
                The Golden Loop: Daily Developer Workflow
              </h2>
              <span className="text-xs text-amber-300 font-bold hidden sm:inline">
                『黄金のループ：開発者の日常』
              </span>
            </div>
            <p className="text-[11px] text-dev-subtext mt-0.5">
              "Once the initial setup is complete, 95% of your time as a developer is spent repeating this exact five-step cycle."
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleAutoLoop}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
            autoLoop
              ? 'bg-amber-500 text-black border-amber-400 shadow-pixelGold'
              : 'bg-dev-surface text-dev-subtext hover:text-white border-dev-border'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{autoLoop ? 'Auto-Cycle: Active' : 'Start Auto-Cycle'}</span>
        </button>
      </div>

      {/* 5-Step Horizontal / Circular Workflow Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
        {LOOP_STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = step.step === activeStep;

          return (
            <div
              key={step.step}
              onClick={() => handleStepClick(step.step)}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-2 relative ${
                isActive
                  ? `${step.color} shadow-lg ring-2 ring-amber-400/50 scale-[1.03]`
                  : 'bg-[#06090F] border-dev-border/70 hover:border-dev-border text-dev-subtext'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    isActive ? 'bg-white text-black' : 'bg-dev-surface text-dev-subtext'
                  }`}
                >
                  {step.step}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-dev-subtext'}`} />
              </div>

              <div>
                <div className="font-bold text-xs text-dev-heading">{step.title}</div>
                <div className="text-[10px] text-purple-300 font-bold">{step.japanese}</div>
              </div>

              <code className="text-[10px] bg-black/60 px-1.5 py-0.5 rounded border border-dev-border text-amber-300 truncate">
                {step.command}
              </code>
            </div>
          );
        })}
      </div>

      {/* Focused Active Step Detail Card */}
      <div className="p-4 rounded-xl bg-[#06090F] border border-dev-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">Step {currentStepData.step} of 5:</span>
            <span className="text-white font-bold text-sm">{currentStepData.title}</span>
            <span className="text-purple-300 font-bold">{currentStepData.japanese}</span>
          </div>
          <p className="text-dev-subtext text-xs leading-relaxed max-w-2xl">
            {currentStepData.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <code className="bg-black/90 text-emerald-400 px-3 py-2 rounded-lg border border-dev-border font-bold text-xs">
            {currentStepData.command}
          </code>
        </div>
      </div>
    </div>
  );
};
