import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SiteChrome from "@/components/ui/site-chrome";
import ProductCard from "@/components/ui/product-card";
import Recommendations from "@/components/ui/recommendations";
import { getBySub, isValidCategory } from "@/lib/products";
import { getCategoryLabel, getRecommendations, getSubLabel } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/shop/$category/$sub")({
  beforeLoad: ({ params }) => {
    const valid =
      isValidCategory(params.category) ||
      params.category === "nuevos" ||
      params.category === "ofertas";
    if (!valid) throw notFound();
  },
  head: ({ params }) => ({
    meta: [{ title: `${getSubLabel(params.category, params.sub, "en")} — Authentic Vintage Store` }],
  }),
  component: SubCategoryPage,
});

function SubCategoryPage() {
  const { category, sub } = Route.useParams();
  const { lang } = useLanguage();
  const items = getBySub(category, sub);
  const title = getSubLabel(category, sub, lang);
  const categoryLabel = getCategoryLabel(category, lang);
  const recommendations = getRecommendations(sub);

  return (
    <SiteChrome>
      <div className="page">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/shop">{lang === "es" ? "Tienda" : "Shop"}</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/shop/$category" params={{ category }}>
            {categoryLabel}
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{title}</span>
        </nav>

        <header className="page__head">
          <p className="page__eyebrow">{categoryLabel}</p>
          <h1 className="page__title">{title}</h1>
          <p className="page__sub">
            {items.length}{" "}
            {items.length === 1
              ? lang === "es"
                ? "pieza"
                : "piece"
              : lang === "es"
                ? "piezas"
                : "pieces"}
          </p>
        </header>

        {items.length === 0 ? (
          <div className="empty-state">
            <p>
              {lang === "es"
                ? "No hay piezas en esta subcategoría. Explora el archivo completo."
                : "No pieces in this subcategory. Explore the full archive."}
            </p>
            <Link to="/shop" className="btn btn--outline">
              {lang === "es" ? "Ver todo" : "View all"}
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}

        <Recommendations
          targets={recommendations}
          headingId="sub-recs-title"
          title={
            items.length === 0
              ? lang === "es"
                ? "Prueba estas categorías"
                : "Try these categories"
              : undefined
          }
        />
      </div>
    </SiteChrome>
  );
}
