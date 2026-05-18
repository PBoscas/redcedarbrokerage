'use client';

import { PILLARS } from '@/lib/constants/brand';
import { FadeIn, StaggerContainer, staggerChild } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Monitor, Shield, ImageIcon, Heart } from 'lucide-react';

const pillarIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  shield: Shield,
  image: ImageIcon,
  heart: Heart,
};

export function DifferenceSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <FadeIn className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
            Why Red Cedar
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-charcoal">
            The Red Cedar Difference
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {PILLARS.map((pillar) => {
            const Icon = pillarIcons[pillar.icon];
            return (
              <motion.div
                key={pillar.title}
                variants={staggerChild}
                className="group text-center md:text-left"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded bg-cedar/5 mb-6 group-hover:bg-cedar/10 transition-colors">
                  {Icon && <Icon className="h-6 w-6 text-cedar" />}
                </div>
                <h3 className="text-editorial text-lg text-charcoal mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
