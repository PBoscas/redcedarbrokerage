import { HeroSection } from '@/components/sections/hero';
import { BrandIntroSection } from '@/components/sections/brand-intro';
import { StatsBandSection } from '@/components/sections/stats-band';
import { FeaturedAgentsSection } from '@/components/sections/featured-agents';
import { DifferenceSection } from '@/components/sections/difference';
import { TechnologySection } from '@/components/sections/technology';
import { FeaturedHomesSection } from '@/components/sections/featured-homes';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { AwardsBandSection } from '@/components/sections/awards-band';
import { RecruitingTeaserSection } from '@/components/sections/recruiting-teaser';
import { ContactCTASection } from '@/components/sections/contact-cta';
import { getFeaturedAgents, getAgentSpecialties } from '@/lib/queries/agents';
import { getFeaturedListings } from '@/lib/queries/listings';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [rawAgents, featuredListings] = await Promise.all([
    getFeaturedAgents(),
    getFeaturedListings(3),
  ]);

  const agents = await Promise.all(
    rawAgents.map(async (a) => {
      const specialties = await getAgentSpecialties(a.id);
      return {
        slug: a.slug,
        first_name: a.first_name,
        last_name: a.last_name,
        title: a.title,
        headshot_url: a.headshot_url,
        specialties: specialties.map((s) => s.name),
      };
    })
  );

  return (
    <>
      {/* 1. Full-screen cinematic hero */}
      <HeroSection />

      {/* 2. Brand credibility intro */}
      <BrandIntroSection />

      {/* 3. Signature stats / trust band */}
      <StatsBandSection />

      {/* 4. Featured agents */}
      <FeaturedAgentsSection agents={agents} />

      {/* 5. The Red Cedar Difference — four pillars */}
      <DifferenceSection />

      {/* 6. Technology story */}
      <TechnologySection />

      {/* 7. Featured homes showcase */}
      <FeaturedHomesSection listings={featuredListings} />

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 10. Awards + media mentions */}
      <AwardsBandSection />

      {/* 11. Recruiting teaser */}
      <RecruitingTeaserSection />

      {/* 12. Concierge contact CTA */}
      <ContactCTASection />
    </>
  );
}
