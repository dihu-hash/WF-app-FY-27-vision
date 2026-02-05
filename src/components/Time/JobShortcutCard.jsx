import React from 'react';
import { Play, Repeat } from 'lucide-react';

const JobShortcutCard = ({ job, badge, onClockIn, isRunning }) => {
  const getBadgeStyle = () => {
    if (badge === 'Next up') {
      return 'bg-[#C7F5DB] text-[#006A56]';
    }
    if (badge === 'Recent' || badge === 'Recently used') {
      return 'bg-gray-200 text-gray-700';
    }
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col min-h-[160px]">
      <div className="flex items-start justify-between mb-3 flex-1">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">{job.customer}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Start at {job.time}</span>
            <span className="text-gray-400">•</span>
            <span>{job.service}</span>
          </div>
        </div>
        {badge && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle()}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between pt-3 mt-auto">
        <button className="text-[#006A56] font-semibold text-sm pb-1">
          Edit details
        </button>
        <button
          onClick={onClockIn}
          className="w-12 h-12 rounded-full bg-[#006A56] hover:bg-[#00856D] flex items-center justify-center transition-colors flex-shrink-0"
        >
          {isRunning ? (
            <Repeat className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default JobShortcutCard;
