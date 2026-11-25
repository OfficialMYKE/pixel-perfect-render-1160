import { createFileRoute, Link } from "@tanstack/react-router";
import SiteChrome from "@/components/ui/site-chrome";
import { products } from "@/lib/products";
import { brandCounts, brandFamily } from "@/lib/shop-filter";
import { getCategoryLabel } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

const DESC = "Browse every vintage brand in the AVNYC archive, from Levi's and Carhartt to Schott NYC, grouped A–Z.";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Vintage Brands A–Z — AVNYC" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Vintage Brands A–Z — AVNYC" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  const { lang } = useLanguage();
  const es = lang === "es";
  const all = brandCounts(products);
  const letters = [...new Set(all.map((b) => b.brand.charAt(0).toUpperCase()))];
  return (
    <SiteChrome>
      <div className="page">
        <header className="page__head shop-head">
          <p className="page__eyebrow">AVNYC / {es ? "MARCAS" : "BRANDS"}</p>
          <h1 className="page__title">{es ? "Marcas de la A a la Z" : "Brands A to Z"}</h1>
          <p className="page__sub">{es ? `${all.length} marcas en el archivo. Elige una para ver sus piezas.` : `${all.length} brands in the archive. Pick one to see its pieces.`}</p>
        </header>
        <nav className="brands-letters" aria-label={es ? "Saltar a letra" : "Jump to letter"}>
          {letters.map((l) => <a key={l} href={`#brand-${l}`}>{l}</a>)}
        </nav>
        {letters.map((l) => (
          <section key={l} id={`brand-${l}`} className="brands-group">
            <h2>{l}</h2>
            <ul>
              {all.filter((b) => b.brand.charAt(0).toUpperCase() === l).map(({ brand, count }) => {
                const cats = [...new Set(products.filter((p) => brandFamily(p.brand) === brand).map((p) => p.category))];
                return (
                  <li key={brand}>
                    <Link to="/shop" search={{ brand }} className="brands-item">
                      <strong>{brand}</strong>
                      <span>{cats.map((c) => getCategoryLabel(c, lang)).join(" · ")}</span>
                      <em>{count} {count === 1 ? (es ? "pieza" : "piece") : (es ? "piezas" : "pieces")} →</em>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </SiteChrome>
  );
}
