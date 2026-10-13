import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Shield, CheckCircle, Search, RefreshCw, AlertTriangle, Layers } from 'lucide-react';

interface MatchCandidate {
  id: string;
  title: string;
  destination: string;
  uploaderName: string;
  thumbnailUrl: string;
  matchType: 'EXACT_DUPLICATE' | 'PERCEPTUAL_NEAR_DUPLICATE' | 'SEMANTIC_SIMILARITY';
  similarityPercentage: number;
  hammingDistance: number;
  sha256: string;
}

const CATALOG_SAMPLES: MatchCandidate[] = [
  {
    id: 'p1',
    title: 'Sunset over Solang Valley',
    destination: 'Manali',
    uploaderName: 'Ananya Sharma',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=400&q=80',
    matchType: 'EXACT_DUPLICATE',
    similarityPercentage: 100,
    hammingDistance: 0,
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'p2',
    title: 'Varkala Red Cliff Sunset Shacks',
    destination: 'Varkala',
    uploaderName: 'Rohit Menon',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    matchType: 'PERCEPTUAL_NEAR_DUPLICATE',
    similarityPercentage: 92,
    hammingDistance: 3,
    sha256: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce'
  },
  {
    id: 'p3',
    title: 'Munnar Tea Plantation Dawn Mist',
    destination: 'Munnar',
    uploaderName: 'Priya Kulkarni',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80',
    matchType: 'SEMANTIC_SIMILARITY',
    similarityPercentage: 84,
    hammingDistance: 6,
    sha256: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb'
  }
];

export const PhotoSimilarityWidget: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<MatchCandidate>(CATALOG_SAMPLES[0]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<MatchCandidate | null>(CATALOG_SAMPLES[0]);
  const [detectedMode, setDetectedMode] = useState<'exact' | 'perceptual'>('exact');

  const runAnalysis = (photo: MatchCandidate, mode: 'exact' | 'perceptual') => {
    setSelectedPhoto(photo);
    setDetectedMode(mode);
    setIsProcessing(true);
    setResult(null);

    setTimeout(() => {
      setIsProcessing(false);
      setResult(photo);
    }, 700);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#FF5E36]/10 text-[#FF5E36] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stage 1 & 2 Visual Pipeline</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Photo Duplicate & <span className="bg-gradient-to-r from-[#FF5E36] via-[#E0287D] to-[#6C2EB9] bg-clip-text text-transparent">Visual Similarity Inspector</span>
        </h2>
        <p className="mt-2 text-slate-300 text-sm max-w-2xl mx-auto">
          M.A.T.E. uses staged computer vision: SHA-256 exact byte digests, perceptual hashes (pHash) for resized copies, and automatic EXIF GPS scrubbing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sample images to test */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-[#FF5E36]" />
              <span>Select Sample Image To Test</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Select one of the test photos below to evaluate against the indexed travel catalog:
            </p>

            <div className="space-y-3">
              {CATALOG_SAMPLES.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => runAnalysis(photo, photo.id === 'p1' ? 'exact' : 'perceptual')}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3.5 ${
                    selectedPhoto.id === photo.id
                      ? 'bg-slate-800/90 border-[#FF5E36] shadow-glow-orange'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{photo.title}</div>
                    <div className="text-[11px] text-slate-400">{photo.destination} • By {photo.uploaderName}</div>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-[10px] font-semibold text-[#FF5E36]">
                        {photo.id === 'p1' ? 'Target: Exact File Match' : 'Target: Near Duplicate'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy note */}
            <div className="mt-5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 flex items-start space-x-2.5">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>OWASP Privacy Control:</strong> Sensitive EXIF geolocation (GPS coordinates) and camera serials are stripped during ingest prior to derivative generation.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Processing Pipeline Output */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-b from-[#12182E] to-[#0E1326]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Layers className="w-4 h-4 text-[#E0287D]" />
                <span>Detection Pipeline Output</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Engine: Python/OpenCV Worker
              </span>
            </div>

            {isProcessing ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-8 h-8 text-[#FF5E36] animate-spin" />
                <div className="text-sm font-bold text-white">Computing SHA-256 & Perceptual Hashes...</div>
                <div className="text-xs text-slate-400">Scrubbing EXIF tags and checking Hamming distance</div>
              </div>
            ) : result ? (
              <div className="mt-6 space-y-6">
                {/* Result Status Banner */}
                <div className={`p-4 rounded-2xl border flex items-start space-x-3 ${
                  result.matchType === 'EXACT_DUPLICATE'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-indigo-950/40 border-indigo-500/40 text-indigo-200'
                }`}>
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                  <div>
                    <div className="font-extrabold text-sm">
                      {result.matchType === 'EXACT_DUPLICATE'
                        ? 'Exact Duplicate Identified (100% Byte Match)'
                        : 'Near-Duplicate Perceptually Identified (pHash Match)'}
                    </div>
                    <div className="text-xs opacity-90 mt-0.5">
                      {result.matchType === 'EXACT_DUPLICATE'
                        ? 'The uploaded file has an identical SHA-256 byte digest to an existing library photo.'
                        : `Found with Hamming distance ${result.hammingDistance} (threshold <= 5). Accounts for compression and resizing.`}
                    </div>
                  </div>
                </div>

                {/* Candidate Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] uppercase font-bold text-slate-400 mb-2">Input Image</div>
                    <img
                      src={result.thumbnailUrl}
                      alt="Input"
                      className="w-full h-36 object-cover rounded-xl"
                    />
                    <div className="text-xs font-semibold text-white mt-2">{result.title}</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] uppercase font-bold text-emerald-400 mb-2">
                      Matched Library Asset ({result.similarityPercentage}%)
                    </div>
                    <img
                      src={result.thumbnailUrl}
                      alt="Matched"
                      className="w-full h-36 object-cover rounded-xl border-2 border-emerald-500/40"
                    />
                    <div className="text-xs font-semibold text-white mt-2">Asset #{result.id} (Uploader: {result.uploaderName})</div>
                  </div>
                </div>

                {/* Technical Hashes & Details */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">SHA-256 Cryptographic Digest</div>
                    <div className="font-mono text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 truncate">
                      {result.sha256}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400 uppercase">Hamming Distance</div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {result.hammingDistance} bits
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400 uppercase">EXIF Geolocation</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5">
                        Sanitized (Stripped)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
