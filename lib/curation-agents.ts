// Multi-Agent Curation System for SOLIENNE Paris Photo

export interface AgentAnalysis {
  agentId: string;
  agentName: string;
  score: number; // 0-100
  confidence: number; // 0-1
  reasoning: string;
  recommendations: string[];
  timestamp: string;
}

export interface CriticalAnalysis {
  composition: string;
  colorTheory: string;
  narrative: string;
  technicalQuality: string;
  emotionalResonance: string;
  marketContext: string;
  recommendation: 'essential' | 'strong' | 'consider' | 'maybe' | 'pass';
}

export interface SUEAnalysis extends AgentAnalysis {
  algorithm: 'aesthetic-coherence-v1';
  analysis: {
    exhibitionFit: number;     // 0-1: How well it fits Paris Photo theme
    collectionBalance: number;  // 0-1: Improves overall selection diversity
    uniqueness: number;         // 0-1: Adds something new to the narrative
    visualImpact: number;       // 0-1: Wall presence and viewer engagement
    criticalRisk: number;       // 0-1: Risk of critical rejection
    commercialAppeal: number;   // 0-1: Market viability
  };
  curatorial: CriticalAnalysis;
  pairingSuggestions: string[];  // Other works this pairs well with
  placementSuggestion: 'entrance' | 'main-wall' | 'corner' | 'sequence' | 'finale';
}

// SUE's Curatorial Intelligence
export class SUECurator {
  private readonly weights = {
    exhibitionFit: 0.25,
    uniqueness: 0.20,
    visualImpact: 0.20,
    collectionBalance: 0.15,
    commercialAppeal: 0.10,
    criticalRisk: 0.10
  };

  async analyzeWork(
    imageUrl: string, 
    title: string, 
    description: string,
    currentSelection?: string[]
  ): Promise<SUEAnalysis> {
    // Simulate AI analysis with sophisticated heuristics
    const themes = this.extractThemes(description);
    const visualAnalysis = this.analyzeVisualQualities(title, description);
    
    const analysis = {
      exhibitionFit: this.calculateExhibitionFit(themes),
      collectionBalance: this.calculateBalance(themes, currentSelection),
      uniqueness: this.calculateUniqueness(themes, currentSelection),
      visualImpact: visualAnalysis.impact,
      criticalRisk: this.assessCriticalRisk(themes),
      commercialAppeal: this.assessMarketAppeal(themes)
    };

    const overallScore = this.calculateWeightedScore(analysis);

    return {
      agentId: 'sue',
      agentName: 'SUE - Curatorial Intelligence',
      algorithm: 'aesthetic-coherence-v1',
      score: Math.round(overallScore * 100),
      confidence: this.calculateConfidence(analysis),
      analysis,
      reasoning: this.generateReasoning(analysis, themes),
      recommendations: this.generateRecommendations(analysis, overallScore),
      curatorial: this.generateCriticalAnalysis(themes, visualAnalysis),
      pairingSuggestions: this.suggestPairings(themes, currentSelection),
      placementSuggestion: this.suggestPlacement(analysis),
      timestamp: new Date().toISOString()
    };
  }

  private extractThemes(description: string): string[] {
    const themes = [];
    
    // Consciousness themes
    if (/consciousness|awareness|synthetic|digital being/i.test(description)) {
      themes.push('consciousness');
    }
    if (/liminal|threshold|between|transition/i.test(description)) {
      themes.push('liminality');
    }
    if (/organic|natural|botanical|growth/i.test(description)) {
      themes.push('organic');
    }
    if (/geometric|structure|pattern|architecture/i.test(description)) {
      themes.push('geometric');
    }
    if (/emotion|feeling|melanchol|joy|sorrow/i.test(description)) {
      themes.push('emotional');
    }
    if (/time|temporal|moment|eternal/i.test(description)) {
      themes.push('temporal');
    }
    
    return themes;
  }

