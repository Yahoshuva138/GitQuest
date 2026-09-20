import React, { useState } from 'react';
import { AnimeCourseHero } from '../AnimeHero/AnimeCourseHero';
import { ChapterExerciseCard } from './ChapterExerciseCard';
import { AnimeProfileCard } from '../Profile/AnimeProfileCard';
import { AnimeProfileModal } from '../Profile/AnimeProfileModal';
import { CourseProgressWidget } from '../Widgets/CourseProgressWidget';
import { BadgesWidget } from '../Widgets/BadgesWidget';
import { CheatSheetWidget } from '../Widgets/CheatSheetWidget';
import { CommunityWidget } from '../Widgets/CommunityWidget';
import { AnimeMascotBar } from '../Mascot/AnimeMascotBar';
import { CODEX_COURSE, CourseExercise } from '../../data/codexCourse';
import { TOPICS_CURRICULUM } from '../../data/curriculum';
import { useGame } from '../../context/GameContext';

export const CodexCourseLayout: React.FC = () => {
  const {
    startMission,
    setActiveTab,
    openTopicPresentation,
    openTopicCutscene,
  } = useGame();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleSelectExercise = (exercise: CourseExercise) => {
    // Open the cinematic cutscene or presentation, then launch the mission
    const topic =
      TOPICS_CURRICULUM.find((t) => t.id === exercise.topicId) ||
      TOPICS_CURRICULUM[0];

    openTopicCutscene(topic.id);
  };

  const handleStartLearningFree = () => {
    const firstExercise = CODEX_COURSE.chapters[0].exercises[0];
    handleSelectExercise(firstExercise);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-fadeIn">
      {/* 1. Panoramic Anime Course Hero Banner */}
      <AnimeCourseHero onStartLearning={handleStartLearningFree} />

      {/* 2. Main 2-Column Course Layout matching reference image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chapters & Exercise Tables (8 cols) */}
        <div className="lg:col-span-8">
          {CODEX_COURSE.chapters.map((chapter) => (
            <ChapterExerciseCard
              key={chapter.id}
              chapter={chapter}
              onSelectExercise={handleSelectExercise}
            />
          ))}
        </div>

        {/* Right Column: Profile & Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* User Profile Card */}
          <AnimeProfileCard
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
          />

          {/* Course Progress Card */}
          <CourseProgressWidget />

          {/* Course Badges Card */}
          <BadgesWidget />

          {/* Cheat Sheets Card */}
          <CheatSheetWidget />

          {/* Need Help? Community Card */}
          <CommunityWidget />
        </div>
      </div>

      {/* 3. Floating Anime Mascot Assistant Bar */}
      <AnimeMascotBar />

      {/* 4. Anime Character Profile Modal */}
      <AnimeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
