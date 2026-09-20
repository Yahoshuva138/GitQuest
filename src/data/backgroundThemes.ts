export interface BackgroundTheme {
  id: string;
  name: string;
  japanese: string;
  image: string;
  description: string;
  tag: string;
  defaultOpacity: number;
}

export const BACKGROUND_THEMES: BackgroundTheme[] = [
  {
    id: 'codedex-twilight',
    name: 'Codédex Twilight Bridge',
    japanese: '『黄昏の東京タワー・桜橋』',
    image: '/backgrounds/codedex_twilight_bridge.jpg',
    description: 'Anime sunset cityscape with glowing Tokyo Tower, bicycle rider on bridge, blooming sakura, and pastel clouds.',
    tag: 'Codédex Iconic',
    defaultOpacity: 0.24,
  },
  {
    id: 'neo-tokyo',
    name: 'Neo-Tokyo Git City',
    japanese: '『ネオ東京・電脳街』',
    image: '/backgrounds/neo_tokyo_git_city.jpg',
    description: 'Rainy cyberpunk metropolis with floating holographic Git commit graphs and neon kanji signs.',
    tag: 'Cyberpunk',
    defaultOpacity: 0.22,
  },
  {
    id: 'crimson-conflict',
    name: 'Crimson Conflict Duel',
    japanese: '『紅蓮の対決・マージ衝突』',
    image: '/backgrounds/crimson_conflict_horizon.jpg',
    description: 'Dramatic sunset mountain ridge with clashing laser katanas and fiery embers for merge conflict battles.',
    tag: 'Action Anime',
    defaultOpacity: 0.22,
  },
  {
    id: 'orbital-satellite',
    name: 'Orbital Cloud Satellite',
    japanese: '『軌道衛星・グローバル配信』',
    image: '/backgrounds/orbital_cloud_satellite.jpg',
    description: 'Futuristic orbital station beaming worldwide Git commits to Earth at night with glowing aurora borealis.',
    tag: 'Sci-Fi Cloud',
    defaultOpacity: 0.22,
  },
  {
    id: 'celestial-summit',
    name: 'Celestial Starlight Summit',
    japanese: '『星空の頂・神域の鳥居』',
    image: '/backgrounds/celestial_starlight_summit.jpg',
    description: 'Ethereal mountain peak above a sea of clouds under a swirling Milky Way galaxy and ancient glowing Torii.',
    tag: 'Celestial',
    defaultOpacity: 0.22,
  },
  {
    id: 'sakura-shrine',
    name: 'Sakura Cyber Shrine',
    japanese: '『電脳神社・桜舞う鳥居』',
    image: '/backgrounds/sakura_cyber_shrine.jpg',
    description: 'Tranquil cyber torii gate with synthwave sunset, Mount Fuji silhouette, and cherry blossoms.',
    tag: 'Shinobi',
    defaultOpacity: 0.20,
  },
  {
    id: 'lofi-devroom',
    name: 'Lo-Fi Cyber Dev Room',
    japanese: '『深夜の開発室・ネオンと猫』',
    image: '/backgrounds/lofi_cyber_devroom.jpg',
    description: 'Midnight developer workstation with multi-monitor Git trees, sleeping cat, and rainy city window.',
    tag: 'Lo-Fi Chill',
    defaultOpacity: 0.22,
  },
  {
    id: 'cosmic-void',
    name: 'Cosmic Git Void',
    japanese: '『宇宙ブランチ・特異点』',
    image: '/backgrounds/cosmic_git_void.jpg',
    description: 'Deep cosmic nebula with glowing constellations of branching timelines and event horizon.',
    tag: 'Cosmic',
    defaultOpacity: 0.22,
  },
  {
    id: 'cyber-grid',
    name: 'High-Tech Dark Grid',
    japanese: '『電脳グリッド空間』',
    image: '',
    description: 'Minimalist dark hacker grid for pure terminal contrast and ultra-clean focus.',
    tag: 'Minimal',
    defaultOpacity: 0.12,
  },
];

/**
 * Unique aesthetic wallpaper assigned to each individual page
 */
export const PAGE_BACKGROUND_MAP: Record<string, string> = {
  home: 'codedex-twilight',        // Codédex Twilight Bridge with Tokyo Tower & Sakura
  missions: 'neo-tokyo',           // Neo-Tokyo Cyberpunk Git Engine
  'branch-lab': 'cosmic-void',     // Cosmic Branching Void
  'conflict-lab': 'crimson-conflict', // Crimson Clash for Merge Conflicts
  'github-lab': 'orbital-satellite',  // Orbital Space Station for Remote GitHub
  'practice-lab': 'lofi-devroom',  // Cozy Lo-Fi Studio for Sandbox
  'world-map': 'sakura-shrine',    // Journey Overworld Torii Shrine
  'learning-map': 'sakura-shrine', // Learning Path Torii Gate
  progress: 'celestial-summit',    // Achievements Mountain Summit
};
