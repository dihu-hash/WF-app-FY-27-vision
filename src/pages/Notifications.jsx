import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, DollarSign, Megaphone, CheckSquare } from 'lucide-react';
import { useScroll } from '../contexts/ScrollContext';
import { useNotificationShift } from '../contexts/NotificationShiftContext';

const typeConfig = {
  schedule: { icon: Calendar, color: '#006A56', label: 'Schedule' },
  paycheck: { icon: DollarSign, color: '#0d9488', label: 'Payroll' },
  team: { icon: Megaphone, color: '#6366f1', label: 'Team' },
  task: { icon: CheckSquare, color: '#ea580c', label: 'Tasks' },
};

const Notifications = () => {
  const navigate = useNavigate();
  const { handleScroll } = useScroll();
  const { notificationsList } = useNotificationShift();

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Header */}
      <div className="flex-shrink-0 text-white px-4 pt-14 pb-6 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button
            onClick={() => navigate(-1)}
            className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            aria-label="Close"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* List */}
      <div
        className="flex-1 overflow-y-auto pb-8"
        onScroll={(e) => handleScroll(e.target.scrollTop)}
      >
        <div className="px-4 py-6 space-y-3">
          {notificationsList.map((n) => {
            const config = typeConfig[n.type] || typeConfig.task;
            const Icon = config.icon;
            return (
              <button
                key={n.id}
                className="w-full text-left bg-white rounded-2xl p-4 shadow-sm transition-colors active:bg-gray-50"
              >
                <div className="flex gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <Icon size={20} style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`text-sm font-semibold ${n.read ? 'text-gray-500' : 'text-gray-900'}`}>
                        {n.title}
                      </h3>
                      <span className="text-xs text-gray-400 flex-shrink-0">{n.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{n.body}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
