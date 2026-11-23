import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";

import AuthShell from "@/components/ui/auth-shell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export default function LoginForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <AuthShell issue="VOL. 01 / MEMBER ACCESS">
      <div className="auth__card">
        <h1 className="auth__title">{t.login.title}</h1>
        <p className="auth__subtitle">{t.login.subtitle}</p>

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__field">
            <label className="auth__label" htmlFor="login-email">{t.login.email}</label>
            <input
              id="login-email"
              type="email"
              className="auth__input"
                placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth__field">
            <label className="auth__label" htmlFor="login-password">{t.login.password}</label>
            <div className="auth__password-wrap">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                className="auth__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth__password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div className="auth__options">
            <label className="auth__checkbox">
              <input type="checkbox" />
              <span>{t.login.remember}</span>
            </label>
            <a href="#forgot" className="auth__forgot">{t.login.forgot}</a>
          </div>

          <Button type="submit" className="auth__btn auth__btn--primary">{t.login.cta} →</Button>
        </form>

        <div className="auth__divider">
          <span>{t.login.or}</span>
        </div>

        <Button type="button" variant="outline" className="auth__btn auth__btn--social">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t.login.google}
        </Button>

        <p className="auth__switch">
          {t.login.noAccount}{" "}
          <Link to="/signup">{t.login.signupLink}</Link>
        </p>
      </div>
    </AuthShell>
  );
}
