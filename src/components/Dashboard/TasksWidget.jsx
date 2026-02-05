import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import WidgetCard from './WidgetCard';
import { tasks } from '../../data/mockData';

const TasksWidget = () => {
  const pendingTasks = tasks.filter(t => t.status === 'pending').slice(0, 3);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <Clock size={16} className="text-orange-500" />;
      case 'in_progress':
        return <AlertCircle size={16} className="text-blue-500" />;
      case 'completed':
        return <CheckCircle2 size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <WidgetCard title="Upcoming tasks">
      <div className="space-y-3">
        {pendingTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 text-sm">
            {getStatusIcon(task.status)}
            <div className="flex-1">
              <p className="text-gray-900">{task.title}</p>
              <p className="text-gray-500 text-xs mt-1">Due: {task.dueDate}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 mt-4 pt-4">
        <button className="w-full text-center font-medium text-sm" style={{ color: '#006A56' }}>
          View all tasks
        </button>
      </div>
    </WidgetCard>
  );
};

export default TasksWidget;
