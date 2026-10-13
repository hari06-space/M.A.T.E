import { Router, Request, Response } from 'express';

export interface TravelerMatch {
  id: string;
  fullName: string;
  avatarUrl: string;
  homeCity: string;
  languages: string[];
  badges: string[];
  travelDna: {
    pace: 'Relaxed' | 'Moderate' | 'Intensive';
    budgetTier: 'Budget' | 'Mid-range' | 'Luxury' | 'Flexible';
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

export const SEEDED_TRAVELERS: TravelerMatch[] = [
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
      startDate: '2026-11-05',
      endDate: '2026-11-10'
    },
    compatibilityScore: 94,
    compatibilityFactors: [
      'Same Destination: Manali',
      'Overlapping Dates (Nov 5 - Nov 10)',
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
      startDate: '2026-11-12',
      endDate: '2026-11-16'
    },
    compatibilityScore: 89,
    compatibilityFactors: [
      'Same Destination: Varkala',
      'Matching Pace: Relaxed',
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
      startDate: '2026-11-18',
      endDate: '2026-11-22'
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
      startDate: '2026-11-01',
      endDate: '2026-11-09'
    },
    compatibilityScore: 91,
    compatibilityFactors: [
      'Same Destination: Ladakh',
      'Matching Pace: Intensive / Adventure',
      'Shared Passion: Photography & Road Trips'
    ]
  }
];

export const matchingRouter = Router();

matchingRouter.post('/search', (req: Request, res: Response) => {
  const { destination_id, budget_tier, pace } = req.body || {};

  let results = [...SEEDED_TRAVELERS];

  if (destination_id && destination_id !== 'all') {
    results = results.filter((t) => t.destinationIntent.destinationId === destination_id);
  }

  if (budget_tier && budget_tier !== 'all') {
    results = results.filter((t) => t.travelDna.budgetTier.toLowerCase() === budget_tier.toLowerCase());
  }

  if (pace && pace !== 'all') {
    results = results.filter((t) => t.travelDna.pace.toLowerCase() === pace.toLowerCase());
  }

  // Sort by highest compatibility score first
  results.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  res.status(200).json({
    status: 'success',
    total: results.length,
    data: results
  });
});
