export interface TermsSection {
  id: string;
  title: string;
  effectiveDate: string;
  summary: string;
  paragraphs: string[];
}

export const TERMS_AND_CONDITIONS: {
  version: string;
  lastUpdated: string;
  sections: TermsSection[];
} = {
  version: '2.4.0',
  lastUpdated: 'September 20, 2026',
  sections: [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      effectiveDate: 'September 20, 2026',
      summary: 'By using GitQuest, you agree to these Terms and Conditions.',
      paragraphs: [
        'Welcome to GitQuest! By accessing, browsing, or utilizing the GitQuest web application, simulation tools, tutorials, presentation decks, and gamified RPG systems, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions ("Terms").',
        'If you do not agree to these Terms, you may not access or use the platform. These Terms constitute a binding agreement between you ("User" or "Learner") and GitQuest.',
      ],
    },
    {
      id: 'educational-sandbox',
      title: '2. Educational Purpose & Simulated Sandbox',
      effectiveDate: 'September 20, 2026',
      summary: 'All Git commands run in an in-browser sandbox and do not modify your computer.',
      paragraphs: [
        'GitQuest is an educational platform designed to teach version control principles, the Git command-line interface, and GitHub collaboration workflows.',
        'The interactive terminal and simulator environment operate entirely inside your client browser via an in-memory virtual state machine. Commands executed within GitQuest (such as git init, git add, git commit, git merge, etc.) do NOT alter, delete, or create files on your actual local operating system hard drive, nor do they connect directly to live private GitHub credentials without explicit authorization.',
        'GitQuest is provided "as is" for learning, practice, and skill enhancement.',
      ],
    },
    {
      id: 'gamification-tokens',
      title: '3. Gamification, XP, Virtual Coins & Leaderboards',
      effectiveDate: 'September 20, 2026',
      summary: 'XP, coins, and levels are purely virtual for learning motivation with no monetary value.',
      paragraphs: [
        'GitQuest incorporates game elements, including Experience Points (XP), Adventurer Levels, Daily Coding Streaks, Virtual Coins (🪙), Inventory Artifacts, and Guild Leaderboards.',
        'All virtual currency, tokens, items, and rankings have NO real-world monetary value, cannot be redeemed for fiat currency or physical goods, and cannot be transferred, sold, or auctioned.',
        'GitQuest reserves the right to rebalance, calibrate, or reset virtual stats, XP values, or seasonal leaderboards during platform updates to ensure fair and educational progression.',
      ],
    },
    {
      id: 'privacy-storage',
      title: '4. Privacy, Data Retention & Local Storage',
      effectiveDate: 'September 20, 2026',
      summary: 'Your progress is stored locally on your device with complete privacy.',
      paragraphs: [
        'We believe in privacy-by-design. Your mission completion progress, active inventory items, sound preferences, and earned XP are stored locally on your device using HTML5 Web Storage (localStorage).',
        'GitQuest does not sell, rent, or trade your personal data to advertisers or third-party brokers.',
        'You have the right to wipe or reset your progress at any time by clearing your browser site data or clicking "Reset Progress" in your settings.',
      ],
    },
    {
      id: 'intellectual-property',
      title: '5. Intellectual Property & Open Source License',
      effectiveDate: 'September 20, 2026',
      summary: 'Core simulator code is licensed under the MIT License.',
      paragraphs: [
        'The underlying GitQuest source code is open source and licensed under the MIT License, granting you the freedom to inspect, fork, learn from, and adapt the code.',
        'GitQuest graphics, custom pixel-art assets, audio synthesizer routines, and curriculum slide decks are provided for educational use. Git and the Git logo are trademarks of Software Freedom Conservancy. GitHub and the Octocat logo are trademarks of GitHub, Inc.',
        'GitQuest is an independent educational initiative inspired by modern learning methodologies and is not officially affiliated with or endorsed by Software Freedom Conservancy or GitHub, Inc.',
      ],
    },
    {
      id: 'code-of-conduct',
      title: '6. Code of Conduct & Community Standards',
      effectiveDate: 'September 20, 2026',
      summary: 'Treat fellow developers with respect, fairness, and collegiality.',
      paragraphs: [
        'GitQuest encourages a welcoming, harassment-free learning space for everyone regardless of background, gender, sexual orientation, disability, race, or programming experience.',
        'Users agree not to exploit automated bots, denial of service scripts, or malicious injection attacks against the platform or shared community endpoints.',
        'When participating in mock code reviews and pull request discussions, users must provide constructive, respectful feedback aligned with professional industry standards.',
      ],
    },
    {
      id: 'disclaimers',
      title: '7. Warranty Disclaimers & Limitation of Liability',
      effectiveDate: 'September 20, 2026',
      summary: 'Platform is provided as-is without warranties of any kind.',
      paragraphs: [
        'GitQuest is provided "as is" and "as available" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, or non-infringement.',
        'In no event shall the authors, maintainers, or contributors be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from or out of the use of the platform.',
      ],
    },
    {
      id: 'updates-contact',
      title: '8. Modifications to Terms & Contact',
      effectiveDate: 'September 20, 2026',
      summary: 'Terms may be updated periodically to reflect new features.',
      paragraphs: [
        'We may revise these Terms and Conditions periodically. Continued use of GitQuest after revisions constitutes acceptance of the updated Terms.',
        'For inquiries, licensing questions, or security reports, please visit the official GitHub repository at https://github.com/Yahoshuva138/GitQuest.',
      ],
    },
  ],
};
