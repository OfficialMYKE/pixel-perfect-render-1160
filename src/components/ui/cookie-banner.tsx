"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const cookieText = {
  en: {
    title: "Cookie Settings",
    desc: "We use cookies and similar technologies to enhance your browsing experience, provide personalized content and recommendations, analyze site traffic, and understand where our audience comes from. Some cookies are essential for the site to function, while others help us improve performance and deliver a more tailored experience. You can choose to accept all cookies, personalize your preferences, or continue without accepting non-essential cookies.",
    acceptAll: "ACCEPT ALL",
    personalize: "PERSONALISE COOKIE CHOICES",
    decline: "Continue without accepting",
  },
  es: {
    title: "Configuración de Cookies",
    desc: "Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, ofrecer contenido y recomendaciones personalizadas, analizar el tráfico del sitio y comprender el origen de nuestra audiencia. Algunas cookies son esenciales para el funcionamiento del sitio, mientras que otras nos ayudan a mejorar el rendimiento y ofrecer una experiencia más adaptada a tus preferencias. Puedes elegir aceptar todas las cookies, personalizar tus preferencias o continuar sin aceptar las cookies no esenciales.",
    acceptAll: "ACEPTAR TODO",
    personalize: "PERSONALIZAR",
    decline: "Continuar sin aceptar",
  },
};

export default function CookieBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("avnyc-cookie-consent");
    if (saved) return;

    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem("avnyc-cookie-consent", "true");
    setVisible(false);
  };

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
            {t.title}
          </h2>
          <p
            className="max-w-[620px] text-sm leading-relaxed"
            style={{ color: "#777", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
          >
            {t.desc}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-start gap-3 md:items-end">
          <button
            onClick={dismiss}
            className="mb-1 text-[11px] uppercase tracking-wide transition-colors hover:text-white"
            style={{ color: "#666", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
          >
            {t.decline}
          </button>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
            <button
              onClick={dismiss}
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
              onClick={dismiss}
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
        </div>
      </div>
    </div>
  );
}
