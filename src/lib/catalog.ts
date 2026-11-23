export type CatalogLang = "en" | "es";

export type CategorySlug = "hombre" | "mujer" | "ninos" | "accesorios" | "nuevos" | "ofertas";

export type NavLabelKey =
  | "ropaSuperior"
  | "ropaInferior"
  | "calzado"
  | "estilos"
  | "accesorios"
  | "cabeza"
  | "equipaje"
  | "otros"
  | "marcas";

export function slugify(label: string): string {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const CATEGORY_LABELS: Record<CategorySlug, { en: string; es: string }> = {
  hombre: { en: "Men", es: "Hombre" },
  mujer: { en: "Women", es: "Mujer" },
  ninos: { en: "Kids", es: "Niños" },
  accesorios: { en: "Accessories", es: "Accesorios" },
  nuevos: { en: "New Arrivals", es: "Nuevos ingresos" },
  ofertas: { en: "Sale", es: "Ofertas" },
};

export interface SubDef {
  slug: string;
  en: string;
  es: string;
}

export interface SubGroup {
  key: NavLabelKey;
  items: SubDef[];
}

export const NAV_SUBS: Record<string, SubGroup[]> = {
  hombre: [
    {
      key: "ropaSuperior",
      items: [
        { slug: "jackets-coats", en: "Jackets & Coats", es: "Chaquetas y Abrigos" },
        { slug: "t-shirts-polos", en: "T-Shirts & Polos", es: "Camisetas y Polos" },
        { slug: "hoodies", en: "Hoodies", es: "Sudaderas" },
        { slug: "shirts-flannels", en: "Shirts & Flannels", es: "Camisas y Franelas" },
        { slug: "vests-gilets", en: "Vests & Gilets", es: "Chalecos y Gilets" },
        { slug: "knitwear-sweaters", en: "Knitwear & Sweaters", es: "Punto y Suéteres" },
        { slug: "sport-jerseys", en: "Sport Jerseys", es: "Jerseys Deportivos" },
      ],
    },
    {
      key: "ropaInferior",
      items: [
        { slug: "vintage-jeans", en: "Vintage Jeans", es: "Jeans Vintage" },
        {
          slug: "cargo-work-pants",
          en: "Cargo & Work Pants",
          es: "Pantalones Cargo & Trabajo",
        },
        {
          slug: "dress-pants-tailoring",
          en: "Dress Pants & Tailoring",
          es: "Pantalones de Vestir",
        },
        { slug: "trackpants", en: "Trackpants", es: "Pantalones Deportivos" },
        { slug: "joggers", en: "Joggers", es: "Joggers" },
        { slug: "shorts", en: "Shorts", es: "Shorts y Bermudas" },
      ],
    },
    {
      key: "calzado",
      items: [
        { slug: "sneakers-retro", en: "Sneakers & Retro", es: "Sneakers & Retro" },
        { slug: "boots", en: "Boots", es: "Botas" },
        {
          slug: "loafers-casual",
          en: "Loafers & Casual",
          es: "Zapatos Casuales & Loafers",
        },
        { slug: "sandals", en: "Sandals", es: "Sandalias" },
      ],
    },
    {
      key: "estilos",
      items: [
        { slug: "y2k-aesthetic", en: "Y2K Aesthetic", es: "Estética Y2K" },
        { slug: "90s-classics", en: "90s Classics", es: "Clásicos de los 90s" },
        { slug: "workwear-utility", en: "Workwear & Utility", es: "Workwear & Utility" },
        { slug: "oversize-unisex", en: "Oversize / Unisex", es: "Oversize / Unisex" },
      ],
    },
  ],
  mujer: [
    {
      key: "ropaSuperior",
      items: [
        { slug: "tops-corsets", en: "Tops & Corsets", es: "Tops y Corsets" },
        { slug: "graphic-tees", en: "Graphic Tees", es: "Camisetas Gráficas" },
        {
          slug: "hoodies-sweatshirts",
          en: "Hoodies & Sweatshirts",
          es: "Sudaderas y Buzos",
        },
        { slug: "jackets-coats", en: "Jackets & Coats", es: "Chaquetas y Abrigos" },
        { slug: "vests-gilets", en: "Vests & Gilets", es: "Chalecos y Gilets" },
        {
          slug: "knitwear-cardigans",
          en: "Knitwear & Cardigans",
          es: "Punto y Cardigans",
        },
      ],
    },
    {
      key: "ropaInferior",
      items: [
        { slug: "jeans-pants", en: "Jeans & Pants", es: "Jeans y Pantalones" },
        { slug: "skirts-mini-maxi", en: "Skirts (Mini/Maxi)", es: "Faldas (Mini/Maxi)" },
        {
          slug: "dress-pants-tailoring",
          en: "Dress Pants & Tailoring",
          es: "Pantalones de Vestir",
        },
        { slug: "trackpants", en: "Trackpants", es: "Pantalones Deportivos" },
        { slug: "shorts", en: "Shorts", es: "Shorts" },
        { slug: "dresses-sets", en: "Dresses & Sets", es: "Vestidos y Conjuntos" },
      ],
    },
    {
      key: "calzado",
      items: [
        { slug: "sneakers", en: "Sneakers", es: "Deportivos" },
        {
          slug: "boots-platforms",
          en: "Boots & Platforms",
          es: "Botas y Plataformas",
        },
        {
          slug: "loafers-mules",
          en: "Loafers & Mules",
          es: "Zapatos Casuales & Mules",
        },
        { slug: "sandals", en: "Sandals", es: "Sandalias" },
      ],
    },
    {
      key: "estilos",
      items: [
        { slug: "y2k-aesthetic", en: "Y2K Aesthetic", es: "Estética Y2K" },
        { slug: "90s-classics", en: "90s Classics", es: "Clásicos de los 90s" },
        { slug: "workwear-utility", en: "Workwear & Utility", es: "Workwear & Utility" },
        { slug: "oversize-unisex", en: "Oversize / Unisex", es: "Oversize / Unisex" },
      ],
    },
  ],
  ninos: [
    {
      key: "ropaSuperior",
      items: [
        { slug: "t-shirts-polos", en: "T-Shirts & Polos", es: "Camisetas y Polos" },
        {
          slug: "outerwear-sweaters",
          en: "Outerwear & Sweaters",
          es: "Abrigos y Chompas",
        },
        { slug: "vests", en: "Vests", es: "Chalecos" },
        { slug: "sets", en: "Sets", es: "Conjuntos" },
      ],
    },
    {
      key: "ropaInferior",
      items: [
        { slug: "pants-jeans", en: "Pants & Jeans", es: "Pantalones y Jeans" },
        { slug: "shorts", en: "Shorts", es: "Shorts" },
        { slug: "trackpants", en: "Trackpants", es: "Pantalones Deportivos" },
      ],
    },
    {
      key: "calzado",
      items: [
        { slug: "shoes", en: "Shoes", es: "Zapatos" },
        { slug: "sneakers", en: "Sneakers", es: "Deportivos" },
      ],
    },
    {
      key: "accesorios",
      items: [
        { slug: "caps-backpacks", en: "Caps & Backpacks", es: "Gorras y Mochilas" },
        {
          slug: "baby-clothes-0-24m",
          en: "Baby Clothes (0-24m)",
          es: "Ropa de Bebé (0-24m)",
        },
      ],
    },
  ],
  accesorios: [
    {
      key: "cabeza",
      items: [
        {
          slug: "snapbacks-trucker-caps",
          en: "Snapbacks & Trucker Caps",
          es: "Gorras (Snapbacks/Trucker)",
        },
        { slug: "beanies", en: "Beanies", es: "Gorros (Beanies)" },
        { slug: "bucket-hats", en: "Bucket Hats", es: "Sombreros (Bucket Hats)" },
        { slug: "berets", en: "Berets", es: "Boinas" },
      ],
    },
    {
      key: "equipaje",
      items: [
        { slug: "backpacks", en: "Backpacks", es: "Mochilas" },
        { slug: "bags-totes", en: "Bags & Totes", es: "Bolsos y Totes" },
        { slug: "fanny-packs", en: "Fanny Packs", es: "Cangureras" },
        { slug: "duffle-bags", en: "Duffle Bags", es: "Bolsos Deportivos" },
      ],
    },
    {
      key: "otros",
      items: [
        { slug: "sunglasses", en: "Sunglasses", es: "Gafas de Sol" },
        { slug: "belts", en: "Belts", es: "Cinturones" },
        { slug: "scarves", en: "Scarves", es: "Bufandas" },
        { slug: "jewelry-chains", en: "Jewelry & Chains", es: "Joyería y Cadenas" },
      ],
    },
  ],
};

const SUB_LABEL_INDEX: Record<string, Record<string, { en: string; es: string }>> = {};
for (const [category, groups] of Object.entries(NAV_SUBS)) {
  const index: Record<string, { en: string; es: string }> = {};
  for (const group of groups) {
    for (const item of group.items) {
      index[item.slug] = { en: item.en, es: item.es };
    }
  }
  SUB_LABEL_INDEX[category] = index;
}

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export function getCategoryLabel(category: string, lang: CatalogLang): string {
  return CATEGORY_LABELS[category as CategorySlug]?.[lang] ?? prettifySlug(category);
}

export function getSubLabel(category: string, sub: string, lang: CatalogLang): string {
  const labels = SUB_LABEL_INDEX[category]?.[sub];
  if (labels) return labels[lang];
  const fallback = Object.values(SUB_LABEL_INDEX).find((index) => index[sub])?.[sub];
  if (fallback) return fallback[lang];
  return prettifySlug(sub);
}

export interface RecTarget {
  category: string;
  sub?: string;
}

export const RECOMMENDATIONS: Record<string, RecTarget[]> = {
  hombre: [
    { category: "mujer" },
    { category: "accesorios" },
    { category: "nuevos" },
    { category: "ofertas" },
  ],
  mujer: [
    { category: "hombre" },
    { category: "accesorios" },
    { category: "nuevos" },
    { category: "ofertas" },
  ],
  ninos: [
    { category: "hombre" },
    { category: "mujer" },
    { category: "accesorios" },
    { category: "nuevos" },
  ],
  accesorios: [
    { category: "hombre" },
    { category: "mujer" },
    { category: "nuevos" },
    { category: "ofertas" },
  ],
  nuevos: [
    { category: "ofertas" },
    { category: "hombre" },
    { category: "mujer" },
    { category: "accesorios" },
  ],
  ofertas: [
    { category: "nuevos" },
    { category: "hombre" },
    { category: "mujer" },
    { category: "accesorios" },
  ],
  "jackets-coats": [
    { category: "hombre", sub: "vintage-jeans" },
    { category: "mujer", sub: "hoodies-sweatshirts" },
    { category: "accesorios", sub: "snapbacks-trucker-caps" },
    { category: "accesorios", sub: "belts" },
    { category: "accesorios", sub: "sunglasses" },
  ],
  "t-shirts-polos": [
    { category: "hombre", sub: "jackets-coats" },
    { category: "hombre", sub: "vintage-jeans" },
    { category: "mujer", sub: "graphic-tees" },
    { category: "accesorios", sub: "snapbacks-trucker-caps" },
  ],
  "vintage-jeans": [
    { category: "hombre", sub: "jackets-coats" },
    { category: "accesorios", sub: "belts" },
    { category: "hombre", sub: "t-shirts-polos" },
    { category: "accesorios", sub: "sunglasses" },
  ],
  "knitwear-cardigans": [
    { category: "mujer", sub: "skirts-mini-maxi" },
    { category: "accesorios", sub: "scarves" },
    { category: "accesorios", sub: "beanies" },
    { category: "mujer", sub: "jackets-coats" },
  ],
  "skirts-mini-maxi": [
    { category: "mujer", sub: "knitwear-cardigans" },
    { category: "accesorios", sub: "belts" },
    { category: "mujer", sub: "dresses-sets" },
    { category: "accesorios", sub: "sunglasses" },
  ],
  "graphic-tees": [
    { category: "hombre", sub: "t-shirts-polos" },
    { category: "mujer", sub: "jackets-coats" },
    { category: "accesorios", sub: "snapbacks-trucker-caps" },
    { category: "mujer", sub: "skirts-mini-maxi" },
  ],
  "hoodies-sweatshirts": [
    { category: "hombre", sub: "jackets-coats" },
    { category: "accesorios", sub: "beanies" },
    { category: "hombre", sub: "vintage-jeans" },
    { category: "mujer", sub: "graphic-tees" },
  ],
  "dresses-sets": [
    { category: "mujer", sub: "skirts-mini-maxi" },
    { category: "accesorios", sub: "sunglasses" },
    { category: "accesorios", sub: "belts" },
    { category: "mujer", sub: "knitwear-cardigans" },
  ],
  "outerwear-sweaters": [
    { category: "hombre", sub: "jackets-coats" },
    { category: "accesorios", sub: "beanies" },
    { category: "mujer", sub: "hoodies-sweatshirts" },
    { category: "ninos", sub: "t-shirts-polos" },
  ],
  "snapbacks-trucker-caps": [
    { category: "accesorios", sub: "sunglasses" },
    { category: "accesorios", sub: "belts" },
    { category: "accesorios", sub: "bags-totes" },
    { category: "hombre", sub: "jackets-coats" },
  ],
  sunglasses: [
    { category: "accesorios", sub: "snapbacks-trucker-caps" },
    { category: "accesorios", sub: "scarves" },
    { category: "mujer", sub: "dresses-sets" },
    { category: "hombre", sub: "t-shirts-polos" },
  ],
  beanies: [
    { category: "accesorios", sub: "scarves" },
    { category: "accesorios", sub: "sunglasses" },
    { category: "hombre", sub: "jackets-coats" },
    { category: "mujer", sub: "knitwear-cardigans" },
  ],
  belts: [
    { category: "hombre", sub: "vintage-jeans" },
    { category: "accesorios", sub: "bags-totes" },
    { category: "accesorios", sub: "sunglasses" },
    { category: "hombre", sub: "jackets-coats" },
  ],
  "bags-totes": [
    { category: "accesorios", sub: "belts" },
    { category: "accesorios", sub: "snapbacks-trucker-caps" },
    { category: "mujer", sub: "dresses-sets" },
    { category: "hombre", sub: "vintage-jeans" },
  ],
  scarves: [
    { category: "accesorios", sub: "beanies" },
    { category: "accesorios", sub: "sunglasses" },
    { category: "mujer", sub: "knitwear-cardigans" },
    { category: "hombre", sub: "jackets-coats" },
  ],
};

export function getRecommendations(key: string): RecTarget[] {
  return RECOMMENDATIONS[key] ?? [];
}

export function getRecLabel(target: RecTarget, lang: CatalogLang): string {
  if (target.sub) return getSubLabel(target.category, target.sub, lang);
  return getCategoryLabel(target.category, lang);
}
