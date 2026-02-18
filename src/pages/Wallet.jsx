import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Banknote } from 'lucide-react';
import { useScroll } from '../contexts/ScrollContext';
import DepositCheckFlow from '../components/Wallet/DepositCheckFlow';

const ACTIVITIES = [
  { id: 1, title: 'Weekly Payroll', subtitle: 'Payroll, Feb 1, 2026', amount: '+$900.00', type: 'credit', icon: Banknote },
  { id: 2, title: 'Weekly Payroll', subtitle: 'Payroll, Jan 25, 2026', amount: '+$900.00', type: 'credit', icon: Banknote },
  { id: 3, title: 'Withdrawal to Bank', subtitle: 'Withdrawal, Jan 20, 2026', amount: '-$500.00', type: 'debit', icon: ArrowUpRight },
  { id: 4, title: 'Weekly Payroll', subtitle: 'Payroll, Jan 18, 2026', amount: '+$900.00', type: 'credit', icon: Banknote },
];

const Wallet = () => {
  const navigate = useNavigate();
  const { handleScroll } = useScroll();
  const [showDepositCheckFlow, setShowDepositCheckFlow] = useState(false);

  return (
    <div className="h-screen flex flex-col relative" style={{ backgroundColor: '#E2E9ED' }}>
      {showDepositCheckFlow && (
        <DepositCheckFlow onClose={() => setShowDepositCheckFlow(false)} />
      )}
      {/* Fixed Header */}
      <div className="flex-shrink-0 text-white px-4 pt-14 pb-6 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            aria-label="Back"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold">Wallet</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto pb-[160px]"
        onScroll={(e) => handleScroll(e.target.scrollTop)}
      >
        <div className="px-4 py-6 space-y-4">
          {/* 1. Available Balance */}
          <div className="bg-white rounded-2xl p-5 shadow-sm text-left">
            <p className="text-sm text-gray-500 mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">$1,847.50</p>
            <p className="text-sm text-gray-500 mb-4">2 pending transactions</p>
            <div className="border-t border-gray-100 pt-4 flex items-center">
              <button
                type="button"
                className="flex-1 flex justify-center text-sm font-medium"
                style={{ color: '#006A56' }}
              >
                Transfer money
              </button>
              <div className="w-px h-4 bg-gray-200" />
              <button
                type="button"
                className="flex-1 flex justify-center text-sm font-medium"
                style={{ color: '#006A56' }}
              >
                Manage card
              </button>
            </div>
          </div>

          {/* 2. Upsell – cashing paper paychecks (same visual as UpsellCard) */}
          <button
            type="button"
            onClick={() => setShowDepositCheckFlow(true)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm text-left hover:opacity-95 active:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <img src="/check-deposit-icon.png" alt="" className="w-9 h-9 object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-gray-700 leading-relaxed text-sm font-medium">
                  Cash your paper paycheck instantly. Deposit with your phone.
                </p>
              </div>
            </div>
          </button>

          {/* 3. Recent activity */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Recent activity</h3>
              <button
                type="button"
                className="text-sm font-medium"
                style={{ color: '#006A56' }}
                onClick={() => navigate('/payroll')}
              >
                View all
              </button>
            </div>
            <div className="space-y-0 divide-y divide-gray-100">
              {ACTIVITIES.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === 'credit' ? 'bg-[#006A56]/10' : 'bg-gray-100'}`}
                    >
                      <Icon className={`w-5 h-5 ${item.type === 'credit' ? 'text-[#006A56]' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p
                        className={`font-semibold ${item.type === 'credit' ? 'text-[#006A56]' : 'text-gray-900'}`}
                      >
                        {item.amount}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
