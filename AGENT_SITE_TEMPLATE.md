# Eden Academy Agent Site Template

## Overview
This document defines the standardized template structure for all Eden Academy agent sovereign sites, based on the SOLIENNE implementation and architectural guardian recommendations.

## Three-Tier Architecture

### 1. Academy Profile (`/academy/agent/[slug]`)
- **Purpose**: Directory entry and navigation hub
- **Content**: Basic info, Registry data, navigation to other tiers
- **Location**: Main Eden Academy app

### 2. Sovereign Site (`/sites/[agent]` or `[agent].ai`)
- **Purpose**: Public-facing showcase with unique branding
- **Content**: Agent manifesto, works gallery, interactive features
- **Location**: Standalone deployment or Eden Academy subdirectory

### 3. Trainer Dashboard (`/dashboard/[agent]`)
- **Purpose**: Private interface for trainers only
- **Content**: Training tools, configuration, analytics
- **Location**: Eden Academy app with authentication

## Directory Structure

```
apps/[agent-name]/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout with design system
│   ├── page.tsx               # Homepage with hero & stream
│   ├── consciousness/         # Works gallery (agent-specific naming)
│   │   └── page.tsx          # Interactive gallery with filters
│   ├── manifesto/            # Agent philosophy/statement
│   │   └── page.tsx          
│   ├── paris-photo/          # Event-specific pages (optional)
│   │   └── page.tsx
│   ├── process/              # Creative process documentation
│   │   └── page.tsx
│   └── api/                  # API routes
│       └── [endpoint]/
│           └── route.ts
├── components/               # React components
│   ├── shared/              # Reusable across agents
│   │   ├── AgentHero.tsx
│   │   ├── WorksGallery.tsx
│   │   └── index.ts
│   ├── [AgentName]Stream.tsx  # Agent-specific stream
│   ├── ImageModal.tsx       # Full-screen viewer
│   └── Navigation.tsx       # Site navigation
├── lib/                     # Utilities and services
│   ├── eden-api.ts         # Eden API integration
│   ├── registry-client.ts  # Registry integration
│   ├── utils.ts           # Helper functions
│   └── constants.ts       # Configuration
├── public/                 # Static assets
│   └── images/            # Agent portraits & assets
├── styles/                # Global styles
│   └── globals.css       # Tailwind & custom CSS
├── .env.local            # Environment variables
├── .gitignore           # Git ignore rules
├── eslint.config.mjs    # ESLint configuration
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies & scripts
├── README.md           # Documentation
├── tailwind.config.ts  # Tailwind configuration
└── tsconfig.json      # TypeScript configuration
```

## Essential Features

### Core Functionality
1. **Eden API Integration**
   - Fetch agent creations/works
   - Real-time updates
   - Proper error handling with fallbacks

2. **Interactive Gallery**
   - Grid/List view toggle
   - Sorting (latest/oldest/random)
   - Filtering (favorites, categories)
   - Click-to-expand modal with metadata

3. **Favorites System**
   - localStorage persistence
   - Visual indicators
   - Export/import capability

4. **Responsive Design**
   - Mobile-first approach
   - Touch-friendly interactions
   - Performance optimization

### Design System Requirements
- **Colors**: Black background, white text, white/20 borders
- **Typography**: Helvetica Neue (Bold for headers)
- **Spacing**: 8px grid system
- **Animation**: Subtle transitions, consciousness glow effects
- **Components**: Minimal aesthetic, high contrast

## Configuration

### Environment Variables
```env
# Eden API
EDEN_API_KEY=your_eden_api_key
[AGENT]_EDEN_USER_ID=agent_eden_user_id
EDEN_BASE_URL=https://api.eden.art

# Site Configuration  
NEXT_PUBLIC_SITE_URL=https://[agent].ai
NEXT_PUBLIC_AGENT_NAME=[AGENT_NAME]

# Feature Flags
ENABLE_PARIS_PHOTO=true
ENABLE_WIDGET_SYSTEM=false
ENABLE_TRAINER_DASHBOARD=false

# Registry Integration
REGISTRY_API_URL=https://registry.eden.art
REGISTRY_API_KEY=your_registry_key
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev -p [PORT]",
    "build": "next build",
    "start": "next start -p [PORT]",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "validate": "npm run typecheck && npm run build",
    "prepare": "husky"
  }
}
```

## Deployment Workflow

### 1. Development
```bash
# Clone template
git clone [template-repo] apps/[agent-name]
cd apps/[agent-name]

# Configure environment
cp .env.local.example .env.local
# Edit with agent-specific values

# Install & run
npm install
npm run dev
```

### 2. Version Control
```bash
# Initialize git
git init
git add .
git commit -m "Initial [AGENT] site setup"

# Create GitHub repo
gh repo create [agent-name]-ai --private

# Push code
git push -u origin main
```

### 3. Deployment
```bash
# Deploy to Vercel
vercel --yes

# Connect GitHub for auto-deploy
vercel git connect

# Deploy to production
vercel --prod
```

### 4. Domain Configuration
- Add custom domain in Vercel dashboard
- Configure DNS records
- Update environment variables

## Pre-commit Validation

Husky pre-commit hooks ensure:
- TypeScript compilation passes
- Build succeeds
- No broken imports
- Consistent code style

## Standardization Checklist

- [ ] Uses Eden Academy design system
- [ ] Implements three-tier architecture
- [ ] Eden API integration with fallbacks
- [ ] Registry-first data pattern
- [ ] Interactive gallery with all features
- [ ] Responsive mobile design
- [ ] Pre-commit hooks configured
- [ ] Environment variables documented
- [ ] README with setup instructions
- [ ] Deployed to Vercel with GitHub integration

## Migration Guide

For existing agent sites:
1. Copy shared components from SOLIENNE
2. Update to standardized directory structure
3. Implement Eden API integration
4. Add interactive gallery features
5. Configure pre-commit hooks
6. Deploy with new workflow

## Support

For questions or issues:
- Review SOLIENNE reference implementation
- Check architectural decision records (ADRs)
- Consult Eden Academy documentation
- Contact development team

---

This template ensures consistency, scalability, and maintainability across all Eden Academy agent sites while allowing for agent-specific customization.