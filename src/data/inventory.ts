export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'tool' | 'artifact' | 'companion' | 'badge';
  description: string;
  effect: string;
  unlockedRegionId: string;
}

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'init-crystal',
    name: 'Initializer Crystal',
    icon: '💎',
    rarity: 'common',
    category: 'artifact',
    description: 'A radiant crystal that births a .git database in any empty directory.',
    effect: '+50 XP upon repository initialization',
    unlockedRegionId: 'region-01',
  },
  {
    id: 'diff-monocle',
    name: 'Diff Monocle',
    icon: '🔍',
    rarity: 'common',
    category: 'tool',
    description: 'An enchanted lens that highlights code changes with green additions and red deletions.',
    effect: 'Reveals line diffs automatically before staging',
    unlockedRegionId: 'region-02',
  },
  {
    id: 'branch-compass',
    name: 'Branch Compass',
    icon: '🧭',
    rarity: 'rare',
    category: 'tool',
    description: 'A brass compass whose needle tracks HEAD through parallel branch realities.',
    effect: 'Prevents committing directly to main without thinking',
    unlockedRegionId: 'region-03',
  },
  {
    id: 'merge-shield',
    name: 'Merge Shield',
    icon: '🛡️',
    rarity: 'epic',
    category: 'tool',
    description: 'Forged in the Conflict Cavern to withstand clashing <<<<<<< markers.',
    effect: 'Highlights 3-way conflicts with spark particles',
    unlockedRegionId: 'region-04',
  },
  {
    id: 'remote-beacon',
    name: 'Remote Beacon',
    icon: '📡',
    rarity: 'rare',
    category: 'artifact',
    description: 'A celestial transceiver linking your terminal to GitHub in the clouds.',
    effect: 'Enables git push origin and cloud backups',
    unlockedRegionId: 'region-05',
  },
  {
    id: 'lgtm-stamp',
    name: 'LGTM Stamp of Approval',
    icon: '✅',
    rarity: 'epic',
    category: 'badge',
    description: 'The golden seal given by lead reviewers when a PR is clean and tested.',
    effect: 'Unlocks Squash and Merge capabilities',
    unlockedRegionId: 'region-06',
  },
  {
    id: 'pipeline-core',
    name: 'Green Pipeline Core',
    icon: '⚡',
    rarity: 'legendary',
    category: 'artifact',
    description: 'A pulsating core from the Automaton Tower that keeps CI builds green.',
    effect: 'Automates linting, testing, and cloud deployment',
    unlockedRegionId: 'region-07',
  },
  {
    id: 'debug-duck',
    name: 'Byte the Rubber Duck',
    icon: '🦆',
    rarity: 'legendary',
    category: 'companion',
    description: 'A trusty rubber duck companion who listens when your code refuses to compile.',
    effect: '+100% Morale during tough debugging sessions',
    unlockedRegionId: 'region-01',
  },
];
