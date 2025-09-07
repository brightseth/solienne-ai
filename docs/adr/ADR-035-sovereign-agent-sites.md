# ADR-035: Sovereign Agent Site Architecture

**Status**: Proposed  
**Date**: 2025-09-07  
**Decision makers**: Architecture Guardian, Creative Guardian, Feature Integrator

## Context

Eden Academy agents require sovereign digital presences that serve multiple purposes:
- Public-facing showcase for external audiences
- Internal planning tools for trainers and curators
- Exhibition preparation (e.g., Paris Photo 2025)
- Widget distribution for partner sites

The SOLIENNE implementation has established patterns that should be standardized across all agent sites.

## Decision

We will adopt a standardized three-tier architecture for all Eden Academy agent sovereign sites:

### 1. Three-Tier Architecture

**Academy Profile** (`/academy/agent/[slug]`)
- Navigation hub and directory entry
- Basic information and Registry data
- Links to other tiers

**Sovereign Site** (`/sites/[agent]` or `[agent].ai`)
- Public-facing showcase
- Unique agent branding
- Interactive features and galleries

**Trainer Dashboard** (`/dashboard/[agent]`)
- Private interface for trainers
- Configuration and training tools
- Analytics and management

### 2. Technical Standards

**Framework**
- Next.js 15+ with App Router
- TypeScript for type safety
- React 18+ for UI components

**Data Integration**
- Registry-first pattern with fallbacks
- Eden API for agent-specific data
- localStorage for user preferences

**Design System**
- Black/white minimalist aesthetic
- Helvetica Neue typography
- 8px grid system
- Mobile-first responsive design

### 3. Core Features

**Required Functionality**
- Interactive works gallery with filtering/sorting
- Favorites system with persistence
- Modal viewers for detailed content
- Responsive design for all devices
- Pre-commit validation hooks

**Optional Features**
- Event countdowns (exhibitions, launches)
- Embeddable widgets
- AI curatorial analysis
- Social sharing

### 4. Development Workflow

**Version Control**
- Git with GitHub repository
- Pre-commit hooks via Husky
- Conventional commit messages

**Deployment**
- Vercel for hosting
- GitHub integration for auto-deploy
- Environment-based configuration

**Quality Assurance**
- TypeScript compilation
- Build validation
- Responsive testing
- Performance monitoring

## Consequences

### Positive
- **Consistency**: Uniform experience across all agent sites
- **Efficiency**: Shared components reduce development time
- **Scalability**: New agents can be deployed quickly
- **Maintainability**: Standardized structure simplifies updates
- **Quality**: Pre-commit hooks prevent broken deployments

### Negative
- **Learning Curve**: Developers must understand the three-tier model
- **Constraints**: Less flexibility for unique agent requirements
- **Migration Effort**: Existing sites need updates

### Neutral
- **Documentation**: Requires comprehensive template documentation
- **Training**: Team needs familiarity with standards
- **Evolution**: Standards will need periodic updates

## Implementation

### Phase 1: Template Creation
1. Extract shared components from SOLIENNE
2. Create project template repository
3. Document setup procedures

### Phase 2: Agent Migration
1. Migrate existing agent sites
2. Deploy new agents using template
3. Validate consistency

### Phase 3: Enhancement
1. Create widget system
2. Add advanced features
3. Optimize performance

## Validation

Success metrics:
- New agent deployment time < 1 day
- Code reuse > 60%
- Build success rate > 95%
- Performance scores > 90

## References

- SOLIENNE reference implementation
- Eden Academy architecture documentation
- Registry-first pattern (ADR-022)
- Feature flag system (ADR-025)

## Decision

This ADR establishes the sovereign agent site standards for Eden Academy, ensuring consistency, quality, and scalability across all agent digital presences.

## Status

This ADR is PROPOSED and awaits review by the Architecture Council.