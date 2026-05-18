'use client';

import Link from 'next/link';
import { FadeIn, StaggerContainer, staggerChild, ScaleReveal } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Lightbulb, Heart, Target } from 'lucide-react';
import { BRAND, STATS } from '@/lib/constants/brand';

const values = [
  { icon: Heart, title: 'Client First', description: 'Every decision we make centers on delivering the best possible outcome for the people we serve.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We embrace modern technology to elevate the client experience without losing the personal touch.' },
  { icon: Target, title: 'Excellence', description: 'We hold ourselves to the highest standards of professionalism, marketing, and representation.' },
  { icon: Users, title: 'Community', description: 'We are invested in the neighborhoods we serve and the people who call them home.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-warm-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">About Us</p>
              <h1 className="text-display text-4xl md:text-5xl text-charcoal mb-6">
                A Brokerage Built on <span className="text-cedar">Conviction</span>
              </h1>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                Red Cedar Real Estate was founded on the belief that real estate
                deserves better — better marketing, better technology, better service,
                and a better experience for everyone involved.
              </p>
            </FadeIn>
            <ScaleReveal>
              <div className="aspect-[4/3] bg-sand rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-cedar/10 to-sand flex items-center justify-center text-cedar/20 text-sm">
                  Team / Office Photo
                </div>
              </div>
            </ScaleReveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="text-display text-2xl md:text-3xl text-charcoal mb-8">Our Story</h2>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                Founded in {BRAND.founded}, Red Cedar Real Estate emerged from a simple observation:
                the central Maryland real estate market needed a brokerage that combined the warmth and personal
                attention of a boutique firm with the technology infrastructure and marketing
                sophistication of a modern platform.
              </p>
              <p>
                Our founder saw an industry relying on outdated practices — poor listing marketing,
                impersonal client communication, and a transactional mindset that underserved both
                agents and clients. Red Cedar was built to change that.
              </p>
              <p>
                Today, we serve buyers and sellers across {BRAND.serviceRegion} with a team
                of exceptional agents who share our commitment to excellence, innovation, and
                genuine client care.
              </p>
              <p>
                <Link href="/about/our-story" className="text-cedar hover:text-cedar-dark font-medium inline-flex items-center gap-1">
                  Read the story behind the name <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-sand-light">
        <div className="container-wide">
          <FadeIn className="text-center mb-16">
            <h2 className="text-display text-3xl md:text-4xl text-charcoal">What We Believe</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <motion.div key={v.title} variants={staggerChild} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded bg-cedar/5 mb-5">
                  <v.icon className="h-6 w-6 text-cedar" />
                </div>
                <h3 className="text-editorial text-lg text-charcoal mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-cedar text-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <FadeIn key={stat.label}>
                <p className="text-display text-3xl md:text-4xl text-white mb-2">{stat.value}</p>
                <p className="text-sm text-white/60 tracking-wide uppercase">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-warm-white">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="text-display text-3xl md:text-4xl text-charcoal mb-4">
              Experience the Difference
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Whether you&apos;re buying, selling, or looking for your next career home, we&apos;d love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/agents" className="inline-flex items-center justify-center px-8 py-4 text-cedar border border-cedar/30 font-medium text-sm rounded hover:bg-cedar/5 transition-colors">
                Meet Our Agents
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
