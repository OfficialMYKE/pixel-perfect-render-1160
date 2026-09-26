"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import AnnouncementBar from "@/components/ui/announcement-bar";
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

export default function AuthSectionTwo({ mode = "signup" }: { mode?: "login" | "signup" }) {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const isSignup = mode === "signup";
  const title = isSignup ? t.signup.title : t.login.title;
  const subtitle = isSignup ? t.signup.subtitle : t.login.subtitle;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ background: "#0a0a0a", color: "#f5f5f5" }}>
      <AnnouncementBar />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Left — Carousel */}
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

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

          <div className="absolute bottom-12 left-6 right-6 z-20 max-w-[420px]">
            <div className="flex items-start gap-3">
              <p
                className="line-clamp-3 flex-1 text-[11px] leading-[1.5]"
                style={{ color: "#e0e0e0", textShadow: "0 1px 4px rgba(0,0,0,0.9), 0 1px 10px rgba(0,0,0,0.6)" }}
              >
                {slides[activeIndex].caption[lang]}
              </p>
              <button
                className="grid size-8 shrink-0 place-items-center rounded-full transition-colors"
                style={{ background: "rgba(255,255,255,0.2)", color: "#f5f5f5" }}
                onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="rounded-full transition-all duration-300"
                style={{
                  height: "4px",
                  width: activeIndex === index ? "40px" : "16px",
                  background: activeIndex === index ? "#ffffff" : "rgba(255,255,255,0.3)",
                }}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center overflow-hidden px-6 py-8 sm:px-10 lg:px-14">
          <AuthForm mode={mode} title={title} subtitle={subtitle} showPassword={showPassword} setShowPassword={setShowPassword} t={t} lang={lang} />
        </div>
      </div>
    </div>
  );
}

/* ── Auth Form ─────────────────────────────────────── */

function AuthForm({
  mode,
  title,
  subtitle,
  showPassword,
  setShowPassword,
  t,
  lang,
}: {
  mode: "login" | "signup";
  title: string;
  subtitle: string;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  t: any;
  lang: string;
}) {
  const isSignup = mode === "signup";

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <a
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-xs tracking-wider uppercase transition-colors hover:opacity-80"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif", color: "#999" }}
      >
        <ArrowLeft className="size-3.5" />
        {lang === "es" ? "Volver a la tienda" : "Back to store"}
      </a>

      <p
        className="mb-2 text-[10px] uppercase"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "0.1em", color: "#888" }}
      >
        {t.authPanel.eyebrow}
      </p>

      <h1
        className="mb-6 text-3xl sm:text-4xl lg:text-[38px] lg:leading-[1.1]"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontWeight: 700, color: "#f5f5f5" }}
      >
        {title}
      </h1>

      <p
        className="mb-6 text-[11px] uppercase"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "0.06em", color: "#888" }}
      >
        {subtitle}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <SocialButton icon={<GoogleIcon />} label={t.login.google} />
        <SocialButton icon={<AppleIcon />} label={t.login.apple} />
      </div>

      <div className="my-5 flex items-center gap-4 text-sm" style={{ color: "#888" }}>
        <div className="h-px flex-1" style={{ background: "#333" }} />
        {t.login.or}
        <div className="h-px flex-1" style={{ background: "#333" }} />
      </div>

      <form className="space-y-3 text-left" onSubmit={(e) => e.preventDefault()}>
        {isSignup && (
          <div className="grid gap-3 sm:grid-cols-2">
            <LabelField label={t.signup.firstName} type="text" />
            <LabelField label={t.signup.lastName} type="text" />
          </div>
        )}

        <LabelField label={isSignup ? t.signup.email : t.login.email} type="email" />

        <div>
          <label className="mb-1 block text-[11px] font-medium tracking-wide" style={{ color: "#888", fontFamily: "system-ui, -apple-system, sans-serif" }}>
            {isSignup ? t.signup.password : t.login.password}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="h-10 w-full rounded-lg border px-4 text-sm outline-none transition-colors"
              style={{ borderColor: "#333", background: "transparent", color: "#f5f5f5", fontFamily: "system-ui, -apple-system, sans-serif" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#666"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#333"; }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "#888" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {isSignup && (
          <LabelField label={t.signup.confirmPassword} type={showPassword ? "text" : "password"} />
        )}

        {!isSignup && (
          <div className="flex items-center justify-between text-xs" style={{ color: "#888" }}>
            <CheckboxLine>{t.login.remember}</CheckboxLine>
            <a href="#" className="underline underline-offset-2" style={{ color: "#f5f5f5" }}>
              {t.login.forgot}
            </a>
          </div>
        )}

        {isSignup && (
          <div className="space-y-3 pt-1 text-xs leading-4" style={{ color: "#888" }}>
            <CheckboxLine>
              {t.signup.agree}{" "}
              <a href="#" className="font-medium underline underline-offset-2" style={{ color: "#f5f5f5" }}>
                {t.signup.terms}
              </a>{" "}
              {t.signup.and}{" "}
              <a href="#" className="font-medium underline underline-offset-2" style={{ color: "#f5f5f5" }}>
                {t.signup.privacy}
              </a>
            </CheckboxLine>
          </div>
        )}

        <button
          type="submit"
          className="mt-5 flex h-11 w-full items-center justify-center rounded-lg text-base font-medium transition-colors duration-300"
          style={{
            background: "#8b1a1a",
            border: "none",
            color: "#f5f5f5",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#c0392b"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#8b1a1a"; }}
        >
          {isSignup ? t.signup.cta : t.login.cta}
        </button>
      </form>

      <p className="mt-5 text-center text-xs" style={{ color: "#888" }}>
        {isSignup ? t.signup.hasAccount : t.login.noAccount}{" "}
        <a
          href={isSignup ? "/login" : "/signup"}
          className="font-bold underline underline-offset-2"
          style={{ color: "#f5f5f5" }}
        >
          {isSignup ? t.signup.loginLink : t.login.signupLink}
        </a>
      </p>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────── */

function SocialButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm leading-none transition-colors"
      style={{ borderColor: "#333", background: "transparent", color: "#f5f5f5", fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <span className="shrink-0">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function LabelField({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium tracking-wide" style={{ color: "#888", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {label}
      </label>
      <input
        type={type}
        className="h-10 w-full rounded-lg border px-4 text-sm outline-none transition-colors"
        style={{ borderColor: "#333", background: "transparent", color: "#f5f5f5", fontFamily: "system-ui, -apple-system, sans-serif" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#666"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#333"; }}
      />
    </div>
  );
}

function CheckboxLine({ children }: { children: ReactNode }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
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
      <span className="text-xs leading-none" style={{ color: "#888" }}>{children}</span>
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
