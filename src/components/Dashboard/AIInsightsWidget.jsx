import React from 'react';
import { Clock, Star, AlertCircle, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import WidgetCard from './WidgetCard';
import { aiInsights, weeklyHours } from '../../data/mockData';

const AIInsightsWidget = () => {
  const progress = (weeklyHours.current / weeklyHours.target) * 100;

  const getIcon = (iconType) => {
    switch(iconType) {
      case 'clock':
        return <Clock size={16} style={{ color: '#006A56' }} />;
      case 'star':
        return <Star size={16} className="text-yellow-500" />;
      case 'alert':
        return <AlertCircle size={16} className="text-orange-500" />;
      default:
        return <Sparkles size={16} style={{ color: '#006A56' }} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
      {/* Gradient border overlay */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 230, 190, 0.6) 0%, rgba(96, 165, 250, 0.6) 100%)',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[14px] font-semibold" style={{ color: '#4C555B' }}>Insights of the week</h3>
        </div>
      
      {/* Data Visualization Summary */}
      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
        {/* Hours This Week */}
        <div className="text-center animate-scaleIn">
          <div className="flex items-center justify-center mb-2">
            <div className="relative w-12 h-12">
              <svg className="transform -rotate-90 w-12 h-12">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#E5E7EB"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#006A56"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  className="animate-drawCircle"
                  style={{
                    '--final-offset': `${2 * Math.PI * 20 * (1 - progress / 100)}`
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-900">{weeklyHours.current}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600">Hours</p>
        </div>

        {/* Tasks Completed */}
        <div className="text-center animate-scaleIn-delay-1">
          <div className="flex items-center justify-center mb-2 h-12">
            <div className="flex flex-row items-center justify-center gap-2">
              <CheckCircle size={20} style={{ color: '#006A56' }} />
              <span className="text-lg font-bold text-gray-900">12</span>
            </div>
          </div>
          <p className="text-xs text-gray-600">Tasks</p>
        </div>

        {/* Alerts */}
        <div className="text-center animate-scaleIn-delay-2">
          <div className="flex items-center justify-center mb-2 h-12">
            <div className="flex flex-row items-center justify-center gap-2">
              <AlertCircle size={20} className="text-orange-500" />
              <span className="text-lg font-bold text-gray-900">3</span>
            </div>
          </div>
          <p className="text-xs text-gray-600">Alerts</p>
        </div>
      </div>
      
      {/* Insights List */}
      <div className="space-y-3">
        {aiInsights.map((insight) => (
          <div key={insight.id} className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(insight.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-900 font-medium text-sm">{insight.title}</h4>
              <p className="text-xs font-medium mt-1 leading-relaxed" style={{ color: '#8B9499' }}>{insight.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <button className="w-full text-center font-medium text-sm" style={{ color: '#006A56' }}>
          View all insights
        </button>
      </div>
      </div>
    </div>
  );
};

export default AIInsightsWidget;
