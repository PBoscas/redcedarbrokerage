'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  Image, Upload, Search, Grid, List,
  MoreHorizontal, File, Film, FileText,
} from 'lucide-react';

const placeholderMedia = [
  { name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', dimensions: '1920x1080', uploaded: 'Mar 5, 2026' },
  { name: 'wealthy-st-exterior.jpg', type: 'image', size: '1.8 MB', dimensions: '1600x1200', uploaded: 'Mar 4, 2026' },
  { name: 'lake-dr-living.jpg', type: 'image', size: '2.1 MB', dimensions: '1600x1200', uploaded: 'Mar 4, 2026' },
  { name: 'agent-sarah.jpg', type: 'image', size: '850 KB', dimensions: '800x800', uploaded: 'Mar 3, 2026' },
  { name: 'neighborhood-egr.jpg', type: 'image', size: '3.2 MB', dimensions: '2400x1600', uploaded: 'Mar 2, 2026' },
  { name: 'virtual-tour.mp4', type: 'video', size: '45.2 MB', dimensions: '1920x1080', uploaded: 'Mar 1, 2026' },
  { name: 'cherry-st-kitchen.jpg', type: 'image', size: '1.5 MB', dimensions: '1600x1200', uploaded: 'Feb 28, 2026' },
  { name: 'buyers-guide.pdf', type: 'document', size: '1.1 MB', dimensions: '—', uploaded: 'Feb 27, 2026' },
  { name: 'heritage-hill-aerial.jpg', type: 'image', size: '4.1 MB', dimensions: '3000x2000', uploaded: 'Feb 25, 2026' },
  { name: 'cascade-exterior.jpg', type: 'image', size: '2.0 MB', dimensions: '1600x1200', uploaded: 'Feb 24, 2026' },
  { name: 'team-photo.jpg', type: 'image', size: '3.5 MB', dimensions: '2400x1600', uploaded: 'Feb 22, 2026' },
  { name: 'open-house-flyer.pdf', type: 'document', size: '780 KB', dimensions: '—', uploaded: 'Feb 20, 2026' },
];

const typeIcon: Record<string, typeof Image> = {
  image: Image,
  video: Film,
  document: FileText,
};

export default function MediaPage() {
  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Media Library</h1>
            <p className="text-sm text-muted-foreground">
              Upload and manage images, videos, and documents.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-cedar text-white px-4 py-2 rounded-lg text-sm hover:bg-cedar/90 transition-colors">
            <Upload className="h-4 w-4" />
            Upload
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search media..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-sand-light/50 focus:outline-none focus:ring-1 focus:ring-cedar/30"
            />
          </div>
          <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-charcoal">
            <option>All Types</option>
            <option>Images</option>
            <option>Videos</option>
            <option>Documents</option>
          </select>
          <div className="flex items-center border border-border rounded-lg overflow-hidden ml-auto">
            <button className="p-2 bg-sand-light">
              <Grid className="h-4 w-4 text-charcoal" />
            </button>
            <button className="p-2 hover:bg-sand-light/50 transition-colors">
              <List className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Grid view */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {placeholderMedia.map((item, i) => {
          const Icon = typeIcon[item.type] || File;
          return (
            <FadeIn key={item.name} delay={0.02 * (i + 1)}>
              <div className="group bg-white rounded-lg border border-border overflow-hidden hover:border-cedar/30 hover:shadow-sm transition-all cursor-pointer">
                <div className="aspect-square bg-sand-light flex items-center justify-center relative">
                  <Icon className="h-8 w-8 text-cedar/30" />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors" />
                  <button className="absolute top-1.5 right-1.5 p-1 rounded bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-charcoal truncate">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">{item.size}</p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
