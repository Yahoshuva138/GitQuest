import React from 'react';
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
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const PipelineVisualizer: React.FC = () => {
  const { repoState, lastExplanation } = useGame();

  const workingFiles = Object.values(repoState.workingDirectory);
  const stagedFiles = Object.values(repoState.stagingArea);
  const commits = repoState.commits;
  const latestCommit = commits.length > 0 ? commits[commits.length - 1] : null;
  const originRemote = repoState.remotes['origin'];
  const pushedCommitsCount = originRemote ? originRemote.commits.length : 0;

  const isZoneActive = (zone: 'working' | 'staging' | 'repo' | 'github') => {
    return lastExplanation?.affectedZones.includes(zone);
  };

  return (
    <div className="dev-panel p-4 bg-dev-panel border-dev-border shadow-panel">
      {/* Title & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-dev-border">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-git-blue" />
          <h3 className="font-semibold text-xs text-dev-heading uppercase tracking-wider font-mono">
            Git Architecture Pipeline
          </h3>
          <span className="text-[10px] text-dev-subtext font-mono px-2 py-0.5 rounded bg-dev-surface border border-dev-border">
            Live Mental Model
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
        </div>
      </div>

      {/* 4 Pipeline Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {/* 1. WORKING DIRECTORY */}
        <div
          className={`dev-panel p-3 bg-dev-surface/40 flex flex-col justify-between transition-all duration-300 ${
            isZoneActive('working') ? 'border-amber-400/80 ring-1 ring-amber-400/50' : 'border-dev-border'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-dev-heading uppercase tracking-wider">
                1. Working Directory
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-dev-panel text-dev-subtext border border-dev-border">
                {workingFiles.length} files
              </span>
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
                      className={`flex items-center justify-between p-2 rounded text-xs font-mono border transition-all ${
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
                          <FileCode2 className="w-3.5 h-3.5 shrink-0 text-dev-subtext" />
                        )}
                        <span className="truncate">{file.name}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold shrink-0">
                        {isStaged ? 'staged' : file.status}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-dev-border/50 text-[10px] text-dev-subtext font-mono flex items-center justify-between">
            <span>Disk State</span>
            <span className="text-git-orange">git add &gt;</span>
          </div>
        </div>

        {/* Arrow 1: git add */}
        <div className="hidden md:flex absolute left-[24%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex-col items-center">
          {isZoneActive('staging') ? (
            <div className="animate-packet-glide bg-git-orange/25 border border-git-orange text-git-orange px-2 py-0.5 rounded text-[10px] font-mono shadow-glow flex items-center gap-1">
              <span>📄</span>
              <span>git add</span>
            </div>
          ) : (
            <div className="bg-dev-panel border border-dev-border px-1.5 py-0.5 rounded text-[10px] font-mono text-git-orange shadow-sm">
              git add
            </div>
          )}
          <ArrowRight className={`w-4 h-4 mt-0.5 ${isZoneActive('staging') ? 'text-git-orange animate-pulse' : 'text-git-orange'}`} />
        </div>

        {/* 2. STAGING AREA (INDEX) */}
        <div
          className={`dev-panel p-3 bg-dev-surface/40 flex flex-col justify-between transition-all duration-300 ${
            isZoneActive('staging') ? 'border-emerald-400/80 ring-1 ring-emerald-400/50' : 'border-dev-border'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-dev-heading uppercase tracking-wider">
                2. Staging Area
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {stagedFiles.length} ready
              </span>
            </div>
            <p className="text-[10.5px] text-dev-subtext mb-3 leading-snug">
              The draft table where you prepare what belongs in your next snapshot.
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
                    className="flex items-center justify-between p-2 rounded text-xs font-mono bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 animate-stage-in shadow-sm"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <FileCheck2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                      <span className="truncate">{staged.path}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400">staged</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-dev-border/50 text-[10px] text-dev-subtext font-mono flex items-center justify-between">
            <span>The Index</span>
            <span className="text-emerald-400">git commit &gt;</span>
          </div>
        </div>

        {/* Arrow 2: git commit */}
        <div className="hidden md:flex absolute left-[49%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex-col items-center">
          {isZoneActive('repo') ? (
            <div className="animate-packet-glide bg-emerald-500/25 border border-emerald-400 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-mono shadow-glow flex items-center gap-1">
              <span>●</span>
              <span>git commit</span>
            </div>
          ) : (
            <div className="bg-dev-panel border border-dev-border px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-400 shadow-sm">
              git commit
            </div>
          )}
          <ArrowRight className={`w-4 h-4 mt-0.5 ${isZoneActive('repo') ? 'text-emerald-400 animate-pulse' : 'text-emerald-400'}`} />
        </div>

        {/* 3. LOCAL REPOSITORY (COMMITS) */}
        <div
          className={`dev-panel p-3 bg-dev-surface/40 flex flex-col justify-between transition-all duration-300 ${
            isZoneActive('repo') ? 'border-blue-400/80 ring-1 ring-blue-400/50' : 'border-dev-border'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-dev-heading uppercase tracking-wider">
                3. Local Repo
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {commits.length} commits
              </span>
            </div>
            <p className="text-[10.5px] text-dev-subtext mb-3 leading-snug">
              Permanent immutable snapshots stored inside your local .git database.
            </p>

            {/* Commits summary */}
            <div className="space-y-1.5">
              {latestCommit ? (
                <div className="p-2.5 rounded bg-blue-500/10 border border-blue-500/30 text-xs font-mono">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-amber-400 font-bold">{latestCommit.shortHash}</span>
                    <span className="text-[10px] px-1 rounded bg-dev-surface text-dev-subtext border border-dev-border">
                      HEAD -&gt; {latestCommit.branch}
                    </span>
                  </div>
                  <p className="text-dev-heading font-medium truncate">{latestCommit.message}</p>
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
            <span className="text-blue-400">git push &gt;</span>
          </div>
        </div>

        {/* Arrow 3: git push */}
        <div className="hidden md:flex absolute left-[74%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex-col items-center">
          {isZoneActive('github') ? (
            <div className="animate-packet-glide bg-purple-500/25 border border-purple-400 text-purple-300 px-2 py-0.5 rounded text-[10px] font-mono shadow-glow flex items-center gap-1">
              <span>☁️</span>
              <span>git push</span>
            </div>
          ) : (
            <div className="bg-dev-panel border border-dev-border px-1.5 py-0.5 rounded text-[10px] font-mono text-blue-400 shadow-sm">
              git push
            </div>
          )}
          <ArrowRight className={`w-4 h-4 mt-0.5 ${isZoneActive('github') ? 'text-purple-400 animate-pulse' : 'text-blue-400'}`} />
        </div>

        {/* 4. GITHUB (REMOTE) */}
        <div
          className={`dev-panel p-3 bg-dev-surface/40 flex flex-col justify-between transition-all duration-300 ${
            isZoneActive('github') ? 'border-purple-400/80 ring-1 ring-purple-400/50' : 'border-dev-border'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
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
            <p className="text-[10.5px] text-dev-subtext mb-3 leading-snug">
              Remote hosting for team collaboration, code reviews, and CI/CD pipelines.
            </p>

            <div className="space-y-1.5">
              {originRemote ? (
                <div className="p-2.5 rounded bg-purple-500/10 border border-purple-500/30 text-xs font-mono">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-purple-300 font-bold truncate">origin/main</span>
                    <span className="text-[10px] text-dev-subtext">{pushedCommitsCount} synced</span>
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
            <span className="text-purple-400">&lt; git pull</span>
          </div>
        </div>
      </div>
    </div>
  );
};
