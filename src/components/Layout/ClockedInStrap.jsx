import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Square } from 'lucide-react';
import { useTimerContext } from '../../contexts/TimerContext';

const ClockedInStrap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isRunning, formattedTime, stop } = useTimerContext();

  const isTimePage = location.pathname === '/time';
  const show = isRunning && !isTimePage;

  if (!show) return null;

  const { hours, minutes, seconds } = formattedTime;

  const handleStrapClick = () => {
    navigate('/time');
  };

  const handleClockOut = (e) => {
    e.stopPropagation();
    stop();
    navigate('/time');
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleStrapClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleStrapClick(); } }}
      className="mx-auto rounded-full overflow-hidden flex-shrink-0 bg-[#165C4F] flex items-center px-4 py-2.5 min-h-[44px] cursor-pointer active:opacity-95 w-fit origin-center strap-from-timer"
      style={{
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span className="font-semibold text-white tabular-nums text-lg tracking-tight shrink-0">
        {hours}:{minutes}:{seconds}
      </span>
      <button
        type="button"
        onClick={handleClockOut}
        className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors active:opacity-80 flex-shrink-0 ml-6"
        style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)' }}
        title="Clock out"
      >
        <Square size={18} className="text-white" fill="white" />
      </button>
    </div>
  );
};

export default ClockedInStrap;
