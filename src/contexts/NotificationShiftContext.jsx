import React, { createContext, useContext, useState, useMemo } from 'react';
import { notifications, schedule } from '../data/mockData';

const NotificationShiftContext = createContext();

export const useNotificationShift = () => {
  const context = useContext(NotificationShiftContext);
  if (!context) {
    throw new Error('useNotificationShift must be used within NotificationShiftProvider');
  }
  return context;
};

const createNewShift = () => {
  const date = new Date().toISOString().split('T')[0];
  return {
    date,
    customer: 'Westside Commons',
    service: 'HVAC Maintenance',
    time: '2:00 PM',
    status: 'In progress',
    customerInfo: {
      contact: 'Sarah Miller',
      phone: '(555) 999-1234',
      address: '450 Westside Blvd, Suite 200',
    },
    jobDetails: {
      duration: '3 hours',
      priority: 'Medium',
      equipment: 'HVAC tools, filters, multimeter',
      notes: 'New shift assigned – quarterly maintenance and filter replacement',
    },
    pendingActions: ['Inspect unit', 'Replace filters', 'Test cooling'],
  };
};

const createNewNotification = () => ({
  id: `new-shift-${Date.now()}`,
  type: 'schedule',
  title: "You're assigned a new shift",
  body: 'A new shift has been added to your schedule for today.',
  time: 'Just now',
  read: false,
});

export const NotificationShiftProvider = ({ children }) => {
  const [addedNotification, setAddedNotification] = useState(null);
  const [addedShift, setAddedShift] = useState(null);
  const [pushBannerType, setPushBannerType] = useState(null); // 'new_shift' | 'paychecks' | null

  const addNewShift = () => {
    setAddedNotification(createNewNotification());
    setAddedShift(createNewShift());
    setPushBannerType('new_shift');
  };

  const showPaychecksBanner = () => {
    setPushBannerType('paychecks');
  };

  const dismissPushBanner = () => setPushBannerType(null);

  const notificationsList = useMemo(
    () => (addedNotification ? [addedNotification, ...notifications] : notifications),
    [addedNotification]
  );

  const scheduleList = useMemo(
    () => (addedShift ? [addedShift, ...schedule] : schedule),
    [addedShift]
  );

  const unreadCount = useMemo(
    () => notificationsList.filter((n) => !n.read).length,
    [notificationsList]
  );

  const value = {
    addNewShift,
    showPaychecksBanner,
    notificationsList,
    scheduleList,
    unreadCount,
    pushBannerType,
    showPushBanner: pushBannerType !== null,
    dismissPushBanner,
  };

  return (
    <NotificationShiftContext.Provider value={value}>
      {children}
    </NotificationShiftContext.Provider>
  );
};
