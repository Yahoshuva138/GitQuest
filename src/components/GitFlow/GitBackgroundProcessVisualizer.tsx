import React, { useMemo } from 'react';
import {
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Database,
  GitCommit,
  GitBranch,
  Terminal,
  FileCode2,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface ProcessStep {
  title: string;
  detail: string;
  icon: React.FC<{ className?: string }>;
  status: 'completed' | 'active' | 'pending';
}

export const GitBackgroundProcessVisualizer: React.FC = () => {
  const { repoState, commandHistory, lastExplanation } = useGame();

  const lastCommandResult = commandHistory.length > 0 ? commandHistory[commandHistory.length - 1] : null;
  const lastCmd = lastCommandResult ? lastCommandResult.command.trim() : 'git status';

  // Compute realistic Git internal background process steps based on the last command
  const processData = useMemo(() => {
    const cmd = lastCmd.toLowerCase();

    if (cmd.startsWith('git init')) {
      return {
        actionName: 'REPOSITORY INITIALIZATION',
        japaneseName: '『リポジトリ初期化プロセス』',
        accentColor: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
        steps: [
          {
            title: 'Create .git/ Directory',
            detail: 'Allocates hidden directory structure on disk to house the Git object database and configuration.',
            icon: Database,
            status: 'completed' as const,
          },
          {
            title: 'Initialize Core Config',
            detail: 'Writes .git/config setting repository format v0, core.bare = false, and filemode flags.',
            icon: Cpu,
            status: 'completed' as const,
          },
          {
            title: 'Set Default HEAD Ref',
            detail: 'Writes "ref: refs/heads/main" into .git/HEAD to declare the default working branch.',
            icon: GitBranch,
            status: 'completed' as const,
          },
          {
            title: 'Ready Object Store',
            detail: 'Sets up .git/objects/ and .git/refs/ subdirectories ready to store immutable SHA-1 content.',
            icon: CheckCircle2,
            status: 'completed' as const,
          },
        ],
        stateSummary: 'Repository initialized with clean index and empty object store.',
      };
    }

    if (cmd.startsWith('git add')) {
      const stagedCount = Object.keys(repoState.stagingArea).length;
      return {
        actionName: 'STAGING & BLOB GENERATION',
        japaneseName: '『インデックス登録＆ブロブ生成』',
        accentColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30',
        steps: [
          {
            title: 'Scan Working Tree',
            detail: 'Detects changed and untracked files on disk by comparing timestamps with .git/index cache.',
            icon: FileCode2,
            status: 'completed' as const,
          },
          {
            title: 'Compute SHA-1 Hashes',
            detail: 'Calculates 160-bit cryptographic hash for each file content using header "blob <size>\\0".',
            icon: Cpu,
            status: 'completed' as const,
          },
          {
            title: 'Write Zlib Blob Objects',
            detail: 'Compresses file payloads and writes them to .git/objects/<hash[0..2]>/<hash[2..]> on disk.',
            icon: Database,
            status: 'completed' as const,
          },
          {
            title: 'Update .git/index Binary Table',
            detail: `Registers ${stagedCount} staged file paths, permissions (100644), and blob hashes into the staging index.`,
            icon: CheckCircle2,
            status: 'completed' as const,
          },
        ],
        stateSummary: `${stagedCount} file(s) registered in staging area (.git/index) ready for snapshot.`,
      };
    }

    if (cmd.startsWith('git commit')) {
      const latestCommit = repoState.commits[repoState.commits.length - 1];
      return {
        actionName: 'TREE & COMMIT OBJECT CREATION',
        japaneseName: '『ツリー作成＆コミット生成』',
        accentColor: 'text-blue-400 border-blue-500/40 bg-blue-950/30',
        steps: [
          {
            title: 'Freeze Staging Tree',
            detail: 'Reads .git/index and constructs an immutable "tree" object listing all directory contents & blob hashes.',
            icon: Layers,
            status: 'completed' as const,
          },
          {
            title: 'Construct Commit Object',
            detail: 'Embeds author, committer, timestamp, commit message, and parent commit pointer hash into commit payload.',
            icon: GitCommit,
            status: 'completed' as const,
          },
          {
            title: 'Update Branch Pointer',
            detail: `Writes commit hash (${latestCommit?.shortHash || '7a8b9c'}) to .git/refs/heads/${repoState.currentBranch}.`,
            icon: GitBranch,
            status: 'completed' as const,
          },
          {
            title: 'Advance HEAD & Flush Staging',
            detail: 'HEAD pointer moves forward to the new commit snapshot. Staging index resets to unmodified.',
            icon: CheckCircle2,
            status: 'completed' as const,
          },
        ],
        stateSummary: `Snapshot created (${latestCommit?.shortHash || 'latest'}). HEAD points to ${repoState.currentBranch}.`,
      };
    }

    if (cmd.startsWith('git branch')) {
      return {
        actionName: 'BRANCH REFERENCE ALLOCATION',
        japaneseName: '『ブランチ参照の作成』',
        accentColor: 'text-pink-400 border-pink-500/40 bg-pink-950/30',
        steps: [
          {
            title: 'Inspect Current HEAD Commit',
            detail: 'Locates the 40-character SHA-1 commit hash currently pointed to by the active branch.',
            icon: GitCommit,
            status: 'completed' as const,
          },
          {
            title: 'Allocate Reference File',
            detail: `Creates .git/refs/heads/<branch> containing the exact 40-character commit hash.`,
            icon: Database,
            status: 'completed' as const,
          },
          {
            title: 'Establish Parallel Timeline',
            detail: 'Branch pointer is ready. Git uses pointer arithmetic: creating a branch costs only 41 bytes on disk!',
            icon: CheckCircle2,
            status: 'completed' as const,
          },
        ],
        stateSummary: `Branch references synchronized. Current branch: ${repoState.currentBranch}.`,
      };
    }

    if (cmd.startsWith('git switch') || cmd.startsWith('git checkout')) {
      return {
        actionName: 'HEAD POINTER & WORKSPACE SHIFT',
        japaneseName: '『HEAD切り替え＆作業領域復元』',
        accentColor: 'text-purple-400 border-purple-500/40 bg-purple-950/30',
        steps: [
          {
            title: 'Update .git/HEAD Reference',
            detail: `Rewrites .git/HEAD file to point to "refs/heads/${repoState.currentBranch}".`,
            icon: GitBranch,
            status: 'completed' as const,
          },
          {
            title: 'Read Target Commit Tree',
            detail: 'Fetches the commit tree snapshot pointed to by the newly active branch reference.',
            icon: Layers,
            status: 'completed' as const,
          },
          {
            title: 'Synchronize Working Directory',
            detail: 'Restores working directory files to match the exact byte-for-byte state of the target snapshot.',
            icon: CheckCircle2,
            status: 'completed' as const,
          },
        ],
        stateSummary: `HEAD shifted to ${repoState.currentBranch}. Working directory synchronized.`,
      };
    }

    if (cmd.startsWith('git push')) {
      return {
        actionName: 'NETWORK PACKFILE STREAMING',
        japaneseName: '『リモート同期＆パックファイル送信』',
        accentColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30',
        steps: [
          {
            title: 'Handshake with GitHub',
            detail: 'Sends advertisement packet to origin URL and discovers missing commit deltas on remote.',
            icon: Zap,
            status: 'completed' as const,
          },
          {
            title: 'Generate Delta Packfile',
            detail: 'Packs missing commits, trees, and blobs into an optimized .pack archive.',
            icon: Database,
            status: 'completed' as const,
          },
          {
            title: 'Stream over HTTPS/SSH',
            detail: 'Transmits packet stream to GitHub server and waits for hook validation.',
            icon: ArrowRight,
            status: 'completed' as const,
          },
          {
            title: 'Update Remote Ref (origin/main)',
            detail: 'Remote GitHub repository moves refs/heads/main to latest commit. Local refs/remotes updated.',
            icon: CheckCircle2,
            status: 'completed' as const,
          },
        ],
        stateSummary: 'Local commits pushed and synchronized with origin remote.',
      };
    }

    // Default / git status
    return {
      actionName: 'STATUS CACHE & TREE INSPECTION',
      japaneseName: '『ステータス照合＆ツリー検査』',
      accentColor: 'text-git-blue border-git-blue/40 bg-blue-950/30',
      steps: [
        {
          title: 'Read .git/index Cache',
          detail: 'Loads cached file timestamps, file sizes, and staged blob hashes into memory.',
          icon: Database,
          status: 'completed' as const,
        },
        {
          title: 'Inspect Working Directory',
          detail: 'Compares disk files against the staging index to identify modified and untracked files.',
          icon: Cpu,
          status: 'completed' as const,
        },
        {
          title: 'Diff Index vs HEAD Commit',
          detail: 'Compares staged index blobs against the latest commit tree to calculate changes to be committed.',
          icon: Layers,
          status: 'completed' as const,
        },
        {
          title: 'Compute Clean Status',
          detail: 'Determines working tree status and prints branch tracking information.',
          icon: CheckCircle2,
          status: 'completed' as const,
        },
      ],
      stateSummary: `Status calculated. Working on branch "${repoState.currentBranch}".`,
    };
  }, [lastCmd, repoState]);

  return (
    <div className="rounded-xl bg-[#090D15] border-2 border-dev-border/90 p-4 shadow-xl space-y-3 font-mono text-xs select-none">
      {/* Header Bar: Command, Action Name, and Japanese Typography */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-dev-border/70">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-git-blue/20 border border-git-blue/40 text-git-blue shadow-inner">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-dev-heading uppercase tracking-wider text-[11px]">
                {processData.actionName}
              </span>
              <span className="text-[10px] text-purple-300 font-bold hidden sm:inline">
                {processData.japaneseName}
              </span>
            </div>
            <div className="text-[10px] text-dev-subtext flex items-center gap-1.5">
              <span>Executed:</span>
              <code className="text-amber-300 font-bold bg-black/50 px-1.5 py-0.2 rounded border border-dev-border/50">
                $ {lastCmd}
              </code>
            </div>
          </div>
        </div>

        {/* Live Engine Status Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-300 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>GIT ENGINE PROCESSED</span>
          </span>
        </div>
      </div>

      {/* Visual Step Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
        {processData.steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-lg bg-dev-surface/40 border border-dev-border/70 hover:border-git-blue/50 transition-all flex flex-col justify-between space-y-2 group relative overflow-hidden"
            >
              {/* Subtle Step Glow Banner */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-git-blue/20 border border-git-blue/50 text-git-blue flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </div>
                  <span className="font-bold text-[11px] text-dev-heading group-hover:text-git-blue transition-colors">
                    {step.title}
                  </span>
                </div>
                <Icon className="w-3.5 h-3.5 text-dev-subtext group-hover:text-git-blue transition-colors" />
              </div>

              <p className="text-[10px] text-dev-subtext leading-relaxed">
                {step.detail}
              </p>

              <div className="pt-1 flex items-center justify-between text-[9px] text-dev-subtext/70 border-t border-dev-border/40">
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Done
                </span>
                <span>Stage {idx + 1}/{processData.steps.length}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Present State Snapshot Bar */}
      <div className="p-2.5 rounded-lg bg-[#06090F] border border-dev-border/60 flex flex-wrap items-center justify-between gap-3 text-[10.5px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-dev-subtext">Active Branch:</span>
            <span className="font-bold text-white px-1.5 py-0.2 rounded bg-git-blue/20 border border-git-blue/40">
              🌿 {repoState.currentBranch}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-dev-subtext">Staged Index:</span>
            <span className="font-bold text-emerald-300">
              {Object.keys(repoState.stagingArea).length} files
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-dev-subtext">Total Commits:</span>
            <span className="font-bold text-amber-300">
              {repoState.commits.length} snapshots
            </span>
          </div>
        </div>

        <div className="text-[10px] text-purple-300 font-sans italic">
          {processData.stateSummary}
        </div>
      </div>
    </div>
  );
};
