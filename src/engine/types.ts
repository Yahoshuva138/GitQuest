export type FileStatus = 'unmodified' | 'modified' | 'untracked' | 'deleted';

export interface FileItem {
  name: string;
  path: string;
  content: string;
  status: FileStatus;
  originalContent?: string;
}

export interface StagedItem {
  path: string;
  content: string;
  status: 'added' | 'modified' | 'deleted';
}

export interface CommitDiff {
  path: string;
  status: 'added' | 'modified' | 'deleted';
  diff: string;
  linesAdded: number;
  linesDeleted: number;
}

export interface Commit {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  timestamp: number;
  parentHashes: string[];
  tree: Record<string, string>; // path -> content
  branch: string;
  diffs?: CommitDiff[];
}

export interface Branch {
  name: string;
  commitHash: string;
  isRemote?: boolean;
}

export interface Remote {
  name: string;
  url: string;
  branches: Record<string, string>; // branchName -> commitHash
  commits: Commit[];
}

export interface StashItem {
  id: string;
  message: string;
  branch: string;
  workingDirectory: Record<string, FileItem>;
  stagingArea: Record<string, StagedItem>;
  timestamp: number;
}

export interface ConflictState {
  active: boolean;
  filePath: string;
  baseBranch: string;
  incomingBranch: string;
  currentContent: string;
  incomingContent: string;
  resolvedContent?: string;
  isResolved: boolean;
}

export interface RepositoryState {
  initialized: boolean;
  currentBranch: string;
  HEAD: string; // branch name or detached commit hash
  workingDirectory: Record<string, FileItem>;
  stagingArea: Record<string, StagedItem>;
  commits: Commit[];
  branches: Record<string, Branch>;
  tags: Record<string, string>;
  stash: StashItem[];
  remotes: Record<string, Remote>;
  conflictState?: ConflictState | null;
}

export type PipelineZone = 'working' | 'staging' | 'repo' | 'github';

export interface ExplanationData {
  whatHappened: string;
  why: string;
  affectedZones: PipelineZone[];
  tip?: string;
}

export interface CommandResult {
  command: string;
  output: string;
  isError: boolean;
  stateUpdated?: boolean;
  explanation?: ExplanationData;
}

export interface MissionStep {
  id: string;
  title: string;
  description: string;
  expectedCommand?: string | RegExp | ((cmd: string, state: RepositoryState) => boolean);
  checkCompletion?: (state: RepositoryState, lastCmd: string) => boolean;
  taskHint: string;
  successMessage: string;
  whatHappenedExplanation: string;
  whyExplanation: string;
}

export interface Mission {
  id: string;
  levelNumber: number;
  levelId: string;
  levelName: string;
  title: string;
  subtitle: string;
  badge: string;
  objective: string;
  situation: string;
  whatYouKnow: string[];
  yourTask: string;
  initialFiles: Record<string, { content: string; status?: FileStatus; originalContent?: string }>;
  initialCommits?: Array<{
    hash?: string;
    message: string;
    author?: string;
    branch?: string;
    files: Record<string, string>;
  }>;
  initialBranches?: string[];
  currentBranch?: string;
  initialRemotes?: Record<string, { url: string; branches: Record<string, string> }>;
  initialConflict?: ConflictState;
  steps: MissionStep[];
  hints: string[];
  takeaways: string[];
  nextMissionId?: string;
}

export interface Level {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  missions: string[];
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  category: 'core' | 'branching' | 'collaboration' | 'advanced';
}
