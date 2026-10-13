import React, { useState } from 'react';
import { MapPin, Users, Calendar, DollarSign, ArrowRight, Compass } from 'lucide-react';

interface DestinationItem {
  id: string;
  name: string;
  state: string;
  category: string;
  description: string;
  heroImage: string;
  idealDurationDays: number;
  averageDailyBudgetINR: number;
  tags: string[];
  activeTripsCount: number;
  activeTravelersCount: number;
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: 'dest-manali',
    name: 'Manali & Solang Valley',
    state: 'Himachal Pradesh',
    category: 'Mountains',
    description: 'Breathtaking pine forests, high-altitude passes, and mountain backpacking hubs for outdoor lovers.',
    heroImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80',
    idealDurationDays: 5,
    averageDailyBudgetINR: 2200,
    tags: ['Trekking', 'Campfire', 'Paragliding', 'Old Manali Cafes'],
    activeTripsCount: 14,
    activeTravelersCount: 38
  },
  {
    id: 'dest-varkala',
    name: 'Varkala Cliff',
    state: 'Kerala',
    category: 'Beaches',
    description: 'Striking red laterite cliffs bordering the Arabian Sea, vibrant sunset shacks, and laid-back surf culture.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    idealDurationDays: 4,
    averageDailyBudgetINR: 1800,
    tags: ['Sunset Shacks', 'Surfing', 'Cliff Walks', 'Yoga'],
    activeTripsCount: 16,
    activeTravelersCount: 42
  },
  {
    id: 'dest-munnar',
    name: 'Munnar & Western Ghats',
    state: 'Kerala',
    category: 'Serene',
    description: 'Emerald tea estates, misty mountain peaks, and serene nature trails ideal for quiet explorations.',
    heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    idealDurationDays: 4,
    averageDailyBudgetINR: 2400,
    tags: ['Tea Trails', 'Waterfalls', 'Homestays', 'Photography'],
    activeTripsCount: 9,
    activeTravelersCount: 24
  },
  {
    id: 'dest-varanasi',
    name: 'Varanasi Ghats',
    state: 'Uttar Pradesh',
    category: 'Heritage',
    description: 'One of the oldest continuously inhabited cities on Earth, famed for spiritual ghats and timeless traditions.',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    idealDurationDays: 3,
    averageDailyBudgetINR: 1500,
    tags: ['Spiritual', 'Street Food', 'Ghats', 'Cultural Walks'],
    activeTripsCount: 11,
    activeTravelersCount: 29
  },
  {
    id: 'dest-ladakh',
    name: 'Leh & Nubra Valley',
    state: 'Ladakh',
    category: 'Adventure',
    description: 'Rugged high-altitude desert landscapes, ancient Buddhist gompas, and world-class road trip routes.',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    idealDurationDays: 8,
    averageDailyBudgetINR: 3500,
    tags: ['High Passes', 'Monasteries', 'Motorcycling', 'Stargazing'],
    activeTripsCount: 7,
    activeTravelersCount: 22
  }
];

interface DestinationExplorerProps {
  onSelectDestinationForTrips: (destinationId: string) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  onSelectDestinationForTrips
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Mountains', 'Beaches', 'Adventure', 'Serene', 'Heritage'];

  const filtered = selectedCategory === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Pills */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#6C2EB9]/10 text-[#A855F7] text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Hubs</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Explore Handpicked <span className="bg-gradient-to-r from-[#FF5E36] to-[#E0287D] bg-clip-text text-transparent">Destinations</span>
          </h2>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FF5E36] to-[#E0287D] text-white shadow-glow-orange'
                  : 'glass-panel text-slate-300 hover:text-white border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => (
          <div
            key={dest.id}
            className="group glass-panel rounded-3xl overflow-hidden border border-slate-800/90 hover:border-[#FF5E36]/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image & Category overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1326] via-transparent to-transparent opacity-90" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0E1326]/80 backdrop-blur-md text-[#FF5E36] text-[11px] font-bold border border-white/10">
                  {dest.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0E1326]/80 backdrop-blur-md text-white text-[11px] font-medium flex items-center space-x-1 border border-white/10">
                  <Users className="w-3 h-3 text-emerald-400" />
                  <span>{dest.activeTravelersCount} looking</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5E36]" />
                  <span>{dest.state}, India</span>
                </div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-[#FF5E36] transition-colors">
                  {dest.name}
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {dest.description}
                </p>

                {/* Key indicators */}
                <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center space-x-1.5 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{dest.idealDurationDays} Days Ideal</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-300">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>~₹{dest.averageDailyBudgetINR}/day</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {dest.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 text-[10px] font-medium border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-6 pt-0">
              <button
                onClick={() => onSelectDestinationForTrips(dest.id)}
                className="w-full py-2.5 rounded-xl glass-panel text-white group-hover:bg-gradient-to-r group-hover:from-[#FF5E36] group-hover:to-[#E0287D] text-xs font-bold flex items-center justify-center space-x-2 transition-all border border-slate-700 group-hover:border-transparent shadow-sm"
              >
                <span>View {dest.activeTripsCount} Active Travel Plans</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
