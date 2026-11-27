import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import AnnouncementBar from "@/components/ui/announcement-bar";
import VintageNavbar from "@/components/ui/vintage-navbar";
import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/product-card";
import { useLanguage } from "@/lib/i18n";
import { getFeatured } from "@/lib/products";
import HelixRibbonHero from "@/components/ui/helix-ribbon-hero";
import modelBomber from "@/assets/models/model-bomber.jpg";
import modelVarsity from "@/assets/models/model-varsity.jpg";
import modelWorkwear from "@/assets/models/model-workwear.jpg";
import modelGraphicTee from "@/assets/models/model-graphic-tee.jpg";
import modelHoodie from "@/assets/models/model-hoodie.jpg";
import modelWindbreaker from "@/assets/models/model-windbreaker.jpg";
import streetwearOne from "@/assets/vintage-streetwear-01.jpg";
import streetwearTwo from "@/assets/vintage-streetwear-02.jpg";
import streetwearThree from "@/assets/vintage-streetwear-03.jpg";
import streetwearFour from "@/assets/vintage-streetwear-04.jpg";
import archiveJacket from "@/assets/archive-jacket.jpg";
import archiveStore from "@/assets/archive-store-interior.jpg";
import archiveSweatshirt from "@/assets/archive-sweatshirt.jpg";
import vintageStore from "@/assets/vintage-store.jpg";

export interface MetroHeroProps {
  videoSrc?: string;
  className?: string;
}

const DEFAULT_VIDEO =
  "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4";

const LOOKBOOK = [
  { src: streetwearOne, alt: "Vintage varsity jacket and loose denim on a New York street" },
  { src: streetwearTwo, alt: "Curated vintage racing jackets in a New York store" },
  { src: streetwearThree, alt: "Vintage leather bomber styled on a New York subway platform" },
  { src: streetwearFour, alt: "Archive graphic tees, workwear and faded denim" },
];

const HERO_MODELS = [
  { src: modelVarsity, title: "Varsity — Subway", objectPosition: "center 18%" },
  { src: modelWorkwear, title: "Workwear — Brooklyn" },
  { src: modelGraphicTee, title: "Graphic tee — Taxi", objectPosition: "center 8%" },
  { src: modelHoodie, title: "College hoodie — SoHo", objectPosition: "center 18%" },
  { src: modelWindbreaker, title: "Windbreaker — Manhattan", objectPosition: "center top" },
  { src: modelBomber, title: "Leather bomber — Dusk", objectPosition: "center top" },
];
// Repeat the editorial model shots to fill the helix ribbon.
const HELIX_PROJECTS = [...HERO_MODELS, ...HERO_MODELS];

