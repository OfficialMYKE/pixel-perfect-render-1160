import { createFileRoute, Link } from "@tanstack/react-router";
import SiteChrome from "@/components/ui/site-chrome";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Cart — Authentic Vintage Store" }, { name: "description", content: "Your Authentic Vintage Store cart." }],
  }),
  component: CartPage,
});

function CartPage() {
  const { lang } = useLanguage();
  const { detailedLines, subtotal, setQty, remove, clear, count } = useCart();

  return (
    <SiteChrome>
      <div className="page page--narrow">
        <header className="page__head">
          <p className="page__eyebrow">CART</p>
          <h1 className="page__title">{lang === "es" ? "Tu carrito" : "Your cart"}</h1>
          <p className="page__sub">
            {count}{" "}
            {count === 1
              ? lang === "es"
                ? "artículo"
                : "item"
              : lang === "es"
                ? "artículos"
                : "items"}
          </p>
        </header>

        {detailedLines.length === 0 ? (
          <div className="empty-state">
            <p>{lang === "es" ? "Tu carrito está vacío." : "Your cart is empty."}</p>
            <Link to="/shop" className="btn btn--primary">
              {lang === "es" ? "Explorar la tienda" : "Browse the shop"}
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {detailedLines.map(({ line, product }) => (
                <li key={`${line.slug}-${line.size}`} className="cart-line">
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="cart-line__img"
                  >
                    <img src={product.images[0]} alt={product.name[lang]} width={96} height={128} />
                  </Link>
                  <div className="cart-line__info">
                    <Link
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      className="cart-line__name"
                    >
                      {product.name[lang]}
                    </Link>
                    <p className="cart-line__meta">
                      {product.brand} · {lang === "es" ? "Talla" : "Size"}: {line.size}
                    </p>
                    <p className="cart-line__price">${product.price}</p>
                  </div>
                  <div className="cart-line__actions">
                    <div
                      className="qty"
                      role="group"
                      aria-label={lang === "es" ? "Cantidad" : "Quantity"}
                    >
                      <button
                        onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                        aria-label={lang === "es" ? "Reducir cantidad" : "Decrease quantity"}
                      >
                        −
                      </button>
                      <span aria-live="polite">{line.qty}</span>
                      <button
                        onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                        aria-label={lang === "es" ? "Aumentar cantidad" : "Increase quantity"}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-line__remove"
                      onClick={() => remove(line.slug, line.size)}
                    >
                      {lang === "es" ? "Quitar" : "Remove"}
                    </button>
                  </div>
                  <p className="cart-line__total">${product.price * line.qty}</p>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>{lang === "es" ? "Subtotal" : "Subtotal"}</span>
                <strong>${subtotal}</strong>
              </div>
              <p className="cart-summary__note">
                {subtotal >= 150
                  ? lang === "es"
                    ? "¡Envío gratis aplicado!"
                    : "Free shipping applied!"
                  : lang === "es"
                    ? `Faltan $${150 - subtotal} para envío gratis`
                    : `$${150 - subtotal} away from free shipping`}
              </p>
              <Link to="/signup" className="btn btn--primary btn--block">
                {lang === "es" ? "Finalizar compra" : "Checkout"}
              </Link>
              <p className="cart-summary__hint">
                {lang === "es"
                  ? "Crea tu cuenta para completar tu compra."
                  : "Create an account to complete your purchase."}
              </p>
              <button className="cart-summary__clear" onClick={clear}>
                {lang === "es" ? "Vaciar carrito" : "Clear cart"}
              </button>
            </div>
          </>
        )}
      </div>
    </SiteChrome>
  );
}
