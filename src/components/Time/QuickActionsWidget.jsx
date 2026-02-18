import React from 'react';
import { Receipt, CreditCard, FileText } from 'lucide-react';

const quickActions = [
  { id: 'expenses', label: 'Add expenses', icon: Receipt },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'invoice', label: 'Add invoices', icon: FileText }
];

const QuickActionsWidget = ({ onSubmitExpenses, onPayments }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {quickActions.map((action) => {
        const Icon = action.icon;
        const onClick = action.id === 'expenses' ? onSubmitExpenses : action.id === 'payments' ? onPayments : undefined;
        return (
          <button
            key={action.id}
            type="button"
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl bg-white shadow-sm hover:shadow active:opacity-90 transition-shadow w-full min-w-0"
          >
            <Icon size={24} style={{ color: '#006A56' }} className="flex-shrink-0" />
            <span className="text-xs font-medium text-gray-700 text-center leading-tight">
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActionsWidget;
