import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import LegalPages from "@/components/ui/legal-pages";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const openLegal = (id: string) => {
    document.getElementById(`legal-${id}`)?.click();
  };

  return (
    <>
      <LegalPages />
      <footer className="footer">
        {/* Newsletter */}
        <div className="footer__newsletter" id="newsletter">
          <div className="footer__newsletter-inner">
            <div className="footer__newsletter-text">
              <h3>{t.footer.newsletter.title}</h3>
              <p>{t.footer.newsletter.subtitle}</p>
            </div>
            {subscribed ? (
              <p className="footer__newsletter-thanks" role="status">
                {t.footer.newsletter.thanks}
              </p>
            ) : (
              <div className="footer__newsletter-form-wrap">
                <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder={t.footer.newsletter.placeholder}
                    aria-label={t.footer.newsletter.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="footer__newsletter-input"
                  />
                  <button type="submit" className="footer__newsletter-btn">
                    {t.footer.newsletter.cta}
                  </button>
                </form>
                <p className="footer__newsletter-consent">{t.footer.newsletter.consent}</p>
              </div>
            )}
          </div>
        </div>

        {/* Main footer */}
        <div className="footer__main">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                AVNYC
              </Link>
              <p className="footer__brand-desc">{t.footer.brand.desc}</p>
              <p className="footer__store-line">{t.footer.store.line}</p>
              <div className="footer__social">
                <a
                  href="https://instagram.com/avnyc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="footer__social-link"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@avnyc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="footer__social-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.18z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/avnyc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="footer__social-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Shop */}
            <div className="footer__col">
              <h4 className="footer__col-title">{t.footer.shop.title}</h4>
              <ul className="footer__links">
                <li>
                  <Link to="/shop/$category" params={{ category: "hombre" }}>
                    {t.footer.shop.hombre}
                  </Link>
                </li>
                <li>
                  <Link to="/shop/$category" params={{ category: "mujer" }}>
                    {t.footer.shop.mujer}
                  </Link>
                </li>
                <li>
                  <Link to="/shop/$category" params={{ category: "ninos" }}>
                    {t.footer.shop.ninos}
                  </Link>
                </li>
                <li>
                  <Link to="/shop/$category" params={{ category: "accesorios" }}>
                    {t.footer.shop.accesorios}
                  </Link>
                </li>
                <li>
                  <Link to="/shop/$category" params={{ category: "nuevos" }}>
                    {t.footer.shop.nuevos}
                  </Link>
                </li>
                <li>
                  <Link to="/shop/$category" params={{ category: "ofertas" }}>
                    {t.footer.shop.ofertas}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="footer__col">
              <h4 className="footer__col-title">{t.footer.help.title}</h4>
              <ul className="footer__links">
                <li>
                  <Link to="/help" hash="faq">
                    {t.footer.help.faq}
                  </Link>
                </li>
                <li>
                  <Link to="/help" hash="shipping">
                    {t.footer.help.shipping}
                  </Link>
                </li>
                <li>
                  <Link to="/help" hash="returns">
                    {t.footer.help.returns}
                  </Link>
                </li>
                <li>
                  <Link to="/help" hash="size-guide">
                    {t.footer.help.sizeGuide}
                  </Link>
                </li>
                <li>
                  <Link to="/help" hash="contact">
                    {t.footer.help.contact}
                  </Link>
                </li>
                <li>
                  <Link to="/help" hash="order-status">
                    {t.footer.help.orderStatus}
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div className="footer__col">
              <h4 className="footer__col-title">{t.footer.about.title}</h4>
              <ul className="footer__links">
                <li>
                  <Link to="/about" hash="our-story">
                    {t.footer.about.story}
                  </Link>
                </li>
                <li>
                  <Link to="/about" hash="sustainability">
                    {t.footer.about.sustainability}
                  </Link>
                </li>
                <li>
                  <Link to="/about" hash="careers">
                    {t.footer.about.careers}
                  </Link>
                </li>
                <li>
                  <Link to="/about" hash="press">
                    {t.footer.about.press}
                  </Link>
                </li>
                <li>
                  <Link to="/about" hash="stores">
                    {t.footer.about.stores}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-inner">
            <div className="footer__legal">
              <span>
                &copy; {new Date().getFullYear()} AVNYC. {t.footer.bottom.rights}
              </span>
              <div className="footer__legal-links">
                <button onClick={() => openLegal("privacy")} className="footer__legal-btn">
                  {t.footer.bottom.privacy}
                </button>
                <button onClick={() => openLegal("terms")} className="footer__legal-btn">
                  {t.footer.bottom.terms}
                </button>
                <button onClick={() => openLegal("cookies")} className="footer__legal-btn">
                  {t.footer.bottom.cookies}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
