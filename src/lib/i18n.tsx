import { createContext, useContext, useState } from "react";

type Lang = "en" | "es";

const translations = {
  en: {
    heroKicker: "NEW YORK — CURATED ARCHIVE",
    heroTitle: "True Vintage, Brand New",
    heroTagline: "AUTHENTIC VINTAGE STORE",
    heroEst: "EST. NYC",
    heroOneOfOne: "ONE OF ONE",
    lookbookEdit: "THE NEW YORK EDIT / 001",
    lookbookTitle1: "AUTHENTIC",
    lookbookTitle2: "VINTAGE STORE",
    lookbookDesc: "One-of-one streetwear, sourced by hand. Worn before.\nReady for what's next.",
    lookbookCta: "SHOP THE DROP",
    announcementMessages: [
      {
        text: "Member gift with purchase of $200+.",
        links: [
          { label: "Join", href: "#join" },
          { label: "Log in", href: "#login" },
        ],
      },
      {
        text: "The 2026 TCS New York City Marathon Collection.",
        links: [{ label: "Shop now", href: "#shop" }],
      },
      { text: "Free shipping on orders over $150.", links: [{ label: "Details", href: "#shipping" }] },
      { text: "New arrivals every week.", links: [{ label: "Discover", href: "#new" }] },
    ],
    helpLabel: "Help",
    helpOptions: [
      { label: "Order Status", href: "#order-status" },
      { label: "Return Order", href: "#return" },
      { label: "FAQ", href: "#faq" },
      { label: "Help", href: "#help" },
    ],
    loginBtn: "Log in",
    signupBtn: "Sign up",
    nav: {
      hombre: "MEN",
      mujer: "WOMEN",
      ninos: "KIDS",
      accesorios: "ACCESSORIES",
      nuevos: "NEW",
      ofertas: "SALE",
      verTodo: "VIEW ALL",
      ropaSuperior: "TOPS",
      ropaInferior: "BOTTOMS",
      calzado: "FOOTWEAR",
      otros: "OTHERS",
      cabeza: "HEADWEAR",
      equipaje: "BAGS",
      subHombreRopa: ["Jackets & Coats", "T-Shirts & Polos", "Hoodies", "Shirts & Flannels", "Sport Jerseys"],
      subHombreInferior: ["Vintage Jeans", "Cargo & Work Pants", "Joggers", "Shorts"],
      subHombreCalzado: ["Sneakers & Retro", "Boots", "Sandals"],
      subMujerRopa: ["Tops & Corsets", "Graphic Tees", "Hoodies & Sweatshirts", "Jackets & Coats"],
      subMujerInferior: ["Jeans & Pants", "Skirts (Mini/Maxi)", "Shorts", "Dresses & Sets"],
      subMujerCalzado: ["Sneakers", "Boots & Platforms", "Sandals"],
      subNinosRopa: ["T-Shirts & Polos", "Outerwear & Sweaters", "Pants & Jeans", "Sets"],
      subNinosCalzado: ["Shoes", "Caps & Backpacks", "Baby Clothes (0-24m)"],
      subAccCabeza: ["Snapbacks & Trucker Caps", "Beanies", "Bucket Hats"],
      subAccEquipaje: ["Backpacks", "Bags & Totes", "Fanny Packs"],
      subAccOtros: ["Sunglasses", "Belts", "Scarves"],
    },
  },
  es: {
    heroKicker: "NUEVA YORK — ARCHIVO CURADO",
    heroTitle: "Vintage Auténtico, Como Nuevo",
    heroTagline: "AUTHENTIC VINTAGE STORE",
    heroEst: "EST. CDMX",
    heroOneOfOne: "ÚNICO EN EL MUNDO",
    lookbookEdit: "LA EDICIÓN DE NUEVA YORK / 001",
    lookbookTitle1: "AUTHENTIC",
    lookbookTitle2: "VINTAGE STORE",
    lookbookDesc: "Streetwear único, seleccionado a mano.\nUsado antes. Listo para lo que viene.",
    lookbookCta: "COMPRAR LA COLECCIÓN",
    announcementMessages: [
      {
        text: "Regalo para miembros en compras de $200+.",
        links: [
          { label: "Unirse", href: "#join" },
          { label: "Iniciar sesión", href: "#login" },
        ],
      },
      {
        text: "Colección Maratón de Nueva York 2026.",
        links: [{ label: "Comprar ahora", href: "#shop" }],
      },
      { text: "Envío gratis en compras mayores a $150.", links: [{ label: "Detalles", href: "#shipping" }] },
      { text: "Nuevos lanzamientos cada semana.", links: [{ label: "Descubrir", href: "#new" }] },
    ],
    helpLabel: "Ayuda",
    helpOptions: [
      { label: "Estado del pedido", href: "#order-status" },
      { label: "Devolver pedido", href: "#return" },
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Ayuda", href: "#help" },
    ],
    loginBtn: "Iniciar sesión",
    signupBtn: "Registrarse",
    nav: {
      hombre: "HOMBRE",
      mujer: "MUJER",
      ninos: "NIÑOS",
      accesorios: "ACCESORIOS",
      nuevos: "NUEVOS",
      ofertas: "OFERTAS",
      verTodo: "VER TODO",
      ropaSuperior: "ROPA SUPERIOR",
      ropaInferior: "ROPA INFERIOR",
      calzado: "CALZADO",
      otros: "OTROS",
      cabeza: "CABEZA",
      equipaje: "EQUIPAJE",
      subHombreRopa: ["Chaquetas y Abrigos", "Camisetas y Polos", "Sudaderas", "Camisas y Franelas", "Jerseys Deportivos"],
      subHombreInferior: ["Jeans Vintage", "Pantalones Cargo & Trabajo", "Joggers", "Shorts y Bermudas"],
      subHombreCalzado: ["Sneakers & Retro", "Botas", "Sandalias"],
      subMujerRopa: ["Tops y Corsets", "Camisetas Gráficas", "Sudaderas y Buzos", "Chaquetas y Abrigos"],
      subMujerInferior: ["Jeans y Pantalones", "Faldas (Mini/Maxi)", "Shorts", "Vestidos y Conjuntos"],
      subMujerCalzado: ["Deportivos", "Botas y Plataformas", "Sandalias"],
      subNinosRopa: ["Camisetas y Polos", "Abrigos y Chompas", "Pantalones y Jeans", "Conjuntos"],
      subNinosCalzado: ["Zapatos", "Gorras y Mochilas", "Ropa de Bebé (0-24m)"],
      subAccCabeza: ["Gorras (Snapbacks/Trucker)", "Gorros (Beanies)", "Sombreros (Bucket Hats)"],
      subAccEquipaje: ["Mochilas", "Bolsos y Totes", "Cangureras"],
      subAccOtros: ["Gafas de Sol", "Cinturones", "Bufandas"],
    },
  },
} as const;

export type Translations = (typeof translations)["en"];

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