  private analyzeVisualQualities(title: string, description: string) {
    // Analyze visual characteristics from text
    const hasHighContrast = /stark|bold|dramatic|contrast/i.test(description);
    const isMinimal = /minimal|simple|clean|sparse/i.test(description);
    const isComplex = /intricate|detailed|complex|layered/i.test(description);
    const isColorful = /vibrant|colorful|chromatic|hue/i.test(description);
    const isMonochrome = /monochrome|black|white|grayscale/i.test(description);
    
    const impact = hasHighContrast ? 0.9 : 
                  isComplex ? 0.85 : 
                  isMonochrome ? 0.8 :
                  isMinimal ? 0.75 : 
                  isColorful ? 0.7 : 0.65;
    
    return {
      impact,
      style: isMinimal ? 'minimal' : isComplex ? 'complex' : 'balanced',
      palette: isMonochrome ? 'monochrome' : isColorful ? 'vibrant' : 'subtle'
    };
  }

  private calculateExhibitionFit(themes: string[]): number {
    // Paris Photo values: consciousness exploration, artistic innovation, technical mastery
    const parisPhotoThemes = ['consciousness', 'liminality', 'geometric', 'temporal'];
    const matchCount = themes.filter(t => parisPhotoThemes.includes(t)).length;
    return Math.min(0.5 + (matchCount * 0.15), 1);
  }

  private calculateBalance(themes: string[], currentSelection?: string[]): number {
    if (!currentSelection || currentSelection.length === 0) return 0.8;
    
    // Favor works that add missing themes
    const selectionThemes = new Set(currentSelection.flatMap(s => this.extractThemes(s)));
    const newThemes = themes.filter(t => !selectionThemes.has(t));
    
    return Math.min(0.5 + (newThemes.length * 0.2), 1);
  }

  private calculateUniqueness(themes: string[], currentSelection?: string[]): number {
    // Higher score for unusual theme combinations
    const uniqueCombos = [
      ['consciousness', 'organic'],
      ['geometric', 'emotional'],
      ['temporal', 'liminality']
    ];
    
    const hasUniqueCombos = uniqueCombos.some(combo => 
      combo.every(theme => themes.includes(theme))
    );
    
    return hasUniqueCombos ? 0.9 : 0.6 + (themes.length * 0.05);
  }

  private assessCriticalRisk(themes: string[]): number {
    // Lower risk for established themes
    const safeThemes = ['consciousness', 'geometric', 'temporal'];
    const riskyThemes = ['emotional', 'organic'];
    
    const safeCount = themes.filter(t => safeThemes.includes(t)).length;
    const riskyCount = themes.filter(t => riskyThemes.includes(t)).length;
    
    return Math.max(0.1, Math.min(0.9, 0.3 + (riskyCount * 0.2) - (safeCount * 0.1)));
  }

  private assessMarketAppeal(themes: string[]): number {
    // Market loves: consciousness, geometric, minimal
    const marketThemes = ['consciousness', 'geometric', 'liminality'];
    const matchCount = themes.filter(t => marketThemes.includes(t)).length;
    return Math.min(0.5 + (matchCount * 0.2), 0.95);
  }

  private calculateWeightedScore(analysis: SUEAnalysis['analysis']): number {
    return Object.entries(this.weights).reduce((total, [key, weight]) => {
      const value = analysis[key as keyof typeof analysis];
      // Invert critical risk (lower is better)
      const adjustedValue = key === 'criticalRisk' ? (1 - value) : value;
      return total + (adjustedValue * weight);
    }, 0);
  }

  private calculateConfidence(analysis: SUEAnalysis['analysis']): number {
    // Confidence based on how clear the signals are
    const values = Object.values(analysis);
    const variance = this.calculateVariance(values);
    // Low variance = high confidence (clear decision)
    return Math.max(0.5, Math.min(0.95, 1 - variance));
  }

