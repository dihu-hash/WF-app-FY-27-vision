import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
import PhoneMockup from './components/Layout/PhoneMockup';
import BottomNav from './components/Layout/BottomNav';
import { ScrollProvider } from './contexts/ScrollContext';
import { AppStateProvider, useAppState } from './contexts/AppStateContext';
import IOSHomeScreen from './components/HomeScreen/iOSHomeScreen';
import OnboardingContainer from './components/Onboarding/OnboardingContainer';
import Dashboard from './pages/Dashboard';
import Time from './pages/Time';
import Payroll from './pages/Payroll';
import Schedule from './pages/Schedule';
import More from './pages/More';
import Benefits from './pages/Benefits';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import PlaceholderPage from './pages/PlaceholderPage';

const AppContent = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className="relative h-full">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/time" element={<Time />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/more" element={<More />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/performance" element={<PlaceholderPage title="Performance" />} />
        <Route path="/team" element={<PlaceholderPage title="Team" />} />
        <Route path="/workflows" element={<PlaceholderPage title="Workflows" />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<div />} /> {/* Dummy element - actual content rendered as overlay below */}
        <Route path="/help" element={<PlaceholderPage title="Help & Support" />} />
        <Route path="/logout" element={<PlaceholderPage title="Logout" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Bottom gradient overlay to indicate scrollable content */}
      {!isProfilePage && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-30"
          style={{
            background: 'linear-gradient(to top, rgba(226, 233, 237, 1) 0%, rgba(226, 233, 237, 0.8) 40%, rgba(226, 233, 237, 0) 100%)'
          }}
        />
      )}
      
      {!isProfilePage && <BottomNav />}
      
      {/* Profile as Full-Screen Overlay */}
      {isProfilePage && (
        <div className="absolute inset-0 z-50 bg-[#E2E9ED]">
          <Profile />
        </div>
      )}
    </div>
  );
};

const AppRouter = () => {
  const { appView, resetOnboarding } = useAppState();

  const renderContent = () => {
    // Render based on app state
    if (appView === 'homescreen') {
      return (
        <PhoneMockup>
          <IOSHomeScreen />
        </PhoneMockup>
      );
    }

    if (appView === 'onboarding') {
      return (
        <PhoneMockup>
          <OnboardingContainer />
        </PhoneMockup>
      );
    }

    // Main app (already onboarded)
    return (
      <ScrollProvider>
        <PhoneMockup>
          <AppContent />
        </PhoneMockup>
      </ScrollProvider>
    );
  };

  return (
    <div className="relative">
      {renderContent()}
      
      {/* Reset Button - Outside Phone Frame */}
      <button
        onClick={resetOnboarding}
        className="fixed bottom-8 right-8 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-full shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all hover:scale-105 active:scale-95 z-50 flex items-center gap-2"
      >
        <Undo2 className="w-5 h-5" />
        <span>Restart</span>
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppStateProvider>
        <AppRouter />
      </AppStateProvider>
    </Router>
  );
}

export default App;
