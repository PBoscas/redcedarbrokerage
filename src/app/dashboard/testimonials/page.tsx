'use client';

import { FadeIn } from '@/components/ui/motion';
import { Plus, Star, Edit, Trash2, Quote } from 'lucide-react';

const PLACEHOLDER_TESTIMONIALS = [
  { id: '1', client: 'Michael & Christina T.', quote: 'Working with our agent was an absolute pleasure. Their professionalism, market knowledge, and genuine care made our home-buying experience truly exceptional.', context: 'Purchased in Columbia', featured: true },
  { id: '2', client: 'David L.', quote: 'Our agent helped us sell our home above asking price in just five days. The marketing was incredible and the process was seamless.', context: 'Sold in Ellicott City', featured: false },
];

export default function TestimonialsPage() {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <FadeIn>
          <h1 className="text-display text-2xl text-charcoal mb-1">My Testimonials</h1>
          <p className="text-sm text-muted-foreground">Manage client testimonials on your profile.</p>
        </FadeIn>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-cedar text-white text-sm font-medium rounded hover:bg-cedar-dark transition-colors">
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {PLACEHOLDER_TESTIMONIALS.map((t) => (
          <div key={t.id} className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Quote className="h-4 w-4 text-cedar/30" />
                  {t.featured && (
                    <span className="inline-flex items-center gap-1 text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">
                      <Star className="h-3 w-3" /> Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-charcoal leading-relaxed mb-3">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm font-medium text-charcoal">{t.client}</p>
                <p className="text-xs text-muted-foreground">{t.context}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-muted-foreground hover:text-cedar transition-colors" aria-label="Edit">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
