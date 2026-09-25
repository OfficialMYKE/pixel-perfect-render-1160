import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import LegalPages from "@/components/ui/legal-pages";
import vintageImg from "@/assets/vintage-store.jpg";

export default function SignupForm() {
  const { t, lang, setLang } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openLegal = (id: string) => {
    document.getElementById(`legal-${id}`)?.click();
  };

  return (
    <>
      <LegalPages />
      <div className="auth-split">
        <div className="auth-split__media">
          <div className="auth-split__video-bg">
            <iframe
              src="https://www.youtube-nocookie.com/embed/2--if_5xgdI?autoplay=1&mute=1&loop=1&playlist=2--if_5xgdI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&fs=0&disablekb=1&cc_load_policy=0&color=white"
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              title=""
            />
          </div>
          <img
            className="auth-split__media-img"
            src={vintageImg}
            alt=""
          />
          <div className="auth-split__media-shade" />
          <div className="auth-split__media-top">
            <span>{t.authPanel.vol}</span>
            <span>{t.authPanel.number}</span>
          </div>
          <div className="auth-split__media-bottom">
            <p className="auth-split__media-kicker">{t.authPanel.kicker}</p>
            <h1 className="auth-split__media-title">{t.authPanel.title}</h1>
          </div>
        </div>

        <div className="auth-split__form-side">
          <div className="auth-split__lang">
            <button
              className={`auth-split__lang-btn ${lang === "en" ? "is-active" : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`auth-split__lang-btn ${lang === "es" ? "is-active" : ""}`}
              onClick={() => setLang("es")}
            >
              ES
            </button>
          </div>

          <div className="auth-split__card">
            <p className="auth-split__eyebrow">{t.authPanel.eyebrow}</p>
            <h1 className="auth-split__heading">{t.signup.title}</h1>
            <p className="auth-split__subtext">{t.signup.subtitle}</p>

            <form className="auth-split__form-fields" onSubmit={(e) => e.preventDefault()}>
              <div className="auth-split__row">
                <div className="auth-split__field">
                  <label className="auth-split__label" htmlFor="signup-first">{t.signup.firstName}</label>
                  <input
                    id="signup-first"
                    name="firstName"
                    type="text"
                    className="auth-split__input"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className="auth-split__field">
                  <label className="auth-split__label" htmlFor="signup-last">{t.signup.lastName}</label>
                  <input
                    id="signup-last"
                    name="lastName"
                    type="text"
                    className="auth-split__input"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="auth-split__field">
                <label className="auth-split__label" htmlFor="signup-email">{t.signup.email}</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  className="auth-split__input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>

              <div className="auth-split__field">
                <label className="auth-split__label" htmlFor="signup-password">{t.signup.password}</label>
                <div className="auth-split__password-wrap">
                  <input
                    id="signup-password"
                    name="password"
                    type={showPw ? "text" : "password"}
                    className="auth-split__input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-split__eye"
                    onClick={() => setShowPw(!showPw)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {showPw ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="auth-split__field">
                <label className="auth-split__label" htmlFor="signup-confirm">{t.signup.confirmPassword}</label>
                <input
                  id="signup-confirm"
                  name="confirmPassword"
                  type={showPw ? "text" : "password"}
                  className="auth-split__input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>

              <label className="auth-split__checkbox">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <span>{t.signup.agree}{" "}
                  <button type="button" onClick={() => openLegal("terms")} className="auth-split__link-btn">{t.signup.terms}</button>{" "}
                  {t.signup.and}{" "}
                  <button type="button" onClick={() => openLegal("privacy")} className="auth-split__link-btn">{t.signup.privacy}</button>
                </span>
              </label>

              <button type="submit" className="auth-split__btn auth-split__btn--primary" disabled={!agreed}>
                {t.signup.cta} →
              </button>
            </form>

            <div className="auth-split__divider">
              <span>{t.signup.or}</span>
            </div>

            <button className="auth-split__btn auth-split__btn--social">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t.signup.google}
            </button>

            <p className="auth-split__switch">
              {t.signup.hasAccount}{" "}
              <a href="/login">{t.signup.loginLink}</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
