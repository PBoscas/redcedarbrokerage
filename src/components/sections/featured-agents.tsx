'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, staggerChild } from '@/components/ui/motion';
import { ArrowRight } from 'lucide-react';

interface FeaturedAgent {
  slug: string;
  first_name: string;
  last_name: string;
  title: string;
  headshot_url: string | null;
  specialties: string[];
}

interface FeaturedAgentsSectionProps {
  agents: FeaturedAgent[];
}

export function FeaturedAgentsSection({ agents }: FeaturedAgentsSectionProps) {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-wide">
        <FadeIn className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
            Our Agents
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
            Meet the Professionals Behind{' '}
            <span className="text-cedar">Red Cedar</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our agents are more than salespeople — they are trusted advisors,
            skilled negotiators, and local market experts.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {agents.map((agent) => (
            <motion.div key={agent.slug} variants={staggerChild}>
              <Link
                href={`/agents/${agent.slug}`}
                className="group block"
              >
                {/* Portrait */}
                <div className="relative aspect-[4/5] max-h-80 bg-sand rounded overflow-hidden mb-6">
                  {agent.headshot_url ? (
                    <Image
                      src={agent.headshot_url}
                      alt={`${agent.first_name} ${agent.last_name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-sand to-sand-light flex items-end justify-center pb-8">
                      <div className="w-24 h-24 rounded-full bg-cedar/10" />
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-cedar/0 group-hover:bg-cedar/10 transition-colors duration-500" />
                </div>

                {/* Info */}
                <h3 className="text-editorial text-xl text-charcoal mb-1 group-hover:text-cedar transition-colors">
                  {agent.first_name} {agent.last_name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{agent.title}</p>
                {agent.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-xs text-cedar/70 bg-cedar/5 px-3 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="text-center mt-14">
          <Link
            href="/agents"
            className="inline-flex items-center gap-3 px-10 py-4 bg-cedar text-white text-lg font-bold tracking-wide rounded hover:bg-cedar-dark transition-colors"
          >
            View All Agents
            <ArrowRight className="h-5 w-5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
