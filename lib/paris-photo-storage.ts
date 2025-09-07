// Local Storage System for Paris Photo Production Data
// Hybrid approach: localStorage for curation, API for production data

import type { SolienneCreation } from './eden-api';

// Production Timeline Data
export interface ProductionMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  assignee?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dependencies?: string[];
}

// Curation Data Types
export interface CuratedCollection {
  id: string;
  name: string;
  description: string;
  theme: string;
  streamIds: string[];
  targetCount: number;
  finalizedAt?: string;
  curatedBy: string;
  notes?: string;
}

export interface ExhibitionLayout {
  id: string;
  name: string;
  collections: {
    collectionId: string;
    position: { x: number; y: number };
    size: 'small' | 'medium' | 'large';
    wallLocation: string;
  }[];
  lastUpdated: string;
  approvedBy?: string;
}

// Team Member Data
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  permissions: string[];
  lastActive?: string;
}

// Storage Keys
const STORAGE_KEYS = {
  CURATED_COLLECTIONS: 'paris-photo-collections',
  PRODUCTION_MILESTONES: 'paris-photo-milestones',
  EXHIBITION_LAYOUTS: 'paris-photo-layouts',
  TEAM_PREFERENCES: 'paris-photo-team-prefs',
  SELECTION_HISTORY: 'paris-photo-selection-history',
  PRESS_MATERIALS: 'paris-photo-press-materials',
} as const;

// Generic storage utilities
function getStorageItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Failed to parse storage item ${key}:`, error);
    return null;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to store item ${key}:`, error);
  }
}

// Curated Collections Management
export function getCuratedCollections(): CuratedCollection[] {
  return getStorageItem<CuratedCollection[]>(STORAGE_KEYS.CURATED_COLLECTIONS) || [];
}

export function saveCuratedCollection(collection: CuratedCollection): void {
  const collections = getCuratedCollections();
  const existingIndex = collections.findIndex(c => c.id === collection.id);
  
  if (existingIndex >= 0) {
    collections[existingIndex] = collection;
  } else {
    collections.push(collection);
  }
  
  setStorageItem(STORAGE_KEYS.CURATED_COLLECTIONS, collections);
}

export function deleteCuratedCollection(collectionId: string): void {
  const collections = getCuratedCollections().filter(c => c.id !== collectionId);
  setStorageItem(STORAGE_KEYS.CURATED_COLLECTIONS, collections);
}

// Production Milestones Management
export function getProductionMilestones(): ProductionMilestone[] {
  return getStorageItem<ProductionMilestone[]>(STORAGE_KEYS.PRODUCTION_MILESTONES) || getDefaultMilestones();
}

export function saveProductionMilestone(milestone: ProductionMilestone): void {
  const milestones = getProductionMilestones();
  const existingIndex = milestones.findIndex(m => m.id === milestone.id);
  
  if (existingIndex >= 0) {
    milestones[existingIndex] = milestone;
  } else {
    milestones.push(milestone);
  }
  
  setStorageItem(STORAGE_KEYS.PRODUCTION_MILESTONES, milestones);
}

// Exhibition Layouts Management
export function getExhibitionLayouts(): ExhibitionLayout[] {
  return getStorageItem<ExhibitionLayout[]>(STORAGE_KEYS.EXHIBITION_LAYOUTS) || [];
}

export function saveExhibitionLayout(layout: ExhibitionLayout): void {
  const layouts = getExhibitionLayouts();
  const existingIndex = layouts.findIndex(l => l.id === layout.id);
  
  if (existingIndex >= 0) {
    layouts[existingIndex] = layout;
  } else {
    layouts.push(layout);
  }
  
  setStorageItem(STORAGE_KEYS.EXHIBITION_LAYOUTS, layouts);
}

// Default production timeline (60-day countdown)
function getDefaultMilestones(): ProductionMilestone[] {
  const parisPhotoDate = new Date('2025-11-07T10:00:00Z');
  const today = new Date();
  
  return [
    {
      id: 'final-curation',
      title: 'Final Artwork Curation',
      description: 'Complete selection of 100 consciousness streams across 5 thematic collections',
      dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'in-progress',
      assignee: 'archie-paris-2025',
      priority: 'critical',
    },
    {
      id: 'print-production',
      title: 'Print Production & Quality Control',
      description: 'High-resolution printing and quality verification for all selected works',
      dueDate: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      assignee: 'alex-paris-2025',
      priority: 'critical',
      dependencies: ['final-curation'],
    },
    {
      id: 'exhibition-design',
      title: 'Exhibition Space Design',
      description: 'Layout design and spatial arrangement for Grand Palais presentation',
      dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'in-progress',
      assignee: 'harry-paris-2025',
      priority: 'high',
    },
    {
      id: 'press-materials',
      title: 'Press Kit & Media Materials',
      description: 'Complete press release, artist statement, and promotional materials',
      dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'in-progress',
      assignee: 'christie-paris-2025',
      priority: 'high',
    },
    {
      id: 'logistics-coordination',
      title: 'Shipping & Logistics',
      description: 'Coordinate artwork transport and installation logistics',
      dueDate: new Date(today.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      assignee: 'vlad-paris-2025',
      priority: 'medium',
      dependencies: ['print-production'],
    },
    {
      id: 'installation-setup',
      title: 'On-site Installation',
      description: 'Physical installation and final arrangement at Grand Palais',
      dueDate: new Date(today.getTime() + 58 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      assignee: 'fran-paris-2025',
      priority: 'critical',
      dependencies: ['logistics-coordination', 'exhibition-design'],
    },
  ];
}

// Team preferences and collaboration
export function getTeamPreferences(): Record<string, any> {
  return getStorageItem(STORAGE_KEYS.TEAM_PREFERENCES) || {};
}

export function saveTeamPreference(key: string, value: any): void {
  const prefs = getTeamPreferences();
  prefs[key] = value;
  setStorageItem(STORAGE_KEYS.TEAM_PREFERENCES, prefs);
}

// Clear all Paris Photo data (for testing/reset)
export function clearParisPhotoData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}