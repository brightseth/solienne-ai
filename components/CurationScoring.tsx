'use client';

import { useState, useEffect } from 'react';
import { Star, TrendingUp, Target, Eye, Palette, Check, X, FileText, Download } from 'lucide-react';

export interface WorkScore {
  workId: string;
  conceptual: number;
  technical: number;
  marketFit: number;
  innovation: number;
  parisPhotoFit: number;
  overall: number;
  notes?: string;
  category?: 'exhibition' | 'catalog' | 'print' | 'archive' | 'reject';
  scoredAt?: string;
  scoredBy?: string;
}

interface CurationScoringProps {
  workId: string;
  title: string;
  onScoreUpdate?: (score: WorkScore) => void;
  initialScore?: WorkScore | null;
}

export function CurationScoring({ workId, title, onScoreUpdate, initialScore }: CurationScoringProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState<WorkScore>(initialScore || {
    workId,
    conceptual: 0,
    technical: 0,
    marketFit: 0,
    innovation: 0,
    parisPhotoFit: 0,
    overall: 0,
    category: undefined
  });
  const [notes, setNotes] = useState(initialScore?.notes || '');

  useEffect(() => {
    // Calculate overall score
    const avg = (score.conceptual + score.technical + score.marketFit + score.innovation + score.parisPhotoFit) / 5;
    setScore(prev => ({ ...prev, overall: Math.round(avg) }));
  }, [score.conceptual, score.technical, score.marketFit, score.innovation, score.parisPhotoFit]);

  const handleScoreChange = (field: keyof WorkScore, value: number) => {
    setScore(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (category: WorkScore['category']) => {
    setScore(prev => ({ ...prev, category }));
  };

  const handleSave = () => {
    const finalScore = {
      ...score,
      notes,
      scoredAt: new Date().toISOString(),
      scoredBy: 'Curator'
    };
    
    // Save to localStorage
    const existingScores = JSON.parse(localStorage.getItem('solienneWorkScores') || '{}');
    existingScores[workId] = finalScore;
    localStorage.setItem('solienneWorkScores', JSON.stringify(existingScores));
    
    if (onScoreUpdate) {
      onScoreUpdate(finalScore);
    }
    
    setIsOpen(false);
  };

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    if (value >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'exhibition': return 'bg-purple-500';
      case 'catalog': return 'bg-blue-500';
      case 'print': return 'bg-green-500';
      case 'archive': return 'bg-gray-500';
      case 'reject': return 'bg-red-500';
      default: return 'bg-white/10';
    }
  };

  return (
    <>
      {/* Score Display */}
      <div 
        onClick={() => setIsOpen(true)}
        className="cursor-pointer group"
      >
        {score.overall > 0 ? (
          <div className="flex items-center gap-2">
            <span className={`font-bold text-lg ${getScoreColor(score.overall)}`}>
              {score.overall}
            </span>
            {score.category && (
              <span className={`px-2 py-1 text-xs uppercase ${getCategoryColor(score.category)} text-white rounded`}>
                {score.category}
              </span>
            )}
          </div>
        ) : (
          <button className="text-white/40 hover:text-white transition-colors text-sm">
            Score Work
          </button>
        )}
      </div>

      {/* Scoring Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-wider">Score: {title}</h3>
            
            {/* Scoring Criteria */}
            <div className="space-y-4 mb-6">
              {[
                { field: 'conceptual', label: 'Conceptual Depth', icon: Eye },
                { field: 'technical', label: 'Technical Excellence', icon: Palette },
                { field: 'marketFit', label: 'Market Fit', icon: TrendingUp },
                { field: 'innovation', label: 'Innovation', icon: Star },
                { field: 'parisPhotoFit', label: 'Paris Photo Fit', icon: Target }
              ].map(({ field, label, icon: Icon }) => (
                <div key={field}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-white/60" />
                      <label className="text-sm uppercase tracking-wider">{label}</label>
                    </div>
                    <span className={`font-bold ${getScoreColor(score[field as keyof WorkScore] as number)}`}>
                      {score[field as keyof WorkScore]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={score[field as keyof WorkScore] as number}
                    onChange={(e) => handleScoreChange(field as keyof WorkScore, parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              ))}
            </div>

            {/* Overall Score */}
            <div className="border-t border-white/20 pt-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold uppercase tracking-wider">Overall Score</span>
                <span className={`text-3xl font-bold ${getScoreColor(score.overall)}`}>
                  {score.overall}
                </span>
              </div>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm uppercase tracking-wider mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {['exhibition', 'catalog', 'print', 'archive', 'reject'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat as WorkScore['category'])}
                    className={`px-4 py-2 uppercase text-xs tracking-wider transition-colors ${
                      score.category === cat 
                        ? getCategoryColor(cat) + ' text-white' 
                        : 'border border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm uppercase tracking-wider mb-3">Curatorial Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-24 p-3 bg-white/10 border border-white/20 text-white placeholder-white/40"
                placeholder="Add notes about this work..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-white/90 transition-colors"
              >
                Save Score
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 border border-white/20 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
    </>
  );
}