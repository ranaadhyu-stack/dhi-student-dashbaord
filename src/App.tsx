import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { VisualDashboard } from './components/VisualDashboard';
import { ResearchHub } from './components/ResearchHub';
import { ExamPrep } from './components/ExamPrep';
import { LearnYourWay } from './components/LearnYourWay';
import { LiveRoom } from './components/LiveRoom';
import { Calendar as CalendarComponent } from './components/Calendar';
import { Wellness } from './components/Wellness';
import { SharePoint } from './components/SharePoint';
import { CounselingRoom } from './components/CounselingRoom';
import { Wallet } from './components/Wallet';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { NotificationProvider } from './contexts/NotificationContext';
import { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogin = (email: string, pin: string) => {
    // For demo purposes, accept any email and 6-digit pin
    // In production, this would validate against a backend
    if (email && pin.length === 6) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login theme={theme} onLogin={handleLogin} />;
  }

  return (
    <NotificationProvider>
      <div className={`flex h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          closeSidebar();
        }} 
        theme={theme}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar theme={theme} toggleTheme={toggleTheme} onMenuClick={toggleSidebar} />
        
        <main className={`flex-1 overflow-y-auto ${activeTab === 'live' || activeTab === 'calendar' || activeTab === 'share' || activeTab === 'counseling' || activeTab === 'settings' ? 'p-0' : 'p-4 sm:p-6'}`}>
          {activeTab === 'dashboard' ? (
            <VisualDashboard theme={theme} />
          ) : activeTab === 'research' ? (
            <ResearchHub theme={theme} />
          ) : activeTab === 'exam' ? (
            <ExamPrep theme={theme} />
          ) : activeTab === 'learn' ? (
            <LearnYourWay theme={theme} />
          ) : activeTab === 'live' ? (
            <LiveRoom theme={theme} />
          ) : activeTab === 'calendar' ? (
            <CalendarComponent theme={theme} />
          ) : activeTab === 'wellness' ? (
            <Wellness theme={theme} />
          ) : activeTab === 'share' ? (
            <SharePoint theme={theme} />
          ) : activeTab === 'counseling' ? (
            <CounselingRoom theme={theme} variant="student" />
          ) : activeTab === 'wallet' ? (
            <Wallet theme={theme} />
          ) : activeTab === 'settings' ? (
            <Settings theme={theme} />
          ) : null}
        </main>
      </div>
    </div>
    </NotificationProvider>
  );
}