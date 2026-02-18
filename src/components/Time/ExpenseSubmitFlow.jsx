import React, { useState, useRef, useEffect, useMemo } from 'react';
import { X, Image, Camera, CheckCircle, Loader2, ChevronDown, Receipt, ArrowLeft } from 'lucide-react';
import receiptThumbUrl from '../../assets/receipt-thumb.png';

const STEPS = { choice: 1, camera: 2, details: 3, success: 4 };

// Mock receipt thumbnail (restaurant receipt image)
const MOCK_RECEIPT_THUMB = receiptThumbUrl;

// Mock submitted expense history (status: approved | pending | rejected)
const MOCK_SUBMITTED_EXPENSES = [
  { id: 1, vendor: 'Office Depot', description: 'Office supplies', amount: 45.90, date: '2026-02-09', customer: 'Evergreen Apartments', status: 'pending', thumbnailUrl: MOCK_RECEIPT_THUMB },
  { id: 2, vendor: 'Home Depot', description: 'Roofing materials', amount: 312.50, date: '2026-02-08', customer: 'Evergreen Apartments', status: 'approved', thumbnailUrl: MOCK_RECEIPT_THUMB },
  { id: 3, vendor: 'Staples', description: 'Printer paper, pens', amount: 28.00, date: '2026-02-07', customer: 'Metro Office LLC', status: 'rejected', thumbnailUrl: MOCK_RECEIPT_THUMB },
  { id: 4, vendor: 'Amazon', description: 'Safety equipment', amount: 89.99, date: '2026-02-06', customer: 'Evergreen Apartments', status: 'approved', thumbnailUrl: MOCK_RECEIPT_THUMB },
  { id: 5, vendor: 'Local Gas Co', description: 'Fuel', amount: 65.00, date: '2026-02-05', customer: 'Metro Office LLC', status: 'pending', thumbnailUrl: MOCK_RECEIPT_THUMB },
];

// Mock AI-generated receipt details (all fields required for display)
const mockReceiptDetails = {
  vendor: 'Office Depot',
  category: 'Office supplies',
  description: 'Printer paper, pens, folders',
  price: '$42.50',
  tax: '$3.40',
  total: '$45.90',
  purchaseDate: 'Feb 6, 2026',
  receiptNumber: 'OD-88472',
  submitDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  merchantAddress: '1250 Broadway, New York, NY 10001',
  paymentMethod: 'Visa •••• 4242',
  currency: 'USD',
};

