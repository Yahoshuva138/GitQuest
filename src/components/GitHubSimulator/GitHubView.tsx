import React, { useState } from 'react';
import {
  Code,
  GitPullRequest,
  AlertCircle,
  PlayCircle,
  Settings,
  GitBranch,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  FileCode2,
  FolderGit2,
  Copy,
  Check,
  Sparkles,
  GitMerge,
  Eye,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

type GitHubTab = 'code' | 'issues' | 'pull-requests' | 'actions' | 'settings';

export const GitHubView: React.FC = () => {
  const { repoState, executeCommand } = useGame();
  const [activeTab, setActiveTab] = useState<GitHubTab>('pull-requests');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [prStatus, setPrStatus] = useState<'open' | 'approved' | 'merged'>('open');
  const [ciStatus, setCiStatus] = useState<'idle' | 'running' | 'failed' | 'passed'>('failed');
  const [showLogModal, setShowLogModal] = useState(false);

  const cloneUrl = 'https://github.com/team/gitquest.git';

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleMergePR = () => {
    setPrStatus('merged');
    executeCommand(`git merge feature/profile-card`);
  };

  const handleApprovePR = () => {
    setPrStatus('approved');
  };

  const handleRerunCI = () => {
    setCiStatus('running');
    setTimeout(() => {
      // If score calculation fix is in commits, CI passes!
      const hasFix = repoState.commits.some((c) => c.message.toLowerCase().includes('fix syntax'));
      setCiStatus(hasFix ? 'passed' : 'failed');
    }, 1500);
  };

  return (
    <div className="dev-panel bg-dev-panel border-dev-border shadow-panel overflow-hidden font-mono text-xs">
      {/* Educational Banner */}
      <div className="bg-dev-surface/80 px-4 py-2 border-b border-dev-border flex items-center justify-between text-dev-subtext text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-git-blue animate-pulse" />
          <span className="font-semibold text-dev-heading">SIMULATED GITHUB (EDUCATIONAL LAB)</span>
          <span className="text-dev-subtext/70 hidden sm:inline">— Realistic team collaboration simulator</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-dev-panel border border-dev-border text-dev-subtext">
          Not connected to external GitHub
        </span>
      </div>

      {/* Repo Header */}
      <div className="p-4 bg-dev-panel border-b border-dev-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <FolderGit2 className="w-5 h-5 text-dev-subtext" />
            <span className="text-git-blue hover:underline cursor-pointer">team</span>
            <span className="text-dev-subtext">/</span>
            <span className="font-bold text-dev-heading cursor-pointer">gitquest</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-dev-border bg-dev-surface text-dev-subtext ml-2">
              Public
            </span>
          </div>

          {/* Quick Clone box */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center bg-[#090D12] border border-dev-border rounded px-2.5 py-1 text-dev-subtext text-[11px]">
              <span className="mr-2 text-dev-heading">HTTPS</span>
              <span className="text-dev-subtext truncate max-w-[200px]">{cloneUrl}</span>
              <button onClick={handleCopy} className="ml-2 text-dev-text hover:text-dev-heading" title="Copy URL">
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* GitHub Navigation Tabs */}
        <div className="flex items-center gap-1 mt-4 border-b border-dev-border -mb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'code'
                ? 'border-git-orange text-dev-heading font-semibold'
                : 'border-transparent text-dev-subtext hover:text-dev-text'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>

          <button
            onClick={() => setActiveTab('issues')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'issues'
                ? 'border-git-orange text-dev-heading font-semibold'
                : 'border-transparent text-dev-subtext hover:text-dev-text'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Issues</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-dev-surface border border-dev-border">3</span>
          </button>

          <button
            onClick={() => setActiveTab('pull-requests')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'pull-requests'
                ? 'border-git-orange text-dev-heading font-semibold'
                : 'border-transparent text-dev-subtext hover:text-dev-text'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Pull Requests</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-git-blue/20 text-git-blue border border-git-blue/40">
              1
            </span>
          </button>

          <button
            onClick={() => setActiveTab('actions')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'actions'
                ? 'border-git-orange text-dev-heading font-semibold'
                : 'border-transparent text-dev-subtext hover:text-dev-text'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Actions (CI/CD)</span>
            {ciStatus === 'failed' && <span className="w-2 h-2 rounded-full bg-rose-500" />}
            {ciStatus === 'passed' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-4">
        {/* 1. CODE TAB */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-dev-border">
              <div className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-dev-subtext" />
                <span className="font-bold text-dev-heading">main</span>
                <span className="text-dev-subtext">·</span>
                <span className="text-dev-subtext">{repoState.commits.length} commits</span>
              </div>
            </div>

            {/* File Table */}
            <div className="rounded-lg border border-dev-border overflow-hidden">
              <div className="bg-dev-surface/70 px-3 py-2 border-b border-dev-border text-[11px] text-dev-subtext flex items-center justify-between">
                <span>Dev Learner committed "{repoState.commits[repoState.commits.length - 1]?.message || 'Initial commit'}"</span>
                <span>Just now</span>
              </div>
              <div className="divide-y divide-dev-border/60 bg-[#0B0F14]">
                {Object.values(repoState.workingDirectory).map((file) => (
                  <div key={file.path} className="px-3 py-2 flex items-center justify-between hover:bg-dev-surface/30">
                    <div className="flex items-center gap-2 text-dev-heading">
                      <FileCode2 className="w-4 h-4 text-dev-subtext" />
                      <span>{file.name}</span>
                    </div>
                    <span className="text-dev-subtext text-[11px]">Latest update</span>
                  </div>
                ))}
              </div>
            </div>

            {/* README Preview */}
            <div className="rounded-lg border border-dev-border p-4 bg-[#090D12]">
              <div className="text-xs font-bold text-dev-heading border-b border-dev-border pb-2 mb-2 flex items-center gap-2">
                <span>README.md</span>
              </div>
              <p className="text-xs text-dev-text leading-relaxed">
                # GitQuest Interactive Project<br />
                Welcome to the official repository. Learn Git and GitHub by building and reviewing real pull requests.
              </p>
            </div>
          </div>
        )}

        {/* 2. ISSUES TAB */}
        {activeTab === 'issues' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-dev-border">
              <span className="text-dev-heading font-bold">Team Backlog</span>
              <span className="text-xs text-dev-subtext">3 open issues</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-lg border border-dev-border bg-dev-surface/30 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-dev-heading hover:text-git-blue cursor-pointer">
                    #42 Add dark mode toggle to navigation
                  </h4>
                  <p className="text-[11px] text-dev-subtext mt-0.5">
                    Opened by <b>Maya (Frontend)</b> · Assigned to <b>You</b>
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-dev-border bg-dev-surface/30 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-dev-heading hover:text-git-blue cursor-pointer">
                    #43 Fix navbar collision on small screens
                  </h4>
                  <p className="text-[11px] text-dev-subtext mt-0.5">
                    Opened by <b>Arjun (Backend)</b> · Priority: High
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-dev-border bg-dev-surface/30 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-dev-heading hover:text-git-blue cursor-pointer">
                    #44 Refactor user scoring service
                  </h4>
                  <p className="text-[11px] text-dev-subtext mt-0.5">
                    Opened by <b>Sam (Reviewer)</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. PULL REQUESTS TAB */}
        {activeTab === 'pull-requests' && (
          <div className="space-y-4">
            {/* PR Header */}
            <div className="p-4 rounded-lg border border-dev-border bg-[#0B0F14] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                    prStatus === 'merged'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : prStatus === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-git-blue/20 text-git-blue border-git-blue/40'
                  }`}>
                    <GitPullRequest className="w-3.5 h-3.5" />
                    {prStatus === 'merged' ? 'Merged' : prStatus === 'approved' ? 'Approved' : 'Open'}
                  </span>
                  <h3 className="font-bold text-dev-heading text-sm">
                    PR #18: feat: add user profile card
                  </h3>
                </div>
                <div className="text-[11px] text-dev-subtext">
                  <span className="text-dev-heading font-semibold">Maya</span> wants to merge 1 commit into <code className="text-git-blue">main</code> from <code className="text-git-blue">feature/profile-card</code>
                </div>
              </div>

              {/* Reviewer Section */}
              <div className="p-3 rounded bg-dev-surface/40 border border-dev-border space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-git-purple/20 text-git-purple font-bold flex items-center justify-center text-[10px]">
                      S
                    </div>
                    <span className="font-bold text-dev-heading">Sam (Reviewer)</span>
                    <span className="text-dev-subtext">commented 2 hours ago</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Changes look clean
                  </span>
                </div>
                <p className="text-xs text-dev-text italic pl-7">
                  "Nice work Maya! The CSS is responsive and the avatar styling looks sharp. Ready to ship."
                </p>
              </div>

              {/* Diffs Preview */}
              <div className="rounded border border-dev-border overflow-hidden">
                <div className="bg-dev-surface px-3 py-1.5 border-b border-dev-border flex items-center justify-between text-[11px]">
                  <span className="font-bold text-dev-heading">profile.html</span>
                  <span className="text-emerald-400">+28 lines</span>
                </div>
                <pre className="p-3 bg-[#090D12] text-[11px] leading-relaxed overflow-x-auto text-dev-text">
                  <span className="text-emerald-400">+ &lt;div class="profile-card"&gt;</span>{'\n'}
                  <span className="text-emerald-400">+   &lt;img src="/avatar.png" alt="Avatar" /&gt;</span>{'\n'}
                  <span className="text-emerald-400">+   &lt;h3&gt;Developer Profile&lt;/h3&gt;</span>{'\n'}
                  <span className="text-emerald-400">+   &lt;p&gt;Status: Ready to Ship&lt;/p&gt;</span>{'\n'}
                  <span className="text-emerald-400">+ &lt;/div&gt;</span>
                </pre>
              </div>

              {/* PR Action Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-dev-border">
                <div className="text-[11px] text-dev-subtext">
                  {prStatus === 'open' && 'Review the diff and approve or merge.'}
                  {prStatus === 'approved' && 'Changes approved! Merge into main when ready.'}
                  {prStatus === 'merged' && 'PR successfully merged and closed.'}
                </div>

                <div className="flex items-center gap-2">
                  {prStatus === 'open' && (
                    <button onClick={handleApprovePR} className="dev-button">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Approve Changes
                    </button>
                  )}
                  {prStatus !== 'merged' && (
                    <button onClick={handleMergePR} className="dev-button-primary">
                      <GitMerge className="w-3.5 h-3.5" /> Squash and Merge
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. ACTIONS (CI/CD) TAB */}
        {activeTab === 'actions' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-dev-border">
              <div>
                <h3 className="font-bold text-dev-heading text-xs uppercase tracking-wider">
                  CI/CD Pipeline: GitHub Actions
                </h3>
                <p className="text-[11px] text-dev-subtext mt-0.5">
                  Automated build, test, and deploy workflow running on commit pushes.
                </p>
              </div>
              <button
                onClick={handleRerunCI}
                disabled={ciStatus === 'running'}
                className="dev-button-accent"
              >
                {ciStatus === 'running' ? 'Running CI...' : 'Re-run Workflow'}
              </button>
            </div>

            {/* Pipeline Stage Visualizer */}
            <div className="p-4 rounded-lg bg-[#0B0F14] border border-dev-border space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-dev-heading">
                <span>Workflow: .github/workflows/deploy.yml</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                  ciStatus === 'passed'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : ciStatus === 'running'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  Status: {ciStatus.toUpperCase()}
                </span>
              </div>

              {/* Step Sequence */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {/* 1. Checkout */}
                <div className="p-3 rounded border border-dev-border bg-dev-surface/40 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[11px]">1. Checkout</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-dev-subtext">actions/checkout@v4</span>
                </div>

                {/* 2. Dependencies */}
                <div className="p-3 rounded border border-dev-border bg-dev-surface/40 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[11px]">2. Install</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-dev-subtext">npm ci</span>
                </div>

                {/* 3. Tests (Fails or Passes) */}
                <div className={`p-3 rounded border flex flex-col justify-between cursor-pointer ${
                  ciStatus === 'passed'
                    ? 'border-emerald-500/50 bg-emerald-950/20'
                    : ciStatus === 'running'
                    ? 'border-amber-500/50 bg-amber-950/20 animate-pulse'
                    : 'border-rose-500/50 bg-rose-950/20'
                }`}
                onClick={() => setShowLogModal(true)}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[11px]">3. Test Suite</span>
                    {ciStatus === 'passed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : ciStatus === 'running' ? (
                      <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  <span className="text-[10px] text-dev-subtext">npm test (Click log)</span>
                </div>

                {/* 4. Build */}
                <div className={`p-3 rounded border bg-dev-surface/40 flex flex-col justify-between ${
                  ciStatus === 'passed' ? 'border-dev-border' : 'border-dev-border/50 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[11px]">4. Build</span>
                    {ciStatus === 'passed' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <span className="text-[10px] text-dev-subtext">npm run build</span>
                </div>

                {/* 5. Deploy */}
                <div className={`p-3 rounded border bg-dev-surface/40 flex flex-col justify-between ${
                  ciStatus === 'passed' ? 'border-dev-border' : 'border-dev-border/50 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[11px]">5. Deploy</span>
                    {ciStatus === 'passed' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <span className="text-[10px] text-dev-subtext">Cloud Run / Prod</span>
                </div>
              </div>

              {/* Log preview */}
              {ciStatus === 'failed' && (
                <div className="p-3 rounded bg-rose-950/30 border border-rose-500/40 text-rose-200 text-xs font-mono space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" /> Error log from Step 3 (Test Suite):
                  </div>
                  <pre className="text-[11px] text-rose-300/90 whitespace-pre-wrap pl-5">
                    SyntaxError: Unexpected end of input in app.js:3{'\n'}
                    &gt; calculateScore(points) missing closing brace {"'}'"}{'\n'}
                    Tests failed with exit code 1. Deployment aborted.
                  </pre>
                  <p className="text-[11px] text-dev-subtext pt-1">
                    💡 <b>How to fix:</b> Fix the syntax error in app.js, stage it, commit, and push to turn the build green!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
