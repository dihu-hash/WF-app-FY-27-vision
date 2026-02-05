import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ 
  type, 
  value, 
  onChange, 
  onSubmit, 
  placeholder = 'Type a message...', 
  options = [],
  buttonText = 'Continue',
  inputType = 'text',
  disabled = false,
}) => {
  if (type === 'button') {
    return (
      <div className="p-4 bg-white border-t border-gray-200">
        <button
          onClick={onSubmit}
          disabled={disabled}
          className="w-full bg-[#006A56] text-white py-3 rounded-xl font-semibold hover:bg-[#00856D] active:bg-[#005544] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {buttonText}
        </button>
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div className="p-4 bg-white border-t border-gray-200">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#006A56] focus:ring-2 focus:ring-[#006A56]/20 transition-all mb-3"
        >
          <option value="">Select an option...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          onClick={onSubmit}
          disabled={!value || disabled}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            value && !disabled
              ? 'bg-[#006A56] text-white hover:bg-[#00856D] active:bg-[#005544]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    );
  }

  if (type === 'input') {
    return (
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#006A56] focus:ring-2 focus:ring-[#006A56]/20 transition-all"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && value && !disabled) {
                onSubmit();
              }
            }}
          />
          <button
            onClick={onSubmit}
            disabled={!value || disabled}
            className={`p-3 rounded-xl transition-all ${
              value && !disabled
                ? 'bg-[#006A56] text-white hover:bg-[#00856D] active:bg-[#005544]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ChatInput;
