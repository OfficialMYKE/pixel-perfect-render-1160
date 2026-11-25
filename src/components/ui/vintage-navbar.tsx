import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { getBySub, getSubsForCategory, searchProducts } from "@/lib/products";
import { NAV_SUBS, slugify, type CatalogLang, type NavLabelKey } from "@/lib/catalog";

interface SubLink {
  label: string;
  slug: string;
}

interface SubCategory {
  label: string;
  items: readonly SubLink[];
}

interface NavItem {
  title: string;
  url: string;
  highlight?: boolean;
  columns?: SubCategory[];
}

type NavTranslations = ReturnType<typeof useLanguage>["t"];

function navLabel(t: NavTranslations, key: NavLabelKey): string {
  return t.nav[key];
}

function getNavItems(t: NavTranslations, lang: CatalogLang): NavItem[] {
  const columnsFor = (category: string, withMarcas: boolean): SubCategory[] => {
    const activeSubs = new Set(getSubsForCategory(category));
    const columns: SubCategory[] = (NAV_SUBS[category] ?? [])
      .map((group) => ({
        label: navLabel(t, group.key),
        items: group.items
          .filter((item) => activeSubs.has(item.slug))
          .map((item) => ({ label: item[lang], slug: item.slug })),
      }))
      .filter((group) => group.items.length > 0);
    if (withMarcas) {
      const brands = t.nav.subMarcas
        .map((brand) => ({ label: brand, slug: slugify(brand) }))
        .filter((brand) => getBySub(category, brand.slug).length > 0);
      if (brands.length > 0) columns.push({ label: navLabel(t, "marcas"), items: brands });
    }
    return columns;
  };

  return [
    {
      title: t.nav.hombre,
      url: "/shop/hombre",
      columns: columnsFor("hombre", true),
    },
    {
      title: t.nav.mujer,
      url: "/shop/mujer",
      columns: columnsFor("mujer", true),
    },
    {
      title: t.nav.ninos,
      url: "/shop/ninos",
      columns: columnsFor("ninos", false),
    },
    {
      title: t.nav.accesorios,
      url: "/shop/accesorios",
      columns: columnsFor("accesorios", false),
    },
    {
      title: t.nav.nuevos,
      url: "/shop/nuevos",
    },
    {
      title: t.nav.ofertas,
      url: "/shop/ofertas",
      highlight: true,
    },
  ];
}

