export interface CheatSheetEntry {
  command: string;
  description: string;
  category: 'setup' | 'snapshot' | 'branch' | 'remote' | 'advanced';
}

export const GIT_CHEATSHEET: CheatSheetEntry[] = [
  { command: 'git init', description: 'Initialize a new local Git repository', category: 'setup' },
  { command: 'git clone <url>', description: 'Clone a remote repository to your local computer', category: 'setup' },
  { command: 'git status', description: 'Show the working tree status (modified, staged, untracked)', category: 'snapshot' },
  { command: 'git add <file>', description: 'Add file contents to the staging area', category: 'snapshot' },
  { command: 'git add .', description: 'Stage all modified and new files in the current repository', category: 'snapshot' },
  { command: 'git commit -m "<msg>"', description: 'Record changes to the repository with a message', category: 'snapshot' },
  { command: 'git log --oneline', description: 'Show commit logs in a compact, single-line format', category: 'snapshot' },
  { command: 'git diff', description: 'Show changes between working directory and staging area', category: 'snapshot' },
  { command: 'git diff --staged', description: 'Show changes between staging area and latest commit', category: 'snapshot' },
  { command: 'git branch', description: 'List all local branches (* marks current branch)', category: 'branch' },
  { command: 'git switch -c <name>', description: 'Create and switch to a new branch', category: 'branch' },
  { command: 'git switch <name>', description: 'Switch to an existing branch', category: 'branch' },
  { command: 'git merge <branch>', description: 'Merge the specified branch into the current branch', category: 'branch' },
  { command: 'git remote add origin <url>', description: 'Add a new remote repository connection', category: 'remote' },
  { command: 'git push -u origin <branch>', description: 'Push commits to remote repository with upstream tracking', category: 'remote' },
  { command: 'git pull origin <branch>', description: 'Fetch and integrate remote changes into local branch', category: 'remote' },
  { command: 'git stash', description: 'Temporarily shelve changes to work on something else', category: 'advanced' },
  { command: 'git stash pop', description: 'Restore previously stashed changes', category: 'advanced' },
];
