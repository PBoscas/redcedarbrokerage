import { FadeIn } from '@/components/ui/motion';
import { sql } from '@/lib/db';
import {
  Eye, EyeOff,
  Image, Type, List, Star, MapPin, Home,
} from 'lucide-react';

interface HomepageSectionRow {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  visible: boolean;
  sort_order: number;
}

const defaultSections = [
  { id: 'default-hero', section_key: 'hero', title: 'Hero Banner', subtitle: 'Full-width hero with headline, subtitle, and CTA', visible: true, sort_order: 1 },
  { id: 'default-featured', section_key: 'featured', title: 'Featured Properties', subtitle: 'Showcase of selected property listings', visible: true, sort_order: 2 },
  { id: 'default-about', section_key: 'about', title: 'About Section', subtitle: 'Brief overview of Red Cedar Real Estate', visible: true, sort_order: 3 },
  { id: 'default-testimonials', section_key: 'testimonials', title: 'Testimonials', subtitle: 'Client reviews and success stories', visible: true, sort_order: 4 },
  { id: 'default-agents', section_key: 'agents', title: 'Meet the Team', subtitle: 'Featured agents grid', visible: true, sort_order: 5 },
  { id: 'default-cta', section_key: 'cta', title: 'Call to Action', subtitle: 'Bottom CTA banner for buyer/seller inquiries', visible: true, sort_order: 6 },
];

const sectionIcons: Record<string, typeof Image> = {
  hero: Image,
  featured: Home,
  about: Type,
  neighborhoods: MapPin,
  testimonials: Star,
  agents: List,
  cta: Type,
};

async function getHomepageSections(): Promise<HomepageSectionRow[]> {
  try {
    const rows = await sql`
      SELECT id, section_key, title, subtitle, visible, sort_order
      FROM homepage_sections
      ORDER BY sort_order
    `;
    return rows as unknown as HomepageSectionRow[];
  } catch (error) {
    console.error('Failed to fetch homepage sections:', error);
    return [];
  }
}

export default async function HomepagePage() {
  const dbSections = await getHomepageSections();
  const sections = dbSections.length > 0 ? dbSections : defaultSections;
  const usingDefaults = dbSections.length === 0;

  return (
    <div className="max-w-4xl">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-display text-2xl text-charcoal mb-1">Homepage Sections</h1>
          <p className="text-sm text-muted-foreground">
            Current homepage section configuration and visibility.
          </p>
          {usingDefaults && (
            <p className="text-xs text-amber-600 mt-2">
              No sections found in database — showing default configuration.
            </p>
          )}
        </div>
      </FadeIn>

      <div className="space-y-3">
        {sections.map((section, i) => {
          const Icon = sectionIcons[section.section_key] || Type;
          return (
            <FadeIn key={section.id} delay={0.03 * (i + 1)}>
              <div className={`bg-white rounded-lg border border-border p-4 transition-all ${!section.visible ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-4">
                  {/* Section icon */}
                  <div className="h-9 w-9 rounded bg-sand-light flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-cedar" />
                  </div>

                  {/* Label & description */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal">
                      {section.title || section.section_key}
                    </p>
                    {section.subtitle && (
                      <p className="text-xs text-muted-foreground truncate">{section.subtitle}</p>
                    )}
                  </div>

                  {/* Sort order */}
                  <span className="text-xs text-muted-foreground tabular-nums">
                    #{section.sort_order}
                  </span>

                  {/* Visibility indicator */}
                  <div className="p-2">
                    {section.visible ? (
                      <Eye className="h-4 w-4 text-cedar" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={0.3}>
        <p className="text-xs text-muted-foreground mt-6 text-center">
          {sections.length} section{sections.length !== 1 ? 's' : ''} configured.
          {' '}{sections.filter(s => s.visible).length} visible on the homepage.
        </p>
      </FadeIn>
    </div>
  );
}
