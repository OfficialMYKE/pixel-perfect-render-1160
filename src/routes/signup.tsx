import { createFileRoute } from "@tanstack/react-router";
import AuthSectionTwo from "@/components/ui/auth-section-2";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — AVNYC Vintage Archive" },
      { name: "description", content: "Join AVNYC for one-of-one streetwear and curated New York vintage drops." },
      { property: "og:title", content: "Create Account — AVNYC Vintage Archive" },
      { property: "og:description", content: "Join AVNYC for one-of-one streetwear and curated New York vintage drops." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return <AuthSectionTwo mode="signup" />;
}
