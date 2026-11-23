import type { Product } from "./products";

export type ShopSort = "featured" | "price-asc" | "price-desc";
export function filterArchive(items: Product[], options: {
  query: string; category: string; favoritesOnly: boolean; favorites: string[]; sort: ShopSort;
}): Product[] {
  const query = options.query.trim().toLocaleLowerCase();
  const result = items.filter((product) =>
    (options.category === "all" || product.category === options.category) &&
    (!options.favoritesOnly || options.favorites.includes(product.slug)) &&
    (!query || [product.name.en, product.name.es, product.brand, product.sub, product.category]
      .join(" ").toLocaleLowerCase().includes(query)));
  if (options.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (options.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  return result;
}