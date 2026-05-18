'use client';

import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, staggerChild } from '@/components/ui/motion';
import Link from 'next/link';
import { ArrowRight, Search, Shield, MapPin, Handshake, Home, CheckCircle } from 'lucide-react';

const steps = [
  { icon: Handshake, title: 'Initial Consultation', description: 'We begin with a conversation to understand your goals, timeline, preferences, and what matters most to you in a home.' },
  { icon: Search, title: 'Curated Search', description: 'Your agent combines deep local knowledge with advanced search tools to identify properties that match your criteria — including off-market opportunities.' },
  { icon: MapPin, title: 'Neighborhood Guidance', description: 'We go beyond listings to help you understand the neighborhoods, schools, commutes, and community character that shape your daily life.' },
  { icon: Shield, title: 'Expert Negotiation', description: 'Our agents are skilled negotiators who protect your interests and position you competitively in any market condition.' },
  { icon: Home, title: 'Seamless Closing', description: 'From inspection to settlement, we coordinate every detail and keep you informed at every step of the process.' },
  { icon: CheckCircle, title: 'Beyond the Keys', description: 'Our relationship doesn\'t end at closing. We remain a trusted resource for years to come.' },
];

export default function BuyersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-warm-white">
        <div className="container-wide">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">For Buyers</p>
              <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
                Find Your Next Home with <span className="text-cedar">Confidence</span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8">
                The Maryland market moves fast. With Red Cedar, you get a dedicated advocate who combines local expertise with modern tools to help you find — and win — the right home.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors"
              >
                Start Your Search
                <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <FadeIn className="text-center mb-16">
            <h2 className="text-display text-3xl md:text-4xl text-charcoal mb-4">
              The Buyer Experience
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A guided, transparent process designed around your needs.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div key={step.title} variants={staggerChild} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded bg-cedar/5 flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-cedar" />
                  </div>
                  <div>
                    <p className="text-xs text-cedar mb-1 font-medium">Step {i + 1}</p>
                    <h3 className="text-editorial text-lg text-charcoal mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cedar text-white">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="text-display text-3xl md:text-4xl text-white mb-4">
              Ready to Begin?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Connect with a Red Cedar agent who understands your goals and knows central Maryland inside and out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-cedar font-medium text-sm rounded hover:bg-white/90 transition-colors">
                Start the Conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/agents" className="inline-flex items-center justify-center px-8 py-4 text-white border border-white/30 font-medium text-sm rounded hover:bg-white/10 transition-colors">
                Find Your Agent
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
