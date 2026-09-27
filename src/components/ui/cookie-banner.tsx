"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const cookieText = {
  en: {
    title: "Cookie Settings",
    desc: "We use cookies and similar technologies to enhance your browsing experience, provide personalized content and recommendations, analyze site traffic, and understand where our audience comes from. Some cookies are essential for the site to function, while others help us improve performance and deliver a more tailored experience. You can choose to accept all cookies, personalize your preferences, or continue without accepting non-essential cookies.",
    acceptAll: "ACCEPT ALL",
    personalize: "PERSONALISE COOKIE CHOICES",
    decline: "Continue without accepting",
    preferencesTitle: "Manage Cookie Preferences",
    essential: "Essential Cookies",
    essentialDesc: "Required for the site to function. Cannot be disabled.",
    analytics: "Analytics & Performance",
    analyticsDesc: "Help us understand how visitors interact with the site.",
    marketing: "Marketing & Advertising",
    marketingDesc: "Used to deliver relevant ads and track campaign performance.",
    savePrefs: "SAVE PREFERENCES",
    back: "← Back",
  },
  es: {
    title: "Configuración de Cookies",
    desc: "Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, ofrecer contenido y recomendaciones personalizadas, analizar el tráfico del sitio y comprender el origen de nuestra audiencia. Algunas cookies son esenciales para el funcionamiento del sitio, mientras que otras nos ayudan a mejorar el rendimiento y ofrecer una experiencia más adaptada a tus preferencias. Puedes elegir aceptar todas las cookies, personalizar tus preferencias o continuar sin aceptar las cookies no esenciales.",
    acceptAll: "ACEPTAR TODO",
    personalize: "PERSONALIZAR",
    decline: "Continuar sin aceptar",
    preferencesTitle: "Gestionar Preferencias de Cookies",
    essential: "Cookies Esenciales",
    essentialDesc: "Necesarias para el funcionamiento del sitio. No se pueden desactivar.",
    analytics: "Análisis y Rendimiento",
    analyticsDesc: "Nos ayudan a entender cómo los visitantes interactúan con el sitio.",
    marketing: "Marketing y Publicidad",
    marketingDesc: "Se usan para entregar anuncios relevantes y medir campañas.",
    savePrefs: "GUARDAR PREFERENCIAS",
    back: "← Volver",
  },
};

export default function CookieBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("avnyc-cookie-consent");
    if (saved) return;

    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
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
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-[#222]" style={{ background: "#0a0a0a" }}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-8">
        {/* Content */}
        <div className="flex-1">
          <h2
            className="mb-2 text-lg font-semibold"
            style={{ color: "#f5f5f5", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
          >
            {showPrefs ? t.preferencesTitle : t.title}
          </h2>

          {showPrefs ? (
            <div className="mt-4 space-y-4">
              {/* Essential */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-[#222] p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: "#f5f5f5" }}>{t.essential}</p>
                  <p className="mt-0.5 text-xs" style={{ color: "#666" }}>{t.essentialDesc}</p>
                </div>
                <div className="flex h-6 w-11 shrink-0 items-center rounded-full" style={{ background: "#333" }}>
                  <div className="ml-auto h-5 w-5 rounded-full" style={{ background: "#555", marginRight: "2px" }} />
                </div>
              </div>

              {/* Analytics */}
              <button
                onClick={() => setAnalytics(!analytics)}
                className="flex w-full items-center justify-between gap-4 rounded-lg border p-4 text-left transition-colors"
                style={{ borderColor: analytics ? "#444" : "#222", background: analytics ? "rgba(255,255,255,0.03)" : "transparent" }}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: "#f5f5f5" }}>{t.analytics}</p>
                  <p className="mt-0.5 text-xs" style={{ color: "#666" }}>{t.analyticsDesc}</p>
                </div>
                <div className="flex h-6 w-11 shrink-0 items-center rounded-full transition-colors" style={{ background: analytics ? "#dc2626" : "#333" }}>
                  <div
                    className="h-5 w-5 rounded-full transition-transform"
                    style={{
                      background: "#f5f5f5",
                      transform: analytics ? "translateX(22px)" : "translateX(2px)",
                    }}
                  />
                </div>
              </button>

              {/* Marketing */}
              <button
                onClick={() => setMarketing(!marketing)}
                className="flex w-full items-center justify-between gap-4 rounded-lg border p-4 text-left transition-colors"
                style={{ borderColor: marketing ? "#444" : "#222", background: marketing ? "rgba(255,255,255,0.03)" : "transparent" }}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: "#f5f5f5" }}>{t.marketing}</p>
                  <p className="mt-0.5 text-xs" style={{ color: "#666" }}>{t.marketingDesc}</p>
                </div>
                <div className="flex h-6 w-11 shrink-0 items-center rounded-full transition-colors" style={{ background: marketing ? "#dc2626" : "#333" }}>
                  <div
                    className="h-5 w-5 rounded-full transition-transform"
                    style={{
                      background: "#f5f5f5",
                      transform: marketing ? "translateX(22px)" : "translateX(2px)",
                    }}
                  />
                </div>
              </button>
            </div>
          ) : (
            <p
              className="max-w-[620px] text-sm leading-relaxed"
              style={{ color: "#777", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
            >
              {t.desc}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-start gap-3 md:items-end">
          {showPrefs ? (
            <>
              <button
                onClick={() => setShowPrefs(false)}
                className="mb-1 text-[11px] uppercase tracking-wide transition-colors hover:text-white"
                style={{ color: "#666", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
              >
                {t.back}
              </button>
              <button
                onClick={() => save({ analytics, marketing })}
                className="w-full rounded px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-[#b91c1c] sm:w-auto"
                style={{
                  background: "#dc2626",
                  color: "#f5f5f5",
                  fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
              >
                {t.savePrefs}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={decline}
                className="mb-1 text-[11px] uppercase tracking-wide transition-colors hover:text-white"
                style={{ color: "#666", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
              >
                {t.decline}
              </button>
              <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
                <button
                  onClick={acceptAll}
                  className="w-full rounded px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-[#b91c1c] sm:w-auto"
                  style={{
                    background: "#dc2626",
                    color: "#f5f5f5",
                    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                  }}
                >
                  {t.acceptAll}
                </button>
                <button
                  onClick={() => setShowPrefs(true)}
                  className="w-full rounded border px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-white/10 sm:w-auto"
                  style={{
                    borderColor: "#555",
                    color: "#f5f5f5",
                    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                  }}
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
