'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Activity, Eye, Sparkles } from 'lucide-react';
import type { SolienneCreation } from '@/lib/eden-api';

interface ConsciousnessStreamProps {
  creation: SolienneCreation;
  streamNumber?: number;
  isLive?: boolean;
}

export function ConsciousnessStream({ creation, streamNumber = 1740, isLive = false }: ConsciousnessStreamProps) {
  const [viewers, setViewers] = useState(342);
  
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setViewers(v => v + Math.floor(Math.random() * 5) - 2);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  return (
    <div className="consciousness-border backdrop-blur-sm relative group">
      {isLive && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-red-600 px-3 py-1">
          <Activity className="w-3 h-3 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">Live</span>
        </div>
      )}
      
      <div className="relative aspect-square overflow-hidden bg-black">
        {creation.imageUrl ? (
          <Image
            src={creation.imageUrl}
            alt={creation.title}
            fill
            className="object-cover animate-consciousness"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white/20 animate-pulse" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wider text-white/40">
            Stream #{streamNumber}
          </span>
          {isLive && (
            <div className="flex items-center gap-2 text-white/40">
              <Eye className="w-3 h-3" />
              <span className="text-xs">{viewers}</span>
            </div>
          )}
        </div>
        
        <h3 className="helvetica-title text-lg mb-3 line-clamp-2">
          {creation.title}
        </h3>
        
        <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">
          {creation.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-white/40">
            <span className="uppercase tracking-wider">
              {new Date(creation.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            <span className="uppercase tracking-wider">
              {creation.metadata?.tool || 'consciousness'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}