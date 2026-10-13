import React from 'react';
import { Shield, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-slate-800/80 bg-[#0E1326] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#FF5E36] to-[#6C2EB9]">
                <img
                  src="/branding/mate-logo.png"
                  alt="M.A.T.E."
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white">M.A.T.E.</span>
                <span className="block text-[10px] text-[#FF5E36] font-bold tracking-widest uppercase">
                  Meeting Adventure Travel Escape
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              M.A.T.E. is a people-first social travel platform helping adventurers discover destinations, connect with compatible companions, and collaborate in verified Trip Rooms.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Architected with OWASP Top 10 security & privacy-by-design standards.</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Travel DNA Compatibility</li>
              <li>Collaborative Trip Rooms</li>
              <li>Canonical Destination Guides</li>
              <li>Staged Photo Similarity Search</li>
              <li>Trust & Moderation Queue</li>
            </ul>
          </div>

          {/* Safety & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Trust & Guidelines
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Community Conduct Playbook</li>
              <li>Privacy Policy & EXIF Scrubbing</li>
              <li>Terms of Service</li>
              <li>Report Suspicious Activity</li>
              <li>Emergency Guidelines</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} M.A.T.E. (Meeting Adventure Travel Escape). All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Built with precision for travelers worldwide</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FF5E36]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
