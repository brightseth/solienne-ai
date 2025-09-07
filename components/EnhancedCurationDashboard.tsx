'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Heart, Download, Eye, Sparkles, ArrowRight, Filter, Grid, List, 
  Star, TrendingUp, Target, Palette, Brain, DollarSign, Users,
  FileText, Save, Upload, AlertCircle, CheckCircle, ChevronDown
} from 'lucide-react';
import { CurationScoring, type WorkScore } from './CurationScoring';
import { AgentCouncil, SUECurator, type SUEAnalysis } from '@/lib/curation-agents';
import { type SolienneCreation } from '@/lib/eden-api';

interface EnhancedWork extends SolienneCreation {
  score?: WorkScore;
  agentAnalysis?: {
    sue?: SUEAnalysis;
    consensus?: any;
  };
  bucket?: 'reviewing' | 'shortlist' | 'final';
}

interface CurationStats {
  totalWorks: number;
  scored: number;
  reviewing: number;
  shortlisted: number;
  final: number;
  averageScore: number;
  topThemes: string[];
}

export function EnhancedCurationDashboard({ 
  initialStreams 
}: { 
  initialStreams: SolienneCreation[] 
}) {
  // State
  const [works, setWorks] = useState<EnhancedWork[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterMode, setFilterMode] = useState<'all' | 'scored' | 'unscored' | 'highScore' | 'sue-approved'>('all');
  const [scoringMode, setScoringMode] = useState<'human' | 'agent' | 'hybrid'>('hybrid');
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [stats, setStats] = useState<CurationStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // Feature flags
  const FEATURES = {
    scoring: true,
    agentAnalysis: true,
    buckets: true,
    export: true
  };

  const council = new AgentCouncil();
  const sue = new SUECurator();

  // Initialize works with saved scores
  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('solienneWorkScores') || '{}');
    const savedBuckets = JSON.parse(localStorage.getItem('solienneWorkBuckets') || '{}');
    const savedAnalysis = JSON.parse(localStorage.getItem('solienneAgentAnalysis') || '{}');
    
    const enhancedWorks = initialStreams.map(stream => ({
      ...stream,
      score: savedScores[stream.id],
      bucket: savedBuckets[stream.id],
      agentAnalysis: savedAnalysis[stream.id]
    }));
    
    setWorks(enhancedWorks);
    calculateStats(enhancedWorks);
  }, [initialStreams]);

  // Calculate statistics
  const calculateStats = (worksList: EnhancedWork[]) => {
    const scored = worksList.filter(w => w.score);
    const reviewing = worksList.filter(w => w.bucket === 'reviewing');
    const shortlisted = worksList.filter(w => w.bucket === 'shortlist');
    const final = worksList.filter(w => w.bucket === 'final');
    
    const avgScore = scored.length > 0 
      ? scored.reduce((sum, w) => sum + (w.score?.overall || 0), 0) / scored.length 
      : 0;

    setStats({
      totalWorks: worksList.length,
      scored: scored.length,
      reviewing: reviewing.length,
      shortlisted: shortlisted.length,
      final: final.length,
      averageScore: Math.round(avgScore),
      topThemes: ['consciousness', 'liminal', 'geometric'] // Would extract from actual data
    });
  };

  // Handle score update
  const handleScoreUpdate = (workId: string, score: WorkScore) => {
    setWorks(prev => {
      const updated = prev.map(w => 
        w.id === workId ? { ...w, score } : w
      );
      calculateStats(updated);
      return updated;
    });
  };

  // Handle agent analysis
  const runAgentAnalysis = async (work: EnhancedWork) => {
    setLoading(true);
    try {
      const analysis = await council.analyzeWork(
        work.imageUrl,
        work.title,
        work.description,
        works.filter(w => w.bucket === 'final').map(w => w.description)
      );
      
      // Save analysis
      const savedAnalysis = JSON.parse(localStorage.getItem('solienneAgentAnalysis') || '{}');
      savedAnalysis[work.id] = analysis;
      localStorage.setItem('solienneAgentAnalysis', JSON.stringify(savedAnalysis));
      
      // Update work
      setWorks(prev => prev.map(w => 
        w.id === work.id ? { ...w, agentAnalysis: analysis } : w
      ));
    } catch (error) {
      console.error('Agent analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle bucket change
  const moveToBucket = (workId: string, bucket: EnhancedWork['bucket']) => {
    const savedBuckets = JSON.parse(localStorage.getItem('solienneWorkBuckets') || '{}');
    savedBuckets[workId] = bucket;
    localStorage.setItem('solienneWorkBuckets', JSON.stringify(savedBuckets));
    
    setWorks(prev => {
      const updated = prev.map(w => 
        w.id === workId ? { ...w, bucket } : w
      );
      calculateStats(updated);
      return updated;
    });
  };

  // Filter works
  const filteredWorks = works.filter(work => {
    switch (filterMode) {
      case 'scored':
        return work.score && work.score.overall > 0;
      case 'unscored':
        return !work.score || work.score.overall === 0;
      case 'highScore':
        return work.score && work.score.overall >= 80;
      case 'sue-approved':
        return work.agentAnalysis?.sue && work.agentAnalysis.sue.score >= 75;
      default:
        return true;
    }
  });

  // Export functions
  const exportSelection = (format: 'json' | 'csv' | 'pdf') => {
    const finalWorks = works.filter(w => w.bucket === 'final');
    
    if (format === 'json') {
      const data = JSON.stringify(finalWorks, null, 2);
      downloadFile(data, 'paris-photo-selection.json', 'application/json');
    } else if (format === 'csv') {
      const csv = generateCSV(finalWorks);
      downloadFile(csv, 'paris-photo-selection.csv', 'text/csv');
    } else if (format === 'pdf') {
      // Would integrate with PDF library
      alert('PDF export coming soon');
    }
  };

  const generateCSV = (works: EnhancedWork[]): string => {
    const headers = ['Title', 'Score', 'Category', 'SUE Score', 'Notes'];
    const rows = works.map(w => [
      w.title,
      w.score?.overall || '',
      w.score?.category || '',
      w.agentAnalysis?.sue?.score || '',
      w.score?.notes || ''
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Stats Bar */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-white/20 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold uppercase tracking-wider">Enhanced Curation</h1>
              
              {/* Stats */}
              {stats && (
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-white/60">Total:</span>
                    <span className="ml-2 font-bold">{stats.totalWorks}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Scored:</span>
                    <span className="ml-2 font-bold">{stats.scored}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Final:</span>
                    <span className="ml-2 font-bold text-green-400">{stats.final}/100</span>
                  </div>
                  <div>
                    <span className="text-white/60">Avg Score:</span>
                    <span className="ml-2 font-bold">{stats.averageScore}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Export Button */}
            {FEATURES.export && stats && stats.final > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowExport(!showExport)}
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Export Selection
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showExport && (
                  <div className="absolute right-0 mt-2 bg-black border border-white/20 p-2">
                    <button
                      onClick={() => exportSelection('json')}
                      className="block w-full text-left px-4 py-2 hover:bg-white/10"
                    >
                      Export as JSON
                    </button>
                    <button
                      onClick={() => exportSelection('csv')}
                      className="block w-full text-left px-4 py-2 hover:bg-white/10"
                    >
                      Export as CSV
                    </button>
                    <button
                      onClick={() => exportSelection('pdf')}
                      className="block w-full text-left px-4 py-2 hover:bg-white/10"
                    >
                      Export as PDF
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="sticky top-[73px] bg-black/90 backdrop-blur-sm border-b border-white/20 z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* View Mode */}
            <div className="flex items-center gap-4">
              <div className="flex border border-white/20">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-white text-black' : 'hover:bg-white/10'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-white text-black' : 'hover:bg-white/10'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Mode */}
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value as any)}
                className="px-4 py-2 bg-black border border-white/20 text-white"
              >
                <option value="all">All Works</option>
                <option value="scored">Scored Only</option>
                <option value="unscored">Unscored Only</option>
                <option value="highScore">High Score (80+)</option>
                <option value="sue-approved">SUE Approved</option>
              </select>

              {/* Scoring Mode */}
              {FEATURES.agentAnalysis && (
                <div className="flex border border-white/20">
                  {(['human', 'agent', 'hybrid'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setScoringMode(mode)}
                      className={`px-3 py-2 text-xs uppercase ${
                        scoringMode === mode ? 'bg-white text-black' : 'hover:bg-white/10'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bucket Progress */}
            {FEATURES.buckets && (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500"></div>
                  <span className="text-sm">Reviewing ({stats?.reviewing || 0})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500"></div>
                  <span className="text-sm">Shortlist ({stats?.shortlisted || 0})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500"></div>
                  <span className="text-sm">Final ({stats?.final || 0})</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Works Grid/List */}
      <div className="container mx-auto px-4 py-8">
        <div className={viewMode === 'grid' ? 
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 
          'space-y-6'
        }>
          {filteredWorks.map(work => (
            <WorkCard
              key={work.id}
              work={work}
              viewMode={viewMode}
              scoringMode={scoringMode}
              onScoreUpdate={(score) => handleScoreUpdate(work.id, score)}
              onAnalyze={() => runAgentAnalysis(work)}
              onBucketChange={(bucket) => moveToBucket(work.id, bucket)}
              features={FEATURES}
            />
          ))}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-white/60 animate-pulse mb-4" />
            <p className="text-white/60">Agent analysis in progress...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Work Card Component
function WorkCard({ 
  work, 
  viewMode, 
  scoringMode,
  onScoreUpdate, 
  onAnalyze,
  onBucketChange,
  features
}: {
  work: EnhancedWork;
  viewMode: 'grid' | 'list';
  scoringMode: 'human' | 'agent' | 'hybrid';
  onScoreUpdate: (score: WorkScore) => void;
  onAnalyze: () => void;
  onBucketChange: (bucket: EnhancedWork['bucket']) => void;
  features: any;
}) {
  const [showDetails, setShowDetails] = useState(false);

  const getBucketColor = (bucket?: string) => {
    switch (bucket) {
      case 'reviewing': return 'border-yellow-500';
      case 'shortlist': return 'border-blue-500';
      case 'final': return 'border-green-500';
      default: return 'border-white/20';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className={`flex gap-6 p-6 border ${getBucketColor(work.bucket)} bg-black`}>
        <div className="relative w-48 aspect-square flex-shrink-0">
          <Image
            src={work.imageUrl}
            alt={work.title}
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{work.title}</h3>
            <p className="text-white/60 text-sm">{work.description}</p>
          </div>

          {/* Scores Display */}
          <div className="flex items-center gap-6">
            {features.scoring && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">Human:</span>
                <CurationScoring
                  workId={work.id}
                  title={work.title}
                  onScoreUpdate={onScoreUpdate}
                  initialScore={work.score}
                />
              </div>
            )}
            
            {features.agentAnalysis && work.agentAnalysis?.sue && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">SUE:</span>
                <span className="font-bold text-lg">{work.agentAnalysis.sue.score}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {features.agentAnalysis && !work.agentAnalysis && (
              <button
                onClick={onAnalyze}
                className="flex items-center gap-2 px-3 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors"
              >
                <Brain className="w-4 h-4" />
                Run Agent Analysis
              </button>
            )}
            
            {features.buckets && (
              <select
                value={work.bucket || ''}
                onChange={(e) => onBucketChange(e.target.value as any)}
                className="px-3 py-2 bg-black border border-white/20 text-white"
              >
                <option value="">Unassigned</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlist">Shortlist</option>
                <option value="final">Final</option>
              </select>
            )}
          </div>

          {/* Agent Analysis Details */}
          {work.agentAnalysis?.sue && (
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-white/80">{work.agentAnalysis.sue.reasoning}</p>
              <div className="flex gap-4 mt-2 text-xs text-white/60">
                <span>Exhibition Fit: {Math.round(work.agentAnalysis.sue.analysis.exhibitionFit * 100)}%</span>
                <span>Uniqueness: {Math.round(work.agentAnalysis.sue.analysis.uniqueness * 100)}%</span>
                <span>Visual Impact: {Math.round(work.agentAnalysis.sue.analysis.visualImpact * 100)}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`border ${getBucketColor(work.bucket)} bg-black group`}>
      <div className="relative aspect-square">
        <Image
          src={work.imageUrl}
          alt={work.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              {features.scoring && (
                <CurationScoring
                  workId={work.id}
                  title={work.title}
                  onScoreUpdate={onScoreUpdate}
                  initialScore={work.score}
                />
              )}
              
              {features.agentAnalysis && !work.agentAnalysis && (
                <button
                  onClick={onAnalyze}
                  className="p-2 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition-colors"
                >
                  <Brain className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-bold uppercase tracking-wider">{work.title}</h3>
        
        {/* Score Summary */}
        {(work.score || work.agentAnalysis) && (
          <div className="flex items-center gap-4 text-sm">
            {work.score && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>{work.score.overall}</span>
              </div>
            )}
            {work.agentAnalysis?.sue && (
              <div className="flex items-center gap-1">
                <Brain className="w-3 h-3" />
                <span>{work.agentAnalysis.sue.score}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Bucket Selector */}
        {features.buckets && (
          <select
            value={work.bucket || ''}
            onChange={(e) => onBucketChange(e.target.value as any)}
            className="w-full px-2 py-1 bg-black border border-white/20 text-white text-sm"
          >
            <option value="">Unassigned</option>
            <option value="reviewing">Reviewing</option>
            <option value="shortlist">Shortlist</option>
            <option value="final">Final</option>
          </select>
        )}
      </div>
    </div>
  );
}