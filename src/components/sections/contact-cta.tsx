'use client';

import Link from 'next/link';
import { FadeIn } from '@/components/ui/motion';
import { ArrowRight } from 'lucide-react';

export function ContactCTASection() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-narrow text-center">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-6 font-medium">
            Ready to Begin?
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
            Your Next Chapter{' '}
            <span className="text-cedar">Starts Here</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
            Whether you&apos;re buying, selling, or simply exploring your options,
            we&apos;re here to provide guidance tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cedar text-white font-medium tracking-wide text-sm rounded hover:bg-cedar-dark transition-colors"
            >
              Start the Conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-cedar font-medium tracking-wide text-sm rounded border border-cedar/30 hover:bg-cedar/5 transition-colors"
            >
              Find Your Agent
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
