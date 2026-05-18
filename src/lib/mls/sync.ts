import { sql } from '@/lib/db';
import {
  fetchActiveListings,
  fetchClosedListings,
  fetchDeltaListings,
  fetchListingByKey,
  fetchPhotosForListings,
  normalizeStatus,
  type RawListing,
  type RawPhoto,
} from './client';

// --- Upsert Helpers ---

function listingToRow(l: RawListing) {
  return {
    listing_key: l.ListingKey,
    listing_id: l.ListingId,
    status: normalizeStatus(l.MlsStatus),
    list_price: l.ListPrice,
    close_price: l.ClosePrice,
    property_type: l.PropertyType,
    property_sub_type: l.PropertySubType,
    address: l.UnparsedAddress,
    street_number: l.StreetNumber,
    street_name: l.StreetName,
    street_suffix: l.StreetSuffix,
    unit_number: l.UnitNumber,
    city: l.City,
    state: l.StateOrProvince,
    zip: l.PostalCode,
    county: l.County,
    latitude: l.Latitude,
    longitude: l.Longitude,
    bedrooms: l.BedroomsTotal,
    bathrooms_full: l.BathroomsFull,
    bathrooms_half: l.BathroomsHalf,
    living_area: l.LivingArea,
    lot_size_acres: l.LotSizeAcres,
    lot_size_sqft: l.LotSizeSquareFeet,
    year_built: l.YearBuilt,
    list_agent_mls_id: l.ListAgentMlsId,
    list_agent_name: l.ListAgentFullName,
    list_office_mls_id: l.ListOfficeMlsId,
    listing_date: l.ListingContractDate,
    close_date: l.CloseDate,
    days_on_market: l.DaysOnMarket,
    public_remarks: l.PublicRemarks,
    subdivision: l.SubdivisionName,
    garage_spaces: l.GarageSpaces,
    stories: l.StoriesTotal,
    architectural_style: l.ArchitecturalStyle,
    association_fee: l.AssociationFee,
    association_fee_freq: l.AssociationFeeFrequency,
    original_list_price: l.OriginalListPrice,
    modification_timestamp: l.ModificationTimestamp,
  };
}

async function upsertListing(l: RawListing): Promise<void> {
  const r = listingToRow(l);
  await sql`
    INSERT INTO mls_listings (
      listing_key, listing_id, status, list_price, close_price,
      property_type, property_sub_type, address,
      street_number, street_name, street_suffix, unit_number,
      city, state, zip, county, latitude, longitude,
      bedrooms, bathrooms_full, bathrooms_half,
      living_area, lot_size_acres, lot_size_sqft, year_built,
      list_agent_mls_id, list_agent_name, list_office_mls_id,
      listing_date, close_date, days_on_market, public_remarks,
      subdivision, garage_spaces, stories, architectural_style,
      association_fee, association_fee_freq, original_list_price,
      modification_timestamp, synced_at
    ) VALUES (
      ${r.listing_key}, ${r.listing_id}, ${r.status}, ${r.list_price}, ${r.close_price},
      ${r.property_type}, ${r.property_sub_type}, ${r.address},
      ${r.street_number}, ${r.street_name}, ${r.street_suffix}, ${r.unit_number},
      ${r.city}, ${r.state}, ${r.zip}, ${r.county}, ${r.latitude}, ${r.longitude},
      ${r.bedrooms}, ${r.bathrooms_full}, ${r.bathrooms_half},
      ${r.living_area}, ${r.lot_size_acres}, ${r.lot_size_sqft}, ${r.year_built},
      ${r.list_agent_mls_id}, ${r.list_agent_name}, ${r.list_office_mls_id},
      ${r.listing_date}, ${r.close_date}, ${r.days_on_market}, ${r.public_remarks},
      ${r.subdivision}, ${r.garage_spaces}, ${r.stories}, ${r.architectural_style},
      ${r.association_fee}, ${r.association_fee_freq}, ${r.original_list_price},
      ${r.modification_timestamp}, now()
    )
    ON CONFLICT (listing_key) DO UPDATE SET
      listing_id = EXCLUDED.listing_id,
      status = EXCLUDED.status,
      list_price = EXCLUDED.list_price,
      close_price = EXCLUDED.close_price,
      property_type = EXCLUDED.property_type,
      property_sub_type = EXCLUDED.property_sub_type,
      address = EXCLUDED.address,
      street_number = EXCLUDED.street_number,
      street_name = EXCLUDED.street_name,
      street_suffix = EXCLUDED.street_suffix,
      unit_number = EXCLUDED.unit_number,
      city = EXCLUDED.city,
      state = EXCLUDED.state,
      zip = EXCLUDED.zip,
      county = EXCLUDED.county,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude,
      bedrooms = EXCLUDED.bedrooms,
      bathrooms_full = EXCLUDED.bathrooms_full,
      bathrooms_half = EXCLUDED.bathrooms_half,
      living_area = EXCLUDED.living_area,
      lot_size_acres = EXCLUDED.lot_size_acres,
      lot_size_sqft = EXCLUDED.lot_size_sqft,
      year_built = EXCLUDED.year_built,
      list_agent_mls_id = EXCLUDED.list_agent_mls_id,
      list_agent_name = EXCLUDED.list_agent_name,
      list_office_mls_id = EXCLUDED.list_office_mls_id,
      listing_date = EXCLUDED.listing_date,
      close_date = EXCLUDED.close_date,
      days_on_market = EXCLUDED.days_on_market,
      public_remarks = EXCLUDED.public_remarks,
      subdivision = EXCLUDED.subdivision,
      garage_spaces = EXCLUDED.garage_spaces,
      stories = EXCLUDED.stories,
      architectural_style = EXCLUDED.architectural_style,
      association_fee = EXCLUDED.association_fee,
      association_fee_freq = EXCLUDED.association_fee_freq,
      original_list_price = EXCLUDED.original_list_price,
      modification_timestamp = EXCLUDED.modification_timestamp,
      synced_at = now()
  `;
}

