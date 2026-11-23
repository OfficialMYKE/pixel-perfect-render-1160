import vintageStreetwear01 from "@/assets/vintage-streetwear-01.jpg";
import vintageStreetwear02 from "@/assets/vintage-streetwear-02.jpg";
import vintageStreetwear03 from "@/assets/vintage-streetwear-03.jpg";
import vintageStreetwear04 from "@/assets/vintage-streetwear-04.jpg";
import archiveDenim from "@/assets/archive-denim.jpg";
import archiveJacket from "@/assets/archive-jacket.jpg";
import archiveStoreInterior from "@/assets/archive-store-interior.jpg";
import archiveSweatshirt from "@/assets/archive-sweatshirt.jpg";
import { NAV_SUBS, slugify } from "@/lib/catalog";

export type Category = "hombre" | "mujer" | "ninos" | "accesorios";

export interface Product {
  slug: string;
  name: { en: string; es: string };
  category: Category;
  sub: string;
  tags: Array<"new" | "sale">;
  price: number;
  compareAt?: number;
  sizes: string[];
  condition: "Deadstock" | "Excellent" | "Very Good" | "Good";
  brand: string;
  images: string[];
  description: { en: string; es: string };
}

export const CATEGORIES: Category[] = ["hombre", "mujer", "ninos", "accesorios"];

