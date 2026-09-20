import {
  RepositoryState,
  FileItem,
  StagedItem,
  Commit,
  CommandResult,
  ExplanationData,
  FileStatus,
  CommitDiff,
} from './types';

// Helper to generate realistic short Git hashes
export function generateHash(): { full: string; short: string } {
  const chars = '0123456789abcdef';
  let full = '';
  for (let i = 0; i < 40; i++) {
    full += chars[Math.floor(Math.random() * chars.length)];
  }
  return { full, short: full.substring(0, 7) };
}

// Generate simple unified diff between two text strings
export function createDiff(path: string, oldContent: string, newContent: string): CommitDiff {
  const oldLines = oldContent ? oldContent.split('\n') : [];
  const newLines = newContent ? newContent.split('\n') : [];

  let added = 0;
  let deleted = 0;
  const diffLines: string[] = [
    `diff --git a/${path} b/${path}`,
    `--- ${oldContent ? 'a/' + path : '/dev/null'}`,
    `+++ ${newContent ? 'b/' + path : '/dev/null'}`,
    `@@ -1,${Math.max(oldLines.length, 1)} +1,${Math.max(newLines.length, 1)} @@`,
  ];

  if (!oldContent) {
    newLines.forEach((l) => {
      diffLines.push(`+${l}`);
      added++;
    });
    return { path, status: 'added', diff: diffLines.join('\n'), linesAdded: added, linesDeleted: 0 };
  }

  if (!newContent) {
    oldLines.forEach((l) => {
      diffLines.push(`-${l}`);
      deleted++;
    });
    return { path, status: 'deleted', diff: diffLines.join('\n'), linesAdded: 0, linesDeleted: deleted };
  }

  // Simple line-by-line diff comparison
  const max = Math.max(oldLines.length, newLines.length);
  for (let i = 0; i < max; i++) {
    const o = oldLines[i];
    const n = newLines[i];
    if (o === n) {
      if (o !== undefined) diffLines.push(` ${o}`);
    } else {
      if (o !== undefined) {
        diffLines.push(`-${o}`);
        deleted++;
      }
      if (n !== undefined) {
        diffLines.push(`+${n}`);
        added++;
      }
    }
  }

  return {
    path,
    status: 'modified',
    diff: diffLines.join('\n'),
    linesAdded: added,
    linesDeleted: deleted,
  };
}

export function createInitialRepo(
  initialFiles: Record<string, { content: string; status?: FileStatus; originalContent?: string }> = {},
  initialCommits: Array<{
    hash?: string;
    message: string;
    author?: string;
    branch?: string;
    files: Record<string, string>;
  }> = [],
  initialBranches: string[] = ['main'],
  currentBranch: string = 'main',
  initialRemotes?: Record<string, { url: string; branches: Record<string, string> }>
): RepositoryState {
  const workingDirectory: Record<string, FileItem> = {};
  for (const [path, file] of Object.entries(initialFiles)) {
    const parts = path.split('/');
    const name = parts[parts.length - 1];
    workingDirectory[path] = {
      name,
      path,
      content: file.content,
      status: file.status || 'unmodified',
      originalContent: file.originalContent !== undefined ? file.originalContent : file.content,
    };
  }

  const commits: Commit[] = [];
  let prevHash: string | null = null;

  for (const c of initialCommits) {
    const hashes = c.hash ? { full: c.hash.padEnd(40, '0'), short: c.hash.substring(0, 7) } : generateHash();
    const commit: Commit = {
      hash: hashes.full,
      shortHash: hashes.short,
      message: c.message,
      author: c.author || 'Dev Learner <you@gitquest.dev>',
      timestamp: Date.now() - (initialCommits.length - commits.length) * 3600000,
      parentHashes: prevHash ? [prevHash] : [],
      tree: { ...c.files },
      branch: c.branch || currentBranch,
      diffs: [],
    };
    prevHash = hashes.full;
    commits.push(commit);
  }

  const branches: Record<string, { name: string; commitHash: string }> = {};
  for (const b of initialBranches) {
    branches[b] = {
      name: b,
      commitHash: commits.length > 0 ? commits[commits.length - 1].hash : '',
    };
  }

  const remotes: Record<string, any> = {};
  if (initialRemotes) {
    for (const [name, r] of Object.entries(initialRemotes)) {
      remotes[name] = {
        name,
        url: r.url,
        branches: { ...r.branches },
        commits: commits.filter((c) => r.branches[currentBranch] === c.hash),
      };
    }
  }

  return {
    initialized: true,
    currentBranch,
    HEAD: currentBranch,
    workingDirectory,
    stagingArea: {},
    commits,
    branches,
    tags: {},
    stash: [],
    remotes,
    conflictState: null,
  };
}

