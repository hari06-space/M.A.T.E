import React from 'react';
import { Search, Compass, Users, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  onExploreMatches: () => void;
  onStartDna: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onExploreMatches,
  onStartDna
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Gradients & Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FF5E36]/20 via-[#E0287D]/15 to-[#6C2EB9]/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border border-[#FF5E36]/30 text-xs font-semibold tracking-wider text-slate-200 uppercase mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#FF5E36]" />
          <span>The Relationship & Coordination Layer For Travel</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Find People Who <span className="bg-gradient-to-r from-[#FF5E36] via-[#E0287D] to-[#9D4EDD] bg-clip-text text-transparent">Travel Like You</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Discover handpicked destinations, match with compatible travelers using structured <strong>Travel DNA</strong>, plan trips in shared <strong>Trip Rooms</strong>, and turn discoveries into adventures.
        </p>

        {/* Quick Search Bar */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto">
          <div className="flex items-center glass-panel rounded-2xl p-2 border border-slate-700/80 shadow-2xl focus-within:border-[#FF5E36]/70 transition-all">
            <div className="pl-3 pr-2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destinations (e.g. Manali, Varkala, Munnar, Ladakh)..."
              className="w-full bg-transparent border-none text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF5E36] to-[#E0287D] text-white font-medium text-sm hover:opacity-95 shadow-glow-orange flex items-center space-x-2 shrink-0 transition-transform active:scale-95"
            >
              <span>Explore</span>
            </button>
          </div>
        </form>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={onExploreMatches}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5E36] via-[#E0287D] to-[#6C2EB9] text-white font-semibold text-base shadow-glow-orange hover:shadow-glow-purple transition-all"
          >
            <Users className="w-5 h-5" />
            <span>Find Compatible Companions</span>
          </button>

          <button
            onClick={onStartDna}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl glass-panel text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 font-semibold text-base transition-all"
          >
            <Sparkles className="w-5 h-5 text-[#FF5E36]" />
            <span>Discover Your Travel DNA</span>
          </button>
        </div>

        {/* Highlights / Live Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Explainable Matches</div>
          </div>
          <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#FF5E36]">Trip Rooms</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Collaborative Plans</div>
          </div>
          <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#E0287D]">Zero Bias</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Privacy & Trust-First</div>
          </div>
          <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#9D4EDD]">Exact + pHash</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Photo Duplicate Engine</div>
          </div>
        </div>
      </div>
    </div>
  );
};
