import React, { useState } from 'react';
import { ShieldCheck, Calendar, DollarSign, Activity, Check, UserPlus, Heart, Sparkles, Filter } from 'lucide-react';

export interface TravelerCardProps {
  id: string;
  fullName: string;
  avatarUrl: string;
  homeCity: string;
  languages: string[];
  badges: string[];
  travelDna: {
    pace: string;
    budgetTier: string;
    primaryStyles: string[];
    stayPreference: string;
  };
  destinationIntent: {
    destinationId: string;
    destinationName: string;
    startDate: string;
    endDate: string;
  };
  compatibilityScore: number;
  compatibilityFactors: string[];
}

const SAMPLE_TRAVELERS: TravelerCardProps[] = [
  {
    id: 'user-ananya-s',
    fullName: 'Ananya Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    homeCity: 'Bengaluru',
    languages: ['English', 'Hindi', 'Kannada'],
    badges: ['Email Verified', 'Phone Verified', '3 Completed Trips'],
    travelDna: {
      pace: 'Moderate',
      budgetTier: 'Budget',
      primaryStyles: ['Backpacking', 'Photography', 'Cafe Hopping'],
      stayPreference: 'Hostel / Homestay'
    },
    destinationIntent: {
      destinationId: 'dest-manali',
      destinationName: 'Manali & Solang Valley',
      startDate: 'Nov 5',
      endDate: 'Nov 10, 2026'
    },
    compatibilityScore: 94,
    compatibilityFactors: [
      'Same Destination: Manali',
      'Overlapping Dates (Nov 5 - 10)',
      'Budget Tier Match: Budget',
      'Shared Style: Backpacking & Photography'
    ]
  },
  {
    id: 'user-rohit-m',
    fullName: 'Rohit Menon',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    homeCity: 'Kochi',
    languages: ['English', 'Malayalam', 'Tamil'],
    badges: ['Email Verified', 'Phone Verified', 'Top Contributor'],
    travelDna: {
      pace: 'Relaxed',
      budgetTier: 'Mid-range',
      primaryStyles: ['Beaches', 'Surfing', 'Sunset Shacks'],
      stayPreference: 'Boutique Stay'
    },
    destinationIntent: {
      destinationId: 'dest-varkala',
      destinationName: 'Varkala Cliff',
      startDate: 'Nov 12',
      endDate: 'Nov 16, 2026'
    },
    compatibilityScore: 89,
    compatibilityFactors: [
      'Same Destination: Varkala',
      'Matching Pace: Relaxed Coastal',
      'Shared Style: Beaches & Surfing'
    ]
  },
  {
    id: 'user-priya-k',
    fullName: 'Priya Kulkarni',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    homeCity: 'Pune',
    languages: ['English', 'Hindi', 'Marathi'],
    badges: ['Email Verified', '2 Completed Trips'],
    travelDna: {
      pace: 'Moderate',
      budgetTier: 'Budget',
      primaryStyles: ['Tea Trails', 'Trekking', 'Nature'],
      stayPreference: 'Eco Homestay'
    },
    destinationIntent: {
      destinationId: 'dest-munnar',
      destinationName: 'Munnar & Western Ghats',
      startDate: 'Nov 18',
      endDate: 'Nov 22, 2026'
    },
    compatibilityScore: 86,
    compatibilityFactors: [
      'Same Destination: Munnar',
      'Budget Match: Budget Tier',
      'Mutual Nature & Trekking Interest'
    ]
  },
  {
    id: 'user-vikram-s',
    fullName: 'Vikram Singh',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    homeCity: 'Jaipur',
    languages: ['English', 'Hindi'],
    badges: ['Email Verified', 'Phone Verified', 'Adventurer'],
    travelDna: {
      pace: 'Intensive',
      budgetTier: 'Flexible',
      primaryStyles: ['Motorcycling', 'High Altitude', 'Astrophotography'],
      stayPreference: 'Camps / Local Guesthouses'
    },
    destinationIntent: {
      destinationId: 'dest-ladakh',
      destinationName: 'Leh & Nubra Valley',
      startDate: 'Nov 1',
      endDate: 'Nov 9, 2026'
    },
    compatibilityScore: 91,
    compatibilityFactors: [
      'Same Destination: Ladakh',
      'Matching Pace: Intensive / Adventure',
      'Shared Passion: Photography & Road Trips'
    ]
  }
];

export const CompanionMatchFeed: React.FC = () => {
  const [travelers] = useState<TravelerCardProps[]>(SAMPLE_TRAVELERS);
  const [filterDestination, setFilterDestination] = useState<string>('all');
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  const handleConnect = (id: string) => {
    if (connectedIds.includes(id)) {
      setConnectedIds(connectedIds.filter((item) => item !== id));
    } else {
      setConnectedIds([...connectedIds, id]);
    }
  };

  const filteredTravelers = travelers.filter((t) => {
    if (filterDestination === 'all') return true;
    return t.destinationIntent.destinationId === filterDestination;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Filter bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FF5E36]/10 text-[#FF5E36] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explainable Companion Matching</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Compatible Travel <span className="bg-gradient-to-r from-[#FF5E36] via-[#E0287D] to-[#6C2EB9] bg-clip-text text-transparent">Companions</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Matches are ranked by destination timing, shared travel pace, and aligned budget tier.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterDestination}
            onChange={(e) => setFilterDestination(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-[#FF5E36]"
          >
            <option value="all">All Destinations</option>
            <option value="dest-manali">Manali & Solang</option>
            <option value="dest-varkala">Varkala Cliff</option>
            <option value="dest-munnar">Munnar</option>
            <option value="dest-ladakh">Leh & Ladakh</option>
          </select>
        </div>
      </div>

      {/* Grid of Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTravelers.map((traveler) => {
          const isConnected = connectedIds.includes(traveler.id);

          return (
            <div
              key={traveler.id}
              className="glass-panel glass-panel-hover rounded-3xl p-6 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Score */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={traveler.avatarUrl}
                      alt={traveler.fullName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 shadow-lg"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-white">{traveler.fullName}</h3>
                        <span title="Verifiable Identity Badges">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        From {traveler.homeCity} • Speaks {traveler.languages.slice(0, 2).join(', ')}
                      </div>
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {traveler.badges.map((b) => (
                          <span
                            key={b}
                            className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Compatibility Score Pill */}
                  <div className="text-right shrink-0">
                    <div className="px-3 py-1 rounded-2xl bg-gradient-to-r from-[#FF5E36] to-[#E0287D] text-white font-extrabold text-sm shadow-glow-orange text-center">
                      {traveler.compatibilityScore}%
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                      Match Fit
                    </div>
                  </div>
                </div>

                {/* Destination & Dates Intent */}
                <div className="mt-5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5 font-semibold text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-[#FF5E36]" />
                      <span>{traveler.destinationIntent.destinationName}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{traveler.destinationIntent.startDate} - {traveler.destinationIntent.endDate}</span>
                    </div>
                  </div>
                </div>

                {/* Explainable Match Factors */}
                <div className="mt-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF5E36] mb-2 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Why you two match:</span>
                  </div>
                  <ul className="space-y-1.5">
                    {traveler.compatibilityFactors.map((factor, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Activity className="w-3.5 h-3.5 text-[#E0287D]" />
                    <span>{traveler.travelDna.pace}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{traveler.travelDna.budgetTier}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleConnect(traveler.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      isConnected
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                        : 'bg-gradient-to-r from-[#FF5E36] to-[#E0287D] text-white hover:opacity-95 shadow-glow-orange'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Request Sent</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
