import React from 'react';
import { Play, Square, Coffee, Repeat } from 'lucide-react';
import { currentJob } from '../../data/mockData';

const TimerControls = ({ isRunning, isOnBreak, onStart, onStop, onToggleBreak, isScrolled, startTime }) => {
  const buttonSize = isScrolled ? 'w-10 h-10' : 'w-16 h-16';
  const iconSize = isScrolled ? 16 : 28;
  const squareSize = isScrolled ? 14 : 24;
  const gap = isScrolled ? 'gap-3' : 'gap-6';
  const marginTop = isScrolled ? 'mt-0' : 'mt-6';

  return (
    <div className={`flex items-center justify-center ${gap} ${marginTop} transition-all duration-500 ease-in-out`}>
      {isRunning ? (
        <>
          {/* Swap/Repeat Button */}
          <button
            onClick={onToggleBreak}
            className={`${buttonSize} rounded-full flex items-center justify-center transition-all duration-500 ease-in-out`}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Repeat size={iconSize} className="text-white" />
          </button>

          {/* Coffee/Break Button */}
          <button
            onClick={onToggleBreak}
            className={`${buttonSize} rounded-full flex items-center justify-center transition-all duration-500 ease-in-out`}
            style={{ backgroundColor: isOnBreak ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)' }}
          >
            <Coffee size={iconSize} className="text-white" />
          </button>

          {/* Stop Button */}
          <button
            onClick={onStop}
            className={`${buttonSize} rounded-full flex items-center justify-center transition-all duration-500 ease-in-out`}
            style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)' }}
          >
            <Square size={squareSize} className="text-white" fill="white" />
          </button>
        </>
      ) : (
        <>
          {/* Coffee Button (disabled when not running) */}
          <button
            disabled
            className={`${buttonSize} rounded-full flex items-center justify-center transition-all duration-500 ease-in-out`}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Coffee size={iconSize} className="text-white" />
          </button>

          {/* Play Button */}
          <button
            onClick={onStart}
            className={`${buttonSize} rounded-full flex items-center justify-center transition-all duration-500 ease-in-out shadow-lg`}
            style={{ backgroundColor: 'rgba(0, 133, 109, 0.4)' }}
          >
            <Play size={iconSize} className="text-white ml-1" fill="white" />
          </button>
        </>
      )}
    </div>
  );
};

export default TimerControls;
