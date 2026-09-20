import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Sidebar } from './components/Navigation/Sidebar';
import { MobileNav } from './components/Navigation/MobileNav';
import { MissionModal } from './components/Mission/MissionModal';
import { Home } from './pages/Home';
import { LearningMap } from './pages/LearningMap';
import { MissionView } from './pages/MissionView';
import { PracticeLab } from './pages/PracticeLab';
import { BranchLab } from './pages/BranchLab';
import { ConflictLab } from './pages/ConflictLab';
import { GitHubLab } from './pages/GitHubLab';
import { ProgressPage } from './pages/ProgressPage';

const AppContent: React.FC = () => {
  const { activeTab } = useGame();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
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
    <div className="flex flex-col md:flex-row min-h-screen bg-dev-bg text-dev-text selection:bg-dev-highlight selection:text-white">
      {/* Mobile Top Navigation */}
      <MobileNav />

      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 min-h-screen">
        {renderActiveView()}
      </main>

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