const ExpenseSubmitFlow = ({ onClose }) => {
  const [step, setStep] = useState(STEPS.choice);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const [analyzingReceipt, setAnalyzingReceipt] = useState(false);
  const [expenses] = useState(MOCK_SUBMITTED_EXPENSES);
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'amount'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'
  const [filterCustomer, setFilterCustomer] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarExiting, setSnackbarExiting] = useState(false);
  const libraryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const customers = useMemo(() => [...new Set(expenses.map((e) => e.customer))].sort(), [expenses]);
  const sortedAndFilteredExpenses = useMemo(() => {
    let list = filterCustomer ? expenses.filter((e) => e.customer === filterCustomer) : [...expenses];
    list = [...list].sort((a, b) => {
      const aVal = sortBy === 'date' ? new Date(a.date) : a.amount;
      const bVal = sortBy === 'date' ? new Date(b.date) : b.amount;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [expenses, sortBy, sortOrder, filterCustomer]);

  useEffect(() => {
    if (!analyzingReceipt) return;
    const t = setTimeout(() => setAnalyzingReceipt(false), 2000);
    return () => clearTimeout(t);
  }, [analyzingReceipt]);

  const handleOpenLibrary = () => {
    libraryInputRef.current?.click();
  };

  const handleTakePhoto = () => {
    setStep(STEPS.camera);
  };

  const handleCapturePhoto = () => {
    cameraInputRef.current?.click();
  };

  const handleFileSelected = (e, source) => {
    const file = e.target.files?.[0];
    if (file) {
      e.target.value = '';
      if (selectedImageUrl) URL.revokeObjectURL(selectedImageUrl);
      setSelectedImageUrl(URL.createObjectURL(file));
      setStep(STEPS.details);
      if (source === 'library') setAnalyzingReceipt(true);
    }
  };

  const handleSubmit = () => {
    setStep(STEPS.success);
    setShowSnackbar(true);
    setSnackbarExiting(false);
    setTimeout(() => setSnackbarExiting(true), 2000);
    setTimeout(() => {
      setShowSnackbar(false);
      setSnackbarExiting(false);
    }, 2300);
  };

  const handleClose = () => {
    if (selectedImageUrl) URL.revokeObjectURL(selectedImageUrl);
    setSelectedImageUrl(null);
    onClose();
  };

  const handleBack = () => {
    if (step === STEPS.camera) setStep(STEPS.choice);
    else if (step === STEPS.details) setStep(STEPS.camera);
    else if (step === STEPS.success) setStep(STEPS.details);
  };

  // Step 1: Bottom sheet (Add receipt options)
  if (step === STEPS.choice) {
    return (
      <>
        <input
          ref={libraryInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileSelected(e, 'library')}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFileSelected(e, 'camera')}
        />
        <div className="absolute inset-0 z-50 flex flex-col justify-end items-stretch">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleClose}
            aria-hidden
          />
          <div
            className="relative w-full bg-white rounded-t-3xl shadow-lg flex flex-col flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>
            <div className="px-4 pb-3">
              <h2 className="text-xl font-semibold text-gray-900">Add receipt</h2>
              <p className="text-gray-600 text-sm mt-1">Choose how to add your receipt</p>
            </div>
            <div className="px-4 pb-6">
              <button
                onClick={handleOpenLibrary}
                className="w-full flex items-center gap-3 py-3 text-left transition-colors active:opacity-70"
              >
                <Image size={22} style={{ color: '#006A56' }} className="flex-shrink-0" />
                <span className="font-medium text-gray-900">Open photo library</span>
              </button>
              <button
                onClick={handleTakePhoto}
                className="w-full flex items-center gap-3 py-3 text-left transition-colors active:opacity-70 border-t border-gray-100"
              >
                <Camera size={22} style={{ color: '#006A56' }} className="flex-shrink-0" />
                <span className="font-medium text-gray-900">Take photo</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Steps 2–4: Full-screen overlay within frame
  return (
    <div className="absolute inset-0 z-50 bg-[#E2E9ED] flex flex-col">
      <input
        ref={libraryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileSelected(e, 'library')}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFileSelected(e, 'camera')}
      />
      <div className="flex-shrink-0 flex items-center justify-between px-4 pt-14 pb-4 relative" style={{ backgroundColor: '#21262A' }}>
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="absolute left-0 right-0 text-xl font-semibold text-white text-center pointer-events-none">
          Expenses
        </h1>
        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Receipt photo preview overlay */}
      {showPhotoPreview && selectedImageUrl && (
        <div
          className="absolute inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={() => setShowPhotoPreview(false)}
        >
          <div className="flex-1 min-h-0 w-full flex items-center justify-center">
            <img
              src={selectedImageUrl}
              alt="Receipt"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <button
            onClick={() => setShowPhotoPreview(false)}
            className="mt-4 px-6 py-2 rounded-full text-white font-medium bg-white/20"
          >
            Close
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Step 2: Camera - capture photo */}
        {step === STEPS.camera && (
          <div className="space-y-6">
            <p className="text-gray-600 text-sm">Position the receipt in frame, then capture.</p>
            <div className="aspect-[4/3] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
              Camera view
            </div>
            <button
              onClick={handleCapturePhoto}
              className="w-full py-3 rounded-xl text-white font-semibold"
              style={{ backgroundColor: '#006A56' }}
            >
              Capture photo
            </button>
          </div>
        )}

        {/* Step 3: AI-generated receipt details */}
        {step === STEPS.details && (
          <div className="space-y-6">
            {analyzingReceipt ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 size={48} className="animate-spin text-[#006A56] mb-4" />
                <p className="text-gray-600 text-sm font-medium">Analyzing receipt...</p>
                <p className="text-gray-500 text-xs mt-1">AI is extracting expense details</p>
              </div>
            ) : (
              <>
            <p className="text-gray-600 text-sm">AI-generated details from your receipt</p>

            {/* 1. Vendor details */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Vendor details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Vendor', value: mockReceiptDetails.vendor },
                  { label: 'Merchant address', value: mockReceiptDetails.merchantAddress, wrap: true },
                  { label: 'Payment method', value: mockReceiptDetails.paymentMethod },
                  { label: 'Currency', value: mockReceiptDetails.currency },
                ].map(({ label, value, wrap }) => (
                  <div key={label} className="flex justify-between items-start gap-3">
                    <span className="text-gray-600 flex-shrink-0">{label}</span>
                    <span className={`font-medium text-gray-900 text-right ${wrap ? 'max-w-[60%] min-w-0' : 'flex-shrink-0'}`}>
                      {value ?? '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Expense details */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Expense details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Category', value: mockReceiptDetails.category },
                  { label: 'Description', value: mockReceiptDetails.description, wrap: true },
                  { label: 'Subtotal', value: mockReceiptDetails.price },
                  { label: 'Tax', value: mockReceiptDetails.tax },
                  { label: 'Total', value: mockReceiptDetails.total, highlight: true },
                  { label: 'Purchase date', value: mockReceiptDetails.purchaseDate },
                  { label: 'Submit date', value: mockReceiptDetails.submitDate },
                ].map(({ label, value, highlight, wrap }) => (
                  <div key={label} className="flex justify-between items-start gap-3">
                    <span className="text-gray-600 flex-shrink-0">{label}</span>
                    <span className={`font-medium text-gray-900 text-right ${highlight ? 'font-semibold' : ''} ${wrap ? 'max-w-[60%] min-w-0' : 'flex-shrink-0'}`}>
                      {value ?? '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl text-white font-semibold"
              style={{ backgroundColor: '#006A56' }}
            >
              Submit expense
            </button>
              </>
            )}
          </div>
        )}

        {/* Step 4: Expense list (submitted history) */}
        {step === STEPS.success && (
          <div className="space-y-4 pb-6">
            {/* Sort & filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-600 text-sm">Sort:</span>
              <button
                onClick={() => { setSortBy('date'); setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc')); }}
                className="px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{ backgroundColor: sortBy === 'date' ? 'rgba(0, 106, 86, 0.12)' : '#e5e7eb', color: sortBy === 'date' ? '#006A56' : undefined }}
              >
                Date {sortOrder === 'desc' ? '↓' : '↑'}
              </button>
              <button
                onClick={() => { setSortBy('amount'); setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc')); }}
                className="px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{ backgroundColor: sortBy === 'amount' ? 'rgba(0, 106, 86, 0.12)' : '#e5e7eb', color: sortBy === 'amount' ? '#006A56' : undefined }}
              >
                Amount {sortOrder === 'desc' ? '↓' : '↑'}
              </button>
              <select
                value={filterCustomer}
                onChange={(e) => setFilterCustomer(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 bg-white text-gray-900"
              >
                <option value="">All customers</option>
                {customers.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {/* Expense cards */}
            <div className="space-y-3">
              {sortedAndFilteredExpenses.map((exp) => (
                <ExpenseCard key={exp.id} exp={exp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Snackbar: "Expense submitted successfully" — show 2s then slide down and disappear */}
      {showSnackbar && (
        <div
          className={`absolute bottom-6 left-4 right-4 py-3 px-4 rounded-xl text-white text-sm font-medium text-center shadow-lg transition-transform duration-300 ease-out ${
            snackbarExiting ? 'translate-y-full' : 'translate-y-0'
          }`}
          style={{ backgroundColor: '#21262A' }}
          role="status"
        >
          Expense submitted successfully
        </div>
      )}
    </div>
  );
}

function ExpenseCard({ exp }) {
  const [imgError, setImgError] = useState(false);
  const showImg = exp.thumbnailUrl && !imgError;
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{exp.vendor}</p>
          <p className="text-sm text-gray-500 truncate">{exp.description}</p>
          <p className="text-xs text-gray-400 mt-0.5">{exp.date} · {exp.customer}</p>
        </div>
        <p className="font-semibold text-gray-900 flex-shrink-0">${exp.amount.toFixed(2)}</p>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
            exp.status === 'approved' ? 'bg-[#C7F5DB] text-[#006A56]' :
            exp.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
          }`}
        >
          {exp.status}
        </span>
        <div className="w-6 h-6 rounded overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
          {showImg ? (
            <img
              src={exp.thumbnailUrl}
              alt=""
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <Receipt size={14} className="text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseSubmitFlow;
