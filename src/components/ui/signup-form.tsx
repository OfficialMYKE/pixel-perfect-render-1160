import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import LegalPages from "@/components/ui/legal-pages";

export default function SignupForm() {
  const { t, lang, setLang } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const openLegal = (id: string) => {
    document.getElementById(`legal-${id}`)?.click();
  };

  return (
    <>
      <LegalPages />
      <div className="auth">
        <div className="auth__video-bg">
          <iframe
            src="https://www.youtube.com/embed/2--if_5xgdI?autoplay=1&mute=1&loop=1&playlist=2--if_5xgdI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&fs=0&disablekb=1"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title="Background video"
          />
        </div>
        <div className="auth__overlay" />
        <div className="auth__lang">
          <button
            className={`auth__lang-btn ${lang === "en" ? "is-active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            className={`auth__lang-btn ${lang === "es" ? "is-active" : ""}`}
            onClick={() => setLang("es")}
          >
            ES
          </button>
        </div>
        <div className="auth__card">
        <a href="/" className="auth__logo">AVNYC</a>
        <h1 className="auth__title">{t.signup.title}</h1>
        <p className="auth__subtitle">{t.signup.subtitle}</p>

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__row">
            <div className="auth__field">
              <label className="auth__label" htmlFor="signup-first">{t.signup.firstName}</label>
              <input
                id="signup-first"
                name="firstName"
                type="text"
                className="auth__input"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
              />
            </div>
            <div className="auth__field">
              <label className="auth__label" htmlFor="signup-last">{t.signup.lastName}</label>
              <input
                id="signup-last"
                name="lastName"
                type="text"
                className="auth__input"
                value={formData.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="auth__field">
            <label className="auth__label" htmlFor="signup-email">{t.signup.email}</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              className="auth__input"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth__field">
            <label className="auth__label" htmlFor="signup-password">{t.signup.password}</label>
            <div className="auth__password-wrap">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="auth__input"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth__password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="auth__field">
            <label className="auth__label" htmlFor="signup-confirm">{t.signup.confirmPassword}</label>
            <input
              id="signup-confirm"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              className="auth__input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <label className="auth__checkbox">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <span>{t.signup.agree}{" "}
              <button type="button" onClick={() => openLegal("terms")} className="auth__link-btn">{t.signup.terms}</button>{" "}
              {t.signup.and}{" "}
              <button type="button" onClick={() => openLegal("privacy")} className="auth__link-btn">{t.signup.privacy}</button>
            </span>
          </label>

          <button type="submit" className="auth__btn auth__btn--primary" disabled={!agreed}>
            {t.signup.cta}
          </button>
        </form>

        <div className="auth__divider">
          <span>{t.signup.or}</span>
        </div>

        <button className="auth__btn auth__btn--social">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t.signup.google}
        </button>

        <p className="auth__switch">
          {t.signup.hasAccount}{" "}
          <a href="/login">{t.signup.loginLink}</a>
        </p>
      </div>
      </div>
    </>
  );
}
