'use client';

import { FadeIn } from '@/components/ui/motion';

export function BrandIntroSection() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-narrow text-center">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-6 font-medium">
            A Different Kind of Brokerage
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-charcoal mb-8">
            Built for the Way Real Estate{' '}
            <span className="text-cedar">Should</span> Work
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Red Cedar Real Estate was founded on a simple conviction: that clients
            deserve more than a transaction — they deserve an experience defined by
            expertise, transparency, and genuine care. We combine modern technology
            with hands-on, relationship-first service to represent buyers and sellers
            at the highest level across central Maryland.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
