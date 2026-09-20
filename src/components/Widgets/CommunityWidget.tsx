import React, { useState } from 'react';
import { HelpCircle, MessageSquare, ExternalLink, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { playClickSound } from '../../utils/audio';

export const CommunityWidget: React.FC = () => {
  const { soundEnabled } = useGame();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (soundEnabled) playClickSound();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="rounded-2xl bg-[#0e1320] border-2 border-dev-border/80 p-5 shadow-lg select-none mb-4 space-y-3">
        <h3 className="text-xs font-mono font-bold text-dev-heading uppercase tracking-wide">
          Need Help?
        </h3>

        <p className="text-[11px] font-mono text-dev-subtext">
          Ask questions in our community!
        </p>

        <button
          onClick={handleClick}
          className="w-full py-2.5 rounded-xl bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-xs font-mono font-bold text-dev-heading transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <MessageSquare className="w-3.5 h-3.5 text-git-blue" />
          <span>Go to Community</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0d121c] border-2 border-rpg-gold/70 rounded-2xl shadow-pixelGold overflow-hidden flex flex-col">
            <div className="px-5 py-4 bg-[#141b29] border-b-2 border-rpg-gold/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-rpg-gold" />
                <h3 className="font-pixel text-xs sm:text-sm text-rpg-gold font-bold">
                  GITQUEST COMMUNITY & HELP
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-dev-subtext hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs font-mono">
              <p className="text-dev-text leading-relaxed">
                Connect with thousands of learners, ask questions, and share your Git progress!
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="https://github.com/Yahoshuva138/GitQuest/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-dev-surface border border-dev-border hover:border-git-blue flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">💬</span>
                    <div>
                      <div className="font-bold text-dev-heading group-hover:text-git-blue">
                        GitHub Discussions
                      </div>
                      <div className="text-[10px] text-dev-subtext">
                        Ask questions & share solutions
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-dev-subtext group-hover:text-git-blue" />
                </a>

                <a
                  href="https://github.com/Yahoshuva138/GitQuest/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-dev-surface border border-dev-border hover:border-git-blue flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🐛</span>
                    <div>
                      <div className="font-bold text-dev-heading group-hover:text-git-blue">
                        Report an Issue / Bug
                      </div>
                      <div className="text-[10px] text-dev-subtext">
                        Help us improve the simulator
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-dev-subtext group-hover:text-git-blue" />
                </a>
              </div>
            </div>

            <div className="px-5 py-3 bg-[#141b29] border-t border-dev-border text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-heading text-xs font-mono font-bold"
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
