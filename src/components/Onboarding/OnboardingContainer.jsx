import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import LoginScreen from './LoginScreen';
import InviteCodeScreen from './InviteCodeScreen';
import AccountCreationScreen from './AccountCreationScreen';
import AIChatOnboarding from './AIChat/AIChatOnboarding';

const OnboardingContainer = () => {
  const { onboardingStep } = useAppState();

  const renderStep = () => {
    switch (onboardingStep) {
      case 'login':
        return <LoginScreen />;
      case 'invite':
        return <InviteCodeScreen />;
      case 'account':
        return <AccountCreationScreen />;
      case 'ai-chat':
        return <AIChatOnboarding />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <div className="h-full w-full bg-white overflow-hidden animate-appLaunch">
      {renderStep()}
    </div>
  );
};

export default OnboardingContainer;
