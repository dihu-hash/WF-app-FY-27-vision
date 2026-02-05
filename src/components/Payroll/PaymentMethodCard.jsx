import React from 'react';
import { ChevronRight } from 'lucide-react';

const PaymentMethodCard = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="text-[14px] font-semibold mb-4" style={{ color: '#4C555B' }}>Payment method</h3>
      
      {/* Bank Account */}
      <button className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/chase-icon.png"
            alt="Chase"
            className="w-6 h-6"
          />
          <div className="text-left">
            <div className="text-sm font-semibold text-gray-900">Chase</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">SAVING (...3780)</span>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
      </button>
      
      {/* Edit Button */}
      <div className="border-t border-gray-200 mt-4 pt-4">
        <button 
          className="w-full text-center font-medium"
          style={{ color: '#006A56' }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
