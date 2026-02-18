import React from 'react';

const PhoneMockup = ({ children }) => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(to bottom right, #f1f5f9, #e2e8f0)',
      }}
    >
      <div className="relative flex-shrink-0">
        {/* Phone Frame with realistic styling */}
        <div
          className="relative rounded-[3.5rem] p-[3px]"
          style={{
            background: 'linear-gradient(to bottom, #374151, #000, #374151)',
            boxShadow: '0 20px 80px -15px rgba(0,0,0,0.5)',
          }}
        >
          
          {/* Power Button */}
          <div className="absolute right-[-3px] top-[120px] w-[3px] h-[60px] bg-gray-800 rounded-l-sm"></div>
          
          {/* Volume Up Button */}
          <div className="absolute left-[-3px] top-[100px] w-[3px] h-[40px] bg-gray-800 rounded-r-sm"></div>
          
          {/* Volume Down Button */}
          <div className="absolute left-[-3px] top-[150px] w-[3px] h-[40px] bg-gray-800 rounded-r-sm"></div>
          
          {/* Mute Switch */}
          <div className="absolute left-[-3px] top-[70px] w-[3px] h-[25px] bg-gray-800 rounded-r-sm"></div>
          
          {/* Inner frame */}
          <div className="bg-black rounded-[3.3rem] p-[10px] relative">
            {/* Screen */}
            <div
              className="bg-white rounded-[2.8rem] overflow-hidden relative"
              style={{ width: 393, height: 852 }}
            >
              {/* Dynamic Island / Notch */}
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-[30px] z-50 shadow-lg">
                {/* Camera lens */}
                <div className="absolute left-[20px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] bg-gray-900 rounded-full border border-gray-800"></div>
                {/* Proximity sensor */}
                <div className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] bg-gray-900 rounded-full"></div>
              </div>
              
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 h-[54px] flex items-center justify-between px-8 text-white z-40 pointer-events-none pt-[14px]">
                <span className="text-[15px] font-semibold">9:41</span>
                <div className="flex items-center gap-[6px]">
                  {/* Signal */}
                  <img 
                    src="/signal-icon.png" 
                    alt="Signal" 
                    className="h-[11px] w-[17px]"
                  />
                  {/* WiFi */}
                  <img 
                    src="/wifi-icon.png" 
                    alt="WiFi" 
                    className="h-[11px] w-[15px]"
                  />
                  {/* Battery */}
                  <img 
                    src="/battery-icon.png" 
                    alt="Battery" 
                    className="h-[11px] w-[25px]"
                  />
                </div>
              </div>
              
              {/* App Content */}
              <div className="h-full min-h-0 overflow-hidden flex flex-col">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
