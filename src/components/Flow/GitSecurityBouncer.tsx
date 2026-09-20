import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  DoorClosed,
  Check,
  X,
  AlertTriangle,
  Key,
  FileCode,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { playClickSound, playErrorSound, playSuccessSound } from '../../utils/audio';
import { useGame } from '../../context/GameContext';

const DEFAULT_IGNORED_PATTERNS = [
  { pattern: '.env', type: 'Secrets & API Keys', reason: 'High Risk: API keys, DB passwords, JWT secrets' },
  { pattern: 'node_modules/', type: 'Heavy Dependencies', reason: 'Performance: Thousands of third-party packages' },
  { pattern: '*.log', type: 'Runtime Logs', reason: 'Noise: Temporary debug and error logs' },
  { pattern: 'build/', type: 'Compiled Artifacts', reason: 'Redundant: Can be recompiled anytime' },
  { pattern: '.DS_Store', type: 'OS Metadata', reason: 'Pollution: Mac desktop layout cache' },
];

export const GitSecurityBouncer: React.FC = () => {
  const { soundEnabled } = useGame();
  const [testFileName, setTestFileName] = useState('');
  const [bouncerVerdict, setBouncerVerdict] = useState<{
    status: 'admitted' | 'blocked' | null;
    reason: string;
  }>({ status: null, reason: '' });

  const handleTestFile = (e: React.FormEvent) => {
    e.preventDefault();
    const input = testFileName.trim().toLowerCase();
    if (!input) return;

    // Check against ignored patterns
    const isIgnored =
      input.includes('.env') ||
      input.endsWith('.log') ||
      input.includes('node_modules') ||
      input.startsWith('build/') ||
      input.includes('.ds_store') ||
      input.includes('dist/') ||
      input.includes('credentials') ||
      input.includes('secret');

    if (isIgnored) {
      if (soundEnabled) playErrorSound();
      setBouncerVerdict({
        status: 'blocked',
        reason: `BLOCKED BY .gitignore! "${input}" matches ignored patterns and is turned away at the door.`,
      });
    } else {
      if (soundEnabled) playSuccessSound();
      setBouncerVerdict({
        status: 'admitted',
        reason: `ADMITTED TO REPO! "${input}" is safe source code and enters the working tree.`,
      });
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs select-none">
      {/* 1. VIP Bouncer Section */}
      <div className="rounded-2xl bg-[#090D15] border-2 border-dev-border/90 p-5 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-dev-border/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-dev-heading uppercase tracking-wider">
                  The .gitignore File: Repository Security Bouncer
                </h3>
                <span className="text-xs text-purple-300 font-bold hidden sm:inline">
                  『.gitignore：リポジトリの用心棒』
                </span>
              </div>
              <p className="text-[11px] text-dev-subtext mt-0.5">
                "A simple text file that tells Git exactly which files and folders to pretend do not exist."
              </p>
            </div>
          </div>
        </div>

        {/* Bouncer VIP Graphic & Interactive Door Check */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Left: What Gets Blocked */}
          <div className="p-4 rounded-xl bg-[#06090F] border border-dev-border/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-dev-heading uppercase flex items-center gap-1.5">
                <DoorClosed className="w-4 h-4 text-emerald-400" />
                <span>The Bouncer's Blacklist (.gitignore Rules)</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">VIP Protection</span>
            </div>

            <div className="space-y-2">
              {DEFAULT_IGNORED_PATTERNS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-dev-surface/30 border border-dev-border/50 flex items-center justify-between text-[11px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center text-[10px] font-bold">
                      ✕
                    </span>
                    <code className="text-amber-300 font-bold">{item.pattern}</code>
                  </div>
                  <span className="text-dev-subtext text-[10px]">{item.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Door Tester */}
          <div className="p-4 rounded-xl bg-[#06090F] border border-dev-border/80 flex flex-col justify-between space-y-3">
            <div>
              <span className="font-bold text-xs text-dev-heading uppercase flex items-center gap-1.5 mb-1">
                <Key className="w-4 h-4 text-git-blue" />
                <span>Test File Admittance</span>
              </span>
              <p className="text-[10.5px] text-dev-subtext">
                Type any filename below to test whether the .gitignore bouncer lets it in or blocks it:
              </p>

              <form onSubmit={handleTestFile} className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={testFileName}
                  onChange={(e) => setTestFileName(e.target.value)}
                  placeholder="e.g. .env, app.js, debug.log"
                  className="flex-1 bg-black/60 border border-dev-border rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-git-blue"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-git-blue/20 hover:bg-git-blue/30 text-git-blue border border-git-blue/40 font-bold transition-all text-xs"
                >
                  Test Bouncer
                </button>
              </form>
            </div>

            {/* Verdict Display */}
            {bouncerVerdict.status && (
              <div
                className={`p-3 rounded-xl border flex items-start gap-2.5 animate-fadeIn ${
                  bouncerVerdict.status === 'blocked'
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                }`}
              >
                {bouncerVerdict.status === 'blocked' ? (
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <span className="text-[11px] leading-relaxed">{bouncerVerdict.reason}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. RED ALERT: Sensitive Information Warning Card */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-950/40 via-red-950/30 to-black border-2 border-rose-500/60 p-5 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-400 animate-pulse">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-rose-300 uppercase tracking-wide">
                RED ALERT: Never Commit Sensitive Information
              </span>
              <span className="text-xs text-rose-400 font-bold">
                『緊急警告：機密情報の保護』
              </span>
            </div>
            <p className="text-[11px] text-rose-200/80 mt-0.5">
              API keys, passwords, private tokens, and cloud credentials must NEVER enter Git.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-[11px]">
          <div className="p-3 rounded-lg bg-black/60 border border-rose-500/30 space-y-1">
            <span className="font-bold text-rose-300">The Rule:</span>
            <p className="text-dev-subtext leading-relaxed">
              NEVER commit passwords, API keys, private tokens, or cloud credentials.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-rose-500/30 space-y-1">
            <span className="font-bold text-rose-300">The Reality:</span>
            <p className="text-dev-subtext leading-relaxed">
              Automated hacker bots scan GitHub 24/7/365 within milliseconds of public pushes.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-rose-500/30 space-y-1">
            <span className="font-bold text-rose-300">The Myth Busted:</span>
            <p className="text-dev-subtext leading-relaxed">
              "My repo is private, so it's safe." FALSE! Treat all Git history as potentially public.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
