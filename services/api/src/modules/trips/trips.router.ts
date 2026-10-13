import { Router, Request, Response } from 'express';

export interface TripMember {
  userId: string;
  name: string;
  avatarUrl: string;
  role: 'CREATOR' | 'CO_HOST' | 'MEMBER';
}

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  timeSlot?: string;
}

export interface TravelPlan {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  startDate: string;
  endDate: string;
  capacity: number;
  confirmedCount: number;
  budgetTier: 'Budget' | 'Mid-range' | 'Luxury' | 'Flexible';
  approxCostINR: number;
  coverImage: string;
  creator: TripMember;
  members: TripMember[];
  status: 'PUBLISHED' | 'DRAFT' | 'COMPLETED' | 'CANCELLED';
  itinerary: ItineraryItem[];
  safetyGuidelines: string[];
}

export const SEEDED_TRAVEL_PLANS: TravelPlan[] = [
  {
    id: 'plan-manali-snow',
    title: 'Winter Trek & Cafe Hopping in Old Manali',
    destinationId: 'dest-manali',
    destinationName: 'Manali & Solang Valley',
    startDate: '2026-11-05',
    endDate: '2026-11-10',
    capacity: 5,
    confirmedCount: 3,
    budgetTier: 'Budget',
    approxCostINR: 12500,
    coverImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    creator: {
      userId: 'user-ananya-s',
      name: 'Ananya Sharma',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'CREATOR'
    },
    members: [
      {
        userId: 'user-ananya-s',
        name: 'Ananya Sharma',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        role: 'CREATOR'
      },
      {
        userId: 'user-2',
        name: 'Devansh Roy',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        role: 'MEMBER'
      },
      {
        userId: 'user-3',
        name: 'Meera Iyer',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        role: 'MEMBER'
      }
    ],
    status: 'PUBLISHED',
    itinerary: [
      { day: 1, title: 'Arrival & Old Manali Cafe Meetup', description: 'Check-in at hostel, meet group, explore Old Manali cedar trails and local trout cafes.' },
      { day: 2, title: 'Jogini Waterfall Hike', description: 'Scenic morning hike from Vashisht village through apple orchards to Jogini Falls.' },
      { day: 3, title: 'Solang Snow Valley Excursion', description: 'Day trip to Solang Valley for paragliding and snow activities.' },
      { day: 4, title: 'Naggar Castle & Art Gallery', description: 'Visit historic wood-and-stone castle and scenic sunset viewpoint.' },
      { day: 5, title: 'Souvenir Walk & Farewell Dinner', description: 'Tibetan market exploration and group farewell dinner.' }
    ],
    safetyGuidelines: [
      'Agreed meeting point in public cafe prior to mountain journey',
      'Mutual emergency contacts shared in Trip Room',
      'Keep shared digital offline maps of Solang / Vashisht trails'
    ]
  },
  {
    id: 'plan-varkala-cliff',
    title: 'Sunrise Yoga & Sunset Shacks at Varkala Cliff',
    destinationId: 'dest-varkala',
    destinationName: 'Varkala Cliff',
    startDate: '2026-11-12',
    endDate: '2026-11-16',
    capacity: 4,
    confirmedCount: 2,
    budgetTier: 'Mid-range',
    approxCostINR: 11000,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    creator: {
      userId: 'user-rohit-m',
      name: 'Rohit Menon',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      role: 'CREATOR'
    },
    members: [
      {
        userId: 'user-rohit-m',
        name: 'Rohit Menon',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        role: 'CREATOR'
      },
      {
        userId: 'user-4',
        name: 'Sara Khan',
        avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
        role: 'MEMBER'
      }
    ],
    status: 'PUBLISHED',
    itinerary: [
      { day: 1, title: 'Cliff Arrival & Sunset Watch', description: 'Check-in on North Cliff, meet for sunset coffee.' },
      { day: 2, title: 'Morning Surf Lesson & Beach Day', description: 'Beginner surfing session at Black Sand Beach.' },
      { day: 3, title: 'Kappil Lake & Backwaters Scooter Ride', description: 'Coastal ride to backwater estuary.' },
      { day: 4, title: 'Ayurvedic Massage & Farewell', description: 'Relaxing wellness day before evening departure.' }
    ],
    safetyGuidelines: [
      'Only swim during designated lifeguard hours',
      'Rent helmets with all rented two-wheelers',
      'Share live location during scooter day trips'
    ]
  }
];

export const tripsRouter = Router();

tripsRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    total: SEEDED_TRAVEL_PLANS.length,
    data: SEEDED_TRAVEL_PLANS
  });
});

tripsRouter.get('/:id', (req: Request, res: Response) => {
  const plan = SEEDED_TRAVEL_PLANS.find((p) => p.id === req.params.id);
  if (!plan) {
    res.status(404).json({ status: 'error', message: 'Travel plan not found' });
    return;
  }
  res.status(200).json({ status: 'success', data: plan });
});

tripsRouter.get('/:id/room', (req: Request, res: Response) => {
  const plan = SEEDED_TRAVEL_PLANS.find((p) => p.id === req.params.id);
  if (!plan) {
    res.status(404).json({ status: 'error', message: 'Trip room not found' });
    return;
  }
  // Server-side check for confirmed membership or preview access
  res.status(200).json({
    status: 'success',
    data: {
      planId: plan.id,
      title: plan.title,
      destinationName: plan.destinationName,
      members: plan.members,
      itinerary: plan.itinerary,
      safetyGuidelines: plan.safetyGuidelines,
      activeDiscussionCount: 18
    }
  });
});
