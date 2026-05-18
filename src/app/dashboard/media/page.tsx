'use client';

import { FadeIn } from '@/components/ui/motion';
import { Upload, Image, Search } from 'lucide-react';

export default function MediaPage() {
  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <FadeIn>
          <h1 className="text-display text-2xl text-charcoal mb-1">My Media</h1>
          <p className="text-sm text-muted-foreground">Upload and manage your photos and media assets.</p>
        </FadeIn>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-cedar text-white text-sm font-medium rounded hover:bg-cedar-dark transition-colors">
          <Upload className="h-4 w-4" /> Upload
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar"
          placeholder="Search media..."
        />
      </div>

      {/* Upload area */}
      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center bg-white mb-8 hover:border-cedar/30 transition-colors cursor-pointer">
        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <p className="text-sm text-charcoal mb-1">Drop files here or click to upload</p>
        <p className="text-xs text-muted-foreground">JPG, PNG, WebP up to 5MB each</p>
      </div>

      {/* Empty state */}
      <div className="text-center py-12">
        <Image className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">No media uploaded yet.</p>
      </div>
    </div>
  );
}