const CATEGORY_TILES = [
  { key: "hombre", img: archiveJacket },
  { key: "mujer", img: streetwearThree },
  { key: "ninos", img: archiveSweatshirt },
  { key: "accesorios", img: archiveStore },
] as const;

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const textARef = useRef<HTMLDivElement>(null);
  const textBRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Expose the always-visible header height so the hero fills only the space below it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty("--site-header-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const [ready, setReady] = useState(false);
  const [poster, setPoster] = useState<string | null>(null);
  const transitioned = useRef(false);

  const featured = getFeatured(5);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Keep the streetwear photo visible if the video takes too long to load.
    const fallbackTimer = setTimeout(() => {
      setReady(false);
    }, 8000);

    const extractFrame = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 1920;
        canvas.height = video.videoHeight || 1080;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setPoster(canvas.toDataURL("image/jpeg", 0.6));
        }
      } catch {
        // canvas tainted or error — ignore
      }
    };

    const onLoaded = () => {
      clearTimeout(fallbackTimer);
      video.currentTime = 0;
      setReady(true);
      video.play().catch(() => undefined);
      // Capture first frame as fallback after a short delay
      setTimeout(extractFrame, 200);
    };

    const onError = () => {
      clearTimeout(fallbackTimer);
      setReady(false); // keep the streetwear photo visible if the video fails
    };

    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("error", onError);
    if (video.readyState >= 2) onLoaded();

    let frameId = 0;
    let lastA = -1;
    let lastB = -1;

    const update = () => {
      const dur = Number.isFinite(video.duration) ? video.duration : 0;
      const t = video.currentTime;
      const p = dur > 0 ? clamp(t / dur, 0, 1) : 0;

      // Text A: visible 0→35%, fades out 30→45%
      if (textARef.current) {
        const a = Math.round((1 - clamp((p - 0.3) / 0.15, 0, 1)) * 100) / 100;
        if (a !== lastA) {
          lastA = a;
          textARef.current.style.opacity = String(a);
          textARef.current.style.transform = `translateY(${(1 - a) * -16}px)`;
        }
      }

      // Text B: fades in 50→65%, stays
      if (textBRef.current) {
        const b = Math.round(clamp((p - 0.5) / 0.15, 0, 1) * 100) / 100;
        if (b !== lastB) {
          lastB = b;
          textBRef.current.style.opacity = String(b);
          textBRef.current.style.transform = `translateY(${(1 - b) * 14}px)`;
        }
      }

      // Progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${p})`;
      }

      // Auto-transition at 80% — before video pauses
      if (p >= 0.8 && !transitioned.current) {
        transitioned.current = true;
        if (heroRef.current) {
          heroRef.current.style.transition = "opacity 2.4s ease-in-out";
          heroRef.current.style.opacity = "0";
        }
        setTimeout(() => {
          announcementRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 1600);
        setTimeout(() => {
          if (heroRef.current) {
            heroRef.current.style.height = "0";
            heroRef.current.style.minHeight = "0";
            heroRef.current.style.overflow = "hidden";
          }
          window.dispatchEvent(new Event("hero-collapsed"));
        }, 3200);
      }

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    // Scroll listener — pause video and collapse hero on scroll down
    let scrollTriggered = false;
    const onScroll = () => {
      if (scrollTriggered) return;
      if (window.scrollY > 50) {
        scrollTriggered = true;
        video.pause();
        if (heroRef.current) {
          heroRef.current.style.transition = "opacity 0.6s ease-out, height 0.6s ease-out";
          heroRef.current.style.opacity = "0";
          setTimeout(() => {
            if (heroRef.current) {
              heroRef.current.style.height = "0";
              heroRef.current.style.minHeight = "0";
              heroRef.current.style.overflow = "hidden";
            }
            window.dispatchEvent(new Event("hero-collapsed"));
          }, 600);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("error", onError);
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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

      <header ref={headerRef} className="site-header">
        <div ref={announcementRef}>
          <AnnouncementBar />
        </div>
        <VintageNavbar />
      </header>

      <HelixRibbonHero
        showNav={false}
        height="calc(100svh - var(--site-header-h, 0px))"
        {...(className ? { className } : {})}
        greeting="Authentic"
        name="Vintage Store"
        portrait={modelBomber}
        portraitAlt={es ? "Modelo con chaqueta bomber de cuero vintage en Nueva York" : "Model in a vintage leather bomber jacket in New York"}
        projects={HELIX_PROJECTS}
        links={[
          { label: es ? "Tienda" : "Shop", href: "/shop" },
          { label: es ? "Nuevos" : "New", href: "/shop/nuevos" },
          { label: es ? "Ofertas" : "Sale", href: "/shop/ofertas" },
          { label: es ? "Nosotros" : "About", href: "/about" },
        ]}
        cta={{ label: es ? "Comprar ahora" : "Shop now", href: "/shop" }}
        count={es ? "( Hoy está aquí. Mañana, en el armario de otro )" : "( Here today. In someone else's closet tomorrow )"}
        bio={es
          ? "Streetwear vintage auténtico, seleccionado a mano en Nueva York. Cada pieza es única, restaurada y lista para usar."
          : "Authentic vintage streetwear, hand-picked in New York. Every piece is one of one, restored and ready to wear."}
        scrollHint={es ? "Desliza" : "Scroll"}
        background="var(--vintage-ink)"
        foreground="var(--vintage-paper)"
        fontHref={null}
      />

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
              <p className="home-section__eyebrow">{es ? "NUEVOS" : "NEW"}</p>
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
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        {/* Process — how we curate (editorial, no prices) */}
        <section className="process" aria-labelledby="process-title">
          <div className="process__inner">
            <h2 id="process-title" className="process__title">
              {t.process.title}
            </h2>
            <ol className="process__steps">
              {t.process.steps.map((step) => (
                <li key={step.num} className="process__step">
                  <span className="process__num" aria-hidden="true">
                    {step.num}
                  </span>
                  <h3 className="process__step-title">{step.title}</h3>
                  <p className="process__step-body">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Field notes — editorial sourcing strip */}
        <section className="field-notes" aria-labelledby="field-notes-title">
          <div className="field-notes__inner">
            <div className="field-notes__head">
              <h2 id="field-notes-title" className="field-notes__title">
                {t.sourcing.title}
              </h2>
              <Link to="/about" hash="our-story" className="home-section__link">
                {t.sourcing.link} <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </div>
            <div className="field-notes__grid">
              {t.sourcing.notes.map((note) => (
                <article key={note.num} className="field-notes__card">
                  <div className="field-notes__media">
                    <img
                      src={note.img === "brooklyn" ? streetwearTwo : streetwearFour}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className="field-notes__copy">
                    <span className="field-notes__num" aria-hidden="true">
                      {note.num}
                    </span>
                    <p className="field-notes__label">{note.label}</p>
                    <p className="field-notes__body">{note.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Category tiles */}
        <section className="home-section home-section--tiles" aria-labelledby="categories-title">
          <div className="home-section__head">
            <div>
              <p className="home-section__eyebrow">{es ? "CATEGORÍAS" : "CATEGORIES"}</p>
              <h2 id="categories-title" className="home-section__title">
                {es ? "Explorar" : "Browse"}
              </h2>
            </div>
          </div>
          <div className="category-tiles">
            {CATEGORY_TILES.map(({ key, img }) => (
              <Link
                key={key}
                to="/shop/$category"
                params={{ category: key }}
                className="category-tile"
              >
                <img src={img} alt="" loading="lazy" width={600} height={750} />
                <span className="category-tile__label">
                  {t.footer.shop[key]} <ArrowUpRight aria-hidden="true" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Showroom — physical place, not checkout */}
        <section className="showroom" aria-labelledby="showroom-title">
          <div className="showroom__media">
            <img
              src={vintageStore}
              alt={
                es ? "Showroom Authentic Vintage Store en Nolita, Nueva York" : "Authentic Vintage Store showroom in Nolita, New York"
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

        {/* Archive facts — operational mono rule */}
        <div className="archive-facts" aria-label={es ? "Datos del archivo" : "Archive facts"}>
          <ul className="archive-facts__list">
            {t.archiveFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

      </main>

      <Footer />
    </>
  );
}
