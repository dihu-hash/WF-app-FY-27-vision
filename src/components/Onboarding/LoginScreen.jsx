import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppStateContext';

const LoginScreen = () => {
  const { setOnboardingStep } = useAppState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNewUser = () => {
    setOnboardingStep('invite');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 bg-white">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-24 h-24 rounded-full bg-[#006A56] flex items-center justify-center shadow-lg">
          <span className="text-white text-5xl font-bold">W</span>
        </div>
      </div>

      {/* Welcome Text */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
      <p className="text-gray-600 mb-8">Sign in to continue</p>

      {/* Email Input */}
      <div className="w-full mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#006A56] focus:ring-2 focus:ring-[#006A56]/20 transition-all"
        />
      </div>

      {/* Password Input */}
      <div className="w-full mb-6">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#006A56] focus:ring-2 focus:ring-[#006A56]/20 transition-all"
        />
      </div>

      {/* Sign In Button */}
      <button className="w-full bg-[#006A56] text-white py-3 rounded-xl font-semibold hover:bg-[#00856D] active:bg-[#005544] transition-colors mb-4">
        Sign In
      </button>

      {/* Forgot Password */}
      <button className="text-[#006A56] text-sm mb-12">
        Forgot Password?
      </button>

      {/* Divider */}
      <div className="w-full flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* New User Button */}
      <button
        onClick={handleNewUser}
        className="text-[#006A56] font-semibold text-lg"
      >
        New User? Get Started →
      </button>
    </div>
  );
};

export default LoginScreen;
