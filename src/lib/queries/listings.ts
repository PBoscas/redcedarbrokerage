import { sql } from '@/lib/db';

export interface ListingRow {
  listing_key: string;
  listing_id: string;
  status: string;
  list_price: number | null;
  close_price: number | null;
  property_type: string | null;
  property_sub_type: string | null;
  address: string | null;
  street_number: string | null;
  street_name: string | null;
  street_suffix: string | null;
  unit_number: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  county: string | null;
  latitude: number | null;
  longitude: number | null;
  bedrooms: number | null;
  bathrooms_full: number | null;
  bathrooms_half: number | null;
  living_area: number | null;
  lot_size_acres: number | null;
  year_built: number | null;
  list_agent_mls_id: string | null;
  list_agent_name: string | null;
  listing_date: string | null;
  close_date: string | null;
  days_on_market: number | null;
  public_remarks: string | null;
  subdivision: string | null;
  garage_spaces: number | null;
  stories: number | null;
  architectural_style: string | null;
  association_fee: number | null;
  association_fee_freq: string | null;
  original_list_price: number | null;
}

export interface ListingPhotoRow {
  media_key: string;
  listing_key: string;
  media_url: string;
  media_category: string | null;
  display_order: number | null;
}

export async function getActiveListings(): Promise<ListingRow[]> {
  const rows = await sql`
    SELECT * FROM mls_listings
    WHERE status IN ('Active', 'Active Under Contract', 'Coming Soon')
    ORDER BY list_price DESC
  `;
  return rows as ListingRow[];
}

export async function getPendingListings(): Promise<ListingRow[]> {
  const rows = await sql`
    SELECT * FROM mls_listings
    WHERE status IN ('Pending', 'Active Under Contract')
    ORDER BY list_price DESC
  `;
  return rows as ListingRow[];
}

export async function getSoldListings(limit = 50): Promise<ListingRow[]> {
  const rows = await sql`
    SELECT * FROM mls_listings
    WHERE status = 'Closed'
    ORDER BY close_date DESC
    LIMIT ${limit}
  `;
  return rows as ListingRow[];
}

export async function getListingByKey(listingKey: string): Promise<ListingRow | null> {
  const rows = await sql`
    SELECT * FROM mls_listings WHERE listing_key = ${listingKey} LIMIT 1
  `;
  return (rows[0] as ListingRow) ?? null;
}

export async function getListingByMlsId(listingId: string): Promise<ListingRow | null> {
  const rows = await sql`
    SELECT * FROM mls_listings WHERE listing_id = ${listingId} LIMIT 1
  `;
  return (rows[0] as ListingRow) ?? null;
}

export async function getListingPhotos(listingKey: string): Promise<ListingPhotoRow[]> {
  const rows = await sql`
    SELECT * FROM mls_listing_photos
    WHERE listing_key = ${listingKey}
    ORDER BY display_order ASC NULLS LAST
  `;
  return rows as ListingPhotoRow[];
}

export async function getListingPrimaryPhoto(listingKey: string): Promise<string | null> {
  const rows = await sql`
    SELECT media_url FROM mls_listing_photos
    WHERE listing_key = ${listingKey}
      AND media_url LIKE '%.jpg'
    ORDER BY display_order ASC NULLS LAST
    LIMIT 1
  `;
  if (rows[0]?.media_url) return rows[0].media_url as string;

  // Fallback: any image-like URL
  const fallback = await sql`
    SELECT media_url FROM mls_listing_photos
    WHERE listing_key = ${listingKey}
      AND (media_url LIKE '%.jpg' OR media_url LIKE '%.jpeg' OR media_url LIKE '%.png' OR media_url LIKE '%.webp')
    ORDER BY display_order ASC NULLS LAST
    LIMIT 1
  `;
  return (fallback[0]?.media_url as string) ?? null;
}

export async function getFeaturedListings(limit = 3): Promise<(ListingRow & { photo_url: string | null })[]> {
  // Priority: Coming Soon / Active > Pending > Closed
  let rows = await sql`
    SELECT * FROM mls_listings
    WHERE status IN ('Coming Soon', 'Active')
    ORDER BY list_price DESC
    LIMIT ${limit}
  `;

  if (rows.length === 0) {
    rows = await sql`
      SELECT * FROM mls_listings
      WHERE status IN ('Pending', 'Active Under Contract')
      ORDER BY list_price DESC
      LIMIT ${limit}
    `;
  }

  if (rows.length === 0) {
    rows = await sql`
      SELECT * FROM mls_listings
      WHERE status = 'Closed'
      ORDER BY close_date DESC
      LIMIT ${limit}
    `;
  }

  const listings = rows as ListingRow[];

  // Attach primary photo
  const results = await Promise.all(
    listings.map(async (l) => {
      const photoUrl = await getListingPrimaryPhoto(l.listing_key);
      return { ...l, photo_url: photoUrl };
    })
  );

  return results;
}

export async function getListingCounts(): Promise<{ active: number; pending: number; sold: number }> {
  const rows = await sql`
    SELECT
      COUNT(*) FILTER (WHERE status IN ('Active', 'Active Under Contract', 'Coming Soon')) as active,
      COUNT(*) FILTER (WHERE status IN ('Pending', 'Active Under Contract')) as pending,
      COUNT(*) FILTER (WHERE status = 'Closed') as sold
    FROM mls_listings
  `;
  const row = rows[0];
  return {
    active: Number(row.active) || 0,
    pending: Number(row.pending) || 0,
    sold: Number(row.sold) || 0,
  };
}
