import { createFileRoute } from "@tanstack/react-router";
import AuthSectionTwo from "@/components/ui/auth-section-2";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In — AVNYC Vintage Archive" },
      { name: "description", content: "Access your AVNYC account and curated New York vintage archive." },
      { property: "og:title", content: "Log In — AVNYC Vintage Archive" },
      { property: "og:description", content: "Access your AVNYC account and curated New York vintage archive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return <AuthSectionTwo mode="login" />;
}