async function syncPhotosForListings(listingKeys: string[]): Promise<number> {
  if (listingKeys.length === 0) return 0;

  const photos = await fetchPhotosForListings(listingKeys);

  // Delete existing photos for these listings
  for (let i = 0; i < listingKeys.length; i += 50) {
    const batch = listingKeys.slice(i, i + 50);
    await sql`DELETE FROM mls_listing_photos WHERE listing_key = ANY(${batch})`;
  }

  // Insert new photos
  for (const p of photos) {
    if (!p.MediaURL) continue;
    const mediaUrl = p.MediaURL.replace(/^http:\/\//i, 'https://');
    await sql`
      INSERT INTO mls_listing_photos (media_key, listing_key, media_url, media_category, display_order, synced_at)
      VALUES (${p.MediaKey}, ${p.ResourceRecordKey}, ${mediaUrl}, ${p.MediaCategory}, ${p.MediaDisplayOrder}, now())
      ON CONFLICT (media_key) DO UPDATE SET
        media_url = EXCLUDED.media_url,
        media_category = EXCLUDED.media_category,
        display_order = EXCLUDED.display_order,
        synced_at = now()
    `;
  }

  return photos.length;
}

// --- Delisting Detection ---

async function handleDelistings(activeKeys: Set<string>): Promise<number> {
  // Get all listings we think are active/pending in the DB
  const dbActive = await sql`
    SELECT listing_key FROM mls_listings
    WHERE status IN ('Active', 'Active Under Contract', 'Pending')
  `;

  let updated = 0;
  for (const row of dbActive) {
    if (!activeKeys.has(row.listing_key as string)) {
      // Not in API response — re-query individually
      const fresh = await fetchListingByKey(row.listing_key as string);
      if (fresh) {
        await upsertListing(fresh);
      } else {
        // Listing no longer in MLS at all — mark inactive
        await sql`
          UPDATE mls_listings SET status = 'Withdrawn', synced_at = now()
          WHERE listing_key = ${row.listing_key}
        `;
      }
      updated++;
    }
  }
  return updated;
}

// --- Sync State ---

async function getSyncState() {
  const rows = await sql`SELECT * FROM mls_sync_state WHERE id = 1`;
  return rows[0] as {
    last_modification_timestamp: string | null;
    last_sync_at: string | null;
    last_closed_sync_at: string | null;
  };
}

async function updateSyncState(fields: {
  last_modification_timestamp?: string;
  last_sync_at?: string;
  last_closed_sync_at?: string;
}) {
  if (fields.last_modification_timestamp) {
    await sql`UPDATE mls_sync_state SET last_modification_timestamp = ${fields.last_modification_timestamp}, last_sync_at = now() WHERE id = 1`;
  } else if (fields.last_closed_sync_at) {
    await sql`UPDATE mls_sync_state SET last_closed_sync_at = ${fields.last_closed_sync_at} WHERE id = 1`;
  } else {
    await sql`UPDATE mls_sync_state SET last_sync_at = now() WHERE id = 1`;
  }
}

// --- Main Sync Functions ---

export interface SyncResult {
  listingsUpserted: number;
  photosUpserted: number;
  delistingsChecked: number;
  type: 'full' | 'delta' | 'closed';
}

export async function syncActiveListings(): Promise<SyncResult> {
  const state = await getSyncState();

  let listings: RawListing[];
  let syncType: 'full' | 'delta';

  if (state.last_modification_timestamp) {
    // Delta sync
    listings = await fetchDeltaListings(state.last_modification_timestamp);
    syncType = 'delta';
  } else {
    // Full sync
    listings = await fetchActiveListings();
    syncType = 'full';
  }

  // Upsert all listings
  for (const l of listings) {
    await upsertListing(l);
  }

  // Track max modification timestamp
  let maxTimestamp = state.last_modification_timestamp || '';
  for (const l of listings) {
    if (l.ModificationTimestamp && l.ModificationTimestamp > maxTimestamp) {
      maxTimestamp = l.ModificationTimestamp;
    }
  }

  // Sync photos for upserted listings
  const upsertedKeys = listings.map((l) => l.ListingKey);
  const photosCount = await syncPhotosForListings(upsertedKeys);

  // Handle delistings on full sync
  let delistingsChecked = 0;
  if (syncType === 'full') {
    const activeKeys = new Set(listings.map((l) => l.ListingKey));
    delistingsChecked = await handleDelistings(activeKeys);
  }

  // Update sync state
  if (maxTimestamp) {
    await updateSyncState({ last_modification_timestamp: maxTimestamp });
  } else {
    await updateSyncState({});
  }

  return {
    listingsUpserted: listings.length,
    photosUpserted: photosCount,
    delistingsChecked,
    type: syncType,
  };
}

export async function syncClosedListings(): Promise<SyncResult> {
  const listings = await fetchClosedListings();

  for (const l of listings) {
    await upsertListing(l);
  }

  const upsertedKeys = listings.map((l) => l.ListingKey);
  const photosCount = await syncPhotosForListings(upsertedKeys);

  await updateSyncState({ last_closed_sync_at: new Date().toISOString() });

  return {
    listingsUpserted: listings.length,
    photosUpserted: photosCount,
    delistingsChecked: 0,
    type: 'closed',
  };
}

export async function syncAll(): Promise<{ active: SyncResult; closed: SyncResult }> {
  const active = await syncActiveListings();
  const closed = await syncClosedListings();
  return { active, closed };
}
