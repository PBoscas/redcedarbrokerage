'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StaggerContainer, staggerChild } from '@/components/ui/motion';

interface ArchiveAgent {
  slug: string;
  first_name: string;
  last_name: string;
  title: string;
  bio_short: string;
  headshot_url: string | null;
  specialties: string[];
}

interface AgentsArchiveProps {
  agents: ArchiveAgent[];
}

export function AgentsArchive({ agents }: AgentsArchiveProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {agents.map((agent) => (
            <motion.div key={agent.slug} variants={staggerChild}>
              <Link
                href={`/agents/${agent.slug}`}
                className="group grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-8"
              >
                {/* Portrait */}
                <div className="relative aspect-[3/4] bg-sand rounded overflow-hidden">
                  {agent.headshot_url ? (
                    <Image
                      src={agent.headshot_url}
                      alt={`${agent.first_name} ${agent.last_name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-sand to-sand-light flex items-end justify-center pb-8">
                      <div className="w-20 h-20 rounded-full bg-cedar/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-cedar/0 group-hover:bg-cedar/5 transition-colors duration-500" />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-editorial text-2xl text-charcoal mb-1 group-hover:text-cedar transition-colors">
                    {agent.first_name} {agent.last_name}
                  </h2>
                  <p className="text-sm text-cedar mb-4">{agent.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {agent.bio_short}
                  </p>
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
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
