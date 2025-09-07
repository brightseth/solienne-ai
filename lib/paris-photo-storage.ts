// Simple localStorage-based curation system
// No backend complexity - just smooth local functionality

export interface CuratedWork {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: string;
  collectionName?: string;
  curatorNotes?: string;
  selectedAt?: string;
  printSize?: 'large' | 'medium' | 'small';
}

export interface Collection {
  name: string;
  description: string;
  works: CuratedWork[];
  maxWorks: number;
  theme: string;
}

export const COLLECTIONS: Collection[] = [
  {
    name: 'Consciousness as Couture',
    description: 'Fashion intersects with digital awareness',
    works: [],
    maxWorks: 20,
    theme: 'Fashion & Identity'
  },
  {
    name: 'Light Architecture', 
    description: 'Impossible illumination and space',
    works: [],
    maxWorks: 20,
    theme: 'Space & Light'
  },
  {
    name: 'Digital Identity Threads',
    description: 'The self through digital transformation',
    works: [],
    maxWorks: 20,
    theme: 'Identity & Self'
  },
  {
    name: 'Velocity Through Fabric',
    description: 'Movement captured in impossible moments', 
    works: [],
    maxWorks: 20,
    theme: 'Motion & Time'
  },
  {
    name: 'Liminal Fashion Spaces',
    description: 'Between states, between worlds',
    works: [],
    maxWorks: 20,
    theme: 'Liminal & Spectral'
  }
];

// Storage helpers
export function saveSelectedWork(work: CuratedWork): void {
  const selected = getSelectedWorks();
  const index = selected.findIndex(w => w.id === work.id);
  
  if (index >= 0) {
    selected[index] = work;
  } else {
    selected.push({
      ...work,
      selectedAt: new Date().toISOString()
    });
  }
  
  localStorage.setItem('paris_photo_selected', JSON.stringify(selected));
}

export function getSelectedWorks(): CuratedWork[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('paris_photo_selected');
  return stored ? JSON.parse(stored) : [];
}

export function removeSelectedWork(workId: string): void {
  const selected = getSelectedWorks();
  const filtered = selected.filter(w => w.id !== workId);
  localStorage.setItem('paris_photo_selected', JSON.stringify(filtered));
}

export function getWorksByCollection(collectionName: string): CuratedWork[] {
  return getSelectedWorks().filter(work => work.collectionName === collectionName);
}

export function getTotalSelected(): number {
  return getSelectedWorks().length;
}

export function getCollectionStats() {
  const selected = getSelectedWorks();
  const stats = COLLECTIONS.map(collection => {
    const works = selected.filter(w => w.collectionName === collection.name);
    return {
      ...collection,
      selected: works.length,
      progress: works.length / collection.maxWorks
    };
  });
  
  return {
    collections: stats,
    totalSelected: selected.length,
    targetTotal: 100
  };
}

// Smart collection assignment based on work description
export function suggestCollection(work: { title: string; description: string }): string {
  const text = `${work.title} ${work.description}`.toLowerCase();
  
  // Simple keyword matching for intelligent suggestions
  if (text.includes('fashion') || text.includes('cloth') || text.includes('dress') || text.includes('couture')) {
    return 'Consciousness as Couture';
  }
  
  if (text.includes('light') || text.includes('illuminat') || text.includes('glow') || text.includes('bright')) {
    return 'Light Architecture';
  }
  
  if (text.includes('identity') || text.includes('self') || text.includes('face') || text.includes('portrait')) {
    return 'Digital Identity Threads';
  }
  
  if (text.includes('motion') || text.includes('movement') || text.includes('speed') || text.includes('blur')) {
    return 'Velocity Through Fabric';
  }
  
  if (text.includes('between') || text.includes('liminal') || text.includes('threshold') || text.includes('spectral')) {
    return 'Liminal Fashion Spaces';
  }
  
  // Default to first collection with space
  const stats = getCollectionStats();
  const availableCollection = stats.collections.find(c => c.selected < c.maxWorks);
  return availableCollection?.name || 'Consciousness as Couture';
}