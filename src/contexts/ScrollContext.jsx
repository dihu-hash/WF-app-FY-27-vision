import React, { createContext, useContext, useState, useRef } from 'react';

const ScrollContext = createContext();

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within ScrollProvider');
  }
  return context;
};

export const ScrollProvider = ({ children }) => {
  const [navTranslateY, setNavTranslateY] = useState(0);
  const lastScrollY = useRef(0);
  const accumulatedHide = useRef(0);

  const handleScroll = (scrollTop) => {
    const currentScrollY = scrollTop;
    const scrollDifference = currentScrollY - lastScrollY.current;

    // Reset when at top
    if (currentScrollY <= 10) {
      setNavTranslateY(0);
      accumulatedHide.current = 0;
    } else {
      // Accumulate scroll when moving down, reduce when moving up
      accumulatedHide.current += scrollDifference;
      
      // Clamp the accumulated value between 0 and 120 (max hide distance)
      accumulatedHide.current = Math.max(0, Math.min(120, accumulatedHide.current));
      
      setNavTranslateY(accumulatedHide.current);
    }

    lastScrollY.current = currentScrollY;
  };

  return (
    <ScrollContext.Provider value={{ navTranslateY, handleScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};
