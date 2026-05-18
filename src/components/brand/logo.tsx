'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'mark';
  className?: string;
  light?: boolean;
}

export function Logo({ variant = 'full', className = '', light = false }: LogoProps) {
  const src = variant === 'mark'
    ? '/images/logos/mark-red.png'
    : light
      ? '/images/logos/logo-white.png'
      : '/images/logos/logo-black.png';

  return (
    <Link href="/" className={`inline-flex items-center group ${className}`}>
      <Image
        src={src}
        alt="Red Cedar Real Estate"
        width={variant === 'mark' ? 40 : 180}
        height={variant === 'mark' ? 40 : 60}
        className="h-10 w-auto object-contain"
        priority
      />
    </Link>
  );
}
