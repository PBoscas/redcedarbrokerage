'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  FileText, Pencil, Eye, Clock,
  ShoppingBag, Tag, Info, Phone, UserPlus,
} from 'lucide-react';

const globalPages = [
  { slug: '/buyers', title: 'Buyers Guide', icon: ShoppingBag, description: 'Information and resources for home buyers', lastEdited: '3 days ago', status: 'Published' },
  { slug: '/sellers', title: 'Sellers Guide', icon: Tag, description: 'Selling process, pricing strategies, and staging tips', lastEdited: '1 week ago', status: 'Published' },
  { slug: '/about', title: 'About Us', icon: Info, description: 'Company history, mission, and values', lastEdited: '2 weeks ago', status: 'Published' },
  { slug: '/contact', title: 'Contact', icon: Phone, description: 'Contact form, office locations, and hours', lastEdited: '1 month ago', status: 'Published' },
  { slug: '/join', title: 'Join Our Team', icon: UserPlus, description: 'Agent recruitment and career opportunities', lastEdited: '5 days ago', status: 'Draft' },
];

const statusBadge: Record<string, string> = {
  Published: 'bg-green-50 text-green-700',
  Draft: 'bg-amber-50 text-amber-700',
};

export default function PagesPage() {
  return (
    <div className="max-w-4xl">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-display text-2xl text-charcoal mb-1">Global Pages</h1>
          <p className="text-sm text-muted-foreground">
            Edit content for the site&apos;s main informational pages.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-3">
        {globalPages.map((page, i) => (
          <FadeIn key={page.slug} delay={0.04 * (i + 1)}>
            <div className="bg-white rounded-lg border border-border p-5 hover:border-cedar/30 hover:shadow-sm transition-all">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded bg-sand-light flex items-center justify-center flex-shrink-0">
                  <page.icon className="h-5 w-5 text-cedar" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-charcoal">{page.title}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusBadge[page.status] || ''}`}>
                      {page.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{page.description}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <FileText className="h-3 w-3" /> {page.slug}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Edited {page.lastEdited}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-2 rounded hover:bg-sand-light transition-colors" title="Preview">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded hover:bg-sand-light transition-colors" title="Edit">
                    <Pencil className="h-4 w-4 text-muted-foreground" />
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
