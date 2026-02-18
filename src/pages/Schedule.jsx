import React from 'react';
import Header from '../components/Layout/Header';
import CalendarView from '../components/Schedule/CalendarView';
import { Calendar, List, ChevronLeft, ChevronRight, X, MapPin, Phone, User, Clock, AlertCircle, CheckCircle, MoreHorizontal } from 'lucide-react';
import { useScroll } from '../contexts/ScrollContext';
import { useNotificationShift } from '../contexts/NotificationShiftContext';

const Schedule = () => {
  const [viewMode, setViewMode] = React.useState('calendar');
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [isJobMoreOpen, setJobMoreOpen] = React.useState(false);
  const { handleScroll } = useScroll();
  const { scheduleList } = useNotificationShift();

  React.useEffect(() => {
    if (!selectedJob) setJobMoreOpen(false);
  }, [selectedJob]);

  // Generate 5 days centered around current date
  const getFiveDays = (centerDate) => {
    const days = [];
    for (let i = -2; i <= 2; i++) {
      const date = new Date(centerDate);
      date.setDate(centerDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const fiveDays = getFiveDays(currentDate);
  const weekDays = [currentDate]; // For the calendar view

  const selectDate = (date) => {
    setCurrentDate(date);
  };

  const previousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const formatDayOfWeek = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  };

  const formatDayOfMonth = (date) => {
    return date.getDate();
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      {/* View Timesheets */}
      <button
        className="px-3 h-[30px] rounded-full transition-colors text-xs font-medium"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
      >
        View timesheets
      </button>
      
      {/* View Toggle */}
      <div className="flex items-center rounded-full p-0.5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
        <button
          onClick={() => setViewMode('calendar')}
          className={`p-1.5 rounded-full transition-colors ${
            viewMode === 'calendar' ? 'shadow-sm' : ''
          }`}
          style={viewMode === 'calendar' ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}}
        >
          <Calendar size={16} className="text-white" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-1.5 rounded-full transition-colors ${
            viewMode === 'list' ? 'shadow-sm' : ''
          }`}
          style={viewMode === 'list' ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}}
        >
          <List size={16} className="text-white" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col relative" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Fixed Header */}
      <div className="flex-shrink-0 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
        <Header title="Schedule" theme="dark" actions={headerActions} />
        
        {/* Date Selection */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={previousDay}
              className="p-1 rounded-lg transition-colors flex-shrink-0"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            
            <div className="flex items-center gap-2 flex-1 justify-center">
              {fiveDays.map((date, index) => {
                const isSelected = date.toDateString() === currentDate.toDateString();
                const today = isToday(date);
                const dayOfWeek = formatDayOfWeek(date);
                const dayOfMonth = formatDayOfMonth(date);
                
                return (
                  <button
                    key={index}
                    onClick={() => selectDate(date)}
                    className="flex flex-col items-center justify-center transition-all rounded-xl px-3 py-2 relative"
                    style={isSelected ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}}
                  >
                    <div className={`text-[10px] font-medium mb-1 text-center ${isSelected ? 'text-white' : 'text-white opacity-60'}`}>
                      {dayOfWeek}
                    </div>
                    <div 
                      className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full text-center ${
                        isSelected ? 'text-white' : 'text-white'
                      }`}
                    >
                      {dayOfMonth}
                    </div>
                    {today && (
                      <div 
                        className="w-1 h-1 rounded-full mt-1 mx-auto"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                      ></div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextDay}
              className="p-1 rounded-lg transition-colors flex-shrink-0"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-hidden pb-[160px]">
        <div className="px-4 pt-4">
          <CalendarView 
            viewMode={viewMode} 
            currentDate={currentDate} 
            weekDays={weekDays}
            schedule={scheduleList}
            onJobSelect={setSelectedJob}
            onBackToToday={goToToday}
          />
        </div>
      </div>

      {/* Job Details Modal - Full Page Overlay */}
      {selectedJob && (() => {
        const displayStatus = 'In progress';
        return (
        <div className="absolute inset-x-0 top-11 bottom-0 z-50 animate-fadeIn flex flex-col" style={{ backgroundColor: '#E2E9ED' }}>
          {/* Header */}
          <div className="flex-shrink-0 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
            <div className="text-white px-4 pt-3 pb-6 flex items-center justify-between relative z-10">
              <h1 className="text-[20px] font-semibold">Job details</h1>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-h-0 relative flex flex-col">
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-4 py-6 pb-48 space-y-4">
              {/* Project Header */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedJob.customer}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-600">{selectedJob.service}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm font-medium" style={{ color: '#006A56' }}>{selectedJob.time}</span>
                </div>
                
                {/* Progressive Status Bar */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="mb-3">
                    <span className="text-xs font-semibold" style={{ color: '#4C555B' }}>Status</span>
                  </div>
                  
                  {/* Segmented Progress Bar */}
                  <div className="flex gap-1 mb-3">
                    <div 
                      className="flex-1 h-1 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: displayStatus === 'Scheduled' || displayStatus === 'In progress' || displayStatus === 'Completed' ? '#006A56' : '#E5E7EB'
                      }}
                    ></div>
                    <div 
                      className="flex-1 h-1 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: displayStatus === 'In progress' || displayStatus === 'Completed' ? '#006A56' : '#E5E7EB'
                      }}
                    ></div>
                    <div 
                      className="flex-1 h-1 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: displayStatus === 'Completed' ? '#006A56' : '#E5E7EB'
                      }}
                    ></div>
                    <div 
                      className="flex-1 h-1 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: displayStatus === 'Completed' ? '#006A56' : '#E5E7EB'
                      }}
                    ></div>
                  </div>
                  
                  {/* Status Labels */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[10px] leading-tight"
                      style={{ 
                        color: displayStatus === 'Scheduled' || displayStatus === 'In progress' || displayStatus === 'Completed' ? '#006A56' : '#9CA3AF'
                      }}
                    >
                      Assigned
                    </span>
                    <span 
                      className="text-[10px] leading-tight"
                      style={{ 
                        color: displayStatus === 'In progress' || displayStatus === 'Completed' ? '#006A56' : '#9CA3AF'
                      }}
                    >
                      In progress
                    </span>
                    <span 
                      className="text-[10px] leading-tight"
                      style={{ 
                        color: displayStatus === 'Completed' ? '#006A56' : '#9CA3AF'
                      }}
                    >
                      Payments
                    </span>
                    <span 
                      className="text-[10px] leading-tight"
                      style={{ 
                        color: displayStatus === 'Completed' ? '#006A56' : '#9CA3AF'
                      }}
                    >
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-3" style={{ color: '#4C555B' }}>Customer information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <p className="text-sm text-gray-900">{selectedJob.customerInfo.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm text-gray-900">{selectedJob.customerInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm text-gray-900">{selectedJob.customerInfo.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-3" style={{ color: '#4C555B' }}>Job details</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Duration</span>
                    <span className="text-sm font-medium text-gray-900">{selectedJob.jobDetails.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Priority</span>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: selectedJob.jobDetails.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : 
                                       selectedJob.jobDetails.priority === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 
                                       'rgba(156, 163, 175, 0.1)',
                        color: selectedJob.jobDetails.priority === 'High' ? '#EF4444' : 
                               selectedJob.jobDetails.priority === 'Medium' ? '#F59E0B' : 
                               '#6B7280'
                      }}
                    >
                      {selectedJob.jobDetails.priority}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-gray-500">Equipment</span>
                    <span className="text-sm text-gray-900 text-right max-w-[60%]">{selectedJob.jobDetails.equipment}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Notes</p>
                    <p className="text-sm text-gray-900">{selectedJob.jobDetails.notes}</p>
                  </div>
                </div>
              </div>

              {/* Pending Actions */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-3" style={{ color: '#4C555B' }}>Pending actions</h4>
                <div className="space-y-2">
                  {selectedJob.pendingActions.map((action, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                      <p className="text-sm text-gray-900">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Bottom gradient to indicate content overflow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to top, rgba(226, 233, 237, 1) 0%, rgba(226, 233, 237, 0.8) 40%, rgba(226, 233, 237, 0) 100%)'
              }}
            />
          </div>

          {/* More options: full-bleed bottom sheet (positioned relative to overlay) */}
          {isJobMoreOpen && (
            <>
              <div 
                className="absolute inset-0 z-[59] bg-black/40" 
                onClick={() => setJobMoreOpen(false)} 
                aria-hidden="true"
              />
              <div 
                className="absolute left-0 right-0 bottom-0 z-[61] bg-white rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.12)] animate-slideUp pb-8"
              >
                <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mt-3 mb-4" />
                <div className="px-4 pb-8">
                  {['Take payments', 'Create invoice', 'View timesheets'].map((label) => (
                    <button
                      key={label}
                      onClick={() => setJobMoreOpen(false)}
                      className="w-full text-left px-4 py-4 text-base text-gray-900 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-xl"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Fixed Action Buttons - pinned to bottom with 24px padding, above nav */}
          <div 
            className="absolute left-0 right-0 px-4 pt-4 pb-6 z-[60]"
            style={{ 
              bottom: 0,
              backgroundColor: '#E2E9ED',
              paddingBottom: '24px'
            }}
          >
            <div className="flex items-center gap-3">
              <button
                className="flex-1 h-12 rounded-full font-semibold text-white transition-opacity active:opacity-80 shadow-lg"
                style={{ backgroundColor: '#006A56' }}
              >
                Clock in
              </button>
              <button
                onClick={() => setJobMoreOpen(prev => !prev)}
                className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center transition-opacity active:opacity-80"
                style={{ backgroundColor: 'rgba(0, 106, 86, 0.1)', color: '#006A56' }}
              >
                <MoreHorizontal size={24} />
              </button>
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
};

export default Schedule;
