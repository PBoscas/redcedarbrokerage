'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  GripVertical, Eye, EyeOff, Pencil,
  Image, Type, List, Star, MapPin, Home,
  ChevronUp, ChevronDown,
} from 'lucide-react';

const homepageSections = [
  { id: 'hero', label: 'Hero Banner', icon: Image, description: 'Full-width hero with headline, subtitle, and CTA', visible: true },
  { id: 'featured', label: 'Featured Properties', icon: Home, description: 'Showcase of selected property listings', visible: true },
  { id: 'about', label: 'About Section', icon: Type, description: 'Brief overview of Red Cedar Real Estate', visible: true },
  { id: 'neighborhoods', label: 'Neighborhoods', icon: MapPin, description: 'Highlighted neighborhood guides', visible: true },
  { id: 'testimonials', label: 'Testimonials', icon: Star, description: 'Client reviews and success stories', visible: true },
  { id: 'agents', label: 'Meet the Team', icon: List, description: 'Featured agents grid', visible: false },
  { id: 'cta', label: 'Call to Action', icon: Type, description: 'Bottom CTA banner for buyer/seller inquiries', visible: true },
];

export default function HomepagePage() {
  return (
    <div className="max-w-4xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Homepage Editor</h1>
            <p className="text-sm text-muted-foreground">
              Arrange and configure homepage sections. Drag to reorder.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-cedar text-white px-4 py-2 rounded-lg text-sm hover:bg-cedar/90 transition-colors">
            <Eye className="h-4 w-4" />
            Preview
          </button>
        </div>
      </FadeIn>

      <div className="space-y-3">
        {homepageSections.map((section, i) => (
          <FadeIn key={section.id} delay={0.03 * (i + 1)}>
            <div className={`bg-white rounded-lg border border-border p-4 hover:border-cedar/30 transition-all ${!section.visible ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-4">
                {/* Drag handle */}
                <div className="cursor-grab text-muted-foreground hover:text-charcoal">
                  <GripVertical className="h-5 w-5" />
                </div>

                {/* Section icon */}
                <div className="h-9 w-9 rounded bg-sand-light flex items-center justify-center flex-shrink-0">
                  <section.icon className="h-4 w-4 text-cedar" />
                </div>

                {/* Label & description */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal">{section.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{section.description}</p>
                </div>

                {/* Reorder buttons */}
                <div className="flex flex-col gap-0.5">
                  <button disabled={i === 0} className="p-0.5 rounded hover:bg-sand-light disabled:opacity-30 transition-colors">
                    <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button disabled={i === homepageSections.length - 1} className="p-0.5 rounded hover:bg-sand-light disabled:opacity-30 transition-colors">
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>

                {/* Visibility toggle */}
                <button className="p-2 rounded hover:bg-sand-light transition-colors">
                  {section.visible ? (
                    <Eye className="h-4 w-4 text-cedar" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {/* Edit button */}
                <button className="p-2 rounded hover:bg-sand-light transition-colors">
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <p className="text-xs text-muted-foreground mt-6 text-center">
          Changes are saved automatically. Click &quot;Preview&quot; to see the live homepage.
        </p>
      </FadeIn>
    </div>
  );
}
