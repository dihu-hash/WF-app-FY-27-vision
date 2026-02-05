import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { useScroll } from '../contexts/ScrollContext';
import { useAppState } from '../contexts/AppStateContext';

const Settings = () => {
  const navigate = useNavigate();
  const { handleScroll } = useScroll();
  const { resetOnboarding } = useAppState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleResetOnboarding = () => {
    resetOnboarding();
    setShowConfirmModal(false);
    // User will be redirected to home screen automatically by AppStateContext
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Fixed Header */}
      <div className="flex-shrink-0 text-white px-4 pt-14 pb-6 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-y-auto pb-[160px]"
        onScroll={(e) => handleScroll(e.target.scrollTop)}
      >
        <div className="px-4 py-6 space-y-4">
          {/* Account Section */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Profile Information</div>
                <div className="text-sm text-gray-500">Update your personal details</div>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Change Password</div>
                <div className="text-sm text-gray-500">Update your password</div>
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Push Notifications</div>
                <div className="text-sm text-gray-500">Manage notification preferences</div>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-500">Configure email alerts</div>
              </button>
            </div>
          </div>

          {/* Developer/Testing Section */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Developer Options</h2>
            <div className="space-y-3">
              <button 
                onClick={() => setShowConfirmModal(true)}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 transition-colors border border-red-200"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-red-600" />
                  <div className="flex-1">
                    <div className="font-medium text-red-600">Reset Onboarding</div>
                    <div className="text-sm text-red-500">Clear all data and restart from home screen</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
            <div className="space-y-3">
              <div className="px-4 py-3">
                <div className="text-sm text-gray-500">Version</div>
                <div className="font-medium text-gray-900">1.0.0</div>
              </div>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Terms of Service</div>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Privacy Policy</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scaleIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Reset Onboarding?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              This will clear all your data and return you to the home screen. You'll need to complete onboarding again.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetOnboarding}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
