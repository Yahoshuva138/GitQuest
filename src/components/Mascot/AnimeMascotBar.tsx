import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, ChevronRight, HelpCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { playClickSound } from '../../utils/audio';

export const AnimeMascotBar: React.FC = () => {
  const { soundEnabled } = useGame();
  const [isQAModalOpen, setIsQAModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const faqList = [
    {
      q: 'How do I undo my last commit without losing changes?',
      a: 'Run `git reset --soft HEAD~1`. This undoes the commit but leaves all your modified files in the staging area ready to re-commit!',
    },
    {
      q: 'What is the difference between git merge and git rebase?',
      a: '`git merge` creates a new merge commit combining two histories (preserving the true chronological order). `git rebase` rewrites your commits on top of the target branch tip (creating a linear, clean history).',
    },
    {
      q: 'What is a "Detached HEAD"?',
      a: 'A detached HEAD means Git has checked out a specific commit hash directly rather than a branch pointer. Any commits made here will be orphaned unless you create a branch with `git switch -c new-branch`!',
    },
    {
      q: 'Why should I use git switch instead of git checkout?',
      a: 'Historically, `git checkout` did two completely different things: switching branches and discarding file changes. In Git 2.23+, `git switch` was introduced solely for branches, while `git restore` handles files.',
    },
    {
      q: 'How do I fix merge conflicts safely?',
      a: 'Look for `<<<<<<< HEAD` (your version) and `>>>>>>> branch` (incoming). Edit the file to keep the desired code, delete all marker lines, save, and run `git add <file>` followed by `git commit`!',
    },
  ];

  const handleOpen = () => {
    if (soundEnabled) playClickSound();
    setIsQAModalOpen(true);
  };

  return (
    <>
      {/* Floating Bottom Bar - Exact match to user reference image */}
      <div className="fixed bottom-3 inset-x-0 z-40 max-w-2xl mx-auto px-4 pointer-events-none">
        <div className="pointer-events-auto p-2.5 sm:p-3 rounded-2xl bg-[#0e1322]/95 border-2 border-rpg-gold/60 shadow-pixelGold backdrop-blur-md flex items-center justify-between gap-3 select-none">
          {/* Mascot & Prompt */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-git-blue/30 to-purple-600/30 border border-git-blue/50 flex items-center justify-center text-xl shrink-0 shadow-sm animate-bounce">
              🦉
            </div>
            <span className="text-xs sm:text-sm font-sans font-medium text-dev-heading line-clamp-1">
              Want to learn more about Git & GitHub?
            </span>
          </div>

          {/* Ask me anything Button (Blue pill button matching reference image) */}
          <button
            onClick={handleOpen}
            className="px-3.5 py-1.5 rounded-xl bg-git-blue hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask me anything</span>
          </button>
        </div>
      </div>

      {/* Interactive Q&A Modal */}
      {isQAModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0d121c] border-2 border-rpg-gold/70 rounded-2xl shadow-pixelGold overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-5 py-4 bg-[#141b29] border-b-2 border-rpg-gold/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🦉</span>
                <div>
                  <h3 className="font-pixel text-xs sm:text-sm text-rpg-gold font-bold">
                    GITQUEST ANIME MENTOR
                  </h3>
                  <p className="text-[11px] font-mono text-dev-subtext">
                    Instant answers to frequent Git & GitHub dilemmas
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsQAModalOpen(false)}
                className="p-1 rounded-lg text-dev-subtext hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {faqList.map((item, idx) => {
                const isSelected = selectedQuestion === item.q;

                return (
                  <div
                    key={idx}
                    className={`rounded-xl border transition-all ${
                      isSelected
                        ? 'border-git-blue bg-blue-950/30'
                        : 'border-dev-border/70 bg-dev-surface/40 hover:border-dev-border'
                    }`}
                  >
                    <button
                      onClick={() => {
                        if (soundEnabled) playClickSound();
                        setSelectedQuestion(isSelected ? null : item.q);
                      }}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-mono font-bold text-dev-heading"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-git-blue shrink-0" />
                        <span>{item.q}</span>
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 text-dev-subtext transition-transform shrink-0 ${
                          isSelected ? 'rotate-90 text-git-blue' : ''
                        }`}
                      />
                    </button>

                    {isSelected && (
                      <div className="px-4 pb-4 pt-1 border-t border-dev-border/40 text-xs font-sans text-dev-text leading-relaxed animate-fadeIn">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-5 py-3 bg-[#141b29] border-t border-dev-border flex items-center justify-between text-xs font-mono">
              <span className="text-dev-subtext">Always here to help you debug!</span>
              <button
                onClick={() => setIsQAModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-heading font-bold"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
