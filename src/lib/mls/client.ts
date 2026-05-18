const AUTH_ENDPOINT = process.env.MLS_RESO_AUTH_ENDPOINT!;
const CLIENT_ID = process.env.MLS_RESO_CLIENT_ID!;
const CLIENT_SECRET = process.env.MLS_RESO_CLIENT_SECRET!;
const API_BASE = process.env.MLS_RESO_API_BASE_URL!;

const OFFICE_MLS_ID = 'RCDR1';

const SELECT_FIELDS = [
  'ListingKey', 'ListingId', 'MlsStatus', 'ListPrice', 'ClosePrice',
  'PropertyType', 'PropertySubType',
  'UnparsedAddress', 'StreetNumber', 'StreetName', 'StreetSuffix', 'UnitNumber',
  'City', 'StateOrProvince', 'PostalCode', 'County',
  'Latitude', 'Longitude',
  'BedroomsTotal', 'BathroomsFull', 'BathroomsHalf',
  'LivingArea', 'LotSizeAcres', 'LotSizeSquareFeet',
  'YearBuilt', 'ListAgentMlsId', 'ListOfficeMlsId',
  'ListingContractDate', 'CloseDate', 'PublicRemarks', 'SubdivisionName',
  'DaysOnMarket', 'GarageSpaces', 'StoriesTotal',
  'ArchitecturalStyle', 'AssociationFee', 'AssociationFeeFrequency',
  'ListAgentFullName', 'OriginalListPrice', 'ModificationTimestamp',
].join(',');

const MEDIA_SELECT_FIELDS = 'MediaKey,ResourceRecordKey,MediaCategory,MediaType,MediaURL,MediaDisplayOrder';

// --- Token Management ---

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const body = `grant_type=client_credentials&client_id=${encodeURIComponent(CLIENT_ID)}&client_secret=${encodeURIComponent(CLIENT_SECRET)}`;

  const res = await fetch(AUTH_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MLS auth failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000, // refresh 60s early
  };

  return cachedToken.token;
}

// --- API Helpers ---

