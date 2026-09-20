import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RepositoryState,
  CommandResult,
  ExplanationData,
  Mission,
} from '../engine/types';
import { MISSIONS } from '../data/missions';
import { LEVELS } from '../data/levels';
import { createInitialRepo, executeGitCommand } from '../engine/gitSimulator';
import {
  playCoinSound,
  playSuccessSound,
  playErrorSound,
  playLevelUpSound,
  playClickSound,
} from '../utils/audio';

export type TabType =
  | 'home'
  | 'learning-map'
  | 'missions'
  | 'practice-lab'
  | 'branch-lab'
  | 'github-lab'
  | 'conflict-lab'
  | 'progress'
  | 'world-map'
  | 'inventory'
  | 'guild';

interface GameContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentMissionId: string;
  currentMission: Mission;
  currentStepIndex: number;
  repoState: RepositoryState;
  completedMissions: string[];
  unlockedLevels: string[];
  unlockedAchievements: string[];
  commandHistory: CommandResult[];
  lastExplanation: ExplanationData | null;
  isMissionCompleteModalOpen: boolean;
  hintsRevealed: number;

  // RPG / Codédex Features
  xp: number;
  level: number;
  coins: number;
  streakDays: number;
  soundEnabled: boolean;
  inventory: string[];
  playerTitle: string;
  addXP: (amount: number) => void;
  toggleSound: () => void;
  unlockInventoryItem: (itemId: string) => void;

  startMission: (missionId: string) => void;
  executeCommand: (commandString: string) => CommandResult;
  revealNextHint: () => void;
  resetCurrentMission: () => void;
  closeMissionCompleteModal: () => void;
  goToNextMission: () => void;
  resetAllProgress: () => void;
  updateRepoState: (state: RepositoryState) => void;
  resolveConflict: (resolution: 'current' | 'incoming' | 'both' | 'custom', customText?: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY_COMPLETED = 'gitquest_completed_missions';
const STORAGE_KEY_ACHIEVEMENTS = 'gitquest_achievements';
const STORAGE_KEY_XP = 'gitquest_xp';
const STORAGE_KEY_COINS = 'gitquest_coins';
const STORAGE_KEY_SOUND = 'gitquest_sound_enabled';
const STORAGE_KEY_INVENTORY = 'gitquest_inventory';

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentMissionId, setCurrentMissionId] = useState<string>('m-01-meet-git');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [hintsRevealed, setHintsRevealed] = useState<number>(0);
  const [lastExplanation, setLastExplanation] = useState<ExplanationData | null>(null);
  const [isMissionCompleteModalOpen, setIsMissionCompleteModalOpen] = useState<boolean>(false);
  const [commandHistory, setCommandHistory] = useState<CommandResult[]>([]);

  // RPG Progression States
  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_XP);
      return saved ? parseInt(saved, 10) : 120;
    } catch {
      return 120;
    }
  });

  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COINS);
      return saved ? parseInt(saved, 10) : 50;
    } catch {
      return 50;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SOUND);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [inventory, setInventory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INVENTORY);
      return saved ? JSON.parse(saved) : ['init-crystal', 'debug-duck'];
    } catch {
      return ['init-crystal', 'debug-duck'];
    }
  });

  const streakDays = 4; // Daily coding streak
  const level = Math.floor(xp / 250) + 1;

  const playerTitles = [
    'Code Initiate',
    'Repo Traveler',
    'Branch Mage',
    'Merge Paladin',
    'GitHub Grandmaster',
    'Pipeline Warlock',
    'Open Source Legend',
  ];
  const playerTitle = playerTitles[Math.min(level - 1, playerTitles.length - 1)];

  // Local storage for completed missions and achievements
  const [completedMissions, setCompletedMissions] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active mission
  const currentMission = MISSIONS.find((m) => m.id === currentMissionId) || MISSIONS[0];

  // Repository state initialized for current mission
  const [repoState, setRepoState] = useState<RepositoryState>(() => {
    return createInitialRepo(
      currentMission.initialFiles,
      currentMission.initialCommits,
      currentMission.initialBranches || ['main'],
      currentMission.currentBranch || 'main',
      currentMission.initialRemotes
    );
  });

  // Calculate unlocked levels based on completed missions
  const unlockedLevels = LEVELS.filter((lvl, idx) => {
    if (idx === 0) return true;
    const prevLevel = LEVELS[idx - 1];
    return prevLevel.missions.some((mId) => completedMissions.includes(mId));
  }).map((l) => l.id);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedMissions));
    } catch (e) {
      console.error(e);
    }
  }, [completedMissions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(unlockedAchievements));
    } catch (e) {
      console.error(e);
    }
  }, [unlockedAchievements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_XP, xp.toString());
    } catch (e) {
      console.error(e);
    }
  }, [xp]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COINS, coins.toString());
    } catch (e) {
      console.error(e);
    }
  }, [coins]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SOUND, JSON.stringify(soundEnabled));
    } catch (e) {
      console.error(e);
    }
  }, [soundEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(inventory));
    } catch (e) {
      console.error(e);
    }
  }, [inventory]);

  const addXP = (amount: number) => {
    setXp((prev) => {
      const nextXp = prev + amount;
      const prevLevel = Math.floor(prev / 250) + 1;
      const nextLevel = Math.floor(nextXp / 250) + 1;
      if (nextLevel > prevLevel) {
        playLevelUpSound(soundEnabled);
      }
      return nextXp;
    });
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const unlockInventoryItem = (itemId: string) => {
    setInventory((prev) => (prev.includes(itemId) ? prev : [...prev, itemId]));
  };

  const unlockAchievement = (id: string) => {
    setUnlockedAchievements((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const startMission = (missionId: string) => {
    playClickSound(soundEnabled);
    const mission = MISSIONS.find((m) => m.id === missionId);
    if (!mission) return;

    setCurrentMissionId(missionId);
    setCurrentStepIndex(0);
    setHintsRevealed(0);
    setLastExplanation(null);
    setIsMissionCompleteModalOpen(false);
    setCommandHistory([]);

    const newRepo = createInitialRepo(
      mission.initialFiles,
      mission.initialCommits,
      mission.initialBranches || ['main'],
      mission.currentBranch || 'main',
      mission.initialRemotes
    );

    if (mission.initialConflict) {
      newRepo.conflictState = { ...mission.initialConflict };
    }

    setRepoState(newRepo);
    setActiveTab('missions');
  };

  const resetCurrentMission = () => {
    playClickSound(soundEnabled);
    startMission(currentMissionId);
  };

  const revealNextHint = () => {
    playClickSound(soundEnabled);
    setHintsRevealed((prev) => Math.min(prev + 1, currentMission.hints.length));
  };

  const closeMissionCompleteModal = () => {
    playClickSound(soundEnabled);
    setIsMissionCompleteModalOpen(false);
  };

  const goToNextMission = () => {
    playClickSound(soundEnabled);
    setIsMissionCompleteModalOpen(false);
    if (currentMission.nextMissionId) {
      startMission(currentMission.nextMissionId);
    } else {
      setActiveTab('world-map');
    }
  };

  const resetAllProgress = () => {
    playClickSound(soundEnabled);
    localStorage.removeItem(STORAGE_KEY_COMPLETED);
    localStorage.removeItem(STORAGE_KEY_ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEY_XP);
    localStorage.removeItem(STORAGE_KEY_COINS);
    localStorage.removeItem(STORAGE_KEY_INVENTORY);
    setCompletedMissions([]);
    setUnlockedAchievements([]);
    setXp(100);
    setCoins(50);
    setInventory(['init-crystal', 'debug-duck']);
    startMission(MISSIONS[0].id);
  };

  const updateRepoState = (newState: RepositoryState) => {
    setRepoState(newState);
  };

  const resolveConflict = (
    resolution: 'current' | 'incoming' | 'both' | 'custom',
    customText?: string
  ) => {
    if (!repoState.conflictState) return;

    let finalContent = '';
    const { currentContent, incomingContent } = repoState.conflictState;

    if (resolution === 'current') {
      finalContent = currentContent;
    } else if (resolution === 'incoming') {
      finalContent = incomingContent;
    } else if (resolution === 'both') {
      finalContent = `${currentContent}\n${incomingContent}`;
    } else if (resolution === 'custom') {
      finalContent = customText || currentContent;
    }

    const filePath = repoState.conflictState.filePath;
    const nextState: RepositoryState = JSON.parse(JSON.stringify(repoState));

    if (nextState.workingDirectory[filePath]) {
      nextState.workingDirectory[filePath].content = finalContent;
      nextState.workingDirectory[filePath].status = 'modified';
    }

    // Auto stage resolved file
    nextState.stagingArea[filePath] = {
      path: filePath,
      content: finalContent,
      status: 'modified',
    };

    if (nextState.conflictState) {
      nextState.conflictState.resolvedContent = finalContent;
      nextState.conflictState.isResolved = true;
    }

    setRepoState(nextState);
    unlockAchievement('conflict-solver');
    unlockInventoryItem('merge-shield');
    addXP(150);
    setCoins((c) => c + 30);
    playCoinSound(soundEnabled);

    // If in mission 10, check completion
    if (currentMission.id === 'm-10-merge-conflict') {
      triggerMissionComplete();
    }
  };

  const triggerMissionComplete = () => {
    if (!completedMissions.includes(currentMission.id)) {
      setCompletedMissions((prev) => [...prev, currentMission.id]);
    }

    // Award XP and coins
    addXP(200);
    setCoins((c) => c + 40);

    // Award achievements & inventory items based on mission
    if (currentMission.id === 'm-01-meet-git' || currentMission.id === 'm-05-first-commit') {
      unlockAchievement('first-commit');
      unlockInventoryItem('diff-monocle');
    }
    if (currentMission.id === 'm-04-stage-right-files') {
      unlockAchievement('clean-stager');
    }
    if (currentMission.id === 'm-06-inspect-history') {
      unlockAchievement('commit-detective');
    }
    if (currentMission.id === 'm-07-create-branch' || currentMission.id === 'm-08-switch-and-work') {
      unlockAchievement('branch-creator');
      unlockInventoryItem('branch-compass');
    }
    if (currentMission.id === 'm-10-merge-conflict') {
      unlockAchievement('conflict-solver');
      unlockInventoryItem('merge-shield');
    }
    if (currentMission.id === 'm-11-remote-push') {
      unlockAchievement('github-collaborator');
      unlockInventoryItem('remote-beacon');
    }
    if (currentMission.id === 'm-14-pr-review') {
      unlockAchievement('pr-reviewer');
      unlockInventoryItem('lgtm-stamp');
    }
    if (currentMission.id === 'm-15-cicd-actions') {
      unlockAchievement('cicd-engineer');
      unlockInventoryItem('pipeline-core');
    }

    setIsMissionCompleteModalOpen(true);
    playSuccessSound(soundEnabled);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2EA043', '#2F81F7', '#F05133', '#A371F7', '#FBBF24'],
      });
    } catch {
      // ignore
    }
  };

  const executeCommand = (commandString: string): CommandResult => {
    const { newState, result } = executeGitCommand(repoState, commandString);

    if (result.output === '__CLEAR__') {
      setCommandHistory([]);
      return result;
    }

    setRepoState(newState);
    setCommandHistory((prev) => [...prev, result]);

    if (result.isError) {
      playErrorSound(soundEnabled);
    }

    if (result.explanation) {
      setLastExplanation(result.explanation);
    }

    // Check step progress in current mission
    const currentStep = currentMission.steps[currentStepIndex];
    if (currentStep) {
      let stepDone = false;

      if (currentStep.checkCompletion) {
        stepDone = currentStep.checkCompletion(newState, commandString);
      } else if (currentStep.expectedCommand) {
        if (typeof currentStep.expectedCommand === 'string') {
          stepDone = commandString.trim().toLowerCase() === currentStep.expectedCommand.toLowerCase();
        } else if (currentStep.expectedCommand instanceof RegExp) {
          stepDone = currentStep.expectedCommand.test(commandString.trim());
        } else if (typeof currentStep.expectedCommand === 'function') {
          stepDone = currentStep.expectedCommand(commandString.trim(), newState);
        }
      }

      if (stepDone) {
        // Award step XP and chime!
        addXP(50);
        setCoins((c) => c + 10);
        playCoinSound(soundEnabled);

        const nextIdx = currentStepIndex + 1;
        if (nextIdx < currentMission.steps.length) {
          setCurrentStepIndex(nextIdx);
        } else {
          // Mission finished!
          triggerMissionComplete();
        }
      }
    }

    return result;
  };

  return (
    <GameContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentMissionId,
        currentMission,
        currentStepIndex,
        repoState,
        completedMissions,
        unlockedLevels,
        unlockedAchievements,
        commandHistory,
        lastExplanation,
        isMissionCompleteModalOpen,
        hintsRevealed,

        xp,
        level,
        coins,
        streakDays,
        soundEnabled,
        inventory,
        playerTitle,
        addXP,
        toggleSound,
        unlockInventoryItem,

        startMission,
        executeCommand,
        revealNextHint,
        resetCurrentMission,
        closeMissionCompleteModal,
        goToNextMission,
        resetAllProgress,
        updateRepoState,
        resolveConflict,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
