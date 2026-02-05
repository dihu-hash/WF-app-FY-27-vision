import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { yearToDateBreakdown } from '../../data/mockData';

const PaycheckChart = () => {
  const [period, setPeriod] = useState('Year to date');

  const data = [
    { name: 'Net pay', value: yearToDateBreakdown.netPay, color: '#0d9488' },
    { name: 'Federal taxes', value: yearToDateBreakdown.federalTaxes, color: '#ec4899' },
    { name: 'State taxes', value: yearToDateBreakdown.stateTaxes, color: '#f97316' },
    { name: 'Other', value: yearToDateBreakdown.other, color: '#3b82f6' }
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[14px] font-semibold" style={{ color: '#4C555B' }}>Paychecks breakdown</h3>
        <button className="flex items-center gap-1 text-gray-600 text-sm">
          {period}
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="flex items-center gap-8">
        {/* Chart */}
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-700 text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <button className="w-full text-center font-medium" style={{ color: '#006A56' }}>
          View details
        </button>
      </div>
    </div>
  );
};

export default PaycheckChart;
