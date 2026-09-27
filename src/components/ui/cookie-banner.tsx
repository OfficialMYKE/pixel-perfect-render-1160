"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const cookieText = {
  en: {
    title: "Cookie Settings",
    desc: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
    acceptAll: "ACCEPT ALL",
    personalize: "PERSONALISE COOKIE CHOICES",
    decline: "Continue without accepting",
  },
  es: {
    title: "Configuración de Cookies",
    desc: "Utilizamos cookies para mejorar tu experiencia de navegación, contenido personalizado y analizar nuestro tráfico. Al hacer clic en \"Aceptar todo\", aceptas nuestro uso de cookies.",
    acceptAll: "ACEPTAR TODO",
    personalize: "PERSONALIZAR",
    decline: "Continuar sin aceptar",
  },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    const saved = localStorage.getItem("avnyc-cookie-consent");
    if (saved) return;

    const browserLang = navigator.languages?.[0] || navigator.language;
    setLang(browserLang.startsWith("es") ? "es" : "en");

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
              className="w-full rounded px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors sm:w-auto"
              style={{
                background: "#f5f5f5",
                color: "#0a0a0a",
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
