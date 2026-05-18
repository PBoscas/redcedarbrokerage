import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <section className="pt-32 pb-16 bg-warm-white">
      <div className="container-narrow prose prose-neutral max-w-3xl">
        <h1 className="text-display text-4xl text-charcoal mb-8">Terms of Service</h1>
        <p className="text-muted-foreground">
          By accessing and using the Red Cedar Real Estate website, you agree to
          comply with these terms. All listing data is provided by Bright MLS and is
          deemed reliable but not guaranteed. Red Cedar Real Estate is not responsible
          for typographical errors or misinformation.
        </p>
        <p className="text-muted-foreground">
          For questions, please contact us at{' '}
          <a href="mailto:peter@redcedarre.com" className="text-cedar hover:underline">
            peter@redcedarre.com
          </a>.
        </p>
      </div>
    </section>
  );
}
