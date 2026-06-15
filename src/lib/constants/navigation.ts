import { type NavItem } from '@/types';

export const primaryNav: NavItem[] = [
  { label: 'Agents', href: '/agents' },
  { label: 'Listings', href: '/listings' },
  { label: 'Buyers', href: '/buyers' },
  { label: 'Sellers', href: '/sellers' },
  { label: 'About', href: '/about', children: [
    { label: 'About Red Cedar', href: '/about' },
    { label: 'The Story Behind the Name', href: '/about/our-story' },
  ] },
  { label: 'Join Red Cedar', href: '/join-red-cedar' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Agents', href: '/agents' },
    { label: 'Join Red Cedar', href: '/join-red-cedar' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Listings', href: '/listings' },
    { label: 'Buyers', href: '/buyers' },
    { label: 'Sellers', href: '/sellers' },
    // { label: 'Neighborhoods', href: '/neighborhoods' },  // Hidden until more counties are added
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};

export const socialLinks = [
  { platform: 'Facebook', href: 'https://facebook.com/RedCedarRealEstate', icon: 'facebook' },
  { platform: 'Instagram', href: 'https://instagram.com/RedCedarRealEstate', icon: 'instagram' },
  { platform: 'X', href: 'https://x.com/RedCedarRE', icon: 'twitter' },
];
