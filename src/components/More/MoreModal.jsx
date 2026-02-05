import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import MenuList from './MenuList';

const MoreModal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 250); // Match animation duration
  };

  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm z-40 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`absolute inset-x-0 bottom-0 z-50 ${isClosing ? 'animate-slideDown' : 'animate-slideUp'}`}>
        <div 
          className="bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden"
          style={{ backgroundColor: '#E2E9ED' }}
        >
          {/* Header */}
          <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-[20px] font-semibold text-gray-900">More</h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(80vh-64px)] pb-6">
            <div className="px-4 py-6">
              <MenuList onItemClick={handleClose} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreModal;
