import React, { createContext, useContext, useState, useEffect } from 'react';

const AppStateContext = createContext();

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};

export const AppStateProvider = ({ children }) => {
  // App view states: 'homescreen', 'onboarding', 'main-app'
  const [appView, setAppView] = useState('homescreen');
  
  // Onboarding sub-states: 'login', 'invite', 'account', 'ai-chat'
  const [onboardingStep, setOnboardingStep] = useState('login');
  
  // User data collected during onboarding
  const [userData, setUserData] = useState({
    email: '',
    userName: '',
    password: '',
    inviteCode: '',
    phoneNumber: '',
    bankName: '',
    filingStatus: '',
  });

  // Check localStorage on mount
  useEffect(() => {
    // Check for reset URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
      localStorage.removeItem('onboardingComplete');
      localStorage.removeItem('userData');
      // Remove the parameter from URL without page reload
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }
    
    const isOnboarded = localStorage.getItem('onboardingComplete') === 'true';
    const savedUserData = localStorage.getItem('userData');
    
    if (isOnboarded && savedUserData) {
      setAppView('main-app');
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  // Save user data to localStorage
  const saveUserData = (data) => {
    const updatedData = { ...userData, ...data };
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
  };

  // Complete onboarding and transition to main app
  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setAppView('main-app');
  };

  // Reset onboarding (for testing)
  const resetOnboarding = () => {
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('userData');
    setAppView('homescreen');
    setOnboardingStep('login');
    setUserData({
      email: '',
      userName: '',
      password: '',
      inviteCode: '',
      phoneNumber: '',
      bankName: '',
      filingStatus: '',
    });
  };

  // Launch app from home screen
  const launchApp = () => {
    setAppView('onboarding');
    setOnboardingStep('login');
  };

  const value = {
    appView,
    setAppView,
    onboardingStep,
    setOnboardingStep,
    userData,
    saveUserData,
    completeOnboarding,
    resetOnboarding,
    launchApp,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
