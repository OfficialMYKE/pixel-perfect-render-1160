import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Search, X } from "lucide-react";
import SiteChrome from "@/components/ui/site-chrome";
import ProductCard from "@/components/ui/product-card";
import { products, CATEGORIES, type Category } from "@/lib/products";
import { getCategoryLabel } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { useFavorites } from "@/lib/favorites";
import { filterArchive, availableSizes, type ShopSort } from "@/lib/shop-filter";

const DESC = "Search one-of-one vintage streetwear, save favorites and compare prices and available sizes.";

function parsePrice(value: string) {
  if (value.trim() === "") return null;
  const price = Number(value);
  return Number.isFinite(price) ? price : null;
}

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Vintage Streetwear — AVNYC" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Shop Vintage Streetwear — AVNYC" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { lang } = useLanguage();
  const es = lang === "es";
  const { slugs } = useFavorites();
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<ShopSort>("featured");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sizes, setSizes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const sizeOptions = useMemo(() => availableSizes(products), []);
  const visible = useMemo(
    () => filterArchive(products, {
      query,
      category,
      favoritesOnly,
      favorites: slugs,
      sort,
      sizes,
      minPrice: parsePrice(minPrice),
      maxPrice: parsePrice(maxPrice),
    }),
    [query, category, favoritesOnly, slugs, sort, sizes, minPrice, maxPrice],
  );
  const toggleSize = (size: string) =>
    setSizes((current) =>
      current.includes(size) ? current.filter((value) => value !== size) : [...current, size],
    );
  const hasExtraFilters = sizes.length > 0 || minPrice !== "" || maxPrice !== "";
  const reset = () => {
    setQuery("");
    setCategory("all");
    setFavoritesOnly(false);
    setSizes([]);
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <SiteChrome>
      <div className="page">
        <header className="page__head shop-head">
          <p className="page__eyebrow">AVNYC / ARCHIVE</p>
          <h1 className="page__title">{es ? "Todo el archivo" : "The full archive"}</h1>
          <p className="page__sub">{es ? "Piezas únicas seleccionadas a mano. Cuando se van, se van." : "One-of-one pieces, hand-selected. When they're gone, they're gone."}</p>
        </header>

        <div className="shop-tools">
          <label className="shop-search">
            <Search size={18} aria-hidden="true" />
            <span className="visually-hidden">{es ? "Buscar prendas" : "Search garments"}</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={es ? "Buscar chaqueta, Levi's, denim…" : "Search jacket, Levi's, denim…"} />
            {query && <button type="button" onClick={() => setQuery("")} aria-label={es ? "Borrar búsqueda" : "Clear search"}><X size={16} /></button>}
          </label>
          <button type="button" className={`chip shop-fav-toggle ${favoritesOnly ? "is-active" : ""}`} aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly((v) => !v)}>
            <Heart size={14} fill={favoritesOnly ? "currentColor" : "none"} aria-hidden="true" /> {es ? "Favoritos" : "Favorites"} ({slugs.length})
          </button>
          <label className="shop-toolbar__sort">
            <span>{es ? "Ordenar" : "Sort"}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as ShopSort)}>
              <option value="featured">{es ? "Destacados" : "Featured"}</option>
              <option value="price-asc">{es ? "Precio: menor" : "Price: low to high"}</option>
              <option value="price-desc">{es ? "Precio: mayor" : "Price: high to low"}</option>
            </select>
          </label>
        </div>
        <div className="shop-toolbar__filters shop-categories" role="group" aria-label={es ? "Filtrar por categoría" : "Filter by category"}>
          {(["all", ...CATEGORIES] as const).map((c) => (
            <button key={c} className={`chip ${category === c ? "is-active" : ""}`} onClick={() => setCategory(c)} aria-pressed={category === c}>
              {c === "all" ? (es ? "Todo" : "All") : getCategoryLabel(c, lang)}
            </button>
          ))}
        </div>

        <div className="shop-filters">
          <div className="shop-filters__group" role="group" aria-label={es ? "Filtrar por talla" : "Filter by size"}>
            <span className="shop-filters__label">{es ? "Talla" : "Size"}</span>
            <div className="shop-filters__chips">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`chip chip--size ${sizes.includes(size) ? "is-active" : ""}`}
                  aria-pressed={sizes.includes(size)}
                  onClick={() => toggleSize(size)}
                >
                  {size === "One size" ? (es ? "Única" : "One size") : size}
                </button>
              ))}
            </div>
          </div>
          <div className="shop-filters__group">
            <span className="shop-filters__label">{es ? "Precio (USD)" : "Price (USD)"}</span>
            <div className="shop-filters__price">
              <label>
                <span className="visually-hidden">{es ? "Precio mínimo" : "Minimum price"}</span>
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  placeholder={es ? "Mín" : "Min"}
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                />
              </label>
              <span aria-hidden="true">-</span>
              <label>
                <span className="visually-hidden">{es ? "Precio máximo" : "Maximum price"}</span>
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  placeholder={es ? "Máx" : "Max"}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                />
              </label>
            </div>
          </div>
          {hasExtraFilters && (
            <button
              type="button"
              className="shop-filters__clear"
              onClick={() => {
                setSizes([]);
                setMinPrice("");
                setMaxPrice("");
              }}
            >
              {es ? "Limpiar filtros" : "Clear filters"}
            </button>
          )}
        </div>

        <p className="shop-count" aria-live="polite">{visible.length} {visible.length === 1 ? (es ? "pieza" : "piece") : (es ? "piezas" : "pieces")}</p>

        {visible.length === 0 ? (
          <div className="empty-state">
            <p>{favoritesOnly && slugs.length === 0 ? (es ? "Aún no guardaste favoritos. Toca el corazón de una prenda." : "No favorites yet. Tap the heart on any piece.") : (es ? "No encontramos prendas con esos filtros." : "No pieces match those filters.")}</p>
            <button type="button" className="btn btn--outline" onClick={reset}>{es ? "Ver todo" : "View all"}</button>
            <Link to="/" className="shop-home-link">{es ? "Volver al inicio" : "Back home"}</Link>
          </div>
        ) : (
          <div className="product-grid">{visible.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        )}
      </div>
    </SiteChrome>
  );
}
