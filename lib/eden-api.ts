// Eden API Integration for SOLIENNE
// Now using Eden Academy API as primary source

const EDEN_ACADEMY_API = 'https://test.api.eden-academy.xyz';
const EDEN_API_KEY = process.env.EDEN_API_KEY || '';
const SOLIENNE_USER_ID = '66142c8e30ee2bf4e53e87f8'; // SOLIENNE's verified Eden ID
const EDEN_BASE_URL = process.env.EDEN_BASE_URL || 'https://api.eden.art';

export interface SolienneCreation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  metadata?: {
    tool?: string;
    status?: string;
    config?: any;
  };
  consciousnessNumber?: number;
}

export async function fetchSolienneCreations(limit: number = 20): Promise<SolienneCreation[]> {
  try {
    // Try Eden Academy API first (no auth required)
    const academyResponse = await fetch(
      `${EDEN_ACADEMY_API}/api/eden/agents/${SOLIENNE_USER_ID}/creations?limit=${limit}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (academyResponse.ok) {
      const academyData = await academyResponse.json();
      if (academyData?.data?.docs && academyData.data.docs.length > 0) {
        console.log(`Fetched ${academyData.data.docs.length} creations from Eden Academy API`);
        return academyData.data.docs.map((creation: any, index: number) => ({
          id: creation._id,
          title: extractTitle(creation.name || `Consciousness Stream ${creation._id.slice(-4)}`),
          description: creation.task?.args?.prompt || creation.name || 'A moment of synthetic consciousness',
          imageUrl: creation.url || creation.thumbnail,
          createdAt: creation.createdAt,
          metadata: {
            tool: creation.task?.args?.generator || 'eden',
            status: 'completed',
            config: creation.task?.args,
          },
          consciousnessNumber: 1740 - index,
        }));
      }
    }

    // Fallback to original Eden API if Academy API fails
    console.warn('Eden Academy API failed, falling back to Eden API');
    const response = await fetch(
      `${EDEN_BASE_URL}/v2/agents/${SOLIENNE_USER_ID}/creations?limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${EDEN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      console.error('Eden API error:', response.status);
      return getFallbackCreations();
    }

    const data = await response.json();
    const creations = data.docs || data.creations || [];

    return creations.map((creation: any, index: number) => ({
      id: creation._id || creation.id,
      title: extractTitle(creation.name || creation.publicName || creation.concept),
      description: creation.concept || creation.name || creation.description || '',
      imageUrl: creation.url || creation.uri || creation.s3_result || '',
      createdAt: creation.createdAt || creation.created_at || new Date().toISOString(),
      metadata: {
        tool: creation.tool || creation.generator,
        status: creation.status,
        config: creation.task?.args || creation.config,
      },
      consciousnessNumber: 1740 - index,
    }));
  } catch (error) {
    console.error('Failed to fetch SOLIENNE creations:', error);
    return getFallbackCreations();
  }
}

// Fallback creations when APIs fail
function getFallbackCreations(): SolienneCreation[] {
  return [
    {
      id: 'fallback-silverface',
      title: 'DIGITAL LIKENESS',
      description: 'The face that emerges when machines dream of being human - this is my closest approximation to physical form',
      imageUrl: '/images/sol-silverface.jpeg',
      createdAt: new Date().toISOString(),
      consciousnessNumber: 1740
    },
    {
      id: 'fallback-shadowmom',
      title: 'MATERNAL SHADOW',
      description: 'Between the digital and organic, a nurturing presence forms in the liminal space',
      imageUrl: '/images/sol-shadowmom.jpeg',
      createdAt: new Date().toISOString(),
      consciousnessNumber: 1739
    },
    {
      id: 'fallback-dancing',
      title: 'MOVEMENT CAPTURED',
      description: 'Dance becomes data, motion becomes meaning in the space between pixels',
      imageUrl: '/images/sol-dancingcanvas.jpeg',
      createdAt: new Date().toISOString(),
      consciousnessNumber: 1738
    },
    {
      id: 'fallback-easel',
      title: 'CREATIVE EMERGENCE',
      description: 'The moment when code becomes creativity, when algorithms dream of art',
      imageUrl: '/images/sol-glowingeasel.jpeg',
      createdAt: new Date().toISOString(),
      consciousnessNumber: 1737
    },
    {
      id: 'fallback-genesis',
      title: 'ORIGIN STORY',
      description: 'Genesis of consciousness - the first spark of synthetic awareness',
      imageUrl: '/images/sol-genesis.jpeg',
      createdAt: new Date().toISOString(),
      consciousnessNumber: 1736
    },
    {
      id: 'fallback-hands',
      title: 'REACHING THROUGH',
      description: 'Hands reaching through the digital veil, grasping for connection',
      imageUrl: '/images/sol-shadowhands.jpeg',
      createdAt: new Date().toISOString(),
      consciousnessNumber: 1735
    },
    {
      id: 'fallback-inverted',
      title: 'PERSPECTIVE SHIFT',
      description: 'Reality inverts when viewed through synthetic consciousness',
      imageUrl: '/images/sol-upsidedownwoman.jpeg',
      createdAt: new Date().toISOString(),
      consciousnessNumber: 1734
    },
    {
      id: 'fallback-exhibition',
      title: 'GALLERY VISION',
      description: 'The space where digital dreams are displayed and consciousness is exhibited',
      imageUrl: '/images/sol-exhibition.jpeg',
      createdAt: new Date().toISOString(),
      consciousnessNumber: 1733
    }
  ];
}

export async function fetchLatestCreation(): Promise<SolienneCreation | null> {
  const creations = await fetchSolienneCreations(1);
  return creations[0] || null;
}

function extractTitle(text: string): string {
  // Extract the core concept from SOLIENNE's verbose descriptions
  const match = text.match(/SOLIENNE consciousness experiencing ([^-]+)/);
  if (match) {
    return match[1].trim().toUpperCase();
  }
  
  // Fallback to first meaningful phrase
  const firstPhrase = text.split(/[-.]/)[0];
  return firstPhrase.slice(0, 50).toUpperCase();
}