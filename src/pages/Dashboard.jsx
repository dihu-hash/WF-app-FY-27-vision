import React from 'react';
import Header from '../components/Layout/Header';
import AIInsightsWidget from '../components/Dashboard/AIInsightsWidget';
import TasksWidget from '../components/Dashboard/TasksWidget';
import PaycheckWidget from '../components/Dashboard/PaycheckWidget';
import ScheduleWidget from '../components/Dashboard/ScheduleWidget';
import TimeOffWidget from '../components/Dashboard/TimeOffWidget';
import WidgetCard from '../components/Dashboard/WidgetCard';
import UpsellCard from '../components/Payroll/UpsellCard';
import { Clock, Calendar } from 'lucide-react';
import { weeklyHours } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useScroll } from '../contexts/ScrollContext';
import { useNotificationShift } from '../contexts/NotificationShiftContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { handleScroll } = useScroll();
  const { unreadCount, scheduleList } = useNotificationShift();

  const headerActions = (
    <>
      <button
        onClick={() => navigate('/notifications')}
        className="relative w-[30px] h-[30px] text-white rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        aria-label="Notifications"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>
      <button 
        className="w-[30px] h-[30px] text-white rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <img 
          src="/intuit-ai-icon.png" 
          alt="AI Assistant" 
          className="w-4 h-4"
        />
      </button>
    </>
  );

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Fixed Header */}
      <div className="flex-shrink-0 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
        <Header title="Acme Co." theme="dark" actions={headerActions} />
        
        {/* Search and Shortcuts */}
        <div className="pb-6">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pl-4 pr-4">
            <button 
              className="w-[30px] h-[30px] flex-shrink-0 text-white rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <button 
              className="px-4 h-[30px] text-white text-sm font-medium rounded-full whitespace-nowrap transition-colors flex items-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Get on-demand pay
            </button>
            <button 
              className="px-4 h-[30px] text-white text-sm font-medium rounded-full whitespace-nowrap transition-colors flex items-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Request time off
            </button>
            <button 
              className="px-4 h-[30px] text-white text-sm font-medium rounded-full whitespace-nowrap transition-colors flex items-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Submit expenses
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Widgets Grid */}
      <div 
        className="flex-1 overflow-y-auto pb-[160px]"
        onScroll={(e) => handleScroll(e.target.scrollTop)}
      >
        <div className="px-4 py-6 space-y-4">
          {/* AI Insights Widget */}
          <AIInsightsWidget />

          {/* Upsell Card - On-Demand Pay */}
          <UpsellCard />

          {/* Tasks Widget */}
          <TasksWidget />
          
          {/* Paycheck Widget */}
          <PaycheckWidget />

          {/* Today's Schedule */}
          <ScheduleWidget scheduleList={scheduleList} />

          {/* Time off */}
          <TimeOffWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
