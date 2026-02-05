import React from 'react';
import Header from '../components/Layout/Header';
import MenuList from '../components/More/MenuList';

const More = () => {
  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <Header title="More" theme="light" />
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-[160px]">
        <div className="px-4 py-6">
          <MenuList />
        </div>
      </div>
    </div>
  );
};

export default More;
