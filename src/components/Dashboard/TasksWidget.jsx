import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import WidgetCard from './WidgetCard';
import { tasks } from '../../data/mockData';
import tasksClipboardIcon from '../../assets/tasks-clipboard-icon.png';

const TasksWidget = () => {
  const pendingTasks = tasks.filter(t => t.status === 'pending').slice(0, 3);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <img src={tasksClipboardIcon} alt="" width={24} height={24} className="flex-shrink-0" />;
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
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-medium">{task.title}</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Due: {task.dueDate}
              </span>
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
