import React from 'react';
import { Pencil } from 'lucide-react';
import { currentJob } from '../../data/mockData';

const Timer = ({ formattedTime, isRunning, isScrolled, startTime, showPillInline = true }) => {
  const { hours, minutes, seconds } = formattedTime;

  return (
    <div 
      className="flex flex-col items-center justify-center transition-all duration-500 ease-in-out"
      style={{
        paddingTop: isScrolled ? '0px' : '24px',
        paddingBottom: isScrolled ? '0px' : '24px'
      }}
    >
      <div 
        className="font-semibold text-white tracking-tight transition-all duration-500 ease-in-out"
        style={{
          fontSize: isScrolled ? '20px' : '48px'
        }}
      >
        <span>{hours}</span>
        <span className={isScrolled ? '' : 'animate-pulse'}>:</span>
        <span>{minutes}</span>
        <span className={isScrolled ? '' : 'animate-pulse'}>:</span>
        <span>{seconds}</span>
      </div>
      
      {/* Start Time Text - Show below timer when not scrolled */}
      {!isScrolled && (
        <div className="flex items-center justify-center text-white/70 text-sm mt-3">
          <span>Start time: {startTime || currentJob.startTime}</span>
          <Pencil size={16} className="opacity-50" style={{ marginLeft: '4px' }} />
        </div>
      )}
    </div>
  );
};

export default Timer;
