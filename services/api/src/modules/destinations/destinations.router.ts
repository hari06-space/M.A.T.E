import { Router, Request, Response } from 'express';

export interface Destination {
  id: string;
  name: string;
  state: string;
  country: string;
  category: 'Mountains' | 'Beaches' | 'Heritage' | 'Adventure' | 'Serene' | 'Culture';
  description: string;
  heroImage: string;
  idealDurationDays: number;
  averageDailyBudgetINR: number;
  tags: string[];
  activeTripsCount: number;
  activeTravelersCount: number;
}

export const CANONICAL_DESTINATIONS: Destination[] = [
  {
    id: 'dest-manali',
    name: 'Manali & Solang Valley',
    state: 'Himachal Pradesh',
    country: 'India',
    category: 'Mountains',
    description: 'Breathtaking pine forests, high-altitude passes, and mountain backpacking hubs for outdoor lovers.',
    heroImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    idealDurationDays: 5,
    averageDailyBudgetINR: 2200,
    tags: ['Trekking', 'Campfire', 'Paragliding', 'Cafes'],
    activeTripsCount: 14,
    activeTravelersCount: 38
  },
  {
    id: 'dest-munnar',
    name: 'Munnar & Western Ghats',
    state: 'Kerala',
    country: 'India',
    category: 'Serene',
    description: 'Emerald tea estates, misty mountain peaks, and serene nature trails ideal for quiet explorations.',
    heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    idealDurationDays: 4,
    averageDailyBudgetINR: 2400,
    tags: ['Tea Trails', 'Waterfalls', 'Homestays', 'Photography'],
    activeTripsCount: 9,
    activeTravelersCount: 24
  },
  {
    id: 'dest-varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Heritage',
    description: 'One of the oldest continuously inhabited cities on Earth, famed for spiritual ghats and timeless traditions.',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    idealDurationDays: 3,
    averageDailyBudgetINR: 1500,
    tags: ['Spiritual', 'Street Food', 'Ghats', 'Cultural Walks'],
    activeTripsCount: 11,
    activeTravelersCount: 29
  },
  {
    id: 'dest-varkala',
    name: 'Varkala Cliff',
    state: 'Kerala',
    country: 'India',
    category: 'Beaches',
    description: 'Striking red laterite cliffs bordering the Arabian Sea, vibrant sunset shacks, and laid-back surf culture.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    idealDurationDays: 4,
    averageDailyBudgetINR: 1800,
    tags: ['Sunset Shacks', 'Surfing', 'Cliff Walks', 'Yoga'],
    activeTripsCount: 16,
    activeTravelersCount: 42
  },
  {
    id: 'dest-ladakh',
    name: 'Leh & Nubra Valley',
    state: 'Ladakh',
    country: 'India',
    category: 'Adventure',
    description: 'Rugged high-altitude desert landscapes, ancient Buddhist gompas, and world-class road trip routes.',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    idealDurationDays: 8,
    averageDailyBudgetINR: 3500,
    tags: ['High Pass', 'Monasteries', 'Motorcycling', 'Stargazing'],
    activeTripsCount: 7,
    activeTravelersCount: 22
  }
];

export const destinationsRouter = Router();

destinationsRouter.get('/', (req: Request, res: Response) => {
  const { query, category } = req.query;
  let results = [...CANONICAL_DESTINATIONS];

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter((d) => d.category.toLowerCase() === category.toLowerCase());
  }

  if (query && typeof query === 'string') {
    const q = query.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  res.status(200).json({
    status: 'success',
    total: results.length,
    data: results
  });
});

destinationsRouter.get('/:id', (req: Request, res: Response) => {
  const dest = CANONICAL_DESTINATIONS.find((d) => d.id === req.params.id);
  if (!dest) {
    res.status(404).json({ status: 'error', message: 'Destination not found' });
    return;
  }
  res.status(200).json({ status: 'success', data: dest });
});
