export interface CourseExercise {
  id: string;
  exerciseNumber: number;
  title: string;
  missionId: string;
  topicId: string;
  isClubOnly?: boolean;
}

export interface CourseChapter {
  id: string;
  chapterNumber: number;
  title: string;
  description: string;
  isClubOnly?: boolean;
  exercises: CourseExercise[];
}

export const GITQUEST_COURSE: {
  title: string;
  badge: string;
  description: string;
  prerequisite: string;
  timeToComplete: string;
  totalLearners: string;
  totalExercises: number;
  totalXP: number;
  chapters: CourseChapter[];
} = {
  title: 'Git & GitHub',
  badge: 'INTERMEDIATE COURSE',
  description:
    'Learn to use Git for version control, and GitHub to collaborate on projects, track code changes, and contribute to open-source projects.',
  prerequisite: 'Command Line',
  timeToComplete: '~4h',
  totalLearners: '+12.4K learners',
  totalExercises: 12,
  totalXP: 350,
  chapters: [
    {
      id: 'ch-1',
      chapterNumber: 1,
      title: 'Your First Repo',
      description:
        'Create your first repository using the command line to store and share your code.',
      exercises: [
        {
          id: 'ex-1',
          exerciseNumber: 1,
          title: 'Introduction',
          missionId: 'm-01-meet-git',
          topicId: '01-introduction',
        },
        {
          id: 'ex-2',
          exerciseNumber: 2,
          title: 'Repositories',
          missionId: 'm-02-inspect-workspace',
          topicId: '02-the-terminal',
        },
        {
          id: 'ex-3',
          exerciseNumber: 3,
          title: 'Git Commands',
          missionId: 'm-03-find-changes',
          topicId: '03-first-repository',
        },
        {
          id: 'ex-4',
          exerciseNumber: 4,
          title: 'Git Workflow',
          missionId: 'm-04-stage-right-files',
          topicId: '04-staging-and-committing',
        },
        {
          id: 'ex-5',
          exerciseNumber: 5,
          title: 'Local Push',
          missionId: 'm-05-first-commit',
          topicId: '04-staging-and-committing',
        },
        {
          id: 'ex-6',
          exerciseNumber: 6,
          title: 'Read Me',
          missionId: 'm-06-inspect-history',
          topicId: '05-history-and-diffs',
        },
      ],
    },
    {
      id: 'ch-2',
      chapterNumber: 2,
      title: 'Exploring Repos',
      description:
        'Learn how to collaborate with others on a repo, navigate merge conflicts, and create your first pull request.',
      isClubOnly: true,
      exercises: [
        {
          id: 'ex-7',
          exerciseNumber: 7,
          title: 'Git Clone',
          missionId: 'm-07-create-branch',
          topicId: '06-branching-world',
        },
        {
          id: 'ex-8',
          exerciseNumber: 8,
          title: 'Branch Out',
          missionId: 'm-08-switch-and-work',
          topicId: '06-branching-world',
        },
        {
          id: 'ex-9',
          exerciseNumber: 9,
          title: 'Git & Teams',
          missionId: 'm-09-merge-main',
          topicId: '07-merges-and-conflicts',
        },
        {
          id: 'ex-10',
          exerciseNumber: 10,
          title: 'Merges',
          missionId: 'm-10-merge-conflict',
          topicId: '07-merges-and-conflicts',
        },
        {
          id: 'ex-11',
          exerciseNumber: 11,
          title: 'Pull Requests',
          missionId: 'm-11-remote-push',
          topicId: '08-github-and-remotes',
        },
        {
          id: 'ex-12',
          exerciseNumber: 12,
          title: 'Year-book',
          missionId: 'm-14-pr-review',
          topicId: '09-pull-requests',
        },
      ],
    },
  ],
};

// Backwards compatibility alias
export const CODEX_COURSE = GITQUEST_COURSE;
