import React, { Component, useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Undo2, Plus } from 'lucide-react';
import PhoneMockup from './components/Layout/PhoneMockup';
import BottomNav from './components/Layout/BottomNav';
import { ScrollProvider, useScroll } from './contexts/ScrollContext';
import { AppStateProvider, useAppState } from './contexts/AppStateContext';
import { NotificationShiftProvider, useNotificationShift } from './contexts/NotificationShiftContext';
import { TimerProvider } from './contexts/TimerContext';
import ClockedInStrap from './components/Layout/ClockedInStrap';
import IOSHomeScreen from './components/HomeScreen/iOSHomeScreen';
import OnboardingContainer from './components/Onboarding/OnboardingContainer';
import Dashboard from './pages/Dashboard';
import Time from './pages/Time';
import Payroll from './pages/Payroll';
import Schedule from './pages/Schedule';
import More from './pages/More';
import Benefits from './pages/Benefits';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import PlaceholderPage from './pages/PlaceholderPage';
import IOSPushNotificationBanner from './components/Notifications/IOSPushNotificationBanner';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 p-6 flex flex-col items-center justify-center text-left">
          <h1 className="text-xl font-bold text-red-800 mb-2">Something went wrong</h1>
          <pre className="bg-white p-4 rounded-lg text-sm text-red-700 overflow-auto max-w-full">
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppContent = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const isNotificationsPage = location.pathname === '/notifications';
  const isWalletPage = location.pathname === '/wallet';
  const isMorePage = location.pathname === '/more';
  const showBottomNav = !isProfilePage && !isNotificationsPage && !isWalletPage && !isMorePage;
  const { navTranslateY } = useScroll();

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
        <Route path="/time-off" element={<PlaceholderPage title="Time off" />} />
        <Route path="/expenses" element={<PlaceholderPage title="Expenses" />} />
        <Route path="/documents" element={<PlaceholderPage title="Documents" />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<div />} /> {/* Dummy element - actual content rendered as overlay below */}
        <Route path="/help" element={<PlaceholderPage title="Help & Support" />} />
        <Route path="/logout" element={<PlaceholderPage title="Logout" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Bottom gradient overlay to indicate scrollable content */}
      {showBottomNav && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-30"
          style={{
            background: 'linear-gradient(to top, rgba(226, 233, 237, 1) 0%, rgba(226, 233, 237, 0.8) 40%, rgba(226, 233, 237, 0) 100%)'
          }}
        />
      )}
      
      {showBottomNav && (
        <div
          className="absolute bottom-0 left-0 right-0 z-40 flex flex-col-reverse gap-0"
          style={{
            transform: `translateY(${navTranslateY}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          <BottomNav />
          <ClockedInStrap />
        </div>
      )}
      
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
  const { appView, resetOnboarding, completeOnboarding } = useAppState();
  const { addNewShift, showPaychecksBanner } = useNotificationShift();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpen]);

  const renderContent = () => {
    // Render based on app state
    if (appView === 'homescreen') {
      return (
        <PhoneMockup>
          <div className="relative flex h-full min-h-0 flex-col">
            <IOSPushNotificationBanner />
            <IOSHomeScreen />
          </div>
        </PhoneMockup>
      );
    }

    if (appView === 'onboarding') {
      return (
        <PhoneMockup>
          <div className="relative flex h-full min-h-0 flex-col">
            <IOSPushNotificationBanner />
            <OnboardingContainer />
          </div>
        </PhoneMockup>
      );
    }

    // Main app (already onboarded)
    return (
      <ScrollProvider>
        <PhoneMockup>
          <div className="relative flex h-full min-h-0 flex-col">
            <IOSPushNotificationBanner />
            <TimerProvider>
              <AppContent />
            </TimerProvider>
          </div>
        </PhoneMockup>
      </ScrollProvider>
    );
  };

  return (
    <div className="relative">
      {renderContent()}
      
      {/* + menu: New shift / New paychecks */}
      <div ref={menuRef} className="fixed bottom-40 right-8 z-50 flex flex-col items-end">
        {menuOpen && (
          <div className="mb-2 w-48 rounded-xl bg-white shadow-lg border border-gray-200 py-1 overflow-hidden">
            <button
              type="button"
              onClick={() => { addNewShift(); setMenuOpen(false); }}
              className="w-full px-4 py-3 text-left text-[15px] font-medium text-gray-900 hover:bg-gray-50 active:bg-gray-100"
            >
              New shift
            </button>
            <button
              type="button"
              onClick={() => { showPaychecksBanner(); setMenuOpen(false); }}
              className="w-full px-4 py-3 text-left text-[15px] font-medium text-gray-900 hover:bg-gray-50 active:bg-gray-100"
            >
              New paychecks
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
          className="w-14 h-14 rounded-full bg-white hover:bg-gray-50 text-gray-700 shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
          aria-label="Add options"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      {/* Home - Skip to main app */}
      <button
        onClick={completeOnboarding}
        className="fixed bottom-24 right-8 w-14 h-14 rounded-full bg-white hover:bg-gray-50 text-gray-700 shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all hover:scale-105 active:scale-95 z-50 flex items-center justify-center"
        aria-label="Go to Home"
      >
        <img src="/home-icon.png" alt="Home" className="w-6 h-6 object-contain" />
      </button>
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
    <ErrorBoundary>
      <NotificationShiftProvider>
        <Router>
          <AppStateProvider>
            <AppRouter />
          </AppStateProvider>
        </Router>
      </NotificationShiftProvider>
    </ErrorBoundary>
  );
}

export default App;
