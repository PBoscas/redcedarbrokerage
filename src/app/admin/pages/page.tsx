import { FadeIn } from '@/components/ui/motion';
import Link from 'next/link';
import {
  FileText, ExternalLink,
  Home, Info, BookOpen, Users, ShoppingBag, Tag,
  Building2, Phone, UserPlus, MapPin, Newspaper,
  Star, Shield, ScrollText, Accessibility,
} from 'lucide-react';

const sitePages = [
  { path: '/', title: 'Home', icon: Home, description: 'Main landing page with hero, featured listings, and CTA sections' },
  { path: '/about', title: 'About', icon: Info, description: 'Company history, mission, and values' },
  { path: '/about/our-story', title: 'Our Story', icon: BookOpen, description: 'Detailed company origin story and journey' },
  { path: '/agents', title: 'Meet the Team', icon: Users, description: 'Agent directory and team profiles' },
  { path: '/buyers', title: 'Buyers Guide', icon: ShoppingBag, description: 'Information and resources for home buyers' },
  { path: '/sellers', title: 'Sellers Guide', icon: Tag, description: 'Selling process, pricing strategies, and staging tips' },
  { path: '/listings', title: 'Property Listings', icon: Building2, description: 'All property listings with search and filters' },
  { path: '/contact', title: 'Contact', icon: Phone, description: 'Contact form, office locations, and hours' },
  { path: '/join-red-cedar', title: 'Join Our Team', icon: UserPlus, description: 'Agent recruitment and career opportunities' },
  { path: '/neighborhoods', title: 'Neighborhoods', icon: MapPin, description: 'Neighborhood guides and area information' },
  { path: '/insights', title: 'Insights', icon: Newspaper, description: 'Blog posts, market updates, and guides' },
  { path: '/featured-homes', title: 'Featured Homes', icon: Star, description: 'Curated selection of featured properties' },
  { path: '/privacy', title: 'Privacy Policy', icon: Shield, description: 'Privacy policy and data handling practices' },
  { path: '/terms', title: 'Terms of Service', icon: ScrollText, description: 'Terms of service and legal agreements' },
  { path: '/accessibility', title: 'Accessibility', icon: Accessibility, description: 'Accessibility statement and compliance info' },
];

export default function PagesPage() {
  return (
    <div className="max-w-4xl">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-display text-2xl text-charcoal mb-1">Site Pages</h1>
          <p className="text-sm text-muted-foreground">
            All public pages on the site. These are file-based routes in the Next.js app.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-3">
        {sitePages.map((page, i) => (
          <FadeIn key={page.path} delay={0.04 * (i + 1)}>
            <div className="bg-white rounded-lg border border-border p-5 hover:border-cedar/30 hover:shadow-sm transition-all">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded bg-sand-light flex items-center justify-center flex-shrink-0">
                  <page.icon className="h-5 w-5 text-cedar" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal">{page.title}</p>
                  <p className="text-xs text-muted-foreground">{page.description}</p>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1.5">
                    <FileText className="h-3 w-3" /> {page.path}
                  </span>
                </div>

                <Link
                  href={page.path}
                  target="_blank"
                  className="p-2 rounded hover:bg-sand-light transition-colors"
                  title={`View ${page.title}`}
                >
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <p className="text-xs text-muted-foreground mt-6 text-center">
          {sitePages.length} pages. These routes are defined as files in the codebase.
        </p>
      </FadeIn>
    </div>
  );
}
