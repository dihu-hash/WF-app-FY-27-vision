import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import WidgetCard from './WidgetCard';
import { schedule } from '../../data/mockData';

const ScheduleWidget = () => {
  const todayDate = new Date().toISOString().split('T')[0];
  const todaySchedule = schedule.find(s => s.date === todayDate);

  if (!todaySchedule) {
    return (
      <WidgetCard title="Today's schedule">
        <p className="text-gray-500 text-sm">No jobs scheduled for today</p>
      </WidgetCard>
    );
  }

  return (
    <WidgetCard title="Today's schedule">
      <div className="flex items-start gap-3">
        <img src="/schedule-icon.png" alt="Schedule" className="w-6 h-6 mt-1" />
        <div>
          <p className="text-gray-900 font-medium">{todaySchedule.customer}</p>
          <p className="text-gray-500 text-sm">{todaySchedule.time}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-4 pt-4">
        <button className="w-full text-center font-medium text-sm" style={{ color: '#006A56' }}>
          View full schedule
        </button>
      </div>
    </WidgetCard>
  );
};

export default ScheduleWidget;
