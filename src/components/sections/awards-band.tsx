'use client';

import { FadeIn, StaggerContainer, staggerChild } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Newspaper } from 'lucide-react';

const PLACEHOLDER_AWARDS = [
  { icon: Trophy, label: 'Highest Rated Brokerage', source: 'Central Maryland' },
  { icon: Award, label: 'Agent of the Year', source: 'Real Producers' },
  { icon: Star, label: 'Five Star Professional', source: '2023–2024' },
  { icon: Newspaper, label: 'Top 1% Nationally', source: 'RE/MAX' },
];

export function AwardsBandSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-border">
      <div className="container-wide">
        <FadeIn className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar font-medium">
            Recognition & Press
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {PLACEHOLDER_AWARDS.map((award) => (
            <motion.div
              key={award.label}
              variants={staggerChild}
              className="text-center"
            >
              <award.icon className="h-8 w-8 text-gold mx-auto mb-3" />
              <p className="text-sm font-medium text-charcoal mb-1">{award.label}</p>
              <p className="text-xs text-muted-foreground">{award.source}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
