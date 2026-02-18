import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, TrendingUp, Users, GitBranch, Plane, Receipt, FileText,
  Settings, HelpCircle, ChevronRight
} from 'lucide-react';

const MenuList = ({ onItemClick }) => {
  const navigate = useNavigate();

  const iconMap = {
    Heart, TrendingUp, Users, GitBranch, Plane, Receipt, FileText,
    Settings, HelpCircle
  };

  const workItems = [
    { id: 'time-off', label: 'Time off', icon: 'Plane', path: '/time-off' },
    { id: 'expenses', label: 'Expenses', icon: 'Receipt', path: '/expenses' },
    { id: 'benefits', label: 'Benefits', icon: 'Heart', path: '/benefits' },
    { id: 'documents', label: 'Documents', icon: 'FileText', path: '/documents' }
  ];

  const teamItems = [
    { id: 'hr-workflows', label: 'HR workflows', icon: 'GitBranch', path: '/workflows' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp', path: '/performance' },
    { id: 'directory', label: 'Directory', icon: 'Users', path: '/team' }
  ];

  const supportItems = [
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
    { id: 'help', label: 'Help & Support', icon: 'HelpCircle', path: '/help' }
  ];

  const MenuItem = ({ item }) => {
    const Icon = iconMap[item.icon];
    
    return (
      <button
        onClick={() => {
          if (onItemClick) onItemClick();
          navigate(item.path);
        }}
        className="w-full flex items-center justify-between p-4 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className="text-gray-600" />
          <span className="text-gray-900">{item.label}</span>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Work Section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[14px] font-semibold" style={{ color: '#4C555B' }}>Work</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {workItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[14px] font-semibold" style={{ color: '#4C555B' }}>Team</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {teamItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Settings & Support Section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[14px] font-semibold" style={{ color: '#4C555B' }}>Settings & Support</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {supportItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