export const products: Product[] = [
  {
    slug: "varsity-jacket-ny",
    name: { en: "1990s Varsity Jacket", es: "Chaqueta Varsity años 90" },
    category: "hombre",
    sub: "jackets-coats",
    tags: ["new"],
    price: 189,
    sizes: ["S", "M", "L", "XL"],
    condition: "Excellent",
    brand: "Ralph Lauren Archive",
    images: [vintageStreetwear01, archiveJacket],
    description: {
      en: "Hand-selected varsity jacket from a private NYC collection. Wool body, leather sleeves, chain-stitched letters. One of one.",
      es: "Chaqueta varsity seleccionada a mano de una colección privada en NYC. Cuerpo de lana, mangas de cuero, letras bordadas. Única.",
    },
  },
  {
    slug: "racing-jacket-01",
    name: { en: "Vintage Racing Jacket", es: "Chaqueta de Carrera Vintage" },
    category: "hombre",
    sub: "jackets-coats",
    tags: ["new"],
    price: 145,
    sizes: ["M", "L"],
    condition: "Very Good",
    brand: "Private Label",
    images: [vintageStreetwear02, archiveStoreInterior],
    description: {
      en: "Motorsport-inspired racing jacket with embroidered patches. Fully lined, zip front, boxy fit.",
      es: "Chaqueta de carreras inspirada en motorsport con parches bordados. Forrada, cierre frontal, corte amplio.",
    },
  },
  {
    slug: "leather-bomber",
    name: { en: "Leather Bomber", es: "Bomber de Cuero" },
    category: "hombre",
    sub: "jackets-coats",
    tags: [],
    price: 240,
    compareAt: 320,
    sizes: ["M", "L", "XL"],
    condition: "Good",
    brand: "Schott NYC",
    images: [vintageStreetwear03, archiveJacket],
    description: {
      en: "Genuine leather bomber with a broken-in patina. Ribbed cuffs and hem, two front pockets.",
      es: "Bomber de cuero genuino con pátina natural. Puños y dobladillo acanalados, dos bolsillos frontales.",
    },
  },
  {
    slug: "graphic-tee-archive",
    name: { en: "Archive Graphic Tee", es: "Camiseta Gráfica de Archivo" },
    category: "hombre",
    sub: "t-shirts-polos",
    tags: ["new", "sale"],
    price: 48,
    compareAt: 65,
    sizes: ["S", "M", "L", "XL"],
    condition: "Very Good",
    brand: "Screen Stars",
    images: [vintageStreetwear04, archiveSweatshirt],
    description: {
      en: "Faded single-stitch graphic tee from the early 90s. Soft hand, original print in excellent condition.",
      es: "Camiseta gráfica desvanecida de costura única, principios de los 90. Tacto suave, estampa original en excelente estado.",
    },
  },
  {
    slug: "selvedge-jeans-501",
    name: { en: "Selvedge Denim 501", es: "Denim Selvedge 501" },
    category: "hombre",
    sub: "vintage-jeans",
    tags: [],
    price: 128,
    sizes: ["30", "32", "34", "36"],
    condition: "Good",
    brand: "Levi's Archive",
    images: [archiveDenim, vintageStreetwear04],
    description: {
      en: "Redline selvedge denim, straight leg, honest wear at the hem. Made in USA.",
      es: "Denim selvedge redline, corte recto, desgaste honesto en el dobladillo. Hecho en EE.UU.",
    },
  },
  {
    slug: "workwear-chore-coat",
    name: { en: "Chore Coat", es: "Chaqueta de Trabajo" },
    category: "hombre",
    sub: "jackets-coats",
    tags: ["sale"],
    price: 95,
    compareAt: 130,
    sizes: ["M", "L"],
    condition: "Very Good",
    brand: "Carhartt WIP",
    images: [archiveJacket, vintageStreetwear02],
    description: {
      en: "Triple-stitched cotton canvas chore coat with corduroy collar. Triple chest pocket.",
      es: "Chaqueta de trabajo en lona de algodón con costura triple y cuello de corduroy. Tres bolsillos de pecho.",
    },
  },
  {
    slug: "cropped-cardigan",
    name: { en: "Cropped Cardigan", es: "Cardigan Cropped" },
    category: "mujer",
    sub: "knitwear-cardigans",
    tags: ["new"],
    price: 72,
    sizes: ["XS", "S", "M"],
    condition: "Excellent",
    brand: "Hand Knit",
    images: [vintageStreetwear04, archiveSweatshirt],
    description: {
      en: "Hand-knit cropped cardigan with mother-of-pearl buttons. Perfect layering piece.",
      es: "Cardigan cropped tejido a mano con botones de nácar. Perfecta capa intermedia.",
    },
  },
  {
    slug: "leather-skirt-90s",
    name: { en: "90s Leather Skirt", es: "Falda de Cuero años 90" },
    category: "mujer",
    sub: "skirts-mini-maxi",
    tags: [],
    price: 110,
    sizes: ["XS", "S", "M"],
    condition: "Very Good",
    brand: "Private Label",
    images: [vintageStreetwear03, archiveJacket],
    description: {
      en: "High-waisted leather skirt with side zip. Sits just above the knee.",
      es: "Falda de cuero de cintura alta con cierre lateral. Llega justo sobre la rodilla.",
    },
  },
  {
    slug: "graphic-tee-womens",
    name: { en: "Baby Tee Graphic", es: "Baby Tee Gráfica" },
    category: "mujer",
    sub: "graphic-tees",
    tags: ["new", "sale"],
    price: 38,
    compareAt: 52,
    sizes: ["XS", "S", "M"],
    condition: "Good",
    brand: "Fruit of the Loom",
    images: [vintageStreetwear01, vintageStreetwear04],
    description: {
      en: "Fitted baby tee with a faded 90s print. Slightly cropped body.",
      es: "Baby tee ajustada con estampa desvanecida de los 90. Cuerpo ligeramente cortado.",
    },
  },
  {
    slug: "nylon-track-jacket",
    name: { en: "Nylon Track Jacket", es: "Chaqueta Deportiva de Nylon" },
    category: "mujer",
    sub: "hoodies-sweatshirts",
    tags: [],
    price: 68,
    sizes: ["S", "M", "L"],
    condition: "Excellent",
    brand: "Nike Vintage",
    images: [vintageStreetwear02, archiveStoreInterior],
    description: {
      en: "Color-blocked nylon track jacket with full zip and stand collar.",
      es: "Chaqueta deportiva de nylon en bloques de color con cierre completo y cuello alto.",
    },
  },
  {
    slug: "floral-midi-dress",
    name: { en: "Floral Midi Dress", es: "Vestido Midi Floral" },
    category: "mujer",
    sub: "dresses-sets",
    tags: ["sale"],
    price: 84,
    compareAt: 115,
    sizes: ["XS", "S", "M"],
    condition: "Very Good",
    brand: "Private Label",
    images: [vintageStreetwear03, archiveSweatshirt],
    description: {
      en: "Flowing floral midi with adjustable straps and a smocked bodice.",
      es: "Midi floral fluido con tirantes ajustables y cuerpo escarchado.",
    },
  },
  {
    slug: "kids-denim-jacket",
    name: { en: "Kids Denim Jacket", es: "Chaqueta de Mezclilla Infantil" },
    category: "ninos",
    sub: "outerwear-sweaters",
    tags: ["new"],
    price: 42,
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    condition: "Excellent",
    brand: "Levi's Kids",
    images: [archiveDenim, vintageStreetwear01],
    description: {
      en: "Classic trucker jacket in faded indigo, sized for kids 4–10.",
      es: "Chaqueta trucker clásica en índigo desvanecido, tallas 4–10 años.",
    },
  },
  {
    slug: "kids-crewneck",
    name: { en: "Kids Crewneck", es: "Sudadera Infantil" },
    category: "ninos",
    sub: "outerwear-sweaters",
    tags: [],
    price: 34,
    sizes: ["4Y", "6Y", "8Y"],
    condition: "Good",
    brand: "Gap Kids",
    images: [archiveSweatshirt, vintageStreetwear04],
    description: {
      en: "Soft cotton crewneck with a vintage college print.",
      es: "Sudadera de algodón suave con estampa vintage universitaria.",
    },
  },
  {
    slug: "trucker-cap-red",
    name: { en: "Trucker Cap", es: "Gorra Trucker" },
    category: "accesorios",
    sub: "snapbacks-trucker-caps",
    tags: ["new"],
    price: 32,
    sizes: ["One size"],
    condition: "Excellent",
    brand: "Vintage Deadstock",
    images: [archiveStoreInterior, vintageStreetwear02],
    description: {
      en: "Deadstock mesh trucker cap with a flat brim and snap closure.",
      es: "Gorra trucker deadstock con malla, visera plana y cierre snap.",
    },
  },
  {
    slug: "leather-belt-01",
    name: { en: "Leather Belt", es: "Cinturón de Cuero" },
    category: "accesorios",
    sub: "belts",
    tags: [],
    price: 45,
    sizes: ["32", "34", "36"],
    condition: "Good",
    brand: "Timberland",
    images: [archiveJacket, archiveDenim],
    description: {
      en: "Full-grain leather belt with a brushed brass buckle. Honest patina.",
      es: "Cinturón de cuero de grano completo con hebilla de latón cepillado. Pátina honesta.",
    },
  },
  {
    slug: "canvas-tote",
    name: { en: "Canvas Tote", es: "Tote de Lona" },
    category: "accesorios",
    sub: "bags-totes",
    tags: ["sale"],
    price: 28,
    compareAt: 40,
    sizes: ["One size"],
    condition: "Very Good",
    brand: "Manhattan Portage",
    images: [archiveStoreInterior, vintageStreetwear01],
    description: {
      en: "Heavy-duty canvas tote with interior pocket and shoulder strap.",
      es: "Tote de lona resistente con bolsillo interior y correa de hombro.",
    },
  },
  {
    slug: "aviator-sunglasses",
    name: { en: "Aviator Sunglasses", es: "Gafas Aviador" },
    category: "accesorios",
    sub: "sunglasses",
    tags: ["new"],
    price: 58,
    sizes: ["One size"],
    condition: "Excellent",
    brand: "Ray-Ban Archive",
    images: [vintageStreetwear02, archiveStoreInterior],
    description: {
      en: "Vintage aviators with gold frames and gradient lenses. Original case included.",
      es: "Aviador vintage con montura dorada y lentes degradadas. Estuche original incluido.",
    },
  },
  {
    slug: "ribbed-beanie",
    name: { en: "Ribbed Beanie", es: "Gorro de Punto" },
    category: "accesorios",
    sub: "beanies",
    tags: [],
    price: 28,
    sizes: ["One size"],
    condition: "Good",
    brand: "Vintage Deadstock",
    images: [archiveSweatshirt, vintageStreetwear04],
    description: {
      en: "Fine-gauge ribbed beanie with a folded cuff. Soft, warm, no branding.",
      es: "Gorro de punto acanalado con vuelta fina. Suave, cálido, sin marca.",
    },
  },
  {
    slug: "silk-scarf",
    name: { en: "Silk Scarf", es: "Bufanda de Seda" },
    category: "accesorios",
    sub: "scarves",
    tags: ["sale"],
    price: 22,
    compareAt: 30,
    sizes: ["One size"],
    condition: "Excellent",
    brand: "Private Label",
    images: [vintageStreetwear01, archiveSweatshirt],
    description: {
      en: "Printed silk scarf with hand-rolled edges. Wear it on your neck, hair, or bag.",
      es: "Bufanda de seda estampada con bordes enrollados a mano. Úsala en el cuello, el pelo o el bolso.",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function isValidCategory(value: string): value is Category {
  return (CATEGORIES as string[]).includes(value);
}

export function getByCategory(category: string): Product[] {
  if (category === "nuevos") return products.filter((p) => p.tags.includes("new"));
  if (category === "ofertas") return products.filter((p) => p.tags.includes("sale"));
  if (!isValidCategory(category)) return [];
  return products.filter((p) => p.category === category);
}

const SUB_ALIASES: Record<string, string> = {
  "levis-archivo": "levis-archive",
};

export function getBySub(category: string, sub: string): Product[] {
  const key = SUB_ALIASES[sub] ?? sub;
  const inCategory = getByCategory(category);
  const direct = inCategory.filter((p) => p.sub === key);
  if (direct.length > 0) return direct;
  const brandLocal = inCategory.filter((p) => slugify(p.brand) === key);
  if (brandLocal.length > 0) return brandLocal;
  return products.filter((p) => slugify(p.brand) === key);
}

export function getSubsForCategory(category: string): string[] {
  const withProducts = new Set(getByCategory(category).map((p) => p.sub));
  const groups = NAV_SUBS[category];
  const ordered: string[] = [];
  if (groups) {
    for (const group of groups) {
      for (const item of group.items) {
        if (withProducts.has(item.slug)) ordered.push(item.slug);
      }
    }
  }
  for (const slug of withProducts) {
    if (!ordered.includes(slug)) ordered.push(slug);
  }
  return ordered;
}

export function getFeatured(limit = 8): Product[] {
  return products.filter((p) => p.tags.includes("new")).slice(0, limit);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const candidates = products.filter((p) => p.slug !== product.slug);
  const sameSub = candidates.filter(
    (p) => p.category === product.category && p.sub === product.sub,
  );
  const sameCategory = candidates.filter(
    (p) => p.category === product.category && p.sub !== product.sub,
  );
  const others = candidates.filter((p) => p.category !== product.category);
  return [...sameSub, ...sameCategory, ...others].slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [p.name.en, p.name.es, p.brand, p.sub, p.category].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}
