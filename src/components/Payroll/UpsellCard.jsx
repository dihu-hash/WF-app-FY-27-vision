import React from 'react';

const UpsellCard = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <img 
            src="/upsell-icon.png" 
            alt="On-Demand Pay" 
            className="w-6 h-6 object-contain"
          />
        </div>
        <p className="text-gray-700 leading-relaxed text-sm font-medium">
          Waiting for payday? Advance now with Clair on-demand pay, up to $200.
        </p>
      </div>
    </div>
  );
};

export default UpsellCard;
