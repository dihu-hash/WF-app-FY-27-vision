import React from 'react';
import { ArrowLeft, DollarSign, ShoppingBag, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import { useScroll } from '../contexts/ScrollContext';
import { benefitsEnrollment, benefitsMarketplace, benefitsHistory } from '../data/mockData';

const Benefits = () => {
  const navigate = useNavigate();
  const { handleScroll } = useScroll();

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#E2E9ED' }}>
      {/* Fixed Header */}
      <div className="flex-shrink-0 text-white px-4 pt-14 pb-6 rounded-b-xl dark-bg-animated" style={{ backgroundColor: '#21262A' }}>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-[20px] font-semibold">Benefits</h1>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-y-auto pb-[160px]"
        onScroll={(e) => handleScroll(e.target.scrollTop)}
      >
        <div className="px-4 py-6 space-y-4">
          {/* Enrollment Cost Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign size={20} style={{ color: '#006A56' }} />
              <h3 className="text-[14px] font-semibold" style={{ color: '#4C555B' }}>Enrollment cost</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Total cost</span>
                <span className="text-gray-900 font-semibold">${benefitsEnrollment.totalCost.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Employer pays</span>
                <span className="font-semibold" style={{ color: '#006A56' }}>${benefitsEnrollment.employerContribution.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-gray-900 font-medium">You pay</span>
                <span className="text-gray-900 font-bold text-lg">${benefitsEnrollment.employeeCost.toFixed(2)}/mo</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              {benefitsEnrollment.plans.map((plan, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{plan.name}</span>
                  <span className="text-gray-900 font-medium">${plan.cost.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Marketplace */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag size={20} style={{ color: '#006A56' }} />
              <h3 className="text-[14px] font-semibold" style={{ color: '#4C555B' }}>Benefits marketplace</h3>
            </div>
            
            <div className="space-y-3">
              {benefitsMarketplace.map((benefit) => (
                <div key={benefit.id} className="border border-gray-100 rounded-xl p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-semibold text-sm">{benefit.name}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{benefit.category}</p>
                    </div>
                    {benefit.status === 'enrolled' && (
                      <span 
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ backgroundColor: 'rgba(0, 106, 86, 0.1)', color: '#006A56' }}
                      >
                        Enrolled
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs mb-2">{benefit.coverage}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {typeof benefit.employerContribution === 'string' 
                        ? benefit.employerContribution 
                        : `Employer pays $${benefit.employerContribution.toFixed(2)}`}
                    </span>
                    {benefit.monthlyCost > 0 && (
                      <span className="text-gray-900 font-semibold">${benefit.monthlyCost.toFixed(2)}/mo</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <button className="w-full text-center font-medium" style={{ color: '#006A56' }}>
                Explore all benefits
              </button>
            </div>
          </div>

          {/* Benefits History */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <History size={20} style={{ color: '#006A56' }} />
              <h3 className="text-[14px] font-semibold" style={{ color: '#4C555B' }}>Benefits history</h3>
            </div>
            
            <div className="space-y-3">
              {benefitsHistory.map((item) => (
                <div key={item.id} className="flex items-start justify-between py-2">
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium text-sm">{item.benefit}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.date} • {item.action}</p>
                  </div>
                  {item.cost > 0 && (
                    <span className="text-gray-900 font-medium text-sm">${item.cost.toFixed(2)}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <button className="w-full text-center font-medium" style={{ color: '#006A56' }}>
                View full history
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
