import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const LANGUAGES = [
  { code: "en" as const, label: "English" },
  { code: "es" as const, label: "Español" },
];

function splitHref(href: string): { to: string; hash?: string } {
  const [path, hash] = href.split("#");
  return hash ? { to: path || "/", hash } : { to: path || "/" };
}

export default function AnnouncementBar() {
  const { lang, setLang, t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [helpOpen, setHelpOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const messages = t.announcementMessages;

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % messages.length);
        setOpacity(1);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  useEffect(() => {
    setCurrent(0);
  }, [lang]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) setHelpOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const msg = messages[current];

  return (
    <div className="announcement-bar">
      <div className="announcement-bar__left">
        <Link to="/" className="announcement-bar__item announcement-bar__brand">
          AVNYC
        </Link>
      </div>

      <div className="announcement-bar__center">
        <span
          className="announcement-bar__message"
          style={{ opacity, transition: "opacity 0.4s ease-in-out" }}
          aria-live="polite"
        >
          {msg?.text}{" "}
          {msg?.links.map((link) => (
            <Link key={link.label} {...splitHref(link.href)} className="announcement-bar__link">
              {link.label}
            </Link>
          ))}
        </span>
      </div>

      <div className="announcement-bar__right">
        <div className="announcement-bar__dropdown-wrap" ref={langRef}>
          <button
            className="announcement-bar__item announcement-bar__btn"
            aria-expanded={langOpen}
            aria-haspopup="true"
            onClick={() => {
              setLangOpen(!langOpen);
              setHelpOpen(false);
            }}
          >
            {LANGUAGES.find((l) => l.code === lang)?.label}
            <ChevronDown size={12} strokeWidth={1.5} />
          </button>
          {langOpen && (
            <div className="announcement-bar__dropdown">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  className={`announcement-bar__dropdown-item ${l.code === lang ? "is-active" : ""}`}
                  onClick={() => {
                    setLang(l.code);
                    setLangOpen(false);
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="announcement-bar__divider" aria-hidden="true" />
        <div className="announcement-bar__dropdown-wrap" ref={helpRef}>
          <button
            className="announcement-bar__item announcement-bar__btn"
            aria-expanded={helpOpen}
            aria-haspopup="true"
            onClick={() => {
              setHelpOpen(!helpOpen);
              setLangOpen(false);
            }}
          >
            {t.helpLabel}
            <ChevronDown size={12} strokeWidth={1.5} />
          </button>
          {helpOpen && (
            <div className="announcement-bar__dropdown">
              {t.helpOptions.map((opt) => (
                <Link
                  key={opt.label}
                  {...splitHref(opt.href)}
                  className="announcement-bar__dropdown-item"
                  onClick={() => setHelpOpen(false)}
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
