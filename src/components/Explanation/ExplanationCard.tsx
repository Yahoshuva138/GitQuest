import React from 'react';
import { Sparkles, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const ExplanationCard: React.FC = () => {
  const { lastExplanation } = useGame();

  if (!lastExplanation) return null;

  return (
    <div className="dev-panel p-4 bg-[#111722] border-dev-border shadow-panel text-xs font-mono space-y-3 animate-stage-in">
      <div className="flex items-center gap-2 pb-2 border-b border-dev-border">
        <Sparkles className="w-4 h-4 text-git-yellow" />
        <h4 className="font-bold text-dev-heading uppercase tracking-wider text-xs">
          Interactive Explanation System
        </h4>
      </div>

      <div className="space-y-2">
        <div>
          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide mb-0.5">
            WHAT HAPPENED?
          </div>
          <p className="text-dev-text leading-relaxed font-sans text-xs">
            {lastExplanation.whatHappened}
          </p>
        </div>

        <div>
          <div className="text-[10px] font-bold text-git-blue uppercase tracking-wide mb-0.5">
            WHY DOES GIT DO THIS?
          </div>
          <p className="text-dev-text leading-relaxed font-sans text-xs">
            {lastExplanation.why}
          </p>
        </div>

        {lastExplanation.tip && (
          <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] font-sans flex items-start gap-2">
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-git-yellow" />
            <span>{lastExplanation.tip}</span>
          </div>
        )}
      </div>
    </div>
  );
};
