"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const cookieText = {
  en: {
    title: "Cookie Settings",
    desc: "We use cookies to improve your browsing, understand traffic, and keep the archive running. Essential cookies are required; the rest are your call.",
    acceptAll: "ACCEPT ALL",
    personalize: "PERSONALISE",
    decline: "Continue without",
    preferencesTitle: "Manage Cookie Preferences",
    essential: "Essential",
    essentialDesc: "Required for the site to function. Cannot be disabled.",
    analytics: "Analytics",
    analyticsDesc: "Help us understand how visitors use the site.",
    marketing: "Marketing",
    marketingDesc: "Used to deliver relevant ads and track campaigns.",
    savePrefs: "SAVE PREFERENCES",
    back: "← Back",
    policy: "Cookie Policy",
  },
  es: {
    title: "Configuración de Cookies",
    desc: "Usamos cookies para mejorar tu navegación, entender el tráfico y mantener el archivo. Las esenciales son necesarias; el resto es tu decisión.",
    acceptAll: "ACEPTAR TODO",
    personalize: "PERSONALIZAR",
    decline: "Continuar sin",
    preferencesTitle: "Gestionar Preferencias",
    essential: "Esenciales",
    essentialDesc: "Necesarias para el sitio. No se pueden desactivar.",
    analytics: "Análisis",
    analyticsDesc: "Nos ayudan a entender cómo se usa el sitio.",
    marketing: "Marketing",
    marketingDesc: "Para anuncios relevantes y medir campañas.",
    savePrefs: "GUARDAR PREFERENCIAS",
    back: "← Volver",
    policy: "Política de cookies",
  },
};

export default function CookieBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("avnyc-cookie-consent")) return;

    const show = () => setVisible(true);
    const timer = window.setTimeout(show, 1200);
    const onHero = () => window.setTimeout(show, 400);
    window.addEventListener("hero-collapsed", onHero);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hero-collapsed", onHero);
    };
  }, []);

  const save = (prefs: { analytics: boolean; marketing: boolean }) => {
    localStorage.setItem("avnyc-cookie-consent", "true");
    localStorage.setItem("avnyc-cookie-prefs", JSON.stringify(prefs));
    setVisible(false);
    setShowPrefs(false);
  };

  const acceptAll = () => save({ analytics: true, marketing: true });
  const decline = () => save({ analytics: false, marketing: false });

  if (!visible) return null;

  const t = cookieText[lang];

  return (
    <div className="ck" role="region" aria-label={t.title}>
      <div className="ck__inner">
        <div className="ck__content">
          <p className="ck__eyebrow">COOKIES</p>
          <h2 className="ck__title">{showPrefs ? t.preferencesTitle : t.title}</h2>

          {showPrefs ? (
            <div className="ck__prefs">
              <div className="ck__row ck__row--locked">
                <div>
                  <p className="ck__label">{t.essential}</p>
                  <p className="ck__desc">{t.essentialDesc}</p>
                </div>
                <span className="ck__lock" aria-hidden="true">
                  ON
                </span>
              </div>
              <button
                type="button"
                className={`ck__row ${analytics ? "is-on" : ""}`}
                onClick={() => setAnalytics(!analytics)}
                aria-pressed={analytics}
              >
                <div>
                  <p className="ck__label">{t.analytics}</p>
                  <p className="ck__desc">{t.analyticsDesc}</p>
                </div>
                <span className="ck__toggle" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`ck__row ${marketing ? "is-on" : ""}`}
                onClick={() => setMarketing(!marketing)}
                aria-pressed={marketing}
              >
                <div>
                  <p className="ck__label">{t.marketing}</p>
                  <p className="ck__desc">{t.marketingDesc}</p>
                </div>
                <span className="ck__toggle" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <p className="ck__desc ck__desc--long">{t.desc}</p>
          )}
        </div>

        <div className="ck__actions">
          {showPrefs ? (
            <>
              <button type="button" className="ck__link" onClick={() => setShowPrefs(false)}>
                {t.back}
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => save({ analytics, marketing })}
              >
                {t.savePrefs}
              </button>
            </>
          ) : (
            <>
              <button type="button" className="ck__link" onClick={decline}>
                {t.decline}
              </button>
              <div className="ck__btn-row">
                <button type="button" className="btn btn--primary" onClick={acceptAll}>
                  {t.acceptAll}
                </button>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setShowPrefs(true)}
                >
                  {t.personalize}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
