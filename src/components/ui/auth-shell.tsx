import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import streetwearImage from "@/assets/vintage-streetwear-02.jpg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

type AuthShellProps = {
  children: React.ReactNode;
  issue: string;
};

export default function AuthShell({ children, issue }: AuthShellProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <main className="auth">
      <header className="auth__topbar">
        <Button asChild variant="ghost" className="auth__back">
          <Link to="/">
            <ArrowLeft aria-hidden="true" />
            {lang === "es" ? "Volver a la tienda" : "Back to store"}
          </Link>
        </Button>

        <div className="auth__lang" aria-label={lang === "es" ? "Idioma" : "Language"}>
          <Button
            type="button"
            variant="ghost"
            className={`auth__lang-btn ${lang === "en" ? "is-active" : ""}`}
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
          >
            EN
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={`auth__lang-btn ${lang === "es" ? "is-active" : ""}`}
            onClick={() => setLang("es")}
            aria-pressed={lang === "es"}
          >
            ES
          </Button>
        </div>
      </header>

      <section className="auth__frame">
        <aside className="auth__editorial" aria-label="AVNYC Street Archive">
          <img src={streetwearImage} alt="Curated vintage streetwear inside the AVNYC archive" />
          <div className="auth__editorial-shade" />
          <div className="auth__editorial-head">
            <span>{issue}</span>
            <span>NY / 10013</span>
          </div>
          <div className="auth__editorial-copy">
            <p>{t.heroKicker}</p>
            <h2>STREET<br />ARCHIVE</h2>
          </div>
          <div className="auth__editorial-foot">
            <span>{t.heroOneOfOne}</span>
            <span>EST. NYC</span>
          </div>
        </aside>

        <div className="auth__panel">
          <div className="auth__stamp">AUTHENTIC GOODS</div>
          <Link to="/" className="auth__logo" aria-label="AVNYC home">AVNYC</Link>
          {children}
          <div className="auth__edition" aria-hidden="true">
            <span />
            <b>NEW YORK / ARCHIVE 001</b>
            <span />
          </div>
        </div>
      </section>
    </main>
  );
}