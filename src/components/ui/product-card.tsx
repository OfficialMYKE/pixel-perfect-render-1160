import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useLanguage } from "@/lib/i18n";

export default function ProductCard({ product }: { product: Product }) {
  const { lang } = useLanguage();
  const onSale = product.tags.includes("sale");
  const isNew = product.tags.includes("new");
  const hasSecond = Boolean(product.images[1]);

  return (
    <Link to="/product/$slug" params={{ slug: product.slug }} className="pcard">
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
          <span className="pcard__badge pcard__badge--one">1 OF 1</span>
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
      </div>
    </Link>
  );
}
