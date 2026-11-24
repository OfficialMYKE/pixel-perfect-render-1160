import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Search, X } from "lucide-react";
import SiteChrome from "@/components/ui/site-chrome";
import ProductCard from "@/components/ui/product-card";
import { products, CATEGORIES, type Category } from "@/lib/products";
import { getCategoryLabel } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { useFavorites } from "@/lib/favorites";
import { filterArchive, type ShopSort } from "@/lib/shop-filter";

const DESC = "Search one-of-one vintage streetwear, save favorites and compare prices and available sizes.";
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
  const visible = useMemo(
    () => filterArchive(products, { query, category, favoritesOnly, favorites: slugs, sort }),
    [query, category, favoritesOnly, slugs, sort],
  );
  const reset = () => { setQuery(""); setCategory("all"); setFavoritesOnly(false); };

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
