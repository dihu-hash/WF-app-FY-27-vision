import React from 'react';

const WidgetCard = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}>
      {title && <h3 className="text-[14px] font-semibold mb-3" style={{ color: '#4C555B' }}>{title}</h3>}
      {children}
    </div>
  );
};

export default WidgetCard;
