'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/ui/motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const PLACEHOLDER_TESTIMONIALS = [
  {
    quote:
      'Red Cedar transformed what could have been a stressful process into something truly enjoyable. Their market knowledge and personal attention made all the difference.',
    client: 'Michael & Christina T.',
    context: 'Purchased in Columbia',
  },
  {
    quote:
      'From the moment we listed, the marketing was stunning. Professional photography, compelling storytelling, and a strategy that generated multiple offers within days.',
    client: 'David & Sarah L.',
    context: 'Sold in Ellicott City',
  },
  {
    quote:
      'Relocating to Maryland felt overwhelming until we found Red Cedar. Our agent understood exactly what we needed and guided us with patience and expertise.',
    client: 'Jennifer K.',
    context: 'Relocated to Howard County',
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? PLACEHOLDER_TESTIMONIALS.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === PLACEHOLDER_TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="section-padding bg-warm-white">
      <div className="container-narrow">
        <FadeIn className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
            Client Stories
          </p>
          <h2 className="text-display text-3xl md:text-4xl text-charcoal">
            What Our Clients Say
          </h2>
        </FadeIn>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <Quote className="h-10 w-10 text-cedar/20 mx-auto mb-8" />
              <blockquote className="text-editorial text-xl md:text-2xl lg:text-3xl text-charcoal leading-relaxed mb-8 max-w-3xl mx-auto">
                &ldquo;{PLACEHOLDER_TESTIMONIALS[current].quote}&rdquo;
              </blockquote>
              <div>
                <p className="text-sm font-semibold text-charcoal">
                  {PLACEHOLDER_TESTIMONIALS[current].client}
                </p>
                <p className="text-sm text-muted-foreground">
                  {PLACEHOLDER_TESTIMONIALS[current].context}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:border-cedar hover:text-cedar transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {PLACEHOLDER_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? 'bg-cedar' : 'bg-border'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:border-cedar hover:text-cedar transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
