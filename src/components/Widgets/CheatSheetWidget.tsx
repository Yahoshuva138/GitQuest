import React, { useState } from 'react';
import { FileText, Lock, X, Copy, Check } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { GIT_CHEATSHEET, CheatSheetEntry } from '../../data/cheatsheets';
import { playClickSound } from '../../utils/audio';

export const CheatSheetWidget: React.FC = () => {
  const { completedMissions, soundEnabled } = useGame();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const isUnlocked = completedMissions.length >= 3; // Unlocked early for good UX

  const handleOpen = () => {
    if (soundEnabled) playClickSound();
    setIsModalOpen(true);
  };

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1500);
  };

  return (
    <>
      <div className="rounded-2xl bg-[#0e1320] border-2 border-dev-border/80 p-5 shadow-lg select-none mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-dev-heading uppercase tracking-wide">
            Cheat Sheets
          </h3>
          <span className="text-[10px] font-mono text-dev-subtext">PDF / Web</span>
        </div>

        <p className="text-[11px] font-mono text-dev-subtext leading-relaxed">
          Unlock printable with Git & GitHub commands and concepts.
        </p>

        {isUnlocked ? (
          <button
            onClick={handleOpen}
            className="w-full py-2.5 rounded-xl bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-xs font-mono font-bold text-dev-heading transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-git-blue" />
            <span>Open Cheat Sheet</span>
          </button>
        ) : (
          <div
            onClick={handleOpen}
            className="p-3 rounded-xl bg-black/40 border border-dev-border/60 flex items-center gap-2.5 text-xs font-mono text-dev-subtext cursor-pointer hover:border-dev-border"
          >
            <Lock className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Unlock after Ch. 1 (Click to preview)</span>
          </div>
        )}
      </div>

      {/* Cheat Sheet Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0d121c] border-2 border-rpg-gold/70 rounded-2xl shadow-pixelGold overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-5 py-4 bg-[#141b29] border-b-2 border-rpg-gold/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-rpg-gold" />
                <h3 className="font-pixel text-xs sm:text-sm text-rpg-gold font-bold">
                  GIT & GITHUB COMMAND CHEAT SHEET
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-dev-subtext hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-dev-border/40">
              {GIT_CHEATSHEET.map((item, idx) => (
                <div
                  key={idx}
                  className="py-2.5 flex items-center justify-between gap-3 text-xs font-mono"
                >
                  <div>
                    <code className="text-git-blue font-bold text-xs">
                      {item.command}
                    </code>
                    <p className="text-dev-subtext text-[11px] mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(item.command)}
                    className="p-1.5 rounded-lg bg-dev-surface border border-dev-border text-dev-subtext hover:text-dev-heading transition-colors"
                    title="Copy command"
                  >
                    {copiedCmd === item.command ? (
                      <Check className="w-3.5 h-3.5 text-git-green" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="px-5 py-3 bg-[#141b29] border-t border-dev-border flex items-center justify-between text-xs font-mono text-dev-subtext">
              <span>{GIT_CHEATSHEET.length} Essential Commands</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-heading font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
