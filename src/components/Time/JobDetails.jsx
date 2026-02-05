import React from 'react';
import { currentJob } from '../../data/mockData';

const JobDetails = ({ showExtended = false }) => {
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
