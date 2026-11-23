import ClothingRailHero, { type RailGarment } from "@/components/ui/product-rail-gallery";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export default function VintageArchiveRail() {
  const { lang } = useLanguage();
  const es = lang === "es";
  const items: RailGarment[] = [
    { id: "workwear", kind: "jacket", color: "var(--rail-olive)", name: es ? "Chaqueta workwear · Oliva" : "Workwear jacket · Olive", tag: "01 / WORKWEAR", description: es ? "Silueta utilitaria, bolsillos amplios y carácter de archivo." : "A utility silhouette, generous pockets and archive character.", details: es ? ["Inspiración workwear", "Bolsillos de parche"] : ["Workwear inspiration", "Patch pockets"] },
    { id: "crewneck", kind: "knit", color: "var(--rail-brick)", name: es ? "Crewneck · Rojo lavado" : "Crewneck · Faded red", tag: "02 / CLASSICS", description: es ? "Un clásico relajado para llevar con denim y capas." : "An easy classic for faded denim and everyday layers.", details: es ? ["Cuello redondo", "Puños acanalados"] : ["Crew neck", "Ribbed cuffs"] },
    { id: "tee", kind: "tee", color: "var(--vintage-paper)", name: es ? "Camiseta · Crudo" : "Archive tee · Bone", tag: "03 / BASICS", description: es ? "Líneas limpias. La base de un look con historia." : "Clean lines. The foundation of a look with history.", details: es ? ["Manga corta", "Silueta clásica"] : ["Short sleeves", "Classic silhouette"] },
    { id: "hoodie", kind: "hoodie", color: "var(--rail-charcoal)", name: es ? "Hoodie · Carbón" : "Hoodie · Charcoal", tag: "04 / STREET", description: es ? "Una silueta de calle con capucha y bolsillo canguro." : "A street staple with a hood and kangaroo pocket.", details: es ? ["Capucha", "Bolsillo canguro"] : ["Hooded", "Kangaroo pocket"] },
    { id: "shirt", kind: "shirt", color: "var(--rail-blue)", name: es ? "Camisa · Azul gastado" : "Archive shirt · Washed blue", tag: "05 / LAYERS", description: es ? "Cuello clásico y bolsillos dobles, abierta o por sí sola." : "A classic collar and double pockets. Layered or on its own.", details: es ? ["Cuello clásico", "Botones frontales"] : ["Classic collar", "Button front"] },
    { id: "coat", kind: "coat", color: "var(--rail-taupe)", name: es ? "Abrigo · Piedra" : "Long coat · Stone", tag: "06 / OUTERWEAR", description: es ? "Largo, estructurado y listo para las calles de Nueva York." : "Long, structured and made for a New York state of mind.", details: es ? ["Silueta larga", "Solapas clásicas"] : ["Long silhouette", "Classic lapels"] },
  ];
  return (
    <section id="new-arrivals" className="archive-rail dark" aria-labelledby="archive-rail-title">
      <header className="archive-rail__header">
        <p>AVNYC / ARCHIVE STUDIES — 002</p>
        <div><h2 id="archive-rail-title">{es ? "EL ARCHIVO." : "ON THE RAIL."}</h2><span>{es ? "SILUETAS CON HISTORIA" : "SILHOUETTES WITH A STORY"}</span></div>
      </header>
      <ClothingRailHero items={items} hanger="matte" autoplay={false}
        caption={es ? "Clásicos de calle. Espíritu de Nueva York." : "Street classics. A New York state of mind."}
        labels={{ front: es ? "Frente" : "Front", back: es ? "Espalda" : "Back", close: es ? "Cerrar" : "Close", show: es ? "Ver" : "Show" }}
        action={<Button asChild variant="link" className="archive-rail__link"><a href="#archive">{es ? "VOLVER AL LOOKBOOK" : "EXPLORE THE LOOKBOOK"} <span aria-hidden="true">↗</span></a></Button>}
      />
      <p className="archive-rail__edition">{es ? "ESTUDIO ILUSTRADO / NO ES INVENTARIO DE VENTA" : "ILLUSTRATED STUDY / NOT A LIVE PRODUCT INVENTORY"}</p>
    </section>
  );
}