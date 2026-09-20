import React, { useState } from 'react';
import {
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Sparkles,
  Zap,
  Play,
  Github,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGame } from '../../context/GameContext';
import {
  playJutsuSound,
  playPowerUpSound,
  playClickSound,
  playSuccessSound,
} from '../../utils/audio';

interface GitMotionGraphicShowcaseProps {
  onReplayIntro: () => void;
}

interface SimulatedNode {
  id: string;
  cx: number;
  cy: number;
  branch: 'main' | 'feature' | 'hotfix';
  color: string;
  hash: string;
}

export const GitMotionGraphicShowcase: React.FC<GitMotionGraphicShowcaseProps> = ({
  onReplayIntro,
}) => {
  const { soundEnabled } = useGame();

  const [nodes, setNodes] = useState<SimulatedNode[]>([
    { id: 'c1', cx: 60, cy: 90, branch: 'main', color: '#388bfd', hash: 'a1b2c3d' },
    { id: 'c2', cx: 140, cy: 90, branch: 'main', color: '#388bfd', hash: 'e4f5a6b' },
    { id: 'c3', cx: 200, cy: 45, branch: 'feature', color: '#f472b6', hash: '7c8d9e0' },
    { id: 'c4', cx: 270, cy: 45, branch: 'feature', color: '#f472b6', hash: '1a2b3c4' },
    { id: 'c5', cx: 340, cy: 90, branch: 'main', color: '#10b981', hash: '5d6e7f8' },
  ]);

  const [activeBranch, setActiveBranch] = useState<'main' | 'feature' | 'hotfix'>('feature');
  const [pulseCount, setPulseCount] = useState<number>(0);

  // 1. Spawn a new commit
  const handleSpawnCommit = () => {
    if (soundEnabled) playJutsuSound();
    setPulseCount((p) => p + 1);

    const newHash = Math.random().toString(16).substring(2, 9);
    const lastNode = nodes[nodes.length - 1];
    const newX = Math.min(lastNode.cx + 60, 520);
    const newY = activeBranch === 'feature' ? 45 : activeBranch === 'hotfix' ? 135 : 90;
    const color = activeBranch === 'feature' ? '#f472b6' : activeBranch === 'hotfix' ? '#eab308' : '#388bfd';

    const newNode: SimulatedNode = {
      id: `c-${Date.now()}`,
      cx: newX,
      cy: newY,
      branch: activeBranch,
      color,
      hash: newHash,
    };

    setNodes((prev) => [...prev.slice(-7), newNode]);
  };

  // 2. Toggle active branch
  const handleToggleBranch = () => {
    if (soundEnabled) playClickSound();
    setActiveBranch((prev) => (prev === 'main' ? 'feature' : prev === 'feature' ? 'hotfix' : 'main'));
  };

  // 3. GitHub Merge Pull Request
  const handleMergePR = () => {
    if (soundEnabled) playSuccessSound();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    const mergeHash = Math.random().toString(16).substring(2, 9);
    const mergeNode: SimulatedNode = {
      id: `merge-${Date.now()}`,
      cx: 440,
      cy: 90,
      branch: 'main',
      color: '#10b981',
      hash: mergeHash,
    };

    setNodes((prev) => [...prev.slice(-6), mergeNode]);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-purple-900/50 bg-[#0A0D15] shadow-2xl p-5 sm:p-7 select-none">
      {/* Background Cyberpunk Grid & Floating Kanji Typography */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#388bfd15_1px,transparent_1px),linear-gradient(to_bottom,#388bfd15_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Floating Ambient Japanese Kanji */}
      <div className="absolute top-4 right-8 text-4xl font-extrabold text-pink-500/10 pointer-events-none font-mono">
        時空分岐
      </div>
      <div className="absolute bottom-4 left-6 text-4xl font-extrabold text-blue-500/10 pointer-events-none font-mono">
        究極コード
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-dev-border/70">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/20 border-2 border-purple-500/50 flex items-center justify-center text-lg shadow-inner">
            🐙
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-pixel text-xs sm:text-sm text-white tracking-wide">
                GIT & GITHUB MOTION GRAPHICS LAB
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-500/40 font-bold hidden sm:inline">
                『電脳時空の可視化』
              </span>
            </div>
            <p className="text-xs text-dev-subtext font-mono">
              Live interactive visualization of branching timelines, commits & pull requests
            </p>
          </div>
        </div>

        {/* Replay Cinematic Intro Button */}
        <button
          onClick={() => {
            if (soundEnabled) playPowerUpSound();
            onReplayIntro();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-rpg-gold/20 hover:bg-rpg-gold/40 border border-rpg-gold/50 text-rpg-gold font-mono font-bold text-xs active:scale-95 transition-all flex items-center gap-1.5 shadow-pixelGold"
          title="Watch the full cinematic boot animation"
        >
          <Play className="w-3.5 h-3.5 fill-rpg-gold" />
          <span>🎬 Replay Intro</span>
        </button>
      </div>

      {/* Center Motion Graphic Interactive SVG Canvas */}
      <div className="relative z-10 my-4 py-3 bg-[#070A10]/90 rounded-xl border border-dev-border/70 flex flex-col items-center justify-center overflow-hidden">
        <svg className="w-full h-48 sm:h-52" viewBox="0 0 560 180">
          {/* Main Branch Line */}
          <line
            x1="30"
            y1="90"
            x2="530"
            y2="90"
            stroke="#388bfd"
            strokeWidth="4"
            strokeDasharray="6 4"
            className="animate-pulse"
          />

          {/* Feature Branch Curved Arc */}
          <path
            d="M 140 90 Q 200 45 340 90"
            fill="none"
            stroke="#f472b6"
            strokeWidth="3.5"
            strokeDasharray="5 3"
          />

          {/* Hotfix Branch Curved Arc */}
          <path
            d="M 220 90 Q 300 135 440 90"
            fill="none"
            stroke="#eab308"
            strokeWidth="3"
            strokeDasharray="4 3"
          />

          {/* Branch Labels */}
          <text x="35" y="80" fill="#388bfd" fontSize="10" fontFamily="monospace" fontWeight="bold">
            main (本流)
          </text>
          <text x="210" y="35" fill="#f472b6" fontSize="10" fontFamily="monospace" fontWeight="bold">
            feature/anime-ui (分岐)
          </text>
          <text x="300" y="155" fill="#eab308" fontSize="10" fontFamily="monospace" fontWeight="bold">
            hotfix/patch (緊急修正)
          </text>

          {/* Render Active Nodes */}
          {nodes.map((node) => (
            <g key={node.id} className="cursor-pointer group">
              {/* Outer Glow Halo */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r="14"
                fill={node.color}
                opacity="0.25"
                className="animate-ping"
              />
              {/* Main Commit Circle */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r="9"
                fill={node.color}
                stroke="#ffffff"
                strokeWidth="2.5"
              />
              {/* Short Hash Label */}
              <text
                x={node.cx}
                y={node.cy + 22}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="9"
                fontFamily="monospace"
              >
                {node.hash}
              </text>
            </g>
          ))}
        </svg>

        {/* Status Bar */}
        <div className="w-full px-4 py-2 border-t border-dev-border/50 flex flex-wrap items-center justify-between text-[11px] font-mono text-dev-subtext">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Branch: <strong className="text-white uppercase">{activeBranch}</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <span>Total Simulated Commits: <strong className="text-amber-300">{nodes.length}</strong></span>
            <span>•</span>
            <span className="text-pink-300">『状態: 安定稼働中』</span>
          </div>
        </div>
      </div>

      {/* Interactive Control Buttons */}
      <div className="relative z-10 flex flex-wrap items-center gap-2.5 pt-1">
        {/* Spawn Commit */}
        <button
          onClick={handleSpawnCommit}
          className="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl bg-git-blue/20 hover:bg-git-blue/30 border border-git-blue/50 text-git-blue font-mono font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
        >
          <GitCommit className="w-4 h-4" />
          <span>+ Spawn Commit</span>
        </button>

        {/* Switch / Create Branch */}
        <button
          onClick={handleToggleBranch}
          className="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 text-pink-300 font-mono font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
        >
          <GitBranch className="w-4 h-4" />
          <span>Switch Branch ({activeBranch})</span>
        </button>

        {/* Merge PR */}
        <button
          onClick={handleMergePR}
          className="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
        >
          <GitMerge className="w-4 h-4" />
          <span>Merge PR (origin/main)</span>
        </button>
      </div>
    </div>
  );
};
