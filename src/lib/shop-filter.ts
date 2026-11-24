import type { Product } from "./products";

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
}

export function filterArchive(items: Product[], options: ArchiveFilters): Product[] {
  const query = options.query.trim().toLocaleLowerCase();
  const sizes = (options.sizes ?? []).map((size) => size.toLocaleLowerCase());
  const minPrice = options.minPrice ?? null;
  const maxPrice = options.maxPrice ?? null;
  const result = items.filter((product) =>
    (options.category === "all" || product.category === options.category) &&
    (!options.favoritesOnly || options.favorites.includes(product.slug)) &&
    (sizes.length === 0 || product.sizes.some((size) => sizes.includes(size.toLocaleLowerCase()))) &&
    (minPrice === null || product.price >= minPrice) &&
    (maxPrice === null || product.price <= maxPrice) &&
    (!query || [product.name.en, product.name.es, product.brand, product.sub, product.category]
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