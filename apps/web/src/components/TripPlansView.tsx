import React, { useState } from 'react';
import { Calendar, Users, MapPin, Shield, Check, Lock, ChevronRight, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

interface Member {
  name: string;
  avatarUrl: string;
  role: string;
}

interface TravelPlan {
  id: string;
  title: string;
  destinationName: string;
  destinationId: string;
  startDate: string;
  endDate: string;
  capacity: number;
  confirmedCount: number;
  budgetTier: string;
  approxCostINR: number;
  coverImage: string;
  hostName: string;
  hostAvatar: string;
  members: Member[];
  itinerary: ItineraryItem[];
  safetyGuidelines: string[];
}

const SAMPLE_PLANS: TravelPlan[] = [
  {
    id: 'plan-manali-snow',
    title: 'Winter Trek & Cafe Hopping in Old Manali',
    destinationName: 'Manali & Solang Valley',
    destinationId: 'dest-manali',
    startDate: 'Nov 5',
    endDate: 'Nov 10, 2026',
    capacity: 5,
    confirmedCount: 3,
    budgetTier: 'Budget',
    approxCostINR: 12500,
    coverImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    hostName: 'Ananya Sharma',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    members: [
      { name: 'Ananya Sharma (Host)', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', role: 'Host' },
      { name: 'Devansh Roy', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80', role: 'Member' },
      { name: 'Meera Iyer', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', role: 'Member' }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Old Manali Cafe Meetup', description: 'Check-in at hostel, meet group, explore Old Manali cedar trails and local trout cafes.' },
      { day: 2, title: 'Jogini Waterfall Scenic Hike', description: 'Scenic morning hike from Vashisht village through apple orchards to Jogini Falls.' },
      { day: 3, title: 'Solang Snow Valley Excursion', description: 'Day trip to Solang Valley for paragliding and snow activities.' },
      { day: 4, title: 'Naggar Castle & Heritage Walk', description: 'Visit historic wood-and-stone castle and scenic sunset viewpoint.' },
      { day: 5, title: 'Souvenir Walk & Group Dinner', description: 'Tibetan market exploration and group farewell dinner.' }
    ],
    safetyGuidelines: [
      'Agreed meeting point in public cafe prior to mountain journey',
      'Mutual emergency contacts verified in Trip Room',
      'Keep shared offline maps of Solang / Vashisht trails'
    ]
  },
  {
    id: 'plan-varkala-cliff',
    title: 'Sunrise Yoga & Sunset Shacks at Varkala Cliff',
    destinationName: 'Varkala Cliff',
    destinationId: 'dest-varkala',
    startDate: 'Nov 12',
    endDate: 'Nov 16, 2026',
    capacity: 4,
    confirmedCount: 2,
    budgetTier: 'Mid-range',
    approxCostINR: 11000,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    hostName: 'Rohit Menon',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    members: [
      { name: 'Rohit Menon (Host)', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', role: 'Host' },
      { name: 'Sara Khan', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', role: 'Member' }
    ],
    itinerary: [
      { day: 1, title: 'Cliff Arrival & Sunset Coffee', description: 'Check-in on North Cliff, meet for sunset coffee.' },
      { day: 2, title: 'Morning Surf Lesson & Beach Day', description: 'Beginner surfing session at Black Sand Beach.' },
      { day: 3, title: 'Kappil Lake & Backwaters Scooter Ride', description: 'Coastal ride to backwater estuary.' },
      { day: 4, title: 'Ayurvedic Wellness & Departure', description: 'Relaxing wellness day before evening departure.' }
    ],
    safetyGuidelines: [
      'Only swim during designated lifeguard hours',
      'Rent helmets with all rented two-wheelers',
      'Share live location during scooter coastal day trips'
    ]
  }
];

export const TripPlansView: React.FC = () => {
  const [activePlan, setActivePlan] = useState<TravelPlan | null>(null);
  const [joinedPlans, setJoinedPlans] = useState<string[]>([]);

  const handleRequestJoin = (planId: string) => {
    if (joinedPlans.includes(planId)) {
      setJoinedPlans(joinedPlans.filter((id) => id !== planId));
    } else {
      setJoinedPlans([...joinedPlans, planId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E0287D]/10 text-[#E0287D] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Trip Room Coordination</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">
          Active <span className="bg-gradient-to-r from-[#FF5E36] to-[#E0287D] bg-clip-text text-transparent">Travel Plans</span>
        </h2>
        <p className="text-sm text-slate-300 mt-1">
          Join small-group travel plans with agreed budgets, structured daily itineraries, and verified safety commitments.
        </p>
      </div>

      {/* Grid of Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {SAMPLE_PLANS.map((plan) => {
          const isRequested = joinedPlans.includes(plan.id);

          return (
            <div
              key={plan.id}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-60">
                  <img
                    src={plan.coverImage}
                    alt={plan.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1326] via-[#0E1326]/30 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-[#0E1326]/80 backdrop-blur-md text-white text-xs font-bold border border-white/10 flex items-center space-x-1.5">
                      <MapPin className="w-3 h-3 text-[#FF5E36]" />
                      <span>{plan.destinationName}</span>
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
                      {plan.confirmedCount} / {plan.capacity} Confirmed
                    </span>
                  </div>

                  {/* Title on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white leading-snug drop-shadow-md">
                      {plan.title}
                    </h3>
                  </div>
                </div>

                {/* Details Bar */}
                <div className="p-6 pb-2">
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2 pb-4 border-b border-slate-800">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-4 h-4 text-[#FF5E36]" />
                      <span>{plan.startDate} - {plan.endDate}</span>
                    </div>
                    <div>
                      Est. Cost: <strong className="text-white">~₹{plan.approxCostINR}</strong> ({plan.budgetTier})
                    </div>
                    <div className="flex items-center space-x-2">
                      <img src={plan.hostAvatar} alt={plan.hostName} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-slate-400">Host: {plan.hostName}</span>
                    </div>
                  </div>

                  {/* Preview of Itinerary days */}
                  <div className="mt-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Planned Itinerary ({plan.itinerary.length} Days)
                    </div>
                    <div className="space-y-2">
                      {plan.itinerary.slice(0, 3).map((item) => (
                        <div key={item.day} className="flex items-start space-x-2.5 text-xs">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[#FF5E36] font-bold text-[10px] shrink-0 mt-0.5">
                            Day {item.day}
                          </span>
                          <span className="text-slate-300 font-medium">{item.title}</span>
                        </div>
                      ))}
                      {plan.itinerary.length > 3 && (
                        <div className="text-[11px] text-slate-400 pl-8">
                          + {plan.itinerary.length - 3} more itinerary days
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-4 flex items-center justify-between gap-3 border-t border-slate-800/80">
                <button
                  onClick={() => setActivePlan(plan)}
                  className="px-4 py-2.5 rounded-xl glass-panel text-xs font-bold text-white hover:border-[#FF5E36] transition-all flex items-center space-x-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-[#FF5E36]" />
                  <span>Enter Trip Room</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleRequestJoin(plan.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    isRequested
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                      : 'bg-gradient-to-r from-[#FF5E36] to-[#E0287D] text-white hover:opacity-95 shadow-glow-orange'
                  }`}
                >
                  {isRequested ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Join Request Sent</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-3.5 h-3.5" />
                      <span>Request To Join</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trip Room Detailed Modal */}
      {activePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-slate-700 bg-[#0E1326] relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setActivePlan(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 text-xs font-bold"
            >
              ✕ Close
            </button>

            {/* Modal Header */}
            <div className="pr-12">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FF5E36]/10 text-[#FF5E36] text-xs font-bold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Collaborative Trip Room</span>
              </div>
              <h3 className="text-2xl font-black text-white">{activePlan.title}</h3>
              <p className="text-xs text-slate-300 mt-1">
                {activePlan.destinationName} • {activePlan.startDate} to {activePlan.endDate}
              </p>
            </div>

            {/* Members section */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Confirmed Companions ({activePlan.members.length} / {activePlan.capacity})</span>
                <span className="text-emerald-400 font-semibold">{activePlan.capacity - activePlan.members.length} spots remaining</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {activePlan.members.map((m, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <img src={m.avatarUrl} alt={m.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                    <div>
                      <div className="text-xs font-bold text-white">{m.name}</div>
                      <div className="text-[10px] text-slate-400">{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Itinerary */}
            <div className="mt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF5E36] mb-3">
                Full Day-by-Day Itinerary
              </h4>
              <div className="space-y-3">
                {activePlan.itinerary.map((item) => (
                  <div key={item.day} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center space-x-2 font-bold text-xs text-white">
                      <span className="px-2 py-0.5 rounded bg-[#FF5E36]/20 text-[#FF5E36] text-[10px]">
                        Day {item.day}
                      </span>
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed pl-8">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Guidelines */}
            <div className="mt-6 p-4 rounded-2xl bg-[#6C2EB9]/10 border border-[#6C2EB9]/30">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Agreed Group Safety Guidelines</span>
              </div>
              <ul className="space-y-1.5">
                {activePlan.safetyGuidelines.map((g, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trip Room Action */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  handleRequestJoin(activePlan.id);
                  setActivePlan(null);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5E36] via-[#E0287D] to-[#6C2EB9] text-white font-bold text-xs shadow-glow-orange hover:opacity-95"
              >
                {joinedPlans.includes(activePlan.id) ? 'Request Already Sent' : 'Send Join Request To Room Host'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
