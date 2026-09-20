import React, { useState } from 'react';
import {
  Folder,
  FileCode,
  FileText,
  FilePlus,
  Save,
  CheckCircle2,
  FileBadge,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const FileTree: React.FC = () => {
  const { repoState, updateRepoState } = useGame();
  const [selectedFilePath, setSelectedFilePath] = useState<string>(() => {
    return Object.keys(repoState.workingDirectory)[0] || '';
  });
  const [editingContent, setEditingContent] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);

  const files = Object.values(repoState.workingDirectory);
  const activeFile = repoState.workingDirectory[selectedFilePath] || files[0];

  const handleSelectFile = (path: string) => {
    setSelectedFilePath(path);
    if (repoState.workingDirectory[path]) {
      setEditingContent(repoState.workingDirectory[path].content);
    }
  };

  const handleSaveEdit = () => {
    if (!activeFile) return;
    const nextState = JSON.parse(JSON.stringify(repoState));
    if (nextState.workingDirectory[activeFile.path]) {
      nextState.workingDirectory[activeFile.path].content = editingContent;
      // Mark as modified if different from original
      if (editingContent !== nextState.workingDirectory[activeFile.path].originalContent) {
        nextState.workingDirectory[activeFile.path].status = 'modified';
      }
    }
    updateRepoState(nextState);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1800);
  };

  return (
    <div className="dev-panel bg-dev-panel border-dev-border shadow-panel overflow-hidden font-mono text-xs flex flex-col h-full">
      <div className="bg-[#12171F] px-3 py-2 border-b border-dev-border flex items-center justify-between text-dev-subtext">
        <div className="flex items-center gap-2">
          <Folder className="w-3.5 h-3.5 text-git-yellow" />
          <span className="font-semibold text-dev-text text-[11px]">PROJECT EXPLORER</span>
        </div>
        <span className="text-[10px] text-dev-subtext">~/project</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dev-border flex-1">
        {/* Left: Files List */}
        <div className="p-2 space-y-1 bg-[#090D12] overflow-y-auto max-h-[300px] md:max-h-none">
          {files.map((file) => {
            const isSelected = file.path === selectedFilePath;
            const isStaged = Boolean(repoState.stagingArea[file.path]);

            return (
              <button
                key={file.path}
                onClick={() => handleSelectFile(file.path)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-all ${
                  isSelected
                    ? 'bg-dev-surface text-dev-heading border border-dev-border font-semibold shadow-sm'
                    : 'text-dev-text hover:bg-dev-surface/40 hover:text-dev-heading'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-dev-subtext" />
                  <span className="truncate text-xs">{file.name}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {isStaged ? (
                    <span className="text-[10px] font-bold px-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      A
                    </span>
                  ) : file.status === 'modified' ? (
                    <span className="text-[10px] font-bold px-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      M
                    </span>
                  ) : file.status === 'untracked' ? (
                    <span className="text-[10px] font-bold px-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      U
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: File Viewer / Editor */}
        <div className="md:col-span-2 p-3 bg-[#0B0F14] flex flex-col justify-between">
          {activeFile ? (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-dev-border/60">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-dev-heading">{activeFile.name}</span>
                  <span className="text-[10px] text-dev-subtext uppercase">
                    Status: {repoState.stagingArea[activeFile.path] ? 'Staged' : activeFile.status}
                  </span>
                </div>
                <button
                  onClick={handleSaveEdit}
                  className="dev-button text-[11px] py-1 px-2.5"
                  title="Save changes to Working Directory"
                >
                  {isSaved ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>{isSaved ? 'Saved!' : 'Save Edits'}</span>
                </button>
              </div>

              {/* Textarea with code lines */}
              <textarea
                value={editingContent || activeFile.content}
                onChange={(e) => setEditingContent(e.target.value)}
                rows={10}
                className="flex-1 w-full bg-[#080B0F] border border-dev-border/60 rounded p-3 text-xs text-dev-heading font-mono outline-none focus:border-git-blue resize-none leading-relaxed"
                spellCheck={false}
              />
              <div className="mt-2 text-[10px] text-dev-subtext">
                💡 You can edit code here and save to simulate real developer changes in your working directory.
              </div>
            </div>
          ) : (
            <div className="text-dev-subtext text-center py-8">Select a file to inspect</div>
          )}
        </div>
      </div>
    </div>
  );
};
