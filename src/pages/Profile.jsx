import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Phone, MapPin, Calendar, Briefcase, DollarSign, Clock, Wallet, Lock, RefreshCw, Bell, ChevronRight, LogOut } from 'lucide-react';
import { useScroll } from '../contexts/ScrollContext';
import { employee, notifications } from '../data/mockData';
import { useAppState } from '../contexts/AppStateContext';

const Profile = () => {
  const navigate = useNavigate();
  const { handleScroll } = useScroll();
  const { userData } = useAppState();

  // Use onboarded user data if available, otherwise use mock data
  const displayName = userData.userName || employee.name;
  const displayEmail = userData.email || employee.email;
  const displayPhone = userData.phoneNumber || employee.phone;

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const latestNotification = notifications[0];

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
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <img 
              src={employee.avatar} 
              alt={displayName}
              className="w-16 h-16 rounded-full flex-shrink-0 shadow-md"
            />
            <div className="min-w-0 text-left">
              <h2 className="text-lg font-bold text-gray-900 mb-0.5">{displayName}</h2>
              <p className="text-sm font-medium text-gray-900">{employee.company}</p>
              <p className="text-xs text-gray-500 mt-1">{employee.role} · {employee.department}</p>
            </div>
          </div>

          {/* Wallet & Notification summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#006A56]/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-[#006A56]" />
                </div>
              </div>
              <p className="text-base font-semibold text-gray-900">$1,847</p>
              <p className="text-sm text-gray-500">Wallet Balance</p>
              <button
                type="button"
                onClick={() => navigate('/wallet')}
                className="mt-2 text-sm font-medium text-left w-full"
                style={{ color: '#006A56' }}
              >
                View
              </button>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#006A56]/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#006A56]" />
                </div>
              </div>
              <p className="text-base font-semibold text-gray-900">
                {unreadNotifications} unread
              </p>
              <p className="text-sm text-gray-500 truncate" title={latestNotification?.title}>
                {latestNotification ? `${latestNotification.title} · ${latestNotification.time}` : 'No notifications'}
              </p>
              <button
                type="button"
                onClick={() => navigate('/notifications')}
                className="mt-2 text-sm font-medium text-left w-full"
                style={{ color: '#006A56' }}
              >
                View
              </button>
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
                <Lock size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Change password</span>
              </button>
              <div className="border-t border-gray-100" />
              <button className="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-xl transition-colors">
                <RefreshCw size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Switch company</span>
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
