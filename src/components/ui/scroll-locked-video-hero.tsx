import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import AnnouncementBar from "@/components/ui/announcement-bar";
import VintageNavbar from "@/components/ui/vintage-navbar";
import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/product-card";
import { useLanguage } from "@/lib/i18n";
import { getFeatured } from "@/lib/products";
import streetwearOne from "@/assets/vintage-streetwear-01.jpg";
import streetwearTwo from "@/assets/vintage-streetwear-02.jpg";
import streetwearThree from "@/assets/vintage-streetwear-03.jpg";
import streetwearFour from "@/assets/vintage-streetwear-04.jpg";
import vintageStore from "@/assets/vintage-store.jpg";

export interface MetroHeroProps {
  videoSrc?: string;
  className?: string;
}

const DEFAULT_VIDEO =
  "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4";
const HERO_DISMISSED_STORAGE_KEY = "avnyc-home-hero-dismissed";

const LOOKBOOK = [
  { src: streetwearOne, alt: "Vintage varsity jacket and loose denim on a New York street" },
  { src: streetwearTwo, alt: "Curated vintage racing jackets in a New York store" },
  { src: streetwearThree, alt: "Vintage leather bomber styled on a New York subway platform" },
  { src: streetwearFour, alt: "Archive graphic tees, workwear and faded denim" },
];

const CATEGORY_KEYS = ["hombre", "mujer", "ninos", "accesorios"] as const;

