import React from 'react';
import Header from '../components/Layout/Header';
import AIInsightsWidget from '../components/Dashboard/AIInsightsWidget';
import TasksWidget from '../components/Dashboard/TasksWidget';
import PaycheckWidget from '../components/Dashboard/PaycheckWidget';
import ScheduleWidget from '../components/Dashboard/ScheduleWidget';
import WidgetCard from '../components/Dashboard/WidgetCard';
import UpsellCard from '../components/Payroll/UpsellCard';
import { Clock, Calendar, TrendingUp } from 'lucide-react';
import { weeklyHours } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useScroll } from '../contexts/ScrollContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { handleScroll } = useScroll();

  const headerActions = (
    <>
      <button 
        className="w-[30px] h-[30px] text-white rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
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
        <Header title="Home" theme="dark" actions={headerActions} />
        
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
              Submit reimbursement
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
          <ScheduleWidget />

          {/* Upsell Card */}
          <WidgetCard className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006A56' }}>
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Boost your performance</h4>
                <p className="text-sm text-gray-600">Complete your pending tasks to improve your productivity score.</p>
              </div>
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