export function executeGitCommand(state: RepositoryState, rawCommand: string): { newState: RepositoryState; result: CommandResult } {
  const trimmed = rawCommand.trim();
  const newState: RepositoryState = JSON.parse(JSON.stringify(state));

  // Handle empty command
  if (!trimmed) {
    return {
      newState,
      result: {
        command: rawCommand,
        output: '',
        isError: false,
      },
    };
  }

  // Basic terminal helpers
  if (trimmed === 'clear') {
    return {
      newState,
      result: {
        command: rawCommand,
        output: '__CLEAR__',
        isError: false,
      },
    };
  }

  if (trimmed === 'ls' || trimmed.startsWith('ls ')) {
    const files = Object.keys(newState.workingDirectory);
    return {
      newState,
      result: {
        command: rawCommand,
        output: files.length > 0 ? files.join('  ') : 'No files in directory.',
        isError: false,
      },
    };
  }

  if (trimmed.startsWith('cat ')) {
    const filePath = trimmed.replace('cat ', '').trim();
    const file = newState.workingDirectory[filePath];
    if (!file) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `cat: ${filePath}: No such file or directory`,
          isError: true,
        },
      };
    }
    return {
      newState,
      result: {
        command: rawCommand,
        output: file.content,
        isError: false,
      },
    };
  }

  if (!trimmed.startsWith('git')) {
    return {
      newState,
      result: {
        command: rawCommand,
        output: `bash: ${trimmed.split(' ')[0]}: command not found. Did you mean a 'git' command?`,
        isError: true,
      },
    };
  }

  // Parse git command
  const args = trimmed.split(/\s+/).slice(1);
  const subCmd = args[0];

  if (!subCmd) {
    return {
      newState,
      result: {
        command: rawCommand,
        output: `usage: git [--version] [--help] <command> [<args>]\n\nCommon commands:\n   status      Show working tree status\n   add         Add file contents to staging area\n   commit      Record changes to the repository\n   branch      List, create, or delete branches\n   switch      Switch branches\n   merge       Join two or more development histories together\n   log         Show commit logs\n   diff        Show changes between commits, commit and working tree`,
        isError: false,
      },
    };
  }

  // 1. git init
  if (subCmd === 'init') {
    newState.initialized = true;
    if (!newState.branches['main']) {
      newState.branches['main'] = { name: 'main', commitHash: '' };
      newState.currentBranch = 'main';
      newState.HEAD = 'main';
    }
    const explanation: ExplanationData = {
      whatHappened: 'Created an empty Git repository (.git directory) in the current folder.',
      why: 'Git needs a hidden .git directory to store commit history, branch pointers, and staged snapshots.',
      affectedZones: ['working', 'repo'],
      tip: 'Run "git status" to inspect the repository state.',
    };
    return {
      newState,
      result: {
        command: rawCommand,
        output: `Initialized empty Git repository in /project/.git/`,
        isError: false,
        stateUpdated: true,
        explanation,
      },
    };
  }

  // Require init for all subsequent git commands
  if (!newState.initialized) {
    return {
      newState,
      result: {
        command: rawCommand,
        output: `fatal: not a git repository (or any of the parent directories): .git\nRun 'git init' to initialize a repository.`,
        isError: true,
      },
    };
  }

  // 2. git status
  if (subCmd === 'status') {
    const currentBranch = newState.currentBranch;
    const stagedFiles = Object.values(newState.stagingArea);
    const unstagedModified = Object.values(newState.workingDirectory).filter(
      (f) => f.status === 'modified' && !newState.stagingArea[f.path]
    );
    const untracked = Object.values(newState.workingDirectory).filter((f) => f.status === 'untracked');

    let out = `On branch ${currentBranch}\n`;

    // Check remote sync
    const origin = newState.remotes['origin'];
    if (origin && origin.branches[currentBranch]) {
      const localCommits = newState.commits.filter((c) => c.branch === currentBranch);
      const remoteCommits = origin.commits.filter((c) => c.branch === currentBranch);
      if (localCommits.length > remoteCommits.length) {
        const diff = localCommits.length - remoteCommits.length;
        out += `Your branch is ahead of 'origin/${currentBranch}' by ${diff} commit${diff > 1 ? 's' : ''}.\n  (use "git push" to publish your local commits)\n`;
      } else if (localCommits.length < remoteCommits.length) {
        const diff = remoteCommits.length - localCommits.length;
        out += `Your branch is behind 'origin/${currentBranch}' by ${diff} commit${diff > 1 ? 's' : ''}.\n  (use "git pull" to update your local branch)\n`;
      } else {
        out += `Your branch is up to date with 'origin/${currentBranch}'.\n`;
      }
    } else {
      out += `No commits yet\n`;
    }

    if (stagedFiles.length > 0) {
      out += `\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n`;
      stagedFiles.forEach((f) => {
        out += `\x1b[32m\t${f.status === 'added' ? 'new file:  ' : 'modified:  '}${f.path}\x1b[0m\n`;
      });
    }

    if (unstagedModified.length > 0) {
      out += `\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n`;
      unstagedModified.forEach((f) => {
        out += `\x1b[31m\tmodified:   ${f.path}\x1b[0m\n`;
      });
    }

    if (untracked.length > 0) {
      out += `\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n`;
      untracked.forEach((f) => {
        out += `\x1b[31m\t${f.path}\x1b[0m\n`;
      });
    }

    if (stagedFiles.length === 0 && unstagedModified.length === 0 && untracked.length === 0) {
      out += `nothing to commit, working tree clean\n`;
    }

    const explanation: ExplanationData = {
      whatHappened: 'Inspected the Working Directory and Staging Area to check which files changed.',
      why: 'Git never assumes what you want to commit. "git status" tells you the exact state of your working files before you stage or snapshot.',
      affectedZones: ['working', 'staging'],
      tip: stagedFiles.length > 0 ? 'You have staged files ready for "git commit".' : 'Use "git add <file>" to stage changes.',
    };

    return {
      newState,
      result: {
        command: rawCommand,
        output: out,
        isError: false,
        explanation,
      },
    };
  }

  // 3. git add
  if (subCmd === 'add') {
    const targets = args.slice(1);
    if (targets.length === 0) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `Nothing specified, nothing added.\nMaybe you wanted to say 'git add .'?`,
          isError: true,
        },
      };
    }

    let stagedCount = 0;
    const isAll = targets.includes('.') || targets.includes('-A') || targets.includes('--all');

    const filesToStage = isAll
      ? Object.keys(newState.workingDirectory).filter((p) => newState.workingDirectory[p].status !== 'unmodified')
      : targets;

    for (const target of filesToStage) {
      const file = newState.workingDirectory[target];
      if (!file) {
        return {
          newState,
          result: {
            command: rawCommand,
            output: `fatal: pathspec '${target}' did not match any files`,
            isError: true,
          },
        };
      }

      newState.stagingArea[target] = {
        path: target,
        content: file.content,
        status: file.status === 'untracked' ? 'added' : 'modified',
      };
      stagedCount++;
    }

    const explanation: ExplanationData = {
      whatHappened: `Moved ${stagedCount} file(s) into the Staging Area: ${filesToStage.join(', ')}.`,
      why: 'Git uses a Staging Area (index) so you can carefully curate which changes belong in your next commit instead of blindly saving everything.',
      affectedZones: ['working', 'staging'],
      tip: 'Now your changes are staged! Run "git commit -m \\"your message\\"" to take a permanent snapshot.',
    };

    return {
      newState,
      result: {
        command: rawCommand,
        output: '',
        isError: false,
        stateUpdated: true,
        explanation,
      },
    };
  }

  // 4. git commit
  if (subCmd === 'commit') {
    const stagedEntries = Object.values(newState.stagingArea);
    if (stagedEntries.length === 0) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `On branch ${newState.currentBranch}\nno changes added to commit (use "git add" to stage)`,
          isError: true,
        },
      };
    }

    // Extract message
    let message = '';
    const mIndex = args.indexOf('-m');
    if (mIndex !== -1 && args[mIndex + 1]) {
      const rawMsg = trimmed.substring(trimmed.indexOf('-m') + 2).trim();
      message = rawMsg.replace(/^["']|["']$/g, '');
    } else {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `error: switch 'm' requires a value\nUsage: git commit -m "<message>"`,
          isError: true,
        },
      };
    }

    if (!message) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `Aborting commit due to empty commit message.`,
          isError: true,
        },
      };
    }

    const currentBranchName = newState.currentBranch;
    const parentHash = newState.branches[currentBranchName]?.commitHash || '';
    const parentCommit = newState.commits.find((c) => c.hash === parentHash);

    // Build commit tree from parent commit tree + staged entries
    const tree: Record<string, string> = parentCommit ? { ...parentCommit.tree } : {};
    for (const staged of stagedEntries) {
      if (staged.status === 'deleted') {
        delete tree[staged.path];
      } else {
        tree[staged.path] = staged.content;
      }
    }

    const hashes = generateHash();

    // Compute diffs
    const diffs: CommitDiff[] = [];
    for (const staged of stagedEntries) {
      const prevContent = newState.workingDirectory[staged.path]?.originalContent || '';
      diffs.push(createDiff(staged.path, prevContent, staged.content));
      // Update working directory file status to unmodified
      if (newState.workingDirectory[staged.path]) {
        newState.workingDirectory[staged.path].status = 'unmodified';
        newState.workingDirectory[staged.path].originalContent = staged.content;
      }
    }

    const newCommit: Commit = {
      hash: hashes.full,
      shortHash: hashes.short,
      message,
      author: 'Dev Learner <you@gitquest.dev>',
      timestamp: Date.now(),
      parentHashes: parentHash ? [parentHash] : [],
      tree,
      branch: currentBranchName,
      diffs,
    };

    newState.commits.push(newCommit);
    if (!newState.branches[currentBranchName]) {
      newState.branches[currentBranchName] = { name: currentBranchName, commitHash: hashes.full };
    } else {
      newState.branches[currentBranchName].commitHash = hashes.full;
    }
    newState.stagingArea = {};

    const explanation: ExplanationData = {
      whatHappened: `Created a new snapshot commit [${hashes.short}] "${message}" on branch "${currentBranchName}".`,
      why: 'A commit is an immutable snapshot of the staging area with metadata (author, timestamp, parent commit). Your staging area is now clean.',
      affectedZones: ['staging', 'repo'],
      tip: 'View your new commit in the visual Commit Graph or by typing "git log --oneline".',
    };

    const changesSummary = diffs.map((d) => ` ${d.path} | +${d.linesAdded} -${d.linesDeleted}`).join('\n');

    return {
      newState,
      result: {
        command: rawCommand,
        output: `[${currentBranchName} ${hashes.short}] ${message}\n ${diffs.length} file${diffs.length > 1 ? 's' : ''} changed\n${changesSummary}`,
        isError: false,
        stateUpdated: true,
        explanation,
      },
    };
  }

  // 5. git log
  if (subCmd === 'log') {
    const isOneLine = args.includes('--oneline');
    const branchCommits = newState.commits.filter((c) => {
      // Find reachable commits from current branch
      return true;
    }).slice().reverse();

    if (branchCommits.length === 0) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `fatal: your current branch '${newState.currentBranch}' does not have any commits yet`,
          isError: true,
        },
      };
    }

    let out = '';
    if (isOneLine) {
      out = branchCommits
        .map((c) => {
          const isHead = c.hash === newState.branches[newState.currentBranch]?.commitHash;
          const headTag = isHead ? `\x1b[36m (HEAD -> ${newState.currentBranch})\x1b[0m` : '';
          return `\x1b[33m${c.shortHash}\x1b[0m${headTag} ${c.message}`;
        })
        .join('\n');
    } else {
      out = branchCommits
        .map((c) => {
          const isHead = c.hash === newState.branches[newState.currentBranch]?.commitHash;
          const headTag = isHead ? ` (HEAD -> ${newState.currentBranch})` : '';
          const dateStr = new Date(c.timestamp).toUTCString();
          return `\x1b[33mcommit ${c.hash}\x1b[0m\x1b[36m${headTag}\x1b[0m\nAuthor: ${c.author}\nDate:   ${dateStr}\n\n    ${c.message}\n`;
        })
        .join('\n');
    }

    const explanation: ExplanationData = {
      whatHappened: 'Listed the chronological history of commits starting from HEAD backwards.',
      why: 'Git logs let you see who made what changes, when, and read their commit messages to understand project evolution.',
      affectedZones: ['repo'],
      tip: 'Use "git log --oneline" for a clean, concise single-line overview.',
    };

    return {
      newState,
      result: {
        command: rawCommand,
        output: out,
        isError: false,
        explanation,
      },
    };
  }

  // 6. git diff
  if (subCmd === 'diff') {
    const isStaged = args.includes('--staged') || args.includes('--cached');
    let out = '';

    if (isStaged) {
      for (const staged of Object.values(newState.stagingArea)) {
        const orig = newState.workingDirectory[staged.path]?.originalContent || '';
        const d = createDiff(staged.path, orig, staged.content);
        out += d.diff + '\n';
      }
      if (!out) out = 'No staged changes to display.';
    } else {
      for (const file of Object.values(newState.workingDirectory)) {
        if (file.status === 'modified' && !newState.stagingArea[file.path]) {
          const d = createDiff(file.path, file.originalContent || '', file.content);
          out += d.diff + '\n';
        }
      }
      if (!out) out = 'No unstaged working tree changes to display.';
    }

    const explanation: ExplanationData = {
      whatHappened: isStaged
        ? 'Inspected line-by-line differences in the Staging Area against the last commit.'
        : 'Inspected line-by-line differences in the Working Directory against the Staging Area.',
      why: 'Checking diffs ensures you never commit unintended debugging code, formatting errors, or temporary test data.',
      affectedZones: isStaged ? ['staging', 'repo'] : ['working', 'staging'],
      tip: 'Green (+) lines are added; Red (-) lines are deleted.',
    };

    return {
      newState,
      result: {
        command: rawCommand,
        output: out,
        isError: false,
        explanation,
      },
    };
  }

  // 7. git branch
  if (subCmd === 'branch') {
    const branchName = args[1];
    const isDelete = args[1] === '-d' || args[1] === '-D';

    if (isDelete) {
      const toDelete = args[2];
      if (!toDelete) {
        return {
          newState,
          result: {
            command: rawCommand,
            output: `fatal: branch name required for deletion`,
            isError: true,
          },
        };
      }
      if (toDelete === newState.currentBranch) {
        return {
          newState,
          result: {
            command: rawCommand,
            output: `error: Cannot delete branch '${toDelete}' checked out at '/project'`,
            isError: true,
          },
        };
      }
      if (!newState.branches[toDelete]) {
        return {
          newState,
          result: {
            command: rawCommand,
            output: `error: branch '${toDelete}' not found.`,
            isError: true,
          },
        };
      }
      delete newState.branches[toDelete];
      return {
        newState,
        result: {
          command: rawCommand,
          output: `Deleted branch ${toDelete}.`,
          isError: false,
          stateUpdated: true,
          explanation: {
            whatHappened: `Deleted branch pointer "${toDelete}".`,
            why: 'Branches are lightweight pointers to commits. Deleting a branch removes the pointer, keeping main clean.',
            affectedZones: ['repo'],
          },
        },
      };
    }

    // List branches
    if (!branchName) {
      let out = '';
      for (const b of Object.keys(newState.branches)) {
        if (b === newState.currentBranch) {
          out += `* \x1b[32m${b}\x1b[0m\n`;
        } else {
          out += `  ${b}\n`;
        }
      }
      return {
        newState,
        result: {
          command: rawCommand,
          output: out.trimEnd(),
          isError: false,
          explanation: {
            whatHappened: 'Listed all local branches. The green asterisk (*) marks your active branch (HEAD).',
            why: 'Branches allow developers to work on features or bugfixes in complete isolation without breaking main.',
            affectedZones: ['repo'],
          },
        },
      };
    }

    // Create branch
    if (newState.branches[branchName]) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `fatal: a branch named '${branchName}' already exists`,
          isError: true,
        },
      };
    }

    const currentHash = newState.branches[newState.currentBranch]?.commitHash || '';
    newState.branches[branchName] = { name: branchName, commitHash: currentHash };

    const explanation: ExplanationData = {
      whatHappened: `Created a new branch pointer named "${branchName}" pointing to ${currentHash ? currentHash.substring(0, 7) : 'empty'}.`,
      why: 'A Git branch is just a 41-byte text file containing a commit hash! Creating a branch takes virtually zero disk space and milliseconds.',
      affectedZones: ['repo'],
      tip: `Switch to your new branch with "git switch ${branchName}".`,
    };

    return {
      newState,
      result: {
        command: rawCommand,
        output: '',
        isError: false,
        stateUpdated: true,
        explanation,
      },
    };
  }

  // 8. git switch / git checkout
  if (subCmd === 'switch' || subCmd === 'checkout') {
    let createNew = false;
    let targetBranch = '';

    if (args[1] === '-c' || (subCmd === 'checkout' && args[1] === '-b')) {
      createNew = true;
      targetBranch = args[2];
    } else {
      targetBranch = args[1];
    }

    if (!targetBranch) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `fatal: missing branch name`,
          isError: true,
        },
      };
    }

    if (createNew) {
      if (newState.branches[targetBranch]) {
        return {
          newState,
          result: {
            command: rawCommand,
            output: `fatal: a branch named '${targetBranch}' already exists`,
            isError: true,
          },
        };
      }
      const currentHash = newState.branches[newState.currentBranch]?.commitHash || '';
      newState.branches[targetBranch] = { name: targetBranch, commitHash: currentHash };
    } else if (!newState.branches[targetBranch]) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `fatal: invalid reference: ${targetBranch}`,
          isError: true,
        },
      };
    }

    newState.currentBranch = targetBranch;
    newState.HEAD = targetBranch;

    // Load file tree of target commit
    const targetCommitHash = newState.branches[targetBranch].commitHash;
    const targetCommit = newState.commits.find((c) => c.hash === targetCommitHash);
    if (targetCommit) {
      for (const [path, content] of Object.entries(targetCommit.tree)) {
        if (!newState.workingDirectory[path]) {
          const parts = path.split('/');
          newState.workingDirectory[path] = {
            name: parts[parts.length - 1],
            path,
            content,
            status: 'unmodified',
            originalContent: content,
          };
        } else {
          newState.workingDirectory[path].content = content;
          newState.workingDirectory[path].originalContent = content;
          newState.workingDirectory[path].status = 'unmodified';
        }
      }
    }

    const explanation: ExplanationData = {
      whatHappened: `Switched HEAD to branch "${targetBranch}". Working files were restored to match that branch's snapshot.`,
      why: 'When you switch branches, Git swaps your physical working files to match the snapshot of the chosen branch.',
      affectedZones: ['working', 'repo'],
      tip: 'Any new commits will now be recorded on this branch.',
    };

    return {
      newState,
      result: {
        command: rawCommand,
        output: createNew
          ? `Switched to a new branch '${targetBranch}'`
          : `Switched to branch '${targetBranch}'`,
        isError: false,
        stateUpdated: true,
        explanation,
      },
    };
  }

  // 9. git merge
  if (subCmd === 'merge') {
    const incomingBranch = args[1];
    if (!incomingBranch) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `fatal: No branch specified to merge into ${newState.currentBranch}`,
          isError: true,
        },
      };
    }

    if (!newState.branches[incomingBranch]) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `merge: ${incomingBranch} - not something we can merge`,
          isError: true,
        },
      };
    }

    if (incomingBranch === newState.currentBranch) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `Already up to date.`,
          isError: false,
        },
      };
    }

    // Check for simulated conflict state
    if (newState.conflictState && newState.conflictState.active && !newState.conflictState.isResolved) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `CONFLICT (content): Merge conflict in ${newState.conflictState.filePath}\nAutomatic merge failed; fix conflicts and then commit the result.`,
          isError: true,
          explanation: {
            whatHappened: `Git detected overlapping changes in ${newState.conflictState.filePath}.`,
            why: 'Both branches modified the same lines. Git refuses to guess which version you want and inserts <<<<<<< conflict markers for you to resolve.',
            affectedZones: ['working', 'repo'],
            tip: 'Open the Conflict Lab to resolve the conflicting lines!',
          },
        },
      };
    }

    const incomingHash = newState.branches[incomingBranch].commitHash;
    const currentHash = newState.branches[newState.currentBranch].commitHash;
    const incomingCommit = newState.commits.find((c) => c.hash === incomingHash);

    // Fast-forward or 3-way merge commit
    const isFastForward = incomingCommit && (!currentHash || incomingCommit.parentHashes.includes(currentHash));

    if (isFastForward) {
      newState.branches[newState.currentBranch].commitHash = incomingHash;
      if (incomingCommit) {
        for (const [p, content] of Object.entries(incomingCommit.tree)) {
          if (newState.workingDirectory[p]) {
            newState.workingDirectory[p].content = content;
            newState.workingDirectory[p].originalContent = content;
          }
        }
      }

      const explanation: ExplanationData = {
        whatHappened: `Fast-forward merged branch "${incomingBranch}" into "${newState.currentBranch}".`,
        why: 'Because main had no diverging commits, Git simply slid the pointer forward without creating a new merge commit.',
        affectedZones: ['repo'],
      };

      return {
        newState,
        result: {
          command: rawCommand,
          output: `Updating ${currentHash ? currentHash.substring(0, 7) : 'empty'}..${incomingHash.substring(0, 7)}\nFast-forward`,
          isError: false,
          stateUpdated: true,
          explanation,
        },
      };
    } else {
      // 3-way merge commit
      const hashes = generateHash();
      const mergeCommit: Commit = {
        hash: hashes.full,
        shortHash: hashes.short,
        message: `Merge branch '${incomingBranch}' into ${newState.currentBranch}`,
        author: 'Dev Learner <you@gitquest.dev>',
        timestamp: Date.now(),
        parentHashes: [currentHash, incomingHash],
        tree: incomingCommit ? { ...incomingCommit.tree } : {},
        branch: newState.currentBranch,
        diffs: [],
      };
      newState.commits.push(mergeCommit);
      newState.branches[newState.currentBranch].commitHash = hashes.full;

      const explanation: ExplanationData = {
        whatHappened: `Created a merge commit [${hashes.short}] joining "${incomingBranch}" and "${newState.currentBranch}".`,
        why: 'Since both branches had divergent commits, Git created a special commit with two parent commits to unite their histories.',
        affectedZones: ['repo'],
      };

      return {
        newState,
        result: {
          command: rawCommand,
          output: `Merge made by the 'ort' strategy.\n ${mergeCommit.message}`,
          isError: false,
          stateUpdated: true,
          explanation,
        },
      };
    }
  }

  // 10. git remote
  if (subCmd === 'remote') {
    if (args[1] === '-v') {
      let out = '';
      for (const [name, r] of Object.entries(newState.remotes)) {
        out += `${name}\t${r.url} (fetch)\n${name}\t${r.url} (push)\n`;
      }
      return {
        newState,
        result: {
          command: rawCommand,
          output: out.trimEnd() || 'No remotes configured.',
          isError: false,
        },
      };
    }
    if (args[1] === 'add') {
      const name = args[2];
      const url = args[3];
      if (!name || !url) {
        return {
          newState,
          result: {
            command: rawCommand,
            output: `usage: git remote add <name> <url>`,
            isError: true,
          },
        };
      }
      newState.remotes[name] = {
        name,
        url,
        branches: {},
        commits: [],
      };
      return {
        newState,
        result: {
          command: rawCommand,
          output: '',
          isError: false,
          stateUpdated: true,
          explanation: {
            whatHappened: `Linked remote repository "${name}" to ${url}.`,
            why: 'A remote is a nickname (like "origin") pointing to a repository hosted on GitHub or a remote server.',
            affectedZones: ['repo', 'github'],
          },
        },
      };
    }
    return {
      newState,
      result: {
        command: rawCommand,
        output: Object.keys(newState.remotes).join('\n') || '',
        isError: false,
      },
    };
  }

  // 11. git push
  if (subCmd === 'push') {
    const remoteName = args[1] || 'origin';
    const branchName = args[2] || newState.currentBranch;

    if (!newState.remotes[remoteName]) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `fatal: '${remoteName}' does not appear to be a git repository\nHave you added a remote with "git remote add origin <url>"?`,
          isError: true,
        },
      };
    }

    const currentHash = newState.branches[branchName]?.commitHash;
    if (!currentHash) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `error: src refspec ${branchName} does not match any.`,
          isError: true,
        },
      };
    }

    // Sync commits to remote
    const remote = newState.remotes[remoteName];
    remote.branches[branchName] = currentHash;
    remote.commits = [...newState.commits];

    const explanation: ExplanationData = {
      whatHappened: `Transferred local commits on "${branchName}" to remote "${remoteName}" on GitHub.`,
      why: 'Pushing copies your commit objects and advances the remote branch pointer so teammates can access your work.',
      affectedZones: ['repo', 'github'],
      tip: 'Your commits are now live on GitHub! Teammates can pull or review them in a Pull Request.',
    };

    return {
      newState,
      result: {
        command: rawCommand,
        output: `Enumerating objects: 5, done.\nWriting objects: 100% (5/5), done.\nTo ${remote.url}\n * [new branch]      ${branchName} -> ${branchName}`,
        isError: false,
        stateUpdated: true,
        explanation,
      },
    };
  }

  // 12. git pull
  if (subCmd === 'pull') {
    const remoteName = args[1] || 'origin';
    const branchName = args[2] || newState.currentBranch;
    const remote = newState.remotes[remoteName];

    if (!remote) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `fatal: '${remoteName}' does not appear to be a git repository`,
          isError: true,
        },
      };
    }

    // Sync remote commits into local
    for (const c of remote.commits) {
      if (!newState.commits.some((local) => local.hash === c.hash)) {
        newState.commits.push(c);
      }
    }
    if (remote.branches[branchName]) {
      newState.branches[branchName] = {
        name: branchName,
        commitHash: remote.branches[branchName],
      };
    }

    const explanation: ExplanationData = {
      whatHappened: `Fetched updates from "${remoteName}/${branchName}" and integrated them into your local branch.`,
      why: '"git pull" does a fetch followed by a merge. It keeps your local repository synchronized with teammate changes.',
      affectedZones: ['github', 'repo', 'working'],
    };

    return {
      newState,
      result: {
        command: rawCommand,
        output: `Already up to date.\nOr fetched updates from ${remote.url}`,
        isError: false,
        stateUpdated: true,
        explanation,
      },
    };
  }

  // 13. git stash
  if (subCmd === 'stash') {
    const subAction = args[1];
    if (subAction === 'pop') {
      if (newState.stash.length === 0) {
        return {
          newState,
          result: {
            command: rawCommand,
            output: `error: No stash entries found.`,
            isError: true,
          },
        };
      }
      const popped = newState.stash.pop()!;
      newState.workingDirectory = { ...popped.workingDirectory };
      newState.stagingArea = { ...popped.stagingArea };

      return {
        newState,
        result: {
          command: rawCommand,
          output: `On branch ${newState.currentBranch}\nChanges restored from stash@{0}.\nDropped stash@{0}`,
          isError: false,
          stateUpdated: true,
          explanation: {
            whatHappened: 'Restored your stashed changes back into your working directory.',
            why: '"git stash pop" re-applies your saved uncommitted work and removes it from the stash stack.',
            affectedZones: ['working', 'staging'],
          },
        },
      };
    }

    if (subAction === 'list') {
      const listStr = newState.stash
        .map((s, idx) => `stash@{${idx}}: WIP on ${s.branch}: ${s.message}`)
        .join('\n');
      return {
        newState,
        result: {
          command: rawCommand,
          output: listStr || 'No stash entries.',
          isError: false,
        },
      };
    }

    // Default: git stash (save)
    const hasDirty =
      Object.values(newState.workingDirectory).some((f) => f.status !== 'unmodified') ||
      Object.keys(newState.stagingArea).length > 0;

    if (!hasDirty) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `No local changes to save`,
          isError: false,
        },
      };
    }

    newState.stash.push({
      id: `stash-${Date.now()}`,
      message: args[2] || `WIP on ${newState.currentBranch}`,
      branch: newState.currentBranch,
      workingDirectory: JSON.parse(JSON.stringify(newState.workingDirectory)),
      stagingArea: JSON.parse(JSON.stringify(newState.stagingArea)),
      timestamp: Date.now(),
    });

    // Reset working directory to clean
    for (const f of Object.values(newState.workingDirectory)) {
      if (f.originalContent !== undefined) {
        f.content = f.originalContent;
        f.status = 'unmodified';
      }
    }
    newState.stagingArea = {};

    return {
      newState,
      result: {
        command: rawCommand,
        output: `Saved working directory and index state WIP on ${newState.currentBranch}`,
        isError: false,
        stateUpdated: true,
        explanation: {
          whatHappened: 'Temporarily stashed all uncommitted changes and restored a clean working directory.',
          why: 'Allows you to quickly switch branches or pull updates without committing half-finished work.',
          affectedZones: ['working', 'staging'],
          tip: 'Use "git stash pop" later to restore your changes.',
        },
      },
    };
  }

  // 14. git restore
  if (subCmd === 'restore') {
    const isStaged = args.includes('--staged');
    const targetFile = args[args.length - 1];

    if (!targetFile || targetFile.startsWith('-')) {
      return {
        newState,
        result: {
          command: rawCommand,
          output: `fatal: you must specify path(s) to restore`,
          isError: true,
        },
      };
    }

    if (isStaged) {
      if (newState.stagingArea[targetFile]) {
        delete newState.stagingArea[targetFile];
        return {
          newState,
          result: {
            command: rawCommand,
            output: '',
            isError: false,
            stateUpdated: true,
            explanation: {
              whatHappened: `Unstaged ${targetFile}. Your file changes remain in the Working Directory.`,
              why: '"git restore --staged" safely removes changes from the index without losing your typed edits.',
              affectedZones: ['staging', 'working'],
            },
          },
        };
      }
    } else {
      const file = newState.workingDirectory[targetFile];
      if (file && file.originalContent !== undefined) {
        file.content = file.originalContent;
        file.status = 'unmodified';
        return {
          newState,
          result: {
            command: rawCommand,
            output: '',
            isError: false,
            stateUpdated: true,
            explanation: {
              whatHappened: `Discarded working directory changes in ${targetFile}.`,
              why: '"git restore <file>" reverts the file back to the last committed version.',
              affectedZones: ['working'],
            },
          },
        };
      }
    }
  }

  // Fallback unrecognized git command
  return {
    newState,
    result: {
      command: rawCommand,
      output: `git: '${subCmd}' is not a recognized git command. See 'git --help'.`,
      isError: true,
    },
  };
}