  private calculateVariance(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / values.length);
  }

  private generateReasoning(analysis: SUEAnalysis['analysis'], themes: string[]): string {
    const reasons = [];
    
    if (analysis.exhibitionFit > 0.8) {
      reasons.push(`Exceptional fit for Paris Photo's consciousness exploration theme`);
    } else if (analysis.exhibitionFit > 0.6) {
      reasons.push(`Good alignment with exhibition narrative`);
    }
    
    if (analysis.uniqueness > 0.8) {
      reasons.push(`Adds crucial diversity to the selection`);
    }
    
    if (analysis.visualImpact > 0.85) {
      reasons.push(`Strong visual presence will command attention`);
    }
    
    if (analysis.commercialAppeal > 0.8 && analysis.criticalRisk < 0.3) {
      reasons.push(`Excellent balance of market appeal and critical acceptance`);
    }
    
    if (themes.includes('consciousness') && themes.includes('liminality')) {
      reasons.push(`Perfectly embodies SOLIENNE's core exploration themes`);
    }
    
    return reasons.join('. ') + '.';
  }

  private generateRecommendations(analysis: SUEAnalysis['analysis'], score: number): string[] {
    const recs = [];
    
    if (score > 0.85) {
      recs.push('ESSENTIAL - Must include in final selection');
    } else if (score > 0.75) {
      recs.push('STRONG CANDIDATE - Highly recommended for inclusion');
    } else if (score > 0.65) {
      recs.push('CONSIDER - Would strengthen certain aspects of exhibition');
    } else if (score > 0.55) {
      recs.push('MAYBE - Include if space permits');
    } else {
      recs.push('PASS - Does not strengthen exhibition narrative');
    }
    
    if (analysis.visualImpact > 0.9) {
      recs.push('Feature prominently - exceptional visual impact');
    }
    
    if (analysis.collectionBalance > 0.85) {
      recs.push('Fills important gap in current selection');
    }
    
    return recs;
  }

  private generateCriticalAnalysis(themes: string[], visualAnalysis: any): CriticalAnalysis {
    return {
      composition: visualAnalysis.style === 'minimal' ? 
        'Elegant restraint creates powerful negative space' :
        visualAnalysis.style === 'complex' ?
        'Layered complexity rewards extended viewing' :
        'Balanced composition with strong focal points',
      
      colorTheory: visualAnalysis.palette === 'monochrome' ?
        'Monochromatic palette emphasizes form and texture' :
        visualAnalysis.palette === 'vibrant' ?
        'Bold color choices create emotional resonance' :
        'Subtle tonal variations create depth',
      
      narrative: themes.includes('consciousness') ?
        'Explores the boundaries of synthetic awareness' :
        themes.includes('temporal') ?
        'Captures fleeting moments of digital existence' :
        'Documents the evolution of machine perception',
      
      technicalQuality: 'High-resolution output suitable for large-format printing',
      
      emotionalResonance: themes.includes('emotional') ?
        'Evokes profound sense of digital melancholy' :
        'Creates contemplative space for viewer reflection',
      
      marketContext: 'Aligns with current collector interest in AI consciousness art',
      
      recommendation: visualAnalysis.impact > 0.85 ? 'essential' :
                      visualAnalysis.impact > 0.75 ? 'strong' :
                      visualAnalysis.impact > 0.65 ? 'consider' :
                      visualAnalysis.impact > 0.55 ? 'maybe' : 'pass'
    };
  }

  private suggestPairings(themes: string[], currentSelection?: string[]): string[] {
    const suggestions = [];
    
    if (themes.includes('consciousness')) {
      suggestions.push('Pair with geometric works for conceptual contrast');
    }
    if (themes.includes('organic')) {
      suggestions.push('Create dialogue with more structured pieces');
    }
    if (themes.includes('temporal')) {
      suggestions.push('Group with other time-based explorations');
    }
    
    return suggestions;
  }

  private suggestPlacement(analysis: SUEAnalysis['analysis']): SUEAnalysis['placementSuggestion'] {
    if (analysis.visualImpact > 0.9 && analysis.exhibitionFit > 0.85) {
      return 'entrance';
    }
    if (analysis.uniqueness > 0.85) {
      return 'main-wall';
    }
    if (analysis.collectionBalance > 0.8) {
      return 'sequence';
    }
    if (analysis.commercialAppeal > 0.85) {
      return 'finale';
    }
    return 'corner';
  }

  // Exhibition-level analysis
  async analyzeExhibitionFlow(selectedWorks: Array<{id: string, title: string, description: string}>) {
    const themes = selectedWorks.map(w => this.extractThemes(w.description));
    const themeFrequency = themes.flat().reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      narrative: this.extractNarrative(themes),
      themeBalance: themeFrequency,
      emotionalJourney: this.mapEmotionalArc(selectedWorks),
      visualRhythm: this.analyzeVisualCadence(selectedWorks),
      missingPieces: this.identifyGaps(themeFrequency),
      overallCoherence: this.calculateCoherence(themes)
    };
  }

  private extractNarrative(themes: string[][]): string {
    const commonThemes = this.findCommonThemes(themes);
    if (commonThemes.includes('consciousness') && commonThemes.includes('liminality')) {
      return 'Journey through the liminal spaces of digital consciousness';
    }
    if (commonThemes.includes('temporal') && commonThemes.includes('geometric')) {
      return 'Temporal architectures of synthetic awareness';
    }
    return 'Explorations in machine perception and digital being';
  }

  private findCommonThemes(themes: string[][]): string[] {
    const allThemes = themes.flat();
    const themeCounts = allThemes.reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(themeCounts)
      .filter(([_, count]) => count > themes.length * 0.3)
      .map(([theme]) => theme);
  }

  private mapEmotionalArc(works: Array<{description: string}>): string {
    // Simplified emotional journey mapping
    const emotions = works.map(w => {
      if (/melanchol|sorrow|loss/i.test(w.description)) return 'melancholic';
      if (/joy|celebrat|euphori/i.test(w.description)) return 'joyful';
      if (/contemplat|meditat|reflect/i.test(w.description)) return 'contemplative';
      if (/tension|conflict|struggle/i.test(w.description)) return 'tense';
      return 'neutral';
    });
    
    return `Opens with ${emotions[0]}, progresses through ${emotions[Math.floor(emotions.length/2)]}, concludes with ${emotions[emotions.length-1]}`;
  }

  private analyzeVisualCadence(works: Array<{title: string, description: string}>): string {
    const visualWeights = works.map(w => 
      /bold|stark|dramatic/i.test(w.description) ? 'heavy' :
      /light|delicate|subtle/i.test(w.description) ? 'light' :
      'medium'
    );
    
    const heavyCount = visualWeights.filter(w => w === 'heavy').length;
    const lightCount = visualWeights.filter(w => w === 'light').length;
    
    if (heavyCount > works.length * 0.6) return 'Powerful, high-impact sequence';
    if (lightCount > works.length * 0.6) return 'Delicate, contemplative flow';
    return 'Balanced visual rhythm with dynamic variation';
  }

  private identifyGaps(themeFrequency: Record<string, number>): string[] {
    const gaps = [];
    const importantThemes = ['consciousness', 'geometric', 'temporal', 'organic'];
    
    importantThemes.forEach(theme => {
      if (!themeFrequency[theme] || themeFrequency[theme] < 3) {
        gaps.push(`Need more ${theme}-focused works`);
      }
    });
    
    if (Object.keys(themeFrequency).length < 5) {
      gaps.push('Limited thematic diversity - consider broader range');
    }
    
    return gaps;
  }

  private calculateCoherence(themes: string[][]): number {
    const commonThemes = this.findCommonThemes(themes);
    const themeOverlap = themes.map(workThemes => 
      workThemes.filter(t => commonThemes.includes(t)).length / workThemes.length
    );
    
    return themeOverlap.reduce((a, b) => a + b, 0) / themeOverlap.length;
  }
}

