import { createInitialRepo, executeGitCommand } from '../src/engine/gitSimulator';

console.log('--- Testing GitQuest In-Browser Git Simulator ---');

// 1. Initial State
let repo = createInitialRepo(
  {
    'index.html': { content: '<h1>Hello</h1>', status: 'modified', originalContent: '<h1>Old</h1>' },
    'style.css': { content: 'body { margin: 0; }', status: 'unmodified' },
    'temp.js': { content: 'console.log(1);', status: 'untracked' },
  },
  [
    { message: 'Initial commit', files: { 'index.html': '<h1>Old</h1>', 'style.css': 'body { margin: 0; }' } },
  ],
  ['main'],
  'main'
);

console.log('✓ Repo initialized with', Object.keys(repo.workingDirectory).length, 'files and', repo.commits.length, 'commits.');

// 2. git status
let res = executeGitCommand(repo, 'git status');
repo = res.newState;
console.log('✓ git status output:\n', res.result.output);
if (!res.result.output.includes('modified:   index.html') || !res.result.output.includes('temp.js')) {
  throw new Error('git status failed to identify modified and untracked files');
}

// 3. git add index.html (selective stage)
res = executeGitCommand(repo, 'git add index.html');
repo = res.newState;
if (!repo.stagingArea['index.html'] || repo.stagingArea['temp.js']) {
  throw new Error('Selective staging failed: index.html should be staged, temp.js should not');
}
console.log('✓ Selective git add index.html passed. Staged files:', Object.keys(repo.stagingArea));

// 4. git commit -m "Update title"
res = executeGitCommand(repo, 'git commit -m "Update title"');
repo = res.newState;
if (repo.commits.length !== 2) {
  throw new Error('Commit failed to append to commits array');
}
if (repo.commits[1].message !== 'Update title') {
  throw new Error('Commit message incorrect');
}
if (Object.keys(repo.stagingArea).length !== 0) {
  throw new Error('Staging area should be empty after commit');
}
console.log('✓ git commit passed. Latest commit:', repo.commits[1].shortHash, repo.commits[1].message);

// 5. git log --oneline
res = executeGitCommand(repo, 'git log --oneline');
repo = res.newState;
console.log('✓ git log --oneline:\n', res.result.output);

// 6. Branching: git branch feature/nav & git switch feature/nav
res = executeGitCommand(repo, 'git branch feature/nav');
repo = res.newState;
if (!repo.branches['feature/nav']) throw new Error('Branch creation failed');

res = executeGitCommand(repo, 'git switch feature/nav');
repo = res.newState;
if (repo.currentBranch !== 'feature/nav') throw new Error('Branch switch failed');
console.log('✓ git switch feature/nav passed. HEAD is now at', repo.currentBranch);

// 7. Commit on feature branch
res = executeGitCommand(repo, 'git add .');
repo = res.newState;
console.log('git add . output:', res.result);
res = executeGitCommand(repo, 'git commit -m "Add nav feature"');
repo = res.newState;
console.log('git commit output:', res.result);
if (repo.branches['feature/nav'].commitHash === repo.branches['main'].commitHash) {
  throw new Error('feature/nav should have advanced past main');
}
console.log('✓ Commit on feature/nav passed. Commits:', repo.commits.length);

// 8. Switch back to main and fast-forward merge
res = executeGitCommand(repo, 'git switch main');
repo = res.newState;
res = executeGitCommand(repo, 'git merge feature/nav');
repo = res.newState;
if (repo.branches['main'].commitHash !== repo.branches['feature/nav'].commitHash) {
  throw new Error('Fast-forward merge failed to sync main pointer with feature/nav');
}
console.log('✓ Fast-forward git merge passed. main pointer updated.');

// 9. Remote: git remote add origin & git push
res = executeGitCommand(repo, 'git remote add origin https://github.com/team/gitquest.git');
repo = res.newState;
if (!repo.remotes['origin']) throw new Error('git remote add failed');

res = executeGitCommand(repo, 'git push origin main');
repo = res.newState;
if (!repo.remotes['origin'].branches['main']) throw new Error('git push failed to sync branch to origin');
console.log('✓ git remote add & git push passed. Remote commits:', repo.remotes['origin'].commits.length);

console.log('\n ALL 9 ENGINE TESTS PASSED SUCCESSFULLY!');
