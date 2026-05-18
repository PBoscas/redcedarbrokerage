import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Accessibility' };

export default function AccessibilityPage() {
  return (
    <section className="pt-32 pb-16 bg-warm-white">
      <div className="container-narrow prose prose-neutral max-w-3xl">
        <h1 className="text-display text-4xl text-charcoal mb-8">Accessibility</h1>
        <p className="text-muted-foreground">
          Red Cedar Real Estate is committed to ensuring digital accessibility for
          people with disabilities. We continually improve the user experience for
          everyone and apply the relevant accessibility standards.
        </p>
        <p className="text-muted-foreground">
          If you experience any difficulty accessing any part of this website, please
          contact us at{' '}
          <a href="mailto:peter@redcedarre.com" className="text-cedar hover:underline">
            peter@redcedarre.com
          </a>.
        </p>
      </div>
    </section>
  );
}
