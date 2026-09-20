import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface TerminalProps {
  quickSuggestions?: string[];
  placeholder?: string;
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  quickSuggestions = ['git status', 'git add .', 'git commit -m "..."', 'git log --oneline', 'git branch'],
  placeholder = 'Type git command (e.g. git status)...',
  className = '',
}) => {
  const { repoState, commandHistory, executeCommand } = useGame();
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Focus input when clicking anywhere in terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Arrow Up / Down for history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx].command);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(null);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx].command);
      }
    } else if (e.key === 'Tab') {
      // Auto-complete basic git commands & filenames
      e.preventDefault();
      handleAutoComplete();
    }
  };

  const handleAutoComplete = () => {
    const trimmed = inputVal.trimStart();
    const commonCommands = [
      'git status',
      'git add',
      'git add .',
      'git commit -m "',
      'git log',
      'git log --oneline',
      'git diff',
      'git diff --staged',
      'git branch',
      'git switch',
      'git switch -c',
      'git checkout',
      'git checkout -b',
      'git merge',
      'git remote add origin',
      'git push origin',
      'git pull origin',
      'git stash',
      'git stash pop',
      'git restore',
      'git restore --staged',
    ];

    const match = commonCommands.find((c) => c.startsWith(trimmed) && c !== trimmed);
    if (match) {
      setInputVal(match);
      return;
    }

    // Auto-complete files if after "git add" or "cat" or "git diff"
    if (trimmed.startsWith('git add ') || trimmed.startsWith('cat ') || trimmed.startsWith('git restore ')) {
      const parts = trimmed.split(' ');
      const prefix = parts[parts.length - 1];
      const files = Object.keys(repoState.workingDirectory);
      const matchedFile = files.find((f) => f.startsWith(prefix));
      if (matchedFile) {
        parts[parts.length - 1] = matchedFile;
        setInputVal(parts.join(' '));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
    setInputVal('');
    setHistoryIndex(null);
  };

  const handleSuggestionClick = (cmd: string) => {
    setInputVal(cmd);
    inputRef.current?.focus();
  };

  // Convert ANSI escape codes (e.g. \x1b[32m) to colored HTML spans
  const renderFormattedOutput = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\x1b\[[0-9;]*m)/);
    let currentColor = '';

    return parts.map((part, index) => {
      if (part.startsWith('\x1b[')) {
        if (part === '\x1b[31m') currentColor = 'text-rose-400';
        else if (part === '\x1b[32m') currentColor = 'text-emerald-400';
        else if (part === '\x1b[33m') currentColor = 'text-amber-400';
        else if (part === '\x1b[36m') currentColor = 'text-cyan-400';
        else if (part === '\x1b[0m') currentColor = '';
        return null;
      }
      return (
        <span key={index} className={currentColor}>
          {part}
        </span>
      );
    });
  };

  const branchDisplay = useMemo(() => {
    return repoState.currentBranch || 'main';
  }, [repoState.currentBranch]);

  return (
    <div
      className={`dev-panel flex flex-col font-mono text-xs overflow-hidden shadow-panel border-dev-border bg-[#0B0F14] ${className}`}
      onClick={handleTerminalClick}
    >
      {/* Terminal Title Bar */}
      <div className="bg-[#12171F] px-3 py-2 border-b border-dev-border flex items-center justify-between text-dev-subtext select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <TerminalIcon className="w-3.5 h-3.5 text-dev-subtext" />
          <span className="font-semibold text-dev-text text-[11px]">Git Terminal</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-dev-surface text-dev-subtext border border-dev-border">
            bash / git
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="hidden sm:inline text-dev-subtext/70">Press Tab to autocomplete</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              executeCommand('clear');
            }}
            className="p-1 rounded hover:bg-dev-surface hover:text-dev-heading text-dev-subtext transition-colors"
            title="Clear terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Content / Logs */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 min-h-[160px] max-h-[360px] leading-relaxed">
        {commandHistory.length === 0 && (
          <div className="text-dev-subtext/60 italic text-[11px] py-1">
            Simulated repository active. Type a Git command below or pick a suggestion chip.
          </div>
        )}

        {commandHistory.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-dev-subtext">
              <span className="text-emerald-500 font-bold">gitquest</span>
              <span className="text-dev-subtext/60">:</span>
              <span className="text-blue-400">~/project</span>
              <span className="text-amber-400">({branchDisplay})</span>
              <span className="text-dev-heading font-semibold">$ {item.command}</span>
            </div>

            {item.output && (
              <pre
                className={`whitespace-pre-wrap pl-4 font-mono text-[11.5px] leading-snug ${
                  item.isError ? 'text-rose-400' : 'text-dev-text'
                }`}
              >
                {renderFormattedOutput(item.output)}
              </pre>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Suggestion Chips */}
      {quickSuggestions.length > 0 && (
        <div className="px-3 py-1.5 bg-[#0E131B] border-t border-dev-border/60 flex items-center gap-1.5 overflow-x-auto select-none">
          <span className="text-[10px] text-dev-subtext shrink-0 mr-1">Quick:</span>
          {quickSuggestions.map((cmd, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                handleSuggestionClick(cmd);
              }}
              className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-dev-surface/80 text-dev-heading border border-dev-border/70 hover:bg-dev-border hover:border-git-blue/50 transition-all shrink-0 active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>
      )}

      {/* Input Prompt */}
      <form onSubmit={handleSubmit} className="p-2.5 bg-[#12171F] border-t border-dev-border flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-dev-subtext shrink-0 select-none">
          <span className="text-emerald-500 font-bold hidden sm:inline">gitquest</span>
          <span className="text-amber-400 font-medium">({branchDisplay})</span>
          <span className="text-dev-heading font-bold">$</span>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-dev-heading font-mono text-xs placeholder:text-dev-subtext/50"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />

        <button
          type="submit"
          className="p-1 rounded bg-git-blue/20 text-git-blue hover:bg-git-blue/30 border border-git-blue/40 transition-colors"
          title="Run command (Enter)"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
