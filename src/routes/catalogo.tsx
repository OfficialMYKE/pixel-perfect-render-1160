import { createFileRoute } from "@tanstack/react-router";
import CatalogPage from "@/components/ui/catalog-page";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo — AVNYC Vintage Archive" },
      { name: "description", content: "Explora nuestra colección curada de streetwear vintage auténtico." },
    ],
  }),
  component: CatalogPage,
});
