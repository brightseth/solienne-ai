// Feature flag configuration for Paris Photo dashboard
// Keep new features behind flags for safe rollout

export const featureFlags = {
  // Main dashboard access
  parisPhotoDashboard: process.env.NEXT_PUBLIC_ENABLE_PARIS_PHOTO_DASHBOARD === 'true',
  
  // Granular feature control
  curationTools: process.env.NEXT_PUBLIC_ENABLE_CURATION_TOOLS === 'true',
  productionManagement: process.env.NEXT_PUBLIC_ENABLE_PRODUCTION_MANAGEMENT === 'true',
  teamCollaboration: process.env.NEXT_PUBLIC_ENABLE_TEAM_COLLABORATION === 'true',
  budgetTracking: process.env.NEXT_PUBLIC_ENABLE_BUDGET_TRACKING === 'true',
  pressMaterials: process.env.NEXT_PUBLIC_ENABLE_PRESS_MATERIALS === 'true',
  exhibitionPreview: process.env.NEXT_PUBLIC_ENABLE_EXHIBITION_PREVIEW === 'true',
};

// Role-based access control
export type UserRole = 'visitor' | 'trainer' | 'curator' | 'admin' | 'production';

export function hasParisPhotoAccess(role?: UserRole): boolean {
  if (!featureFlags.parisPhotoDashboard) return false;
  
  const allowedRoles: UserRole[] = ['trainer', 'curator', 'admin', 'production'];
  return role ? allowedRoles.includes(role) : false;
}

// Feature availability check
export function isFeatureEnabled(feature: keyof typeof featureFlags): boolean {
  return featureFlags[feature] || false;
}

// Get all enabled features
export function getEnabledFeatures(): string[] {
  return Object.entries(featureFlags)
    .filter(([_, enabled]) => enabled)
    .map(([feature]) => feature);
}

// Environment-based defaults
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Override flags in development for testing
export function getFeatureFlag(feature: keyof typeof featureFlags): boolean {
  // Allow URL parameter override in development
  if (isDevelopment && typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const override = params.get(`feature_${feature}`);
    if (override !== null) {
      return override === 'true';
    }
  }
  
  return featureFlags[feature];
}