import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  FileText,
  Video,
} from 'lucide-react';
import { TOPICS_CURRICULUM, TopicCurriculum } from '../data/curriculum';
import { useGame } from '../context/GameContext';
import { playClickSound } from '../utils/audio';

interface CourseViewProps {
  onOpenCutscene: (topic: TopicCurriculum) => void;
  onOpenPresentation: (topic: TopicCurriculum) => void;
}

export const CourseView: React.FC<CourseViewProps> = ({
  onOpenCutscene,
  onOpenPresentation,
}) => {
  const { completedMissions, startMission, setActiveTab, soundEnabled } = useGame();
  const [selectedTopic, setSelectedTopic] = useState<TopicCurriculum>(
    TOPICS_CURRICULUM[0]
  );

  const handleCutscene = (topic: TopicCurriculum) => {
    if (soundEnabled) playClickSound();
    onOpenCutscene(topic);
  };

  const handlePresentation = (topic: TopicCurriculum) => {
    if (soundEnabled) playClickSound();
    onOpenPresentation(topic);
  };

  const handleStartMission = (topic: TopicCurriculum) => {
    if (soundEnabled) playClickSound();
    startMission(topic.missionId);
    setActiveTab('missions');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Course Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#111728] via-[#161d33] to-[#0d121f] border-2 border-rpg-gold/40 shadow-pixelGold overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-rpg-gold tracking-widest uppercase">
                GitQuest Curriculum
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-git-blue/20 text-git-blue border border-git-blue/40 font-bold">
                10 CHAPTERS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-pixel text-dev-heading tracking-wide">
              GIT & GITHUB CURRICULUM
            </h1>
            <p className="text-xs sm:text-sm text-dev-subtext font-mono max-w-2xl leading-relaxed">
              Step-by-step interactive lessons with story cutscenes, comprehensive PPT presentation decks, and hands-on terminal missions.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/40 px-4 py-3 rounded-xl border border-dev-border shrink-0">
            <div className="text-center font-mono">
              <div className="font-pixel text-base text-rpg-xp font-bold">
                2,400 XP
              </div>
              <div className="text-[10px] text-dev-subtext uppercase">Total Course XP</div>
            </div>
            <div className="h-8 w-[1px] bg-dev-border/70" />
            <div className="text-center font-mono">
              <div className="font-pixel text-base text-rpg-gold font-bold">🪙 500</div>
              <div className="text-[10px] text-dev-subtext uppercase">Coins Reward</div>
            </div>
          </div>
        </div>

        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {TOPICS_CURRICULUM.map((topic) => {
          const isCompleted = completedMissions.includes(topic.missionId);

          return (
            <div
              key={topic.id}
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-4 ${
                isCompleted
                  ? 'border-emerald-500/40 bg-[#0e1724] hover:border-emerald-500/70'
                  : 'border-dev-border bg-[#0e1422] hover:border-rpg-gold/50 shadow-sm'
              }`}
            >
              {/* Top info */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-[10px] text-rpg-gold">
                      CHAPTER 0{topic.chapterNumber}
                    </span>
                    <span className="text-[10px] text-dev-subtext">/{topic.slug}</span>
                  </div>

                  {isCompleted ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-dev-subtext flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{topic.estimatedMinutes} min</span>
                    </span>
                  )}
                </div>

                <h3 className="font-pixel text-xs sm:text-sm text-dev-heading font-bold">
                  {topic.title}
                </h3>
                <p className="text-xs text-dev-subtext font-mono mt-1 leading-relaxed">
                  {topic.subtitle}
                </p>

                {/* Rewards & Slides count */}
                <div className="flex items-center gap-2 mt-3 text-[11px] font-mono">
                  <span className="text-rpg-xp font-bold">+{topic.xpReward} XP</span>
                  <span>•</span>
                  <span className="text-yellow-300 font-bold">🪙 +{topic.coinsReward}</span>
                  <span>•</span>
                  <span className="text-dev-subtext">{topic.slides.length} PPT Slides</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-dev-border/50 flex flex-wrap items-center gap-2">
                {/* Cutscene Trigger */}
                <button
                  onClick={() => handleCutscene(topic)}
                  className="px-3 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
                  title="Watch cinematic story intro"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Story Intro</span>
                </button>

                {/* PPT Trigger */}
                <button
                  onClick={() => handlePresentation(topic)}
                  className="px-3.5 py-2 rounded-xl bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-heading font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
                  title="Open interactive slide deck"
                >
                  <BookOpen className="w-3.5 h-3.5 text-rpg-gold" />
                  <span>View PPT</span>
                </button>

                {/* Quest Trigger */}
                <button
                  onClick={() => handleStartMission(topic)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-git-blue hover:bg-blue-500 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isCompleted ? 'Replay Quest' : 'Start Quest'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
