'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/motion';
import { ChevronLeft, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

interface NeighborhoodDetailData {
  name: string;
  tagline: string | null;
  overview: string | null;
  hero_image_url: string | null;
  region: string | null;
  highlights: string[] | null;
}

interface NeighborhoodDetailProps {
  neighborhood: NeighborhoodDetailData;
}

export function NeighborhoodDetail({ neighborhood }: NeighborhoodDetailProps) {
  return (
    <>
      <div className="pt-24 bg-warm-white">
        <div className="container-wide">
          <Link href="/neighborhoods" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-cedar transition-colors">
            <ChevronLeft className="h-4 w-4" /> All Neighborhoods
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-6 pb-20 bg-warm-white">
        <div className="container-wide">
          <FadeIn>
            <div className="relative aspect-[21/9] bg-sand rounded-lg overflow-hidden mb-10">
              {neighborhood.hero_image_url ? (
                <Image
                  src={neighborhood.hero_image_url}
                  alt={neighborhood.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-cedar/10 to-sand" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-2">
                  <MapPin className="inline h-3 w-3 mr-1" /> {neighborhood.region}
                </p>
                <h1 className="text-display text-4xl md:text-5xl text-white">{neighborhood.name}</h1>
                {neighborhood.tagline && (
                  <p className="text-lg text-white/70 mt-3 max-w-2xl">{neighborhood.tagline}</p>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Overview */}
          {neighborhood.overview && (
            <div className="max-w-3xl">
              <FadeIn delay={0.1}>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  {neighborhood.overview.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-body-lg text-muted-foreground leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>
          )}
        </div>
      </section>

      {/* Highlights */}
      {neighborhood.highlights && neighborhood.highlights.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <FadeIn className="mb-12">
              <h2 className="text-display text-2xl md:text-3xl text-charcoal">
                What Makes {neighborhood.name} Special
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {neighborhood.highlights.map((highlight, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="flex gap-4 items-start">
                    <CheckCircle2 className="h-5 w-5 text-cedar flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground leading-relaxed">{highlight}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-sand-light">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="text-display text-2xl md:text-3xl text-charcoal mb-4">
              Explore Homes in {neighborhood.name}
            </h2>
            <p className="text-muted-foreground mb-8">
              Connect with a Red Cedar agent who specializes in {neighborhood.name} real estate.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors">
              Get Connected <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
