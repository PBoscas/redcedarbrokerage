// Shared between the server page (which validates the ?type= param) and the
// client form.
//
// This deliberately lives outside contact-form.tsx. That file is 'use client',
// and in a production build a Server Component importing a plain value from a
// client module receives a client-reference proxy rather than the value — so
// INQUIRY_TYPES arrived as undefined on the server and /contact?type=... threw
// a 500. Dev doesn't apply the same stubbing, so it only showed up once
// deployed. Keep these here, not in a 'use client' file.

export const INQUIRY_TYPES = [
  'buying', 'selling', 'relocating', 'agent', 'joining', 'general',
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number] | null;
