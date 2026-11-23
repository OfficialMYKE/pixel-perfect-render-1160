import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import SiteChrome from "@/components/ui/site-chrome";
import { useLanguage } from "@/lib/i18n";
import streetwearOne from "@/assets/vintage-streetwear-01.jpg";
import streetwearTwo from "@/assets/vintage-streetwear-02.jpg";
import streetwearThree from "@/assets/vintage-streetwear-03.jpg";
import archiveDenim from "@/assets/archive-denim.jpg";
import archiveStoreInterior from "@/assets/archive-store-interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AVNYC" },
      {
        name: "description",
        content: "The story behind AVNYC — curated vintage streetwear from New York.",
      },
    ],
  }),
  component: AboutPage,
});

const SECTIONS = [
  { id: "our-story", key: "story" },
  { id: "sustainability", key: "sustainability" },
  { id: "careers", key: "careers" },
  { id: "press", key: "press" },
  { id: "stores", key: "stores" },
] as const;

function AboutPage() {
  const { t, lang } = useLanguage();
  const es = lang === "es";
  const a = t.about;

  const tocLabels: Record<(typeof SECTIONS)[number]["key"], string> = {
    story: a.title,
    sustainability: a.sustainability.label,
    careers: a.careers.label,
    press: a.press.label,
    stores: es ? "Tiendas" : "Store Locator",
  };

  return (
    <SiteChrome>
      {/* Hero — editorial header */}
      <header className="about-hero">
        <div className="about-hero__media" aria-hidden="true">
          <img src={streetwearOne} alt="" width={1600} height={900} fetchPriority="high" />
        </div>
        <div className="about-hero__inner">
          <p className="about-hero__eyebrow">{a.eyebrow}</p>
          <h1 className="about-hero__title">{a.title}</h1>
          <p className="about-hero__sub">{a.sub}</p>
        </div>
      </header>

      {/* Index — anchor chips */}
      <nav className="about-index" aria-label={a.toc}>
        <div className="help-toc">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="chip">
              {tocLabels[s.key]}
            </a>
          ))}
        </div>
      </nav>

      {/* Our story — manifesto statement */}
      <section className="manifesto" id="our-story" aria-labelledby="about-story-title">
        <div className="manifesto__inner">
          <p id="about-story-title" className="manifesto__text">
            <span>{a.story.line1}</span>
            <span>{a.story.line2}</span>
            <span className="manifesto__accent">{a.story.line3}</span>
          </p>
          <p className="manifesto__body">{a.story.body}</p>
        </div>
      </section>

      {/* Process — how the archive is built */}
      <section className="process" id="process" aria-labelledby="about-process-title">
        <div className="process__inner">
          <h2 id="about-process-title" className="process__title">
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

      {/* Sustainability — editorial split */}
      <section className="about-split" id="sustainability" aria-labelledby="about-sust-title">
        <div className="about-split__media">
          <img
            src={archiveDenim}
            alt={es ? "Denim de archivo autenticado" : "Authenticated archive denim"}
            loading="lazy"
            width={1000}
            height={1000}
          />
        </div>
        <div className="about-split__copy">
          <p className="about-split__label">{a.sustainability.label}</p>
          <h2 id="about-sust-title" className="about-split__title">
            {a.sustainability.title}
          </h2>
          <p className="about-split__body">{a.sustainability.body}</p>
          <p className="about-split__body">{a.sustainability.body2}</p>
          <p className="about-split__stat">{a.sustainability.stat}</p>
        </div>
      </section>

      {/* Careers & press — field notes cards */}
      <section className="field-notes" aria-labelledby="about-join-title">
        <div className="field-notes__inner">
          <div className="field-notes__head">
            <h2 id="about-join-title" className="field-notes__title">
              {a.join.title}
            </h2>
          </div>
          <div className="field-notes__grid">
            <article id="careers" className="field-notes__card">
              <div className="field-notes__media">
                <img
                  src={streetwearTwo}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="field-notes__copy">
                <span className="field-notes__num" aria-hidden="true">
                  {a.careers.num}
                </span>
                <p className="field-notes__label">{a.careers.label}</p>
                <p className="field-notes__body">{a.careers.body}</p>
              </div>
            </article>
            <article id="press" className="field-notes__card">
              <div className="field-notes__media">
                <img
                  src={streetwearThree}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="field-notes__copy">
                <span className="field-notes__num" aria-hidden="true">
                  {a.press.num}
                </span>
                <p className="field-notes__label">{a.press.label}</p>
                <p className="field-notes__body">{a.press.body}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Stores — showroom */}
      <section className="showroom" id="stores" aria-labelledby="about-stores-title">
        <div className="showroom__media">
          <img
            src={archiveStoreInterior}
            alt={es ? "Interior del archivo AVNYC en Nolita" : "AVNYC archive interior in Nolita"}
            loading="lazy"
            width={1200}
            height={900}
          />
        </div>
        <div className="showroom__copy">
          <h2 id="about-stores-title" className="showroom__title">
            {t.showroom.title}
          </h2>
          <p className="showroom__body">{t.showroom.body}</p>
          <p className="showroom__body">{a.stores.popups}</p>
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
          <a
            href="mailto:hello@avnyc.com?subject=Showroom%20visit"
            className="btn btn--outline showroom__cta"
          >
            {a.stores.cta} <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </section>

      {/* Archive facts */}
      <div className="archive-facts" aria-label={es ? "Datos del archivo" : "Archive facts"}>
        <ul className="archive-facts__list">
          {t.archiveFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </SiteChrome>
  );
}
