export interface Character {
  id: string;
  name: string;
  role: string;
  title: string;
  avatarBg: string;
  avatarColor: string;
  borderColor: string;
  status: 'online' | 'coding' | 'reviewing' | 'idle';
  bio: string;
  quote: string;
  specialty: string;
}

export const TEAM_CHARACTERS: Record<string, Character> = {
  maya: {
    id: 'maya',
    name: 'Maya Chen',
    role: 'Frontend Developer',
    title: 'UI/UX & React Specialist',
    avatarBg: 'bg-emerald-500/15',
    avatarColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    status: 'coding',
    bio: 'Obsessed with pixel-perfect design, atomic CSS, and never polluting main with unpolished UI experiments.',
    quote: 'Always stage atomically! If your commit touches both a button style and a database query, you are doing it wrong.',
    specialty: 'Selective Staging & UI Components',
  },
  arjun: {
    id: 'arjun',
    name: 'Arjun Patel',
    role: 'Backend Developer',
    title: 'Systems & API Architect',
    avatarBg: 'bg-blue-500/15',
    avatarColor: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    status: 'online',
    bio: 'Keeps production databases healthy and writes resilient backend endpoints. Frequently branches out for new microservices.',
    quote: 'Branches are cheap in Git — they are just 41-byte text pointers. Never fear creating a branch!',
    specialty: 'Branching & Merge Conflicts',
  },
  sam: {
    id: 'sam',
    name: 'Sam Vance',
    role: 'Staff Engineer & Reviewer',
    title: 'Code Reviewer & DevOps Lead',
    avatarBg: 'bg-purple-500/15',
    avatarColor: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    status: 'reviewing',
    bio: '15 years in software engineering. Protects main like a fortress. Loves clear, imperative commit messages and green CI builds.',
    quote: 'A good commit message tells future developers WHY this change was made at 2 AM.',
    specialty: 'Pull Requests & CI/CD Pipelines',
  },
  byte: {
    id: 'byte',
    name: 'Byte',
    role: 'Git Mentor Bot',
    title: 'In-Terminal Companion',
    avatarBg: 'bg-git-orange/15',
    avatarColor: 'text-git-orange',
    borderColor: 'border-git-orange/40',
    status: 'online',
    bio: 'A lightweight robotic pair-programmer living right inside your terminal. Watches your repository state and offers instant advice.',
    quote: 'Git is not magic; it is just a graph of snapshots linked by cryptographic hashes!',
    specialty: 'Real-time Explanations & Git Internals',
  },
};

export interface MissionDialogue {
  characterId: string;
  mood: 'greeting' | 'explaining' | 'warning' | 'cheering' | 'hint';
  message: string;
}

export const MISSION_DIALOGUES: Record<string, Record<string, MissionDialogue>> = {
  'm-01-meet-git': {
    intro: {
      characterId: 'maya',
      mood: 'greeting',
      message: 'Hey newcomer! Welcome to the GitQuest team! Before we write any code, we need Git to start tracking this directory. Go ahead and run "git init".',
    },
    step_init: {
      characterId: 'byte',
      mood: 'cheering',
      message: 'Beep boop! You created the hidden .git directory. Now Git is awake and watching!',
    },
    step_status: {
      characterId: 'maya',
      mood: 'explaining',
      message: 'Notice how index.html, style.css, and app.js are red? Git sees them, but they are "untracked".',
    },
  },
  'm-02-inspect-workspace': {
    intro: {
      characterId: 'maya',
      mood: 'greeting',
      message: 'I made a few updates to index.html while you were in orientation. Use "git status" and "git diff" to see exactly what I changed!',
    },
    step_diff: {
      characterId: 'byte',
      mood: 'cheering',
      message: 'Diff analyzed! Green lines (+) are added, red lines (-) are removed. Always diff before you commit!',
    },
  },
  'm-04-stage-right-files': {
    intro: {
      characterId: 'maya',
      mood: 'warning',
      message: 'Watch out! I was experimenting with test-widget.js and it is totally broken. Only stage "navbar.css" for this commit!',
    },
    success: {
      characterId: 'maya',
      mood: 'cheering',
      message: 'Perfect! navbar.css is staged, and my broken widget stays safely in the working directory.',
    },
  },
  'm-05-first-commit': {
    intro: {
      characterId: 'sam',
      mood: 'explaining',
      message: 'Ready for your first commit! Write a descriptive message like "Update homepage". Remember: imperative mood is standard.',
    },
    success: {
      characterId: 'sam',
      mood: 'cheering',
      message: 'Commit approved! Your snapshot now lives permanently in the Git history DAG.',
    },
  },
  'm-07-create-branch': {
    intro: {
      characterId: 'arjun',
      mood: 'greeting',
      message: 'We are starting the Login feature! Never commit experimental code to main. Let us create a branch named "feature/login".',
    },
  },
  'm-10-merge-conflict': {
    intro: {
      characterId: 'arjun',
      mood: 'warning',
      message: 'Oops! I edited line 4 on my branch, and you edited line 4 on main! Git halted with a conflict. Let us settle this in the Conflict Lab!',
    },
    resolved: {
      characterId: 'sam',
      mood: 'cheering',
      message: 'Conflict cleanly resolved! That is how real senior engineers handle merge disputes.',
    },
  },
  'm-13-team-workflow': {
    intro: {
      characterId: 'maya',
      mood: 'greeting',
      message: 'Issue #42 is assigned to you! Create feature/dark-mode, commit the toggle button, and push to origin so Sam and I can review your PR.',
    },
  },
  'm-14-pr-review': {
    intro: {
      characterId: 'sam',
      mood: 'explaining',
      message: 'I reviewed Maya\'s PR #18 and gave it an initial LGTM. Can you inspect the diff, verify the responsive styles, and click Squash & Merge?',
    },
  },
  'm-15-cicd-actions': {
    intro: {
      characterId: 'sam',
      mood: 'warning',
      message: 'RED ALERT! The automated test suite failed on GitHub Actions! Check the test log in app.js and get our pipeline back to GREEN!',
    },
  },
};