export default function VintageNavbar() {
  const { t, lang } = useLanguage();
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = useMemo(() => getNavItems(t, lang), [t, lang]);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const results = useMemo(() => searchProducts(query), [query]);
  const pathname = location.pathname;

  const isItemActive = (item: NavItem) => {
    if (item.url === "/shop" && pathname === "/shop") return true;
    if (item.url !== "/shop" && pathname.startsWith(item.url)) return true;
    return false;
  };

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
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setActiveDropdown(null);
      setSearchOpen(false);
      setMobileOpen(false);
      setMobileExpanded(null);
      setQuery("");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
    setSearchOpen(false);
    setQuery("");
  }, [t]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const goSearch = (slug: string) => {
    setSearchOpen(false);
    setQuery("");
    navigate({ to: "/product/$slug", params: { slug } });
  };

  const activeItem = activeDropdown !== null ? navItems[activeDropdown] : null;

  return (
    <div ref={navRef} className="vn">
      {/* Desktop */}
      <div className="vn__bar">
        <div className="vn__inner">
          <Link to="/" className="vn__logo">
            AVNYC
          </Link>

          <nav className="vn__nav" onMouseLeave={closeDropdown} aria-label="Main">
            {navItems.map((item, i) =>
              item.columns ? (
                <button
                  key={i}
                  className={`vn__item ${activeDropdown === i || isItemActive(item) ? "is-active" : ""} ${item.highlight ? "vn__item--highlight" : ""}`}
                  onMouseEnter={() => openDropdown(i)}
                  onClick={() => (activeDropdown === i ? setActiveDropdown(null) : openDropdown(i))}
                  aria-expanded={activeDropdown === i}
                  aria-haspopup="true"
                >
                  {item.title}
                  <svg
                    className={`vn__chevron ${activeDropdown === i ? "is-open" : ""}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <Link
                  key={i}
                  to={item.url}
                  className={`vn__item ${isItemActive(item) ? "is-active" : ""} ${item.highlight ? "vn__item--highlight" : ""}`}
                  aria-current={isItemActive(item) ? "page" : undefined}
                >
                  {item.title}
                </Link>
              ),
            )}
          </nav>

          <div className="vn__actions">
            <button
              className="vn__icon"
              aria-label={lang === "es" ? "Buscar" : "Search"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link
              to="/cart"
              className="vn__icon vn__cart"
              aria-label={lang === "es" ? "Carrito" : "Cart"}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && <span className="vn__badge">{count}</span>}
            </Link>
            <Link to="/login" className="vn__auth-btn">
              {t.loginBtn}
            </Link>
            <Link to="/signup" className="vn__auth-btn vn__auth-btn--primary">
              {t.signupBtn}
            </Link>
            <button
              className="vn__icon vn__menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label={lang === "es" ? "Menú" : "Menu"}
              aria-expanded={mobileOpen}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Search panel */}
      {searchOpen && (
        <div className="vn__search" ref={searchRef} role="search">
          <div className="vn__search-inner">
            <Search size={16} strokeWidth={1.5} aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === "es" ? "Buscar en el archivo…" : "Search the archive…"}
              aria-label={lang === "es" ? "Buscar productos" : "Search products"}
              className="vn__search-input"
            />
            <button
              className="vn__icon"
              onClick={() => setSearchOpen(false)}
              aria-label={lang === "es" ? "Cerrar búsqueda" : "Close search"}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
          {query.trim() !== "" && (
            <div className="vn__search-results">
              {results.length === 0 ? (
                <p className="vn__search-empty">
                  {lang === "es" ? "Sin resultados para" : "No results for"} “{query}”
                </p>
              ) : (
                <ul>
                  {results.slice(0, 6).map((p) => (
                    <li key={p.slug}>
                      <button className="vn__search-item" onClick={() => goSearch(p.slug)}>
                        <img src={p.images[0]} alt="" width={40} height={53} />
                        <span>
                          <strong>{p.name[lang]}</strong>
                          <small>
                            {p.brand} · ${p.price}
                          </small>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {results.length > 6 && (
                <Link
                  to="/shop"
                  className="vn__search-all"
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                  }}
                >
                  {lang === "es" ? `Ver todos (${results.length})` : `View all (${results.length})`}
                </Link>
              )}
            </div>
          )}
        </div>
      )}

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
              <Link to={activeItem.url} className="vn__mega-viewall">
                {t.nav.verTodo} <span className="vn__mega-arrow">→</span>
              </Link>
            </div>
            <div className="vn__mega-divider" />
            <div className="vn__mega-columns">
              {activeItem.columns.map((col) => (
                <div key={col.label} className="vn__mega-col">
                  <h3 className="vn__mega-label">{col.label}</h3>
                  <ul className="vn__mega-list">
                    {col.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to="/shop/$category/$sub"
                          params={{
                            category: activeItem.url.replace("/shop/", ""),
                            sub: item.slug,
                          }}
                          className="vn__mega-link"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {col.label === t.nav.marcas && (
                    <Link to="/brands" className="vn__mega-seeall">
                      {t.nav.verMarcas}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile */}
      {mobileOpen && <div className="vn__overlay" onClick={closeMobile} />}
      <div
        className={`vn__mobile ${mobileOpen ? "is-open" : ""}`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div className="vn__mobile-header">
          <span className="vn__logo">AVNYC</span>
          <button
            className="vn__icon"
            onClick={closeMobile}
            aria-label={lang === "es" ? "Cerrar" : "Close"}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="vn__mobile-nav" aria-label={lang === "es" ? "Menú principal" : "Main menu"}>
          {navItems.map((item, i) => (
            <div key={i} className="vn__mobile-group">
              {item.columns ? (
                <button
                  className={`vn__mobile-item ${item.highlight ? "vn__item--highlight" : ""}`}
                  onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}
                  aria-expanded={mobileExpanded === i}
                >
                  {item.title}
                  <svg
                    className={`vn__chevron ${mobileExpanded === i ? "is-open" : ""}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <Link
                  to={item.url}
                  className={`vn__mobile-item ${item.highlight ? "vn__item--highlight" : ""}`}
                  onClick={closeMobile}
                >
                  {item.title}
                </Link>
              )}
              {item.columns && mobileExpanded === i && (
                <div className="vn__mobile-sub">
                  <div className="vn__mobile-sub-group">
                    <Link
                      to={item.url}
                      className="vn__mobile-link vn__mobile-link--all"
                      onClick={closeMobile}
                    >
                      {t.nav.verTodo} →
                    </Link>
                  </div>
                  {item.columns.map((col) => (
                    <div key={col.label} className="vn__mobile-sub-group">
                      <h4 className="vn__mobile-label">{col.label}</h4>
                      {col.items.map((link) => (
                        <Link
                          key={link.slug}
                          to="/shop/$category/$sub"
                          params={{
                            category: item.url.replace("/shop/", ""),
                            sub: link.slug,
                          }}
                          className="vn__mobile-link"
                          onClick={closeMobile}
                        >
                          {link.label}
                        </Link>
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
