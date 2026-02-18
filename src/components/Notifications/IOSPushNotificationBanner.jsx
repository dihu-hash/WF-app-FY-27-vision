import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationShift } from '../../contexts/NotificationShiftContext';
import { useAppState } from '../../contexts/AppStateContext';

const AUTO_DISMISS_MS = 5000;

const BANNER_CONTENT = {
  new_shift: {
    message: "You're assigned a new shift",
    ariaLabel: "New shift assigned - open notifications",
  },
  paychecks: {
    message: 'Your latest paychecks is here',
    ariaLabel: 'Paychecks ready - open Payroll',
  },
};

const IOSPushNotificationBanner = () => {
  const { pushBannerType, showPushBanner, dismissPushBanner } = useNotificationShift();
  const { completeOnboarding, appView } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!showPushBanner) return;
    const t = setTimeout(dismissPushBanner, AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [showPushBanner, dismissPushBanner]);

  const handleTap = () => {
    dismissPushBanner();
    if (appView === 'homescreen' || appView === 'onboarding') {
      completeOnboarding();
    }
    if (pushBannerType === 'new_shift') {
      navigate('/notifications');
    } else if (pushBannerType === 'paychecks') {
      navigate('/payroll', { state: { fromPaychecksNotification: true } });
    }
  };

  if (!showPushBanner || !pushBannerType) return null;

  const content = BANNER_CONTENT[pushBannerType];

  return (
    <button
      type="button"
      onClick={handleTap}
      className="absolute left-3 right-3 z-[60] flex items-center gap-3 rounded-2xl p-3 text-left shadow-lg transition active:opacity-90"
      style={{
        top: 58,
        background: 'rgba(30, 30, 30, 0.72)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        animation: 'iosBannerSlideDown 0.35s ease-out',
      }}
      aria-label={content.ariaLabel}
    >
      <div className="flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-[10px] bg-[#3FA535] flex items-center justify-center">
        <img
          src="/workforce-icon.png"
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-white">Workforce</span>
          <span className="text-[13px] text-white/80">now</span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-[13px] text-white/90">
          {content.message}
        </p>
      </div>
    </button>
  );
};

export default IOSPushNotificationBanner;
