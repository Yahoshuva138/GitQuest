import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Check, ChevronRight } from 'lucide-react';
import { TERMS_AND_CONDITIONS } from '../../data/terms';
import { useGame } from '../../context/GameContext';
import { playClickSound } from '../../utils/audio';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const { soundEnabled } = useGame();
  const [activeSectionId, setActiveSectionId] = useState<string>(
    TERMS_AND_CONDITIONS.sections[0].id
  );

  if (!isOpen) return null;

  const handleClose = () => {
    if (soundEnabled) playClickSound();
    onClose();
  };

  const activeSection =
    TERMS_AND_CONDITIONS.sections.find((s) => s.id === activeSectionId) ||
    TERMS_AND_CONDITIONS.sections[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0d121c] border-2 border-rpg-gold/70 rounded-2xl shadow-pixelGold overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#141b29] border-b-2 border-rpg-gold/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rpg-gold/20 border-2 border-rpg-gold flex items-center justify-center text-xl">
              ⚖️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-pixel text-xs sm:text-sm text-rpg-gold tracking-wide">
                  TERMS AND CONDITIONS
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 font-bold">
                  v{TERMS_AND_CONDITIONS.version}
                </span>
              </div>
              <p className="text-xs text-dev-subtext font-mono">
                Effective: {TERMS_AND_CONDITIONS.lastUpdated}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-dev-subtext hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout: Table of Contents (Left) + Document Body (Right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12">
          {/* Table of Contents */}
          <div className="md:col-span-4 bg-[#0a0e17] border-r border-dev-border/70 p-3 sm:p-4 space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-dev-subtext font-bold px-2 mb-2">
              Sections
            </div>
            {TERMS_AND_CONDITIONS.sections.map((section) => {
              const isActive = section.id === activeSectionId;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setActiveSectionId(section.id);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-dev-surface text-git-blue font-bold border border-dev-border shadow-sm'
                      : 'text-dev-subtext hover:text-dev-heading hover:bg-dev-surface/40'
                  }`}
                >
                  <span className="line-clamp-1">{section.title}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-git-blue shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Section Body */}
          <div className="md:col-span-8 p-5 sm:p-8 space-y-5 bg-[#0d121c] overflow-y-auto">
            <div className="border-b border-dev-border/60 pb-3">
              <span className="text-[10px] font-pixel text-rpg-gold uppercase">
                Legal Specification
              </span>
              <h3 className="text-lg font-pixel text-dev-heading font-bold mt-1">
                {activeSection.title}
              </h3>
              <div className="mt-2 p-2.5 rounded-lg bg-black/40 border border-dev-border/60 text-xs font-mono text-dev-subtext">
                <span className="font-bold text-dev-heading">Summary:</span> {activeSection.summary}
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-dev-text font-sans">
              {activeSection.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#141b29] border-t border-dev-border flex items-center justify-between text-xs font-mono">
          <div className="text-dev-subtext flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>GitQuest Open-Source Education License</span>
          </div>
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-xl bg-rpg-gold hover:bg-amber-400 text-black font-pixel text-xs font-bold border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all shadow-pixelGold"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
