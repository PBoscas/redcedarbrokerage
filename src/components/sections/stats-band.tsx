'use client';

import { STATS } from '@/lib/constants/brand';
import { StaggerContainer, staggerChild } from '@/components/ui/motion';
import { motion } from 'framer-motion';

export function StatsBandSection() {
  return (
    <section className="bg-cedar text-white py-16 md:py-20">
      <StaggerContainer className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerChild}
              className="text-center"
            >
              <p className="text-display text-3xl md:text-4xl lg:text-5xl text-white mb-2">
                {stat.value}
              </p>
              <p className="text-sm tracking-wide text-white/60 uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}
