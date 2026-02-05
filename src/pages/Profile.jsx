import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Phone, MapPin, Calendar, Briefcase, DollarSign, Clock, Wallet, TrendingUp, User, Lock, Bell, ChevronRight, LogOut } from 'lucide-react';
import { useScroll } from '../contexts/ScrollContext';
import { employee } from '../data/mockData';
import { useAppState } from '../contexts/AppStateContext';

const Profile = () => {
  const navigate = useNavigate();
  const { handleScroll } = useScroll();
  const { userData } = useAppState();

  // Use onboarded user data if available, otherwise use mock data
  const displayName = userData.userName || employee.name;
  const displayEmail = userData.email || employee.email;
  const displayPhone = userData.phoneNumber || employee.phone;

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Fixed Header */}
      <div className="flex-shrink-0 text-white px-4 pt-14 pb-6 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button 
            onClick={() => navigate(-1)}
            className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <X size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-y-auto pb-[160px]"
        onScroll={(e) => handleScroll(e.target.scrollTop)}
      >
        <div className="px-4 py-6 space-y-4">
          
          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <img 
              src={employee.avatar} 
              alt={displayName}
              className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{displayName}</h2>
            <p className="text-sm text-gray-500">{employee.role}</p>
            <p className="text-sm text-gray-500">{employee.department}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#006A56]/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-[#006A56]" />
                </div>
              </div>
              <p className="text-base font-semibold text-gray-900">$1,847</p>
              <p className="text-sm text-gray-500">Wallet Balance</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#006A56]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#006A56]" />
                </div>
              </div>
              <p className="text-base font-semibold text-gray-900">32.5h</p>
              <p className="text-sm text-gray-500">This Week</p>
            </div>
          </div>

          {/* Contact & Employment - Compact */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Email</span>
                <span className="text-sm text-gray-900 font-medium">{displayEmail}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">Phone</span>
                <span className="text-sm text-gray-900 font-medium">{displayPhone}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">Hourly Rate</span>
                <span className="text-sm text-gray-900 font-medium">$22.50/hr</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">Start Date</span>
                <span className="text-sm text-gray-900 font-medium">Jan 15, 2024</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl py-4 shadow-sm">
            <div className="space-y-0">
              <button className="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-xl transition-colors">
                <User size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Edit profile</span>
              </button>
              <div className="border-t border-gray-100" />
              <button className="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-xl transition-colors">
                <Lock size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Change password</span>
              </button>
              <div className="border-t border-gray-100" />
              <button className="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-xl transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Notification settings</span>
              </button>
              <div className="border-t border-gray-100" />
              <button className="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-xl transition-colors">
                <LogOut size={20} className="text-red-600" />
                <span className="text-sm font-medium text-red-600">Log out</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
