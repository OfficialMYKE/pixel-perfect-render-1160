import { createFileRoute } from "@tanstack/react-router";
import MetroHero from "@/components/ui/scroll-locked-video-hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Authentic Vintage Store — New York Streetwear" },
      {
        name: "description",
        content:
          "True vintage, brand new. Curated one-of-one streetwear with a New York state of mind.",
      },
      { property: "og:title", content: "Authentic Vintage Store — New York Streetwear" },
      {
        property: "og:description",
        content:
          "True vintage, brand new. Curated one-of-one streetwear with a New York state of mind.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <MetroHero />;
}
