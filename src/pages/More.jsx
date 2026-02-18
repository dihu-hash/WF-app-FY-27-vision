import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import MenuList from '../components/More/MenuList';

const More = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Fixed Header */}
      <div className="flex-shrink-0 text-white px-4 pt-14 pb-6 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">More</h1>
          <button
            onClick={() => navigate(-1)}
            className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            aria-label="Close"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="px-4 py-6">
          <MenuList />
        </div>
      </div>
    </div>
  );
};

export default More;
