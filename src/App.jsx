import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import CodeBackground from './components/CodeBackground';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AITutorDrawer from './components/AITutorDrawer';
import RandomAnchorModal from './components/RandomAnchorModal';

import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import LearnPage from './pages/LearnPage';
import CodingPlatformPage from './pages/CodingPlatformPage';
import ProfilePage from './pages/ProfilePage';

function MainAppContent() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  // Modal & Drawer states
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiTopicTitle, setAiTopicTitle] = useState('');
  const [aiCodeSnippet, setAiCodeSnippet] = useState('');
  const [randomAnchorOpen, setRandomAnchorOpen] = useState(false);

  const handleOpenAITutorForTopic = (title, snippet) => {
    setAiTopicTitle(title || '');
    setAiCodeSnippet(snippet || '');
    setAiDrawerOpen(true);
  };

  // If page is 'auth'
  if (activePage === 'auth') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <CodeBackground />
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          onOpenAITutor={() => setAiDrawerOpen(true)}
          onOpenRandomAnchor={() => setRandomAnchorOpen(true)}
        />
        <main style={{ flex: 1, zIndex: 1 }}>
          <AuthPage onAuthSuccess={() => setActivePage('dashboard')} />
        </main>

        <AITutorDrawer
          isOpen={aiDrawerOpen}
          onClose={() => setAiDrawerOpen(false)}
          topicTitle={aiTopicTitle}
          codeSnippet={aiCodeSnippet}
        />
        <RandomAnchorModal
          isOpen={randomAnchorOpen}
          onClose={() => setRandomAnchorOpen(false)}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Floating Code Study Background */}
      <CodeBackground />

      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenAITutor={() => setAiDrawerOpen(true)}
        onOpenRandomAnchor={() => setRandomAnchorOpen(true)}
      />

      {/* Sidebar + Main Content Layout */}
      <div style={{ display: 'flex', flex: 1, zIndex: 1 }}>
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          setSelectedLanguage={setSelectedLanguage}
          onOpenRandomAnchor={() => setRandomAnchorOpen(true)}
        />

        <main style={{
          flex: 1,
          padding: '0 32px 32px 32px',
          maxWidth: '1350px',
          width: '100%',
          margin: '0 auto'
        }}>
          {activePage === 'dashboard' && (
            <DashboardPage
              setActivePage={setActivePage}
              setSelectedLanguage={setSelectedLanguage}
              onOpenRandomAnchor={() => setRandomAnchorOpen(true)}
            />
          )}

          {activePage === 'learn' && (
            <LearnPage
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              onOpenAITutorForTopic={handleOpenAITutorForTopic}
            />
          )}

          {activePage === 'coding' && <CodingPlatformPage />}

          {activePage === 'profile' && <ProfilePage />}
        </main>
      </div>

      {/* Global Drawers & Modals */}
      <AITutorDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        topicTitle={aiTopicTitle}
        codeSnippet={aiCodeSnippet}
      />

      <RandomAnchorModal
        isOpen={randomAnchorOpen}
        onClose={() => setRandomAnchorOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
