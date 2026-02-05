import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Clock, Wallet, Calendar, MoreHorizontal } from 'lucide-react';
import MoreModal from '../More/MoreModal';
import { useScroll } from '../../contexts/ScrollContext';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const { navTranslateY } = useScroll();

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: LayoutGrid, path: '/' },
    { id: 'time', label: 'Time', icon: Clock, path: '/time' },
    { id: 'payroll', label: 'Payroll', icon: Wallet, path: '/payroll' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/schedule' }
  ];

  const moreItem = { id: 'more', label: 'More', icon: MoreHorizontal, path: '/more' };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavClick = (item) => {
    if (item.id === 'more') {
      setIsMoreModalOpen(true);
    } else {
      navigate(item.path);
    }
  };

  const NavButton = ({ item, showLabel = true, isMoreButton = false }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    
    return (
      <button
        onClick={() => handleNavClick(item)}
        className={`flex ${isMoreButton ? 'flex-row' : 'flex-col'} items-center justify-center gap-0.5 py-2 relative rounded-full ${
          isMoreButton ? 'h-full px-3' : 'flex-1 min-w-0'
        } ${active ? 'nav-button-active' : ''}`}
        style={{
          backgroundColor: active ? 'rgba(0, 133, 109, 0.1)' : undefined,
          transition: 'background-color 0.3s ease'
        }}
      >
        <Icon 
          size={20} 
          style={{
            color: active ? '#00856D' : '#6B7280',
            transition: 'color 0.3s ease'
          }}
          strokeWidth={active ? 2.5 : 2}
        />
        {showLabel && (
          <span 
            className={`text-[10px] whitespace-nowrap ${
              active ? 'font-semibold' : 'font-medium'
            }`}
            style={{
              color: active ? '#00856D' : '#6B7280',
              transition: 'color 0.3s ease'
            }}
          >
            {item.label}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      <div 
        className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-3 z-40"
        style={{
          transform: `translateY(${navTranslateY}px)`,
          transition: 'transform 0.1s linear'
        }}
      >
        <div className="flex items-stretch justify-between gap-4">
          {/* Main nav items grouped together */}
          <div 
            className="flex items-center flex-1 rounded-[2rem] px-2 py-1 relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.8),
                inset 0 -1px 0 rgba(0, 0, 0, 0.02)
              `
            }}
          >
            <div 
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)'
              }}
            ></div>
            <div className="relative z-10 flex items-center flex-1">
              {mainNavItems.map((item) => (
                <NavButton key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          {/* More button separate */}
          <div 
            className="rounded-[2rem] px-2 py-1 flex items-center relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.8),
                inset 0 -1px 0 rgba(0, 0, 0, 0.02)
              `
            }}
          >
            <div 
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)'
              }}
            ></div>
            <div className="relative z-10">
              <NavButton item={moreItem} showLabel={false} isMoreButton={true} />
            </div>
          </div>
        </div>
      </div>
      
      {/* More Modal */}
      <MoreModal isOpen={isMoreModalOpen} onClose={() => setIsMoreModalOpen(false)} />
    </>
  );
};

export default BottomNav;
