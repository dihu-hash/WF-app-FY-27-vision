import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CreditCard, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useScroll } from '../contexts/ScrollContext';

const Wallet = () => {
  const navigate = useNavigate();
  const { handleScroll } = useScroll();

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Fixed Header */}
      <div className="flex-shrink-0 text-white px-4 pt-14 pb-6 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Wallet</h1>
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
          
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-[#006A56] to-[#00856D] rounded-2xl p-6 shadow-lg text-white">
            <p className="text-sm opacity-90 mb-2">Available Balance</p>
            <h2 className="text-4xl font-bold mb-4">$1,847.50</h2>
            <div className="flex items-center justify-between">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-2 rounded-xl font-medium transition-colors">
                Withdraw
              </button>
              <div className="text-sm opacity-90">
                <p>Next Payday</p>
                <p className="font-semibold">Feb 15, 2026</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#006A56]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#006A56]" />
                </div>
              </div>
              <p className="text-base font-semibold text-gray-900">$4,250</p>
              <p className="text-sm text-gray-500">This Month</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#006A56]/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#006A56]" />
                </div>
              </div>
              <p className="text-base font-semibold text-gray-900">$48,600</p>
              <p className="text-sm text-gray-500">YTD Earnings</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-3">
              {/* Primary Card */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#006A56]/5 border-2 border-[#006A56]">
                <div className="w-12 h-12 rounded-xl bg-[#006A56] flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Chase Checking ****1234</p>
                  <p className="text-sm text-gray-500">Primary Account</p>
                </div>
              </div>
              {/* Add New */}
              <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#006A56] hover:bg-[#006A56]/5 transition-colors">
                <span className="text-2xl text-gray-400">+</span>
                <span className="text-gray-600 font-medium">Add Payment Method</span>
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {[
                { date: 'Feb 1, 2026', amount: '+$900.00', desc: 'Weekly Payroll', type: 'credit' },
                { date: 'Jan 25, 2026', amount: '+$900.00', desc: 'Weekly Payroll', type: 'credit' },
                { date: 'Jan 20, 2026', amount: '-$500.00', desc: 'Withdrawal to Bank', type: 'debit' },
                { date: 'Jan 18, 2026', amount: '+$900.00', desc: 'Weekly Payroll', type: 'credit' },
              ].map((transaction, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.desc}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <p className={`font-semibold ${transaction.type === 'credit' ? 'text-[#006A56]' : 'text-gray-900'}`}>
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-[#006A56] font-medium py-2 hover:bg-[#006A56]/5 rounded-xl transition-colors">
              View All Transactions
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Wallet;
