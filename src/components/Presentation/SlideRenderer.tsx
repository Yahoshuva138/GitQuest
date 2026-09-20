import React, { useState } from 'react';
import {
  Code,
  FileText,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { SlideContent } from '../../data/curriculum';

interface SlideRendererProps {
  slide: SlideContent;
  onLaunchMission?: () => void;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  slide,
  onLaunchMission,
}) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="space-y-5 animate-fadeIn font-sans text-dev-text">
      {/* Slide Title & Category Banner */}
      <div className="border-b border-dev-border/70 pb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-pixel px-2 py-0.5 rounded bg-rpg-gold/20 text-rpg-gold border border-rpg-gold/40 uppercase">
            Slide {slide.slideNumber} • {slide.category}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-pixel text-dev-heading tracking-wide">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm text-dev-subtext font-mono mt-1">
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Bullet Points / Paragraphs */}
      <div className="space-y-2.5">
        {slide.content.map((point, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-git-blue mt-2 shrink-0" />
            <p className="text-dev-text">{point}</p>
          </div>
        ))}
      </div>

      {/* Visual Diagram Element if present */}
      {slide.diagram && (
        <div className="p-4 rounded-xl bg-[#090d15] border-2 border-dev-border/80 shadow-inner my-3">
          <div className="text-[10px] font-mono text-dev-subtext uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-rpg-gold" />
            <span>Visual Mental Model</span>
          </div>

          {slide.diagram.type === 'pipeline' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              {slide.diagram.elements.map((elem, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-lg border-2 text-center transition-all ${
                    elem.highlight
                      ? 'border-rpg-gold bg-rpg-gold/10 shadow-pixelGold'
                      : 'border-dev-border bg-dev-surface/50'
                  }`}
                >
                  <div className="font-pixel text-xs text-dev-heading font-bold">
                    {elem.label}
                  </div>
                  {elem.subtext && (
                    <div className="text-[11px] font-mono text-dev-subtext mt-1">
                      {elem.subtext}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {slide.diagram.type === 'comparison' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {slide.diagram.elements.map((elem, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-lg border-2 ${
                    elem.color === 'green'
                      ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                      : 'border-rose-500/50 bg-rose-950/30 text-rose-300'
                  }`}
                >
                  <div className="font-pixel text-xs font-bold mb-1">{elem.label}</div>
                  <div className="text-xs font-mono">{elem.subtext}</div>
                </div>
              ))}
            </div>
          )}

          {slide.diagram.type === 'tree' && (
            <div className="flex flex-wrap items-center justify-center gap-3 py-2">
              {slide.diagram.elements.map((elem, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`px-3.5 py-2 rounded-lg border-2 font-mono text-xs font-bold ${
                      elem.highlight
                        ? 'border-git-blue bg-blue-950/50 text-blue-300 shadow-pixelBlue'
                        : 'border-dev-border bg-dev-surface/60 text-dev-heading'
                    }`}
                  >
                    <span>{elem.label}</span>
                    {elem.subtext && (
                      <span className="block text-[10px] text-dev-subtext font-normal">
                        {elem.subtext}
                      </span>
                    )}
                  </div>
                  {i < (slide.diagram?.elements.length || 0) - 1 && (
                    <ArrowRight className="w-4 h-4 text-dev-subtext" />
                  )}
                </div>
              ))}
            </div>
          )}

          {slide.diagram.type === 'box' && (
            <div className="space-y-2">
              {slide.diagram.elements.map((elem, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg border flex items-center justify-between font-mono text-xs ${
                    elem.highlight
                      ? 'border-git-orange/50 bg-git-orange/10 text-git-orange font-bold'
                      : 'border-dev-border bg-dev-surface/40 text-dev-text'
                  }`}
                >
                  <span>{elem.label}</span>
                  <span className="text-[11px] text-dev-subtext">{elem.subtext}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Code Block if present */}
      {slide.codeBlock && (
        <div className="rounded-xl overflow-hidden border-2 border-dev-border bg-[#0B0F14] font-mono text-xs shadow-subtle">
          <div className="px-4 py-2 bg-dev-surface/80 border-b border-dev-border flex items-center justify-between">
            <span className="text-[11px] text-dev-subtext flex items-center gap-1.5 uppercase font-bold">
              <Code className="w-3.5 h-3.5 text-git-blue" />
              <span>{slide.codeBlock.language}</span>
            </span>
            <button
              onClick={() => handleCopyCode(slide.codeBlock?.code || '')}
              className="p-1 rounded text-dev-subtext hover:text-dev-heading flex items-center gap-1 text-[11px] transition-colors"
            >
              {hasCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-git-green" />
                  <span className="text-git-green font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-dev-heading leading-relaxed overflow-x-auto selection:bg-git-blue/30">
            <code>{slide.codeBlock.code}</code>
          </pre>
          {slide.codeBlock.explanation && (
            <div className="px-4 py-2.5 bg-dev-surface/30 border-t border-dev-border/50 text-[11px] text-dev-subtext">
              💡 {slide.codeBlock.explanation}
            </div>
          )}
        </div>
      )}

      {/* Challenge Button on Final Slide */}
      {slide.category === 'challenge' && onLaunchMission && (
        <div className="pt-2">
          <button
            onClick={onLaunchMission}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rpg-gold via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-pixel text-xs tracking-wider font-bold shadow-pixelGold transition-all flex items-center justify-center gap-2 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1"
          >
            <Sparkles className="w-4 h-4" />
            <span>LAUNCH HANDS-ON MISSION QUEST</span>
          </button>
        </div>
      )}

      {/* Key Takeaway Banner */}
      <div className="p-3.5 rounded-xl bg-dev-surface/40 border border-dev-border flex items-start gap-2.5 text-xs font-mono">
        <CheckCircle2 className="w-4 h-4 text-git-green shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-dev-heading uppercase text-[10px]">
            Key Takeaway:
          </span>{' '}
          <span className="text-dev-text">{slide.keyTakeaway}</span>
        </div>
      </div>
    </div>
  );
};
