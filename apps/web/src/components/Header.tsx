import React from 'react';
import { Compass, Users, MapPin, Sparkles, Shield, LogIn } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenReport
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-mate-cardBorder/60 bg-[#0E1326]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => setActiveTab('explore')}
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#FF5E36] via-[#E0287D] to-[#6C2EB9] shadow-glow-orange transition-transform duration-300 group-hover:scale-105">
            <img
              src="/branding/mate-logo.png"
              alt="M.A.T.E. Official Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              M.A.T.E.
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-[#FF5E36] uppercase -mt-1">
              Meeting Adventure Travel Escape
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'explore'
                ? 'bg-gradient-to-r from-[#FF5E36]/20 to-[#E0287D]/20 text-[#FF5E36] border border-[#FF5E36]/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'matches'
                ? 'bg-gradient-to-r from-[#FF5E36]/20 to-[#E0287D]/20 text-[#FF5E36] border border-[#FF5E36]/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Find Companions</span>
          </button>

          <button
            onClick={() => setActiveTab('trips')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'trips'
                ? 'bg-gradient-to-r from-[#FF5E36]/20 to-[#E0287D]/20 text-[#FF5E36] border border-[#FF5E36]/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Travel Plans & Rooms</span>
          </button>

          <button
            onClick={() => setActiveTab('dna')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'dna'
                ? 'bg-gradient-to-r from-[#FF5E36]/20 to-[#E0287D]/20 text-[#FF5E36] border border-[#FF5E36]/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Travel DNA</span>
          </button>

          <button
            onClick={() => setActiveTab('similarity')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'similarity'
                ? 'bg-gradient-to-r from-[#FF5E36]/20 to-[#E0287D]/20 text-[#FF5E36] border border-[#FF5E36]/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Photo Matcher</span>
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenReport}
            title="Safety & Moderation Report"
            className="p-2 text-slate-400 hover:text-[#FF5E36] hover:bg-white/5 rounded-lg transition-colors"
          >
            <Shield className="w-5 h-5" />
          </button>

          <button
            onClick={() => onOpenAuth('login')}
            className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => onOpenAuth('register')}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#FF5E36] via-[#E0287D] to-[#6C2EB9] hover:opacity-95 shadow-glow-orange transition-all"
          >
            Join M.A.T.E.
          </button>
        </div>
      </div>
    </header>
  );
};
