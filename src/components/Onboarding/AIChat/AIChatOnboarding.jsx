import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAppState } from '../../../contexts/AppStateContext';
import ChatBubble from './ChatBubble';
import { getOnboardingFlow } from './OnboardingSteps';

const AIChatOnboarding = () => {
  const { userData, saveUserData, completeOnboarding, setOnboardingStep } = useAppState();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [collectedData, setCollectedData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const processedStepRef = useRef(-1); // Track which step has been processed

  const onboardingFlow = getOnboardingFlow(userData.userName || 'there');

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const showNextStep = async () => {
    // Prevent duplicate processing of the same step
    if (processedStepRef.current === currentStepIndex) {
      return;
    }
    
    if (currentStepIndex >= onboardingFlow.length) {
      completeOnboarding();
      return;
    }

    processedStepRef.current = currentStepIndex; // Mark this step as being processed

    const step = onboardingFlow[currentStepIndex];
    setIsTyping(true);

    // Show typing indicator briefly
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsTyping(false);

    // Add AI messages sequentially
    for (let i = 0; i < step.aiMessages.length; i++) {
      let messageText = step.aiMessages[i];
      
      // Handle dynamic messages (functions)
      if (typeof messageText === 'function') {
        messageText = messageText(collectedData);
      }

      setMessages(prev => [...prev, { 
        text: messageText, 
        isUser: false,
        timestamp: Date.now() + i,
        action: i === step.aiMessages.length - 1 ? step.userAction : null, // Add action to last message
        attachments: i === step.aiMessages.length - 1 ? step.attachments : null, // Add attachments to last message
      }]);

      // Delay between messages
      if (i < step.aiMessages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }

    // Handle auto-advance steps
    if (step.userAction.type === 'auto') {
      await new Promise(resolve => setTimeout(resolve, step.userAction.delay));
      setCurrentStepIndex(prev => prev + 1);
    } else if (step.userAction.type === 'input') {
      // Auto-focus input for keyboard entry
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  // Initialize and watch for step changes
  useEffect(() => {
    showNextStep();
  }, [currentStepIndex]);

  const handleUserResponse = async (value) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    const step = onboardingFlow[currentStepIndex];

    // Validate input if validation function exists
    if (step.userAction.validation && !step.userAction.validation(value)) {
      setIsProcessing(false);
      return;
    }

    // Add user message to chat
    if (value && step.userAction.type !== 'button') {
      setMessages(prev => [...prev, { 
        text: value, 
        isUser: true,
        timestamp: Date.now(),
      }]);
    } else if (step.userAction.type === 'button' && step.userAction.value !== 'complete') {
      setMessages(prev => [...prev, { 
        text: step.userAction.buttonText, 
        isUser: true,
        timestamp: Date.now(),
      }]);
    }

    // Save collected data
    if (step.userAction.dataKey) {
      const newData = { ...collectedData, [step.userAction.dataKey]: value };
      setCollectedData(newData);
      saveUserData(newData);
    }

    // Clear input
    setInputValue('');

    // Move to next step
    await new Promise(resolve => setTimeout(resolve, 300));
    setCurrentStepIndex(prev => prev + 1);
    setIsProcessing(false);
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      // Reset the processed step ref to allow re-rendering
      processedStepRef.current = currentStepIndex - 2;
      
      // Remove last messages and go back
      setCurrentStepIndex(prev => prev - 1);
      setMessages(prev => {
        // Find where the previous step's messages start
        const stepMessages = onboardingFlow[currentStepIndex - 1].aiMessages.length;
        return prev.slice(0, -stepMessages - 1); // Remove AI messages and user response
      });
    } else {
      setOnboardingStep('account');
    }
  };

  const currentStep = onboardingFlow[currentStepIndex];
  const totalSteps = onboardingFlow.length;
  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className="h-full flex flex-col bg-[#F5F5F5] relative">
      {/* Header */}
      <div className="bg-white">
        <div className="flex items-center justify-between px-4 pt-14 pb-3">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1"></div> {/* Spacer for alignment */}
          <div className="w-9"></div> {/* Spacer for alignment */}
        </div>
        
        {/* Segmented Progress Bar - Full Bleed */}
        <div className="flex gap-[2px] h-1 bg-gray-200">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className="flex-1 h-full bg-gray-200"
            >
              <div
                className={`h-full transition-all duration-300 ease-out ${
                  index <= currentStepIndex
                    ? 'bg-[#006A56] w-full'
                    : 'bg-transparent'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 pb-24"
      >
        {messages.map((message, index) => (
          <ChatBubble
            key={message.timestamp || index}
            message={message.text}
            isUser={message.isUser}
            action={message.action}
            attachments={message.attachments}
            onAction={handleUserResponse}
            disabled={isProcessing}
          />
        ))}
        
        {isTyping && <ChatBubble isTyping={true} />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Bar at Bottom - Functional for input actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        {currentStep && currentStep.userAction.type === 'input' ? (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border-2 border-[#006A56]">
            <input
              ref={inputRef}
              type={currentStep.userAction.inputType || 'text'}
              inputMode={currentStep.userAction.inputType === 'tel' ? 'tel' : 'text'}
              placeholder={currentStep.userAction.placeholder || 'Type a message...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && inputValue.trim() && !isProcessing) {
                  handleUserResponse(inputValue);
                }
              }}
              disabled={isProcessing}
              className="flex-1 bg-transparent border-none outline-none text-gray-900 text-sm placeholder:text-gray-400"
            />
            <button
              onClick={() => handleUserResponse(inputValue)}
              disabled={!inputValue.trim() || isProcessing}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                inputValue.trim() && !isProcessing
                  ? 'bg-[#006A56] text-white'
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100">
            <input
              type="text"
              placeholder="Type a message..."
              disabled
              className="flex-1 bg-transparent border-none outline-none text-gray-400 text-sm"
            />
            <div className="w-6 h-6 rounded-full bg-gray-300"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatOnboarding;
