import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { CodexNavbar } from './components/Navigation/CodexNavbar';
import { Sidebar } from './components/Navigation/Sidebar';
import { MissionModal } from './components/Mission/MissionModal';
import { Home } from './pages/Home';
import { LearningMap } from './pages/LearningMap';
import { MissionView } from './pages/MissionView';
import { PracticeLab } from './pages/PracticeLab';
import { BranchLab } from './pages/BranchLab';
import { ConflictLab } from './pages/ConflictLab';
import { GitHubLab } from './pages/GitHubLab';
import { ProgressPage } from './pages/ProgressPage';
import { OverworldMap } from './components/WorldMap/OverworldMap';
import { CourseView } from './pages/CourseView';
import { TermsModal } from './components/Legal/TermsModal';
import { PresentationViewer } from './components/Presentation/PresentationViewer';
import { LessonIntroCutscene } from './components/Cutscene/LessonIntroCutscene';
import { TOPICS_CURRICULUM } from './data/curriculum';

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    startMission,
    activeTopicId,
    isPresentationOpen,
    isCutsceneOpen,
    isTermsOpen,
    openTopicPresentation,
    closeTopicPresentation,
    openTopicCutscene,
    closeTopicCutscene,
    closeTermsModal,
  } = useGame();

  const activeTopic =
    TOPICS_CURRICULUM.find((t) => t.id === activeTopicId) ||
    TOPICS_CURRICULUM[0];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'curriculum':
        return (
          <CourseView
            onOpenCutscene={(t) => openTopicCutscene(t.id)}
            onOpenPresentation={(t) => openTopicPresentation(t.id)}
          />
        );
      case 'world-map':
        return <OverworldMap />;
      case 'learning-map':
        return <LearningMap />;
      case 'missions':
        return <MissionView />;
      case 'practice-lab':
        return <PracticeLab />;
      case 'branch-lab':
        return <BranchLab />;
      case 'conflict-lab':
        return <ConflictLab />;
      case 'github-lab':
        return <GitHubLab />;
      case 'progress':
        return <ProgressPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-dev-bg text-dev-text selection:bg-dev-highlight selection:text-white">
      {/* Codédex Retro RPG Navigation Bar */}
      <CodexNavbar />

      {/* Main Workspace Layout with Desktop Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 min-h-[calc(100vh-50px)]">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Mission Completion Modal */}
      <MissionModal />

      {/* Topic Presentation (PPT) Viewer */}
      <PresentationViewer
        topic={activeTopic}
        isOpen={isPresentationOpen}
        onClose={closeTopicPresentation}
        onLaunchMission={(mId) => {
          startMission(mId);
          setActiveTab('missions');
        }}
      />

      {/* Cinematic Lesson Intro Cutscene (Matching Screenshot) */}
      <LessonIntroCutscene
        topic={activeTopic}
        isOpen={isCutsceneOpen}
        onClose={closeTopicCutscene}
        onOpenPresentation={() => openTopicPresentation(activeTopic.id)}
        onStartMission={(mId) => {
          startMission(mId);
          setActiveTab('missions');
        }}
      />

      {/* Terms and Conditions Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={closeTermsModal} />
    </div>
  );
};

export function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
