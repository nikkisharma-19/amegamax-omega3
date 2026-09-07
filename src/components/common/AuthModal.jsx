import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Phone, Mail, User as UserIcon } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, user, setUser, showToast } = useUI();
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [otp, setOtp] = useState('');

  if (!isAuthOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneOrEmail) {
      showToast('Please enter your mobile number or email', 'error');
      return;
    }
    setStep('otp');
    showToast('OTP sent to ' + phoneOrEmail + ' (Use 1234 for demo)', 'info');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '1234' && otp.length < 4) {
      showToast('Please enter a 4-digit OTP (demo: 1234)', 'error');
      return;
    }
    const loggedUser = {
      name: name || 'Valued Customer',
      contact: phoneOrEmail,
      isLoggedIn: true
    };
    setUser(loggedUser);
    setIsAuthOpen(false);
    showToast(`Welcome back, ${loggedUser.name}!`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthOpen(false);
    showToast('You have signed out successfully.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-amber-50">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Amega Max" className="w-8 h-8 object-contain rounded-full" />
            <span className="text-xl font-black text-[#7A0000]">
              Amega Max <span className="text-brand-pink text-xs uppercase font-bold">Pass</span>
            </span>
          </div>

          <button
            onClick={() => setIsAuthOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {user ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
                <p className="text-xs text-slate-500">{user.contact}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                <p>✓ Faster 1-Click Checkout Enabled</p>
                <p>✓ Exclusive Member Rewards & Coupons</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-red-50 text-red-600 font-bold text-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : step === 'input' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-800">Sign In / Sign Up</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your mobile number or email for instant OTP verification
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">
                  Full Name (Optional)
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">
                  Mobile Number / Email *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="+91 98765 43210 or you@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-pink hover:bg-brand-pinkHover text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                Send Verification OTP →
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 text-center pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Safe & Secure Passwordless Login</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-800">Verify OTP</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter 4-digit code sent to <span className="font-bold text-slate-700">{phoneOrEmail}</span>
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Demo OTP: 1234"
                  className="w-full text-center text-2xl tracking-widest font-black py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-pink hover:bg-brand-pinkHover text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                Verify & Continue →
              </button>

              <div className="flex justify-between items-center text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-slate-500 hover:text-slate-800"
                >
                  ← Change Number
                </button>
                <button
                  type="button"
                  onClick={() => showToast('New OTP sent: 1234', 'info')}
                  className="text-brand-blue font-bold hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
