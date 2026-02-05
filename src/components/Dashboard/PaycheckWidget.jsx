import React from 'react';
import { Wallet } from 'lucide-react';
import WidgetCard from './WidgetCard';
import { paychecks } from '../../data/mockData';

const PaycheckWidget = () => {
  const latestPaycheck = paychecks[0];

  return (
    <WidgetCard title="Latest paycheck">
      <div className="flex items-center gap-3">
        <img src="/wallet-icon.png" alt="Wallet" className="w-6 h-6" />
        <div>
          <p className="text-base font-semibold text-gray-900">${latestPaycheck.amount.toFixed(2)}</p>
          <p className="text-gray-500 text-sm">{latestPaycheck.date}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-4 pt-4">
        <button className="w-full text-center font-medium text-sm" style={{ color: '#006A56' }}>
          View payroll
        </button>
      </div>
    </WidgetCard>
  );
};

export default PaycheckWidget;
