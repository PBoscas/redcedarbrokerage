'use client';

import Link from 'next/link';
import { FadeIn, ScaleReveal } from '@/components/ui/motion';
import {
  MapPin, Bed, Bath, Maximize, Calendar,
  Home, ArrowRight, ChevronLeft,
} from 'lucide-react';

interface PropertyDetailContentProps {
  slug: string;
}

export function PropertyDetailContent({ slug }: PropertyDetailContentProps) {
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <>
      {/* Back nav */}
      <div className="pt-24 bg-warm-white">
        <div className="container-wide">
          <Link
            href="/featured-homes"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-cedar transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            All Featured Homes
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-6 pb-16 bg-warm-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Image */}
            <ScaleReveal>
              <div className="relative aspect-[4/3] bg-sand rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sand to-cedar/5 flex items-center justify-center">
                  <Home className="h-16 w-16 text-cedar/20" />
                </div>
              </div>
            </ScaleReveal>

            {/* Info */}
            <div className="lg:pt-4">
              <FadeIn>
                <span className="inline-block text-[0.65rem] tracking-[0.2em] uppercase text-cedar bg-cedar/5 px-3 py-1 rounded-full mb-4">
                  Active
                </span>
                <h1 className="text-display text-3xl md:text-4xl text-charcoal mb-2">
                  {title}
                </h1>
                <p className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="h-4 w-4 text-cedar" />
                  Washington DC
                </p>

                <p className="text-display text-3xl text-charcoal mb-8">$2,450,000</p>

                {/* Quick stats */}
                <div className="grid grid-cols-4 gap-4 mb-8 pb-8 border-b border-border">
                  {[
                    { icon: Bed, label: 'Beds', value: '5' },
                    { icon: Bath, label: 'Baths', value: '4' },
                    { icon: Maximize, label: 'Sq Ft', value: '4,200' },
                    { icon: Calendar, label: 'Year', value: '1928' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <stat.icon className="h-5 w-5 text-cedar mx-auto mb-2" />
                      <p className="text-lg font-semibold text-charcoal">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-4">Represented by</p>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-cedar/10 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Sarah Mitchell</p>
                    <p className="text-xs text-muted-foreground">Principal Agent</p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors w-full justify-center sm:w-auto"
                >
                  Inquire About This Home
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="text-display text-2xl md:text-3xl text-charcoal mb-8">
              About This Home
            </h2>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                A rare opportunity to own a beautifully restored residence in one of the
                DMV&apos;s most coveted neighborhoods. This home seamlessly blends historic
                character with modern luxury, featuring original architectural details
                alongside thoughtful contemporary updates throughout.
              </p>
              <p>
                The grand main level offers gracious entertaining spaces with soaring
                ceilings, hardwood floors, and abundant natural light. The chef&apos;s
                kitchen opens to a sun-filled family room, creating the perfect gathering
                space for everyday living and elegant entertaining alike.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-sand-light">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-display text-2xl md:text-3xl text-charcoal mb-8">
              Key Features
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Chef\'s Kitchen with Sub-Zero & Wolf',
              'Original Hardwood Floors Throughout',
              'Primary Suite with Walk-In Closet',
              'Landscaped Private Garden',
              'Two-Car Garage',
              'Smart Home Integration',
              'Wine Cellar',
              'Home Office / Library',
              'Heated Floors in Primary Bath',
            ].map((feature) => (
              <FadeIn key={feature}>
                <div className="flex items-center gap-3 py-3 px-4 bg-white rounded">
                  <div className="w-1.5 h-1.5 rounded-full bg-cedar flex-shrink-0" />
                  <span className="text-sm text-charcoal">{feature}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cedar text-white">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="text-display text-2xl md:text-3xl text-white mb-4">
              Interested in This Home?
            </h2>
            <p className="text-white/60 mb-8">
              Schedule a private showing or request additional information.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-cedar font-medium text-sm rounded hover:bg-white/90 transition-colors"
            >
              Schedule a Showing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
