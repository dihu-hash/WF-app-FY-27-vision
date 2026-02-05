import React from 'react';
import { X } from 'lucide-react';
import Timer from './Timer';
import TimerControls from './TimerControls';

const FullPageTimer = ({ 
  formattedTime, 
  isRunning, 
  isOnBreak, 
  onStart, 
  onStop, 
  onToggleBreak,
  startTime,
  onClose 
}) => {
  const bgStyle = isRunning 
    ? { backgroundImage: 'linear-gradient(to bottom, #165C4F, #01271F)' } 
    : { backgroundColor: '#21262A' };

  return (
    <div 
      className="absolute inset-0 z-[60] flex flex-col items-center justify-center animate-fadeIn"
      style={bgStyle}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-14 right-4 w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <X size={20} className="text-white" />
      </button>

      {/* Centered Timer */}
      <div className="flex flex-col items-center">
        <Timer 
          formattedTime={formattedTime} 
          isRunning={isRunning} 
          isScrolled={false}
          startTime={startTime}
        />
        <TimerControls 
          isRunning={isRunning}
          isOnBreak={isOnBreak}
          onStart={onStart}
          onStop={onStop}
          onToggleBreak={onToggleBreak}
          isScrolled={false}
        />
      </div>
    </div>
  );
};

export default FullPageTimer;
