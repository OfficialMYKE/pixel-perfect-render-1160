import { createFileRoute } from "@tanstack/react-router";
import MetroHero from "@/components/ui/scroll-locked-video-hero";
import shareAsset from "@/assets/avnyc-share-preview.jpg.asset.json";

const SHARE_IMAGE = `https://pixel-perfect-render-1160.lovable.app${shareAsset.url}`;

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
      { property: "og:url", content: "https://pixel-perfect-render-1160.lovable.app/" },
      { property: "og:image", content: SHARE_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: SHARE_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://pixel-perfect-render-1160.lovable.app/" }],
  }),
  component: Index,
});

function Index() {
  return <MetroHero />;
}
