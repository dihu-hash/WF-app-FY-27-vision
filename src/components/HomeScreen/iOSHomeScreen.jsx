import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';

const IOSHomeScreen = () => {
  const { launchApp } = useAppState();

  // Get current time
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: false 
  });

  // Only Workforce app
  const workforceApp = { 
    name: 'Workforce', 
    color: '#006A56', 
    icon: 'W', 
    special: true 
  };

  const dockApps = [
    { name: 'Messages', color: '#25D366', icon: '💬', image: '/messages-icon.png' },
    { name: 'Phone', color: '#34C759', icon: '📞', image: '/notes-icon.png' },
    { name: 'Safari', color: '#007AFF', icon: '🧭', image: '/reminders-icon.png' },
    { name: 'Music', color: '#FA233B', icon: '🎵', image: '/mail-icon.png' },
  ];

  const handleAppTap = (appName) => {
    if (appName === 'Workforce') {
      launchApp();
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* iOS Wallpaper Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/ios-wallpaper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Time Display */}
      <div className="absolute top-24 left-0 right-0 text-center">
        <div className="text-white text-7xl font-semibold tracking-tight">
          {currentTime}
        </div>
        <div className="text-white text-xl font-medium mt-2">
          Monday, February 2
        </div>
      </div>

      {/* Workforce App - First Position (Top Left) */}
      <div className="absolute top-56 left-6">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleAppTap(workforceApp.name)}
        >
          <div className="w-[60px] h-[60px] rounded-2xl shadow-lg transform transition-transform active:scale-95 overflow-hidden bg-[#3FA535] flex items-center justify-center">
            <img
              src="/workforce-icon.png"
              alt="Workforce"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-white text-xs mt-1.5 font-medium drop-shadow-md">
            {workforceApp.name}
          </span>
        </div>
      </div>

      {/* Page Indicator Dots */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white opacity-100"></div>
        <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
        <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-8 left-6 right-6">
        <div 
          className="bg-white/20 backdrop-blur-2xl rounded-3xl px-4 py-3 shadow-2xl"
          style={{ backdropFilter: 'blur(40px)' }}
        >
          <div className="flex justify-around items-center">
            {dockApps.map((app, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
              >
                <div
                  className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-2xl shadow-lg overflow-hidden"
                  style={{ backgroundColor: app.color }}
                >
                  {app.image ? (
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{app.icon}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IOSHomeScreen;
