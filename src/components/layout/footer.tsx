import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { footerNav, socialLinks } from '@/lib/constants/navigation';
import { BRAND } from '@/lib/constants/brand';
import { Instagram, Linkedin, Facebook, Youtube, Twitter } from 'lucide-react';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container-wide section-padding">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo light variant="full" />
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              {BRAND.description}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon];
                return (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors"
                    aria-label={link.platform}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
              Office
            </h3>
            <address className="text-sm not-italic text-white/60 space-y-2">
              <p>{BRAND.office.address}</p>
              <p>{BRAND.office.city}, {BRAND.office.state} {BRAND.office.zip}</p>
              <p className="pt-2">
                <a href={`tel:${BRAND.office.phone}`} className="hover:text-white transition-colors">
                  {BRAND.office.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${BRAND.office.email}`} className="hover:text-white transition-colors">
                  {BRAND.office.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerNav.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Agent Login
              </Link>
              <p className="text-xs text-white/30">
                Serving {BRAND.serviceRegion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
