import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface SubCategory {
  label: string;
  items: string[];
}

interface NavItem {
  title: string;
  url: string;
  highlight?: boolean;
  columns?: SubCategory[];
}

function getNavItems(t: ReturnType<typeof useLanguage>["t"]): NavItem[] {
  return [
    {
      title: t.nav.hombre,
      url: "/hombre",
      columns: [
        { label: t.nav.ropaSuperior, items: t.nav.subHombreRopa },
        { label: t.nav.ropaInferior, items: t.nav.subHombreInferior },
        { label: t.nav.calzado, items: t.nav.subHombreCalzado },
      ],
    },
    {
      title: t.nav.mujer,
      url: "/mujer",
      columns: [
        { label: t.nav.ropaSuperior, items: t.nav.subMujerRopa },
        { label: t.nav.ropaInferior, items: t.nav.subMujerInferior },
        { label: t.nav.calzado, items: t.nav.subMujerCalzado },
      ],
    },
    {
      title: t.nav.ninos,
      url: "/ninos",
      columns: [
        { label: t.nav.ropaSuperior, items: t.nav.subNinosRopa },
        { label: t.nav.calzado, items: t.nav.subNinosCalzado },
      ],
    },
    {
      title: t.nav.accesorios,
      url: "/accesorios",
      columns: [
        { label: t.nav.cabeza, items: t.nav.subAccCabeza },
        { label: t.nav.equipaje, items: t.nav.subAccEquipaje },
        { label: t.nav.otros, items: t.nav.subAccOtros },
      ],
    },
    {
      title: t.nav.nuevos,
      url: "/nuevos",
    },
    {
      title: t.nav.ofertas,
      url: "/ofertas",
      highlight: true,
    },
  ];
}

export default function VintageNavbar() {
  const { t } = useLanguage();
  const navItems = useMemo(() => getNavItems(t), [t]);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const openDropdown = (index: number) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(index);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [t]);

  const activeItem = activeDropdown !== null ? navItems[activeDropdown] : null;

  return (
    <div ref={navRef} className="vn">
      {/* Desktop */}
      <div className="vn__bar">
        <div className="vn__inner">
          <a href="/" className="vn__logo">
            AVNYC
          </a>

          <nav className="vn__nav" onMouseLeave={closeDropdown}>
            {navItems.map((item, i) => (
              <button
                key={i}
                className={`vn__item ${activeDropdown === i ? "is-active" : ""} ${item.highlight ? "vn__item--highlight" : ""}`}
                onMouseEnter={() => item.columns && openDropdown(i)}
                onClick={() =>
                  item.columns && (activeDropdown === i ? setActiveDropdown(null) : openDropdown(i))
                }
              >
                {item.title}
                {item.columns && (
                  <svg
                    className={`vn__chevron ${activeDropdown === i ? "is-open" : ""}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          <div className="vn__actions">
            <button className="vn__icon" aria-label="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="vn__icon vn__cart" aria-label="Cart">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="vn__badge">0</span>
            </button>
            <a href="/login" className="vn__auth-btn">{t.loginBtn}</a>
            <a href="/signup" className="vn__auth-btn vn__auth-btn--primary">{t.signupBtn}</a>
            <button
              className="vn__icon vn__menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop mega dropdown */}
      {activeItem?.columns && (
        <div
          className="vn__mega"
          onMouseEnter={() => activeDropdown !== null && openDropdown(activeDropdown)}
          onMouseLeave={closeDropdown}
        >
          <div className="vn__mega-inner">
            <div className="vn__mega-header">
              <h2 className="vn__mega-title">{activeItem.title}</h2>
              <a href={activeItem.url} className="vn__mega-viewall">
                {t.nav.verTodo} <span className="vn__mega-arrow">→</span>
              </a>
            </div>
            <div className="vn__mega-divider" />
            <div className="vn__mega-columns">
              {activeItem.columns.map((col) => (
                <div key={col.label} className="vn__mega-col">
                  <h3 className="vn__mega-label">{col.label}</h3>
                  <ul className="vn__mega-list">
                    {col.items.map((sub) => (
                      <li key={sub}>
                        <a
                          href={`${activeItem.url}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          className="vn__mega-link"
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile */}
      {mobileOpen && <div className="vn__overlay" onClick={() => setMobileOpen(false)} />}
      <div className={`vn__mobile ${mobileOpen ? "is-open" : ""}`}>
        <div className="vn__mobile-header">
          <span className="vn__logo">AVNYC</span>
          <button className="vn__icon" onClick={() => setMobileOpen(false)} aria-label="Close">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="vn__mobile-nav">
          {navItems.map((item, i) => (
            <div key={i} className="vn__mobile-group">
              <button
                className={`vn__mobile-item ${item.highlight ? "vn__item--highlight" : ""}`}
                onClick={() =>
                  item.columns
                    ? setMobileExpanded(mobileExpanded === i ? null : i)
                    : (window.location.href = item.url)
                }
              >
                {item.title}
                {item.columns && (
                  <svg
                    className={`vn__chevron ${mobileExpanded === i ? "is-open" : ""}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              {item.columns && mobileExpanded === i && (
                <div className="vn__mobile-sub">
                  {item.columns.map((col) => (
                    <div key={col.label} className="vn__mobile-sub-group">
                      <h4 className="vn__mobile-label">{col.label}</h4>
                      {col.items.map((sub) => (
                        <a
                          key={sub}
                          href={`${item.url}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          className="vn__mobile-link"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
