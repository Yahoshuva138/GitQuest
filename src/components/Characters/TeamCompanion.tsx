import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, Volume2, Info, ChevronRight, X } from 'lucide-react';
import { TEAM_CHARACTERS, MISSION_DIALOGUES, Character } from '../../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { useGame } from '../../context/GameContext';

interface TeamCompanionProps {
  className?: string;
}

export const TeamCompanion: React.FC<TeamCompanionProps> = ({ className = '' }) => {
  const { currentMission, currentStepIndex, commandHistory } = useGame();
  const [isDismissed, setIsDismissed] = useState(false);
  const [bounce, setBounce] = useState(false);

  // Determine which character should speak for this mission & step
  const missionDialogueSet = MISSION_DIALOGUES[currentMission.id];
  let dialogueData = missionDialogueSet ? missionDialogueSet['intro'] : null;

  if (missionDialogueSet) {
    if (currentStepIndex === 0 && missionDialogueSet['intro']) {
      dialogueData = missionDialogueSet['intro'];
    } else if (currentStepIndex === 1 && missionDialogueSet['step_init']) {
      dialogueData = missionDialogueSet['step_init'];
    } else if (currentStepIndex === 1 && missionDialogueSet['step_diff']) {
      dialogueData = missionDialogueSet['step_diff'];
    } else if (missionDialogueSet['step_status']) {
      dialogueData = missionDialogueSet['step_status'];
    } else if (missionDialogueSet['resolved']) {
      dialogueData = missionDialogueSet['resolved'];
    } else if (missionDialogueSet['success']) {
      dialogueData = missionDialogueSet['success'];
    }
  }

  // Fallback to Byte the GitBot if no custom dialogue
  const character: Character =
    dialogueData && TEAM_CHARACTERS[dialogueData.characterId]
      ? TEAM_CHARACTERS[dialogueData.characterId]
      : TEAM_CHARACTERS['byte'];

  const messageText =
    dialogueData?.message ||
    `Step ${currentStepIndex + 1}: ${currentMission.steps[currentStepIndex]?.description || currentMission.objective}`;

  const mood = dialogueData?.mood || 'explaining';

  // Trigger bounce animation when step or command changes
  useEffect(() => {
    setBounce(true);
    setIsDismissed(false);
    const t = setTimeout(() => setBounce(false), 600);
    return () => clearTimeout(t);
  }, [currentStepIndex, currentMission.id, commandHistory.length]);

  if (isDismissed) {
    return (
      <button
        onClick={() => setIsDismissed(false)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dev-surface border border-dev-border text-dev-subtext hover:text-dev-heading hover:border-git-blue/50 text-xs font-mono transition-all shadow-subtle animate-stage-in"
      >
        <CharacterAvatar character={character} size="sm" showStatus={false} />
        <span>Ask {character.name.split(' ')[0]}</span>
      </button>
    );
  }

  return (
    <div
      className={`dev-panel p-3.5 bg-gradient-to-r from-dev-panel to-[#0E1520] border-dev-border shadow-panel flex items-start gap-3.5 transition-all ${
        bounce ? 'animate-bounce' : ''
      } ${className}`}
    >
      {/* Animated Avatar */}
      <div className="relative shrink-0">
        <CharacterAvatar character={character} mood={mood} size="md" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono px-1 rounded bg-dev-bg border border-dev-border text-dev-subtext">
          {character.role.split(' ')[0]}
        </div>
      </div>

      {/* Dialogue Speech Bubble */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-dev-heading font-sans text-xs">
              {character.name}
            </span>
            <span className="text-[10px] text-dev-subtext font-mono">
              · {character.title}
            </span>
          </div>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-dev-subtext hover:text-dev-heading p-0.5 rounded hover:bg-dev-surface transition-colors"
            title="Minimize dialogue"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-dev-text font-sans leading-relaxed">
          {messageText}
        </p>

        <div className="mt-2 flex items-center justify-between text-[10.5px] font-mono text-dev-subtext">
          <span className="italic text-dev-subtext/70">"{character.quote}"</span>
          <span className="flex items-center gap-1 text-git-blue">
            <span>Tip: {character.specialty}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
