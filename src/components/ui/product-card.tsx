import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useLanguage } from "@/lib/i18n";
import FavoriteButton from "@/components/ui/favorite-button";

export default function ProductCard({
  product,
  showHoverPreview = false,
}: {
  product: Product;
  showHoverPreview?: boolean;
}) {
  const { lang } = useLanguage();
  const onSale = product.tags.includes("sale");
  const isNew = product.tags.includes("new");
  const hasSecond = Boolean(product.images[1]);

  return (
    <article className={`pcard${showHoverPreview ? " pcard--preview" : ""}`}>
      <Link to="/product/$slug" params={{ slug: product.slug }} className="pcard__link">
        <div className="pcard__media">
          <img
            className="pcard__img pcard__img--primary"
            src={product.images[0]}
            alt={product.name[lang]}
            loading="lazy"
            width={480}
            height={640}
          />
          {hasSecond && (
            <img
              className="pcard__img pcard__img--secondary"
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={480}
              height={640}
            />
          )}
          <div className="pcard__badges">
            {onSale && <span className="pcard__badge pcard__badge--sale">SALE</span>}
            {!onSale && isNew && <span className="pcard__badge pcard__badge--new">NEW</span>}
          </div>
        </div>
        <div className="pcard__info">
          <p className="pcard__brand">{product.brand}</p>
          <h3 className="pcard__name">{product.name[lang]}</h3>
          <div className="pcard__meta">
            <span className="pcard__condition">{product.condition}</span>
            <p className="pcard__price">
              <span>${product.price}</span>
              {product.compareAt && <s>${product.compareAt}</s>}
            </p>
          </div>
          <p className="pcard__sizes">{product.sizes.join(" · ")}</p>
        </div>
      </Link>
      {showHoverPreview && (
        <div
          className="pcard__preview"
          role="dialog"
          aria-label={
            lang === "es"
              ? `Vista rápida: ${product.name[lang]}`
              : `Quick view: ${product.name[lang]}`
          }
        >
          <p className="pcard__preview-brand">{product.brand}</p>
          <h3 className="pcard__preview-name">{product.name[lang]}</h3>
          <p className="pcard__preview-description">{product.description[lang]}</p>
          <p className="pcard__preview-meta">
            {product.condition} <span aria-hidden="true">/</span> {product.sizes.join(" · ")}
          </p>
          <p className="pcard__preview-price">${product.price}</p>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="btn btn--primary pcard__preview-link"
          >
            {lang === "es" ? "Ver prenda" : "View item"}
          </Link>
        </div>
      )}
      <FavoriteButton slug={product.slug} name={product.name[lang]} className="pcard__fav" />
    </article>
  );
}
