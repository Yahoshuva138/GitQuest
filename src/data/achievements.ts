import { Achievement } from '../engine/types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-commit',
    title: 'First Commit',
    description: 'Created your very first immutable Git commit snapshot.',
    icon: 'GitCommit',
    category: 'core',
  },
  {
    id: 'clean-stager',
    title: 'Selective Stager',
    description: 'Mastered the staging area by committing only what was ready.',
    icon: 'CheckSquare',
    category: 'core',
  },
  {
    id: 'commit-detective',
    title: 'Commit Detective',
    description: 'Inspected commit history with git log and investigated diffs.',
    icon: 'Search',
    category: 'core',
  },
  {
    id: 'branch-creator',
    title: 'Branch Explorer',
    description: 'Created an isolated feature branch and switched HEAD safely.',
    icon: 'GitBranch',
    category: 'branching',
  },
  {
    id: 'conflict-solver',
    title: 'Conflict Hunter',
    description: 'Faced a 3-way merge conflict and resolved overlapping lines.',
    icon: 'Flame',
    category: 'branching',
  },
  {
    id: 'github-collaborator',
    title: 'GitHub Collaborator',
    description: 'Connected a remote origin and synchronized commits with the cloud.',
    icon: 'Cloud',
    category: 'collaboration',
  },
  {
    id: 'pr-reviewer',
    title: 'PR Reviewer',
    description: 'Reviewed teammate code diffs and executed a successful Pull Request merge.',
    icon: 'GitPullRequest',
    category: 'collaboration',
  },
  {
    id: 'cicd-engineer',
    title: 'CI/CD Engineer',
    description: 'Diagnosed a broken GitHub Actions workflow and turned the pipeline green.',
    icon: 'Cpu',
    category: 'advanced',
  },
];
