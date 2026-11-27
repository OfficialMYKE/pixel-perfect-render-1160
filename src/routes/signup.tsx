import { createFileRoute } from "@tanstack/react-router";
import AuthSectionTwo from "@/components/ui/auth-section-2";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — Authentic Vintage Store Vintage Archive" },
      { name: "description", content: "Join Authentic Vintage Store for one-of-one streetwear and curated New York vintage drops." },
      { property: "og:title", content: "Create Account — Authentic Vintage Store Vintage Archive" },
      { property: "og:description", content: "Join Authentic Vintage Store for one-of-one streetwear and curated New York vintage drops." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return <AuthSectionTwo mode="signup" />;
}
