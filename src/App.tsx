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

const AppContent: React.FC = () => {
  const { activeTab } = useGame();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
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