async function mlsFetch(url: string): Promise<Record<string, unknown>> {
  const token = await getAccessToken();
  console.log('[MLS] Fetching:', url.substring(0, 300));
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MLS API error (${res.status}) [${url.substring(0, 200)}]: ${text}`);
  }

  return res.json();
}

export interface RawListing {
  ListingKey: string;
  ListingId: string;
  MlsStatus: string;
  ListPrice: number | null;
  ClosePrice: number | null;
  PropertyType: string | null;
  PropertySubType: string | null;
  UnparsedAddress: string | null;
  StreetNumber: string | null;
  StreetName: string | null;
  StreetSuffix: string | null;
  UnitNumber: string | null;
  City: string | null;
  StateOrProvince: string | null;
  PostalCode: string | null;
  County: string | null;
  Latitude: number | null;
  Longitude: number | null;
  BedroomsTotal: number | null;
  BathroomsFull: number | null;
  BathroomsHalf: number | null;
  LivingArea: number | null;
  LotSizeAcres: number | null;
  LotSizeSquareFeet: number | null;
  YearBuilt: number | null;
  ListAgentMlsId: string | null;
  ListAgentFullName: string | null;
  ListOfficeMlsId: string | null;
  ListingContractDate: string | null;
  CloseDate: string | null;
  DaysOnMarket: number | null;
  PublicRemarks: string | null;
  SubdivisionName: string | null;
  GarageSpaces: number | null;
  StoriesTotal: number | null;
  ArchitecturalStyle: string | null;
  AssociationFee: number | null;
  AssociationFeeFrequency: string | null;
  OriginalListPrice: number | null;
  ModificationTimestamp: string | null;
}

export interface RawPhoto {
  MediaKey: string;
  ResourceRecordKey: string;
  MediaCategory: string | null;
  MediaType: string | null;
  MediaURL: string | null;
  MediaDisplayOrder: number | null;
}

// --- Fetching Listings ---

async function fetchListingsPage(filter: string, skip: number): Promise<RawListing[]> {
  const url = `${API_BASE}/BrightProperties?$filter=${filter}&$select=${SELECT_FIELDS}&$top=200&$skip=${skip}`;
  const data = await mlsFetch(url);
  return (data.value as RawListing[]) || [];
}

async function fetchAllPages(filter: string): Promise<RawListing[]> {
  const all: RawListing[] = [];
  let skip = 0;

  while (true) {
    const page = await fetchListingsPage(filter, skip);
    all.push(...page);
    if (page.length < 200) break;
    skip += 200;
  }

  return all;
}

export async function fetchActiveListings(): Promise<RawListing[]> {
  // Bright MLS requires -BRIGHT suffix on status values and separate queries
  const statuses = ['ACTIVE-BRIGHT', 'ACTIVE UNDER CONTRACT-BRIGHT', 'PENDING-BRIGHT', 'COMING SOON-BRIGHT'];
  const all: RawListing[] = [];

  for (const status of statuses) {
    const filter = `ListOfficeMlsId eq '${OFFICE_MLS_ID}' and MlsStatus eq '${status}'`;
    const listings = await fetchAllPages(filter);
    all.push(...listings);
  }

  return all;
}

export async function fetchClosedListings(): Promise<RawListing[]> {
  const filter = `ListOfficeMlsId eq '${OFFICE_MLS_ID}' and MlsStatus eq 'CLOSED-BRIGHT'`;
  // For closed, use orderby to get most recent first
  const all: RawListing[] = [];
  let skip = 0;

  while (true) {
    const url = `${API_BASE}/BrightProperties?$filter=${filter}&$select=${SELECT_FIELDS}&$top=200&$skip=${skip}&$orderby=CloseDate desc`;
    const data = await mlsFetch(url);
    const page = (data.value as RawListing[]) || [];
    all.push(...page);
    if (page.length < 200) break;
    skip += 200;
  }

  return all;
}

export async function fetchDeltaListings(since: string): Promise<RawListing[]> {
  // Ensure timestamp is ISO 8601 for OData
  const isoSince = new Date(since).toISOString();
  const filter = `ListOfficeMlsId eq '${OFFICE_MLS_ID}' and ModificationTimestamp gt ${isoSince}`;
  return fetchAllPages(filter);
}

export async function fetchListingByKey(listingKey: string): Promise<RawListing | null> {
  const filter = `ListingKey eq '${listingKey}'`;
  const url = `${API_BASE}/BrightProperties?$filter=${filter}&$select=${SELECT_FIELDS}`;
  const data = await mlsFetch(url);
  const items = (data.value as RawListing[]) || [];
  return items[0] ?? null;
}

// --- Fetching Photos ---

export async function fetchPhotosForListings(listingKeys: string[]): Promise<RawPhoto[]> {
  if (listingKeys.length === 0) return [];

  const all: RawPhoto[] = [];

  // Batch keys in groups of 10 to avoid URL length issues
  for (let i = 0; i < listingKeys.length; i += 10) {
    const batch = listingKeys.slice(i, i + 10);
    const filter = batch.map((k) => `ResourceRecordKey eq ${k}`).join(' or ');
    let skip = 0;

    while (true) {
      const url = `${API_BASE}/BrightMedia?$filter=${filter}&$select=${MEDIA_SELECT_FIELDS}&$top=200&$skip=${skip}`;
      const data = await mlsFetch(url);
      const page = (data.value as RawPhoto[]) || [];
      all.push(...page);
      if (page.length < 200) break;
      skip += 200;
    }
  }

  return all;
}

// --- Status Normalization ---

export function normalizeStatus(raw: string): string {
  // Strip -BRIGHT suffix
  let status = raw.replace(/-BRIGHT$/i, '').trim();
  // Normalize casing
  const map: Record<string, string> = {
    'active': 'Active',
    'pending': 'Pending',
    'active under contract': 'Active Under Contract',
    'closed': 'Closed',
    'withdrawn': 'Withdrawn',
    'expired': 'Expired',
    'canceled': 'Canceled',
    'coming soon': 'Coming Soon',
  };
  return map[status.toLowerCase()] || status;
}
