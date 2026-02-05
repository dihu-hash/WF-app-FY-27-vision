import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

const InviteCodeScreen = () => {
  const { setOnboardingStep, saveUserData } = useAppState();
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs[0].current?.focus();
  }, []);

  const handleBack = () => {
    setOnboardingStep('login');
  };

  const handleContinue = () => {
    const code = digits.join('');
    if (code.length === 4) {
      saveUserData({ inviteCode: code });
      setOnboardingStep('account');
    }
  };

  const handleInputChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;
    
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-submit when all 4 digits are entered
    if (index === 3 && value) {
      const code = newDigits.join('');
      if (code.length === 4) {
        setTimeout(() => {
          saveUserData({ inviteCode: code });
          setOnboardingStep('account');
        }, 200);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pastedData) {
      const newDigits = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
      setDigits(newDigits);
      
      // Focus on next empty field or last field
      const nextIndex = Math.min(pastedData.length, 3);
      inputRefs[nextIndex].current?.focus();
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
          <div className="w-20 h-20 rounded-full bg-[#006A56]/10 flex items-center justify-center">
            <span className="text-5xl">📧</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Enter Your Invite Code
        </h1>
        
        {/* Subtitle */}
        <p className="text-gray-600 mb-8 text-center">
          Check your email for the invite code
        </p>

        {/* 4-Digit Code Input */}
        <div className="flex gap-4 mb-8">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              maxLength={1}
              className="w-16 h-16 text-center text-2xl font-bold rounded-xl border-2 border-gray-300 focus:outline-none focus:border-[#006A56] focus:ring-2 focus:ring-[#006A56]/20 transition-all"
            />
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={digits.join('').length !== 4}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            digits.join('').length === 4
              ? 'bg-[#006A56] text-white hover:bg-[#00856D] active:bg-[#005544]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default InviteCodeScreen;
