import { useState } from "react";
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
      <div className="footer__newsletter">
        <div className="footer__newsletter-inner">
          <div className="footer__newsletter-text">
            <h3>{t.footer.newsletter.title}</h3>
            <p>{t.footer.newsletter.subtitle}</p>
          </div>
          {subscribed ? (
            <p className="footer__newsletter-thanks">{t.footer.newsletter.thanks}</p>
          ) : (
            <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder={t.footer.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="footer__newsletter-input"
              />
              <button type="submit" className="footer__newsletter-btn">
                {t.footer.newsletter.cta}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              AVNYC
            </a>
            <p className="footer__brand-desc">{t.footer.brand.desc}</p>
            <div className="footer__social">
              <a
                href="https://instagram.com"
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
                href="https://tiktok.com"
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
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="footer__social-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="footer__social-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="footer__col">
            <h4 className="footer__col-title">{t.footer.shop.title}</h4>
            <ul className="footer__links">
              <li>
                <a href="/hombre">{t.footer.shop.hombre}</a>
              </li>
              <li>
                <a href="/mujer">{t.footer.shop.mujer}</a>
              </li>
              <li>
                <a href="/ninos">{t.footer.shop.ninos}</a>
              </li>
              <li>
                <a href="/accesorios">{t.footer.shop.accesorios}</a>
              </li>
              <li>
                <a href="/nuevos">{t.footer.shop.nuevos}</a>
              </li>
              <li>
                <a href="/ofertas">{t.footer.shop.ofertas}</a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="footer__col">
            <h4 className="footer__col-title">{t.footer.help.title}</h4>
            <ul className="footer__links">
              <li>
                <a href="#faq">{t.footer.help.faq}</a>
              </li>
              <li>
                <a href="#shipping">{t.footer.help.shipping}</a>
              </li>
              <li>
                <a href="#returns">{t.footer.help.returns}</a>
              </li>
              <li>
                <a href="#size-guide">{t.footer.help.sizeGuide}</a>
              </li>
              <li>
                <a href="#contact">{t.footer.help.contact}</a>
              </li>
              <li>
                <a href="#order-status">{t.footer.help.orderStatus}</a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="footer__col">
            <h4 className="footer__col-title">{t.footer.about.title}</h4>
            <ul className="footer__links">
              <li>
                <a href="#our-story">{t.footer.about.story}</a>
              </li>
              <li>
                <a href="#sustainability">{t.footer.about.sustainability}</a>
              </li>
              <li>
                <a href="#careers">{t.footer.about.careers}</a>
              </li>
              <li>
                <a href="#press">{t.footer.about.press}</a>
              </li>
              <li>
                <a href="#stores">{t.footer.about.stores}</a>
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
              <button onClick={() => openLegal("privacy")} className="footer__legal-btn">{t.footer.bottom.privacy}</button>
              <button onClick={() => openLegal("terms")} className="footer__legal-btn">{t.footer.bottom.terms}</button>
              <button onClick={() => openLegal("cookies")} className="footer__legal-btn">{t.footer.bottom.cookies}</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
