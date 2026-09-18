import { useEffect, useRef, useState } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const LANGUAGES = [
  { code: "en" as const, label: "English" },
  { code: "es" as const, label: "Español" },
];

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
        <a href="/" className="announcement-bar__item announcement-bar__brand">
          <RefreshCw size={12} strokeWidth={1.5} />
          AVNYC
        </a>
      </div>

      <div className="announcement-bar__center">
        <span
          className="announcement-bar__message"
          style={{ opacity, transition: "opacity 0.4s ease-in-out" }}
        >
          {msg.text}{" "}
          {msg.links.map((link) => (
            <a key={link.label} href={link.href} className="announcement-bar__link">
              {link.label}
            </a>
          ))}
        </span>
      </div>

      <div className="announcement-bar__right">
        <div className="announcement-bar__dropdown-wrap" ref={langRef}>
          <button
            className="announcement-bar__item announcement-bar__btn"
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
                <a
                  key={l.code}
                  href="#"
                  className={`announcement-bar__dropdown-item ${l.code === lang ? "is-active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setLang(l.code);
                    setLangOpen(false);
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <span className="announcement-bar__divider">|</span>
        <div className="announcement-bar__dropdown-wrap" ref={helpRef}>
          <button
            className="announcement-bar__item announcement-bar__btn"
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
                <a key={opt.label} href={opt.href} className="announcement-bar__dropdown-item">
                  {opt.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
