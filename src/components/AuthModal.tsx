import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { X, Lock, Mail, User, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, loginDemoAdmin, loginDemoCustomer } = useAuth();
  const { showToast } = useBooking();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      await login(email, password);
      showToast('Logged in successfully.', 'success');
      onClose();
    } else if (mode === 'register') {
      await register(name, email, phone, password);
      showToast('Account registered successfully.', 'success');
      onClose();
    } else {
      setForgotSent(true);
      showToast('Password reset link dispatched.', 'info');
    }
  };

  const handleDemoAdmin = () => {
    loginDemoAdmin();
    showToast('Logged in as Studio Admin.', 'success');
    onClose();
  };

  const handleDemoCustomer = () => {
    loginDemoCustomer();
    showToast('Logged in as Rohit Verma (Customer).', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#10131a] border border-slate-700/80 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-white">
              {mode === 'login' ? 'Sign In to ShootBook' : mode === 'register' ? 'Create ShootBook Account' : 'Reset Your Password'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Access your reservation calendar, invoices, and cloud galleries.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Fast-Login Strip */}
        <div className="bg-[#151a24] p-4 border-b border-slate-800">
          <div className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Instant One-Click Test Accounts</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={handleDemoCustomer}
              className="p-2 rounded-lg bg-[#0d0f14] hover:bg-slate-800 border border-slate-700 text-left text-slate-200 transition-colors cursor-pointer"
            >
              <div className="font-semibold text-white">Rohit Verma</div>
              <div className="text-[10px] text-slate-400">Customer Role</div>
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="p-2 rounded-lg bg-[#0d0f14] hover:bg-slate-800 border border-amber-800/80 text-left text-amber-200 transition-colors cursor-pointer"
            >
              <div className="font-semibold text-[#d4af37]">Karan Mehra</div>
              <div className="text-[10px] text-slate-400">Studio Admin Role</div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Mehra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0d13] border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0d13] border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Phone / WhatsApp</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98000 11223"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0a0d13] border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}

          {mode !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-400">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-[#d4af37] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0d13] border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}

          {forgotSent && (
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Reset instructions have been sent to your email.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#e5c07b] hover:shadow-lg hover:shadow-amber-950/40 transition-all cursor-pointer"
          >
            {mode === 'login'
              ? 'Sign In'
              : mode === 'register'
              ? 'Register Account'
              : 'Send Reset Link'}
          </button>

          <div className="text-center text-xs text-slate-400 pt-2">
            {mode === 'login' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-[#d4af37] font-semibold hover:underline"
                >
                  Create one now
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setForgotSent(false);
                  }}
                  className="text-[#d4af37] font-semibold hover:underline"
                >
                  Sign in here
                </button>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
