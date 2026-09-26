"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import vintageStore from "@/assets/vintage-store.jpg";
import vintage01 from "@/assets/vintage-streetwear-01.jpg";
import vintage02 from "@/assets/vintage-streetwear-02.jpg";
import vintage03 from "@/assets/vintage-streetwear-03.jpg";
import vintage04 from "@/assets/vintage-streetwear-04.jpg";

const images = [vintageStore, vintage01, vintage02, vintage03, vintage04];

const captions = [
  "NEW YORK — CURATED ARCHIVE",
  "ONE OF ONE STREETWEAR",
  "SOURCED BY HAND",
  "AUTHENTIC VINTAGE",
  "EST. NYC",
];

export default function AuthSectionTwo({ mode = "signup" }: { mode?: "login" | "signup" }) {
  const { t, lang, setLang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const isSignup = mode === "signup";
  const title = isSignup ? t.signup.title : t.login.title;
  const subtitle = isSignup ? t.signup.subtitle : t.login.subtitle;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="min-h-screen p-3 antialiased [font-synthesis:none]"
      style={{ background: "var(--vintage-ink)", color: "var(--vintage-paper)" }}
    >
      <div className="grid min-h-[calc(100vh-1.5rem)] gap-6 lg:grid-cols-[0.94fr_1.06fr]">
        {/* Left — Image gallery */}
        <div className="flex min-h-[600px] justify-center overflow-hidden rounded-md px-7 py-12 sm:px-10 lg:min-h-0 lg:py-20 xl:py-24" style={{ background: "#0a0a0a" }}>
          <div className="flex w-full max-w-[500px] flex-col items-center">
            {/* Brand */}
            <div className="flex items-center gap-3 text-lg" style={{ color: "var(--vintage-paper)" }}>
              <AvnycLogo className="size-6" />
              <span
                style={{
                  fontFamily: "Impact, Haettenschweiler, 'Arial Narrow', sans-serif",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                }}
              >
                AVNYC
              </span>
            </div>

            {/* Image grid */}
            <div className="relative mt-8 grid w-full grid-cols-[1.55fr_1fr] gap-2 rounded-md">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              <ImageTile
                src={images[0] ?? vintageStore}
                active={activeIndex === 0}
                className="row-span-2 h-[250px]"
              />
              <ImageTile
                src={images[1] ?? vintage01}
                active={activeIndex === 1}
                className="h-[121px]"
              />
              <ImageTile
                src={images[3] ?? vintage03}
                active={activeIndex === 3}
                className="h-[121px]"
              />
              <ImageTile
                src={images[2] ?? vintage02}
                active={activeIndex === 2}
                className="col-span-2 h-[120px]"
              />
            </div>

            {/* Caption */}
            <div className="mt-6 w-full rounded-[10px] border border-dashed px-5 py-4" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <div className="flex items-end gap-4">
                <p
                  className="line-clamp-4 flex-1 text-xs leading-4"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  <span className="font-semibold" style={{ color: "var(--vintage-paper)" }}>
                    {captions[activeIndex]}
                  </span>
                </p>
                <button
                  className="grid size-8 shrink-0 place-items-center rounded-full transition-colors"
                  style={{ background: "rgba(255,255,255,0.2)", color: "var(--vintage-paper)" }}
                  onClick={() => setActiveIndex((current) => (current + 1) % images.length)}
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            <p
              className="mt-7 max-w-[280px] text-center text-xl leading-tight"
              style={{ color: "var(--vintage-paper)" }}
            >
              {t.authPanel.title}
            </p>

            {/* Dots */}
            <div className="mt-auto flex gap-2 pb-8 pt-8">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  style={{
                    height: "4px",
                    width: activeIndex === index ? "40px" : "16px",
                    borderRadius: "999px",
                    background: activeIndex === index ? "var(--vintage-paper)" : "rgba(255,255,255,0.35)",
                    transition: "all 0.3s",
                  }}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex min-h-[600px] items-center justify-center px-6 py-12 sm:px-10 lg:min-h-0 lg:px-14 xl:px-20">
          <AuthForm mode={mode} title={title} subtitle={subtitle} showPassword={showPassword} setShowPassword={setShowPassword} t={t} lang={lang} setLang={setLang} />
        </div>
      </div>
    </section>
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
  setLang,
}: {
  mode: "login" | "signup";
  title: string;
  subtitle: string;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  t: any;
  lang: string;
  setLang: (l: "en" | "es") => void;
}) {
  const isSignup = mode === "signup";

  return (
    <div className="mx-auto w-full max-w-[500px]">
      {/* Language selector */}
      <div className="mb-8 flex justify-end gap-1">
        <LangBtn active={lang === "en"} onClick={() => setLang("en")}>EN</LangBtn>
        <LangBtn active={lang === "es"} onClick={() => setLang("es")}>ES</LangBtn>
      </div>

      <p
        className="mb-2 text-[10px] uppercase"
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          letterSpacing: "0.08em",
          color: "var(--vintage-fog)",
        }}
      >
        {t.authPanel.eyebrow}
      </p>

      <h1
        className="whitespace-nowrap text-3xl tracking-[-0.04em] sm:text-4xl lg:text-[42px] lg:leading-[1.05]"
        style={{
          fontFamily: "Impact, Haettenschweiler, 'Arial Narrow', sans-serif",
          fontWeight: 800,
          textTransform: "uppercase",
          color: "var(--vintage-paper)",
        }}
      >
        {title}
      </h1>

      <p
        className="mt-2 mb-7 text-[10px] uppercase"
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          letterSpacing: "0.08em",
          color: "var(--vintage-fog)",
        }}
      >
        {subtitle}
      </p>

      {/* Social buttons */}
      <div className="grid gap-3 sm:grid-cols-2">
        <SocialButton icon={<GoogleIcon />} label={t.login.google} />
        <SocialButton icon={<AppleIcon />} label="Continue with Apple" />
      </div>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4 text-sm" style={{ color: "var(--vintage-fog)" }}>
        <div className="h-px flex-1" style={{ background: "var(--vintage-line)" }} />
        {t.login.or}
        <div className="h-px flex-1" style={{ background: "var(--vintage-line)" }} />
      </div>

      {/* Form */}
      <form className="space-y-5 text-left" onSubmit={(e) => e.preventDefault()}>
        {isSignup && (
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldBox label={t.signup.firstName} type="text" />
            <FieldBox label={t.signup.lastName} type="text" />
          </div>
        )}

        <FieldBox label={isSignup ? t.signup.email : t.login.email} type="email" placeholder={isSignup ? "you@example.com" : ""} />

        <div className="relative">
          <FieldBox label={isSignup ? t.signup.password : t.login.password} type={showPassword ? "text" : "password"} />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--vintage-fog)" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        {isSignup && (
          <FieldBox label={t.signup.confirmPassword} type={showPassword ? "text" : "password"} />
        )}

        {!isSignup && (
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--vintage-fog)" }}>
            <CheckboxLine>{t.login.remember}</CheckboxLine>
            <a href="#" className="underline underline-offset-2" style={{ color: "var(--vintage-paper)" }}>
              {t.login.forgot}
            </a>
          </div>
        )}

        {isSignup && (
          <div className="space-y-3 pt-2 text-xs leading-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            <CheckboxLine>
              {t.signup.agree}{" "}
              <a href="#" className="font-medium underline underline-offset-2" style={{ color: "var(--vintage-paper)" }}>
                {t.signup.terms}
              </a>{" "}
              {t.signup.and}{" "}
              <a href="#" className="font-medium underline underline-offset-2" style={{ color: "var(--vintage-paper)" }}>
                {t.signup.privacy}
              </a>
            </CheckboxLine>
          </div>
        )}

        <button
          type="submit"
          className="mt-9 flex h-12 w-full items-center justify-center rounded-none text-lg font-medium transition-colors"
          style={{
            background: "var(--vintage-red)",
            border: "1.5px solid var(--vintage-red)",
            color: "var(--vintage-paper)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {isSignup ? t.signup.cta : t.login.cta} →
        </button>
      </form>

      {/* Switch */}
      <p className="mt-6 text-center text-xs" style={{ color: "var(--vintage-fog)" }}>
        {isSignup ? t.signup.hasAccount : t.login.noAccount}{" "}
        <a
          href={isSignup ? "/login" : "/signup"}
          className="font-bold underline underline-offset-2"
          style={{ color: "var(--vintage-paper)" }}
        >
          {isSignup ? t.signup.loginLink : t.login.signupLink}
        </a>
      </p>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────── */

function ImageTile({
  src,
  active,
  className,
}: {
  src: string;
  active: boolean;
  className: string;
}) {
  return (
    <div
      className={`${className} relative overflow-visible rounded-md ${active ? "z-10" : "z-0"}`}
    >
      <img
        src={typeof src === "string" ? src : src}
        alt="Vintage streetwear"
        className="h-full w-full rounded-md object-cover transition-opacity duration-700"
        style={{
          filter: "saturate(0.6) contrast(1.1)",
          opacity: active ? 1 : 0.4,
        }}
      />
      <FocusCorners active={active} />
    </div>
  );
}

function FocusCorners({ active }: { active: boolean }) {
  const baseClass = `pointer-events-none absolute h-4 w-4 transition-all duration-500 ease-out ${active ? "translate-x-0 translate-y-0 opacity-100" : "opacity-0"}`;
  const borderColor = "rgba(255,255,255,0.6)";

  return (
    <>
      <div className={`${baseClass} -left-2 -top-2 border-l border-t ${active ? "" : "-translate-x-2 -translate-y-2"}`} style={{ borderColor }} />
      <div className={`${baseClass} -right-2 -top-2 border-r border-t ${active ? "" : "translate-x-2 -translate-y-2"}`} style={{ borderColor }} />
      <div className={`${baseClass} -bottom-2 -left-2 border-b border-l ${active ? "" : "-translate-x-2 translate-y-2"}`} style={{ borderColor }} />
      <div className={`${baseClass} -bottom-2 -right-2 border-b border-r ${active ? "" : "translate-x-2 translate-y-2"}`} style={{ borderColor }} />
    </>
  );
}

function SocialButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex h-9 items-center justify-center gap-2 rounded-[8px] border px-3 text-sm leading-none transition-colors"
      style={{
        borderColor: "var(--vintage-line)",
        background: "transparent",
        color: "var(--vintage-paper)",
      }}
    >
      <span className="shrink-0">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function FieldBox({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <label
      className="flex h-11 items-center justify-between gap-4 rounded-[8px] border px-4 text-base leading-none"
      style={{
        borderColor: "var(--vintage-line)",
        background: "transparent",
      }}
    >
      <input
        type={type}
        value={inputValue}
        placeholder={placeholder}
        aria-label={label}
        onFocus={() => {
          if (!isEditing) {
            setInputValue("");
            setIsEditing(true);
          }
        }}
        onChange={(event) => {
          setInputValue(event.target.value);
          setIsEditing(true);
        }}
        className="min-w-0 flex-1 truncate bg-transparent outline-none"
        style={{ color: "var(--vintage-paper)" }}
      />
      {!isEditing && (
        <span className="shrink-0" style={{ color: "var(--vintage-fog)" }}>{label}</span>
      )}
    </label>
  );
}

function CheckboxLine({ children }: { children: ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <span className="relative mt-0.5 size-3 shrink-0">
        <input
          type="checkbox"
          className="peer size-full appearance-none rounded-[2px] border checked:bg-current"
          style={{ borderColor: "var(--vintage-line)", background: "transparent" }}
        />
        <svg
          viewBox="0 0 12 12"
          className="pointer-events-none absolute inset-0 hidden size-full p-px text-white peer-checked:block"
          fill="none"
        >
          <path
            d="M3 6.2 5 8.1 9 3.9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </label>
  );
}

function LangBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-2.5 py-1 text-[10px] font-semibold uppercase transition-all"
      style={{
        borderRadius: "3px",
        border: `1px solid ${active ? "var(--vintage-paper)" : "var(--vintage-line)"}`,
        background: active ? "var(--vintage-paper)" : "transparent",
        color: active ? "var(--vintage-ink)" : "var(--vintage-fog)",
      }}
    >
      {children}
    </button>
  );
}

function AvnycLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 8h4l4 16h-4L4 8Zm10 0h4l4 16h-4l-4-16Zm10 0h4v2h-4v4h4v2h-4v4h4v2h-4v4h-4V8h4Z"
        fill="currentColor"
      />
    </svg>
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
