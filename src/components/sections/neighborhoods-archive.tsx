'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggerContainer, staggerChild } from '@/components/ui/motion';

interface ArchiveNeighborhood {
  slug: string;
  name: string;
  region: string | null;
  tagline: string | null;
  hero_image_url: string | null;
}

interface NeighborhoodsArchiveProps {
  neighborhoods: ArchiveNeighborhood[];
  regions: string[];
}

export function NeighborhoodsArchive({ neighborhoods, regions }: NeighborhoodsArchiveProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const filtered = activeRegion
    ? neighborhoods.filter((h) => h.region === activeRegion)
    : neighborhoods;

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        {/* Region tabs */}
        {regions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <button
              onClick={() => setActiveRegion(null)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                activeRegion === null
                  ? 'bg-cedar text-white border-cedar'
                  : 'bg-white text-muted-foreground border-border hover:border-cedar/40 hover:text-cedar'
              }`}
            >
              All Regions
            </button>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                  activeRegion === region
                    ? 'bg-cedar text-white border-cedar'
                    : 'bg-white text-muted-foreground border-border hover:border-cedar/40 hover:text-cedar'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion ?? 'all'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((hood) => (
                <motion.div key={hood.slug} variants={staggerChild}>
                  <Link href={`/neighborhoods/${hood.slug}`} className="group block relative aspect-[3/2] bg-sand rounded overflow-hidden">
                    {hood.hero_image_url ? (
                      <Image
                        src={hood.hero_image_url}
                        alt={hood.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cedar/10 to-cedar/5 group-hover:from-cedar/15 transition-colors duration-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs text-white/60 tracking-wide mb-1">{hood.region}</p>
                      <h2 className="text-editorial text-xl text-white mb-2 group-hover:text-gold-muted transition-colors">{hood.name}</h2>
                      {hood.tagline && (
                        <p className="text-sm text-white/70">{hood.tagline}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
