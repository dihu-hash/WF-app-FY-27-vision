import React from 'react';
import { currentJob, clockedInBadge } from '../../data/mockData';

const JobDetails = ({ showExtended = false, isRunning = false, paymentCompleted = false }) => {
  const details = [
    { label: 'Job number', value: currentJob.jobNumber },
    { label: 'Customer / Project', value: currentJob.customer },
    { label: 'Service item', value: currentJob.serviceItem },
    { label: 'Location', value: currentJob.location },
    { label: 'Department', value: currentJob.department },
    { label: 'Estimated hours', value: currentJob.estimatedHours },
    { label: 'Priority', value: currentJob.priority },
    { label: 'Billable', value: currentJob.billable ? 'Yes' : 'No' },
    { label: 'Billable rate', value: `$${currentJob.billableRate}/hr` },
    { label: 'Status', value: currentJob.status },
    { label: 'Manager', value: currentJob.manager },
    { label: 'Crew size', value: currentJob.crewSize },
    { label: 'Equipment', value: currentJob.equipment },
    { label: 'Customer contact', value: currentJob.customerContact }
  ];

  // Clocked-in: layout similar to JobShortcutCard (title + subtitle + badge, then actions, then Edit)
  if (isRunning) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col min-h-[160px]">
        <div className="flex items-start justify-between mb-3 flex-1">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{currentJob.customer}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
              <span>{currentJob.serviceItem}</span>
              <span className="text-gray-400">•</span>
              <span>{currentJob.location}</span>
              {paymentCompleted && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="font-semibold" style={{ color: '#006A56' }}>Paid</span>
                </>
              )}
            </div>
          </div>
          <span className={clockedInBadge.className}>{clockedInBadge.label}</span>
        </div>
        <div className="pt-3 mt-auto">
          <button className="text-[#006A56] font-semibold text-sm">
            Edit details
          </button>
        </div>
      </div>
    );
  }

  // Not clocked in: full details list
  return (
    <div className="bg-white rounded-2xl px-4 shadow-sm">
      {details.map((detail, index) => (
        <div
          key={index}
          className={`flex items-center justify-between py-3 ${
            index !== details.length - 1 ? 'border-b border-gray-100' : ''
          }`}
        >
          <span className="text-gray-600 text-sm">{detail.label}</span>
          <span className="text-gray-900 font-medium text-sm">{detail.value}</span>
        </div>
      ))}
      {showExtended && (
        <div className="flex items-center justify-between py-3 border-t border-gray-100 mt-2">
          <span className="text-gray-600 text-sm">Notes (Optional)</span>
          <button className="font-medium text-sm" style={{ color: '#006A56' }}>Add</button>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
