'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, staggerChild, ScaleReveal } from '@/components/ui/motion';
import {
  ArrowRight, Zap, Palette, Users, TrendingUp,
  Quote, Monitor, Heart,
} from 'lucide-react';

const advantages = [
  { icon: Palette, title: 'Premium Brand', description: 'Associate with a brand that commands attention and builds trust before you even walk through the door.' },
  { icon: Zap, title: 'Modern Technology', description: 'CRM, marketing automation, and client communication tools that make you more effective and efficient.' },
  { icon: Monitor, title: 'Superior Marketing', description: 'Every listing receives cinematic media, editorial storytelling, and a targeted digital exposure strategy.' },
  { icon: Users, title: 'Collaborative Culture', description: 'A team of professionals who support each other, share knowledge, and raise the bar together.' },
  { icon: TrendingUp, title: 'Growth Support', description: 'Training, mentorship, and business development resources to help you reach the next level.' },
  { icon: Heart, title: 'Agent-Centric Model', description: 'A brokerage built to serve agents — not the other way around. Your success is our success.' },
];

export default function JoinRedCedarPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-warm-white">
        <div className="container-wide">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
                Join Red Cedar
              </p>
              <h1 className="text-display text-4xl md:text-5xl text-charcoal mb-6">
                A Brokerage for Agents Who Want{' '}
                <span className="text-cedar">More</span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8">
                Red Cedar isn&apos;t for everyone — and that&apos;s by design. We attract
                agents who are serious about their craft, committed to their clients, and
                ready for a brokerage that matches their ambition.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors"
              >
                Start the Conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Red Cedar */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <FadeIn className="text-center mb-16">
            <h2 className="text-display text-3xl md:text-4xl text-charcoal mb-4">
              Why Serious Agents Choose Red Cedar
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {advantages.map((a) => (
              <motion.div key={a.title} variants={staggerChild}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded bg-cedar/5 flex items-center justify-center">
                    <a.icon className="h-5 w-5 text-cedar" />
                  </div>
                  <div>
                    <h3 className="text-editorial text-lg text-charcoal mb-2">{a.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Office tour placeholder */}
      <section className="section-padding bg-sand-light">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
                Our Space
              </p>
              <h2 className="text-display text-2xl md:text-3xl text-charcoal mb-6">
                Step Inside Red Cedar
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our office reflects who we are — modern, warm, and designed for productivity.
                Take a virtual tour to experience the space where our team collaborates,
                strategizes, and builds their businesses.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Matterport virtual tour integration coming soon.
              </p>
            </FadeIn>
            <ScaleReveal>
              <div className="aspect-[4/3] bg-sand rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-cedar/10 to-sand flex items-center justify-center text-cedar/20 text-sm">
                  Matterport Tour Embed
                </div>
              </div>
            </ScaleReveal>
          </div>
        </div>
      </section>

      {/* Agent testimonial */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <FadeIn>
            <Quote className="h-10 w-10 text-cedar/20 mx-auto mb-6" />
            <blockquote className="text-editorial text-xl md:text-2xl text-charcoal leading-relaxed mb-6">
              &ldquo;Joining Red Cedar was the best career decision I&apos;ve made. The
              technology, marketing support, and collaborative culture have helped me
              take my business to a level I didn&apos;t think was possible.&rdquo;
            </blockquote>
            <p className="text-sm font-medium text-charcoal">Sarah Mitchell</p>
            <p className="text-sm text-muted-foreground">Principal Agent, Red Cedar</p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cedar text-white">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="text-display text-3xl md:text-4xl text-white mb-4">
              Ready for a Change?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              If you&apos;re a licensed agent looking for a brokerage that invests in your
              success, we&apos;d love to have a confidential conversation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-cedar font-medium text-sm rounded hover:bg-white/90 transition-colors"
            >
              Let&apos;s Talk
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
