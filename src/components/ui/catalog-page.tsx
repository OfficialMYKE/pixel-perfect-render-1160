"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import vintage01 from "@/assets/vintage-streetwear-01.jpg";
import vintage02 from "@/assets/vintage-streetwear-02.jpg";
import vintage03 from "@/assets/vintage-streetwear-03.jpg";
import vintage04 from "@/assets/vintage-streetwear-04.jpg";
import vintageStore from "@/assets/vintage-store.jpg";

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const products = [
  { id: 1, name: "Chaqueta Bomber Vintage", brand: "Carhartt WIP", price: 189, img: vintage01, badge: "1 OF 1" },
  { id: 2, name: "Hoodie Oversize Washed", brand: "Nike Vintage", price: 95, img: vintage02, badge: "NUEVO" },
  { id: 3, name: "Jean Straight Rinse", brand: "Levi's Archive", price: 128, img: vintage03, badge: null },
  { id: 4, name: "Camiseta Gráfica Retro", brand: "Deadstock", price: 55, img: vintage04, badge: "SOLD OUT" },
  { id: 5, name: "Cargo Pants Utility", brand: "Carhartt WIP", price: 145, img: vintageStore, badge: null },
  { id: 6, name: "Sudadera Capucha Fleece", brand: "Nike Vintage", price: 78, img: vintage01, badge: "NUEVO" },
  { id: 7, name: "Chaqueta Denim Trucker", brand: "Levi's Archive", price: 165, img: vintage02, badge: "1 OF 1" },
  { id: 8, name: "Shorts Deportivos Mesh", brand: "Deadstock", price: 42, img: vintage03, badge: null },
  { id: 9, name: "Parka Vintage Lined", brand: "Carhartt WIP", price: 210, img: vintage04, badge: null },
  { id: 10, name: "Tank Top Ribbed Cotton", brand: "Nike Vintage", price: 35, img: vintageStore, badge: null },
  { id: 11, name: "Pantalón Corduroy", brand: "Deadstock", price: 88, img: vintage01, badge: null },
  { id: 12, name: "Bomber Satin Varsity", brand: "Levi's Archive", price: 195, img: vintage02, badge: "1 OF 1" },
];

const filterSections = [
  {
    id: "size",
    en: { label: "SIZE", options: ["XS", "S", "M", "L", "XL", "XXL"] },
    es: { label: "TALLA", options: ["XS", "S", "M", "L", "XL", "XXL"] },
  },
  {
    id: "brand",
    en: { label: "BRAND", options: ["Nike Vintage", "Carhartt WIP", "Levi's Archive", "Deadstock"] },
    es: { label: "MARCA", options: ["Nike Vintage", "Carhartt WIP", "Levi's Archive", "Deadstock"] },
  },
  {
    id: "condition",
    en: { label: "CONDITION / ERA", options: ["New Old Stock", "Used - Excellent", "Used - Good", "90s", "00s", "2010s"] },
    es: { label: "CONDICIÓN / ÉPOCA", options: ["Nuevo sin usar", "Usado - Excelente", "Usado - Bueno", "Los 90s", "Los 00s", "2010s"] },
  },
  {
    id: "price",
    en: { label: "PRICE", options: ["Under $50", "$50 – $100", "$100 – $200", "$200+"] },
    es: { label: "PRECIO", options: ["Menos de $50", "$50 – $100", "$100 – $200", "$200+"] },
  },
];

const sortOptions = {
  en: ["Most Recent", "Price: Low to High", "Price: High to Low", "Relevance"],
  es: ["Más recientes", "Precio: menor a mayor", "Precio: mayor a menor", "Relevancia"],
};

