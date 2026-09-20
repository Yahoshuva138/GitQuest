import { Mission } from '../engine/types';

export const MISSIONS: Mission[] = [
  // ----------------------------------------------------
  // LEVEL 01 — Git Explorer
  // ----------------------------------------------------
  {
    id: 'm-01-meet-git',
    levelNumber: 1,
    levelId: 'level-01',
    levelName: 'Git Explorer',
    title: 'Meet Git',
    subtitle: 'Initialize Your First Repository',
    badge: 'MISSION 01',
    objective: 'Transform a normal project folder into a Git-tracked version-controlled repository.',
    situation: 'You just created a website folder with index.html, style.css, and app.js. Right now, it is just a folder on your computer. Git does not track anything until you ask it to.',
    whatYouKnow: [
      'Git is an offline tool running on your machine.',
      'A folder becomes a repository when you initialize it with .git.',
      'Until then, Git does not watch your files.',
    ],
    yourTask: 'Run the command to initialize a new Git repository in this project directory.',
    initialFiles: {
      'index.html': { content: '<!DOCTYPE html>\n<html>\n<head><title>My App</title></head>\n<body><h1>Hello GitQuest</h1></body>\n</html>', status: 'untracked' },
      'style.css': { content: 'body { font-family: sans-serif; background: #0D1117; color: white; }', status: 'untracked' },
      'app.js': { content: 'console.log("App initialized");', status: 'untracked' },
    },
    steps: [
      {
        id: 'step-init',
        title: 'Initialize Repository',
        description: 'Initialize Git in the current directory.',
        expectedCommand: 'git init',
        checkCompletion: (state) => state.initialized,
        taskHint: 'Type "git init" and press Enter.',
        successMessage: 'Awesome! You created the hidden .git directory. This folder is now an active Git repository!',
        whatHappenedExplanation: 'Git initialized a hidden .git metadata folder that stores all snapshots and branches.',
        whyExplanation: 'Git keeps all version control records locally in the .git folder rather than altering your actual code files.',
      },
      {
        id: 'step-status',
        title: 'Check Repository Status',
        description: 'Now inspect your newly initialized repository to see what Git sees.',
        expectedCommand: 'git status',
        checkCompletion: (_, lastCmd) => lastCmd.trim() === 'git status',
        taskHint: 'Type "git status" to see the untracked files.',
        successMessage: 'Great work! Notice how index.html, style.css, and app.js are in red (Untracked).',
        whatHappenedExplanation: 'Git scanned the working directory and reported that none of the files are tracked yet.',
        whyExplanation: 'Git respects your privacy and control: it never assumes a file should be tracked until you explicitly tell it to.',
      },
    ],
    hints: [
      'Hint 1: The command to initialize a repository starts with "git".',
      'Hint 2: Type "git init" in the terminal below.',
      'Explanation: "git init" creates the local repository database.',
    ],
    takeaways: [
      'Git is a local version control system.',
      '"git init" creates a repository by setting up a .git folder.',
      '"git status" lets you inspect what Git sees at any moment.',
    ],
    nextMissionId: 'm-02-inspect-workspace',
  },

  {
    id: 'm-02-inspect-workspace',
    levelNumber: 1,
    levelId: 'level-01',
    levelName: 'Git Explorer',
    title: 'Inspect Your Workspace',
    subtitle: 'Understand What Changed',
    badge: 'MISSION 02',
    objective: 'Learn how to inspect the working directory and identify which files have uncommitted modifications.',
    situation: 'Your teammate Maya updated the project while you were away. You sat down at your desk and need to know what state the project is in before touching any code.',
    whatYouKnow: [
      'Never guess what files have changed.',
      '"git status" is a developer\'s reflex — run it frequently.',
      'Red files mean they are in the Working Directory and not yet staged.',
    ],
    yourTask: 'Run "git status" to inspect Maya\'s changes, then use "git diff" to see the exact code lines that were edited.',
    initialFiles: {
      'index.html': {
        content: '<!DOCTYPE html>\n<html>\n<head><title>My App</title></head>\n<body><h1>Welcome to GitQuest Pro</h1><p>Learn Git visually</p></body>\n</html>',
        originalContent: '<!DOCTYPE html>\n<html>\n<head><title>My App</title></head>\n<body><h1>Hello GitQuest</h1></body>\n</html>',
        status: 'modified',
      },
      'style.css': {
        content: 'body { font-family: sans-serif; background: #0D1117; color: white; }',
        status: 'unmodified',
      },
      'app.js': {
        content: 'console.log("App initialized");',
        status: 'unmodified',
      },
    },
    initialCommits: [
      {
        message: 'Initial project setup',
        files: {
          'index.html': '<!DOCTYPE html>\n<html>\n<head><title>My App</title></head>\n<body><h1>Hello GitQuest</h1></body>\n</html>',
          'style.css': 'body { font-family: sans-serif; background: #0D1117; color: white; }',
          'app.js': 'console.log("App initialized");',
        },
      },
    ],
    steps: [
      {
        id: 'step-check-status',
        title: 'Check Working Directory Status',
        description: 'Inspect which file was changed in the project.',
        expectedCommand: 'git status',
        checkCompletion: (_, lastCmd) => lastCmd.trim() === 'git status',
        taskHint: 'Type "git status" to see the modified file.',
        successMessage: 'Look at that: index.html is marked in red as "modified: index.html".',
        whatHappenedExplanation: 'Git compared index.html against the last commit and found differences.',
        whyExplanation: 'Git calculates cryptographic hashes of file contents to instantly detect edits without reading every line.',
      },
      {
        id: 'step-diff',
        title: 'Inspect Line Differences',
        description: 'View the exact lines that were modified inside index.html.',
        expectedCommand: 'git diff',
        checkCompletion: (_, lastCmd) => lastCmd.trim().startsWith('git diff'),
        taskHint: 'Type "git diff" to see the added and removed lines.',
        successMessage: 'Notice the green (+) and red (-) lines in the diff output! Maya updated the heading and added a paragraph.',
        whatHappenedExplanation: 'Git generated a unified diff comparing your working directory file against the last committed snapshot.',
        whyExplanation: 'Checking diffs before committing prevents accidental bugs, typos, and forgotten console.logs.',
      },
    ],
    hints: [
      'Hint 1: Use "git status" to see the list of modified files.',
      'Hint 2: Use "git diff" to see the line-by-line code changes.',
    ],
    takeaways: [
      '"git status" reveals which files have changed.',
      '"git diff" reveals which exact lines were added or removed.',
    ],
    nextMissionId: 'm-03-find-changes',
  },

  {
    id: 'm-03-find-changes',
    levelNumber: 1,
    levelId: 'level-01',
    levelName: 'Git Explorer',
    title: 'Find the Changes',
    subtitle: 'Distinguish Untracked vs Modified Files',
    badge: 'MISSION 03',
    objective: 'Identify the difference between an untracked file (brand new) and a modified file (previously committed).',
    situation: 'A new feature was started. A new configuration file "config.json" was added, and "app.js" was modified with new settings.',
    whatYouKnow: [
      'Untracked: Git has never seen this file in any previous commit.',
      'Modified: Git knows this file from earlier, but its contents changed.',
    ],
    yourTask: 'Run "git status" to inspect the differences between untracked and modified files.',
    initialFiles: {
      'app.js': {
        content: 'import config from "./config.json";\nconsole.log("Starting", config.appName);',
        originalContent: 'console.log("App initialized");',
        status: 'modified',
      },
      'config.json': {
        content: '{\n  "appName": "GitQuest",\n  "version": "1.0.0"\n}',
        status: 'untracked',
      },
      'index.html': {
        content: '<!DOCTYPE html><html><body><h1>GitQuest</h1></body></html>',
        status: 'unmodified',
      },
    },
    initialCommits: [
      {
        message: 'Initial project setup',
        files: {
          'index.html': '<!DOCTYPE html><html><body><h1>GitQuest</h1></body></html>',
          'app.js': 'console.log("App initialized");',
        },
      },
    ],
    steps: [
      {
        id: 'step-status',
        title: 'Observe Untracked vs Modified',
        description: 'Run git status to see both categories displayed separately.',
        expectedCommand: 'git status',
        checkCompletion: (_, lastCmd) => lastCmd.trim() === 'git status',
        taskHint: 'Type "git status"',
        successMessage: 'Notice how config.json is in "Untracked files", while app.js is in "Changes not staged for commit"!',
        whatHappenedExplanation: 'Git categorized config.json as new and app.js as an existing file with edits.',
        whyExplanation: 'Understanding this distinction helps you know when you need to start tracking new files or review updates.',
      },
    ],
    hints: ['Hint 1: Type "git status" in the terminal.'],
    takeaways: [
      'New files are "untracked" until added.',
      'Existing files with edits are "modified".',
    ],
    nextMissionId: 'm-04-stage-right-files',
  },

  // ----------------------------------------------------
  // LEVEL 02 — Committer
  // ----------------------------------------------------
  {
    id: 'm-04-stage-right-files',
    levelNumber: 2,
    levelId: 'level-02',
    levelName: 'Committer',
    title: 'Stage the Right Files',
    subtitle: 'The Selective Stager',
    badge: 'MISSION 04',
    objective: 'Selectively stage only the finished navbar fix, leaving unfinished experimental work in the working directory.',
    situation: 'You fixed a critical bug in navbar.css. While fixing it, you also started experimenting with test-widget.js, but test-widget.js is still broken and not ready for production. Your team only wants the navbar fix in the next commit!',
    whatYouKnow: [
      'Git has a STAGING AREA (index) between your working directory and commit history.',
      'You DO NOT have to commit everything you touched.',
      '"git add <filename>" lets you selectively stage specific files.',
    ],
    yourTask: 'Inspect the files with "git status", then stage ONLY "navbar.css" using "git add navbar.css". Do NOT stage "test-widget.js".',
    initialFiles: {
      'navbar.css': {
        content: '.navbar { display: flex; justify-content: space-between; padding: 1rem; background: #161B22; }',
        originalContent: '.navbar { display: block; }',
        status: 'modified',
      },
      'test-widget.js': {
        content: '// INCOMPLETE EXPERIMENT - DO NOT COMMIT\nfunction brokenWidget() { throw new Error(); }',
        status: 'untracked',
      },
      'index.html': {
        content: '<div class="navbar">GitQuest</div>',
        status: 'unmodified',
      },
    },
    initialCommits: [
      {
        message: 'Add initial layout',
        files: {
          'index.html': '<div class="navbar">GitQuest</div>',
          'navbar.css': '.navbar { display: block; }',
        },
      },
    ],
    steps: [
      {
        id: 'step-inspect',
        title: 'Inspect Changed Files',
        description: 'Check the working directory to see both the navbar and experimental widget.',
        expectedCommand: 'git status',
        checkCompletion: (_, lastCmd) => lastCmd.trim() === 'git status',
        taskHint: 'Type "git status"',
        successMessage: 'You see navbar.css (modified) and test-widget.js (untracked).',
        whatHappenedExplanation: 'Identified the 2 changed files.',
        whyExplanation: 'Seeing both files reminds you that committing everything with "git add ." would accidentally include broken code!',
      },
      {
        id: 'step-stage-navbar',
        title: 'Stage Only navbar.css',
        description: 'Stage only navbar.css into the Staging Area.',
        expectedCommand: 'git add navbar.css',
        checkCompletion: (state) => Boolean(state.stagingArea['navbar.css'] && !state.stagingArea['test-widget.js']),
        taskHint: 'Type "git add navbar.css" (do not add test-widget.js).',
        successMessage: 'Brilliant! Watch the Pipeline Visualizer: navbar.css moved into the Staging Area, while test-widget.js stayed behind in the Working Directory!',
        whatHappenedExplanation: 'Added navbar.css to the staging index, leaving test-widget.js alone.',
        whyExplanation: 'The Staging Area is your draft table. You choose only what belongs in the next logical commit.',
      },
    ],
    hints: [
      'Hint 1: Type "git add navbar.css".',
      'Hint 2: Do not use "git add ." because that would stage all files including the broken experiment.',
    ],
    takeaways: [
      'The staging area enables atomic, focused commits.',
      'Stage specific files with "git add <filename>".',
    ],
    nextMissionId: 'm-05-first-commit',
  },

  {
    id: 'm-05-first-commit',
    levelNumber: 2,
    levelId: 'level-02',
    levelName: 'Committer',
    title: 'Create Your First Commit',
    subtitle: 'Permanent Snapshots & Meaningful Messages',
    badge: 'MISSION 05',
    objective: 'Stage index.html and record a permanent snapshot with a descriptive commit message.',
    situation: 'A developer has given you a website project. You updated index.html with the new landing page copy. Now you need to create a permanent snapshot so your team has a clear record of this update.',
    whatYouKnow: [
      'A commit is an immutable snapshot of all files currently in the staging area.',
      'Every commit has a unique SHA hash, an author, a timestamp, and a commit message.',
      'Commit messages should describe WHAT changed and WHY.',
    ],
    yourTask: 'Stage index.html, then commit it with the message "Update homepage".',
    initialFiles: {
      'index.html': {
        content: '<!DOCTYPE html>\n<html>\n<head><title>GitQuest</title></head>\n<body><h1>Welcome to GitQuest</h1><p>Interactive Git Learning</p></body>\n</html>',
        originalContent: '<!DOCTYPE html>\n<html>\n<head><title>GitQuest</title></head>\n<body><h1>Old Title</h1></body>\n</html>',
        status: 'modified',
      },
      'style.css': {
        content: 'body { margin: 0; }',
        status: 'unmodified',
      },
    },
    initialCommits: [
      {
        message: 'Initial commit',
        files: {
          'index.html': '<!DOCTYPE html>\n<html>\n<head><title>GitQuest</title></head>\n<body><h1>Old Title</h1></body>\n</html>',
          'style.css': 'body { margin: 0; }',
        },
      },
    ],
    steps: [
      {
        id: 'step-stage',
        title: 'Stage index.html',
        description: 'Move index.html into the staging area.',
        expectedCommand: 'git add index.html',
        checkCompletion: (state) => Boolean(state.stagingArea['index.html']),
        taskHint: 'Type "git add index.html"',
        successMessage: 'index.html is staged and ready for snapshotting!',
        whatHappenedExplanation: 'Prepared index.html in the staging area.',
        whyExplanation: 'Commits are constructed from the staging area.',
      },
      {
        id: 'step-commit',
        title: 'Commit the Snapshot',
        description: 'Record the commit with the message "Update homepage".',
        expectedCommand: /^git commit -m ["']Update homepage["']$/i,
        checkCompletion: (state) => state.commits.some((c) => c.message.toLowerCase().includes('update homepage')),
        taskHint: 'Type: git commit -m "Update homepage"',
        successMessage: 'BOOM! Commit recorded! Look at the Commit Graph — your new commit node just appeared with a fresh short hash!',
        whatHappenedExplanation: 'Created a permanent commit snapshot in the local repository history.',
        whyExplanation: 'Git commits are permanent and replayable. You can always inspect or return to this exact moment in time.',
      },
    ],
    hints: [
      'Hint 1: First type "git add index.html".',
      'Hint 2: Then type: git commit -m "Update homepage"',
    ],
    takeaways: [
      'The Git cycle: Edit ➔ git add ➔ git commit.',
      'Commit messages should be concise and meaningful.',
    ],
    nextMissionId: 'm-06-inspect-history',
  },

  {
    id: 'm-06-inspect-history',
    levelNumber: 2,
    levelId: 'level-02',
    levelName: 'Committer',
    title: 'Inspect Your History',
    subtitle: 'Commit Detective with git log',
    badge: 'MISSION 06',
    objective: 'Use "git log" and "git log --oneline" to read repository history and locate specific commits.',
    situation: 'A bug was reported by user testing! The team needs you to inspect recent commit history to see who made the last change and what message they left.',
    whatYouKnow: [
      '"git log" displays commits in reverse chronological order (newest first).',
      '"git log --oneline" shows a condensed 1-line view with short hashes.',
      'HEAD points to the most recent commit on your current branch.',
    ],
    yourTask: 'Run "git log" to view full details, then run "git log --oneline" for the concise view.',
    initialFiles: {
      'index.html': { content: '<h1>GitQuest</h1>', status: 'unmodified' },
      'app.js': { content: 'console.log("v2.0");', status: 'unmodified' },
    },
    initialCommits: [
      { message: 'Initialize repository', author: 'Maya <maya@gitquest.dev>', files: { 'index.html': '<h1>App</h1>' } },
      { message: 'Add navbar component', author: 'Arjun <arjun@gitquest.dev>', files: { 'index.html': '<h1>App</h1><nav></nav>' } },
      { message: 'Fix login button layout', author: 'Sam <sam@gitquest.dev>', files: { 'index.html': '<h1>GitQuest</h1>' } },
    ],
    steps: [
      {
        id: 'step-log',
        title: 'View Full Commit Log',
        description: 'Read the full commit history with authors, timestamps, and messages.',
        expectedCommand: 'git log',
        checkCompletion: (_, lastCmd) => lastCmd.trim() === 'git log',
        taskHint: 'Type "git log"',
        successMessage: 'You can see all three commits with author names and full SHA hashes.',
        whatHappenedExplanation: 'Traversed the commit DAG backwards from HEAD.',
        whyExplanation: 'Git stores commits as a directed acyclic graph where each commit references its parent.',
      },
      {
        id: 'step-oneline',
        title: 'View Condensed Oneline Log',
        description: 'Inspect the compact single-line view of history.',
        expectedCommand: 'git log --oneline',
        checkCompletion: (_, lastCmd) => lastCmd.trim() === 'git log --oneline',
        taskHint: 'Type "git log --oneline"',
        successMessage: 'Notice how fast and easy it is to scan with short 7-character hashes!',
        whatHappenedExplanation: 'Printed short hashes and subject lines.',
        whyExplanation: 'Developers use --oneline every day to quickly find commit IDs for cherry-picks, rebases, or diffs.',
      },
    ],
    hints: [
      'Hint 1: First type "git log".',
      'Hint 2: Then type "git log --oneline".',
    ],
    takeaways: [
      '"git log" shows full details including author and date.',
      '"git log --oneline" is ideal for quick overviews.',
    ],
    nextMissionId: 'm-07-create-branch',
  },

  // ----------------------------------------------------
  // LEVEL 03 — Branch Explorer
  // ----------------------------------------------------
  {
    id: 'm-07-create-branch',
    levelNumber: 3,
    levelId: 'level-03',
    levelName: 'Branch Explorer',
    title: 'Create a Feature Branch',
    subtitle: 'Parallel Realities',
    badge: 'MISSION 07',
    objective: 'Create a new feature branch called "feature/login" to work without risking the stability of main.',
    situation: 'You are assigned to build the new Login page. The "main" branch is currently running in production. You must never write experimental code directly on main!',
    whatYouKnow: [
      'A branch is simply an isolated line of development.',
      'Technically, a branch in Git is just a movable pointer to a commit.',
      'Creating a branch takes almost zero memory and zero time.',
    ],
    yourTask: 'Create a new branch named "feature/login" using "git branch feature/login", then list your branches with "git branch".',
    initialFiles: {
      'index.html': { content: '<h1>GitQuest Production</h1>', status: 'unmodified' },
    },
    initialCommits: [
      { message: 'Production v1.0', files: { 'index.html': '<h1>GitQuest Production</h1>' } },
    ],
    steps: [
      {
        id: 'step-branch',
        title: 'Create the Branch',
        description: 'Create branch pointer named "feature/login".',
        expectedCommand: 'git branch feature/login',
        checkCompletion: (state) => Boolean(state.branches['feature/login']),
        taskHint: 'Type "git branch feature/login"',
        successMessage: 'Branch "feature/login" created! It currently points to the same commit as main.',
        whatHappenedExplanation: 'Created a new branch reference named feature/login.',
        whyExplanation: 'Git branches are lightweight pointers. Creating one does not duplicate your files.',
      },
      {
        id: 'step-list',
        title: 'List All Branches',
        description: 'List local branches and check which one is active.',
        expectedCommand: 'git branch',
        checkCompletion: (_, lastCmd) => lastCmd.trim() === 'git branch',
        taskHint: 'Type "git branch"',
        successMessage: 'See the green asterisk (* main)? That means you are still standing on "main"!',
        whatHappenedExplanation: 'Listed local branches.',
        whyExplanation: '"git branch <name>" only creates the pointer; it does not switch your active branch yet.',
      },
    ],
    hints: [
      'Hint 1: Type "git branch feature/login".',
      'Hint 2: Then type "git branch" to list them.',
    ],
    takeaways: [
      'Branches protect main from broken code.',
      '"git branch <name>" creates a branch pointer.',
      'The asterisk (*) indicates your active branch (HEAD).',
    ],
    nextMissionId: 'm-08-switch-and-work',
  },

  {
    id: 'm-08-switch-and-work',
    levelNumber: 3,
    levelId: 'level-03',
    levelName: 'Branch Explorer',
    title: 'Switch & Work in Isolation',
    subtitle: 'HEAD in Motion',
    badge: 'MISSION 08',
    objective: 'Switch to "feature/login", add a login form, and commit it in complete isolation from main.',
    situation: 'Now that the branch exists, switch to it so your next commits will only advance "feature/login", leaving "main" untouched.',
    whatYouKnow: [
      'HEAD is the special pointer that tracks which branch you are currently on.',
      '"git switch <branch>" moves HEAD to that branch.',
      'Commits made while on a branch only advance that specific branch.',
    ],
    yourTask: 'Switch to "feature/login" using "git switch feature/login". Then stage and commit the new login form with "Add login form".',
    initialFiles: {
      'login.html': {
        content: '<form><input type="email" placeholder="Email"/><button>Sign In</button></form>',
        status: 'untracked',
      },
      'index.html': { content: '<h1>GitQuest</h1>', status: 'unmodified' },
    },
    initialCommits: [
      { message: 'Production release', files: { 'index.html': '<h1>GitQuest</h1>' } },
    ],
    initialBranches: ['main', 'feature/login'],
    currentBranch: 'main',
    steps: [
      {
        id: 'step-switch',
        title: 'Switch to feature/login',
        description: 'Move HEAD to the feature branch.',
        expectedCommand: 'git switch feature/login',
        checkCompletion: (state) => state.currentBranch === 'feature/login',
        taskHint: 'Type "git switch feature/login"',
        successMessage: 'Switched! HEAD is now pointing to feature/login.',
        whatHappenedExplanation: 'Updated HEAD to feature/login.',
        whyExplanation: 'Now any subsequent commits will advance feature/login while main remains stable.',
      },
      {
        id: 'step-stage-all',
        title: 'Stage login.html',
        description: 'Stage the new login file.',
        expectedCommand: /^git add (login\.html|\.)$/,
        checkCompletion: (state) => Boolean(state.stagingArea['login.html']),
        taskHint: 'Type "git add login.html"',
        successMessage: 'login.html is staged on feature/login!',
        whatHappenedExplanation: 'Staged login.html.',
        whyExplanation: 'Prepares the file for the feature commit.',
      },
      {
        id: 'step-commit-feature',
        title: 'Commit the Feature',
        description: 'Commit with message "Add login form".',
        expectedCommand: /^git commit -m ["']Add login form["']$/i,
        checkCompletion: (state) => state.commits.some((c) => c.branch === 'feature/login'),
        taskHint: 'Type: git commit -m "Add login form"',
        successMessage: 'Look at the Branch Visualizer! feature/login branched off and has 1 new commit, while main is safely behind!',
        whatHappenedExplanation: 'Advanced feature/login by 1 commit.',
        whyExplanation: 'Your feature work is completely isolated from production code.',
      },
    ],
    hints: [
      'Hint 1: Type "git switch feature/login".',
      'Hint 2: Type "git add login.html", then git commit -m "Add login form".',
    ],
    takeaways: [
      '"git switch" points HEAD to a different branch.',
      'Working on a branch keeps experimental code away from main.',
    ],
    nextMissionId: 'm-09-merge-main',
  },

  {
    id: 'm-09-merge-main',
    levelNumber: 3,
    levelId: 'level-03',
    levelName: 'Branch Explorer',
    title: 'Merge Back to Main',
    subtitle: 'Unifying Histories',
    badge: 'MISSION 09',
    objective: 'Switch back to "main" and merge the completed "feature/login" branch.',
    situation: 'The login feature is tested and approved! Now it is time to bring those changes back into the "main" branch so they can be released to users.',
    whatYouKnow: [
      'To merge branch A into branch B, you MUST first switch to branch B.',
      'Rule: Stand where you want the changes to GO, then run "git merge <source>".',
      'If main hasn\'t changed since you branched, Git does a FAST-FORWARD merge.',
    ],
    yourTask: '1. Switch to main ("git switch main").\n2. Merge the feature ("git merge feature/login").',
    initialFiles: {
      'index.html': { content: '<h1>GitQuest</h1>', status: 'unmodified' },
      'login.html': { content: '<form>Login</form>', status: 'unmodified' },
    },
    initialCommits: [
      { message: 'Production v1', files: { 'index.html': '<h1>GitQuest</h1>' } },
      { message: 'Add login form', branch: 'feature/login', files: { 'index.html': '<h1>GitQuest</h1>', 'login.html': '<form>Login</form>' } },
    ],
    initialBranches: ['main', 'feature/login'],
    currentBranch: 'feature/login',
    steps: [
      {
        id: 'step-switch-main',
        title: 'Switch to main',
        description: 'Stand on the destination branch before merging.',
        expectedCommand: 'git switch main',
        checkCompletion: (state) => state.currentBranch === 'main',
        taskHint: 'Type "git switch main"',
        successMessage: 'You are back on main!',
        whatHappenedExplanation: 'Moved HEAD back to main.',
        whyExplanation: 'Always stand on the receiving branch before running git merge.',
      },
      {
        id: 'step-merge',
        title: 'Merge feature/login',
        description: 'Merge feature/login into main.',
        expectedCommand: 'git merge feature/login',
        checkCompletion: (state) => {
          const mainHash = state.branches['main']?.commitHash;
          const featHash = state.branches['feature/login']?.commitHash;
          return mainHash === featHash;
        },
        taskHint: 'Type "git merge feature/login"',
        successMessage: 'FAST-FORWARD! Look at the graph: main slid forward to catch up with feature/login!',
        whatHappenedExplanation: 'Performed a fast-forward merge.',
        whyExplanation: 'Because main had not diverged, Git simply pointed main to the newest commit on feature/login.',
      },
    ],
    hints: [
      'Hint 1: First type "git switch main".',
      'Hint 2: Then type "git merge feature/login".',
    ],
    takeaways: [
      'Always switch to the target branch before merging.',
      'Fast-forward happens when no divergent commits exist.',
    ],
    nextMissionId: 'm-10-merge-conflict',
  },

  // ----------------------------------------------------
  // LEVEL 04 — Conflict Hunter
  // ----------------------------------------------------
  {
    id: 'm-10-merge-conflict',
    levelNumber: 4,
    levelId: 'level-04',
    levelName: 'Conflict Hunter',
    title: 'The Broken Navbar Clash',
    subtitle: 'Resolve a Real Merge Conflict',
    badge: 'MISSION 10',
    objective: 'Experience and resolve a 3-way merge conflict when two developers edit the same line.',
    situation: 'You edited index.html on main to say "<h1>GitQuest</h1>". Simultaneously, your teammate Arjun edited the exact same line on his branch to say "<h1>GitQuest Learning Lab</h1>". When you attempt to merge, Git halts with a CONFLICT!',
    whatYouKnow: [
      'Git cannot read human minds. When two branches change the same lines, Git stops and inserts conflict markers:',
      '<<<<<<< HEAD (your version)',
      '======= (divider)',
      '>>>>>>> branch (incoming version)',
      'A human must choose the winning lines and delete the markers.',
    ],
    yourTask: 'Attempt to merge "feature/header-update" into main. When the conflict occurs, open the Conflict Lab to resolve it and complete the merge!',
    initialFiles: {
      'index.html': {
        content: '<!DOCTYPE html>\n<html>\n<body>\n<<<<<<< HEAD\n  <h1>GitQuest</h1>\n=======\n  <h1>GitQuest Learning Lab</h1>\n>>>>>>> feature/header-update\n</body>\n</html>',
        status: 'modified',
      },
    },
    initialCommits: [
      { message: 'Base layout', files: { 'index.html': '<h1>App</h1>' } },
      { message: 'Update title to GitQuest', branch: 'main', files: { 'index.html': '<h1>GitQuest</h1>' } },
      { message: 'Update title to Learning Lab', branch: 'feature/header-update', files: { 'index.html': '<h1>GitQuest Learning Lab</h1>' } },
    ],
    initialBranches: ['main', 'feature/header-update'],
    currentBranch: 'main',
    initialConflict: {
      active: true,
      filePath: 'index.html',
      baseBranch: 'main',
      incomingBranch: 'feature/header-update',
      currentContent: '<h1>GitQuest</h1>',
      incomingContent: '<h1>GitQuest Learning Lab</h1>',
      isResolved: false,
    },
    steps: [
      {
        id: 'step-trigger-conflict',
        title: 'Attempt the Merge',
        description: 'Try merging feature/header-update to trigger the conflict.',
        expectedCommand: 'git merge feature/header-update',
        checkCompletion: (_, lastCmd) => lastCmd.trim() === 'git merge feature/header-update',
        taskHint: 'Type "git merge feature/header-update"',
        successMessage: 'CONFLICT (content): Automatic merge failed! Look at the conflict markers in the file.',
        whatHappenedExplanation: 'Git detected overlapping changes on line 4 and halted.',
        whyExplanation: 'Git refuses to guess your intention when both sides modify the same code line.',
      },
      {
        id: 'step-resolve-conflict',
        title: 'Resolve the Conflict in Conflict Lab',
        description: 'Open the Conflict Lab tab in the left sidebar, choose the combined title, and mark it resolved.',
        expectedCommand: (cmd, state) => Boolean(state.conflictState?.isResolved) || cmd.includes('commit'),
        checkCompletion: (state) => Boolean(state.conflictState?.isResolved),
        taskHint: 'Click "💥 Conflict Lab" in the left navigation to pick the resolution!',
        successMessage: 'Conflict resolved! You successfully resolved the clash and staged the clean file.',
        whatHappenedExplanation: 'Removed conflict markers and saved the resolved code.',
        whyExplanation: 'Once the file is cleaned up, staging it tells Git that the dispute is settled.',
      },
    ],
    hints: [
      'Hint 1: Type "git merge feature/header-update".',
      'Hint 2: Click on "💥 Conflict Lab" in the sidebar to interactively pick the resolved lines.',
    ],
    takeaways: [
      'Merge conflicts happen when the same line is changed differently in two branches.',
      '<<<<<<< HEAD is your version; >>>>>>> is the incoming version.',
      'Resolving simply means editing the file to how you want it, removing the markers, and committing.',
    ],
    nextMissionId: 'm-11-remote-push',
  },

  // ----------------------------------------------------
  // LEVEL 05 — GitHub Collaborator
  // ----------------------------------------------------
  {
    id: 'm-11-remote-push',
    levelNumber: 5,
    levelId: 'level-05',
    levelName: 'GitHub Collaborator',
    title: 'Connect Remote & Push',
    subtitle: 'From Local to the Cloud',
    badge: 'MISSION 11',
    objective: 'Add a remote named "origin" pointing to GitHub and push your local commits.',
    situation: 'All your commits so far live only on your computer\'s hard drive. If your laptop falls in a lake, your code is gone! You need to connect your repository to GitHub and push your commits.',
    whatYouKnow: [
      'Local Git = offline version control on your computer.',
      'GitHub = cloud hosting service for Git repositories.',
      '"origin" is the conventional default name for your primary remote repository.',
    ],
    yourTask: '1. Add the remote: "git remote add origin https://github.com/team/gitquest.git"\n2. Push your code: "git push origin main"',
    initialFiles: {
      'index.html': { content: '<h1>GitQuest Cloud</h1>', status: 'unmodified' },
    },
    initialCommits: [
      { message: 'Initial commit', files: { 'index.html': '<h1>GitQuest</h1>' } },
      { message: 'Add awesome features', files: { 'index.html': '<h1>GitQuest Cloud</h1>' } },
    ],
    steps: [
      {
        id: 'step-remote-add',
        title: 'Add Remote origin',
        description: 'Link your local repository to the GitHub URL.',
        expectedCommand: /^git remote add origin https:\/\/github\.com\//,
        checkCompletion: (state) => Boolean(state.remotes['origin']),
        taskHint: 'Type: git remote add origin https://github.com/team/gitquest.git',
        successMessage: 'Remote "origin" linked! Your local Git now knows where GitHub lives.',
        whatHappenedExplanation: 'Stored the remote URL under alias "origin" in .git/config.',
        whyExplanation: 'Aliases save you from having to type full repository URLs every time you push or pull.',
      },
      {
        id: 'step-push',
        title: 'Push Commits to GitHub',
        description: 'Upload your commits to origin/main.',
        expectedCommand: /^git push( origin main)?$/,
        checkCompletion: (state) => Boolean(state.remotes['origin']?.branches['main']),
        taskHint: 'Type "git push origin main"',
        successMessage: 'LOOK AT THAT! Animate to the cloud: your commits just arrived on GitHub! Your work is backed up and shareable.',
        whatHappenedExplanation: 'Transferred commit objects and updated origin/main.',
        whyExplanation: 'Pushing synchronizes your local commit graph with the remote server.',
      },
    ],
    hints: [
      'Hint 1: Type: git remote add origin https://github.com/team/gitquest.git',
      'Hint 2: Type: git push origin main',
    ],
    takeaways: [
      'Git works completely offline until you push or pull.',
      '"origin" is the nickname for your remote GitHub repository.',
      '"git push origin main" sends local commits to GitHub.',
    ],
    nextMissionId: 'm-12-pull-updates',
  },

  {
    id: 'm-12-pull-updates',
    levelNumber: 5,
    levelId: 'level-05',
    levelName: 'GitHub Collaborator',
    title: 'Pull Teammate Updates',
    subtitle: 'Stay Synchronized',
    badge: 'MISSION 12',
    objective: 'Fetch and integrate commits pushed to GitHub by your teammate Maya using "git pull".',
    situation: 'Maya pushed an updated README.md to GitHub while you were in a meeting. Your local repository is now 1 commit behind origin/main. You must pull her changes before continuing your work.',
    whatYouKnow: [
      '"git pull" = "git fetch" (download commits) + "git merge" (integrate into your current branch).',
      'Always pull before starting new work to prevent diverging.',
    ],
    yourTask: 'Run "git status" to see that you are behind, then run "git pull origin main" to sync.',
    initialFiles: {
      'index.html': { content: '<h1>GitQuest</h1>', status: 'unmodified' },
    },
    initialCommits: [
      { message: 'Initial commit', files: { 'index.html': '<h1>GitQuest</h1>' } },
    ],
    initialRemotes: {
      origin: {
        url: 'https://github.com/team/gitquest.git',
        branches: {
          main: 'maya-commit-hash',
        },
      },
    },
    steps: [
      {
        id: 'step-pull',
        title: 'Pull Remote Changes',
        description: 'Download Maya\'s commit and update your local branch.',
        expectedCommand: /^git pull( origin main)?$/,
        checkCompletion: (state) => state.commits.some((c) => c.message.toLowerCase().includes('readme') || c.tree['README.md']),
        taskHint: 'Type "git pull origin main"',
        successMessage: 'Updated! Maya\'s commit and README.md are now in your local repository!',
        whatHappenedExplanation: 'Fetched objects from origin/main and fast-forwarded local main.',
        whyExplanation: 'Pulling regularly keeps everyone on the team working on the same foundation.',
      },
    ],
    hints: ['Hint 1: Type "git pull origin main".'],
    takeaways: [
      '"git pull" brings the latest team commits to your machine.',
      'Always pull before creating a new branch.',
    ],
    nextMissionId: 'm-13-team-workflow',
  },

  // ----------------------------------------------------
  // LEVEL 06 & 07 — Team Developer & PR Master
  // ----------------------------------------------------
  {
    id: 'm-13-team-workflow',
    levelNumber: 6,
    levelId: 'level-06',
    levelName: 'Team Developer',
    title: 'The Team Feature Sprint',
    subtitle: 'Issue to Pull Request',
    badge: 'MISSION 13',
    objective: 'Execute the full professional GitHub workflow: Issue ➔ Branch ➔ Code ➔ Commit ➔ Push ➔ Open PR.',
    situation: 'Issue #42 assigned to you by Maya: "Add dark mode toggle to navigation". You must branch off main, commit the change, and push to GitHub to open a Pull Request.',
    whatYouKnow: [
      'The GitHub Flow: Never commit directly to main.',
      'Create descriptive branch names like "feature/dark-mode".',
      'Push your branch to GitHub so your team can review the Pull Request.',
    ],
    yourTask: '1. Create and switch to branch: "git switch -c feature/dark-mode"\n2. Stage and commit: "git add ." then git commit -m "Add dark mode toggle"\n3. Push: "git push origin feature/dark-mode"',
    initialFiles: {
      'index.html': { content: '<h1>GitQuest</h1><button id="theme-btn">Dark Mode</button>', status: 'modified' },
    },
    initialCommits: [
      { message: 'Setup app', files: { 'index.html': '<h1>GitQuest</h1>' } },
    ],
    initialRemotes: {
      origin: {
        url: 'https://github.com/team/gitquest.git',
        branches: { main: 'hash1' },
      },
    },
    steps: [
      {
        id: 'step-branch-create',
        title: 'Create Feature Branch',
        description: 'Create and switch to feature/dark-mode in one command.',
        expectedCommand: /^git (switch -c|checkout -b) feature\/dark-mode$/,
        checkCompletion: (state) => state.currentBranch === 'feature/dark-mode',
        taskHint: 'Type "git switch -c feature/dark-mode"',
        successMessage: 'You are on feature/dark-mode!',
        whatHappenedExplanation: 'Created and checked out feature/dark-mode.',
        whyExplanation: 'The -c flag (or -b in checkout) creates and switches in one step.',
      },
      {
        id: 'step-commit-toggle',
        title: 'Stage and Commit Changes',
        description: 'Commit your dark mode button.',
        expectedCommand: /^git commit -m ["']Add dark mode toggle["']$/i,
        checkCompletion: (state) => state.commits.some((c) => c.message.toLowerCase().includes('dark mode')),
        taskHint: 'Type: git add . && git commit -m "Add dark mode toggle"',
        successMessage: 'Commit created on feature/dark-mode!',
        whatHappenedExplanation: 'Saved the snapshot to the feature branch.',
        whyExplanation: 'Clean, descriptive commit ready for code review.',
      },
      {
        id: 'step-push-pr',
        title: 'Push Branch to GitHub',
        description: 'Push your branch so you can open a PR.',
        expectedCommand: /^git push( origin feature\/dark-mode)?$/,
        checkCompletion: (state) => Boolean(state.remotes['origin']?.branches['feature/dark-mode']),
        taskHint: 'Type "git push origin feature/dark-mode"',
        successMessage: 'Branch pushed to GitHub! Head over to the "☁️ GitHub Lab" to see the Pull Request ready for review!',
        whatHappenedExplanation: 'Uploaded branch to GitHub.',
        whyExplanation: 'Now teammates can view your diff, leave line comments, and approve your merge.',
      },
    ],
    hints: [
      'Hint 1: Type "git switch -c feature/dark-mode".',
      'Hint 2: Type "git add index.html" then git commit -m "Add dark mode toggle".',
      'Hint 3: Type "git push origin feature/dark-mode".',
    ],
    takeaways: [
      'GitHub Flow: Issue ➔ Branch ➔ Commit ➔ Push ➔ Pull Request.',
      'Never push untested code directly to main.',
    ],
    nextMissionId: 'm-14-pr-review',
  },

  {
    id: 'm-14-pr-review',
    levelNumber: 7,
    levelId: 'level-07',
    levelName: 'Pull Request Master',
    title: 'Review Maya\'s PR & Ship to Production',
    subtitle: 'The Art of Code Review',
    badge: 'MISSION 14',
    objective: 'Explore a simulated GitHub Pull Request, review line diffs, check approvals, and merge into production.',
    situation: 'Maya submitted PR #18: "feat: add user profile card". Your lead reviewer Sam has approved it, but asked you to do the final verification of the diff and execute the merge.',
    whatYouKnow: [
      'A Pull Request is a formal proposal to merge one branch into another.',
      'Reviewers inspect the diff, leave comments on specific lines, and request changes or approve.',
      'Merging the PR updates the remote main branch and triggers production deployment.',
    ],
    yourTask: 'Open the "☁️ GitHub Lab", click on the Pull Requests tab, inspect PR #18, and click [Squash and Merge]!',
    initialFiles: {
      'profile.html': { content: '<div class="profile-card">User Profile</div>', status: 'unmodified' },
    },
    initialCommits: [
      { message: 'Main v1.2', files: { 'index.html': '<h1>GitQuest</h1>' } },
    ],
    steps: [
      {
        id: 'step-open-pr',
        title: 'Review & Merge Pull Request',
        description: 'Navigate to the GitHub Lab, review PR #18, and click Merge.',
        expectedCommand: () => true,
        checkCompletion: () => true,
        taskHint: 'Click "☁️ GitHub Lab" in the left menu, view Pull Requests, and click "Merge pull request".',
        successMessage: 'PR #18 merged into main! You have officially completed the real GitHub collaboration loop.',
        whatHappenedExplanation: 'Merged feature branch into main on the remote repository.',
        whyExplanation: 'Pull Requests ensure code quality, team knowledge sharing, and bug prevention.',
      },
    ],
    hints: [
      'Hint: Click "☁️ GitHub Lab" in the left navigation and go to the Pull Requests tab.',
    ],
    takeaways: [
      'Pull requests are the heart of team collaboration.',
      'Review diffs carefully before approving and merging.',
    ],
    nextMissionId: 'm-15-cicd-actions',
  },

  // ----------------------------------------------------
  // LEVEL 08 — CI/CD & Recovery
  // ----------------------------------------------------
  {
    id: 'm-15-cicd-actions',
    levelNumber: 8,
    levelId: 'level-08',
    levelName: 'CI/CD & Recovery',
    title: 'Fix the Broken CI Build',
    subtitle: 'GitHub Actions Detective',
    badge: 'MISSION 15',
    objective: 'Investigate a failing GitHub Actions CI workflow, identify the test error, and fix the code.',
    situation: 'You pushed a new commit to main, but the GitHub Actions badge turned RED! The automated test suite failed because of a syntax error in app.js. Production deployment is blocked until CI is green!',
    whatYouKnow: [
      'Continuous Integration (CI) automatically runs tests and builds on every push.',
      'If any step fails (lint, test, build), CI stops and flags the commit with a red cross (✗).',
      'Never ignore a red CI build — find the logs, fix the bug, and re-push.',
    ],
    yourTask: 'Inspect the Actions tab in GitHub Lab to find the error, fix app.js, commit, and push to turn CI green.',
    initialFiles: {
      'app.js': {
        content: 'function calculateScore(points) {\n  // BUG: missing closing brace\n  return points * 10;\n',
        originalContent: 'function calculateScore(points) { return points; }',
        status: 'modified',
      },
    },
    initialCommits: [
      { message: 'Add scoring algorithm (broken)', files: { 'app.js': 'function calculateScore(points) {\n  return points * 10;\n' } },
    ],
    steps: [
      {
        id: 'step-fix-ci',
        title: 'Fix app.js and Commit',
        description: 'Stage the fixed app.js and commit with "Fix syntax error in score calculation".',
        expectedCommand: /^git commit -m ["']Fix syntax error/,
        checkCompletion: (state) => state.commits.some((c) => c.message.toLowerCase().includes('fix syntax')),
        taskHint: 'Fix the file or stage app.js, then type: git commit -m "Fix syntax error in score calculation"',
        successMessage: 'Syntax error fixed and committed! Now push to trigger the green CI build.',
        whatHappenedExplanation: 'Committed the bugfix.',
        whyExplanation: 'Committing the fix provides an audit trail showing when the bug was resolved.',
      },
      {
        id: 'step-push-ci',
        title: 'Push and Watch CI Pass',
        description: 'Push your fix to origin/main.',
        expectedCommand: /^git push/,
        checkCompletion: (_, lastCmd) => lastCmd.trim().startsWith('git push'),
        taskHint: 'Type "git push origin main"',
        successMessage: 'ALL CHECKS PASSED! Look at the Actions tab: Checkout ✓, Lint ✓, Tests ✓, Deploy ✓! You are a master of Git & GitHub!',
        whatHappenedExplanation: 'Pushed the fix and re-triggered GitHub Actions.',
        whyExplanation: 'Automated CI ensures broken code never reaches users.',
      },
    ],
    hints: [
      'Hint 1: Type "git add app.js".',
      'Hint 2: Type: git commit -m "Fix syntax error in score calculation"',
      'Hint 3: Type: git push origin main',
    ],
    takeaways: [
      'CI/CD automates testing and deployment on every push.',
      'Green builds mean your code is tested and safe.',
    ],
  },
];
