import type { Product } from "./products";
import { getSubLabel } from "./catalog";

export type ShopSort = "featured" | "price-asc" | "price-desc";
export interface ArchiveFilters {
  query: string;
  category: string;
  favoritesOnly: boolean;
  favorites: string[];
  sort: ShopSort;
  sizes?: string[];
  minPrice?: number | null;
  maxPrice?: number | null;
  types?: string[];
  brands?: string[];
}

export function filterArchive(items: Product[], options: ArchiveFilters): Product[] {
  const query = options.query.trim().toLocaleLowerCase();
  const sizes = (options.sizes ?? []).map((size) => size.toLocaleLowerCase());
  const minPrice = options.minPrice ?? null;
  const maxPrice = options.maxPrice ?? null;
  const types = options.types ?? [];
  const brands = options.brands ?? [];
  const result = items.filter((product) =>
    (types.length === 0 || types.includes(product.sub)) &&
    (brands.length === 0 || brands.includes(brandFamily(product.brand))) &&
    (options.category === "all" || product.category === options.category) &&
    (!options.favoritesOnly || options.favorites.includes(product.slug)) &&
    (sizes.length === 0 || product.sizes.some((size) => sizes.includes(size.toLocaleLowerCase()))) &&
    (minPrice === null || product.price >= minPrice) &&
    (maxPrice === null || product.price <= maxPrice) &&
    (!query || [product.name.en, product.name.es, product.brand, product.sub, product.category, getSubLabel(product.category, product.sub, "en"), getSubLabel(product.category, product.sub, "es")]
      .join(" ").toLocaleLowerCase().includes(query)));
  if (options.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (options.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  return result;
}

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];

export function availableSizes(items: Product[]): string[] {
  const sizes = [...new Set(items.flatMap((product) => product.sizes))];
  const rank = (size: string) => {
    const index = SIZE_ORDER.indexOf(size.toUpperCase());
    if (index >= 0) return index;
    const numericSize = Number(size);
    return Number.isFinite(numericSize) ? 100 + numericSize : 1000;
  };
  return sizes.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
}
/** Groups label variants ("Levi's Archive", "Levi's Kids") under one brand family. */
export function brandFamily(brand: string): string {
  const cleaned = brand.replace(/\s+(Archive|Kids|Vintage|WIP)$/i, "").trim();
  return cleaned || brand;
}

export function brandCounts(items: Product[]): Array<{ brand: string; count: number }> {
  const counts = new Map<string, number>();
  for (const p of items) counts.set(brandFamily(p.brand), (counts.get(brandFamily(p.brand)) ?? 0) + 1);
  return [...counts].map(([brand, count]) => ({ brand, count })).sort((a, b) => a.brand.localeCompare(b.brand));
}

export function typeCounts(items: Product[]): Array<{ sub: string; count: number }> {
  const counts = new Map<string, number>();
  for (const p of items) counts.set(p.sub, (counts.get(p.sub) ?? 0) + 1);
  return [...counts].map(([sub, count]) => ({ sub, count })).sort((a, b) => b.count - a.count || a.sub.localeCompare(b.sub));
}
