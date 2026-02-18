import React, { useEffect, useRef } from 'react';
import { schedule } from '../../data/mockData';

const CalendarView = ({ viewMode = 'calendar', currentDate, weekDays, schedule: scheduleProp, onJobSelect, onBackToToday }) => {
  const scrollContainerRef = useRef(null);
  const currentTimeRef = useRef(null);
  const scheduleList = scheduleProp ?? schedule;

  // All 24 hours of the day (12 AM to 11 PM)
  const getCurrentHour = () => new Date().getHours();
  const currentHour = getCurrentHour();
  const startHour = 0; // Start at 12 AM
  const endHour = 23; // End at 11 PM
  
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    return {
      hour24: hour,
      label: hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`,
      isCurrent: hour === currentHour
    };
  });

  // Auto-scroll to center current time
  useEffect(() => {
    if (viewMode === 'calendar' && currentTimeRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentElement = currentTimeRef.current;
      
      setTimeout(() => {
        const containerHeight = container.clientHeight;
        const elementTop = currentElement.offsetTop;
        const elementHeight = currentElement.clientHeight;
        
        // Scroll to center the current time slot
        container.scrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);
      }, 100);
    }
  }, [viewMode, currentHour]);

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getJobForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return scheduleList.find(s => s.date === dateStr);
  };

  const getJobTimeSlot = (time) => {
    if (!time) return null;
    const hour = parseInt(time.split(':')[0]);
    const isPM = time.includes('PM');
    let hour24 = hour;
    
    if (isPM && hour !== 12) {
      hour24 = hour + 12;
    } else if (!isPM && hour === 12) {
      hour24 = 0;
    }
    
    // Return slot index for dynamic range
    if (hour24 < startHour || hour24 > endHour) return null;
    return hour24 - startHour;
  };

  const getCurrentTimePosition = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    if (hours < startHour || hours > endHour) return null;
    
    const totalMinutes = (hours - startHour) * 60 + minutes;
    const totalDayMinutes = (endHour - startHour + 1) * 60;
    const percentage = (totalMinutes / totalDayMinutes) * 100;
    
    return percentage;
  };

  const currentTimePosition = getCurrentTimePosition();

  // Get all jobs for the current week
  const getWeekJobs = () => {
    return weekDays.map(date => {
      const job = getJobForDate(date);
      return {
        date,
        job,
        dateStr: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      };
    }).filter(item => item.job);
  };

  const weekJobs = getWeekJobs();

  return (
    <>
      {viewMode === 'calendar' ? (
        // Calendar View
        <div className="bg-white rounded-2xl shadow-sm flex flex-col" style={{ height: '500px' }}>
          {/* Time Grid - Scrollable within widget */}
          <div className="px-4 overflow-y-auto flex-1" ref={scrollContainerRef}>
            <div className="relative py-2">
              {timeSlots.map((slot, slotIndex) => (
                <div 
                  key={slotIndex} 
                  ref={slot.isCurrent ? currentTimeRef : null}
                  className="grid grid-cols-[60px_1fr] gap-0 border-b border-gray-100" 
                  style={{ minHeight: '64px' }}
                >
                  <div className={`pr-3 text-[11px] py-1 flex items-start justify-end ${
                    slot.isCurrent ? 'text-[#006A56] font-semibold' : 'text-gray-500'
                  }`}>
                    {slot.label}
                  </div>
                  {weekDays.map((date, dayIndex) => {
                    const job = getJobForDate(date);
                    const jobTimeSlot = job ? getJobTimeSlot(job.time) : null;
                    const showJobHere = job && jobTimeSlot === slotIndex;
                    
                    if (showJobHere) {
                      return (
                        <button
                          key={dayIndex}
                          onClick={() => onJobSelect && onJobSelect(job)}
                          className="border-l border-gray-100 px-3 relative transition-opacity active:opacity-70"
                          style={{ minHeight: '64px' }}
                        >
                          <div
                            className="absolute inset-x-3 rounded-lg px-3 py-2 overflow-hidden flex flex-col items-start justify-start pointer-events-none"
                            style={{ 
                              backgroundColor: 'rgba(0, 106, 86, 0.12)',
                              borderLeft: '3px solid #006A56',
                              top: '4px',
                              height: 'calc(192px - 8px)' // Span 3 hours (64px * 3)
                            }}
                          >
                            <div className="text-xs font-semibold text-gray-900 mb-1 line-clamp-3 text-left w-full">
                              {job.customer}
                            </div>
                            <div className="text-xs text-gray-600 line-clamp-1 mb-1 text-left w-full">
                              {job.service}
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-2 text-left w-full">
                              {job.time}
                            </div>
                          </div>
                        </button>
                      );
                    }
                    
                    return (
                      <div 
                        key={dayIndex} 
                        className="border-l border-gray-100 px-3 relative"
                        style={{ minHeight: '64px' }}
                      />
                    );
                  })}
                </div>
              ))}

              {/* Current Time Indicator - Line only */}
              {currentTimePosition !== null && (
                <div 
                  className="absolute left-0 right-0 flex items-center pointer-events-none"
                  style={{ top: `${currentTimePosition}%` }}
                >
                  <div className="w-[60px]"></div>
                  <div 
                    className="flex-1 h-0.5 ml-[1px]"
                    style={{ backgroundColor: '#006A56' }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // List View
        <div className="space-y-3">
          {weekJobs.length > 0 ? (
            weekJobs.map((item, index) => (
              <button 
                key={index}
                onClick={() => onJobSelect && onJobSelect(item.job)}
                className="w-full bg-white rounded-xl p-4 shadow-sm text-left transition-opacity active:opacity-70"
                style={{ borderLeft: '4px solid #006A56' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.job.customer}</h4>
                    <p className="text-sm text-gray-500">{item.dateStr}</p>
                  </div>
                  <div className="text-sm font-medium" style={{ color: '#006A56' }}>
                    {item.job.time}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'rgba(0, 106, 86, 0.1)', color: '#006A56' }}
                  >
                    {item.job.service}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center min-h-[60vh] text-center pt-20 pb-6">
              <img
                src="/empty-schedule-illustration.png"
                alt=""
                className="w-32 h-32 mx-auto mb-4 object-contain"
              />
              <p className="text-gray-700 font-medium">No schedule for this day</p>
              <p className="text-gray-500 text-sm mt-1">Nothing on the calendar yet</p>
              {onBackToToday && (
                <button
                  type="button"
                  onClick={onBackToToday}
                  className="mt-6 px-6 py-3 rounded-full text-sm font-semibold transition-opacity active:opacity-80"
                  style={{ backgroundColor: 'rgba(0, 106, 86, 0.1)', color: '#006A56' }}
                >
                  Back to today
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CalendarView;
