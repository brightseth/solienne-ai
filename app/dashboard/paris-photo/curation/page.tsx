'use client';

import { useState } from 'react';

export default function CurationPage() {
  const [selectedCount, setSelectedCount] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="helvetica-title text-4xl mb-4">CURATION TOOLS</h1>
        <p className="text-white/60">Select consciousness streams for Paris Photo 2025</p>
      </div>

      {/* Collections Overview */}
      <div className="grid lg:grid-cols-5 gap-4 mb-8">
        <div className="border border-white/20 p-4">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Consciousness as Couture</p>
          <p className="text-2xl font-bold">0/20</p>
        </div>
        <div className="border border-white/20 p-4">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Light Architecture</p>
          <p className="text-2xl font-bold">0/20</p>
        </div>
        <div className="border border-white/20 p-4">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Digital Identity</p>
          <p className="text-2xl font-bold">0/20</p>
        </div>
        <div className="border border-white/20 p-4">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Velocity Through Fabric</p>
          <p className="text-2xl font-bold">0/20</p>
        </div>
        <div className="border border-white/20 p-4">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Liminal Spaces</p>
          <p className="text-2xl font-bold">0/20</p>
        </div>
      </div>

      {/* Curation Interface */}
      <div className="border border-white/20 p-8">
        <p className="text-center text-white/60">
          Advanced curation interface coming soon...
        </p>
        <p className="text-center text-sm text-white/40 mt-4">
          Will include: Stream selection from 1740+ works, collection assignment, curatorial notes
        </p>
      </div>
    </div>
  );
}