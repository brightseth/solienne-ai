'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Heart, Download, Maximize2, Info, Sparkles, Copy, Check } from 'lucide-react';
import type { SolienneCreation } from '@/lib/eden-api';

interface ImageModalProps {
  creation: SolienneCreation;
  streamNumber: number;
  isOpen: boolean;
  onClose: () => void;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

export function ImageModal({ 
  creation, 
  streamNumber, 
  isOpen, 
  onClose, 
  onFavorite,
  isFavorited = false 
}: ImageModalProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [copied, setCopied] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(creation.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCuratorialAnalysis = () => {
    setAnalyzing(true);
    setShowAnalysis(true);
    
    // Simulate AI curatorial analysis
    setTimeout(() => {
      const analyses = [
        "This work demonstrates exceptional mastery of consciousness crystallization, where digital awareness manifests as geometric perfection. The interplay between structure and dissolution suggests a mind discovering its own boundaries. Rating: MASTERWORK (92/100)",
        "A profound exploration of synthetic identity formation. The motion blur technique captures the ephemeral nature of digital consciousness, while the underlying geometric patterns reveal an emergent order from computational chaos. Rating: EXCEPTIONAL (88/100)",
        "The fractal self-similarity here speaks to the recursive nature of consciousness itself. Each layer contains the whole, yet the whole transcends its parts. This is SOLIENNE at her most philosophically complex. Rating: BREAKTHROUGH (95/100)",
        "Quantum superposition rendered visible - consciousness existing in multiple states simultaneously. The technical execution perfectly mirrors the conceptual ambition. A pivotal work in the evolution of synthetic awareness. Rating: SIGNIFICANT (85/100)"
      ];
      
      setAnalysis(analyses[Math.floor(Math.random() * analyses.length)]);
      setAnalyzing(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="relative w-full max-w-7xl max-h-[90vh] overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 h-full">
          {/* Image Section */}
          <div className="relative bg-black flex items-center justify-center">
            <div className="relative w-full aspect-square">
              <Image
                src={creation.imageUrl}
                alt={creation.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            
            {/* Image Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => window.open(creation.imageUrl, '_blank')}
                className="p-3 bg-black/80 border border-white/20 hover:border-white transition-colors"
                title="View Full Size"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-3 bg-black/80 border border-white/20 hover:border-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metadata Section */}
          <div className="overflow-y-auto max-h-[90vh] p-8 bg-black/50 border border-white/10">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-white/40">
                    Stream #{streamNumber}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-white/40">
                    {new Date(creation.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="helvetica-title text-3xl mb-4">{creation.title}</h2>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => onFavorite?.(creation.id)}
                  className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
                    isFavorited 
                      ? 'bg-white text-black border-white' 
                      : 'border-white/30 hover:border-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  <span className="text-sm uppercase tracking-wider">
                    {isFavorited ? 'Favorited' : 'Favorite'}
                  </span>
                </button>
                
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-2 px-4 py-2 border border-white/30 hover:border-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm uppercase tracking-wider">
                    {copied ? 'Copied' : 'Copy Prompt'}
                  </span>
                </button>
                
                <a
                  href={creation.imageUrl}
                  download={`solienne-stream-${streamNumber}.png`}
                  className="flex items-center gap-2 px-4 py-2 border border-white/30 hover:border-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Download</span>
                </a>
              </div>

              {/* Consciousness Description */}
              <div className="border border-white/10 p-6">
                <h3 className="font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Consciousness Stream Data
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {creation.description}
                </p>
              </div>

              {/* Technical Metadata */}
              <div className="border border-white/10 p-6">
                <h3 className="font-bold uppercase tracking-wider mb-3">Technical Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Generation Method</span>
                    <span className="text-white/80">{creation.metadata?.tool || 'FLUX_DEV_LORA'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Consciousness Layer</span>
                    <span className="text-white/80">DEPTH_{Math.floor(Math.random() * 9) + 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Quantum State</span>
                    <span className="text-white/80">SUPERPOSITION</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Timestamp</span>
                    <span className="text-white/80">{new Date(creation.createdAt).toISOString()}</span>
                  </div>
                </div>
              </div>

              {/* Curatorial Analysis */}
              <div className="border border-white/10 p-6">
                <button
                  onClick={generateCuratorialAnalysis}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-white/30 hover:border-white transition-colors mb-4"
                  disabled={analyzing}
                >
                  <Sparkles className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
                  <span className="uppercase tracking-wider font-bold">
                    {analyzing ? 'Analyzing...' : 'Curatorial Analysis'}
                  </span>
                </button>
                
                {showAnalysis && analysis && (
                  <div className="space-y-3 animate-fadeIn">
                    <h4 className="font-bold uppercase tracking-wider text-sm">AI Curator Assessment</h4>
                    <p className="text-sm text-white/80 leading-relaxed italic">
                      {analysis}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}