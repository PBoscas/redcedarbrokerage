'use client';

import { FadeIn, ScaleReveal } from '@/components/ui/motion';
import { Smartphone, BarChart3, MessageCircle, Globe } from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Seamless Communication',
    description: 'Real-time updates, streamlined scheduling, and transparent progress at every step.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Strategy',
    description: 'Market analytics and pricing intelligence that inform smarter decisions for buyers and sellers.',
  },
  {
    icon: Globe,
    title: 'Modern Listing Presence',
    description: 'Cinematic media, immersive virtual experiences, and targeted digital exposure for every listing.',
  },
  {
    icon: MessageCircle,
    title: 'Smarter Client Experience',
    description: 'From first consultation to closing day, technology removes friction and elevates every interaction.',
  },
];

export function TechnologySection() {
  return (
    <section className="section-padding bg-charcoal text-white overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — content */}
          <div>
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase text-gold-muted mb-4 font-medium">
                Technology + Service
              </p>
              <h2 className="text-display text-3xl md:text-4xl text-white mb-6">
                Where Innovation Meets{' '}
                <span className="text-gold-muted">Personal Touch</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-12">
                Technology is a core differentiator at Red Cedar — but it never replaces
                the human relationship at the center of every great real estate experience.
                We use modern tools to make our agents more effective and our clients more
                confident.
              </p>
            </FadeIn>

            <div className="space-y-8">
              {features.map((feature, i) => (
                <FadeIn key={feature.title} delay={i * 0.1}>
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded bg-white/5 flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-gold-muted" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right — visual placeholder */}
          <ScaleReveal>
            <div className="relative aspect-[4/5] bg-gradient-to-br from-cedar/30 to-charcoal rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/20">
                  <Smartphone className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-sm">Technology Visual</p>
                </div>
              </div>
            </div>
          </ScaleReveal>
        </div>
      </div>
    </section>
  );
}
