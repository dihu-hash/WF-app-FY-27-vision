import React, { useState } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

const AccountCreationScreen = () => {
  const { setOnboardingStep, saveUserData, userData } = useAppState();
  const [email] = useState('sarah.johnson@email.com'); // Pre-populated email
  const [password, setPassword] = useState('');

  const handleBack = () => {
    setOnboardingStep('invite');
  };

  // Password strength validation
  const passwordValidation = {
    length: password.length >= 8,
  };

  const isFormValid = passwordValidation.length;

  const handleCreateAccount = () => {
    if (isFormValid) {
      // Extract name from email (everything before @)
      const userName = email.split('@')[0].replace('.', ' ').split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');

      saveUserData({ 
        email, 
        userName,
        password 
      });
      setOnboardingStep('ai-chat');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with Back Button */}
      <div className="px-6 py-4 flex items-center">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-16">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-[#006A56] flex items-center justify-center shadow-lg">
            <span className="text-white text-4xl font-bold">W</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Create Your Account
        </h1>
        
        {/* Subtitle */}
        <p className="text-gray-600 mb-8 text-center">
          Just a few more details
        </p>

        {/* Email Input (Pre-filled, Read-only) */}
        <div className="w-full mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Password Input */}
        <div className="w-full mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#006A56] focus:ring-2 focus:ring-[#006A56]/20 transition-all"
          />
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="w-full mb-6 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              {passwordValidation.length ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className={passwordValidation.length ? 'text-green-700' : 'text-gray-600'}>
                At least 8 characters
              </span>
            </div>
          </div>
        )}

        {/* Create Account Button */}
        <button
          onClick={handleCreateAccount}
          disabled={!isFormValid}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            isFormValid
              ? 'bg-[#006A56] text-white hover:bg-[#00856D] active:bg-[#005544]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default AccountCreationScreen;
