import { NextResponse } from 'next/server';
import { fetchSolienneCreations } from '@/lib/eden-api';

export async function GET() {
  try {
    const creations = await fetchSolienneCreations(50); // Fetch more for the gallery
    
    return NextResponse.json({ 
      creations,
      total: 1740,
      loaded: creations.length 
    });
  } catch (error) {
    console.error('Failed to fetch consciousness streams:', error);
    return NextResponse.json({ 
      creations: [],
      total: 1740,
      loaded: 0,
      error: 'Failed to fetch consciousness streams' 
    }, { status: 500 });
  }
}