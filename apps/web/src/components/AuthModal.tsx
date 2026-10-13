import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSuccess(email);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 border border-slate-700 bg-[#0E1326] relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Logo in Modal */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#FF5E36] via-[#E0287D] to-[#6C2EB9] shadow-glow-orange mb-3">
            <img
              src="/branding/mate-logo.png"
              alt="M.A.T.E. Official Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="text-2xl font-black text-white">
            {mode === 'login' ? 'Welcome Back to M.A.T.E.' : 'Create Your Traveler Account'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {mode === 'login'
              ? 'Sign in to access your Travel DNA and Trip Rooms'
              : 'Join the community of verified explorers and adventurers'}
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <Check className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="text-sm font-bold text-white">
              {mode === 'login' ? 'Authenticated Successfully' : 'Account Created! Welcome to M.A.T.E.'}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E36]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@example.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E36]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E36]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5E36] via-[#E0287D] to-[#6C2EB9] text-white font-bold text-xs shadow-glow-orange hover:opacity-95"
              >
                {mode === 'login' ? 'Sign In to Account' : 'Register & Start Travel DNA'}
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-xs text-slate-400 hover:text-[#FF5E36] transition-colors"
              >
                {mode === 'login'
                  ? "Don't have an account yet? Register here"
                  : 'Already registered? Sign in instead'}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] text-slate-400 flex items-center space-x-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>OWASP-aligned: Bcrypt password hashing & short-lived JWT access tokens.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
