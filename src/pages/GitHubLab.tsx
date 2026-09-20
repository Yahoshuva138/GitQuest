import React from 'react';
import { Cloud, GitPullRequest, ArrowRightLeft, ShieldCheck } from 'lucide-react';
import { GitHubView } from '../components/GitHubSimulator/GitHubView';
import { Terminal } from '../components/Terminal/Terminal';

export const GitHubLab: React.FC = () => {
  return (
    <div className="space-y-4 max-w-6xl mx-auto font-mono text-xs animate-stage-in">
      {/* Header */}
      <div className="dev-panel p-5 bg-dev-panel border-dev-border shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-git-purple mb-1">
            <Cloud className="w-4 h-4" />
            <span className="text-[11px] uppercase font-bold tracking-wider">
              GITHUB COLLABORATION LAB
            </span>
          </div>
          <h1 className="text-xl font-bold text-dev-heading font-sans">
            Remote Repositories, PRs &amp; CI/CD
          </h1>
          <p className="text-xs text-dev-subtext font-sans mt-0.5">
            Experience the real cloud collaboration lifecycle: issues, remote push/pull, pull request code reviews, and automated CI pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-dev-subtext">
          <span className="px-2 py-1 rounded bg-dev-surface border border-dev-border">
            Educational Simulation
          </span>
        </div>
      </div>

      {/* GitHub Interface Replica */}
      <GitHubView />

      {/* Terminal */}
      <Terminal
        quickSuggestions={[
          'git remote -v',
          'git remote add origin https://github.com/team/gitquest.git',
          'git push origin main',
          'git pull origin main',
        ]}
      />
    </div>
  );
};
