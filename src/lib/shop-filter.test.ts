import { describe, expect, test } from "vitest";
import { filterArchive, availableSizes, brandFamily, brandCounts } from "./shop-filter";
import type { Product } from "./products";

const items: Product[] = [
  {
    slug: "jacket",
    name: { en: "Varsity jacket", es: "Chaqueta varsity" },
    category: "hombre",
    sub: "jackets",
    tags: [],
    price: 189,
    sizes: ["S", "M"],
    condition: "Excellent",
    brand: "Archive",
    images: [],
    description: { en: "", es: "" },
  },
  {
    slug: "tee",
    name: { en: "Graphic tee", es: "Camiseta gráfica" },
    category: "mujer",
    sub: "tees",
    tags: [],
    price: 38,
    sizes: ["XS"],
    condition: "Good",
    brand: "Screen Stars",
    images: [],
    description: { en: "", es: "" },
  },
];
const base = {
  query: "",
  category: "all",
  favoritesOnly: false,
  favorites: [],
  sort: "featured" as const,
};
describe("archive search and favorites", () => {
  test("search matches Spanish garment names and ignores spaces and case", () => {
    expect(filterArchive(items, { ...base, query: " CHAQUETA " }).map((p) => p.slug)).toEqual([
      "jacket",
    ]);
  });
  test("favorites view only returns saved garments", () => {
    expect(
      filterArchive(items, { ...base, favoritesOnly: true, favorites: ["tee"] }).map((p) => p.slug),
    ).toEqual(["tee"]);
  });
  test("search and category apply together", () => {
    expect(filterArchive(items, { ...base, query: "tee", category: "hombre" })).toEqual([]);
  });
  test("price sorting preserves the original catalog", () => {
    expect(filterArchive(items, { ...base, sort: "price-asc" }).map((p) => p.price)).toEqual([
      38, 189,
    ]);
    expect(items.map((p) => p.price)).toEqual([189, 38]);
  });
  test("size filter matches any selected size without case sensitivity", () => {
    expect(filterArchive(items, { ...base, sizes: ["m"] }).map((p) => p.slug)).toEqual(["jacket"]);
    expect(filterArchive(items, { ...base, sizes: ["M", "XS"] }).map((p) => p.slug)).toEqual([
      "jacket",
      "tee",
    ]);
  });
  test("price range includes both boundaries", () => {
    expect(filterArchive(items, { ...base, minPrice: 38, maxPrice: 100 }).map((p) => p.slug)).toEqual(
      ["tee"],
    );
    expect(filterArchive(items, { ...base, minPrice: 39 }).map((p) => p.slug)).toEqual(["jacket"]);
  });
  test("available sizes are unique and sorted by garment size", () => {
    expect(availableSizes(items)).toEqual(["XS", "S", "M"]);
  });
  test("brand filter groups label variants into one family", () => {
    expect(brandFamily("Levi's Archive")).toBe("Levi's");
    expect(brandFamily("Levi's Kids")).toBe("Levi's");
    expect(filterArchive(items, { ...base, brands: ["Screen Stars"] }).map((p) => p.slug)).toEqual([
      "tee",
    ]);
    expect(brandCounts(items)).toEqual([
      { brand: "Archive", count: 1 },
      { brand: "Screen Stars", count: 1 },
    ]);
  });
  test("garment type filter keeps only selected types", () => {
    expect(filterArchive(items, { ...base, types: ["jackets"] }).map((p) => p.slug)).toEqual([
      "jacket",
    ]);
  });
});
