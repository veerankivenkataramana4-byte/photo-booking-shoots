import React, { useState } from 'react';
import { CreditCard, QrCode, Building, CheckCircle2, X, ShieldCheck } from 'lucide-react';

interface RazorpayModalProps {
  amount: number;
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  onSuccess: (paymentId: string, method: string) => void;
  onClose: () => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  amount,
  bookingCode,
  customerName,
  customerEmail,
  onSuccess,
  onClose
}) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('shootbook.client@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('921');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const mockPayId = `pay_rzp_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      onSuccess(mockPayId, `razorpay_${method}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12161f] border border-slate-700 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Razorpay Header with Navy & Gold theme */}
        <div className="bg-[#0b1329] p-4 text-white border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3395ff] flex items-center justify-center font-bold text-white text-xs">
              RZP
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300">ShootBook Visual Studios</div>
              <div className="text-[11px] text-slate-400">Booking #{bookingCode}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Payable</div>
            <div className="font-cinzel text-lg font-bold text-[#d4af37] tabular-nums">
              ₹{amount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Test Mode Banner */}
        <div className="bg-amber-950/40 border-b border-amber-900/50 px-4 py-2 flex items-center justify-between text-[11px] text-amber-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Razorpay Sandbox / Test Mode Active</span>
          </div>
          <span className="font-mono text-[10px] bg-amber-900/50 px-1.5 py-0.5 rounded">DEMO GATEWAY</span>
        </div>

        {/* Tab selection */}
        <div className="grid grid-cols-3 border-b border-slate-800 text-xs">
          <button
            onClick={() => setMethod('upi')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              method === 'upi'
                ? 'text-[#d4af37] border-b-2 border-[#d4af37] bg-[#161c28]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>UPI / QR</span>
          </button>
          <button
            onClick={() => setMethod('card')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              method === 'card'
                ? 'text-[#d4af37] border-b-2 border-[#d4af37] bg-[#161c28]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Card</span>
          </button>
          <button
            onClick={() => setMethod('netbanking')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              method === 'netbanking'
                ? 'text-[#d4af37] border-b-2 border-[#d4af37] bg-[#161c28]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>NetBanking</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4">
          {method === 'upi' && (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-white rounded-xl inline-block shadow-md">
                {/* Simulated QR code box */}
                <div className="w-36 h-36 border-4 border-black border-dashed flex flex-col items-center justify-center p-2 text-black">
                  <QrCode className="w-16 h-16 text-black" />
                  <span className="text-[10px] font-bold mt-1">SCAN VIA ANY UPI APP</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-300">Scan using GPay, PhonePe, Paytm, or CRED</p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="flex-1 bg-[#0a0d13] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#d4af37]"
                    placeholder="Enter UPI VPA"
                  />
                </div>
              </div>
            </div>
          )}

          {method === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-[#0a0d13] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#d4af37] font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Expiry MM/YY</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-[#0a0d13] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#d4af37] font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full bg-[#0a0d13] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#d4af37] font-mono"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Pre-filled with Razorpay test card credentials.</p>
            </div>
          )}

          {method === 'netbanking' && (
            <div className="space-y-3">
              <label className="text-[11px] text-slate-400 block mb-1">Select Bank</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      selectedBank === bank
                        ? 'bg-[#162032] border-[#d4af37] text-white font-semibold'
                        : 'bg-[#0a0d13] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pay Button */}
          <div className="pt-2">
            <button
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#c5a059] hover:shadow-lg hover:shadow-amber-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Processing Test Payment...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pay ₹{amount.toLocaleString('en-IN')} (Simulate Success)</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full text-center text-xs text-slate-400 hover:text-white pt-1"
          >
            Cancel and Return
          </button>
        </div>
      </div>
    </div>
  );
};
