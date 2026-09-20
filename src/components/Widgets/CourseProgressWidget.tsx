import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { CODEX_COURSE } from '../../data/codexCourse';

export const CourseProgressWidget: React.FC = () => {
  const { completedMissions, xp } = useGame();

  const totalExercises = CODEX_COURSE.totalExercises;
  const completedExercises = Math.min(
    totalExercises,
    completedMissions.length
  );
  const exercisePercent = Math.round((completedExercises / totalExercises) * 100);

  const earnedXP = Math.min(CODEX_COURSE.totalXP, xp);
  const xpPercent = Math.round((earnedXP / CODEX_COURSE.totalXP) * 100);

  return (
    <div className="rounded-2xl bg-[#0e1320] border-2 border-dev-border/80 p-5 shadow-lg select-none mb-4 space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold text-dev-heading uppercase tracking-wide">
          Course Progress
        </h3>
        <span className="text-[10px] font-mono text-dev-subtext">
          {completedExercises}/{totalExercises}
        </span>
      </div>

      {/* Exercises Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-dev-subtext flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-git-blue" />
            <span>Exercises</span>
          </span>
          <span className="text-dev-heading font-bold">
            {completedExercises}/{totalExercises}
          </span>
        </div>
        <div className="w-full h-2 bg-dev-bg rounded-full overflow-hidden border border-dev-border">
          <div
            className="h-full bg-git-blue rounded-full transition-all duration-300"
            style={{ width: `${exercisePercent}%` }}
          />
        </div>
      </div>

      {/* XP Earned Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-dev-subtext flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rpg-xp" />
            <span>XP Earned</span>
          </span>
          <span className="text-rpg-xp font-bold">
            {earnedXP}/{CODEX_COURSE.totalXP}
          </span>
        </div>
        <div className="w-full h-2 bg-dev-bg rounded-full overflow-hidden border border-dev-border">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-git-blue rounded-full transition-all duration-300"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
