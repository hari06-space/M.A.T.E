import React, { useState } from 'react';
import { Shield, AlertTriangle, Check, X } from 'lucide-react';

interface SafetyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyReportModal: React.FC<SafetyReportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [targetType, setTargetType] = useState<'USER' | 'POST' | 'TRIP' | 'MESSAGE'>('USER');
  const [reason, setReason] = useState<string>('Harassment or unwelcome contact');
  const [details, setDetails] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const reportReasons = [
    'Harassment or unwelcome contact',
    'Suspicious travel plan or commercial solicitation',
    'Impersonation or fake traveler profile',
    'Inappropriate or offensive content',
    'Safety concern during travel planning'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-700 bg-[#0E1326] relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2 text-[#FF5E36] text-xs font-bold uppercase tracking-wider mb-2">
          <Shield className="w-4 h-4" />
          <span>Trust & Safety Center</span>
        </div>

        <h3 className="text-2xl font-black text-white">Submit Confidential Report</h3>
        <p className="text-xs text-slate-300 mt-1">
          Reports are reviewed by human moderators according to M.A.T.E. Community Guidelines.
        </p>

        {submitted ? (
          <div className="my-8 p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
            <Check className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="text-base font-bold text-white">Report Received</div>
            <div className="text-xs text-slate-300">
              Thank you. Our Trust & Safety team will review the flagged content promptly.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Report Category
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['USER', 'POST', 'TRIP', 'MESSAGE'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTargetType(type)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      targetType === type
                        ? 'bg-[#FF5E36] text-white border-[#FF5E36]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Primary Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5E36]"
              >
                {reportReasons.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Additional Context (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Provide specific details or links to aid investigation..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E36]"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Blocking is mutual: reporting also allows you to immediately block all future communications from this user.
              </span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5E36] to-[#E0287D] text-white font-bold text-xs shadow-glow-orange hover:opacity-95"
              >
                Submit Report to Safety Queue
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
