import React from 'react';
import { ChevronRight } from 'lucide-react';
import { paychecks } from '../../data/mockData';

const RecentPaychecks = () => {
  const recentPaychecks = paychecks.slice(0, 2);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="text-[14px] font-semibold mb-4" style={{ color: '#4C555B' }}>Recents</h3>
      
      <div className="space-y-3">
        {recentPaychecks.map((paycheck) => (
          <button
            key={paycheck.id}
            className="w-full flex items-center justify-between rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
                <img 
                  src="/paycheck-icon.png" 
                  alt="Paycheck" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-gray-900 font-medium text-[14px]">{paycheck.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-semibold">${paycheck.amount.toFixed(2)}</span>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </button>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <button className="w-full text-center font-medium" style={{ color: '#006A56' }}>
          View paycheck history
        </button>
      </div>
    </div>
  );
};

export default RecentPaychecks;
