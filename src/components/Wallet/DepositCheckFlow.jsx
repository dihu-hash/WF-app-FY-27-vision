import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import FlowHeader from '../Time/FlowHeader';

const STEPS = {
  amount: 0,
  scanFront: 1,
  scanBack: 2,
  processing: 3,
  preview: 4,
  complete: 5,
};

const MAX_AMOUNT = 2500;
const DEPOSIT_TO_LABEL = 'Workforce Balance (**1234)';

// Mock captured image: use reference check image (no file picker)
const MOCK_CHECK_IMAGE = '/check-scan-reference.png';

const formatAmount = (value) => {
  const num = parseFloat(value) || 0;
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const DepositCheckFlow = ({ onClose }) => {
  const [step, setStep] = useState(STEPS.amount);
  const [amountStr, setAmountStr] = useState('');
  const [frontImageUrl, setFrontImageUrl] = useState(null);
  const [backImageUrl, setBackImageUrl] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [initiatedOn, setInitiatedOn] = useState(null);
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);

  const amountNum = parseFloat(amountStr) || 0;
  const amountValid = amountNum > 0 && amountNum <= MAX_AMOUNT;

  const handleKeypad = (key) => {
    if (key === 'backspace') {
      setAmountStr((s) => s.slice(0, -1));
      return;
    }
    if (key === '.') {
      if (amountStr.includes('.')) return;
      setAmountStr((s) => (s === '' ? '0.' : s + '.'));
      return;
    }
    if (key >= '0' && key <= '9') {
      const next = amountStr + key;
      const parsed = parseFloat(next);
      if (Number.isNaN(parsed) || parsed > MAX_AMOUNT) return;
      if (next.split('.')[1]?.length > 2) return;
      setAmountStr(next);
    }
  };

  const clearAmount = () => {
    setAmountStr('');
  };

  const handleFileSelected = (e, side) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (side === 'front') {
      revokeIfBlob(frontImageUrl);
      setFrontImageUrl(url);
      setStep(STEPS.scanBack);
    } else {
      revokeIfBlob(backImageUrl);
      setBackImageUrl(url);
      setStep(STEPS.processing);
    }
    e.target.value = '';
  };

  const handleMockCapture = (side) => {
    if (side === 'front') {
      setFrontImageUrl(MOCK_CHECK_IMAGE);
      setStep(STEPS.scanBack);
    } else {
      setBackImageUrl(MOCK_CHECK_IMAGE);
      setStep(STEPS.processing);
    }
  };

  const revokeIfBlob = (url) => {
    if (url && typeof url === 'string' && url.startsWith('blob:')) URL.revokeObjectURL(url);
  };

  const resetForAnother = () => {
    revokeIfBlob(frontImageUrl);
    revokeIfBlob(backImageUrl);
    setAmountStr('');
    setFrontImageUrl(null);
    setBackImageUrl(null);
    setTransactionId(null);
    setInitiatedOn(null);
    setStep(STEPS.amount);
  };

  useEffect(() => {
    if (step === STEPS.processing) {
      const t = setTimeout(() => setStep(STEPS.preview), 2000);
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    return () => {
      revokeIfBlob(frontImageUrl);
      revokeIfBlob(backImageUrl);
    };
  }, [frontImageUrl, backImageUrl]);

  const getHeaderTitle = () => {
    if (step === STEPS.scanFront) return 'Scan front of check';
    if (step === STEPS.scanBack) return 'Scan back of check';
    if (step === STEPS.processing) return 'Deposit a check';
    if (step === STEPS.preview) return 'Deposit a check';
    if (step === STEPS.complete) return 'Balance Summary';
    return 'Deposit a check';
  };

  const getOnBack = () => {
    if (step === STEPS.scanFront) return onClose;
    if (step === STEPS.scanBack) return () => setStep(STEPS.scanFront);
    if (step === STEPS.processing) return () => setStep(STEPS.scanBack);
    if (step === STEPS.preview) return () => setStep(STEPS.scanBack);
    if (step === STEPS.complete) return onClose;
    return onClose;
  };

  const handleConfirmDeposit = () => {
    setInitiatedOn(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    setTransactionId('123X4PLM09');
    setStep(STEPS.complete);
  };

  // Step 0: Amount bottom sheet
  if (step === STEPS.amount) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col justify-end items-stretch">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
        <div
          className="relative w-full bg-white rounded-t-3xl shadow-lg flex flex-col flex-shrink-0 max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-gray-300" />
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-8">
            <div className="pb-4">
              <h2 className="text-xl font-semibold text-gray-900">Check amount</h2>
              <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <span className="text-xl font-semibold text-gray-900">
                  {amountStr === '' ? '$0.00' : formatAmount(amountStr)}
                </span>
                {amountStr !== '' && (
                  <button
                    type="button"
                    onClick={clearAmount}
                    className="p-1 rounded-full hover:bg-gray-200"
                    aria-label="Clear"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">Max deposit amount: $2,500 per day</p>
              <button
                type="button"
                disabled={!amountValid}
                onClick={() => setStep(STEPS.scanFront)}
                className="w-full mt-4 py-3 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: amountValid ? '#006A56' : '#9CA3AF' }}
              >
                Continue
              </button>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleKeypad(key)}
                    className="py-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 font-medium text-gray-900"
                  >
                    {key === 'backspace' ? (
                      <span className="text-lg font-medium">⌫</span>
                    ) : (
                      key
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Steps 1–5: Full-screen overlay with FlowHeader
  return (
    <div className="absolute inset-0 z-50 bg-[#E2E9ED] flex flex-col">
      <input
        ref={frontInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileSelected(e, 'front')}
      />
      <input
        ref={backInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileSelected(e, 'back')}
      />
      <FlowHeader title={getHeaderTitle()} onBack={getOnBack()} onClose={onClose} />

      <div className="flex-1 overflow-auto flex flex-col min-h-0">
        {/* Step 1: Scan front – mock camera view */}
        {step === STEPS.scanFront && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#1a1a1a]">
            <p className="text-white/90 text-sm text-center px-4 pt-4 pb-2 flex-shrink-0">
              Place check in frame on a dark background.
            </p>
            <div className="flex-shrink-0 overflow-hidden p-0">
              <img
                src="/check-scan-reference.png"
                alt="Check in frame"
                className="w-full h-[600px] object-contain"
              />
            </div>
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-4 pb-6 bg-black/80">
              <button
                type="button"
                onClick={getOnBack()}
                className="flex items-center gap-1 text-white text-sm font-medium"
              >
                <span className="text-lg leading-none">&lsaquo;</span>
                back
              </button>
              <button
                type="button"
                onClick={() => handleMockCapture('front')}
                className="w-16 h-16 rounded-full bg-white border-4 border-[#93C5FD] shadow-lg active:scale-95 transition-transform"
                aria-label="Take photo"
              />
              <button type="button" className="flex items-center gap-1 text-white text-sm font-medium">
                <span className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center text-sm">?</span>
                Help
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Scan back – mock camera view */}
        {step === STEPS.scanBack && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#1a1a1a]">
            <p className="text-white/90 text-sm text-center px-4 pt-4 pb-2 flex-shrink-0">
              Sign and write &quot;For deposit only at [Bank]&quot; on the back.
            </p>
            <div className="flex-shrink-0 overflow-hidden p-0">
              <img
                src="/check-scan-reference.png"
                alt="Check in frame"
                className="w-full h-[600px] object-contain"
              />
            </div>
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-4 pb-6 bg-black/80">
              <button
                type="button"
                onClick={getOnBack()}
                className="flex items-center gap-1 text-white text-sm font-medium"
              >
                <span className="text-lg leading-none">&lsaquo;</span>
                back
              </button>
              <button
                type="button"
                onClick={() => handleMockCapture('back')}
                className="w-16 h-16 rounded-full bg-white border-4 border-[#93C5FD] shadow-lg active:scale-95 transition-transform"
                aria-label="Take photo"
              />
              <button type="button" className="flex items-center gap-1 text-white text-sm font-medium">
                <span className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center text-sm">?</span>
                Help
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === STEPS.processing && (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="flex gap-2 mb-4">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full bg-[#006A56] animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-gray-900 font-semibold">Processing your check</p>
            <p className="text-gray-500 text-sm mt-1">We&apos;re checking the details on your check.</p>
          </div>
        )}

        {/* Step 4: Preview */}
        {step === STEPS.preview && (
          <div className="flex-1 px-4 py-6 pb-8 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Check amount</span>
                <button
                  type="button"
                  onClick={() => setStep(STEPS.amount)}
                  className="text-sm font-medium"
                  style={{ color: '#006A56' }}
                >
                  Edit amount
                </button>
              </div>
              <p className="text-xl font-bold text-gray-900 mt-1">{formatAmount(amountStr)}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-gray-500 mb-3">Check photos</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Front of check</p>
                  {frontImageUrl ? (
                    <img src={frontImageUrl} alt="Front" className="w-full aspect-[4/3] object-cover rounded-xl" />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Back of check</p>
                  {backImageUrl ? (
                    <img src={backImageUrl} alt="Back" className="w-full aspect-[4/3] object-cover rounded-xl" />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl" />
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">Deposit to</p>
              <p className="font-medium text-gray-900 mt-1">{DEPOSIT_TO_LABEL}</p>
              <p className="text-sm mt-2" style={{ color: '#006A56' }}>
                Funds should be available instantly
              </p>
            </div>
            <button
              type="button"
              onClick={handleConfirmDeposit}
              className="w-full py-3 rounded-xl text-white font-semibold"
              style={{ backgroundColor: '#006A56' }}
            >
              Confirm deposit
            </button>
          </div>
        )}

        {/* Step 5: Complete */}
        {step === STEPS.complete && (
          <div className="flex-1 min-h-full flex flex-col items-center justify-center bg-[#E2E9ED] px-4 py-8">
            <div className="w-20 h-20 rounded-full border-4 border-[#006A56] flex items-center justify-center mb-4 bg-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-10 h-10" style={{ color: '#006A56' }}>
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-gray-900 mb-6">Your deposit is complete</p>
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-4 space-y-3 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">CHECK AMOUNT</span>
                <span className="text-gray-900 font-medium">{formatAmount(amountStr)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">DEPOSIT TO</span>
                <span className="text-gray-900 font-medium">{DEPOSIT_TO_LABEL}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">INITIATED ON</span>
                <span className="text-gray-900 font-medium">{initiatedOn}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">STATUS</span>
                <span className="text-gray-900 font-medium">Complete, funds available for immediate use</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">TRANSACTION ID</span>
                <span className="text-gray-900 font-medium">{transactionId}</span>
              </div>
            </div>
            <div className="w-full max-w-sm mt-6 space-y-3">
              <button
                type="button"
                onClick={resetForAnother}
                className="w-full py-3 rounded-xl font-semibold border-2 bg-white text-gray-900"
                style={{ borderColor: '#006A56', color: '#006A56' }}
              >
                Deposit another check
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl text-white font-semibold"
                style={{ backgroundColor: '#006A56' }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositCheckFlow;
