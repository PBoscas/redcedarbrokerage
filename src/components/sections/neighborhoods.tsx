'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, staggerChild } from '@/components/ui/motion';
import { ArrowRight } from 'lucide-react';

interface NeighborhoodCard {
  slug: string;
  name: string;
  region: string | null;
  hero_image_url: string | null;
}

interface NeighborhoodsSectionProps {
  neighborhoods: NeighborhoodCard[];
}

export function NeighborhoodsSection({ neighborhoods }: NeighborhoodsSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <FadeIn className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
            Local Expertise
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
            Deep Roots in{' '}
            <span className="text-cedar">Howard County</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our agents live and breathe these neighborhoods. We bring intimate
            local knowledge to every transaction.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {neighborhoods.map((hood) => (
            <motion.div key={hood.slug} variants={staggerChild}>
              <Link
                href={`/neighborhoods/${hood.slug}`}
                className="group relative block aspect-[3/2] bg-sand rounded overflow-hidden"
              >
                {hood.hero_image_url ? (
                  <Image
                    src={hood.hero_image_url}
                    alt={hood.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cedar/10 to-cedar/5" />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-editorial text-lg text-white mb-0.5 group-hover:text-gold-muted transition-colors">
                    {hood.name}
                  </h3>
                  <p className="text-xs text-white/60 tracking-wide">{hood.region}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="text-center mt-14">
          <Link
            href="/neighborhoods"
            className="inline-flex items-center gap-2 text-sm text-cedar font-medium tracking-wide hover:gap-3 transition-all"
          >
            Explore All Neighborhoods
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
