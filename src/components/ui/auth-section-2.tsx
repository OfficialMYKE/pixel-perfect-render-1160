"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import vintageStore from "@/assets/vintage-store.jpg";
import vintage01 from "@/assets/vintage-streetwear-01.jpg";
import vintage02 from "@/assets/vintage-streetwear-02.jpg";
import vintage03 from "@/assets/vintage-streetwear-03.jpg";
import vintage04 from "@/assets/vintage-streetwear-04.jpg";

const slides = [
  { src: vintageStore, caption: { en: "Every piece is hand-selected from vintage markets and private collections across NYC. We authenticate, restore, and curate each garment to ensure timeless quality.", es: "Cada pieza es seleccionada a mano de mercados vintage y colecciones privadas en NYC. Autenticamos, restauramos y curamos cada prenda para garantizar calidad atemporal." } },
  { src: vintage01, caption: { en: "Our sourcing team travels to find one-of-one streetwear that tells a story. From rare deadstock to original graphic tees, each item chosen for craftsmanship.", es: "Nuestro equipo viaja para encontrar streetwear único que cuenta una historia. Desde deadstock raro hasta camisetas gráficas originales, cada pieza elegida por su artesanía." } },
  { src: vintage02, caption: { en: "We believe in sustainable fashion through preservation. By giving new life to vintage garments, we reduce waste while offering pieces that can't be replicated.", es: "Creemos en la moda sostenible a través de la preservación. Al dar nueva vida a prendas vintage, reducimos desperdicio y ofrecemos piezas irrepetibles." } },
  { src: vintage03, caption: { en: "From Brooklyn flea markets to estate sales, our network of trusted suppliers helps us discover hidden gems. We inspect every stitch and verify every label.", es: "Desde mercados de pulgas en Brooklyn hasta ventas de estate, nuestra red de proveedores nos ayuda a descubrir joyas ocultas. Inspeccionamos cada costura y verificamos cada etiqueta." } },
  { src: vintage04, caption: { en: "The AVNYC curation process combines expertise with passion. We study fashion history and maintain relationships with collectors worldwide.", es: "El proceso de curaduría de AVNYC combina experiencia con pasión. Estudiamos historia de la moda y mantenemos relaciones con coleccionistas de todo el mundo." } },
];

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export default function AuthSectionTwo({ mode = "signup" }: { mode?: "login" | "signup" }) {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const isSignup = mode === "signup";
  const title = isSignup ? t.signup.title : t.login.title;
  const subtitle = isSignup ? t.signup.subtitle : t.login.subtitle;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((c) => (c + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="h-screen w-full overflow-hidden flex flex-col md:flex-row"
      style={{ background: "#0a0a0a", color: "#f5f5f5", fontFamily: FONT }}
    >
      {/* ── Left: Carousel ── */}
      <div className="relative w-full md:w-1/2 h-full overflow-hidden hidden md:block">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: activeIndex === i ? 1 : 0, zIndex: activeIndex === i ? 1 : 0 }}
          >
            <img
              src={slide.src}
              alt="Vintage streetwear"
              className="h-full w-full object-cover object-top"
              style={{ filter: "saturate(0.7) contrast(1.05)" }}
            />
          </div>
        ))}

        {/* Gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#0a0a0a]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent" />

        {/* Caption */}
        <div className="absolute bottom-14 left-6 right-6 z-20 max-w-[420px]">
          <div className="flex items-start gap-3">
            <p
              className="line-clamp-3 flex-1 text-[11px] leading-[1.6]"
              style={{ color: "#e0e0e0", textShadow: "0 1px 6px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.6)" }}
            >
              {slides[activeIndex].caption[lang]}
            </p>
            <button
              className="grid size-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/30"
              style={{ background: "rgba(255,255,255,0.15)", color: "#f5f5f5" }}
              onClick={() => setActiveIndex((c) => (c + 1) % slides.length)}
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{
                height: "3px",
                width: activeIndex === i ? "32px" : "12px",
                background: activeIndex === i ? "#fff" : "rgba(255,255,255,0.3)",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center overflow-hidden px-8 py-10 sm:px-12 md:p-12 lg:p-20">
        <div className="mx-auto w-full max-w-[440px]">
          {/* Back */}
          <a href="/" className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:opacity-70 transition-opacity" style={{ color: "#999" }}>
            <ArrowLeft className="size-3.5" />
            {lang === "es" ? "Volver a la tienda" : "Back to store"}
          </a>

          {/* Eyebrow */}
          <p className="mb-2 text-[10px] uppercase tracking-[0.12em]" style={{ color: "#777" }}>
            {t.authPanel.eyebrow}
          </p>

          {/* Title */}
          <h1 className="mb-4 text-[32px] leading-tight font-extrabold uppercase tracking-tight" style={{ color: "#f5f5f5" }}>
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mb-6 text-[11px] uppercase tracking-[0.06em] leading-relaxed" style={{ color: "#777" }}>
            {subtitle}
          </p>

          {/* Social */}
          <div className="grid gap-3 sm:grid-cols-2">
            <SocialBtn icon={<GoogleIcon />} label={t.login.google} />
            <SocialBtn icon={<AppleIcon />} label={t.login.apple} />
          </div>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: "#333" }} />
            <span className="text-xs" style={{ color: "#666" }}>{t.login.or}</span>
            <div className="h-px flex-1" style={{ background: "#333" }} />
          </div>

          {/* Form */}
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            {isSignup && (
              <div className="grid grid-cols-2 gap-4">
                <Field label={t.signup.firstName} type="text" />
                <Field label={t.signup.lastName} type="text" />
              </div>
            )}

            <Field label={isSignup ? t.signup.email : t.login.email} type="email" />

            {/* Password with eye */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium tracking-wide" style={{ color: "#888" }}>
                {isSignup ? t.signup.password : t.login.password}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="h-11 w-full rounded-lg border px-4 pr-11 text-sm outline-none transition-colors focus:border-[#666]"
                  style={{ borderColor: "#333", background: "transparent", color: "#f5f5f5" }}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:opacity-70"
                  style={{ color: "#888" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {isSignup && (
              <Field label={t.signup.confirmPassword} type={showPassword ? "text" : "password"} />
            )}

            {!isSignup && (
              <div className="flex items-center justify-between text-xs" style={{ color: "#888" }}>
                <Check>{t.login.remember}</Check>
                <a href="#" className="underline underline-offset-2 hover:opacity-80" style={{ color: "#f5f5f5" }}>
                  {t.login.forgot}
                </a>
              </div>
            )}

            {isSignup && (
              <div className="pt-1 text-xs leading-5" style={{ color: "#888" }}>
                <Check>
                  {t.signup.agree}{" "}
                  <a href="#" className="font-medium underline underline-offset-2 hover:opacity-80" style={{ color: "#f5f5f5" }}>{t.signup.terms}</a>{" "}
                  {t.signup.and}{" "}
                  <a href="#" className="font-medium underline underline-offset-2 hover:opacity-80" style={{ color: "#f5f5f5" }}>{t.signup.privacy}</a>
                </Check>
              </div>
            )}

            <button
              type="submit"
              className="mt-4 flex h-12 w-full items-center justify-center rounded-lg text-base font-semibold transition-colors duration-300"
              style={{ background: "#8b1a1a", color: "#f5f5f5" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#c0392b"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#8b1a1a"; }}
            >
              {isSignup ? t.signup.cta : t.login.cta}
            </button>
          </form>

          {/* Switch */}
          <p className="mt-6 text-center text-xs" style={{ color: "#888" }}>
            {isSignup ? t.signup.hasAccount : t.login.noAccount}{" "}
            <a href={isSignup ? "/login" : "/signup"} className="font-bold underline underline-offset-2 hover:opacity-80" style={{ color: "#f5f5f5" }}>
              {isSignup ? t.signup.loginLink : t.login.signupLink}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Components ────────────────────────────────────── */

function SocialBtn({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex h-11 items-center justify-center gap-2.5 rounded-lg border text-sm transition-colors hover:bg-white/5"
      style={{ borderColor: "#333", background: "transparent", color: "#f5f5f5" }}
    >
      <span className="shrink-0">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-medium tracking-wide" style={{ color: "#888" }}>
        {label}
      </label>
      <input
        type={type}
        className="h-11 w-full rounded-lg border px-4 text-sm outline-none transition-colors focus:border-[#666]"
        style={{ borderColor: "#333", background: "transparent", color: "#f5f5f5" }}
      />
    </div>
  );
}

function Check({ children }: { children: ReactNode }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span className="relative size-3.5 shrink-0">
        <input
          type="checkbox"
          className="peer size-full appearance-none rounded-[3px] border checked:bg-current"
          style={{ borderColor: "#666", background: "transparent" }}
        />
        <svg viewBox="0 0 12 12" className="pointer-events-none absolute inset-0 hidden size-full p-px text-white peer-checked:block" fill="none">
          <path d="M3 6.2 5 8.1 9 3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span style={{ color: "#999" }}>{children}</span>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" fill="#EB4335" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c-.03-3.02 2.47-4.47 2.58-4.54-1.41-2.06-3.6-2.34-4.38-2.37-1.86-.19-3.64 1.1-4.58 1.1-.95 0-2.42-1.07-3.98-1.04-2.05.03-3.94 1.19-4.99 3.02-2.13 3.69-.54 9.16 1.53 12.15 1.01 1.46 2.22 3.1 3.81 3.04 1.53-.06 2.11-.99 3.96-.99s2.37.99 3.99.96c1.65-.03 2.69-1.49 3.69-2.96 1.16-1.69 1.64-3.33 1.66-3.41-.04-.02-3.2-1.23-3.24-4.87ZM14.03 3.66c.84-1.02 1.41-2.43 1.25-3.84-1.21.05-2.68.81-3.55 1.83-.78.9-1.46 2.34-1.28 3.72 1.35.1 2.73-.69 3.58-1.71Z" />
    </svg>
  );
}
