import { sql } from '@/lib/db';
import SettingsForm from './settings-form';

export type SettingsMap = Record<string, unknown>;

/** Default values used when nothing is stored in the DB yet. */
const DEFAULTS: SettingsMap = {
  general: {
    'Site Name': 'Red Cedar Real Estate',
    Tagline:
      'Giving local home buyers and sellers an unfair advantage over the competition!',
    'Contact Email': 'peter@redcedarre.com',
    'Phone Number': '(443) 708-2887',
    'Office Address':
      '6325 Woodside Court, Suite 105, Columbia, MD 21046',
  },
  branding: {
    'Primary Color (Cedar)': '#8B4513',
    'Accent Color': '#2C1810',
    'Font Family': 'Inter / Playfair Display',
  },
  email: {
    'SMTP Host': 'smtp.example.com',
    'From Email': 'noreply@redcedarre.com',
    'Admin Notification Email': 'peter@redcedarre.com',
  },
  seo: {
    'Default Meta Title':
      'Red Cedar Real Estate | Central Maryland Real Estate',
    'Default Meta Description':
      'The highest rated real estate brokerage in central Maryland.',
    'Google Analytics ID': 'G-XXXXXXXXXX',
  },
  toggles: {
    'Maintenance Mode': false,
    'Email Notifications': true,
    'Auto-publish Listings': false,
    'External IDX Feed': true,
  },
};

async function getSettings(): Promise<SettingsMap> {
  try {
    const rows = await sql`SELECT key, value FROM site_settings ORDER BY key`;
    const stored: SettingsMap = {};
    for (const row of rows) {
      stored[row.key as string] = row.value;
    }
    // Merge: stored values override defaults
    const merged: SettingsMap = {};
    for (const key of Object.keys(DEFAULTS)) {
      if (stored[key] && typeof stored[key] === 'object' && typeof DEFAULTS[key] === 'object') {
        merged[key] = { ...(DEFAULTS[key] as Record<string, unknown>), ...(stored[key] as Record<string, unknown>) };
      } else {
        merged[key] = stored[key] !== undefined ? stored[key] : DEFAULTS[key];
      }
    }
    return merged;
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return DEFAULTS;
  }
}

export default async function SettingsPage() {
  const settings = await getSettings();

  return <SettingsForm initialSettings={settings} />;
}
