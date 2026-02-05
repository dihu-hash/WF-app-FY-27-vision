import React from 'react';

const AdditionalInfoCard = () => {
  return (
    <div className="bg-white rounded-2xl px-4 shadow-sm">
      {/* Notes Section */}
      <div className="flex items-center justify-between py-3 border-b border-gray-100">
        <span className="text-gray-600 text-sm">Notes</span>
        <button className="font-medium text-sm" style={{ color: '#006A56' }}>
          Add
        </button>
      </div>

      {/* Attachments Section */}
      <div className="flex items-center justify-between py-3">
        <span className="text-gray-600 text-sm">Attachments</span>
        <button className="font-medium text-sm" style={{ color: '#006A56' }}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AdditionalInfoCard;