const TRUST_ITEMS = [
  { icon: Truck, key: "shipping" },
  { icon: ShieldCheck, key: "authenticity" },
  { icon: RotateCcw, key: "returns" },
  { icon: Globe, key: "worldwide" },
] as const;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function MetroHero({ videoSrc = DEFAULT_VIDEO, className }: MetroHeroProps) {
  const { t, lang } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textARef = useRef<HTMLDivElement>(null);
  const textBRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [introActive, setIntroActive] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  const featured = getFeatured(5);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const navigation = performance.getEntriesByType("navigation")[0] as
      PerformanceNavigationTiming | undefined;
    if (navigation?.type === "reload") {
      sessionStorage.removeItem(HERO_DISMISSED_STORAGE_KEY);
      window.scrollTo(0, 0);
    } else if (sessionStorage.getItem(HERO_DISMISSED_STORAGE_KEY)) {
      videoRef.current?.pause();
      setHeroVisible(false);
      return;
    }

    let hasBeenVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          hasBeenVisible = true;
          return;
        }
        if (hasBeenVisible) {
          sessionStorage.setItem(HERO_DISMISSED_STORAGE_KEY, "true");
          videoRef.current?.pause();
          setHeroVisible(false);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onLoaded = () => {
      setReady(true);
      if (reducedMotion || heroRef.current?.hidden) return;
      setIntroActive(true);
      video.play().catch(() => {
        setIntroActive(false);
      });
    };
    const onError = () => {
      setReady(false);
    };
    const onEnded = () => {
      const hero = document.querySelector(".vintage-hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < window.innerHeight * 0.5) return;
      }
      const target = document.getElementById("main-content");
      if (!target) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    };
    const update = () => {
      const p =
        Number.isFinite(video.duration) && video.duration > 0
          ? clamp(video.currentTime / video.duration, 0, 1)
          : 0;
      if (textARef.current)
        textARef.current.style.opacity = String(1 - clamp((p - 0.3) / 0.15, 0, 1));
      if (textBRef.current) textBRef.current.style.opacity = String(clamp((p - 0.5) / 0.15, 0, 1));
      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${p})`;
    };
    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("error", onError);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", update);
    if (video.readyState >= 2) onLoaded();
    return () => {
      video.pause();
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("error", onError);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", update);
    };
  }, [videoSrc]);

  const es = lang === "es";

  const trustCopy = {
    shipping: es ? "Envío gratis +$150" : "Free shipping over $150",
    authenticity: es ? "Autenticidad garantizada" : "Authenticated pieces",
    returns: es ? "Devoluciones 14 días" : "14-day returns",
    worldwide: es ? "Envío mundial" : "Worldwide shipping",
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        {es ? "Saltar al contenido" : "Skip to content"}
      </a>

      <section
        ref={heroRef}
        hidden={!heroVisible}
        className={className ? `${className} vintage-hero` : "vintage-hero"}
        aria-label={es ? "Introducción streetwear vintage" : "Vintage streetwear introduction"}
      >
        <img
          src={streetwearOne}
          alt=""
          aria-hidden="true"
          className={`vintage-hero__poster ${ready ? "is-hidden" : ""}`}
        />

        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="metadata"
          className={`vintage-hero__video ${ready ? "is-ready" : ""} ${introActive ? "is-intro-active" : ""}`}
        />
        <div className="vintage-hero__shade" />

        <div ref={textARef} className="vintage-hero__text vintage-hero__text--a">
          <p className="vintage-hero__kicker">{t.heroKicker}</p>
          <h1>{t.heroTitle}</h1>
        </div>

        <div ref={textBRef} className="vintage-hero__text vintage-hero__text--b">
          <span>{t.heroEst}</span>
          <p>{t.heroTagline}</p>
          <span>{t.heroOneOfOne}</span>
        </div>

        <div className="vintage-hero__progress" aria-hidden="true">
          <div ref={progressBarRef} />
        </div>
      </section>

      <header className="site-header">
        <AnnouncementBar />
        <VintageNavbar />
      </header>

      <main id="main-content">
        {/* Lookbook */}
        <section className="vintage-lookbook" aria-labelledby="lookbook-title">
          <div className="vintage-lookbook__copy">
            <p>{t.lookbookEdit}</p>
            <h2 id="lookbook-title">
              {t.lookbookTitle1}
              <br />
              {t.lookbookTitle2}
            </h2>
            <div className="vintage-lookbook__details">
              <p>{t.lookbookDesc}</p>
              <Link to="/shop" className="btn btn--primary vintage-lookbook__cta">
                {t.lookbookCta} <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>

          <div
            id="archive"
            className="vintage-lookbook__rail"
            aria-label={es ? "Colección streetwear vintage" : "Vintage streetwear collection"}
          >
            <div className="vintage-lookbook__track">
              {[...LOOKBOOK, ...LOOKBOOK].map((image, index) => (
                <figure key={`${image.src}-${index}`}>
                  <img
                    src={image.src}
                    alt={index < LOOKBOOK.length ? image.alt : ""}
                    loading="lazy"
                    width={768}
                    height={1024}
                  />
                  <figcaption>
                    {String((index % LOOKBOOK.length) + 1).padStart(2, "0")} / NYC ARCHIVE
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto — brand statement, not product */}
        <section className="manifesto" aria-labelledby="manifesto-title">
          <div className="manifesto__inner">
            <p id="manifesto-title" className="manifesto__text">
              <span>{t.manifesto.line1}</span>
              <span>{t.manifesto.line2}</span>
              <span className="manifesto__accent">{t.manifesto.line3}</span>
            </p>
            <Link to="/about" hash="our-story" className="manifesto__link">
              {t.manifesto.link} <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </section>

        {/* New arrivals */}
        <section className="home-section" aria-labelledby="new-arrivals-title">
          <div className="home-section__head">
            <div>
              <p className="home-section__eyebrow">AVNYC / {es ? "NUEVOS" : "NEW"}</p>
              <h2 id="new-arrivals-title" className="home-section__title">
                {es ? "Nuevos ingresos" : "New arrivals"}
              </h2>
            </div>
            <Link
              to="/shop/$category"
              params={{ category: "nuevos" }}
              className="home-section__link"
            >
              {es ? "Ver todos" : "View all"} <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} showHoverPreview />
            ))}
          </div>
        </section>

        {/* Category tiles */}
        <section className="home-section home-section--tiles" aria-labelledby="categories-title">
          <div className="home-section__head">
            <div>
              <p className="home-section__eyebrow">AVNYC / {es ? "CATEGORÍAS" : "CATEGORIES"}</p>
              <h2 id="categories-title" className="home-section__title">
                {es ? "Explorar" : "Browse"}
              </h2>
            </div>
          </div>
          <nav
            className="category-index"
            aria-label={es ? "Categorías de prendas" : "Garment categories"}
          >
            {CATEGORY_KEYS.map((key, index) => (
              <Link key={key} to="/shop/$category" params={{ category: key }}>
                <span className="category-index__number">0{index + 1}</span>
                <span>{t.footer.shop[key]}</span>
                <ArrowUpRight aria-hidden="true" size={24} />
              </Link>
            ))}
          </nav>
        </section>

        {/* Showroom — physical place, not checkout */}
        <section className="showroom" aria-labelledby="showroom-title">
          <div className="showroom__media">
            <img
              src={vintageStore}
              alt={
                es ? "Showroom AVNYC en Nolita, Nueva York" : "AVNYC showroom in Nolita, New York"
              }
              loading="lazy"
              width={1200}
              height={900}
            />
          </div>
          <div className="showroom__copy">
            <h2 id="showroom-title" className="showroom__title">
              {t.showroom.title}
            </h2>
            <p className="showroom__body">{t.showroom.body}</p>
            <dl className="showroom__meta">
              <div>
                <dt className="visually-hidden">{es ? "Ubicación" : "Location"}</dt>
                <dd>{t.showroom.meta1}</dd>
              </div>
              <div>
                <dt className="visually-hidden">{es ? "Horario" : "Hours"}</dt>
                <dd>{t.showroom.meta2}</dd>
              </div>
            </dl>
            <Link to="/about" hash="stores" className="btn btn--outline showroom__cta">
              {t.showroom.cta} <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </section>

        {/* Trust badges */}
        <section className="trust" aria-label={es ? "Nuestros compromisos" : "Our promises"}>
          <ul className="trust__list">
            {TRUST_ITEMS.map(({ icon: Icon, key }) => (
              <li key={key} className="trust__item">
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                <span>{trustCopy[key]}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
