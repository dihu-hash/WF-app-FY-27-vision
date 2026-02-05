import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScroll } from '../contexts/ScrollContext';

const PlaceholderPage = ({ title }) => {
  const navigate = useNavigate();
  const { handleScroll } = useScroll();

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Fixed Header */}
      <div className="flex-shrink-0 text-white px-4 pt-14 pb-6 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-y-auto pb-[160px]"
        onScroll={(e) => handleScroll(e.target.scrollTop)}
      >
        <div className="px-4 py-12 text-center">
        <div className="bg-white rounded-2xl p-12 shadow-sm">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(0, 106, 86, 0.1)' }}>
            <span className="text-4xl">🚧</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Coming soon</h2>
          <p className="text-gray-600">
            The {title} page is under construction. Check back soon!
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
