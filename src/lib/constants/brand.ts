// ============================================================
// Red Cedar Brand Constants
// ============================================================

export const BRAND = {
  name: 'Red Cedar Real Estate',
  tagline: 'Giving local home buyers and sellers an unfair advantage over the competition!',
  description:
    'Red Cedar Real Estate is the highest rated real estate brokerage in central Maryland, delivering a first-class client experience from start to finish.',
  office: {
    address: '6325 Woodside Court, Suite 105',
    city: 'Columbia',
    state: 'MD',
    zip: '21046',
    phone: '(443) 708-2887',
    mobile: '(410) 952-5726',
    fax: '(443) 455-1563',
    email: 'peter@redcedarre.com',
  },
  serviceRegion: 'Maryland & Washington DC',
  founded: '2012',
} as const;

// The principals. They're surfaced first on the agents page and in the contact
// form's agent picker — a visitor is most often here because of one of them.
// Order within the group is randomized so nobody is permanently listed first.
export const PRINCIPAL_AGENT_SLUGS = [
  'peter-boscas',
  'joe-bird',
  'brian-pakulla',
] as const;

// When someone asks about joining the brokerage without naming who they want
// to talk to, these two are copied on the notification alongside Peter. If
// they did name someone, that inquiry goes to that person only.
export const RECRUITING_CC_AGENT_SLUGS = [
  'brian-pakulla',
  'joe-bird',
] as const;

export const STATS = [
  { value: '$500M+', label: 'Total Sales Volume' },
  { value: '1,000+', label: 'Homes Represented' },
  { value: '15+', label: 'Maryland Markets Served' },
  { value: '98%', label: 'Client Satisfaction' },
] as const;

export const PILLARS = [
  {
    title: 'Technology-Driven Brokerage',
    description:
      'Modern tools and streamlined systems that give our agents and clients a decisive advantage at every stage of the transaction.',
    icon: 'monitor',
  },
  {
    title: 'Exceptional Service',
    description:
      'A first-class client experience defined by responsiveness, expertise, and a relentless commitment to every client\'s goals.',
    icon: 'shield',
  },
  {
    title: 'Superior Listing Marketing',
    description:
      'Cinematic photography, editorial storytelling, and targeted exposure strategies that position every home to command its highest value.',
    icon: 'image',
  },
  {
    title: 'Personalized Client Experience',
    description:
      'No two clients are the same. Our agents craft bespoke strategies tailored to your timeline, preferences, and ambitions.',
    icon: 'heart',
  },
] as const;
