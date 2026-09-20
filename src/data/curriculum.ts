export interface SlideContent {
  id: string;
  slideNumber: number;
  title: string;
  subtitle?: string;
  category: 'concept' | 'diagram' | 'syntax' | 'workflow' | 'tips' | 'challenge' | 'comparison';
  content: string[];
  codeBlock?: {
    language: string;
    code: string;
    explanation?: string;
  };
  diagram?: {
    type: 'pipeline' | 'tree' | 'comparison' | 'box';
    elements: Array<{ label: string; subtext?: string; highlight?: boolean; color?: string }>;
  };
  presenterNotes?: string;
  keyTakeaway: string;
}

export interface TopicCurriculum {
  id: string; // e.g. '01-introduction'
  chapterNumber: number;
  slug: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  xpReward: number;
  coinsReward: number;
  missionId: string;
  regionId: string;
  cutscene: {
    title: string;
    speaker: string;
    avatar: string;
    dialogue: string[];
    backdropTheme: 'tokyo-twilight' | 'coastal-dawn' | 'forest-mist' | 'volcanic-glow' | 'cyber-sky';
  };
  slides: SlideContent[];
}

export const TOPICS_CURRICULUM: TopicCurriculum[] = [
  {
    id: '01-introduction',
    chapterNumber: 1,
    slug: '01-introduction',
    title: 'Welcome to Git & Version Control',
    subtitle: 'The origin of distributed snapshots and how developers time-travel through code',
    estimatedMinutes: 8,
    xpReward: 150,
    coinsReward: 30,
    missionId: 'm-01-meet-git',
    regionId: 'region-01',
    cutscene: {
      title: 'A New Journey Begins',
      speaker: 'Maya Lin',
      avatar: '👩‍💻',
      dialogue: [
        'Welcome, adventurer! Every grand software system was once an empty folder.',
        'Before Git, developers used to save files as "final_v2_really_final.zip". Chaos ruled the land.',
        'Git gives us the power to create atomic checkpoints and travel across parallel timelines.',
        'Let us begin our quest at the Origin Coast!',
      ],
      backdropTheme: 'tokyo-twilight',
    },
    slides: [
      {
        id: '01-s1',
        slideNumber: 1,
        title: 'What is Git?',
        subtitle: 'The Distributed Version Control System that powers the modern world',
        category: 'concept',
        content: [
          'Git is a free and open-source distributed version control system designed to track changes in source code over time.',
          'Created in 2005 by Linus Torvalds for the Linux kernel development.',
          'Unlike older systems (SVN, CVS), every developer has a full, complete copy of the repository history on their local machine.',
        ],
        diagram: {
          type: 'comparison',
          elements: [
            { label: 'Without Git', subtext: 'project_v1.zip, final_final.js, accidental overwrites', color: 'red' },
            { label: 'With Git', subtext: 'Exact history graph, blame logs, branching, effortless rollbacks', color: 'green', highlight: true },
          ],
        },
        presenterNotes: 'Emphasize that Git works 100% offline. You do not need internet access to commit or inspect history.',
        keyTakeaway: 'Git is your code time-machine and ledger of every modification ever made.',
      },
      {
        id: '01-s2',
        slideNumber: 2,
        title: 'The Three States of Git',
        subtitle: 'Understanding the mental model of how files transition',
        category: 'diagram',
        content: [
          'Git files reside in one of three main sections on your computer:',
          '1. Working Directory: Untracked and modified files currently on your disk.',
          '2. Staging Area (Index): Files specifically selected to go into your next commit snapshot.',
          '3. Git Repository (.git): Permanent, cryptographically secured snapshots.',
        ],
        diagram: {
          type: 'pipeline',
          elements: [
            { label: 'Working Directory', subtext: 'Files on disk' },
            { label: 'Staging Area', subtext: 'git add', highlight: true },
            { label: 'Git Repository', subtext: 'git commit' },
          ],
        },
        presenterNotes: 'Ask learners why Git requires a two-step commit process. The staging area allows atomic, intentional commits.',
        keyTakeaway: 'The staging area gives you total control over what is included in each commit.',
      },
      {
        id: '01-s3',
        slideNumber: 3,
        title: 'Core Git Commands: Inspection',
        subtitle: 'How to observe the health and state of your workspace',
        category: 'syntax',
        content: [
          'git status is the single most important diagnostic command in Git.',
          'It reveals which files have been modified, which are staged, and which are untracked.',
        ],
        codeBlock: {
          language: 'bash',
          code: `# Inspect current repository status
git status

# Check the installed version of Git
git --version`,
          explanation: 'Running git status never changes or deletes any files — it is completely safe to run anytime!',
        },
        presenterNotes: 'Teach beginners the muscle memory of running git status before and after every action.',
        keyTakeaway: 'When in doubt, run git status!',
      },
      {
        id: '01-s4',
        slideNumber: 4,
        title: 'Topic 01 Summary & Quest Challenge',
        subtitle: 'Ready to put your knowledge into practice?',
        category: 'challenge',
        content: [
          'You understand the difference between Git (the local CLI tool) and GitHub (the cloud collaboration platform).',
          'You know the three states: Working Directory ➔ Staging Area ➔ Repository.',
          'Your first quest awaits: Inspect the repository and discover the hidden .git directory!',
        ],
        presenterNotes: 'Direct learners to launch the interactive simulator mission right after this slide.',
        keyTakeaway: 'Complete Mission 01 to earn +150 XP and 30 Coins!',
      },
    ],
  },
  {
    id: '02-the-terminal',
    chapterNumber: 2,
    slug: '02-the-terminal',
    title: 'Command Line Fundamentals',
    subtitle: 'Navigating directories, paths, and shell commands like an engineer',
    estimatedMinutes: 10,
    xpReward: 180,
    coinsReward: 35,
    missionId: 'm-02-inspect-workspace',
    regionId: 'region-01',
    cutscene: {
      title: 'Speaking the Language of Machines',
      speaker: 'Arjun Patel',
      avatar: '🧙‍♂️',
      dialogue: [
        'Welcome to the terminal, explorer. The GUI is a painted facade; the command line is raw reality.',
        'To command Git, you must first master moving through directories and listing hidden files.',
        'Let us unveil the secret files that lie beneath the surface!',
      ],
      backdropTheme: 'coastal-dawn',
    },
    slides: [
      {
        id: '02-s1',
        slideNumber: 1,
        title: 'Terminal Navigation 101',
        subtitle: 'Essential CLI commands for developers',
        category: 'concept',
        content: [
          'pwd (Print Working Directory): Tells you where you are in the file system.',
          'ls (List): Displays files and folders in your current directory.',
          'cd (Change Directory): Moves you into another folder or back up (cd ..).',
          'mkdir: Creates a new directory for your project.',
        ],
        codeBlock: {
          language: 'bash',
          code: `# Where am I?
pwd

# List all files including hidden ones (like .git)
ls -la

# Move into project folder
cd my-cool-project`,
        },
        presenterNotes: 'Show the difference between ls and ls -a. Hidden files start with a dot.',
        keyTakeaway: 'The command line gives you precise, scriptable power over your operating system.',
      },
      {
        id: '02-s2',
        slideNumber: 2,
        title: 'Understanding Hidden Files (.git)',
        subtitle: 'Why the dot matters in Unix and Windows',
        category: 'diagram',
        content: [
          'Any file or folder starting with a period (.) is hidden by default in file explorers and standard ls.',
          'The .git directory is hidden to prevent accidental deletion or corruption.',
          'If you delete .git, your project loses all history, branches, and commit records!',
        ],
        diagram: {
          type: 'box',
          elements: [
            { label: 'src/', subtext: 'Your application code' },
            { label: 'package.json', subtext: 'Dependencies & scripts' },
            { label: '.git/', subtext: 'The Git brain database (HIDDEN)', highlight: true, color: 'orange' },
          ],
        },
        presenterNotes: 'Never edit files inside .git manually unless you are writing a Git internal tool.',
        keyTakeaway: 'The .git folder contains the entire database of your repository.',
      },
    ],
  },
  {
    id: '03-first-repository',
    chapterNumber: 3,
    slug: '03-first-repository',
    title: 'Initializing Your First Repository',
    subtitle: 'From an ordinary folder to a version-controlled powerhouse with git init',
    estimatedMinutes: 12,
    xpReward: 200,
    coinsReward: 40,
    missionId: 'm-03-find-changes',
    regionId: 'region-01',
    cutscene: {
      title: 'The Spark of Creation',
      speaker: 'Byte the Duck',
      avatar: '🦆',
      dialogue: [
        'Quack! Did you know a repository is just an ordinary folder with a superpower?',
        'When you type "git init", Git creates the hidden database that turns your folder into a living timeline.',
        'Let us awaken your first repository!',
      ],
      backdropTheme: 'coastal-dawn',
    },
    slides: [
      {
        id: '03-s1',
        slideNumber: 1,
        title: 'What Happens During git init?',
        subtitle: 'The birth of a Git repository',
        category: 'concept',
        content: [
          'Running git init in any directory transforms it into a Git repository.',
          'Git creates a hidden .git directory containing:',
          '  - HEAD: Pointer to the current branch.',
          '  - config: Repository-specific configuration options.',
          '  - objects/: The object database (commits, trees, blobs).',
          '  - refs/: Pointers to branch heads and tags.',
        ],
        codeBlock: {
          language: 'bash',
          code: `# Initialize a new empty Git repository
git init

# Output: Initialized empty Git repository in /path/to/project/.git/`,
        },
        presenterNotes: 'Clarify that git init only needs to be run ONCE per project at the project root.',
        keyTakeaway: 'git init creates the .git database that tracks all future changes.',
      },
    ],
  },
  {
    id: '04-staging-and-committing',
    chapterNumber: 4,
    slug: '04-staging-and-committing',
    title: 'Staging & Two-Phase Commits',
    subtitle: 'Crafting atomic, intentional snapshots with git add and git commit',
    estimatedMinutes: 15,
    xpReward: 250,
    coinsReward: 50,
    missionId: 'm-04-stage-right-files',
    regionId: 'region-02',
    cutscene: {
      title: 'The Great Staging Forge',
      speaker: 'Maya Lin',
      avatar: '👩‍💻',
      dialogue: [
        'Welcome to Snapshot Citadel! Here, nothing is committed by accident.',
        'A great engineer does not commit half-baked experiments or sensitive secrets.',
        'Use "git add" to stage only the worthy files, then seal them forever with "git commit"!',
      ],
      backdropTheme: 'tokyo-twilight',
    },
    slides: [
      {
        id: '04-s1',
        slideNumber: 1,
        title: 'The Staging Ritual',
        subtitle: 'Why Git has a Staging Area before Committing',
        category: 'concept',
        content: [
          'Imagine packing a box before shipping it. You do not throw everything in your room into the box.',
          'git add lets you select precisely which files belong to the logical change.',
          'git commit seals the box with a descriptive commit message and timestamp.',
        ],
        codeBlock: {
          language: 'bash',
          code: `# Stage a single file
git add index.html

# Stage all modified and untracked files
git add .

# Create a permanent commit with a message
git commit -m "feat: Add responsive navigation bar"`,
        },
        presenterNotes: 'Discuss what makes a good commit message (imperative mood, concise, why not just what).',
        keyTakeaway: 'Atomic commits make debugging, reviewing, and reverting 100x easier.',
      },
      {
        id: '04-s2',
        slideNumber: 2,
        title: 'Good vs Bad Commit Messages',
        subtitle: 'How to write commit messages your team will love',
        category: 'comparison',
        content: [
          'Bad: "fixed stuff", "wip", "changes", "asdfasdf"',
          'Good: "feat: Add user authentication modal"',
          'Good: "fix: Resolve null pointer error on checkout button"',
          'Good: "docs: Update API endpoint documentation in README"',
        ],
        presenterNotes: 'Mention Conventional Commits standard (feat, fix, docs, refactor, test).',
        keyTakeaway: 'Your commit message is a letter to your future self and your teammates.',
      },
    ],
  },
  {
    id: '05-history-and-diffs',
    chapterNumber: 5,
    slug: '05-history-and-diffs',
    title: 'Inspecting History & Diffs',
    subtitle: 'Reading the ledger: git log, SHA-1 hashes, and git diff',
    estimatedMinutes: 12,
    xpReward: 220,
    coinsReward: 45,
    missionId: 'm-06-inspect-history',
    regionId: 'region-02',
    cutscene: {
      title: 'The Hall of Records',
      speaker: 'Sam Vance',
      avatar: '🎨',
      dialogue: [
        'Look upon the historical timeline! Every commit is sealed with a 40-character SHA hash.',
        'With "git log" and "git diff", no bug can hide. We can see every character added or deleted across time.',
      ],
      backdropTheme: 'tokyo-twilight',
    },
    slides: [
      {
        id: '05-s1',
        slideNumber: 1,
        title: 'Navigating Git History',
        subtitle: 'Inspecting commits with git log',
        category: 'syntax',
        content: [
          'git log displays the commit history from HEAD backwards.',
          'Use --oneline for a compact, readable summary.',
          'Each commit displays: 40-character SHA-1 hash (or 7-char short hash), Author, Date, and Message.',
        ],
        codeBlock: {
          language: 'bash',
          code: `# Standard detailed log
git log

# Compact single-line log
git log --oneline

# Graphical branch visualization
git log --oneline --graph --all`,
        },
        presenterNotes: 'Demonstrate how to exit git log in the terminal if it opens in a pager (press q).',
        keyTakeaway: 'git log --oneline is the fastest way to get your bearings in any codebase.',
      },
      {
        id: '05-s2',
        slideNumber: 2,
        title: 'Analyzing Code Changes: git diff',
        subtitle: 'Comparing working directory vs staging vs commits',
        category: 'diagram',
        content: [
          'git diff: Shows unstaged changes in your working directory compared to staging.',
          'git diff --staged: Shows staged changes ready to be committed compared to HEAD.',
          'Green lines (+) represent additions; Red lines (-) represent deletions.',
        ],
        codeBlock: {
          language: 'bash',
          code: `# Inspect unstaged changes
git diff

# Inspect staged changes ready to commit
git diff --staged`,
        },
        presenterNotes: 'Diffs are the core of code reviews and pull requests.',
        keyTakeaway: 'Always run git diff --staged before committing to verify your changes.',
      },
    ],
  },
  {
    id: '06-branching-world',
    chapterNumber: 6,
    slug: '06-branching-world',
    title: 'Branching & Parallel Realities',
    subtitle: 'Isolated feature development without risking production stability',
    estimatedMinutes: 18,
    xpReward: 300,
    coinsReward: 60,
    missionId: 'm-07-create-branch',
    regionId: 'region-03',
    cutscene: {
      title: 'The Forked Forest',
      speaker: 'Arjun Patel',
      avatar: '🧙‍♂️',
      dialogue: [
        'Welcome to The Forked Forest, where code diverges into parallel realities!',
        'In Git, branches are virtually free. They are not heavy folder copies; they are lightweight pointers.',
        'Branch off safely, experiment freely, and merge back when your feature is battle-tested!',
      ],
      backdropTheme: 'forest-mist',
    },
    slides: [
      {
        id: '06-s1',
        slideNumber: 1,
        title: 'What is a Branch?',
        subtitle: 'A movable pointer to a specific commit',
        category: 'concept',
        content: [
          'The default branch is usually named "main" or "master".',
          'Creating a branch does NOT duplicate your files on disk.',
          'It simply creates a 41-byte text file containing the SHA hash of the commit you are on.',
          'HEAD is Git\'s special pointer that points to the branch you are currently working on.',
        ],
        diagram: {
          type: 'tree',
          elements: [
            { label: 'C1', subtext: 'Initial commit' },
            { label: 'C2 (main)', subtext: 'Production code' },
            { label: 'C3 (feature/login)', subtext: 'Experimental branch', highlight: true, color: 'blue' },
          ],
        },
        presenterNotes: 'Contrast Git branches with other version control systems where branching took 15 minutes and gigabytes of disk space.',
        keyTakeaway: 'Branches let you build new features in complete safety.',
      },
      {
        id: '06-s2',
        slideNumber: 2,
        title: 'Modern Branching Commands',
        subtitle: 'Using git switch instead of overloaded git checkout',
        category: 'syntax',
        content: [
          'Historically, git checkout was used for both switching branches and restoring files.',
          'Git 2.23 introduced git switch and git restore for clear, safe intent.',
        ],
        codeBlock: {
          language: 'bash',
          code: `# Create and switch to a new branch in one command
git switch -c feature/login

# Switch to an existing branch
git switch main

# List all local branches (* indicates current HEAD)
git branch`,
        },
        presenterNotes: 'Explain the naming convention for branches: feature/*, fix/*, chore/*, docs/*.',
        keyTakeaway: 'Use git switch -c to branch out into new ideas effortlessly.',
      },
    ],
  },
  {
    id: '07-merges-and-conflicts',
    chapterNumber: 7,
    slug: '07-merges-and-conflicts',
    title: 'Merging & Conflict Resolution',
    subtitle: 'Uniting timelines: Fast-forward merges and decoding <<<<<<< HEAD markers',
    estimatedMinutes: 20,
    xpReward: 350,
    coinsReward: 75,
    missionId: 'm-10-merge-conflict',
    regionId: 'region-04',
    cutscene: {
      title: 'Conflict Cavern',
      speaker: 'Arjun Patel',
      avatar: '🧙‍♂️',
      dialogue: [
        'Beware! We have entered Conflict Cavern. When two developers edit the same line of code, the ground shakes!',
        'Git cannot guess which developer is right. It places conflict markers and asks you to make the choice.',
        'Arm yourself with the Merge Shield and forge harmony!',
      ],
      backdropTheme: 'volcanic-glow',
    },
    slides: [
      {
        id: '07-s1',
        slideNumber: 1,
        title: 'Fast-Forward vs 3-Way Merge',
        subtitle: 'The two ways Git unites branches',
        category: 'concept',
        content: [
          'Fast-Forward Merge: If the destination branch has no new commits since you branched off, Git simply slides the pointer forward. No merge commit needed!',
          '3-Way Merge: If both branches have evolved independently, Git compares the two branch tips and their common ancestor, creating a new merge commit with two parents.',
        ],
        codeBlock: {
          language: 'bash',
          code: `# 1. Switch to the branch you want to merge INTO
git switch main

# 2. Merge the feature branch into main
git merge feature/user-profile`,
        },
        presenterNotes: 'Diagram the difference on a whiteboard or virtual canvas.',
        keyTakeaway: 'Always switch to the target branch (e.g. main) before running git merge.',
      },
      {
        id: '07-s2',
        slideNumber: 2,
        title: 'Decoding Conflict Markers',
        subtitle: 'What <<<<<<<, =======, and >>>>>>> really mean',
        category: 'diagram',
        content: [
          '<<<<<<< HEAD: The code in your current branch (what you have right now).',
          '=======: The dividing line between the two conflicting versions.',
          '>>>>>>> branch-name: The incoming code from the branch you are merging.',
        ],
        codeBlock: {
          language: 'diff',
          code: `<<<<<<< HEAD
const theme = "dark-mode";
=======
const theme = "retro-8bit";
>>>>>>> feature/retro-theme`,
          explanation: 'To resolve, delete the markers and choose the correct code, then git add and git commit!',
        },
        presenterNotes: 'Remind learners to never commit the conflict marker lines themselves.',
        keyTakeaway: 'Conflicts are not errors! They are Git asking you to make a human decision.',
      },
    ],
  },
  {
    id: '08-github-and-remotes',
    chapterNumber: 8,
    slug: '08-github-and-remotes',
    title: 'Cloud Collaboration with GitHub',
    subtitle: 'Remotes, git push, git pull, and distributed teamwork',
    estimatedMinutes: 15,
    xpReward: 280,
    coinsReward: 55,
    missionId: 'm-11-remote-push',
    regionId: 'region-05',
    cutscene: {
      title: 'The Cloud Sanctuary',
      speaker: 'Sam Vance',
      avatar: '🎨',
      dialogue: [
        'Behold the Cloud Kingdom of GitHub! Beyond localhost lies the global open-source realm.',
        'Here, your local snapshots travel to the cloud, allowing teammates across the globe to collaborate seamlessly.',
      ],
      backdropTheme: 'cyber-sky',
    },
    slides: [
      {
        id: '08-s1',
        slideNumber: 1,
        title: 'What is a Remote?',
        subtitle: 'Connecting local repositories to cloud servers',
        category: 'concept',
        content: [
          'A remote is a shared repository hosted on the internet or network (e.g., GitHub, GitLab).',
          'The default name for your primary remote repository is "origin".',
          'git push sends your local commits to the remote.',
          'git pull fetches remote changes and merges them into your local branch.',
        ],
        codeBlock: {
          language: 'bash',
          code: `# Link your local repo to GitHub
git remote add origin https://github.com/user/repo.git

# Push your main branch to origin
git push -u origin main

# Pull latest updates from teammates
git pull origin main`,
        },
        presenterNotes: 'Explain the -u flag (sets upstream tracking so future commands can just be git push).',
        keyTakeaway: 'origin is simply an alias for the URL of your remote repository.',
      },
    ],
  },
  {
    id: '09-pull-requests',
    chapterNumber: 9,
    slug: '09-pull-requests',
    title: 'Pull Requests & Code Reviews',
    subtitle: 'The collaborative heart of software engineering teams',
    estimatedMinutes: 16,
    xpReward: 320,
    coinsReward: 70,
    missionId: 'm-14-pr-review',
    regionId: 'region-06',
    cutscene: {
      title: 'The Guild Hall Arena',
      speaker: 'Maya Lin',
      avatar: '👩‍💻',
      dialogue: [
        'Welcome to the Peer Review Colosseum! Great engineers never ship unreviewed code to production.',
        'A Pull Request is not just code; it is a conversation, a design review, and a team celebration.',
        'Earn the LGTM Stamp of Approval!',
      ],
      backdropTheme: 'tokyo-twilight',
    },
    slides: [
      {
        id: '09-s1',
        slideNumber: 1,
        title: 'The Pull Request Lifecycle',
        subtitle: 'From feature branch to production release',
        category: 'workflow',
        content: [
          '1. Fork or Branch: Create feature/awesome-thing.',
          '2. Commit & Push: Push your feature branch to the remote.',
          '3. Open PR: Write a clear description with screenshots and test results.',
          '4. Code Review: Teammates review line diffs, suggest improvements, and approve.',
          '5. Merge: Squash and merge into main, then deploy!',
        ],
        presenterNotes: 'Teach constructive code review habits: praise good solutions, ask questions rather than issuing commands.',
        keyTakeaway: 'Code review transforms individual coding into collective engineering craft.',
      },
    ],
  },
  {
    id: '10-automation-cicd',
    chapterNumber: 10,
    slug: '10-automation-cicd',
    title: 'CI/CD Pipelines with GitHub Actions',
    subtitle: 'Automated test runners, sentinels, and continuous deployment',
    estimatedMinutes: 20,
    xpReward: 400,
    coinsReward: 100,
    missionId: 'm-15-cicd-actions',
    regionId: 'region-07',
    cutscene: {
      title: 'Automaton Tower',
      speaker: 'Byte the Duck',
      avatar: '🦆',
      dialogue: [
        'Quack! The clockwork tower never sleeps! On every git push, automated sentinels spin up in the cloud.',
        'They run tests, check formatting, and verify that nothing breaks before shipping to users.',
        'Let us turn the pipeline GREEN!',
      ],
      backdropTheme: 'cyber-sky',
    },
    slides: [
      {
        id: '10-s1',
        slideNumber: 1,
        title: 'What is CI/CD?',
        subtitle: 'Continuous Integration & Continuous Delivery explained',
        category: 'concept',
        content: [
          'Continuous Integration (CI): Automatically building and testing every change committed to a shared repository.',
          'Continuous Delivery (CD): Automatically deploying passing builds to staging or production environments.',
          'GitHub Actions defines workflows in YAML files inside .github/workflows/.',
        ],
        codeBlock: {
          language: 'yaml',
          code: `name: CI Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
      - run: npm install
      - run: npm test`,
        },
        presenterNotes: 'Show learners that green checks on GitHub mean all automated tests passed.',
        keyTakeaway: 'Automated CI/CD prevents bugs from ever reaching production.',
      },
    ],
  },
];
