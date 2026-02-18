import React from 'react';
import { weeklyHours, thisMonthEarnings } from '../../data/mockData';

const TEAL = '#006A56';

// Hours: small bar chart by day (Mon=0 .. Fri=4); today in teal, others gray
const HoursChart = () => {
  const { days } = weeklyHours;
  const maxDay = Math.max(...days.map((d) => d.hours), 1);
  const dayOfWeek = new Date().getDay();
  const todayIndex = dayOfWeek >= 1 && dayOfWeek <= 5 ? dayOfWeek - 1 : -1;
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="flex items-end justify-between gap-0.5 flex-1 min-h-[36px]">
        {days.map((d, i) => (
          <div
            key={d.day}
            className="flex-1 min-w-0 flex flex-col items-center gap-0.5"
            title={`${d.day}: ${d.hours}h`}
          >
            <div
              className="insight-bar-reveal w-full max-w-[14px] rounded-t min-h-[4px]"
              style={{
                height: `${4 + (d.hours / maxDay) * 20}px`,
                backgroundColor: i === todayIndex ? TEAL : 'rgba(0, 106, 86, 0.2)',
                animationDelay: `${i * 70}ms`,
              }}
            />
            <span className="text-[10px] text-gray-400 truncate w-full text-center">{d.day.slice(0, 1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Earnings: green trend line (solid then dashed), draws in on load
const EarningsChart = () => {
  const solidRef = React.useRef(null);
  const dashedRef = React.useRef(null);
  const [solidLength, setSolidLength] = React.useState(0);
  const [dashedLength, setDashedLength] = React.useState(0);
  const [drawn, setDrawn] = React.useState(false);
  const [dashedPattern, setDashedPattern] = React.useState(false);

  React.useEffect(() => {
    if (solidRef.current && dashedRef.current) {
      setSolidLength(solidRef.current.getTotalLength());
      setDashedLength(dashedRef.current.getTotalLength());
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setDrawn(true));
      });
      const done = setTimeout(() => setDashedPattern(true), 720);
      return () => {
        cancelAnimationFrame(t);
        clearTimeout(done);
      };
    }
  }, []);

  const w = 100;
  const h = 36;
  const xs = [0, 18, 35, 52, 68, 85, 100];
  const ys = [22, 12, 24, 10, 20, 14, 18];
  const solidEndIdx = 4;
  const pathSolid = xs
    .slice(0, solidEndIdx + 1)
    .map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${h - ys[i]}`)
    .join(' ');
  const pathDashed = xs
    .slice(solidEndIdx)
    .map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${h - ys[solidEndIdx + i]}`)
    .join(' ');

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="flex-shrink-0">
      <path
        ref={solidRef}
        d={pathSolid}
        fill="none"
        stroke={TEAL}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: solidLength,
          strokeDashoffset: drawn ? 0 : solidLength,
        }}
        className="insight-line-draw"
      />
      <path
        ref={dashedRef}
        d={pathDashed}
        fill="none"
        stroke={TEAL}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: dashedPattern ? '4 3' : dashedLength,
          strokeDashoffset: drawn ? 0 : dashedLength,
        }}
        className="insight-line-draw"
      />
    </svg>
  );
};

const AIInsightsWidget = () => {
  const blocks = [
    {
      id: 'hours',
      title: 'Hours',
      subtitle: 'This week',
      value: `${weeklyHours.current} hrs`,
      icon: null,
      valueColor: TEAL,
      chart: 'hours',
    },
    {
      id: 'earnings',
      title: 'Earnings',
      subtitle: 'YTD net',
      value: `$${thisMonthEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: null,
      valueColor: TEAL,
      chart: 'earnings',
    },
  ];

  return (
    <div className="min-h-[140px] flex flex-col">
      <div className="flex gap-3 flex-1 min-h-0">
        {blocks.map((block) => {
          const Icon = block.icon;
          return (
            <div
              key={block.id}
              className="flex-1 min-w-0 min-h-0 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex flex-col gap-0.5 mb-2">
                {(block.chart === 'hours' || block.chart === 'earnings') ? (
                  <>
                    {block.value != null && (
                      <span className="text-[20px] font-semibold text-gray-900">
                        {block.value}
                      </span>
                    )}
                    <span className="text-[14px] font-medium text-gray-500">
                      {block.chart === 'hours' ? 'Hours · This week' : 'Pay · This month'}
                    </span>
                  </>
                ) : (
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-gray-900 truncate flex-1 min-w-0">
                      {block.title}
                    </h3>
                  </div>
                )}
              </div>
              <div className="flex-1 min-h-0 flex flex-col justify-end pt-2">
                {block.chart === 'hours' && <HoursChart />}
                {block.chart === 'earnings' && <EarningsChart />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIInsightsWidget;
