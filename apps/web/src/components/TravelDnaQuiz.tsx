import React, { useState } from 'react';
import { Sparkles, Check, Compass, DollarSign, Activity, Home, Users } from 'lucide-react';

interface TravelDnaState {
  pace: string;
  budgetTier: string;
  travelStyles: string[];
  stayPreference: string;
  socialPreference: string;
}

export const TravelDnaQuiz: React.FC = () => {
  const [dna, setDna] = useState<TravelDnaState>({
    pace: 'Moderate',
    budgetTier: 'Budget',
    travelStyles: ['Backpacking', 'Photography', 'Nature'],
    stayPreference: 'Hostel / Homestay',
    socialPreference: 'Small Group'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const paces = [
    { label: 'Relaxed', desc: 'Slow mornings, cafe downtime, maximum 1-2 activities/day' },
    { label: 'Moderate', desc: 'Balanced sightseeing, good mix of action and leisure' },
    { label: 'Intensive', desc: 'Sunrise to sunset hikes, packed itineraries, maximum coverage' }
  ];

  const budgets = [
    { label: 'Budget', desc: 'Hostels, local buses/trains, street food (~₹1.5k/day)' },
    { label: 'Mid-range', desc: 'Private rooms/boutique stays, cabs, sit-down meals (~₹3k/day)' },
    { label: 'Luxury', desc: 'Premium resorts, experiential stays, zero compromises' },
    { label: 'Flexible', desc: 'Willing to spend for unforgettable unique experiences' }
  ];

  const allStyles = [
    'Backpacking', 'Trekking', 'Photography', 'Heritage & History',
    'Beach & Coastal', 'Road Trips', 'Foodie & Street Food', 'Camping & Stargazing'
  ];

  const stays = [
    'Hostel / Homestay', 'Boutique Hotel', 'Eco-Resort', 'Camping / Tent'
  ];

  const socialTypes = [
    'Small Group (2-4)', 'One-on-One Partner', 'Lively Group (5+)', 'Independent / Introvert Friendly'
  ];

  const toggleStyle = (style: string) => {
    if (dna.travelStyles.includes(style)) {
      setDna({ ...dna, travelStyles: dna.travelStyles.filter((s) => s !== style) });
    } else {
      setDna({ ...dna, travelStyles: [...dna.travelStyles, style] });
    }
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#E0287D]/10 border border-[#E0287D]/30 text-[#E0287D] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Behavioral Matching Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Configure Your <span className="bg-gradient-to-r from-[#FF5E36] to-[#E0287D] bg-clip-text text-transparent">Travel DNA</span>
        </h2>
        <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          M.A.T.E. uses your structured preferences to calculate truthful, explainable compatibility scores with fellow travelers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form: Preferences */}
        <div className="lg:col-span-2 space-y-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
          {/* Section 1: Pace */}
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-lg mb-3">
              <Activity className="w-5 h-5 text-[#FF5E36]" />
              <span>1. Travel Pace</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {paces.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setDna({ ...dna, pace: p.label })}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    dna.pace === p.label
                      ? 'bg-gradient-to-br from-[#FF5E36]/20 to-[#E0287D]/10 border-[#FF5E36] text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm flex items-center justify-between">
                    <span>{p.label}</span>
                    {dna.pace === p.label && <Check className="w-4 h-4 text-[#FF5E36]" />}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 leading-relaxed">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Budget Tier */}
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-lg mb-3">
              <DollarSign className="w-5 h-5 text-[#E0287D]" />
              <span>2. Budget Tier</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {budgets.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => setDna({ ...dna, budgetTier: b.label })}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    dna.budgetTier === b.label
                      ? 'bg-gradient-to-br from-[#E0287D]/20 to-[#6C2EB9]/10 border-[#E0287D] text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm flex items-center justify-between">
                    <span>{b.label}</span>
                    {dna.budgetTier === b.label && <Check className="w-4 h-4 text-[#E0287D]" />}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 leading-relaxed">{b.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Travel Styles */}
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-lg mb-3">
              <Compass className="w-5 h-5 text-[#6C2EB9]" />
              <span>3. Primary Travel Styles (Select all that apply)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allStyles.map((style) => {
                const isSelected = dna.travelStyles.includes(style);
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => toggleStyle(style)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FF5E36] to-[#E0287D] text-white shadow-glow-orange'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700'
                    }`}
                  >
                    <span>{style}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Accommodation & Social Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-white font-bold text-sm mb-2">
                <Home className="w-4 h-4 text-[#FF5E36]" />
                <span>Stay Preference</span>
              </div>
              <select
                value={dna.stayPreference}
                onChange={(e) => setDna({ ...dna, stayPreference: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5E36]"
              >
                {stays.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center space-x-2 text-white font-bold text-sm mb-2">
                <Users className="w-4 h-4 text-[#E0287D]" />
                <span>Social Group Dynamic</span>
              </div>
              <select
                value={dna.socialPreference}
                onChange={(e) => setDna({ ...dna, socialPreference: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0287D]"
              >
                {socialTypes.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Save Action */}
          <div className="pt-2">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5E36] via-[#E0287D] to-[#6C2EB9] text-white font-bold text-sm shadow-glow-orange hover:opacity-95 transition-all"
            >
              {savedSuccess ? '✓ Saved to M.A.T.E. Profile' : 'Save Travel DNA Profile'}
            </button>
          </div>
        </div>

        {/* Right Card: Live Travel DNA Card Preview */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-b from-[#161B33] to-[#0E1326] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5E36]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5E36]">
                DNA Passport
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                100% Complete
              </span>
            </div>

            <div className="text-xl font-bold text-white">Your Travel Profile</div>
            <p className="text-xs text-slate-400 mt-0.5">
              How companions see your travel style
            </p>

            <div className="my-5 border-t border-slate-800" />

            <div className="space-y-3.5">
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Rhythm & Pace</div>
                <div className="text-sm font-semibold text-white mt-0.5 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5E36]" />
                  <span>{dna.pace} Explorer</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Budget Approach</div>
                <div className="text-sm font-semibold text-white mt-0.5 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E0287D]" />
                  <span>{dna.budgetTier} Tier</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Preferred Lodging</div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {dna.stayPreference}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Selected Interests ({dna.travelStyles.length})</div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {dna.travelStyles.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 text-[11px] font-medium border border-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              💡 <em>Matching uses these exact attributes to calculate compatibility and guarantees zero mystery scores.</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
