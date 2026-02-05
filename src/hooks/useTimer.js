import { useState, useEffect, useRef } from 'react';

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('timerState');
    if (savedState) {
      const { isRunning: savedRunning, startTime, elapsedTime: savedElapsed, isOnBreak: savedBreak } = JSON.parse(savedState);
      if (savedRunning && startTime) {
        const now = Date.now();
        const calculatedElapsed = savedElapsed + (now - startTime);
        setElapsedTime(calculatedElapsed);
        setIsRunning(true);
        setIsOnBreak(savedBreak);
        startTimeRef.current = now;
      } else {
        setElapsedTime(savedElapsed || 0);
        setIsOnBreak(savedBreak || false);
      }
    }
  }, []);

  // Update timer
  useEffect(() => {
    if (isRunning && !isOnBreak) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = elapsedTime + (now - startTimeRef.current);
        setElapsedTime(elapsed);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isOnBreak]);

  // Save state to localStorage
  useEffect(() => {
    const state = {
      isRunning,
      startTime: startTimeRef.current,
      elapsedTime,
      isOnBreak
    };
    localStorage.setItem('timerState', JSON.stringify(state));
  }, [isRunning, elapsedTime, isOnBreak]);

  const start = () => {
    startTimeRef.current = Date.now();
    setIsRunning(true);
    setIsOnBreak(false);
  };

  const stop = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setIsOnBreak(false);
    startTimeRef.current = null;
    localStorage.removeItem('timerState');
  };

  const toggleBreak = () => {
    if (isRunning) {
      setIsOnBreak(!isOnBreak);
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      formatted: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    };
  };

  return {
    isRunning,
    isOnBreak,
    elapsedTime,
    formattedTime: formatTime(elapsedTime),
    start,
    stop,
    toggleBreak
  };
};
