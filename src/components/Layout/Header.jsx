import React from 'react';
import { useNavigate } from 'react-router-dom';
import { employee } from '../../data/mockData';

const Header = ({ title, theme = 'dark', actions }) => {
  const navigate = useNavigate();
  const bgColor = theme === 'dark' ? '' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className={`${bgColor} ${textColor} px-4 pt-14 pb-6 flex items-center justify-between relative z-10`}>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/profile')}
          className="flex-shrink-0 rounded-full transition-transform active:scale-95"
        >
          <img 
            src={employee.avatar} 
            alt={employee.name}
            className="w-[30px] h-[30px] rounded-full"
          />
        </button>
        <h1 className="text-[20px] font-semibold">{title}</h1>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Header;
