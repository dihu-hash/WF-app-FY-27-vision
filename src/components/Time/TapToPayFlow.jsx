import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronRight, Wifi, CreditCard, ScanLine, Banknote, Wallet } from 'lucide-react';
import FlowHeader from './FlowHeader';
import { invoices, currentJob } from '../../data/mockData';

const STEPS = {
  invoiceSelection: 0,
  takePayment: 1,
  loading: 2,
  holdToPay: 3,
  authorizing: 4,
  done: 5,
};

const MOCK_BUSINESS_NAME = 'QB business name';

const TapToPayFlow = ({ onClose, onPaymentComplete }) => {
  const [step, setStep] = useState(STEPS.invoiceSelection);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [customerName, setCustomerName] = useState('');

  const jobInvoices = useMemo(
    () => invoices.filter((inv) => inv.customer === currentJob.customer),
    []
  );

  const totalSelected = useMemo(() => {
    return jobInvoices
      .filter((inv) => selectedIds.has(inv.id))
      .reduce((sum, inv) => sum + inv.amount, 0);
  }, [jobInvoices, selectedIds]);

  const allSelected = jobInvoices.length > 0 && selectedIds.size === jobInvoices.length;

  const toggleInvoice = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(jobInvoices.map((inv) => inv.id)));
  };

  const goToTakePayment = () => {
    setPaymentAmount(totalSelected);
    setCustomerName(currentJob.customer);
    setStep(STEPS.takePayment);
  };

  // Auto-advance loading → holdToPay
  useEffect(() => {
    if (step === STEPS.loading) {
      const t = setTimeout(() => setStep(STEPS.holdToPay), 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  // Auto-advance authorizing → done
  useEffect(() => {
    if (step === STEPS.authorizing) {
      const t = setTimeout(() => setStep(STEPS.done), 2000);
      return () => clearTimeout(t);
    }
  }, [step]);

  // On Done: notify payment complete, then auto-close
  useEffect(() => {
    if (step === STEPS.done) {
      onPaymentComplete?.();
      const t = setTimeout(onClose, 1800);
      return () => clearTimeout(t);
    }
  }, [step, onClose, onPaymentComplete]);

  // Auto-advance holdToPay → authorizing (simulate tap after 2.5s)
  useEffect(() => {
    if (step !== STEPS.holdToPay) return;
    const t = setTimeout(() => setStep(STEPS.authorizing), 2500);
    return () => clearTimeout(t);
  }, [step]);

  const handleTapToPay = () => {
    setStep(STEPS.loading);
  };

  const handleHoldCancel = () => {
    onClose();
  };

  const getHeaderTitle = () => {
    if (step === STEPS.invoiceSelection) return `Select invoices to pay (${jobInvoices.length})`;
    if (step === STEPS.takePayment) return 'Take payment';
    if (step === STEPS.loading) return 'Take payment';
    if (step === STEPS.holdToPay) return 'Take payment';
    if (step === STEPS.authorizing) return 'Take payment';
    if (step === STEPS.done) return 'Take payment';
    return 'Take payment';
  };

  const getOnBack = () => {
    if (step === STEPS.invoiceSelection) return onClose;
    if (step === STEPS.takePayment) return () => setStep(STEPS.invoiceSelection);
    return onClose;
  };

  const formatAmount = (n) =>
    `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="absolute inset-0 z-50 bg-[#E2E9ED] flex flex-col">
      <FlowHeader title={getHeaderTitle()} onBack={getOnBack()} onClose={onClose} />

      <div className="flex-1 overflow-auto flex flex-col min-h-0">
        {/* Step 0: Invoice selection */}
        {step === STEPS.invoiceSelection && (
          <div className="p-4 bg-[#E2E9ED]">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-5 h-5 rounded-lg border-gray-300 accent-[#006A56] focus:ring-[#006A56]"
                  />
                  <span className="font-medium text-gray-900">Select all</span>
                </label>
              </div>
              <div className="divide-y divide-gray-100">
                {jobInvoices.map((inv) => (
                  <label
                    key={inv.id}
                    className="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50/80"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.has(inv.id)}
                      onChange={() => toggleInvoice(inv.id)}
                      className="w-5 h-5 rounded-lg border-gray-300 accent-[#006A56] focus:ring-[#006A56]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">#{inv.invoiceNumber}</p>
                      <p className="text-sm text-gray-500">
                        Due in {inv.dueInDays} days · {inv.status}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900">{formatAmount(inv.amount)}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={goToTakePayment}
              disabled={selectedIds.size === 0}
              className="mt-6 w-full py-4 rounded-2xl font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: selectedIds.size === 0 ? '#9CA3AF' : '#006A56' }}
            >
              Charge {formatAmount(totalSelected)}
            </button>
          </div>
        )}

        {/* Step 1: Take payment */}
        {step === STEPS.takePayment && (
          <div className="flex-1 bg-[#E2E9ED] px-4 pt-6 pb-8">
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
              <p className="text-gray-600 text-sm">{customerName}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{formatAmount(paymentAmount)}</p>
              <button
                type="button"
                onClick={handleTapToPay}
                className="w-full flex items-center justify-center gap-3 py-4 px-4 rounded-2xl text-white font-medium mt-4"
                style={{ backgroundColor: '#006A56' }}
              >
                <Wifi size={24} className="flex-shrink-0" />
                Tap to Pay on iPhone
              </button>
            </div>
            <div className="space-y-0">
              <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
                {[
                  { label: 'Card reader', icon: CreditCard },
                  { label: 'Scan or key-in card', icon: ScanLine },
                  { label: 'Record check', icon: Banknote },
                  { label: 'Record cash', icon: Wallet },
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    className="w-full flex items-center justify-between py-4 px-4 text-gray-900 text-left"
                  >
                    <span className="font-medium">{label}</span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 & 4: Loading / Authorizing */}
        {(step === STEPS.loading || step === STEPS.authorizing) && (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#E2E9ED] px-4">
            <div className="flex gap-2 mb-4">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full bg-[#006A56] animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-gray-600">
              {step === STEPS.loading ? 'Loading...' : 'Authorizing payment...'}
            </p>
          </div>
        )}

        {/* Step 3: Hold Here to Pay */}
        {step === STEPS.holdToPay && (
          <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)`,
                }}
              />
              {[...Array(24)].map((_, i) => (
                <span
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-blue-400 opacity-60 animate-pulse"
                  style={{
                    left: `${15 + (i % 6) * 18}%`,
                    top: `${10 + Math.floor(i / 6) * 15}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
            <div className="relative z-10 flex flex-col flex-1 items-center justify-between py-14 px-4">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-10 h-10 text-white"
                  >
                    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeLinecap="round" />
                    <path
                      d="M5.64 5.64l2.83 2.83m7.06 7.06l2.83 2.83M5.64 18.36l2.83-2.83m7.06-7.06l2.83-2.83"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Hold Here to Pay</h2>
              </div>
              <div className="w-full max-w-[280px] rounded-2xl bg-gray-800/90 px-6 py-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center mb-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-6 h-6 text-amber-900"
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </div>
                <p className="text-white font-medium">{MOCK_BUSINESS_NAME}</p>
                <p className="text-2xl font-bold text-white mt-1">{formatAmount(paymentAmount)}</p>
              </div>
              <button
                type="button"
                onClick={handleHoldCancel}
                className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center"
                aria-label="Cancel"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Done */}
        {step === STEPS.done && (
          <div className="flex-1 min-h-full flex flex-col items-center justify-center bg-[#21262A] px-4">
            <div className="w-20 h-20 rounded-full border-4 border-[#006A56] flex items-center justify-center mb-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="w-10 h-10 text-white"
              >
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-white mb-8">Done</p>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-full text-white font-semibold"
              style={{ backgroundColor: '#006A56' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TapToPayFlow;
