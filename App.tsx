import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { OnboardingProcess } from './components/OnboardingProcess';
import { ToolsDashboard } from './components/ToolsDashboard';
import { TeamPage } from './components/TeamPage';

export type Page = 'onboarding' | 'software' | 'team';

const App: React.FC = () => {
  const [onboardingComplete, setOnboardingComplete] = useLocalStorage<boolean>('onboardingComplete', false);
  const [currentPage, setCurrentPage] = useState<Page>(onboardingComplete ? 'software' : 'onboarding');
  const [editMode, setEditMode] = useState<{ active: boolean, step: number | null }>({ active: false, step: null });

  useEffect(() => {
    if (onboardingComplete && currentPage === 'onboarding' && !editMode.active) {
      setCurrentPage('software');
    }
  }, [onboardingComplete, currentPage, editMode.active]);
  
  const handleEditRequest = (stepIndex: number) => {
    setEditMode({ active: true, step: stepIndex });
    setCurrentPage('onboarding');
  };

  const handleFinishEditing = () => {
    setEditMode({ active: false, step: null });
    setCurrentPage('software');
  };

  const handleOnboardingFinish = (isCompleted: boolean) => {
    if (isCompleted) {
      setOnboardingComplete(true);
    }
    setCurrentPage('software');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'onboarding':
        if (editMode.active) {
          return <OnboardingProcess onOnboardingFinish={() => handleFinishEditing()} editModeStep={editMode.step} />;
        }
        return <OnboardingProcess onOnboardingFinish={() => handleOnboardingFinish(true)} />;
      case 'software':
        return (
           <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
              <ToolsDashboard onEditRequest={handleEditRequest} />
           </div>
        );
      case 'team':
        return <TeamPage />;
      default:
        return onboardingComplete
          ? (
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
                <ToolsDashboard onEditRequest={handleEditRequest} />
            </div>
          )
          : <OnboardingProcess onOnboardingFinish={() => handleOnboardingFinish(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-slate-800 font-sans">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onboardingComplete={onboardingComplete}
        isEditing={editMode.active}
      />
      
      <main>
        {renderPage()}
      </main>

      <footer className="text-center py-8 text-sm text-slate-500 bg-gray-100">
        <p>&copy; {new Date().getFullYear()} OnboardEasy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;