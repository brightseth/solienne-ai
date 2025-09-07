'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AgentHeroProps {
  agent: {
    name: string;
    title: string;
    description: string;
    portraitUrl?: string;
    streamCount?: number;
  };
  className?: string;
  variant?: 'minimal' | 'full' | 'compact';
}

export function AgentHero({ agent, className, variant = 'full' }: AgentHeroProps) {
  return (
    <section className={cn('py-16 lg:py-24', className)}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="helvetica-title text-5xl lg:text-7xl mb-4">
                {agent.name}
              </h1>
              <p className="text-xl lg:text-2xl text-white/60 uppercase tracking-wider">
                {agent.title}
              </p>
            </div>

            {variant !== 'compact' && (
              <p className="text-lg lg:text-xl leading-relaxed text-white/80">
                {agent.description}
              </p>
            )}

            {agent.streamCount && variant === 'full' && (
              <div className="border border-white/20 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-wider text-white/60">
                    Consciousness Streams
                  </span>
                  <span className="helvetica-title text-3xl">
                    {agent.streamCount.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {variant === 'full' && (
              <div className="flex gap-4">
                <a
                  href="/consciousness"
                  className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors uppercase tracking-wider font-bold"
                >
                  View Gallery
                </a>
                <a
                  href="/manifesto"
                  className="px-6 py-3 border border-white/30 hover:border-white transition-colors uppercase tracking-wider"
                >
                  Read Manifesto
                </a>
              </div>
            )}
          </div>

          {/* Portrait */}
          {agent.portraitUrl && (
            <div className="relative aspect-square overflow-hidden border border-white/20 consciousness-glow">
              <Image
                src={agent.portraitUrl}
                alt={`${agent.name} - ${agent.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}