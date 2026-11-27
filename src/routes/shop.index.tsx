import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import SiteChrome from "@/components/ui/site-chrome";
import ProductCard from "@/components/ui/product-card";
import { products, CATEGORIES, type Category } from "@/lib/products";
import { getCategoryLabel } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop All — AVNYC" },
      {
        name: "description",
        content: "Browse the full AVNYC archive of one-of-one vintage streetwear.",
      },
    ],
  }),
  component: ShopPage,
});

type Sort = "featured" | "price-asc" | "price-desc";

function ShopPage() {
  const { lang } = useLanguage();
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  const visible = useMemo(() => {
    const base = category === "all" ? products : products.filter((p) => p.category === category);
    const sorted = [...base];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [category, sort]);

  return (
    <SiteChrome>
      <div className="page">
        <header className="page__head">
          <p className="page__eyebrow">AVNYC / ARCHIVE</p>
          <h1 className="page__title">{lang === "es" ? "Todo el archivo" : "The full archive"}</h1>
          <p className="page__sub">
            {lang === "es"
              ? "Piezas únicas seleccionadas a mano. Cuando se van, se van."
              : "One-of-one pieces, hand-selected. When they're gone, they're gone."}
          </p>
        </header>

        <div className="shop-toolbar">
          <div className="shop-toolbar__filters" role="group" aria-label="Filter by category">
            {(["all", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                className={`chip ${category === c ? "is-active" : ""}`}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
              >
                {c === "all" ? (lang === "es" ? "Todo" : "All") : getCategoryLabel(c, lang)}
              </button>
            ))}
          </div>
          <label className="shop-toolbar__sort">
            <span>{lang === "es" ? "Ordenar" : "Sort"}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">{lang === "es" ? "Destacados" : "Featured"}</option>
              <option value="price-asc">
                {lang === "es" ? "Precio: menor" : "Price: low to high"}
              </option>
              <option value="price-desc">
                {lang === "es" ? "Precio: mayor" : "Price: high to low"}
              </option>
            </select>
          </label>
        </div>

        <p className="shop-count" aria-live="polite">
          {visible.length}{" "}
          {visible.length === 1
            ? lang === "es"
              ? "pieza"
              : "piece"
            : lang === "es"
              ? "piezas"
              : "pieces"}
        </p>

        {visible.length === 0 ? (
          <div className="empty-state">
            <p>
              {lang === "es" ? "No hay piezas en esta categoría." : "No pieces in this category."}
            </p>
            <Link to="/shop" className="btn btn--outline">
              {lang === "es" ? "Ver todo" : "View all"}
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {visible.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </SiteChrome>
  );
}
