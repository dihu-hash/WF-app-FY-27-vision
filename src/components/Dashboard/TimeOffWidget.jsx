import React from 'react';
import WidgetCard from './WidgetCard';
import { timeOff } from '../../data/mockData';

const TimeOffWidget = () => {
  const { balance } = timeOff;

  return (
    <WidgetCard title="Time off">
      <div className="flex items-center gap-3">
        <img src="/time-off-icon.png" alt="" className="w-6 h-6 flex-shrink-0" />
        <div>
          <p className="text-base font-semibold text-gray-900">{balance.hours} hrs</p>
          <p className="text-gray-500 text-sm">{balance.label}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-4 pt-4">
        <button className="w-full text-center font-medium text-sm" style={{ color: '#006A56' }}>
          Request time off
        </button>
      </div>
    </WidgetCard>
  );
};

export default TimeOffWidget;
