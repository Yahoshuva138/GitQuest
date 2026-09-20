import React, { useState } from 'react';
import {
  Laptop,
  Package,
  Boxes,
  Cloud,
  ArrowRight,
  ArrowLeft,
  Zap,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Play,
  RotateCcw,
  Layers,
  Database,
  Terminal,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { playClickSound, playSuccessSound, playPowerUpSound } from '../../utils/audio';

export const LocalToCloudFlowVisualizer: React.FC = () => {
  const { soundEnabled } = useGame();

  // Animation simulation state
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(1);
  const [stagedFilesCount, setStagedFilesCount] = useState<number>(0);
  const [committedSnapshotsCount, setCommittedSnapshotsCount] = useState<number>(1);
  const [cloudSyncedCount, setCloudSyncedCount] = useState<number>(1);
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [lastActionLog, setLastActionLog] = useState<string>(
    'System ready. Working tree initialized on branch "main".'
  );

  const handleSimulateAdd = () => {
    if (soundEnabled) playClickSound();
    setActiveStage(2);
    setStagedFilesCount((prev) => prev + 1);
    setLastActionLog(
      'Executed: $ git add . ➔ Packed modified files into the Staging Area (.git/index).'
    );
  };

  const handleSimulateCommit = () => {
    if (stagedFilesCount === 0) {
      if (soundEnabled) playClickSound();
      setLastActionLog('Warning: Staging area is empty! Run "git add" first before committing.');
      return;
    }
    if (soundEnabled) playSuccessSound();
    setActiveStage(3);
    setCommittedSnapshotsCount((prev) => prev + 1);
    setStagedFilesCount(0);
    setLastActionLog(
      'Executed: $ git commit -m "Snapshot update" ➔ Box sealed with SHA-1 hash and stored in .git database.'
    );
  };

  const handleSimulatePush = () => {
    if (committedSnapshotsCount === cloudSyncedCount) {
      if (soundEnabled) playClickSound();
      setLastActionLog('Everything up-to-date! Local commits already match remote origin/main.');
      return;
    }
    if (soundEnabled) playPowerUpSound();
    setIsPushing(true);
    setActiveStage(4);
    setLastActionLog(
      'Executed: $ git push -u origin main ➔ Streaming commit packfile across the "origin" bridge...'
    );

    setTimeout(() => {
      setIsPushing(false);
      setCloudSyncedCount(committedSnapshotsCount);
      if (soundEnabled) playSuccessSound();
      setLastActionLog(
        'Triumph! Remote GitHub repository updated. Origin/main is in sync with local main.'
      );
    }, 1500);
  };

  const handleSimulatePull = () => {
    if (soundEnabled) playPowerUpSound();
    setIsPulling(true);
    setLastActionLog(
      'Executed: $ git pull origin main ➔ Fetching latest cloud commits and merging into local workspace...'
    );

    setTimeout(() => {
      setIsPulling(false);
      if (soundEnabled) playSuccessSound();
      setLastActionLog('Local workspace updated with latest remote changes (Fast-forward merge).');
    }, 1500);
  };

  const handleReset = () => {
    if (soundEnabled) playClickSound();
    setActiveStage(1);
    setStagedFilesCount(0);
    setCommittedSnapshotsCount(1);
    setCloudSyncedCount(1);
    setLastActionLog('Flow reset to initial state. Working tree ready.');
  };

  return (
    <div className="rounded-2xl bg-[#090D15] border-2 border-dev-border/90 p-5 shadow-2xl space-y-5 font-mono text-xs select-none">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dev-border/70">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-git-blue/20 border border-git-blue/40 text-git-blue">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-dev-heading uppercase tracking-wider">
                The 4 Stages of Git Data Lifecycle
              </h2>
              <span className="text-xs text-purple-300 font-bold hidden sm:inline">
                『ローカルからクラウドへの4段階フロー』
              </span>
            </div>
            <p className="text-[11px] text-dev-subtext mt-0.5">
              "Git forces you to be intentional. You do not simply save to the cloud. You construct, prepare, record, and then ship."
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-subtext hover:text-white transition-all text-[11px]"
          title="Reset flow simulation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* 4 Stages Visual Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {/* STAGE 1: WORKING DIRECTORY */}
        <div
          onClick={() => setActiveStage(1)}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
            activeStage === 1
              ? 'border-amber-400 bg-amber-950/20 shadow-[0_0_20px_rgba(251,191,36,0.2)] ring-2 ring-amber-400/40'
              : 'border-dev-border/70 bg-[#06090F] hover:border-dev-border'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                Stage 1
              </span>
              <span className="text-[10px] text-amber-300 font-bold">『作業台』</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Laptop className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-xs text-dev-heading uppercase">
                Working Tree
              </h3>
            </div>
            <p className="text-[10px] text-dev-subtext font-sans mt-0.5">
              The Workbench: where files are actively edited on disk.
            </p>
          </div>

          {/* Isometric Visual Graphic */}
          <div className="p-3 rounded-lg bg-black/50 border border-dev-border/50 text-center space-y-1.5">
            <div className="text-2xl">🖥️ 📝</div>
            <div className="text-[10px] text-gray-300 font-bold">Files on Disk</div>
            <div className="text-[9px] text-amber-300/80">Untracked & Modified</div>
          </div>

          <div className="pt-2 border-t border-dev-border/50 flex items-center justify-between text-[10px]">
            <span className="text-dev-subtext">Action:</span>
            <span className="text-amber-400 font-bold">Edit Code</span>
          </div>
        </div>

        {/* Arrow 1: git add */}
        <div className="hidden md:flex absolute left-[24%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex-col items-center">
          <div className="px-2 py-0.5 rounded-full bg-black/80 border border-amber-500/60 text-amber-300 text-[9px] font-bold shadow-md">
            git add .
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 animate-pulse mt-0.5" />
        </div>

        {/* STAGE 2: STAGING AREA */}
        <div
          onClick={() => setActiveStage(2)}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
            activeStage === 2
              ? 'border-emerald-400 bg-emerald-950/20 shadow-[0_0_20px_rgba(52,211,153,0.2)] ring-2 ring-emerald-400/40'
              : 'border-dev-border/70 bg-[#06090F] hover:border-dev-border'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
                Stage 2
              </span>
              <span className="text-[10px] text-emerald-300 font-bold">『積込場』</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Package className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-xs text-dev-heading uppercase">
                Staging Area
              </h3>
            </div>
            <p className="text-[10px] text-dev-subtext font-sans mt-0.5">
              The Loading Dock: packing changes into an open box.
            </p>
          </div>

          {/* Isometric Visual Graphic */}
          <div className="p-3 rounded-lg bg-black/50 border border-dev-border/50 text-center space-y-1.5">
            <div className="text-2xl animate-bounce">📦</div>
            <div className="text-[10px] text-gray-300 font-bold">
              {stagedFilesCount > 0 ? `${stagedFilesCount} packed files` : 'Open Moving Box'}
            </div>
            <div className="text-[9px] text-emerald-300/80">.git/index cache</div>
          </div>

          <div className="pt-2 border-t border-dev-border/50 flex items-center justify-between text-[10px]">
            <span className="text-dev-subtext">Action:</span>
            <span className="text-emerald-400 font-bold">Pack Box</span>
          </div>
        </div>

        {/* Arrow 2: git commit */}
        <div className="hidden md:flex absolute left-[49%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex-col items-center">
          <div className="px-2 py-0.5 rounded-full bg-black/80 border border-blue-500/60 text-blue-300 text-[9px] font-bold shadow-md">
            git commit
          </div>
          <ArrowRight className="w-4 h-4 text-blue-400 animate-pulse mt-0.5" />
        </div>

        {/* STAGE 3: LOCAL REPOSITORY */}
        <div
          onClick={() => setActiveStage(3)}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
            activeStage === 3
              ? 'border-blue-400 bg-blue-950/20 shadow-[0_0_20px_rgba(96,165,250,0.2)] ring-2 ring-blue-400/40'
              : 'border-dev-border/70 bg-[#06090F] hover:border-dev-border'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] border border-blue-500/30">
                Stage 3
              </span>
              <span className="text-[10px] text-blue-300 font-bold">『倉庫』</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Boxes className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-xs text-dev-heading uppercase">
                Local Repo
              </h3>
            </div>
            <p className="text-[10px] text-dev-subtext font-sans mt-0.5">
              The Warehouse: sealed, timestamped snapshots.
            </p>
          </div>

          {/* Isometric Visual Graphic */}
          <div className="p-3 rounded-lg bg-black/50 border border-dev-border/50 text-center space-y-1.5">
            <div className="text-2xl">🗄️ 🏷️</div>
            <div className="text-[10px] text-gray-300 font-bold">
              {committedSnapshotsCount} sealed snapshots
            </div>
            <div className="text-[9px] text-blue-300/80">SHA-1 Cryptographic DAG</div>
          </div>

          <div className="pt-2 border-t border-dev-border/50 flex items-center justify-between text-[10px]">
            <span className="text-dev-subtext">Action:</span>
            <span className="text-blue-400 font-bold">Seal Milestone</span>
          </div>
        </div>

        {/* The Bridge (origin) & Arrow 3 */}
        <div className="hidden md:flex absolute left-[74%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex-col items-center">
          <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 border border-purple-400 text-white text-[9px] font-bold shadow-md flex items-center gap-1">
            <span>🌉 origin</span>
          </div>
          <ArrowRight
            className={`w-4 h-4 mt-0.5 ${
              isPushing ? 'text-purple-400 animate-spin scale-125' : 'text-purple-400 animate-pulse'
            }`}
          />
        </div>

        {/* STAGE 4: REMOTE REPOSITORY (GITHUB CLOUD) */}
        <div
          onClick={() => setActiveStage(4)}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
            activeStage === 4
              ? 'border-purple-400 bg-purple-950/20 shadow-[0_0_20px_rgba(192,132,252,0.2)] ring-2 ring-purple-400/40'
              : 'border-dev-border/70 bg-[#06090F] hover:border-dev-border'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px] border border-purple-500/30">
                Stage 4
              </span>
              <span className="text-[10px] text-purple-300 font-bold">『雲海ネットワーク』</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Cloud className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-xs text-dev-heading uppercase">
                Remote Cloud
              </h3>
            </div>
            <p className="text-[10px] text-dev-subtext font-sans mt-0.5">
              The Global Network: team sharing and cloud backups.
            </p>
          </div>

          {/* Isometric Visual Graphic */}
          <div className="p-3 rounded-lg bg-black/50 border border-dev-border/50 text-center space-y-1.5">
            <div className="text-2xl animate-pulse">☁️ 🛰️</div>
            <div className="text-[10px] text-gray-300 font-bold">
              {cloudSyncedCount} cloud snapshots
            </div>
            <div className="text-[9px] text-purple-300/80">GitHub.com / origin</div>
          </div>

          <div className="pt-2 border-t border-dev-border/50 flex items-center justify-between text-[10px]">
            <span className="text-dev-subtext">Action:</span>
            <span className="text-purple-400 font-bold">Global Deploy</span>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Action Bar */}
      <div className="p-4 rounded-xl bg-[#06090F] border border-dev-border/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. git add button */}
          <button
            onClick={handleSimulateAdd}
            className="px-3.5 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>1.</span>
            <span>$ git add .</span>
            <span className="text-[10px] opacity-80">(Pack Box)</span>
          </button>

          {/* 2. git commit button */}
          <button
            onClick={handleSimulateCommit}
            className="px-3.5 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>2.</span>
            <span>$ git commit -m</span>
            <span className="text-[10px] opacity-80">(Seal Snapshot)</span>
          </button>

          {/* 3. git push button */}
          <button
            onClick={handleSimulatePush}
            disabled={isPushing}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            <Zap className={`w-3.5 h-3.5 ${isPushing ? 'animate-spin' : ''}`} />
            <span>3. $ git push origin main</span>
            <span className="text-[10px] opacity-80">(Bridge Stream)</span>
          </button>

          {/* 4. git pull button */}
          <button
            onClick={handleSimulatePull}
            disabled={isPulling}
            className="px-3.5 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isPulling ? 'animate-pulse' : ''}`} />
            <span>$ git pull</span>
            <span className="text-[10px] opacity-80">(Sync Down)</span>
          </button>
        </div>

        <div className="text-[10px] text-dev-subtext italic">
          Click any command to trigger live lifecycle animation
        </div>
      </div>

      {/* Live Terminal Log Feedback */}
      <div className="p-3 rounded-xl bg-black/80 border border-dev-border/70 flex items-center gap-2 text-[11px] text-gray-300 overflow-x-auto">
        <Terminal className="w-4 h-4 text-git-blue shrink-0" />
        <span className="text-gray-500 font-bold shrink-0">[ENGINE LOG]:</span>
        <span className="text-emerald-400 font-mono">{lastActionLog}</span>
      </div>
    </div>
  );
};
