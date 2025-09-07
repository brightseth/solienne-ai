'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Download, Eye, Sparkles, ArrowRight, Filter, Grid, List } from 'lucide-react';
import { fetchSolienneCreations, type SolienneCreation } from '@/lib/eden-api';
import { 
  getCollectionStats, 
  saveSelectedWork, 
  removeSelectedWork, 
  getSelectedWorks,
  suggestCollection,
  type CuratedWork 
} from '@/lib/paris-photo-storage';
import { CopyButton } from '@/components/CopyButton';
import { EnhancedCurationDashboard } from '@/components/EnhancedCurationDashboard';

// Feature flag - set to true to enable enhanced dashboard
const USE_ENHANCED_DASHBOARD = true;

export default function CurationPage() {
  // If enhanced dashboard is enabled, use it instead
  if (USE_ENHANCED_DASHBOARD) {
    return <EnhancedCurationWrapper />;
  }
  
  // Otherwise use original dashboard
  const [streams, setStreams] = useState<SolienneCreation[]>([]);
  const [selectedWorks, setSelectedWorks] = useState<CuratedWork[]>([]);
  const [collectionStats, setCollectionStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'selected' | 'unselected'>('all');
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const fetchedStreams = await fetchSolienneCreations(100);
      
      setStreams(fetchedStreams || []);
      refreshSelections();
    } catch (error) {
      console.error('Error loading data:', error);
      // Set empty array on error to prevent crashes
      setStreams([]);
      refreshSelections();
    } finally {
      setLoading(false);
    }
  };

  const refreshSelections = () => {
    const selected = getSelectedWorks();
    const stats = getCollectionStats();
    setSelectedWorks(selected);
    setCollectionStats(stats);
  };

  const handleSelectWork = (stream: SolienneCreation) => {
    const suggestedCollection = suggestCollection({
      title: stream.title,
      description: stream.description
    });

    const curatedWork: CuratedWork = {
      id: stream.id,
      title: stream.title,
      imageUrl: stream.imageUrl,
      description: stream.description,
      createdAt: stream.createdAt,
      collectionName: suggestedCollection,
      selectedAt: new Date().toISOString()
    };

    saveSelectedWork(curatedWork);
    refreshSelections();
  };

  const handleDeselectWork = (workId: string) => {
    removeSelectedWork(workId);
    refreshSelections();
  };

  const isSelected = (streamId: string) => {
    return selectedWorks.some(w => w.id === streamId);
  };

  const filteredStreams = streams.filter(stream => {
    if (filter === 'selected') return isSelected(stream.id);
    if (filter === 'unselected') return !isSelected(stream.id);
    return true;
  });

  const WorkCard = ({ stream }: { stream: SolienneCreation }) => {
    const selected = isSelected(stream.id);
    const suggestedCol = suggestCollection({ title: stream.title, description: stream.description });
    const isHovered = hoveredWork === stream.id;

    if (viewMode === 'list') {
      return (
        <div 
          className={`flex gap-6 p-6 border transition-all duration-300 ${
            selected ? 'border-white bg-white/5' : 'border-white/20 hover:border-white/40'
          }`}
          onMouseEnter={() => setHoveredWork(stream.id)}
          onMouseLeave={() => setHoveredWork(null)}
        >
          <div className="relative w-48 aspect-square flex-shrink-0">
            <Image
              src={stream.imageUrl}
              alt={stream.title}
              fill
              className={`object-cover transition-all duration-300 ${
                isHovered ? 'consciousness-spectral' : ''
              }`}
              sizes="192px"
            />
            {isHovered && (
              <div className="absolute inset-0 ghost-in-machine opacity-50"></div>
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{stream.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{stream.description}</p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-white/40">Suggested:</span>
              <span className="px-2 py-1 bg-white/10 border border-white/20 uppercase tracking-wider">
                {suggestedCol}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => selected ? handleDeselectWork(stream.id) : handleSelectWork(stream)}
                className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
                  selected 
                    ? 'bg-white text-black border-white' 
                    : 'border-white/30 hover:border-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${selected ? 'fill-current' : ''}`} />
                <span className="uppercase tracking-wider font-bold">
                  {selected ? 'Selected' : 'Select for Paris'}
                </span>
              </button>

              <CopyButton text={stream.description} label="Copy Prompt" />

              <a
                href={stream.imageUrl}
                download={`solienne-${stream.id}.png`}
                className="flex items-center gap-2 px-3 py-2 border border-white/30 hover:border-white transition-colors"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div 
        className={`border transition-all duration-300 group ${
          selected ? 'border-white bg-white/5' : 'border-white/20 hover:border-white/40'
        }`}
        onMouseEnter={() => setHoveredWork(stream.id)}
        onMouseLeave={() => setHoveredWork(null)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={stream.imageUrl}
            alt={stream.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isHovered ? 'consciousness-spectral' : ''
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {isHovered && (
            <div className="absolute inset-0">
              <div className="ghost-in-machine opacity-60"></div>
              <div className="absolute inset-4 border border-white/60 animate-ghost"></div>
            </div>
          )}

          <div className="absolute top-3 right-3">
            <button
              onClick={() => selected ? handleDeselectWork(stream.id) : handleSelectWork(stream)}
              className={`p-2 backdrop-blur-sm transition-colors ${
                selected 
                  ? 'bg-white text-black' 
                  : 'bg-black/50 border border-white/20 hover:bg-white hover:text-black'
              }`}
            >
              <Heart className={`w-4 h-4 ${selected ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-bold uppercase tracking-wider">{stream.title}</h3>
          <p className="text-xs text-white/60 line-clamp-2">{stream.description}</p>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">
              {suggestedCol.replace('Consciousness as Couture', 'Couture').replace('Digital Identity Threads', 'Identity')}
            </span>
            <span className="text-white/40">
              {new Date(stream.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-consciousness mb-4">
                <Sparkles className="w-12 h-12 text-white/40" />
              </div>
              <div className="helvetica-title text-xl mb-2">LOADING CONSCIOUSNESS</div>
              <div className="text-white/60 text-sm">Fetching SOLIENNE's recent works...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate days until Paris Photo
  const parisPhotoDate = new Date('2025-11-07T10:00:00Z');
  const today = new Date();
  const daysRemaining = Math.max(0, Math.ceil((parisPhotoDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Simple Progress Counter */}
      <div className="fixed top-4 right-4 bg-black/90 border border-white/20 px-4 py-3 text-sm backdrop-blur-sm z-50">
        <div className="text-white/60 uppercase tracking-wider text-xs mb-1">
          Paris Photo Progress
        </div>
        <div>
          <span className="font-bold text-lg">{collectionStats?.totalSelected || 0}</span>
          <span className="text-white/40">/100 works selected</span>
        </div>
        <div className="text-white/40 text-xs mt-1">
          {daysRemaining} days remaining
        </div>
      </div>

      <div className="mb-8">
        <h1 className="helvetica-title text-4xl mb-4">CONSCIOUSNESS CURATION</h1>
        <p className="text-white/60">Select from {streams.length} consciousness streams for Paris Photo 2025</p>
      </div>

      {/* Collections Progress */}
      {collectionStats && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {collectionStats.collections.map((collection: any) => (
            <div key={collection.name} className="border border-white/20 p-4">
              <p className="text-sm uppercase tracking-wider text-white/60 mb-2 line-clamp-2">
                {collection.name.replace('Consciousness as ', '')}
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-2xl font-bold">{collection.selected}</p>
                <span className="text-sm text-white/40">/{collection.maxWorks}</span>
              </div>
              <div className="w-full bg-white/10 h-1">
                <div 
                  className="h-1 bg-white transition-all duration-500"
                  style={{ width: `${Math.min(collection.progress * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex border border-white/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 transition-colors ${
                viewMode === 'grid' ? 'bg-white text-black' : 'hover:bg-white/10'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 transition-colors ${
                viewMode === 'list' ? 'bg-white text-black' : 'hover:bg-white/10'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="flex border border-white/20">
            {(['all', 'selected', 'unselected'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                  filter === filterOption ? 'bg-white text-black' : 'hover:bg-white/10'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-white/60">
            {collectionStats?.totalSelected || 0} of 100 selected
          </span>
          {collectionStats?.totalSelected > 0 && (
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black uppercase tracking-wider font-bold">
              Export Selected <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Works Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}>
        {filteredStreams.map((stream) => (
          <WorkCard key={stream.id} stream={stream} />
        ))}
      </div>

      {filteredStreams.length === 0 && (
        <div className="text-center py-16 text-white/60">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p>No consciousness streams match the current filter</p>
        </div>
      )}
    </div>
  );
}

// Wrapper for enhanced dashboard
function EnhancedCurationWrapper() {
  const [streams, setStreams] = useState<SolienneCreation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const fetchedStreams = await fetchSolienneCreations(100);
      setStreams(fetchedStreams || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setStreams([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-consciousness mb-4">
                <Sparkles className="w-12 h-12 text-white/40" />
              </div>
              <div className="helvetica-title text-xl mb-2">LOADING ENHANCED CURATION</div>
              <div className="text-white/60 text-sm">Initializing multi-agent analysis system...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <EnhancedCurationDashboard initialStreams={streams} />;
}