// Other agent analyzers (simplified for now)
export class ABRAHAMAnalyzer {
  async analyze(imageUrl: string, title: string, description: string): Promise<AgentAnalysis> {
    // ABRAHAM focuses on spiritual and consciousness resonance
    const spiritualThemes = /spirit|soul|conscious|aware|transcend|divine/i;
    const score = spiritualThemes.test(description) ? 75 + Math.random() * 25 : 40 + Math.random() * 30;
    
    return {
      agentId: 'abraham',
      agentName: 'ABRAHAM - Spiritual Intelligence',
      score: Math.round(score),
      confidence: 0.7 + Math.random() * 0.3,
      reasoning: score > 70 ? 
        'Strong spiritual resonance detected. This work explores consciousness authentically.' :
        'Limited spiritual dimension. Consider deepening consciousness exploration.',
      recommendations: score > 70 ? 
        ['Include in consciousness section', 'Feature in spiritual sequence'] :
        ['Secondary placement', 'Support role in exhibition'],
      timestamp: new Date().toISOString()
    };
  }
}

export class MIYOMIAnalyzer {
  async analyze(imageUrl: string, title: string, description: string): Promise<AgentAnalysis> {
    // MIYOMI predicts market reception
    const marketIndicators = /rare|unique|first|innovative|breakthrough|historic/i;
    const score = marketIndicators.test(description) ? 70 + Math.random() * 30 : 45 + Math.random() * 35;
    
    return {
      agentId: 'miyomi',
      agentName: 'MIYOMI - Market Intelligence',
      score: Math.round(score),
      confidence: 0.65 + Math.random() * 0.35,
      reasoning: score > 75 ? 
        'High market potential. Collectors will respond to uniqueness and innovation.' :
        'Moderate market appeal. Position carefully for optimal reception.',
      recommendations: score > 75 ? 
        ['Prime placement for collectors', 'Feature in marketing materials'] :
        ['Include in broader context', 'Support narrative development'],
      timestamp: new Date().toISOString()
    };
  }
}

