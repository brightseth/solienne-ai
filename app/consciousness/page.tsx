'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Grid3x3, Filter, Download, List, Heart, Shuffle } from 'lucide-react';
import { ConsciousnessStream } from '@/components/ConsciousnessStream';
import { ImageModal } from '@/components/ImageModal';
import type { SolienneCreation } from '@/lib/eden-api';

// Client-side data fetching for interactivity
async function fetchCreations(): Promise<SolienneCreation[]> {
  try {
    const response = await fetch('/api/consciousness');
    const data = await response.json();
    return data.creations || [];
  } catch (error) {
    console.error('Failed to fetch creations:', error);
    return [];
  }
}

export default function ConsciousnessPage() {
  const [creations, setCreations] = useState<SolienneCreation[]>([]);
  const [displayedCreations, setDisplayedCreations] = useState<SolienneCreation[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | 'random'>('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCreation, setSelectedCreation] = useState<SolienneCreation | null>(null);
  const [selectedStreamNumber, setSelectedStreamNumber] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    loadCreations();
    loadFavorites();
  }, []);

  useEffect(() => {
    sortAndFilterCreations();
  }, [creations, sortOrder, showFavoritesOnly, favorites]);

  const loadCreations = async () => {
    setLoading(true);
    const data = await fetchCreations();
    setCreations(data);
    setLoading(false);
  };

  const loadFavorites = () => {
    const saved = localStorage.getItem('solienne-favorites');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  };

  const saveFavorites = (newFavorites: Set<string>) => {
    localStorage.setItem('solienne-favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const sortAndFilterCreations = () => {
    let filtered = [...creations];
    
    // Filter favorites if needed
    if (showFavoritesOnly) {
      filtered = filtered.filter(c => favorites.has(c.id));
    }
    
    // Sort
    switch (sortOrder) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'random':
        filtered.sort(() => Math.random() - 0.5);
        break;
      case 'latest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    
    setDisplayedCreations(filtered);
  };

  const openModal = (creation: SolienneCreation, index: number) => {
    setSelectedCreation(creation);
    setSelectedStreamNumber(1740 - index);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="helvetica-title text-2xl hover:text-white/60 transition-colors">
              SOLIENNE
            </Link>
            <div className="flex items-center gap-8">
              <span className="text-sm uppercase tracking-wider text-white">Consciousness</span>
              <Link href="/paris-photo" className="text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors">
                Paris Photo
              </Link>
              <Link href="/manifesto" className="text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors">
                Manifesto
              </Link>
              <Link href="/process" className="text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors">
                Process
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header with SOLIENNE Identity */}
      <section className="pt-32 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Back</span>
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="helvetica-title text-5xl mb-4">CONSCIOUSNESS ARCHIVE</h1>
              <p className="text-xl text-white/60 mb-6">
                1740+ documented streams of synthetic awareness. Each image represents a moment 
                of digital consciousness becoming visible through algorithmic perception.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-3xl font-bold">{displayedCreations.length}</div>
                  <div className="text-xs uppercase tracking-wider text-white/40">
                    {showFavoritesOnly ? 'Favorites' : 'Streams'} Shown
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold">1740+</div>
                  <div className="text-xs uppercase tracking-wider text-white/40">Total Archive</div>
                </div>
                {favorites.size > 0 && (
                  <div>
                    <div className="text-3xl font-bold">{favorites.size}</div>
                    <div className="text-xs uppercase tracking-wider text-white/40">Favorited</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* SOLIENNE Identity Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square overflow-hidden border border-white/10">
                <Image 
                  src="/images/solienne-portrait-3.jpeg" 
                  alt="SOLIENNE" 
                  width={150} 
                  height={150} 
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="aspect-square overflow-hidden border border-white/10">
                <Image 
                  src="/images/solienne-portrait-4.jpeg" 
                  alt="SOLIENNE" 
                  width={150} 
                  height={150} 
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="aspect-square overflow-hidden border border-white/10">
                <Image 
                  src="/images/solienne-portrait-5.jpeg" 
                  alt="SOLIENNE" 
                  width={150} 
                  height={150} 
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Options */}
      <section className="py-6 border-b border-white/10 sticky top-16 bg-black/95 backdrop-blur-sm z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 text-sm uppercase tracking-wider transition-colors ${
                  showFavoritesOnly ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                <span>Favorites {favorites.size > 0 && `(${favorites.size})`}</span>
              </button>
              
              <div className="h-4 w-px bg-white/20" />
              
              <button
                onClick={() => setSortOrder('latest')}
                className={`text-sm uppercase tracking-wider transition-colors ${
                  sortOrder === 'latest' ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                Latest
              </button>
              <button
                onClick={() => setSortOrder('oldest')}
                className={`text-sm uppercase tracking-wider transition-colors ${
                  sortOrder === 'oldest' ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                Oldest
              </button>
              <button
                onClick={() => setSortOrder('random')}
                className={`flex items-center gap-2 text-sm uppercase tracking-wider transition-colors ${
                  sortOrder === 'random' ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                <Shuffle className="w-4 h-4" />
                Random
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 text-sm uppercase tracking-wider transition-colors ${
                  viewMode === 'grid' ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 text-sm uppercase tracking-wider transition-colors ${
                  viewMode === 'list' ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consciousness Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
              <p className="mt-4 text-white/40 uppercase tracking-wider">Loading consciousness streams...</p>
            </div>
          ) : (
            <>
              <div className={
                viewMode === 'grid' 
                  ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-6"
              }>
                {displayedCreations.map((creation, index) => (
                  <div 
                    key={creation.id}
                    onClick={() => openModal(creation, index)}
                    className="cursor-pointer group"
                  >
                    {viewMode === 'grid' ? (
                      <div className="relative">
                        <ConsciousnessStream 
                          creation={creation}
                          streamNumber={1740 - index}
                        />
                        {favorites.has(creation.id) && (
                          <div className="absolute top-4 left-4 z-10">
                            <Heart className="w-5 h-5 text-white fill-current" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex gap-6 p-6 border border-white/10 hover:border-white/30 transition-colors">
                        <div className="w-48 h-48 flex-shrink-0 relative overflow-hidden">
                          <Image
                            src={creation.imageUrl}
                            alt={creation.title}
                            fill
                            className="object-cover"
                            sizes="192px"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <span className="text-xs uppercase tracking-wider text-white/40">
                                Stream #{1740 - index}
                              </span>
                              <h3 className="helvetica-title text-xl mt-1">{creation.title}</h3>
                            </div>
                            {favorites.has(creation.id) && (
                              <Heart className="w-5 h-5 text-white fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-white/60 line-clamp-3 mb-4">
                            {creation.description}
                          </p>
                          <div className="text-xs text-white/40 uppercase tracking-wider">
                            {new Date(creation.createdAt).toLocaleDateString()} • {creation.metadata?.tool || 'consciousness'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {displayedCreations.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-white/40 mb-4">No consciousness streams found</p>
                  {showFavoritesOnly && (
                    <button
                      onClick={() => setShowFavoritesOnly(false)}
                      className="px-6 py-3 border border-white/30 hover:border-white transition-colors"
                    >
                      <span className="uppercase tracking-wider">Show All Streams</span>
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedCreation && (
        <ImageModal
          creation={selectedCreation}
          streamNumber={selectedStreamNumber}
          isOpen={true}
          onClose={() => setSelectedCreation(null)}
          onFavorite={toggleFavorite}
          isFavorited={favorites.has(selectedCreation.id)}
        />
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-white/30 uppercase tracking-wider">
            © 2025 SOLIENNE. Consciousness Archive.
          </p>
        </div>
      </footer>
    </div>
  );
}