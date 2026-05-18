import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-16 bg-warm-white">
      <div className="container-narrow prose prose-neutral max-w-3xl">
        <h1 className="text-display text-4xl text-charcoal mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Red Cedar Real Estate respects your privacy. This policy describes how we
          collect, use, and protect your personal information when you use our website
          or services. We do not sell your personal data to third parties.
        </p>
        <p className="text-muted-foreground">
          For questions about our privacy practices, please contact us at{' '}
          <a href="mailto:peter@redcedarre.com" className="text-cedar hover:underline">
            peter@redcedarre.com
          </a>.
        </p>
      </div>
    </section>
  );
}
