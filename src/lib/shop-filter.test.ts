import { describe, test } from "node:test";
import { deepStrictEqual } from "node:assert";
import { filterArchive, availableSizes, brandFamily, brandCounts } from "./shop-filter";
import type { Product } from "./products";

const items: Product[] = [
  { slug: "jacket", name: { en: "Varsity jacket", es: "Chaqueta varsity" }, category: "hombre", sub: "jackets", tags: [], price: 189, sizes: ["S", "M"], condition: "Excellent", brand: "Archive", images: [], description: { en: "", es: "" } },
  { slug: "tee", name: { en: "Graphic tee", es: "Camiseta gráfica" }, category: "mujer", sub: "tees", tags: [], price: 38, sizes: ["XS"], condition: "Good", brand: "Screen Stars", images: [], description: { en: "", es: "" } },
];
const base = { query: "", category: "all", favoritesOnly: false, favorites: [], sort: "featured" as const };
describe("archive search and favorites", () => {
  test("search matches Spanish garment names and ignores spaces and case", () => {
    deepStrictEqual(filterArchive(items, { ...base, query: " CHAQUETA " }).map(p => p.slug), ["jacket"]);
  });
  test("favorites view only returns saved garments", () => {
    deepStrictEqual(filterArchive(items, { ...base, favoritesOnly: true, favorites: ["tee"] }).map(p => p.slug), ["tee"]);
  });
  test("search and category apply together", () => {
    deepStrictEqual(filterArchive(items, { ...base, query: "tee", category: "hombre" }), []);
  });
  test("price sorting preserves the original catalog", () => {
    deepStrictEqual(filterArchive(items, { ...base, sort: "price-asc" }).map(p => p.price), [38, 189]);
    deepStrictEqual(items.map(p => p.price), [189, 38]);
  });
  test("size filter matches any selected size without case sensitivity", () => {
    deepStrictEqual(filterArchive(items, { ...base, sizes: ["m"] }).map(p => p.slug), ["jacket"]);
    deepStrictEqual(filterArchive(items, { ...base, sizes: ["M", "XS"] }).map(p => p.slug), ["jacket", "tee"]);
  });
  test("price range includes both boundaries", () => {
    deepStrictEqual(filterArchive(items, { ...base, minPrice: 38, maxPrice: 100 }).map(p => p.slug), ["tee"]);
    deepStrictEqual(filterArchive(items, { ...base, minPrice: 39 }).map(p => p.slug), ["jacket"]);
  });
  test("available sizes are unique and sorted by garment size", () => {
    deepStrictEqual(availableSizes(items), ["XS", "S", "M"]);
  });
  test("brand filter groups label variants into one family", () => {
    deepStrictEqual(brandFamily("Levi's Archive"), "Levi's");
    deepStrictEqual(brandFamily("Levi's Kids"), "Levi's");
    deepStrictEqual(filterArchive(items, { ...base, brands: ["Screen Stars"] }).map(p => p.slug), ["tee"]);
    deepStrictEqual(brandCounts(items), [{ brand: "Archive", count: 1 }, { brand: "Screen Stars", count: 1 }]);
  });
  test("garment type filter keeps only selected types", () => {
    deepStrictEqual(filterArchive(items, { ...base, types: ["jackets"] }).map(p => p.slug), ["jacket"]);
  });
});
