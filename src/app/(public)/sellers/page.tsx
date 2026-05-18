'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, staggerChild } from '@/components/ui/motion';
import {
  ArrowRight, Camera, BarChart3, Globe, Megaphone,
  Handshake, TrendingUp, Palette, Target,
} from 'lucide-react';

const marketingPillars = [
  { icon: Camera, title: 'Cinematic Photography & Video', description: 'Professional imagery that captures the character, light, and emotion of your home — not just its square footage.' },
  { icon: Palette, title: 'Editorial Storytelling', description: 'Every listing receives a custom narrative that communicates what makes the home special beyond a standard description.' },
  { icon: Globe, title: 'Digital Exposure Strategy', description: 'Targeted advertising, social media campaigns, and premium syndication to reach qualified buyers.' },
  { icon: Target, title: 'Strategic Pricing', description: 'Market analysis and pricing strategy designed to attract competitive interest and maximize your outcome.' },
];

const sellingSteps = [
  { icon: Handshake, title: 'Strategy Session', description: 'We discuss your goals, timeline, and develop a customized plan for positioning and marketing your home.' },
  { icon: Palette, title: 'Preparation & Staging', description: 'Guidance on preparation, staging recommendations, and pre-listing improvements that maximize perceived value.' },
  { icon: Megaphone, title: 'Launch & Marketing', description: 'Your home debuts with full cinematic media, a custom listing page, targeted campaigns, and broker outreach.' },
  { icon: BarChart3, title: 'Negotiation & Close', description: 'Expert negotiation to protect your interests, followed by seamless coordination through settlement.' },
];

export default function SellersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-warm-white">
        <div className="container-wide">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">For Sellers</p>
              <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
                Your Home Deserves <span className="text-cedar">Exceptional</span> Marketing
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8">
                At Red Cedar, every listing receives the kind of presentation typically reserved for the most exclusive properties. Superior marketing isn&apos;t a luxury — it&apos;s how we deliver results.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors">
                Request a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Marketing pillars */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <FadeIn className="text-center mb-16">
            <h2 className="text-display text-3xl md:text-4xl text-charcoal mb-4">
              Marketing That Commands Attention
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Four pillars that define how we present every property we represent.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {marketingPillars.map((pillar) => (
              <motion.div key={pillar.title} variants={staggerChild} className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded bg-cedar/5 flex items-center justify-center">
                  <pillar.icon className="h-6 w-6 text-cedar" />
                </div>
                <div>
                  <h3 className="text-editorial text-lg text-charcoal mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-cedar text-white">
        <div className="container-wide">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: '98%', label: 'List-to-Sale Ratio' },
              { value: '14', label: 'Average Days on Market' },
              { value: '103%', label: 'Average Sale-to-List Price' },
            ].map((stat) => (
              <FadeIn key={stat.label}>
                <p className="text-display text-3xl md:text-4xl text-white mb-2">{stat.value}</p>
                <p className="text-sm text-white/60 tracking-wide uppercase">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-sand-light">
        <div className="container-wide">
          <FadeIn className="text-center mb-16">
            <h2 className="text-display text-3xl md:text-4xl text-charcoal mb-4">The Seller Experience</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sellingSteps.map((step, i) => (
              <motion.div key={step.title} variants={staggerChild} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cedar/5 mb-4">
                  <step.icon className="h-5 w-5 text-cedar" />
                </div>
                <p className="text-xs text-cedar mb-1 font-medium">Step {i + 1}</p>
                <h3 className="text-editorial text-lg text-charcoal mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-warm-white">
        <div className="container-narrow text-center">
          <FadeIn>
            <TrendingUp className="h-10 w-10 text-cedar mx-auto mb-6" />
            <h2 className="text-display text-3xl md:text-4xl text-charcoal mb-4">
              What&apos;s Your Home Worth?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Request a complimentary market analysis and learn how Red Cedar can position your home for success.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors">
              Request a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
