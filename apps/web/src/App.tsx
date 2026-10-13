import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanionMatchFeed } from './components/CompanionMatchFeed';
import { TravelDnaQuiz } from './components/TravelDnaQuiz';
import { DestinationExplorer } from './components/DestinationExplorer';
import { TripPlansView } from './components/TripPlansView';
import { PhotoSimilarityWidget } from './components/PhotoSimilarityWidget';
import { AuthModal } from './components/AuthModal';
import { SafetyReportModal } from './components/SafetyReportModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setActiveTab('explore');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0E1326] text-slate-100">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={handleOpenAuth}
        onOpenReport={() => setReportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* User state banner if logged in */}
        {userEmail && (
          <div className="bg-gradient-to-r from-[#FF5E36]/20 via-[#E0287D]/20 to-[#6C2EB9]/20 border-b border-[#FF5E36]/30 py-2 px-4 text-center text-xs text-white">
            Logged in as <strong className="text-[#FF5E36]">{userEmail}</strong> • Travel DNA active & verified
          </div>
        )}

        {/* Explore / Home Tab */}
        {activeTab === 'explore' && (
          <>
            <Hero
              onSearch={handleSearch}
              onExploreMatches={() => setActiveTab('matches')}
              onStartDna={() => setActiveTab('dna')}
            />
            <DestinationExplorer
              onSelectDestinationForTrips={() => setActiveTab('trips')}
            />
            <div className="my-12" />
            <CompanionMatchFeed />
          </>
        )}

        {/* Companion Matches Tab */}
        {activeTab === 'matches' && (
          <div className="pt-6">
            <CompanionMatchFeed />
          </div>
        )}

        {/* Travel Plans & Trip Rooms Tab */}
        {activeTab === 'trips' && (
          <div className="pt-6">
            <TripPlansView />
          </div>
        )}

        {/* Travel DNA Tab */}
        {activeTab === 'dna' && (
          <div className="pt-6">
            <TravelDnaQuiz />
          </div>
        )}

        {/* Photo Similarity Inspector Tab */}
        {activeTab === 'similarity' && (
          <div className="pt-6">
            <PhotoSimilarityWidget />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Safety Report Modal */}
      <SafetyReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </div>
  );
};

export default App;
