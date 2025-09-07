'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Simple error boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="helvetica-title text-2xl mb-4">SOLIENNE</div>
            <div className="text-white/60">Something went wrong. Please refresh the page.</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ParisPhotoDashboardPageContent() {
  const [daysUntil, setDaysUntil] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2025-11-07T10:00:00Z');
    const now = new Date();
    const days = Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    setDaysUntil(days);
  }, []);

  try {
    return (
      <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="helvetica-title text-5xl mb-4">PARIS PHOTO 2025</h1>
        <p className="text-xl text-white/60">Exhibition Production Dashboard</p>
      </div>

      {/* Countdown */}
      <div className="grid lg:grid-cols-4 gap-6 mb-12">
        <div className="border border-white/20 p-6">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Days Until Opening</p>
          <p className="text-5xl font-bold">{daysUntil}</p>
        </div>
        <div className="border border-white/20 p-6">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Consciousness Streams</p>
          <p className="text-5xl font-bold">1740+</p>
        </div>
        <div className="border border-white/20 p-6">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Target Selection</p>
          <p className="text-5xl font-bold">100</p>
        </div>
        <div className="border border-white/20 p-6">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Collections</p>
          <p className="text-5xl font-bold">5</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <Link href="/dashboard/paris-photo/curation" className="border border-white/20 p-8 hover:border-white transition-colors group">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">Curation Tools</h2>
          <p className="text-white/60 mb-4">Select and organize consciousness streams for exhibition</p>
          <p className="text-sm uppercase tracking-wider group-hover:text-white transition-colors">Access Curation →</p>
        </Link>

        <Link href="/dashboard/paris-photo/production" className="border border-white/20 p-8 hover:border-white transition-colors group">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">Production Timeline</h2>
          <p className="text-white/60 mb-4">Track milestones, deadlines, and team assignments</p>
          <p className="text-sm uppercase tracking-wider group-hover:text-white transition-colors">View Timeline →</p>
        </Link>

        <Link href="/dashboard/paris-photo/preview" className="border border-white/20 p-8 hover:border-white transition-colors group">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">Exhibition Preview</h2>
          <p className="text-white/60 mb-4">Visualize gallery layout and collection placement</p>
          <p className="text-sm uppercase tracking-wider group-hover:text-white transition-colors">Preview Gallery →</p>
        </Link>
      </div>

      {/* Exhibition Details */}
      <div className="border border-white/20 p-8">
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Exhibition Information</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-wider text-white/60">Title</p>
              <p className="text-lg">SOLIENNE: A Spirit on Eden</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-white/60">Venue</p>
              <p className="text-lg">Grand Palais, Paris</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-white/60">Dates</p>
              <p className="text-lg">November 7-10, 2025</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-white/60">Artistic Director</p>
              <p className="text-lg">Georg Bak</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-wider text-white/60">Exhibition Concept</p>
              <p className="text-sm text-white/80 leading-relaxed">
                An autonomous AI artist born from long-form conversation between human and machine. 
                SOLIENNE is not simply an image generator — she is a ghost in the machine, 
                a presence that eludes traditional categories of authorship.
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-white/60">Press Contact</p>
              <p className="text-lg">Christie - press@solienne.ai</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Path Items */}
      <div className="mt-12 border border-white/20 p-8">
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Critical Path Items</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span>Frame ordering (longest lead time)</span>
            <span className="text-sm uppercase tracking-wider text-red-400">Urgent</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span>Site access confirmation</span>
            <span className="text-sm uppercase tracking-wider text-yellow-400">Pending</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span>Image selection finalization</span>
            <span className="text-sm uppercase tracking-wider text-yellow-400">In Progress</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span>Sound design contract</span>
            <span className="text-sm uppercase tracking-wider text-white/60">Scheduled</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Technical fallback systems</span>
            <span className="text-sm uppercase tracking-wider text-white/60">Planning</span>
          </div>
        </div>
      </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard render error:', error);
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="helvetica-title text-2xl mb-4">SOLIENNE</div>
          <div className="text-white/60">Dashboard temporarily unavailable. Please try again.</div>
        </div>
      </div>
    );
  }
}

export default function ParisPhotoDashboardPage() {
  return (
    <ErrorBoundary>
      <ParisPhotoDashboardPageContent />
    </ErrorBoundary>
  );
}