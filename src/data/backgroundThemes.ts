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
    id: 'neo-tokyo',
    name: 'Neo-Tokyo Git City',
    japanese: '『ネオ東京・電脳街』',
    image: '/backgrounds/neo_tokyo_git_city.jpg',
    description: 'Rainy cyberpunk metropolis with floating holographic Git commit graphs and neon kanji signs.',
    tag: 'Cyberpunk',
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
