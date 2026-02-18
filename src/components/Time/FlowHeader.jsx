import React from 'react';
import { ArrowLeft, X } from 'lucide-react';

const FlowHeader = ({ title, onBack, onClose }) => {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-between px-4 pt-14 pb-4 relative"
      style={{ backgroundColor: '#21262A' }}
    >
      <button
        type="button"
        onClick={onBack}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        aria-label="Back"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="absolute left-0 right-0 text-xl font-semibold text-white text-center pointer-events-none">
        {title}
      </h1>
      <button
        type="button"
        onClick={onClose}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default FlowHeader;
