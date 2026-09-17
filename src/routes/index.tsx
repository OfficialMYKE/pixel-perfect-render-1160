import { createFileRoute } from "@tanstack/react-router";
import MetroHero from "@/components/ui/scroll-locked-video-hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The City Opens — Scroll-Scrub Video Hero" },
      {
        name: "description",
        content:
          "A locked scroll experience where your scrolling drives a cinematic city video frame by frame.",
      },
      { property: "og:title", content: "The City Opens — Scroll-Scrub Video Hero" },
      {
        property: "og:description",
        content:
          "A locked scroll experience where your scrolling drives a cinematic city video frame by frame.",
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
