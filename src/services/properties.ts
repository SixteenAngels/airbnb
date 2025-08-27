import { getSupabaseClient } from '../config/supabase';
import { mockProperties } from '../data/mockProperties';
import { Property } from '../types';

export type FetchPropertiesParams = {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
};

export async function fetchProperties(params: FetchPropertiesParams = {}): Promise<Property[]> {
  const { query, minPrice, maxPrice, minBedrooms } = params;
  const supabase = getSupabaseClient();

  // Fallback to mock data if no Supabase env vars are provided
  if (!supabase) {
    return filterProperties(mockProperties, query);
  }

  // Example Supabase query — assumes a 'properties' table roughly matching Property
  let supaQuery = supabase.from('properties').select('id,title,price,city,bedrooms,bathrooms,sqft').limit(50);
  if (typeof minPrice === 'number') supaQuery = supaQuery.gte('price', minPrice);
  if (typeof maxPrice === 'number') supaQuery = supaQuery.lte('price', maxPrice);
  if (typeof minBedrooms === 'number') supaQuery = supaQuery.gte('bedrooms', minBedrooms);

  const { data, error } = await supaQuery;
  if (error) {
    // In MVP, fall back to mocks on error
    return filterProperties(mockProperties, query);
  }

  const records: Property[] = (data ?? []).map((row: any) => ({
    id: String(row.id),
    title: String(row.title),
    price: Number(row.price) || 0,
    city: row.city ?? undefined,
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    sqft: row.sqft ?? undefined,
  }));

  return filterProperties(records, query, { minPrice, maxPrice, minBedrooms });
}

function filterProperties(
  list: Property[],
  query?: string,
  filters?: { minPrice?: number; maxPrice?: number; minBedrooms?: number }
): Property[] {
  let result = list.slice();
  if (filters) {
    const { minPrice, maxPrice, minBedrooms } = filters;
    if (typeof minPrice === 'number') {
      result = result.filter((p) => (p.price ?? 0) >= minPrice);
    }
    if (typeof maxPrice === 'number') {
      result = result.filter((p) => (p.price ?? 0) <= maxPrice);
    }
    if (typeof minBedrooms === 'number') {
      result = result.filter((p) => (p.bedrooms ?? 0) >= minBedrooms);
    }
  }
  if (!query) return result;
  const q = query.trim().toLowerCase();
  if (q.length === 0) return result;
  return result.filter((p) =>
    p.title.toLowerCase().includes(q) ||
    (p.city ? p.city.toLowerCase().includes(q) : false)
  );
}

