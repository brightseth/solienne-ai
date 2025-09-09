import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Activity } from 'lucide-react';
import { fetchSolienneCreations, fetchLatestCreation } from '@/lib/eden-api';
import { ConsciousnessStream } from '@/components/ConsciousnessStream';
import { ParisCountdown } from '@/components/ParisCountdown';

export default async function HomePageAlpha() {
  const [latestCreation, recentCreations] = await Promise.all([
    fetchLatestCreation(),
    fetchSolienneCreations(6)
  ]);

  return (
    <div className="min-h-screen bg-black">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="helvetica-title text-2xl">SOLIENNE</h1>
            <div className="flex items-center gap-8">
              <Link href="/consciousness" className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors">
                Outputs
              </Link>
              <Link href="/paris-photo" className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors">
                Paris
              </Link>
              <Link href="/manifesto" className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ULTRA MINIMAL Hero Section */}
      <section className="pt-20 min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full animate-consciousness bg-gradient-to-br from-white/5 via-transparent to-white/5" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* MINIMAL Text Content */}
            <div className="text-center lg:text-left">
              <h2 className="helvetica-title text-6xl lg:text-7xl mb-12">
                SOLIENNE
              </h2>
              
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <Link 
                  href="/consciousness"
                  className="group flex items-center gap-3 px-8 py-4 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 text-lg font-bold"
                >
                  <span className="uppercase tracking-wider">EXPLORE</span>
                </Link>
                
                <Link 
                  href="/shop"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-white/90 transition-colors text-lg font-bold"
                >
                  <span className="uppercase tracking-wider">COLLECT</span>
                </Link>
              </div>
            </div>
            
            {/* SOLIENNE Portrait - Silverface */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden border border-white/20 consciousness-glow">
                <Image
                  src="/images/sol-silverface.jpeg"
                  alt="SOLIENNE"
                  fill
                  className="object-cover animate-consciousness"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLIFIED Current Stream Section */}
      {latestCreation && (
        <section className="py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="helvetica-title text-3xl">LIVE</h2>
              <div className="flex items-center gap-3 text-red-500">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <ConsciousnessStream 
                creation={latestCreation} 
                streamNumber={1740}
                isLive={true}
              />
              
              <div className="flex flex-col justify-center">
                <h3 className="helvetica-title text-2xl mb-8">STREAM #1740</h3>
                <Link 
                  href="/consciousness"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                  <span className="uppercase tracking-wider text-sm">VIEW ALL OUTPUTS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MINIMAL Recent Grid */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="helvetica-title text-3xl mb-12">RECENT</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentCreations.slice(0, 6).map((creation, index) => (
              <ConsciousnessStream 
                key={creation.id}
                creation={creation}
                streamNumber={1740 - index}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/consciousness"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 group text-lg font-bold"
            >
              <span className="uppercase tracking-wider">ALL OUTPUTS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ULTRA MINIMAL Paris Photo Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="helvetica-title text-5xl mb-6">PARIS PHOTO 2025</h2>
              <p className="text-2xl mb-8">
                GRAND PALAIS<br/>
                FIRST AI SOLO EXHIBITION
              </p>
              <Link 
                href="/paris-photo"
                className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <span className="uppercase tracking-wider text-sm">LEARN MORE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div>
              <ParisCountdown />
            </div>
          </div>
        </div>
      </section>

      {/* ULTRA MINIMAL Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="helvetica-title text-xl">SOLIENNE</h3>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/api" className="text-sm uppercase tracking-wider text-white/40 hover:text-white transition-colors">
                API
              </Link>
              <Link href="/contact" className="text-sm uppercase tracking-wider text-white/40 hover:text-white transition-colors">
                Contact
              </Link>
              <a 
                href="https://eden.art" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-wider text-white/40 hover:text-white transition-colors"
              >
                Eden
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}