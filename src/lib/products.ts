import vintageStreetwear01 from "@/assets/vintage-streetwear-01.jpg";
import vintageStreetwear02 from "@/assets/vintage-streetwear-02.jpg";
import vintageStreetwear03 from "@/assets/vintage-streetwear-03.jpg";
import vintageStreetwear04 from "@/assets/vintage-streetwear-04.jpg";
import archiveDenim from "@/assets/archive-denim.jpg";
import archiveJacket from "@/assets/archive-jacket.jpg";
import archiveStoreInterior from "@/assets/archive-store-interior.jpg";
import archiveSweatshirt from "@/assets/archive-sweatshirt.jpg";
import photoVarsityJacket from "@/assets/products/varsity-jacket-ny.jpg";
import photoRacingJacket from "@/assets/products/racing-jacket-01.jpg";
import photoLeatherBomber from "@/assets/products/leather-bomber.jpg";
import photoGraphicTee from "@/assets/products/graphic-tee-archive.jpg";
import photoSelvedgeJeans from "@/assets/products/selvedge-jeans-501.jpg";
import photoChoreCoat from "@/assets/products/workwear-chore-coat.jpg";
import photoCroppedCardigan from "@/assets/products/cropped-cardigan.jpg";
import photoLeatherSkirt from "@/assets/products/leather-skirt-90s.jpg";
import photoWomensGraphicTee from "@/assets/products/graphic-tee-womens.jpg";
import photoTrackJacket from "@/assets/products/nylon-track-jacket.jpg";
import photoFloralDress from "@/assets/products/floral-midi-dress.jpg";
import photoKidsDenimJacket from "@/assets/products/kids-denim-jacket.jpg";
import photoKidsCrewneck from "@/assets/products/kids-crewneck.jpg";
import photoTruckerCap from "@/assets/products/trucker-cap-red.jpg";
import photoLeatherBelt from "@/assets/products/leather-belt-01.jpg";
import photoCanvasTote from "@/assets/products/canvas-tote.jpg";
import photoAviatorSunglasses from "@/assets/products/aviator-sunglasses.jpg";
import photoRibbedBeanie from "@/assets/products/ribbed-beanie.jpg";
import photoSilkScarf from "@/assets/products/silk-scarf.jpg";
import photoFlannel from "@/assets/products/flannel-shirt-90s.jpg";
import photoCollegeHoodie from "@/assets/products/college-hoodie-grey.jpg";
import photoCargoPants from "@/assets/products/cargo-pants-khaki.jpg";
import photoHoundstoothBlazer from "@/assets/products/houndstooth-blazer.jpg";
import photoMomJeans from "@/assets/products/mom-jeans-light.jpg";
import photoShoulderBag from "@/assets/products/leather-shoulder-bag.jpg";
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
    images: [photoVarsityJacket, archiveJacket],
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
    images: [photoRacingJacket, archiveStoreInterior],
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
    images: [photoLeatherBomber, archiveJacket],
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
    images: [photoGraphicTee, archiveSweatshirt],
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
    images: [photoSelvedgeJeans, vintageStreetwear04],
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
    images: [photoChoreCoat, vintageStreetwear02],
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
    images: [photoCroppedCardigan, archiveSweatshirt],
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
    images: [photoLeatherSkirt, archiveJacket],
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
    images: [photoWomensGraphicTee, vintageStreetwear04],
    description: {
      en: "Fitted baby tee with a faded 90s print. Slightly cropped body.",
      es: "Baby tee ajustada con estampa desvanecida de los 90. Cuerpo ligeramente cortado.",
    },
  },
  {
    slug: "nylon-track-jacket",
    name: { en: "Nylon Track Jacket", es: "Chaqueta Deportiva de Nylon" },
    category: "mujer",
    sub: "jackets-coats",
    tags: [],
    price: 68,
    sizes: ["S", "M", "L"],
    condition: "Excellent",
    brand: "Nike Vintage",
    images: [photoTrackJacket, archiveStoreInterior],
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
    images: [photoFloralDress, archiveSweatshirt],
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
    images: [photoKidsDenimJacket, vintageStreetwear01],
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
    images: [photoKidsCrewneck, vintageStreetwear04],
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
    images: [photoTruckerCap, vintageStreetwear02],
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
    images: [photoLeatherBelt, archiveDenim],
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
    images: [photoCanvasTote, vintageStreetwear01],
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
    images: [photoAviatorSunglasses, archiveStoreInterior],
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
    images: [photoRibbedBeanie, vintageStreetwear04],
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
    images: [photoSilkScarf, archiveSweatshirt],
    description: {
      en: "Printed silk scarf with hand-rolled edges. Wear it on your neck, hair, or bag.",
      es: "Bufanda de seda estampada con bordes enrollados a mano. Úsala en el cuello, el pelo o el bolso.",
    },
  },
  {
    slug: "flannel-shirt-90s",
    name: { en: "1990s Buffalo Check Flannel", es: "Franela Buffalo Check años 90" },
    category: "hombre",
    sub: "shirts-flannels",
    tags: ["new"],
    price: 78,
    sizes: ["M", "L", "XL"],
    condition: "Very Good",
    brand: "L.L.Bean Archive",
    images: [photoFlannel],
    description: {
      en: "Heavy brushed cotton flannel with twin flap pockets. Soft from decades of wear.",
      es: "Franela de algodón cepillado con dos bolsillos de solapa. Suave tras décadas de uso.",
    },
  },
  {
    slug: "college-hoodie-grey",
    name: { en: "Faded University Hoodie", es: "Sudadera Universitaria Desgastada" },
    category: "hombre",
    sub: "hoodies",
    tags: ["new"],
    price: 96,
    sizes: ["L", "XL"],
    condition: "Good",
    brand: "Champion Archive",
    images: [photoCollegeHoodie],
    description: {
      en: "Sun-faded heather grey hoodie with cracked collegiate print and kangaroo pocket.",
      es: "Sudadera gris jaspeado desgastada por el sol con estampado universitario craquelado.",
    },
  },
  {
    slug: "cargo-pants-khaki",
    name: { en: "Khaki Work Cargo Pants", es: "Pantalón Cargo Caqui" },
    category: "hombre",
    sub: "cargo-work-pants",
    tags: ["sale"],
    price: 64,
    compareAt: 88,
    sizes: ["30", "32", "34"],
    condition: "Excellent",
    brand: "Carhartt Archive",
    images: [photoCargoPants],
    description: {
      en: "Durable cotton twill cargo pants with flap side pockets. Broken-in fit.",
      es: "Pantalón cargo de sarga de algodón resistente con bolsillos laterales de solapa.",
    },
  },
  {
    slug: "houndstooth-blazer",
    name: { en: "Oversized Houndstooth Blazer", es: "Blazer Pata de Gallo Oversize" },
    category: "mujer",
    sub: "jackets-coats",
    tags: ["new"],
    price: 142,
    sizes: ["S", "M"],
    condition: "Excellent",
    brand: "Max Mara Archive",
    images: [photoHoundstoothBlazer],
    description: {
      en: "Wool houndstooth blazer with strong shoulders and a relaxed 90s cut.",
      es: "Blazer de lana pata de gallo con hombros marcados y corte relajado de los 90.",
    },
  },
  {
    slug: "mom-jeans-light",
    name: { en: "Light Wash Mom Jeans", es: "Mom Jeans Lavado Claro" },
    category: "mujer",
    sub: "jeans-pants",
    tags: ["new"],
    price: 84,
    sizes: ["26", "28", "30"],
    condition: "Very Good",
    brand: "Levi's Archive",
    images: [photoMomJeans],
    description: {
      en: "High-rise tapered jeans in a naturally faded light wash. Rigid denim.",
      es: "Jeans de tiro alto y pierna cónica en lavado claro natural. Denim rígido.",
    },
  },
  {
    slug: "leather-shoulder-bag",
    name: { en: "Saddle Leather Shoulder Bag", es: "Bolso de Cuero Saddle" },
    category: "accesorios",
    sub: "bags-totes",
    tags: ["sale"],
    price: 110,
    compareAt: 145,
    sizes: ["One size"],
    condition: "Very Good",
    brand: "Coach Archive",
    images: [photoShoulderBag],
    description: {
      en: "Full-grain leather saddle bag with brass buckle and adjustable strap.",
      es: "Bolso saddle de cuero plena flor con hebilla de latón y correa ajustable.",
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
  return inCategory.filter((p) => slugify(p.brand) === key);
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
