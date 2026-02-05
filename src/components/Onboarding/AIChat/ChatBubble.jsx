import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, ChevronDown } from 'lucide-react';

const ChatBubble = ({ message, isUser, isTyping = false, action, attachments, onAction, disabled }) => {
  const [selectValue, setSelectValue] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    if (action?.celebration) {
      setShowConfetti(true);
    }
  }, [action]);

  const handleCelebrationHover = () => {
    if (action?.celebration) {
      setConfettiKey(prev => prev + 1);
    }
  };

  if (isTyping) {
    return (
      <div className="flex items-end gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#006A56] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
        <div className="bg-[#E5E5EA] rounded-2xl rounded-bl-sm px-4 py-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const handleAction = () => {
    if (action.type === 'button') {
      onAction(action.value || action.buttonText);
    } else if (action.type === 'select') {
      if (selectValue) {
        onAction(selectValue);
        setSelectValue('');
      }
    }
  };

  return (
    <div className={`flex items-start gap-2 mb-4 animate-chatMessageIn ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#006A56] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      )}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-[#006A56] text-white rounded-br-sm'
              : 'bg-[#E5E5EA] text-gray-900 rounded-bl-sm'
          }`}
        >
          <p className="text-[15px] leading-relaxed">{message}</p>
        </div>
        
        {/* Document Attachments */}
        {!isUser && attachments && attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {attachments.map((attachment, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {attachment.name}
                  </p>
                  <p className="text-xs text-gray-500">{attachment.size}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Inline Actions for AI messages only - Button and Select only */}
        {!isUser && action && action.type !== 'auto' && action.type !== 'input' && (
          <div className="mt-2 w-full">
            {action.type === 'button' && !action.celebration && (
              <button
                onClick={handleAction}
                disabled={disabled}
                className="bg-[#006A56] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#00856D] active:bg-[#005544] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
              >
                {action.buttonText}
              </button>
            )}
            
            {action.type === 'button' && action.celebration && (
              <div className="relative" onMouseEnter={handleCelebrationHover}>
                {/* Confetti Animation */}
                {showConfetti && (
                  <div key={confettiKey} className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 animate-confetti"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: '-10px',
                          backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCF7F', '#A78BFA'][i % 5],
                          animationDelay: `${Math.random() * 0.5}s`,
                          animationDuration: `${2 + Math.random() * 1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {/* Celebration Card */}
                <div className="bg-gradient-to-br from-[#006A56] via-[#00856D] to-[#00A87E] rounded-2xl p-6 text-center shadow-lg">
                  {/* Success Icon */}
                  <div className="mb-4 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                        <span className="text-4xl">🎉</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Success Message */}
                  <h3 className="text-xl font-bold text-white mb-2">All Set!</h3>
                  <p className="text-white/90 text-sm mb-6">Your account is ready to go</p>
                  
                  {/* Enter Button */}
                  <button
                    onClick={handleAction}
                    disabled={disabled}
                    className="w-full bg-white text-[#006A56] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 active:bg-gray-100 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
                  >
                    {action.buttonText}
                  </button>
                </div>
              </div>
            )}
            
            {action.type === 'select' && (
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <select
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                    disabled={disabled}
                    className="w-full pl-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#006A56] focus:ring-2 focus:ring-[#006A56]/20 transition-all text-sm appearance-none"
                    style={{ paddingRight: '2.5rem' }}
                  >
                    <option value="">Select an option...</option>
                    {action.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <button
                  onClick={handleAction}
                  disabled={!selectValue || disabled}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all text-sm ${
                    selectValue && !disabled
                      ? 'bg-[#006A56] text-white hover:bg-[#00856D]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
