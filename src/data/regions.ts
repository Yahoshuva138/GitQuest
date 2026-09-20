export interface Region {
  id: string;
  number: number;
  name: string;
  codename: string;
  biome: 'coastal' | 'citadel' | 'forest' | 'volcano' | 'sky' | 'arena' | 'tower';
  themeColor: string;
  bgGradient: string;
  icon: string;
  landmark: string;
  description: string;
  lore: string;
  xpReward: number;
  missions: string[];
  artifact: {
    name: string;
    icon: string;
    description: string;
  };
}

export const REGIONS: Region[] = [
  {
    id: 'region-01',
    number: 1,
    name: 'The Origin Coast',
    codename: 'GIT EXPLORER',
    biome: 'coastal',
    themeColor: '#0EA5E9',
    bgGradient: 'from-sky-950/50 to-[#0A0E17]',
    icon: 'Compass',
    landmark: 'Lighthouse of .git',
    description: 'Awaken on the shores of Git. Initialize your first repository and discover the working directory.',
    lore: 'Legends say all code journeys begin where the digital ocean meets the local hard drive.',
    xpReward: 300,
    missions: ['m-01-meet-git', 'm-02-inspect-workspace', 'm-03-find-changes'],
    artifact: {
      name: 'The Initializer Crystal',
      icon: '💎',
      description: 'Allows a developer to summon a .git directory out of thin air.',
    },
  },
  {
    id: 'region-02',
    number: 2,
    name: 'Snapshot Citadel',
    codename: 'COMMITTER',
    biome: 'citadel',
    themeColor: '#10B981',
    bgGradient: 'from-emerald-950/50 to-[#0A0E17]',
    icon: 'GitCommit',
    landmark: 'The Great Staging Forge',
    description: 'Master the ancient two-phase commit ritual. Stage only the worthy files and engrave permanent snapshots.',
    lore: 'In the Citadel, nothing is forgotten. Every commit snapshot is sealed with a sacred 40-character SHA hash.',
    xpReward: 450,
    missions: ['m-04-stage-right-files', 'm-05-first-commit', 'm-06-inspect-history'],
    artifact: {
      name: 'The Diff Monocle',
      icon: '🔍',
      description: 'Reveals green added lines and red deleted lines hidden inside any file.',
    },
  },
  {
    id: 'region-03',
    number: 3,
    name: 'The Forked Forest',
    codename: 'BRANCH EXPLORER',
    biome: 'forest',
    themeColor: '#3B82F6',
    bgGradient: 'from-blue-950/50 to-[#0A0E17]',
    icon: 'GitBranch',
    landmark: 'The World Trunk & Branch Canopy',
    description: 'Venture into parallel timelines. Branch off safely to build experimental features without risking production.',
    lore: 'Each branch is a parallel reality. Fast-forward paths let travelers unite timelines effortlessly.',
    xpReward: 500,
    missions: ['m-07-create-branch', 'm-08-switch-and-work', 'm-09-merge-main'],
    artifact: {
      name: 'The Branch Compass',
      icon: '🧭',
      description: 'Points HEAD precisely to any branch without losing your working changes.',
    },
  },
  {
    id: 'region-04',
    number: 4,
    name: 'Conflict Cavern',
    codename: 'CONFLICT HUNTER',
    biome: 'volcano',
    themeColor: '#F43F5E',
    bgGradient: 'from-rose-950/50 to-[#0A0E17]',
    icon: 'Flame',
    landmark: 'The Collision Chasm',
    description: 'Descend into the volcanic depths where overlapping code lines clash. Decode <<<<<<< HEAD and forge harmony.',
    lore: 'When two developers strike the same line of code, the cavern trembles until a human mind chooses the path forward.',
    xpReward: 600,
    missions: ['m-10-merge-conflict'],
    artifact: {
      name: 'The Merge Shield',
      icon: '🛡️',
      description: 'Deflects merge panic and safely parses <<<<<<< conflict markers.',
    },
  },
  {
    id: 'region-05',
    number: 5,
    name: 'Cloud Kingdom of GitHub',
    codename: 'GITHUB COLLABORATOR',
    biome: 'sky',
    themeColor: '#A855F7',
    bgGradient: 'from-purple-950/50 to-[#0A0E17]',
    icon: 'Cloud',
    landmark: 'The Floating Cloud Sanctuary',
    description: 'Ascend beyond localhost. Link your repository to the cloud, push your snapshots, and pull teammate updates.',
    lore: 'High above your local disk sits GitHub, where code travels across oceans in milliseconds.',
    xpReward: 550,
    missions: ['m-11-remote-push', 'm-12-pull-updates'],
    artifact: {
      name: 'The Remote Beacon (origin)',
      icon: '📡',
      description: 'Connects any local machine directly to GitHub with a single command.',
    },
  },
  {
    id: 'region-06',
    number: 6,
    name: 'The Guild Hall & PR Arena',
    codename: 'TEAM & PR MASTER',
    biome: 'arena',
    themeColor: '#FBBF24',
    bgGradient: 'from-amber-950/50 to-[#0A0E17]',
    icon: 'GitPullRequest',
    landmark: 'The Peer Review Colosseum',
    description: 'Join Maya, Arjun, and Sam in the team arena. Open pull requests, address review notes, and squash & merge.',
    lore: 'True engineers never ship alone. Code review is the sacred dialogue that transforms code into craft.',
    xpReward: 700,
    missions: ['m-13-team-workflow', 'm-14-pr-review'],
    artifact: {
      name: 'The LGTM Stamp',
      icon: '✅',
      description: 'Carries the official approval of lead reviewers and unlocks production merges.',
    },
  },
  {
    id: 'region-07',
    number: 7,
    name: 'Automaton Tower',
    codename: 'CI/CD & RECOVERY',
    biome: 'tower',
    themeColor: '#06B6D4',
    bgGradient: 'from-cyan-950/50 to-[#0A0E17]',
    icon: 'Cpu',
    landmark: 'The Pipeline Spire',
    description: 'Harness the power of GitHub Actions. Debug failing automated test suites and turn the pipeline GREEN.',
    lore: 'The clockwork spire never sleeps. On every push, automated sentinels verify every line before deployment.',
    xpReward: 800,
    missions: ['m-15-cicd-actions'],
    artifact: {
      name: 'The Green Pipeline Core',
      icon: '⚡',
      description: 'Empowers builds to run 100% test-passing and bug-free.',
    },
  },
];
