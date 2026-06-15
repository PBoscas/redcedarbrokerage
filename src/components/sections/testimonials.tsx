'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/ui/motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'Peter provided the best real estate transaction my husband and I have ever experienced. He is personable, honest, patient and incredibly knowledgeable about real estate. He is very responsive to calls, questions etc and is an absolute pleasure to work with.',
    client: 'Lola S.',
    context: 'Homebuyer',
  },
  {
    quote:
      "Peter is an expert at pricing. He does his research and has an excellent grasp on how to structure and negotiate offers based on true market value, comps, neighborhood, location and property conditions. He is trustworthy, reliable and very responsive. We truly feel like Peter had our best interests at heart and that shows in everything he does. We LOVE our new home!!!",
    client: 'Dorit F.',
    context: 'Purchased in Elkridge',
  },
  {
    quote:
      "Peter helped us find our dream townhouse back in 2021, and we couldn't have asked for a better experience. From day one, he truly listened to our needs and gave thoughtful recommendations about what would be a good long-term investment versus what might end up being a money pit. Thanks to his guidance and expertise, we ended up getting our top-choice home in just eight days!",
    client: 'Sarah A.',
    context: 'First-Time Homebuyer',
  },
  {
    quote:
      'It was a stroke of luck to find Peter Boscas. I am out of state, not well-versed in the real estate world, and needed to sell a property in Maryland. Peter could not have been easier to work with, more responsive, or more forthcoming with good advice. Really, just a pleasure. Highly recommend!',
    client: 'Jake W.',
    context: 'Home Seller',
  },
  {
    quote:
      "Peter made our home-buying experience pleasant and easy. He stuck to our criteria and was very thorough. He didn't put any pressure on us to find something that didn't meet our needs. He promised us from the beginning that he wanted us to get every single thing that we wanted and that's what we ended up with.",
    client: 'Dorothy A.',
    context: 'Purchased in Columbia',
  },
  {
    quote:
      "Working with Peter and his team was great! We had a townhouse in Baltimore that we wanted to sell, but we're non-local. Peter walked us through the entire process and kept us in the loop from start to end. We put a lot of trust in Peter to sell the property and we are absolutely satisfied and happy with his results.",
    client: 'Kenneth L.',
    context: 'Sold in Baltimore',
  },
  {
    quote:
      "Couldn't have asked for a better realtor than Emily. You know you're in good hands when she calls you to check in on her day off when she's not supposed to be worrying about you. Highly recommend!",
    client: 'Marco Romero',
    context: 'Google Review',
  },
  {
    quote:
      'We had a great experience working with Red Cedar to buy our first home in Baltimore County. Peter was helpful, patient, and very responsive to questions. Peter clearly loves what he does and it shows in the quality of his business. Highly recommended!',
    client: 'Anna',
    context: 'First-Time Homebuyer',
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

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
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </blockquote>
              <div>
                <p className="text-sm font-semibold text-charcoal">
                  {TESTIMONIALS[current].client}
                </p>
                <p className="text-sm text-muted-foreground">
                  {TESTIMONIALS[current].context}
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
              {TESTIMONIALS.map((_, i) => (
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
