import React from 'react';
import {
  X,
  Database,
  Cpu,
  Layers,
  FileCode2,
  GitCommit,
  GitBranch,
  ShieldCheck,
  Terminal,
  Copy,
  Check,
} from 'lucide-react';

export type GitObjectType = 'blob' | 'tree' | 'commit' | 'ref';

export interface InspectedGitObject {
  type: GitObjectType;
  name: string;
  hash: string;
  size?: number;
  content?: string;
  path?: string;
  mode?: string;
  parentHashes?: string[];
  author?: string;
  date?: string;
  entries?: Array<{ mode: string; type: string; hash: string; name: string }>;
}

interface GitInternalsModalProps {
  object: InspectedGitObject | null;
  onClose: () => void;
}

export const GitInternalsModal: React.FC<GitInternalsModalProps> = ({ object, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!object) return null;

  const fullHash = object.hash.length === 40 
    ? object.hash 
    : (object.hash + 'e4b9c107a4d52e6f98a23c7b1e4f509d8c7a1b2c').slice(0, 40);

  const objectDir = fullHash.slice(0, 2);
  const objectFile = fullHash.slice(2);
  const diskPath = `.git/objects/${objectDir}/${objectFile}`;

  const copyHash = () => {
    navigator.clipboard.writeText(fullHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeInfo = () => {
    switch (object.type) {
      case 'blob':
        return {
          title: 'BLOB OBJECT',
          japanese: '『ブロブ・オブジェクト』',
          color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
          icon: FileCode2,
          tagline: 'Raw, immutable file content payload without filenames or permissions.',
        };
      case 'tree':
        return {
          title: 'TREE OBJECT',
          japanese: '『ツリー・構造体』',
          color: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
          icon: Layers,
          tagline: 'Directory listing mapping file paths and Unix modes (100644) to SHA-1 hashes.',
        };
      case 'commit':
        return {
          title: 'COMMIT OBJECT',
          japanese: '『コミット・メタデータ』',
          color: 'text-blue-400 bg-blue-950/60 border-blue-500/40',
          icon: GitCommit,
          tagline: 'Permanent snapshot metadata binding author, timestamp, parent pointer, and root tree.',
        };
      case 'ref':
        return {
          title: 'REFERENCE POINTER',
          japanese: '『ブランチ参照ポインタ』',
          color: 'text-purple-400 bg-purple-950/60 border-purple-500/40',
          icon: GitBranch,
          tagline: 'Lightweight 41-byte pointer file containing a 40-character SHA-1 commit hash.',
        };
    }
  };

  const badge = getBadgeInfo();
  const Icon = badge.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-mono text-xs select-none">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#090D15] border-2 border-dev-border/90 p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-dev-border/70">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${badge.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-dev-heading uppercase tracking-wide">
                  {badge.title}
                </span>
                <span className="text-xs text-purple-300 font-bold">
                  {badge.japanese}
                </span>
              </div>
              <p className="text-[11px] text-dev-subtext mt-0.5">
                {badge.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-dev-subtext hover:text-white hover:bg-dev-surface transition-colors border border-dev-border"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Disk & Cryptographic Storage Details */}
        <div className="space-y-3 bg-[#06090F] p-3.5 rounded-xl border border-dev-border/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-dev-subtext text-[11px]">Cryptographic SHA-1 ID:</span>
            <div className="flex items-center gap-2">
              <code className="text-amber-300 font-bold bg-black/60 px-2 py-0.5 rounded border border-dev-border text-[11px]">
                {fullHash}
              </code>
              <button
                onClick={copyHash}
                className="p-1 rounded bg-dev-surface hover:bg-dev-surface/80 text-dev-subtext hover:text-white transition-colors border border-dev-border"
                title="Copy SHA-1 Hash"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
            <span className="text-dev-subtext">On-Disk Location:</span>
            <code className="text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-dev-border">
              {diskPath}
            </code>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
            <span className="text-dev-subtext">Compression:</span>
            <span className="text-emerald-300 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> zlib deflated binary
            </span>
          </div>

          {object.mode && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
              <span className="text-dev-subtext">POSIX File Mode:</span>
              <code className="text-purple-300 font-bold">{object.mode} (Regular file)</code>
            </div>
          )}
        </div>

        {/* Raw Header & Content representation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-dev-subtext">
            <span className="font-bold uppercase tracking-wider text-dev-heading">
              Decompressed Object Stream
            </span>
            <span>Header + Null Byte (\0) + Payload</span>
          </div>

          <div className="p-3 rounded-xl bg-black/80 border border-dev-border font-mono text-[11px] text-gray-300 overflow-x-auto space-y-2">
            {object.type === 'blob' && (
              <>
                <div className="text-emerald-400 border-b border-dev-border/50 pb-1.5 flex items-center gap-2">
                  <span className="text-gray-500 font-bold">[HEADER]:</span>
                  <span>blob {(object.content || '').length}\0</span>
                </div>
                <div className="whitespace-pre-wrap text-emerald-200/90 max-h-48 overflow-y-auto">
                  {object.content || '// Empty file payload'}
                </div>
              </>
            )}

            {object.type === 'commit' && (
              <div className="space-y-1 text-blue-200/90">
                <div className="text-amber-400">tree {fullHash.slice(0, 10)}...</div>
                {object.parentHashes && object.parentHashes.length > 0 && (
                  <div className="text-purple-400">parent {object.parentHashes[0]}</div>
                )}
                <div>author {object.author || 'Developer <dev@gitquest.local>'} 1695214800 +0000</div>
                <div>committer {object.author || 'Developer <dev@gitquest.local>'} 1695214800 +0000</div>
                <div className="pt-2 text-white font-bold border-t border-dev-border/50 mt-2">
                  {object.name}
                </div>
              </div>
            )}

            {object.type === 'tree' && (
              <div className="space-y-1 text-amber-200/90">
                <div>100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391  index.html</div>
                <div>100644 blob a8b3c901e4f208dcba7192847120394871239481  styles.css</div>
                <div>040000 tree d4c3b2a190827364510293847561029384756102  src</div>
              </div>
            )}
          </div>
        </div>

        {/* How Git Uses This */}
        <div className="p-3 rounded-xl bg-dev-surface/30 border border-dev-border text-[11px] text-dev-subtext space-y-1">
          <div className="font-bold text-dev-heading flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-git-blue" />
            <span>Git Engine Mechanical Insight</span>
          </div>
          <p className="leading-relaxed">
            {object.type === 'blob' &&
              'Every unique file content gets hashed into an immutable blob. If two different files have the exact same contents anywhere in your repository, Git stores only ONE blob and references it twice, saving massive disk space.'}
            {object.type === 'commit' &&
              'Commits are DAG (Directed Acyclic Graph) nodes. Because each commit records its parent hash, the history cannot be secretly altered without changing every subsequent hash in the entire branch!'}
            {object.type === 'tree' &&
              'Trees model the file system hierarchy. Subdirectories are nested tree pointers, enabling Git to reuse identical folder structures across multiple commits with zero duplicate storage.'}
            {object.type === 'ref' &&
              'Branches in Git are not heavy copies—they are just 41-byte text files holding a commit hash. Creating, switching, or deleting a branch takes less than 1 millisecond!'}
          </p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-git-blue/20 hover:bg-git-blue/30 text-git-blue border border-git-blue/40 font-bold transition-all text-xs"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