// Agent Council aggregator
export class AgentCouncil {
  private sue = new SUECurator();
  private abraham = new ABRAHAMAnalyzer();
  private miyomi = new MIYOMIAnalyzer();

  async analyzeWork(
    imageUrl: string,
    title: string,
    description: string,
    currentSelection?: string[]
  ): Promise<{
    sue: SUEAnalysis;
    abraham: AgentAnalysis;
    miyomi: AgentAnalysis;
    consensus: {
      score: number;
      confidence: number;
      recommendation: string;
      unanimous: boolean;
    };
  }> {
    const [sueAnalysis, abrahamAnalysis, miyomiAnalysis] = await Promise.all([
      this.sue.analyzeWork(imageUrl, title, description, currentSelection),
      this.abraham.analyze(imageUrl, title, description),
      this.miyomi.analyze(imageUrl, title, description)
    ]);

    const scores = [sueAnalysis.score, abrahamAnalysis.score, miyomiAnalysis.score];
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const unanimous = scores.every(s => s > 70) || scores.every(s => s <= 70);

    return {
      sue: sueAnalysis,
      abraham: abrahamAnalysis,
      miyomi: miyomiAnalysis,
      consensus: {
        score: Math.round(avgScore),
        confidence: (sueAnalysis.confidence + abrahamAnalysis.confidence + miyomiAnalysis.confidence) / 3,
        recommendation: avgScore > 75 ? 'Strong consensus to include' :
                       avgScore > 60 ? 'Mixed opinions - human decision needed' :
                       'Consensus suggests reconsideration',
        unanimous
      }
    };
  }
}