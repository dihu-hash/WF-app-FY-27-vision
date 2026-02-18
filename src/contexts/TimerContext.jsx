import React, { createContext, useContext } from 'react';
import { useTimer } from '../hooks/useTimer';

const TimerContext = createContext(null);

export const useTimerContext = () => {
  const ctx = useContext(TimerContext);
  if (!ctx) {
    throw new Error('useTimerContext must be used within TimerProvider');
  }
  return ctx;
};

export const TimerProvider = ({ children }) => {
  const timer = useTimer();
  return (
    <TimerContext.Provider value={timer}>
      {children}
    </TimerContext.Provider>
  );
};
