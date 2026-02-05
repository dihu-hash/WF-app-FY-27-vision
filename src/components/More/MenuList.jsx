import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, TrendingUp, Users, GitBranch, 
  Settings, HelpCircle, LogOut, ChevronRight, Wallet 
} from 'lucide-react';

const MenuList = ({ onItemClick }) => {
  const navigate = useNavigate();

  const iconMap = {
    Heart, TrendingUp, Users, GitBranch,
    Settings, HelpCircle, LogOut, Wallet
  };

  const workInfoItems = [
    { id: 'benefits', label: 'Benefits', icon: 'Heart', path: '/benefits' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp', path: '/performance' },
    { id: 'team', label: 'Team', icon: 'Users', path: '/team' },
    { id: 'workflows', label: 'Workflows', icon: 'GitBranch', path: '/workflows' }
  ];

  const accountItems = [
    { id: 'wallet', label: 'My wallet', icon: 'Wallet', path: '/wallet' },
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
    { id: 'help', label: 'Help & Support', icon: 'HelpCircle', path: '/help' },
    { id: 'logout', label: 'Log out', icon: 'LogOut', path: '/logout' }
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
      {/* Work Information Section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[14px] font-semibold" style={{ color: '#4C555B' }}>Work information</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {workInfoItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[14px] font-semibold" style={{ color: '#4C555B' }}>Account</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {accountItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
