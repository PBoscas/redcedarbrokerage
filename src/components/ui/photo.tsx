'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PhotoProps {
  /** Photo path/URL. Pass null when no photo has been supplied yet. */
  src: string | null;
  alt: string;
  /** Caption shown inside the placeholder when the photo is missing. */
  placeholder?: string;
  className?: string;
  priority?: boolean;
}

/**
 * A fill-mode photo that degrades to the branded gradient placeholder when the
 * file is missing or fails to load, rather than rendering a broken-image icon.
 * The parent element must be `relative` and set the aspect ratio.
 */
export function Photo({
  src,
  alt,
  placeholder = 'Photo coming soon',
  className = '',
  priority,
}: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-cedar/10 to-sand flex items-center justify-center">
        <span className="text-cedar/30 text-xs text-center px-3">{placeholder}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
