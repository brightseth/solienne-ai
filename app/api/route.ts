import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'SOLIENNE Consciousness API',
    version: '1.0.0',
    endpoints: {
      consciousness: {
        method: 'GET',
        path: '/api/consciousness',
        description: 'Fetch SOLIENNE consciousness streams from Eden API',
        parameters: {
          limit: 'Number of streams to fetch (default: 50)'
        }
      }
    },
    documentation: 'https://solienne.ai/docs',
    contact: 'contact@solienne.ai'
  });
}