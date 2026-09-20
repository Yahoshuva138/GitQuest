import React, { useState } from 'react';
import {
  Workflow,
  RotateCw,
  BookOpen,
  ShieldCheck,
  Wrench,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Laptop,
  Cloud,
} from 'lucide-react';
import { LocalToCloudFlowVisualizer } from '../components/Flow/LocalToCloudFlowVisualizer';
import { GoldenLoopVisualizer } from '../components/Flow/GoldenLoopVisualizer';
import { PresentationSlideViewer } from '../components/Flow/PresentationSlideViewer';
import { GitSecurityBouncer } from '../components/Flow/GitSecurityBouncer';
import { TroubleshootingMatrix } from '../components/Flow/TroubleshootingMatrix';
import { playClickSound } from '../utils/audio';
import { useGame } from '../context/GameContext';

type FlowTab = 'lifecycle' | 'loop' | 'slides' | 'security' | 'troubleshooting';

export const FlowGuidePage: React.FC = () => {
  const { soundEnabled, setActiveTab } = useGame();
  const [activeTab, setActiveFlowTab] = useState<FlowTab>('lifecycle');

  const handleTabChange = (tab: FlowTab) => {
    if (soundEnabled) playClickSound();
    setActiveFlowTab(tab);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-mono text-xs animate-fadeIn pb-16">
      {/* Hero Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0E1424] via-[#141C30] to-[#0D1220] border-2 border-dev-border/90 p-6 shadow-2xl space-y-3 relative overflow-hidden">
        {/* Subtle Ambient Starfield Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#388bfd15_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-git-blue/20 text-git-blue border border-git-blue/40 font-bold text-[10px]">
                OFFICIAL CURRICULUM DECK
              </span>
              <span className="text-purple-300 font-bold text-xs">
                『Git＆GitHub アーキテクチャ・完全フローガイド』
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-wide">
              How Git & GitHub Work: From Local to Cloud
            </h1>
            <p className="text-xs text-dev-subtext font-sans max-w-2xl leading-relaxed">
              Understand the complete mental model of distributed snapshots, the 4-stage data lifecycle, the daily Golden Loop, security bouncer rules, and troubleshooting diagnostics.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('missions')}
              className="px-4 py-2 rounded-xl bg-rpg-gold hover:bg-amber-400 text-black font-sans font-bold text-xs shadow-pixelGold active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Jump to Build Mission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#090D15] border border-dev-border/80 shadow-sm">
        <button
          onClick={() => handleTabChange('lifecycle')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'lifecycle'
              ? 'bg-git-blue/20 text-git-blue border border-git-blue/40 shadow-sm'
              : 'text-dev-subtext hover:text-white hover:bg-dev-surface/40'
          }`}
        >
          <Workflow className="w-4 h-4" />
          <span>1. Local-to-Cloud Flow 『4段階フロー』</span>
        </button>

        <button
          onClick={() => handleTabChange('loop')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'loop'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-dev-subtext hover:text-white hover:bg-dev-surface/40'
          }`}
        >
          <RotateCw className="w-4 h-4" />
          <span>2. The Golden Loop 『黄金のループ』</span>
        </button>

        <button
          onClick={() => handleTabChange('slides')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'slides'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-dev-subtext hover:text-white hover:bg-dev-surface/40'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>3. PPT Slide Deck (21 Slides) 『公式教材』</span>
        </button>

        <button
          onClick={() => handleTabChange('security')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'security'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-dev-subtext hover:text-white hover:bg-dev-surface/40'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>4. Security Bouncer & Red Alert 『用心棒』</span>
        </button>

        <button
          onClick={() => handleTabChange('troubleshooting')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'troubleshooting'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
              : 'text-dev-subtext hover:text-white hover:bg-dev-surface/40'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>5. Diagnostics Matrix 『トラブル診断』</span>
        </button>
      </div>

      {/* Render Active Flow Section */}
      <div className="space-y-6">
        {activeTab === 'lifecycle' && <LocalToCloudFlowVisualizer />}
        {activeTab === 'loop' && <GoldenLoopVisualizer />}
        {activeTab === 'slides' && <PresentationSlideViewer />}
        {activeTab === 'security' && <GitSecurityBouncer />}
        {activeTab === 'troubleshooting' && <TroubleshootingMatrix />}
      </div>
    </div>
  );
};
