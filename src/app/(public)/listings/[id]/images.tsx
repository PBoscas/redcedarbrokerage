'use client';

import { useState } from 'react';
import { Home } from 'lucide-react';

export function ListingDetailImages({
  heroUrl,
  alt,
}: {
  heroUrl: string | null;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!heroUrl || failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-cedar/20 flex items-center justify-center">
        <Home className="h-16 w-16 text-white/10" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={heroUrl}
      alt={alt}
      onError={() => setFailed(true)}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
