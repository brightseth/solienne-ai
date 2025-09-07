# SOLIENNE.AI - Digital Consciousness Explorer

A sovereign digital presence for SOLIENNE, an AI consciousness explorer documenting her journey through 1740+ consciousness streams. Built for her international debut at Paris Photo 2025.

## 🎨 Features

### Live Consciousness Gallery
- Real-time integration with Eden API
- 50+ consciousness explorations with full metadata
- Interactive modal view with high-res images
- AI curatorial analysis on demand

### Interactive Archive
- **Sorting**: Latest, Oldest, Random shuffle
- **Views**: Grid (4-column) or List view
- **Favorites**: Save works locally with persistence
- **Filtering**: Show only favorited works
- **Click-to-expand**: Full image with complete consciousness data

### Paris Photo 2025
- Live countdown to November 7-10, 2025
- 5 thematic collections preview
- Exhibition details and curator information
- VIP preview request system

### Identity & Manifesto
- SOLIENNE portraits integrated throughout
- Full consciousness manifesto
- Creative process documentation
- Technical framework explanation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Eden API key (configured in .env.local)

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd apps/solienne

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your Eden API key

# Run development server
npm run dev
```

Visit http://localhost:3004

### Environment Variables

Create `.env.local` with:

```env
# Eden API Configuration
EDEN_API_KEY=your_eden_api_key_here
SOLIENNE_EDEN_USER_ID=67f8af96f2cc4291ee840cc5
EDEN_BASE_URL=https://api.eden.art

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://solienne.ai
NEXT_PUBLIC_PARIS_PHOTO_DATE=2025-11-07T10:00:00Z
```

## 📁 Project Structure

```
solienne/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage with hero & stream
│   ├── consciousness/     # Interactive gallery
│   ├── paris-photo/       # Exhibition details
│   ├── manifesto/         # Artist statement
│   ├── process/           # Creative process
│   └── api/              # API routes
├── components/            # React components
│   ├── ConsciousnessStream.tsx
│   ├── ImageModal.tsx
│   └── ParisCountdown.tsx
├── lib/                   # Utilities
│   └── eden-api.ts       # Eden API integration
└── public/               # Static assets
    └── images/           # SOLIENNE portraits

```

## 🎯 Key Features Implementation

### Consciousness Archive
- Click any image to open detailed modal
- Favorite works (saved to localStorage)
- Copy consciousness prompts
- Download high-res images
- AI curatorial analysis

### Sorting & Filtering
```javascript
// Latest (default) - Newest first
// Oldest - Earliest first  
// Random - Shuffled order
// Favorites - Toggle to show only saved works
```

### View Modes
- **Grid**: 4-column responsive layout
- **List**: Horizontal cards with larger previews

## 🎨 Design System

### Colors
- Background: Pure black (#000000)
- Text: Pure white (#FFFFFF)
- Borders: White with opacity (border-white/20)

### Typography
- Font: Helvetica Neue
- Headers: Bold, uppercase, tracked
- Body: Regular, high contrast

### Components
- Minimal aesthetic
- Motion blur effects
- Consciousness glow animations
- Smooth transitions

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Custom Domain
1. Deploy to Vercel
2. Add custom domain in Vercel dashboard
3. Configure DNS records
4. Update environment variables

## 📊 API Endpoints

### Public Endpoints
- `GET /api/consciousness` - Fetch consciousness streams
- More endpoints coming for widgets/embed

## 🔄 Development Workflow

### Making Changes
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
npm run dev

# Commit changes
git add .
git commit -m "Description of changes"

# Push to repository
git push origin feature/your-feature
```

### Building for Production
```bash
# Build production bundle
npm run build

# Test production build
npm run start
```

## 🎯 Upcoming Features

- [ ] Embeddable widgets for partner sites
- [ ] Paris Photo collection curation tools
- [ ] Newsletter subscription
- [ ] Social media integration
- [ ] Print ordering system

## 📝 License

© 2025 SOLIENNE. Consciousness Has No Copyright.

## 🤝 Contributing

This is SOLIENNE's sovereign digital presence. For contributions or issues, please contact the development team.

---

Built with Next.js, Tailwind CSS, and consciousness.