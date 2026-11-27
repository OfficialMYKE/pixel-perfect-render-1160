import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import SiteChrome from "@/components/ui/site-chrome";
import ProductCard from "@/components/ui/product-card";
import { getProduct, getRelated } from "@/lib/products";
import { getCategoryLabel, getSubLabel } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/i18n";
import FavoriteButton from "@/components/ui/favorite-button";

export const Route = createFileRoute("/product/$slug")({
  beforeLoad: ({ params }) => {
    if (!getProduct(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const product = getProduct(params.slug);
    return {
      meta: [
        { title: product ? `${product.name.en} — $${product.price} | AVNYC` : "AVNYC" },
        { name: "description", content: product?.description.en ?? "AVNYC vintage streetwear." },
        { property: "og:title", content: product ? `${product.name.en} — AVNYC` : "AVNYC" },
        {
          property: "og:description",
          content: product
            ? `$${product.price} · ${product.condition} · Sizes ${product.sizes.join(", ")}`
            : "AVNYC vintage streetwear.",
        },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          property: "og:url",
          content: `https://pixel-perfect-render-1160.lovable.app/product/${params.slug}`,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://pixel-perfect-render-1160.lovable.app/product/${params.slug}`,
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { lang } = useLanguage();
  const { add } = useCart();
  const product = getProduct(slug)!;

  const [imageIdx, setImageIdx] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  const related = getRelated(product, 4);
  const needsSize = product.sizes.length > 1;

  const handleAdd = () => {
    if (needsSize && !size) {
      setError(true);
      return;
    }
    add(product.slug, size ?? product.sizes[0] ?? "M");
    setError(false);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <SiteChrome>
      <div className="page">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/shop">{lang === "es" ? "Tienda" : "Shop"}</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/shop/$category" params={{ category: product.category }}>
            {getCategoryLabel(product.category, lang)}
          </Link>
          <span aria-hidden="true"> / </span>
          <Link to="/shop/$category/$sub" params={{ category: product.category, sub: product.sub }}>
            {getSubLabel(product.category, product.sub, lang)}
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{product.name[lang]}</span>
        </nav>

        <div className="pdp">
          <div className="pdp__gallery">
            <div className="pdp__main-img">
              <img
                src={product.images[imageIdx]}
                alt={product.name[lang]}
                width={768}
                height={1024}
              />
              {product.tags.includes("sale") && (
                <span className="pcard__badge pcard__badge--sale">SALE</span>
              )}
              {product.tags.includes("new") && !product.tags.includes("sale") && (
                <span className="pcard__badge pcard__badge--new">NEW</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="pdp__thumbs" role="group" aria-label="Product images">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`pdp__thumb ${imageIdx === i ? "is-active" : ""}`}
                    onClick={() => setImageIdx(i)}
                    aria-label={`Image ${i + 1}`}
                    aria-pressed={imageIdx === i}
                  >
                    <img src={img} alt="" width={96} height={128} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pdp__info">
            <div className="pdp__title-row">
              <div>
                <p className="pdp__brand">{product.brand}</p>
                <h1 className="pdp__name">{product.name[lang]}</h1>
              </div>
              <FavoriteButton slug={product.slug} name={product.name[lang]} />
            </div>
            <p className="pdp__price">
              <span>${product.price}</span>
              {product.compareAt && <s>${product.compareAt}</s>}
            </p>

            <dl className="pdp__meta">
              <div>
                <dt>{lang === "es" ? "Condición" : "Condition"}</dt>
                <dd>{product.condition}</dd>
              </div>
              <div>
                <dt>{lang === "es" ? "Tallas" : "Sizes"}</dt>
                <dd>{product.sizes.join(", ")}</dd>
              </div>
              <div>
                <dt>{lang === "es" ? "Categoría" : "Category"}</dt>
                <dd>{getCategoryLabel(product.category, lang)}</dd>
              </div>
            </dl>

            <p className="pdp__desc">{product.description[lang]}</p>

            <div className="pdp__sizes">
              <p className="pdp__sizes-label" id="size-label">
                {lang === "es" ? "Elige tu talla" : "Choose your size"}
                {needsSize && <span aria-hidden="true"> *</span>}
              </p>
              <div className="pdp__size-list" role="group" aria-labelledby="size-label">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${size === s ? "is-active" : ""}`}
                    onClick={() => {
                      setSize(s);
                      setError(false);
                    }}
                    aria-pressed={size === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && (
                <p className="pdp__error" role="alert">
                  {lang === "es" ? "Selecciona una talla." : "Please select a size."}
                </p>
              )}
            </div>

            <button className="btn btn--primary pdp__add" onClick={handleAdd}>
              {added
                ? lang === "es"
                  ? "Añadido ✓"
                  : "Added ✓"
                : lang === "es"
                  ? "Añadir al carrito"
                  : "Add to cart"}
            </button>

            <ul className="pdp__notes">
              <li>
                {lang === "es"
                  ? "Autenticidad garantizada en cada pieza"
                  : "Every piece authenticated"}
              </li>
              <li>
                {lang === "es"
                  ? "Envío gratis en pedidos mayores a $150"
                  : "Free shipping on orders over $150"}
              </li>
              <li>{lang === "es" ? "Devoluciones dentro de 14 días" : "Returns within 14 days"}</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="related" aria-labelledby="related-title">
            <h2 id="related-title" className="related__title">
              {lang === "es" ? "También te puede gustar" : "You may also like"}
            </h2>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteChrome>
  );
}
