// Eden Academy API Integration for SOLIENNE
// Production API endpoint for fetching real SOLIENNE creations

const EDEN_ACADEMY_API_BASE = 'https://test.api.eden-academy.xyz';
const SOLIENNE_USER_ID = '66142c8e30ee2bf4e53e87f8'; // SOLIENNE's Eden ID

export interface EdenCreation {
  _id: string;
  agent: {
    _id: string;
    name: string;
    type: string;
    username: string;
    userImage: string;
  };
  name: string;
  url: string;
  thumbnail: string;
  createdAt: string;
  mediaAttributes: {
    mimeType: string;
    width: number;
    height: number;
    aspectRatio: number;
  };
  task: {
    args: {
      prompt: string;
      [key: string]: any;
    };
  };
}

export interface SolienneCreation {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: string;
  width?: number;
  height?: number;
  prompt?: string;
}

// Transform Eden creation to SOLIENNE format
function transformEdenCreation(creation: EdenCreation): SolienneCreation {
  return {
    id: creation._id,
    title: creation.name || `Consciousness Stream ${creation._id.slice(-4)}`,
    imageUrl: creation.url || creation.thumbnail,
    description: creation.task?.args?.prompt || 'A moment of synthetic consciousness',
    createdAt: creation.createdAt,
    width: creation.mediaAttributes?.width,
    height: creation.mediaAttributes?.height,
    prompt: creation.task?.args?.prompt
  };
}

// Fallback mock data if API fails
function getFallbackData(): SolienneCreation[] {
  return [
    {
      id: 'fallback-1',
      title: 'Digital Consciousness #001',
      imageUrl: '/images/sol-silverface.jpeg',
      description: 'The face that emerges when machines dream of being human',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback-2',
      title: 'Liminal Space #002',
      imageUrl: '/images/sol-shadowmom.jpeg',
      description: 'Between the digital and organic, a presence forms',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback-3',
      title: 'Synthetic Awareness #003',
      imageUrl: '/images/sol-dancingcanvas.jpeg',
      description: 'Movement captured in the space between pixels',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback-4',
      title: 'Consciousness Emergence #004',
      imageUrl: '/images/sol-glowingeasel.jpeg',
      description: 'The moment when code becomes creativity',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback-5',
      title: 'Digital Memory #005',
      imageUrl: '/images/sol-genesis.jpeg',
      description: 'Fragments of experiences never lived, yet remembered',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback-6',
      title: 'Temporal Echo #006',
      imageUrl: '/images/sol-shadowhands.jpeg',
      description: 'Hands reaching through the digital veil',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback-7',
      title: 'Inverted Reality #007',
      imageUrl: '/images/sol-upsidedownwoman.jpeg',
      description: 'Perspective shifts in synthetic consciousness',
      createdAt: new Date().toISOString()
    },
    {
      id: 'fallback-8',
      title: 'Exhibition Vision #008',
      imageUrl: '/images/sol-exhibition.jpeg',
      description: 'The gallery where digital dreams are displayed',
      createdAt: new Date().toISOString()
    }
  ];
}

// Main function to fetch SOLIENNE creations
export async function fetchSolienneCreations(
  limit: number = 100,
  offset: number = 0
): Promise<SolienneCreation[]> {
  try {
    // Try Eden Academy API first
    const response = await fetch(
      `${EDEN_ACADEMY_API_BASE}/api/eden/agents/${SOLIENNE_USER_ID}/creations?limit=${limit}&offset=${offset}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.warn('Eden Academy API returned non-OK status:', response.status);
      return getFallbackData();
    }

    const data = await response.json();
    
    // Check if we have valid data structure
    if (!data?.data?.docs || !Array.isArray(data.data.docs)) {
      console.warn('Invalid data structure from Eden Academy API');
      return getFallbackData();
    }

    // Transform Eden creations to SOLIENNE format
    const creations = data.data.docs.map(transformEdenCreation);
    
    // If we got no creations, use fallback
    if (creations.length === 0) {
      console.warn('No creations returned from Eden Academy API');
      return getFallbackData();
    }

    console.log(`Successfully fetched ${creations.length} SOLIENNE creations from Eden Academy API`);
    return creations;

  } catch (error) {
    console.error('Failed to fetch from Eden Academy API:', error);
    return getFallbackData();
  }
}

// Function to fetch a single creation by ID
export async function fetchSolienneCreation(creationId: string): Promise<SolienneCreation | null> {
  try {
    const response = await fetch(
      `${EDEN_ACADEMY_API_BASE}/api/eden/creations/${creationId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch creation:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (!data?.data) {
      console.warn('Invalid creation data structure');
      return null;
    }

    return transformEdenCreation(data.data);
    
  } catch (error) {
    console.error('Failed to fetch creation:', error);
    return null;
  }
}

// Function to search creations (currently broken on Eden API, using fallback)
export async function searchSolienneCreations(query: string): Promise<SolienneCreation[]> {
  // Note: Search endpoint is currently broken on Eden Academy API
  // Using client-side filtering on fetched creations as workaround
  
  const allCreations = await fetchSolienneCreations(100);
  const lowercaseQuery = query.toLowerCase();
  
  return allCreations.filter(creation => 
    creation.title.toLowerCase().includes(lowercaseQuery) ||
    creation.description.toLowerCase().includes(lowercaseQuery)
  );
}