export default function CatalogPage() {
  const { lang } = useLanguage();
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({ size: true, brand: true, condition: false, price: false });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(0);

  const toggleFilter = (id: string) => {
    setOpenFilters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#f5f5f5", fontFamily: FONT }}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-[11px] tracking-wide" style={{ color: "#666" }}>
          <a href="/" className="hover:opacity-70 transition-opacity">{lang === "es" ? "Inicio" : "Home"}</a>
          <ChevronRight className="size-3" />
          <span>{lang === "es" ? "Hombre" : "Men"}</span>
          <ChevronRight className="size-3" />
          <span style={{ color: "#999" }}>{lang === "es" ? "Estética Y2K" : "Y2K Aesthetic"}</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl" style={{ color: "#f5f5f5" }}>
              {lang === "es" ? "Estética Y2K" : "Y2K Aesthetic"}
            </h1>
            <p className="mt-1 text-sm" style={{ color: "#777" }}>
              {products.length} {lang === "es" ? "Productos" : "Products"}
            </p>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors hover:border-[#555]"
              style={{ borderColor: "#333", color: "#ccc" }}
            >
              <span>{sortOptions[lang][selectedSort]}</span>
              <ChevronDown className={`size-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full z-30 mt-1 w-52 rounded-lg border py-1" style={{ background: "#111", borderColor: "#333" }}>
                {sortOptions[lang].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedSort(i); setSortOpen(false); }}
                    className="block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/5"
                    style={{ color: selectedSort === i ? "#f5f5f5" : "#999" }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-lg lg:hidden"
            style={{ background: "#1a1a1a", color: "#f5f5f5", border: "1px solid #333" }}
          >
            <SlidersHorizontal className="size-4" />
            {lang === "es" ? "Filtros" : "Filters"}
          </button>

          {/* Sidebar overlay (mobile) */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden" style={{ background: "rgba(0,0,0,0.6)" }}>
              <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto p-5" style={{ background: "#0a0a0a" }}>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#f5f5f5" }}>
                    {lang === "es" ? "Filtros" : "Filters"}
                  </h2>
                  <button onClick={() => setMobileFiltersOpen(false)} style={{ color: "#888" }}>
                    <X className="size-5" />
                  </button>
                </div>
                <FilterSections lang={lang} openFilters={openFilters} toggleFilter={toggleFilter} />
              </div>
            </div>
          )}

          {/* Sidebar (desktop) */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <FilterSections lang={lang} openFilters={openFilters} toggleFilter={toggleFilter} />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} lang={lang} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Filter Sections ───────────────────────────────── */

function FilterSections({ lang, openFilters, toggleFilter }: { lang: string; openFilters: Record<string, boolean>; toggleFilter: (id: string) => void }) {
  return (
    <div className="space-y-1">
      {filterSections.map((section) => {
        const s = section[lang as "en" | "es"];
        const isOpen = openFilters[section.id];
        return (
          <div key={section.id} className="border-b" style={{ borderColor: "#222" }}>
            <button
              onClick={() => toggleFilter(section.id)}
              className="flex w-full items-center justify-between py-3 text-[11px] font-semibold uppercase tracking-widest transition-colors hover:opacity-80"
              style={{ color: "#ccc" }}
            >
              {s.label}
              <ChevronDown className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="space-y-2 pb-3">
                {s.options.map((opt) => (
                  <label key={opt} className="flex cursor-pointer items-center gap-2.5 text-sm" style={{ color: "#999" }}>
                    <span className="flex size-3.5 shrink-0 items-center justify-center rounded border" style={{ borderColor: "#555" }}>
                      <input type="checkbox" className="sr-only peer" />
                      <svg viewBox="0 0 12 12" className="hidden size-2.5 text-white peer-checked:block" fill="none">
                        <path d="M3 6.2 5 8.1 9 3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Product Card ──────────────────────────────────── */

function ProductCard({ product, lang }: { product: typeof products[number]; lang: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/producto/${product.id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative mb-3 overflow-hidden rounded-lg" style={{ aspectRatio: "3/4" }}>
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              background: product.badge === "SOLD OUT" ? "rgba(220,38,38,0.9)" : "rgba(10,10,10,0.85)",
              color: "#f5f5f5",
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className="truncate text-sm font-medium" style={{ color: "#f5f5f5" }}>
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs" style={{ color: "#777" }}>
          {product.brand}
        </p>
        <p className="mt-1 text-sm font-bold" style={{ color: "#f5f5f5" }}>
          ${product.price}
        </p>
      </div>
    </a>
  );
}
