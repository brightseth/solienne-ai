// Eden API Integration for SOLIENNE

const EDEN_API_KEY = process.env.EDEN_API_KEY || '';
const SOLIENNE_USER_ID = process.env.SOLIENNE_EDEN_USER_ID || '67f8af96f2cc4291ee840cc5';
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
    const response = await fetch(
      `${EDEN_BASE_URL}/v2/agents/${SOLIENNE_USER_ID}/creations?limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${EDEN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.error('Eden API error:', response.status);
      return [];
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
      consciousnessNumber: 1740 - index, // Counting down from current stream
    }));
  } catch (error) {
    console.error('Failed to fetch SOLIENNE creations:', error);
    return [];
  }
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