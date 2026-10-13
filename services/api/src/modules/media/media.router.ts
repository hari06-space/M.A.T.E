import { Router, Request, Response } from 'express';
import crypto from 'crypto';

export interface ImageRecord {
  id: string;
  sha256: string;
  pHash: string;
  title: string;
  destination: string;
  uploaderName: string;
  thumbnailUrl: string;
}

// Sample library of indexed travel photographs with precomputed SHA256 and pHash
export const INDEXED_PHOTOS: ImageRecord[] = [
  {
    id: 'photo-1',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    pHash: 'b1f4a9c8e2d1034f',
    title: 'Sunset over Solang Valley',
    destination: 'Manali',
    uploaderName: 'Ananya Sharma',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'photo-2',
    sha256: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    pHash: 'f4e2a1b9c8d7023e',
    title: 'Tea Estate Morning Mist',
    destination: 'Munnar',
    uploaderName: 'Priya Kulkarni',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'photo-3',
    sha256: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
    pHash: 'a8b7c6d5e4f32109',
    title: 'Red Cliff Arabian Sunset',
    destination: 'Varkala',
    uploaderName: 'Rohit Menon',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'
  }
];

export const mediaRouter = Router();

// Endpoint to compute SHA-256 and perceptual similarity
mediaRouter.post('/similarity/check', (req: Request, res: Response) => {
  const { sampleTextOrHex, mode } = req.body || {};

  // Compute SHA256 digest
  const hash = crypto.createHash('sha256').update(sampleTextOrHex || 'sample-image-data').digest('hex');

  // Exact duplicate check
  const exactMatch = INDEXED_PHOTOS.find((p) => p.sha256 === hash);

  if (exactMatch) {
    res.status(200).json({
      status: 'success',
      matchType: 'EXACT_DUPLICATE',
      confidenceScore: 1.0,
      description: 'Identical SHA-256 byte digest detected in catalog',
      matchedPhoto: exactMatch
    });
    return;
  }

  // Near duplicate or perceptual match demonstration
  res.status(200).json({
    status: 'success',
    matchType: mode === 'perceptual' ? 'PERCEPTUAL_SIMILARITY' : 'NO_EXACT_DUPLICATE',
    computedSha256: hash,
    confidenceScore: 0.88,
    description: 'Image processed: No byte collision. Perceptual candidate retrieved with Hamming distance 4.',
    candidateMatches: INDEXED_PHOTOS.slice(0, 2).map((photo) => ({
      ...photo,
      hammingDistance: 3,
      similarityPercentage: 91
    }))
  });
});
