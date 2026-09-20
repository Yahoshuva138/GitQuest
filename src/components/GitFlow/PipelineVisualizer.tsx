import React, { useState } from 'react';
import {
  FolderGit2,
  FileCheck2,
  GitCommit,
  Cloud,
  ArrowRight,
  FileCode2,
  FilePlus2,
  Sparkles,
  Check,
  Search,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { GitBackgroundProcessVisualizer } from './GitBackgroundProcessVisualizer';
import { GitInternalsModal, InspectedGitObject } from './GitInternalsModal';

export const PipelineVisualizer: React.FC = () => {
  const { repoState, lastExplanation } = useGame();
  const [inspectedObject, setInspectedObject] = useState<InspectedGitObject | null>(null);

  const workingFiles = Object.values(repoState.workingDirectory);
  const stagedFiles = Object.values(repoState.stagingArea);
  const commits = repoState.commits;
  const latestCommit = commits.length > 0 ? commits[commits.length - 1] : null;
  const originRemote = repoState.remotes['origin'];
  const pushedCommitsCount = originRemote ? originRemote.commits.length : 0;

  const isZoneActive = (zone: 'working' | 'staging' | 'repo' | 'github') => {
    return lastExplanation?.affectedZones.includes(zone);
  };

  // Helper to generate realistic SHA-1 hex for simulated files
  const pseudoHash = (input: string) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `${hex}4b8b29ae775ad8c2e48c5391a8b3c901e4f208dc`.slice(0, 40);
  };

  return (
    <div className="space-y-3 font-mono text-xs select-none">
      {/* 1. Live Git Engine Background Process & Present State Space */}
      <GitBackgroundProcessVisualizer />

      {/* 2. Interactive Architecture Pipeline Visualizer */}
      <div className="dev-panel p-4 bg-dev-panel border-dev-border shadow-panel">
        {/* Title & Legend Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-dev-border">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-git-blue" />
            <h3 className="font-semibold text-xs text-dev-heading uppercase tracking-wider font-mono">
              Git Architecture Pipeline
            </h3>
            <span className="text-[10px] text-purple-300 font-bold px-2 py-0.5 rounded bg-purple-950/40 border border-purple-500/30">
              『4層データ構造パイプライン』
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-dev-subtext font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Untracked/Modified
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Staged
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> Committed
            </span>
            <span className="text-[10px] text-gray-500 italic hidden lg:inline">
              (Click any file or commit to inspect Git objects)
            </span>
          </div>
        </div>

        {/* 4 Pipeline Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {/* 1. WORKING DIRECTORY */}
          <div
            className={`dev-panel p-3 bg-dev-surface/40 flex flex-col justify-between transition-all duration-300 relative ${
              isZoneActive('working')
                ? 'border-amber-400/80 ring-2 ring-amber-400/40 bg-amber-950/10 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                : 'border-dev-border'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-bold text-dev-heading uppercase tracking-wider">
                  1. Working Tree
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-dev-panel text-dev-subtext border border-dev-border">
                  {workingFiles.length} files
                </span>
              </div>
              <div className="text-[10px] text-amber-300 font-bold mb-1.5">
                『作業ツリー』
              </div>
              <p className="text-[10.5px] text-dev-subtext mb-3 leading-snug">
                Your physical project files on disk where you write and edit code.
              </p>

              {/* Files List */}
              <div className="space-y-1.5">
                {workingFiles.length === 0 ? (
                  <div className="text-[11px] text-dev-subtext/60 italic py-2">No files</div>
                ) : (
                  workingFiles.map((file) => {
                    const isStaged = Boolean(repoState.stagingArea[file.path]);
                    return (
                      <div
                        key={file.path}
                        onClick={() =>
                          setInspectedObject({
                            type: 'blob',
                            name: file.name,
                            path: file.path,
                            content: file.content,
                            hash: pseudoHash(file.content || file.name),
                            mode: '100644',
                          })
                        }
                        title="Click to inspect underlying Git blob object & SHA-1"
                        className={`group flex items-center justify-between p-2 rounded text-xs font-mono border cursor-pointer hover:border-git-blue/60 hover:scale-[1.01] active:scale-[0.99] transition-all ${
                          isStaged
                            ? 'bg-dev-panel/40 text-dev-subtext border-dev-border/50 opacity-60'
                            : file.status === 'modified'
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                            : file.status === 'untracked'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : 'bg-dev-panel text-dev-text border-dev-border'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {file.status === 'untracked' ? (
                            <FilePlus2 className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                          ) : (
                            <FileCode2 className="w-3.5 h-3.5 shrink-0 text-dev-subtext group-hover:text-git-blue" />
                          )}
                          <span className="truncate group-hover:text-white transition-colors">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] opacity-0 group-hover:opacity-100 text-git-blue flex items-center gap-0.5 transition-opacity">
                            <Search className="w-2.5 h-2.5" /> inspect
                          </span>
                          <span className="text-[10px] uppercase font-bold shrink-0">
                            {isStaged ? 'staged' : file.status}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-dev-border/50 text-[10px] text-dev-subtext font-mono flex items-center justify-between">
              <span>Disk State</span>
              <span className="text-git-orange font-bold">git add &gt;</span>
            </div>
          </div>

          {/* Laser Transfer 1: git add */}
          <div className="hidden md:flex absolute left-[24%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex-col items-center">
            {isZoneActive('staging') ? (
              <div className="animate-packet-glide bg-gradient-to-r from-amber-500/30 to-emerald-500/30 border-2 border-git-orange text-git-orange px-2.5 py-1 rounded-full text-[10px] font-mono shadow-[0_0_15px_rgba(249,115,22,0.6)] flex items-center gap-1 font-bold">
                <Zap className="w-3 h-3 text-amber-400 animate-spin" />
                <span>BLOB STREAM</span>
              </div>
            ) : (
              <div className="bg-dev-panel border border-dev-border px-1.5 py-0.5 rounded text-[10px] font-mono text-git-orange shadow-sm">
                git add
              </div>
            )}
            <ArrowRight
              className={`w-4 h-4 mt-0.5 ${
                isZoneActive('staging') ? 'text-git-orange animate-pulse scale-125' : 'text-git-orange'
              }`}
            />
          </div>

          {/* 2. STAGING AREA (INDEX) */}
          <div
            className={`dev-panel p-3 bg-dev-surface/40 flex flex-col justify-between transition-all duration-300 relative ${
              isZoneActive('staging')
                ? 'border-emerald-400/80 ring-2 ring-emerald-400/40 bg-emerald-950/10 shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                : 'border-dev-border'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-bold text-dev-heading uppercase tracking-wider">
                  2. Staging Area
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {stagedFiles.length} ready
                </span>
              </div>
              <div className="text-[10px] text-emerald-300 font-bold mb-1.5">
                『インデックス』
              </div>
              <p className="text-[10.5px] text-dev-subtext mb-3 leading-snug">
                The binary draft cache (.git/index) preparing your next immutable snapshot.
              </p>

              {/* Staged Items */}
              <div className="space-y-1.5">
                {stagedFiles.length === 0 ? (
                  <div className="border border-dashed border-dev-border rounded p-4 text-center text-[11px] text-dev-subtext/60">
                    Staging area empty.
                    <div className="text-[10px] mt-1 text-dev-subtext/40">Run "git add &lt;file&gt;"</div>
                  </div>
                ) : (
                  stagedFiles.map((staged) => (
                    <div
                      key={staged.path}
                      onClick={() =>
                        setInspectedObject({
                          type: 'blob',
                          name: staged.path,
                          path: staged.path,
                          content: staged.content,
                          hash: pseudoHash(staged.content || staged.path),
                          mode: '100644',
                        })
                      }
                      title="Click to inspect staged blob object (.git/index entry)"
                      className="group flex items-center justify-between p-2 rounded text-xs font-mono bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 animate-stage-in shadow-sm cursor-pointer hover:border-emerald-300 hover:scale-[1.01] active:scale-[0.99] transition-all"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <FileCheck2 className="w-3.5 h-3.5 shrink-0 text-emerald-400 group-hover:text-white" />
                        <span className="truncate group-hover:text-white transition-colors">{staged.path}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 text-emerald-200 flex items-center gap-0.5 transition-opacity">
                          <Search className="w-2.5 h-2.5" /> inspect
                        </span>
                        <span className="text-[10px] uppercase font-bold text-emerald-400">staged</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-dev-border/50 text-[10px] text-dev-subtext font-mono flex items-center justify-between">
              <span>The Index (.git/index)</span>
              <span className="text-emerald-400 font-bold">git commit &gt;</span>
            </div>
          </div>

          {/* Laser Transfer 2: git commit */}
          <div className="hidden md:flex absolute left-[49%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex-col items-center">
            {isZoneActive('repo') ? (
              <div className="animate-packet-glide bg-gradient-to-r from-emerald-500/30 to-blue-500/30 border-2 border-emerald-400 text-emerald-300 px-2.5 py-1 rounded-full text-[10px] font-mono shadow-[0_0_15px_rgba(52,211,153,0.6)] flex items-center gap-1 font-bold">
                <Sparkles className="w-3 h-3 text-cyan-300 animate-spin" />
                <span>TREE & COMMIT</span>
              </div>
            ) : (
              <div className="bg-dev-panel border border-dev-border px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-400 shadow-sm">
                git commit
              </div>
            )}
            <ArrowRight
              className={`w-4 h-4 mt-0.5 ${
                isZoneActive('repo') ? 'text-emerald-400 animate-pulse scale-125' : 'text-emerald-400'
              }`}
            />
          </div>

          {/* 3. LOCAL REPOSITORY (COMMITS) */}
          <div
            className={`dev-panel p-3 bg-dev-surface/40 flex flex-col justify-between transition-all duration-300 relative ${
              isZoneActive('repo')
                ? 'border-blue-400/80 ring-2 ring-blue-400/40 bg-blue-950/10 shadow-[0_0_15px_rgba(96,165,250,0.15)]'
                : 'border-dev-border'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-bold text-dev-heading uppercase tracking-wider">
                  3. Local Repo
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  {commits.length} commits
                </span>
              </div>
              <div className="text-[10px] text-blue-300 font-bold mb-1.5">
                『ローカル・リポジトリ』
              </div>
              <p className="text-[10.5px] text-dev-subtext mb-3 leading-snug">
                Permanent immutable snapshots stored inside your local .git database.
              </p>

              {/* Commits summary */}
              <div className="space-y-1.5">
                {latestCommit ? (
                  <div
                    onClick={() =>
                      setInspectedObject({
                        type: 'commit',
                        name: latestCommit.message,
                        hash: latestCommit.hash,
                        author: latestCommit.author,
                        parentHashes: latestCommit.parentHashes,
                      })
                    }
                    title="Click to inspect Git commit object payload"
                    className="group p-2.5 rounded bg-blue-500/10 border border-blue-500/30 text-xs font-mono cursor-pointer hover:border-blue-400 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-amber-400 font-bold group-hover:text-amber-300 flex items-center gap-1">
                        <GitCommit className="w-3.5 h-3.5" />
                        {latestCommit.shortHash}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 text-blue-300 flex items-center gap-0.5 transition-opacity">
                          <Search className="w-2.5 h-2.5" /> inspect
                        </span>
                        <span className="text-[10px] px-1 rounded bg-dev-surface text-dev-subtext border border-dev-border">
                          HEAD -&gt; {latestCommit.branch}
                        </span>
                      </div>
                    </div>
                    <p className="text-dev-heading font-medium truncate group-hover:text-white transition-colors">
                      {latestCommit.message}
                    </p>
                    <p className="text-[10px] text-dev-subtext mt-1">{latestCommit.author.split('<')[0]}</p>
                  </div>
                ) : (
                  <div className="border border-dashed border-dev-border rounded p-4 text-center text-[11px] text-dev-subtext/60">
                    No commits yet.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-dev-border/50 text-[10px] text-dev-subtext font-mono flex items-center justify-between">
              <span>Branch: {repoState.currentBranch}</span>
              <span className="text-blue-400 font-bold">git push &gt;</span>
            </div>
          </div>

          {/* Laser Transfer 3: git push */}
          <div className="hidden md:flex absolute left-[74%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex-col items-center">
            {isZoneActive('github') ? (
              <div className="animate-packet-glide bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-2 border-purple-400 text-purple-300 px-2.5 py-1 rounded-full text-[10px] font-mono shadow-[0_0_15px_rgba(192,132,252,0.6)] flex items-center gap-1 font-bold">
                <Cloud className="w-3 h-3 text-purple-300 animate-bounce" />
                <span>PACKFILE STREAM</span>
              </div>
            ) : (
              <div className="bg-dev-panel border border-dev-border px-1.5 py-0.5 rounded text-[10px] font-mono text-blue-400 shadow-sm">
                git push
              </div>
            )}
            <ArrowRight
              className={`w-4 h-4 mt-0.5 ${
                isZoneActive('github') ? 'text-purple-400 animate-pulse scale-125' : 'text-blue-400'
              }`}
            />
          </div>

          {/* 4. GITHUB (REMOTE) */}
          <div
            className={`dev-panel p-3 bg-dev-surface/40 flex flex-col justify-between transition-all duration-300 relative ${
              isZoneActive('github')
                ? 'border-purple-400/80 ring-2 ring-purple-400/40 bg-purple-950/10 shadow-[0_0_15px_rgba(192,132,252,0.15)]'
                : 'border-dev-border'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-bold text-dev-heading uppercase tracking-wider">
                  4. GitHub Cloud
                </span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                    originRemote
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      : 'bg-dev-surface text-dev-subtext border-dev-border'
                  }`}
                >
                  {originRemote ? 'origin connected' : 'no remote'}
                </span>
              </div>
              <div className="text-[10px] text-purple-300 font-bold mb-1.5">
                『リモート・クラウド』
              </div>
              <p className="text-[10.5px] text-dev-subtext mb-3 leading-snug">
                Remote hosting for team collaboration, code reviews, and CI/CD pipelines.
              </p>

              <div className="space-y-1.5">
                {originRemote ? (
                  <div
                    onClick={() =>
                      setInspectedObject({
                        type: 'ref',
                        name: 'refs/remotes/origin/main',
                        hash: originRemote.branches['main'] || '7a8b9c1029384756102938475610293847561029',
                      })
                    }
                    title="Click to inspect remote reference pointer"
                    className="group p-2.5 rounded bg-purple-500/10 border border-purple-500/30 text-xs font-mono cursor-pointer hover:border-purple-400 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-purple-300 font-bold truncate group-hover:text-purple-200">
                        origin/main
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 text-purple-200 flex items-center gap-0.5 transition-opacity">
                          <Search className="w-2.5 h-2.5" /> inspect
                        </span>
                        <span className="text-[10px] text-dev-subtext">{pushedCommitsCount} synced</span>
                      </div>
                    </div>
                    <p className="text-[10.5px] text-dev-subtext truncate">{originRemote.url}</p>
                  </div>
                ) : (
                  <div className="border border-dashed border-dev-border rounded p-4 text-center text-[11px] text-dev-subtext/60">
                    Remote not linked.
                    <div className="text-[10px] mt-1 text-dev-subtext/40">
                      Use "git remote add origin ..."
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-dev-border/50 text-[10px] text-dev-subtext font-mono flex items-center justify-between">
              <span>Cloud State</span>
              <span className="text-purple-400 font-bold">&lt; git pull</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Object Inspector Modal */}
      <GitInternalsModal object={inspectedObject} onClose={() => setInspectedObject(null)} />
    </div>
  );
};
