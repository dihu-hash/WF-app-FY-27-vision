import React from 'react';
import { Search } from 'lucide-react';
import Header from '../components/Layout/Header';
import RecentPaychecks from '../components/Payroll/RecentPaychecks';
import PaymentMethodCard from '../components/Payroll/PaymentMethodCard';
import UpsellCard from '../components/Payroll/UpsellCard';
import PaycheckChart from '../components/Payroll/PaycheckChart';
import { useScroll } from '../contexts/ScrollContext';

const Payroll = () => {
  const { handleScroll } = useScroll();
  const headerActions = (
    <>
      <button 
        className="w-[30px] h-[30px] text-white rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <Search size={16} />
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
        <Header title="Payroll" theme="dark" actions={headerActions} />
        
        {/* Action Buttons */}
        <div className="pb-6">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pl-4 pr-4">
            <button 
              className="px-4 h-[30px] text-white text-sm font-medium rounded-full whitespace-nowrap transition-colors flex items-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Download paystubs
            </button>
            <button 
              className="px-4 h-[30px] text-white text-sm font-medium rounded-full whitespace-nowrap transition-colors flex items-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Manage taxes
            </button>
            <button 
              className="px-4 h-[30px] text-white text-sm font-medium rounded-full whitespace-nowrap transition-colors flex items-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              View wallet
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-y-auto pb-[160px]"
        onScroll={(e) => handleScroll(e.target.scrollTop)}
      >
        <div className="px-4 py-6 space-y-4">
          <RecentPaychecks />
          <UpsellCard />
          <PaycheckChart />
          <PaymentMethodCard />
        </div>
      </div>
    </div>
  );
};

export default Payroll;
