import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import Header from '../components/Layout/Header';
import Timer from '../components/Time/Timer';
import TimerControls from '../components/Time/TimerControls';
import JobDetails from '../components/Time/JobDetails';
import AdditionalInfoCard from '../components/Time/AdditionalInfoCard';
import LocationMap from '../components/Time/LocationMap';
import CountdownOverlay from '../components/Time/CountdownOverlay';
import JobShortcutCard from '../components/Time/JobShortcutCard';
import { useTimer } from '../hooks/useTimer';
import { useScroll } from '../contexts/ScrollContext';
import { schedule } from '../data/mockData';

const Time = () => {
  const { isRunning, isOnBreak, formattedTime, start, stop, toggleBreak } = useTimer();
  const [activePanel, setActivePanel] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clockInTime, setClockInTime] = useState(null);
  const scrollContainerRef = useRef(null);
  const panelContainerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);
  const startPanelIndex = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { handleScroll: handleNavScroll } = useScroll();

  // Calculate states based on scroll position
  const isScrolled = scrollPosition > 50; // Full shrink after 50px
  const paddingBottom = Math.max(16, 32 - (scrollPosition * 0.32)); // Reduce from 32px to 16px over first 50px

  // Play sound effect using bell ring sound
  const playClockInSound = () => {
    try {
      const audio = new Audio('/clock-in-sound.mp3');
      audio.volume = 0.5;
      audio.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  // Handle countdown complete - play sound and start timer
  const handleCountdownComplete = () => {
    setShowCountdown(false);
    playClockInSound();
    
    // Set clock-in time with "Today, " prefix
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    setClockInTime(`Today, ${timeStr}`);
    
    start();
  };

  // Handle countdown cancel
  const handleCountdownCancel = () => {
    setShowCountdown(false);
  };

  // Handle clock in - show countdown first
  const handleClockIn = () => {
    setShowCountdown(true);
  };

  // Handle swipe/drag gestures
  const handleDragStart = (e) => {
    isDragging.current = true;
    startPanelIndex.current = activePanel;
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    touchStartY.current = e.touches ? e.touches[0].clientY : e.clientY;
    setIsTransitioning(false);
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = Math.abs(currentY - touchStartY.current);

    // Only handle horizontal drags
    if (Math.abs(diffX) > diffY && Math.abs(diffX) > 10) {
      e.preventDefault();
      setDragOffset(diffX);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsTransitioning(true);

    const threshold = 80; // Distance to trigger panel change
    
    if (dragOffset < -threshold && activePanel < 2) {
      // Swiped left - next panel
      setActivePanel(prev => prev + 1);
    } else if (dragOffset > threshold && activePanel > 0) {
      // Swiped right - previous panel
      setActivePanel(prev => prev - 1);
    }
    
    // Reset offset after a brief delay
    setTimeout(() => {
      setDragOffset(0);
      setIsTransitioning(false);
    }, 300);
  };

  // Get upcoming jobs for shortcuts
  const upcomingJobs = schedule.filter(job => job.status === 'Scheduled').slice(0, 4);
  const recentJob = schedule.find(job => job.status === 'In progress');

  const panels = [
    { id: 0, component: (
      <div className="space-y-4">
        <JobDetails />
        <AdditionalInfoCard />
      </div>
    )},
    { id: 1, component: (
      <div className="space-y-4">
        {recentJob && (
          <JobShortcutCard 
            job={recentJob} 
            badge="Next up" 
            onClockIn={handleClockIn}
            isRunning={isRunning}
          />
        )}
        {upcomingJobs.slice(0, 4).map((job, idx) => (
          <JobShortcutCard 
            key={job.date}
            job={job} 
            badge={idx === 0 ? "Recent" : undefined}
            onClockIn={handleClockIn}
            isRunning={isRunning}
          />
        ))}
      </div>
    )},
    { id: 2, component: <LocationMap /> }
  ];

  const headerActions = (
    <>
      <button 
        className="px-4 h-[30px] text-white text-sm font-medium rounded-full transition-colors flex items-center"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        View timesheets
      </button>
      <button 
        className="w-[30px] h-[30px] text-white rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <Plus size={16} />
      </button>
    </>
  );

  const bgColor = isRunning ? '' : '';
  const bgStyle = isRunning 
    ? { backgroundImage: 'linear-gradient(to bottom, #165C4F, #01271F)' } 
    : { backgroundColor: '#21262A' };

  return (
    <div className="h-screen flex flex-col relative" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Countdown Overlay */}
      {showCountdown && (
        <CountdownOverlay 
          onComplete={handleCountdownComplete} 
          onCancel={handleCountdownCancel}
          initialSeconds={10} 
        />
      )}
      
      {/* Fixed Timer Section */}
      <div 
        className={`${bgColor} rounded-b-xl dark-bg-animated flex-shrink-0 transition-all duration-500 ease-in-out`} 
        style={{
          ...bgStyle,
          transition: 'background 0.4s ease, height 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
      >
        <Header title="Time" theme="dark" actions={headerActions} />
        
        <div 
          className={`relative z-10 transition-all duration-300 ease-out ${
            isScrolled ? 'px-4 py-3 flex flex-row items-center justify-between' : 'px-4 flex flex-col'
          }`}
          style={{
            paddingBottom: isScrolled ? '20px' : `${paddingBottom}px`
          }}
        >
          {isScrolled ? (
            <>
              <Timer formattedTime={formattedTime} isRunning={isRunning} isScrolled={isScrolled} startTime={clockInTime} showPillInline={true} />
              <TimerControls 
                isRunning={isRunning}
                isOnBreak={isOnBreak}
                onStart={handleClockIn}
                onStop={() => {
                  stop();
                  setClockInTime(null);
                }}
                onToggleBreak={toggleBreak}
                isScrolled={isScrolled}
                startTime={clockInTime}
              />
            </>
          ) : (
            <>
              <Timer formattedTime={formattedTime} isRunning={isRunning} isScrolled={isScrolled} startTime={clockInTime} showPillInline={false} />
              <TimerControls 
                isRunning={isRunning}
                isOnBreak={isOnBreak}
                onStart={handleClockIn}
                onStop={() => {
                  stop();
                  setClockInTime(null);
                }}
                onToggleBreak={toggleBreak}
                isScrolled={isScrolled}
                startTime={clockInTime}
              />
            </>
          )}
        </div>
      </div>

      {/* Scrollable Content Panels */}
      <div 
        ref={scrollContainerRef} 
        className="flex-1 overflow-y-auto pb-[240px]"
        onScroll={(e) => {
          const scrollTop = e.target.scrollTop;
          setScrollPosition(scrollTop);
          handleNavScroll(scrollTop);
        }}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
      >
        <div className="px-4 py-6 pb-[200px] space-y-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
          {/* Panel Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {panels.map((panel) => (
              <button
                key={panel.id}
                onClick={() => {
                  setIsTransitioning(true);
                  setActivePanel(panel.id);
                  setTimeout(() => setIsTransitioning(false), 300);
                }}
                className={`w-2 h-2 rounded-full transition-colors`}
                style={{ backgroundColor: activePanel === panel.id ? '#006A56' : '#d1d5db' }}
              ></button>
            ))}
          </div>

          {/* Swipeable Panel Container */}
          <div 
            ref={panelContainerRef}
            className="relative overflow-hidden -mx-4"
          >
            <div 
              className="flex"
              style={{
                transform: `translateX(calc(-${activePanel * 100}% + ${dragOffset}px))`,
                transition: isTransitioning ? 'transform 0.3s ease-out' : 'none'
              }}
            >
              {panels.map((panel) => (
                <div 
                  key={panel.id} 
                  className="flex-shrink-0 w-full px-4"
                >
                  {panel.component}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Time;
