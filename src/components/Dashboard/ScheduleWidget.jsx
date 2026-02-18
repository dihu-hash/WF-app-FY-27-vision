import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import WidgetCard from './WidgetCard';
import { schedule } from '../../data/mockData';

const ScheduleWidget = ({ scheduleList }) => {
  const list = scheduleList ?? schedule;
  const todayDate = new Date().toISOString().split('T')[0];
  const todaySchedule = list.find(s => s.date === todayDate);

  if (!todaySchedule) {
    return (
      <WidgetCard title="Today's schedule">
        <div className="flex items-center gap-3">
          <img src="/calendar-caught-up-icon.png" alt="" className="w-6 h-6 flex-shrink-0" />
          <p className="text-gray-500 text-sm">Relax, you're all caught up</p>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <button type="button" className="w-full text-center font-medium text-sm" style={{ color: '#006A56' }}>
            View schedule
          </button>
        </div>
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
