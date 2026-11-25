import { createFileRoute, Link, notFound, Outlet, useRouterState } from "@tanstack/react-router";
import SiteChrome from "@/components/ui/site-chrome";
import ProductCard from "@/components/ui/product-card";
import Recommendations from "@/components/ui/recommendations";
import { getByCategory, getSubsForCategory, isValidCategory } from "@/lib/products";
import { getCategoryLabel, getRecommendations, getSubLabel } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/shop/$category")({
  beforeLoad: ({ params }) => {
    const valid =
      isValidCategory(params.category) ||
      params.category === "nuevos" ||
      params.category === "ofertas";
    if (!valid) {
      throw notFound();
    }
  },
  head: ({ params }) => ({
    meta: [{ title: `${getCategoryLabel(params.category, "en")} — AVNYC` }],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const { lang } = useLanguage();
  const activeRouteId = useRouterState({
    select: (state) => state.matches[state.matches.length - 1]?.routeId,
  });
  const items = getByCategory(category);
  const title = getCategoryLabel(category, lang);
  const subs = getSubsForCategory(category);

  if (activeRouteId === "/shop/$category/$sub") {
    return <Outlet />;
  }

  return (
    <SiteChrome>
      <div className="page">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/shop">{lang === "es" ? "Tienda" : "Shop"}</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{title}</span>
        </nav>

        <header className="page__head">
          <p className="page__eyebrow">AVNYC / {title}</p>
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

        {subs.length > 0 && (
          <div className="chip-row">
            {subs.map((sub) => (
              <Link key={sub} to="/shop/$category/$sub" params={{ category, sub }} className="chip">
                {getSubLabel(category, sub, lang)}
              </Link>
            ))}
          </div>
        )}

        {items.length === 0 ? (
          <div className="empty-state">
            <p>
              {lang === "es"
                ? "No hay piezas en esta categoría todavía."
                : "No pieces in this category yet."}
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
          targets={getRecommendations(category)}
          headingId="category-recs-title"
          title={lang === "es" ? "Sigue explorando" : "Keep exploring"}
        />
      </div>
    </SiteChrome>
  );
}
