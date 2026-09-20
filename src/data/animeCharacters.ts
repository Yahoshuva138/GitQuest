export interface AnimeCharacter {
  id: string;
  name: string;
  japaneseName: string;
  title: string;
  role: string;
  avatar: string;
  themeColor: string;
  accentBg: string;
  element: 'Wind' | 'Lightning' | 'Flame' | 'Water' | 'Cosmic';
  specialty: string;
  quote: string;
  bio: string;
  passiveBonus: string;
}

export const ANIME_CHARACTERS: AnimeCharacter[] = [
  {
    id: 'sakura-coder',
    name: 'Sakura Coder',
    japaneseName: '桜の術師',
    title: 'Cherry Blossom Staging Mage',
    role: 'Frontend & UI Enchantress',
    avatar: '🌸',
    themeColor: '#f472b6',
    accentBg: 'from-pink-950/40 to-[#0c0a17]',
    element: 'Wind',
    specialty: 'Atomic Commits & Staging Precision',
    quote: 'Like delicate cherry blossom petals, every commit should be clean, intentional, and beautiful.',
    bio: 'A prodigious programmer from Neo-Tokyo who views code as digital poetry. She never stages untracked debug logs and weaves pristine commit histories.',
    passiveBonus: '+15% XP on all staging and commit exercises',
  },
  {
    id: 'ryu-terminal',
    name: 'Ryu Terminal',
    japaneseName: '端末の龍',
    title: 'The CLI Ronin',
    role: 'Command Line Swordsman',
    avatar: '⚡',
    themeColor: '#38bdf8',
    accentBg: 'from-sky-950/40 to-[#0a121e]',
    element: 'Lightning',
    specialty: 'Ultra-Fast CLI Navigation & Git Rebase',
    quote: 'A true warrior never touches the mouse. The terminal cursor is my blade.',
    bio: 'Wandering through the digital wasteland, Ryu has mastered every command line flag and keyboard shortcut. He can resolve complex git rebase conflicts in the blink of an eye.',
    passiveBonus: '+20% Speed bonus on terminal command completions',
  },
  {
    id: 'kaito-architect',
    name: 'Kaito Cloud',
    japaneseName: '雲海の錬金術師',
    title: 'Cloud Systems Alchemist',
    role: 'DevOps & CI/CD Master',
    avatar: '🔮',
    themeColor: '#c084fc',
    accentBg: 'from-purple-950/40 to-[#120a1e]',
    element: 'Cosmic',
    specialty: 'GitHub Actions & Distributed Remotes',
    quote: 'Code deployed to the cloud echoes across a thousand server nodes in unison.',
    bio: 'Former chief architect of the Floating Cloud Sanctuary. Kaito orchestrates massive GitHub Actions pipelines and ensures every build passes automated sentinels.',
    passiveBonus: '+25 Coins on remote push and CI/CD missions',
  },
  {
    id: 'kitsune-dev',
    name: 'Kitsune Dev',
    japaneseName: '九尾の案内人',
    title: 'Open Source Spirit',
    role: 'Pull Request Reviewer & Guide',
    avatar: '🦊',
    themeColor: '#fb923c',
    accentBg: 'from-orange-950/40 to-[#180f0a]',
    element: 'Flame',
    specialty: 'Peer Review & Merge Conflict Diplomacy',
    quote: 'A friendly review comment can turn a nervous newcomer into a lifelong open source contributor!',
    bio: 'A mythical nine-tailed fox spirit who guards the Guild Hall Colosseum. She brings kindness, empathy, and razor-sharp attention to detail to every Pull Request.',
    passiveBonus: '+30% Morale and hints are 50% cheaper',
  },
  {
    id: 'cyber-byte',
    name: 'Cyber Byte',
    japaneseName: '電脳アヒル',
    title: 'Cybernetic Rubber Duck',
    role: 'Sentient Pair-Programming Familiar',
    avatar: '🦆',
    themeColor: '#facc15',
    accentBg: 'from-yellow-950/40 to-[#181409]',
    element: 'Water',
    specialty: 'Bug Detection & Rubber Duck Debugging',
    quote: 'Quack! Explain the bug to me line by line, and you will discover the answer yourself!',
    bio: 'An adorable robotic rubber duck equipped with an in-memory compiler and an encouraging heart. He sits on your terminal prompt, cheering for every passing test.',
    passiveBonus: 'Automatic error explanation when a command fails',
  },
];
