import type { Metadata } from 'next';
import { InsightsArchive } from '@/components/sections/insights-archive';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Market insights, buying & selling guides, and DMV lifestyle content from Red Cedar Real Estate.',
};

export default function InsightsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-warm-white">
        <div className="container-wide">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">Knowledge</p>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
            <span className="text-cedar">Insights</span> & Guides
          </h1>
          <p className="text-muted-foreground max-w-xl text-body-lg">
            Market intelligence, expert guidance, and lifestyle content to help you make confident real estate decisions.
          </p>
        </div>
      </section>
      <InsightsArchive />
    </>
  );
}
