import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Lang = "en" | "es";

const STORAGE_KEY = "avnyc-lang";

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
      {
        text: "Free shipping on orders over $150.",
        links: [{ label: "Details", href: "#shipping" }],
      },
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
    authPanel: {
      vol: "VOL. 01 / NEW MEMBER",
      number: "/ 10013",
      kicker: "NEW YORK — CURATED ARCHIVE",
      title: "STREET ARCHIVE",
      eyebrow: "MEMBERS ONLY / 001",
    },
    login: {
      title: "Welcome back",
      subtitle: "Sign in to your account to continue.",
      email: "Email",
      password: "Password",
      remember: "Remember me",
      forgot: "Forgot password?",
      cta: "Sign in",
      or: "or",
      google: "Continue with Google",
      apple: "Continue with Apple",
      noAccount: "Don't have an account?",
      signupLink: "Sign up",
    },
    signup: {
      title: "Create account",
      subtitle: "Join the crew and get 10% off your first order.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      agree: "I agree to the",
      terms: "Terms of Service",
      and: "and",
      privacy: "Privacy Policy",
      cta: "Create account",
      or: "or",
      google: "Continue with Google",
      hasAccount: "Already have an account?",
      loginLink: "Sign in",
    },
    nav: {
      unisex: "UNISEX",
      hombre: "MEN",
      mujer: "WOMEN",
      ninos: "KIDS",
      accesorios: "ACCESSORIES",
      nuevos: "NEW",
      ofertas: "SALE",
      verTodo: "VIEW ALL",
      verMarcas: "View all brands →",
      ropaSuperior: "TOPS",
      ropaInferior: "BOTTOMS",
      calzado: "FOOTWEAR",
      otros: "OTHERS",
      cabeza: "HEADWEAR",
      equipaje: "BAGS",
      joyeria: "JEWELRY",
      estilos: "STYLES",
      marcas: "BRANDS",
      bebe: "BABY",
      subUnisexRopa: [
        "Graphic Tees & Vintage Prints",
        "Hoodies & Sweatshirts",
        "Jackets & Outerwear",
        "Vests & Gilets",
        "Knitwear & Sweaters",
        "Shirts & Flannels",
      ],
      subUnisexInferior: [
        "Vintage Jeans",
        "Cargo & Work Pants",
        "Joggers & Sweatpants",
        "Dress Pants & Tailoring",
        "Shorts",
      ],
      subUnisexCalzado: [
        "Sneakers & Retro",
        "Boots",
        "Loafers & Casual",
        "Sandals",
      ],
      subUnisexEstilos: ["Y2K Aesthetic", "90s Classics", "Workwear & Utility", "Oversize"],
      subHombreRopa: [
        "Jackets & Coats",
        "T-Shirts & Polos",
        "Hoodies",
        "Shirts & Flannels",
        "Vests & Gilets",
        "Knitwear & Sweaters",
        "Sport Jerseys",
      ],
      subHombreInferior: [
        "Vintage Jeans",
        "Cargo & Work Pants",
        "Dress Pants & Tailoring",
        "Trackpants",
        "Joggers",
        "Shorts",
      ],
      subHombreCalzado: ["Sneakers & Retro", "Boots", "Loafers & Casual", "Sandals"],
      subHombreEstilos: ["Y2K Aesthetic", "90s Classics", "Workwear & Utility", "Oversize / Unisex"],
      subMujerRopa: [
        "Tops & Corsets",
        "Graphic Tees",
        "Hoodies & Sweatshirts",
        "Jackets & Coats",
        "Vests & Gilets",
        "Knitwear & Cardigans",
      ],
      subMujerInferior: [
        "Jeans & Pants",
        "Skirts (Mini/Maxi)",
        "Dress Pants & Tailoring",
        "Trackpants",
        "Shorts",
        "Dresses & Sets",
      ],
      subMujerCalzado: ["Sneakers", "Boots & Platforms", "Loafers & Mules", "Sandals"],
      subMujerEstilos: ["Y2K Aesthetic", "90s Classics", "Workwear & Utility", "Oversize / Unisex"],
      subNinosRopa: ["T-Shirts & Polos", "Outerwear & Sweaters", "Vests", "Sets"],
      subNinosInferior: ["Pants & Jeans", "Shorts", "Trackpants"],
      subNinosCalzado: ["Shoes", "Sneakers"],
      subNinosAccesorios: ["Caps & Backpacks", "Baby Clothes (0-24m)"],
      subAccCabeza: ["Snapbacks & Trucker Caps", "Beanies", "Bucket Hats", "Berets"],
      subAccEquipaje: ["Backpacks", "Bags & Totes", "Fanny Packs", "Duffle Bags"],
      subAccOtros: ["Sunglasses", "Belts", "Scarves", "Jewelry & Chains"],
      subMarcas: [
        "Nike Vintage",
        "Carhartt WIP",
        "Supreme",
        "Stüssy",
        "Levi's Archive",
      ],
    },
    footer: {
      newsletter: {
        title: "Join the crew",
        subtitle: "Get 10% off your first order and stay in the loop.",
        placeholder: "Enter your email",
        cta: "Subscribe",
        thanks: "Welcome to the crew. Check your inbox.",
      },
      brand: {
        desc: "One-of-one streetwear sourced from the streets of New York. Authentic vintage, curated with intention.",
      },
      shop: {
        title: "Shop",
        hombre: "Men",
        mujer: "Women",
        ninos: "Kids",
        accesorios: "Accessories",
        nuevos: "New Arrivals",
        ofertas: "Sale",
      },
      help: {
        title: "Help",
        faq: "FAQ",
        shipping: "Shipping & Delivery",
        returns: "Returns & Exchanges",
        sizeGuide: "Size Guide",
        contact: "Contact Us",
        orderStatus: "Order Status",
      },
      about: {
        title: "About",
        story: "Our Story",
        sustainability: "Sustainability",
        careers: "Careers",
        press: "Press",
        stores: "Store Locator",
      },
      payment: {
        label: "We accept",
      },
      bottom: {
        rights: "All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cookies: "Cookie Policy",
      },
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
      {
        text: "Envío gratis en compras mayores a $150.",
        links: [{ label: "Detalles", href: "#shipping" }],
      },
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
    authPanel: {
      vol: "VOL. 01 / NUEVO MIEMBRO",
      number: "/ 10013",
      kicker: "NUEVA YORK — ARCHIVO CURADO",
      title: "ARCHIVO CALLEJERO",
      eyebrow: "SOLO MIEMBROS / 001",
    },
    login: {
      title: "Bienvenido de vuelta",
      subtitle: "Inicia sesión en tu cuenta para continuar.",
      email: "Correo electrónico",
      password: "Contraseña",
      remember: "Recordarme",
      forgot: "¿Olvidaste tu contraseña?",
      cta: "Iniciar sesión",
      or: "o",
      google: "Continuar con Google",
      apple: "Continuar con Apple",
      noAccount: "¿No tienes cuenta?",
      signupLink: "Regístrate",
    },
    signup: {
      title: "Crear cuenta",
      subtitle: "Únete al crew y obtén 10% de descuento en tu primer pedido.",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      agree: "Acepto los",
      terms: "Términos de Servicio",
      and: "y la",
      privacy: "Política de Privacidad",
      cta: "Crear cuenta",
      or: "o",
      google: "Continuar con Google",
      hasAccount: "¿Ya tienes cuenta?",
      loginLink: "Inicia sesión",
    },
    nav: {
      unisex: "UNISEX",
      hombre: "HOMBRE",
      mujer: "MUJER",
      ninos: "NIÑOS",
      accesorios: "ACCESORIOS",
      nuevos: "NUEVOS",
      ofertas: "OFERTAS",
      verTodo: "VER TODO",
      verMarcas: "Ver todas las marcas →",
      ropaSuperior: "ROPA SUPERIOR",
      ropaInferior: "ROPA INFERIOR",
      calzado: "CALZADO",
      otros: "OTROS",
      cabeza: "CABEZA",
      equipaje: "EQUIPAJE",
      joyeria: "JOYERÍA",
      estilos: "ESTILOS",
      marcas: "MARCAS",
      bebe: "BEBÉ",
      subUnisexRopa: [
        "Camisetas Gráficas & Vintage",
        "Sudaderas y Buzos",
        "Chaquetas y Abrigos",
        "Chalecos y Gilets",
        "Punto y Suéteres",
        "Camisas y Franelas",
      ],
      subUnisexInferior: [
        "Jeans Vintage",
        "Pantalones Cargo & Trabajo",
        "Joggers y Sudadera",
        "Pantalones de Vestir",
        "Shorts",
      ],
      subUnisexCalzado: [
        "Sneakers & Retro",
        "Botas",
        "Zapatos Casuales & Loafers",
        "Sandalias",
      ],
      subUnisexEstilos: ["Estética Y2K", "Clásicos de los 90s", "Workwear & Utility", "Oversize"],
      subHombreRopa: [
        "Chaquetas y Abrigos",
        "Camisetas y Polos",
        "Sudaderas",
        "Camisas y Franelas",
        "Chalecos y Gilets",
        "Punto y Suéteres",
        "Jerseys Deportivos",
      ],
      subHombreInferior: [
        "Jeans Vintage",
        "Pantalones Cargo & Trabajo",
        "Pantalones de Vestir",
        "Pantalones Deportivos",
        "Joggers",
        "Shorts y Bermudas",
      ],
      subHombreCalzado: ["Sneakers & Retro", "Botas", "Zapatos Casuales & Loafers", "Sandalias"],
      subHombreEstilos: ["Estética Y2K", "Clásicos de los 90s", "Workwear & Utility", "Oversize / Unisex"],
      subMujerRopa: [
        "Tops y Corsets",
        "Camisetas Gráficas",
        "Sudaderas y Buzos",
        "Chaquetas y Abrigos",
        "Chalecos y Gilets",
        "Punto y Cardigans",
      ],
      subMujerInferior: [
        "Jeans y Pantalones",
        "Faldas (Mini/Maxi)",
        "Pantalones de Vestir",
        "Pantalones Deportivos",
        "Shorts",
        "Vestidos y Conjuntos",
      ],
      subMujerCalzado: ["Deportivos", "Botas y Plataformas", "Zapatos Casuales & Mules", "Sandalias"],
      subMujerEstilos: ["Estética Y2K", "Clásicos de los 90s", "Workwear & Utility", "Oversize / Unisex"],
      subNinosRopa: ["Camisetas y Polos", "Abrigos y Chompas", "Chalecos", "Conjuntos"],
      subNinosInferior: ["Pantalones y Jeans", "Shorts", "Pantalones Deportivos"],
      subNinosCalzado: ["Zapatos", "Deportivos"],
      subNinosAccesorios: ["Gorras y Mochilas", "Ropa de Bebé (0-24m)"],
      subAccCabeza: ["Gorras (Snapbacks/Trucker)", "Gorros (Beanies)", "Sombreros (Bucket Hats)", "Boinas"],
      subAccEquipaje: ["Mochilas", "Bolsos y Totes", "Cangureras", "Bolsos Deportivos"],
      subAccOtros: ["Gafas de Sol", "Cinturones", "Bufandas", "Joyería y Cadenas"],
      subMarcas: [
        "Nike Vintage",
        "Carhartt WIP",
        "Supreme",
        "Stüssy",
        "Levi's Archivo",
      ],
    },
    footer: {
      newsletter: {
        title: "Únete al crew",
        subtitle: "Obtén 10% de descuento en tu primer pedido y mantente al día.",
        placeholder: "Ingresa tu email",
        cta: "Suscribirse",
        thanks: "Bienvenido al crew. Revisa tu bandeja.",
      },
      brand: {
        desc: "Streetwear único seleccionado de las calles de Nueva York. Vintage auténtico, curado con intención.",
      },
      shop: {
        title: "Tienda",
        hombre: "Hombre",
        mujer: "Mujer",
        ninos: "Niños",
        accesorios: "Accesorios",
        nuevos: "Nuevos",
        ofertas: "Ofertas",
      },
      help: {
        title: "Ayuda",
        faq: "Preguntas frecuentes",
        shipping: "Envíos y entregas",
        returns: "Devoluciones y cambios",
        sizeGuide: "Guía de tallas",
        contact: "Contáctanos",
        orderStatus: "Estado del pedido",
      },
      about: {
        title: "Nosotros",
        story: "Nuestra historia",
        sustainability: "Sostenibilidad",
        careers: "Empleos",
        press: "Prensa",
        stores: "Tiendas",
      },
      payment: {
        label: "Aceptamos",
      },
      bottom: {
        rights: "Todos los derechos reservados.",
        privacy: "Política de privacidad",
        terms: "Términos de servicio",
        cookies: "Política de cookies",
      },
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}>({
  lang: "es",
  setLang: () => {},
  t: translations.es,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
