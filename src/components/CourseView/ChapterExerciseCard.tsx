import React from 'react';
import { CheckCircle2, Lock, Play } from 'lucide-react';
import { CourseChapter, CourseExercise } from '../../data/codexCourse';
import { useGame } from '../../context/GameContext';
import { playClickSound } from '../../utils/audio';

interface ChapterExerciseCardProps {
  chapter: CourseChapter;
  onSelectExercise: (exercise: CourseExercise) => void;
}

export const ChapterExerciseCard: React.FC<ChapterExerciseCardProps> = ({
  chapter,
  onSelectExercise,
}) => {
  const { completedMissions, soundEnabled } = useGame();

  const handleStartExercise = (exercise: CourseExercise) => {
    if (soundEnabled) playClickSound();
    onSelectExercise(exercise);
  };

  return (
    <div className="rounded-2xl bg-[#0e1320] border-2 border-dev-border/80 overflow-hidden shadow-lg select-none mb-6">
      {/* Chapter Header */}
      <div className="p-5 sm:p-6 bg-[#131929] border-b border-dev-border/70">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-dev-border bg-dev-surface flex items-center justify-center font-mono font-bold text-sm text-dev-heading">
              {chapter.chapterNumber}
            </div>
            <h2 className="text-base sm:text-lg font-mono font-bold text-dev-heading tracking-wide">
              {chapter.title}
            </h2>
          </div>

          {chapter.isClubOnly && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold uppercase tracking-wider">
              CLUB
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-dev-subtext font-sans pl-11">
          {chapter.description}
        </p>
      </div>

      {/* Exercises Table Rows */}
      <div className="divide-y divide-dev-border/40">
        {chapter.exercises.map((exercise) => {
          const isCompleted = completedMissions.includes(exercise.missionId);
          // Exercise 1 is always unlocked. Others unlocked if previous completed or already done.
          const isUnlocked =
            exercise.exerciseNumber === 1 ||
            isCompleted ||
            completedMissions.includes(
              chapter.exercises[exercise.exerciseNumber - 2]?.missionId || ''
            );

          return (
            <div
              key={exercise.id}
              className={`px-5 sm:px-6 py-3.5 flex items-center justify-between gap-4 transition-colors ${
                isCompleted
                  ? 'bg-[#0f1726]/40 hover:bg-[#0f1726]/70'
                  : isUnlocked
                  ? 'bg-transparent hover:bg-dev-surface/30'
                  : 'bg-black/20 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-dev-subtext w-20 shrink-0">
                  Exercise {exercise.exerciseNumber}
                </span>
                <span className="text-xs sm:text-sm font-sans font-medium text-dev-heading">
                  {exercise.title}
                </span>
              </div>

              {/* Button matching reference image: [Start] (Blue) or [???] (Dark Pill) */}
              <div>
                {isUnlocked ? (
                  <button
                    onClick={() => handleStartExercise(exercise)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                      isCompleted
                        ? 'bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300'
                        : 'bg-git-blue hover:bg-blue-500 text-white shadow-sm'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Done</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>Start</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div
                    className="px-4 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-500 text-xs font-mono font-bold cursor-not-allowed select-none"
                    title="Complete previous exercise to unlock"
                  >
                    ???
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
