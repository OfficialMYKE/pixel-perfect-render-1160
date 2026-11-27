import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "../lib/i18n";
import { CartProvider } from "../lib/cart";
import CookieBanner from "../components/ui/cookie-banner";

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--vintage-ink)", color: "var(--vintage-paper)" }}
    >
      <div className="max-w-md text-center">
        <p
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--vintage-red)" }}
        >
          Authentic Vintage Store
        </p>
        <h1
          className="mt-2 text-7xl font-black uppercase"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          404
        </h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--vintage-fog)" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold uppercase tracking-wide"
            style={{ background: "var(--vintage-red)", color: "var(--vintage-paper)" }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--vintage-ink)", color: "var(--vintage-paper)" }}
    >
      <div className="max-w-md text-center">
        <p
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--vintage-red)" }}
        >
          Authentic Vintage Store
        </p>
        <h1 className="mt-4 text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--vintage-fog)" }}>
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold uppercase tracking-wide"
            style={{ background: "var(--vintage-red)", color: "var(--vintage-paper)" }}
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide"
            style={{ borderColor: "var(--vintage-line)", color: "var(--vintage-paper)" }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Authentic Vintage Store — Authentic Vintage Store | New York Streetwear" },
      {
        name: "description",
        content:
          "One-of-one vintage streetwear curated in New York. Authentic pieces, restored and ready.",
      },
      { name: "author", content: "Authentic Vintage Store" },
      { property: "og:title", content: "Authentic Vintage Store — Authentic Vintage Store | New York Streetwear" },
      {
        property: "og:description",
        content:
          "One-of-one vintage streetwear curated in New York. Authentic pieces, restored and ready.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
          <CookieBanner />
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
