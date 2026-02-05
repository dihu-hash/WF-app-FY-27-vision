import React, { useState, useEffect } from 'react';

const CountdownOverlay = ({ onComplete, onCancel, initialSeconds = 15 }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [rippleKey, setRippleKey] = useState(0);

  useEffect(() => {
    if (seconds > 0) {
      // Trigger ripple on each second change
      setRippleKey(prev => prev + 1);
      
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown finished
      onComplete();
    }
  }, [seconds, onComplete]);

  return (
    <div className="absolute inset-0 z-[60] flex flex-col bg-black/90 backdrop-blur-sm animate-fadeIn">
      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 overflow-visible">
        {/* Ripple effect container - centered on countdown */}
        <div className="relative w-[400px] h-[400px] flex items-center justify-center overflow-visible">
          <div className="ripple-container">
            <div key={`ripple-${rippleKey}`} className="ripple-effect"></div>
          </div>
          
          {/* Countdown Number Only */}
          <div key={seconds} className="text-8xl font-bold text-white countdown-pulse relative z-10">
            {seconds}
          </div>
        </div>
      </div>

      {/* Text and Cancel Button at Bottom */}
      <div className="pb-32 px-4 relative z-10 flex flex-col items-center">
        {/* Text above Cancel button */}
        <p className="text-white/70 text-center text-sm font-medium leading-relaxed mb-6 w-full">
          Your employer has set a 10s rounding time
        </p>
        
        {/* Cancel Button */}
        <button
          onClick={onCancel}
          className="px-12 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors text-lg"
          style={{ borderRadius: '9999px' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CountdownOverlay;
