'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  MapPin, Search, Plus, MoreHorizontal,
  Home, TrendingUp, Eye, Pencil,
} from 'lucide-react';

const placeholderNeighborhoods = [
  { name: 'Columbia', properties: 18, avgPrice: '$485,000', trend: '+4.2%', status: 'Published', image: null },
  { name: 'Ellicott City', properties: 14, avgPrice: '$575,000', trend: '+5.1%', status: 'Published', image: null },
  { name: 'Clarksville', properties: 8, avgPrice: '$825,000', trend: '+3.8%', status: 'Published', image: null },
  { name: 'Fulton', properties: 6, avgPrice: '$725,000', trend: '+6.5%', status: 'Published', image: null },
  { name: 'Elkridge', properties: 10, avgPrice: '$420,000', trend: '+4.9%', status: 'Published', image: null },
  { name: 'Highland', properties: 4, avgPrice: '$950,000', trend: '+2.7%', status: 'Published', image: null },
];

export default function NeighborhoodsPage() {
  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Neighborhood Guides</h1>
            <p className="text-sm text-muted-foreground">
              Manage neighborhood pages, descriptions, and featured properties.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-cedar text-white px-4 py-2 rounded-lg text-sm hover:bg-cedar/90 transition-colors">
            <Plus className="h-4 w-4" />
            Add Neighborhood
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search neighborhoods..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-sand-light/50 focus:outline-none focus:ring-1 focus:ring-cedar/30"
            />
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {placeholderNeighborhoods.map((hood, i) => (
          <FadeIn key={hood.name} delay={0.05 * (i + 1)}>
            <div className="bg-white rounded-lg border border-border overflow-hidden hover:border-cedar/30 hover:shadow-sm transition-all">
              {/* Placeholder image */}
              <div className="h-32 bg-sand-light flex items-center justify-center">
                <MapPin className="h-8 w-8 text-cedar/30" />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-charcoal">{hood.name}</h3>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${hood.status === 'Published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                    {hood.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Home className="h-3 w-3" /></p>
                    <p className="text-sm font-medium text-charcoal">{hood.properties}</p>
                    <p className="text-[10px] text-muted-foreground">listings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">avg</p>
                    <p className="text-sm font-medium text-charcoal">{hood.avgPrice}</p>
                    <p className="text-[10px] text-muted-foreground">price</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><TrendingUp className="h-3 w-3" /></p>
                    <p className="text-sm font-medium text-green-700">{hood.trend}</p>
                    <p className="text-[10px] text-muted-foreground">YoY</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 pt-3 border-t border-border">
                  <button className="flex-1 inline-flex items-center justify-center gap-1 text-xs text-muted-foreground py-1.5 rounded hover:bg-sand-light transition-colors">
                    <Eye className="h-3 w-3" /> Preview
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-1 text-xs text-muted-foreground py-1.5 rounded hover:bg-sand-light transition-colors">
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button className="p-1.5 rounded hover:bg-sand-light transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
