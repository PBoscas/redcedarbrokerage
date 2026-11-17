'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/motion';
import { ArrowRight } from 'lucide-react';

export function RecruitingTeaserSection() {
  return (
    <section className="section-padding bg-cedar text-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-muted mb-4 font-medium">
              Join Red Cedar
            </p>
            <h2 className="text-display text-3xl md:text-4xl text-white mb-6">
              Elevate Your Career with a Brokerage That Matches{' '}
              <span className="text-gold-muted">Your Ambition</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Red Cedar attracts agents who want more than a desk and a brand.
              We offer premium technology, superior marketing, and a culture built
              for professionals who take their craft seriously.
            </p>
            <Link
              href="/join-red-cedar"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-cedar font-medium tracking-wide text-sm rounded hover:bg-white/90 transition-colors"
            >
              Learn About Joining
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative aspect-[4/3] bg-cedar-dark/50 rounded overflow-hidden">
              <Image
                src="/images/home/join-red-cedar.webp"
                alt="Two men in blazers walking and talking along a brick sidewalk in a historic downtown"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
