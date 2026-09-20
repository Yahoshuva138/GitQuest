import React, { useState } from 'react';
import {
  Wrench,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Search,
  HelpCircle,
} from 'lucide-react';
import { playClickSound } from '../../utils/audio';
import { useGame } from '../../context/GameContext';

interface DiagnosticItem {
  symptom: string;
  meaning: string;
  solution: string;
  command: string;
  japanese: string;
}

const DIAGNOSTIC_MATRIX: DiagnosticItem[] = [
  {
    symptom: 'git is not recognized as an internal or external command',
    meaning: 'Git is not installed or your terminal PATH environment variable is broken.',
    solution: 'Reinstall Git or restart your terminal / VS Code window.',
    command: 'git --version',
    japanese: '『Gitコマンド未認識エラー』',
  },
  {
    symptom: 'You run "git commit" but absolutely nothing happens',
    meaning: 'You forgot to run "git add" first. The staging area (.git/index) is completely empty.',
    solution: 'Check status, pack changes to staging, and commit again.',
    command: 'git status ; git add . ; git commit -m "Your message"',
    japanese: '『コミット無反応・ステージング未実施』',
  },
  {
    symptom: 'fatal: remote origin already exists',
    meaning: 'You tried to add a remote network link, but one is already attached to this folder.',
    solution: 'Inspect current links or update the existing origin URL.',
    command: 'git remote -v ; git remote set-url origin <new-url>',
    japanese: '『リモートorigin重複エラー』',
  },
  {
    symptom: 'error: failed to push some refs to origin',
    meaning: 'The remote GitHub repo contains commits that do not exist in your local branch.',
    solution: 'Pull and integrate remote changes first before pushing.',
    command: 'git pull origin main --rebase ; git push origin main',
    japanese: '『プッシュ拒否・リモート先行不整合』',
  },
  {
    symptom: 'fatal: not a git repository (or any of the parent directories): .git',
    meaning: 'You are running Git commands inside an uninitialized regular folder.',
    solution: 'Initialize a new repository or navigate into the correct project folder.',
    command: 'git init -b main',
    japanese: '『非Gitディレクトリ実行エラー』',
  },
];

export const TroubleshootingMatrix: React.FC = () => {
  const { soundEnabled } = useGame();
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = (cmd: string) => {
    if (soundEnabled) playClickSound();
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const filteredItems = DIAGNOSTIC_MATRIX.filter(
    (item) =>
      item.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.command.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-2xl bg-[#090D15] border-2 border-dev-border/90 p-5 shadow-2xl space-y-4 font-mono text-xs select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dev-border/70">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-dev-heading uppercase tracking-wider">
                Beginner Troubleshooting Diagnostic Matrix
              </h3>
              <span className="text-xs text-amber-300 font-bold hidden sm:inline">
                『初心者向けトラブルシューティング診断表』
              </span>
            </div>
            <p className="text-[11px] text-dev-subtext mt-0.5">
              "If you see this... It means this... Run this..." Instant diagnosis and fixes for common errors.
            </p>
          </div>
        </div>

        {/* Search filter */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-dev-subtext absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms or commands..."
            className="bg-black/60 border border-dev-border rounded-lg pl-8 pr-3 py-1.5 text-white text-[11px] focus:outline-none focus:border-amber-400 w-64"
          />
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-dev-border/80 text-[11px] text-dev-subtext uppercase">
              <th className="py-2.5 px-3 font-bold">If you see this... (Symptom)</th>
              <th className="py-2.5 px-3 font-bold">It means this... (Cause)</th>
              <th className="py-2.5 px-3 font-bold">Run this... (Fix)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dev-border/50 text-[11.5px]">
            {filteredItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-dev-surface/30 transition-colors">
                {/* Symptom */}
                <td className="py-3 px-3 text-rose-300 font-bold max-w-xs leading-snug">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div>"{item.symptom}"</div>
                      <div className="text-[10px] text-purple-300 font-normal mt-0.5">
                        {item.japanese}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Meaning */}
                <td className="py-3 px-3 text-dev-subtext font-sans max-w-sm leading-relaxed">
                  {item.meaning}
                </td>

                {/* Solution & Copy Command */}
                <td className="py-3 px-3 max-w-md">
                  <div className="flex items-center gap-2">
                    <code className="text-emerald-300 font-bold bg-black/70 px-2 py-1 rounded border border-dev-border text-[10.5px] truncate">
                      {item.command}
                    </code>
                    <button
                      onClick={() => handleCopy(item.command)}
                      className="p-1 rounded bg-dev-surface hover:bg-dev-surface/80 text-dev-subtext hover:text-white transition-colors border border-dev-border shrink-0"
                      title="Copy fix command"
                    >
                      {copiedCmd === item.command ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
