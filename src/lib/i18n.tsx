import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Lang = "en" | "es";

const STORAGE_KEY = "avnyc-lang";

const translations = {
  en: {
    heroKicker: "NEW YORK — CURATED ARCHIVE",
    heroTitle: "TRUE VINTAGE,\nBRAND\nNEW",
    heroTagline: "AUTHENTIC VINTAGE STORE",
    heroEst: "EST. NYC",
    heroOneOfOne: "ONE OF ONE",
    lookbookEdit: "THE NEW YORK EDIT / 001",
    lookbookTitle1: "AUTHENTIC",
    lookbookTitle2: "VINTAGE STORE",
    lookbookDesc: "One-of-one streetwear, sourced by hand. Worn before.\nReady for what's next.",
    lookbookCta: "SHOP THE DROP",
    manifesto: {
      line1: "We make nothing.",
      line2: "We rescue what already exists —",
      line3: "one piece, one story, one owner.",
      link: "OUR STORY",
    },
    process: {
      title: "How we curate",
      steps: [
        {
          num: "01",
          title: "Sourced",
          body: "Brooklyn fleas, estate sales, and a trusted network across New York. If it has no history, it does not enter the archive.",
        },
        {
          num: "02",
          title: "Authenticated",
          body: "Labels, stitching, and provenance checked by hand. Every garment is restored only as much as it needs.",
        },
        {
          num: "03",
          title: "Archived",
          body: "One piece, documented and listed once. When it sells, it is gone — no restocks, no copies.",
        },
      ],
    },
    showroom: {
      title: "Nolita showroom",
      body: "See the archive in person. Try pieces on, talk provenance, leave with something that will not be made again.",
      meta1: "New York — Nolita / 10013",
      meta2: "Thu–Sun · 12–7 · By appointment",
      cta: "VISIT US",
    },
    sourcing: {
      title: "Field notes",
      notes: [
        {
          num: "01",
          label: "SOURCING",
          body: "Every piece is hand-selected from vintage markets and private collections across NYC. We authenticate, restore, and curate each garment.",
          img: "brooklyn",
        },
        {
          num: "02",
          label: "ONE OF ONE",
          body: "From rare deadstock to original graphic tees — if it sells, it is gone. No restocks, no copies, no second chance.",
          img: "deadstock",
        },
      ],
      link: "READ THE PROCESS",
    },
    about: {
      eyebrow: "AVNYC / ABOUT",
      title: "Our Story",
      sub: "One-of-one streetwear sourced from the streets of New York.",
      toc: "Sections",
      story: {
        line1: "Born between Brooklyn fleas",
        line2: "and Manhattan estate sales —",
        line3: "an obsession became an archive.",
        body: "Every garment passes through our hands: authenticated, restored and documented before it enters the archive. What started as a hunt for one-of-one pieces became a curated record of New York streetwear — no restocks, no copies, no second chances.",
      },
      sustainability: {
        label: "SUSTAINABILITY",
        title: "A second life, not a new one",
        body: "Buying vintage is the most honest form of sustainable fashion: we give existing garments a second life instead of manufacturing new ones.",
        body2: "No fast fashion, no dead stock. One-of-one pieces, one owner each.",
        stat: "0 new garments made",
      },
      join: {
        title: "Careers & press",
        link: "SEE THE PROCESS",
      },
      careers: {
        num: "01",
        label: "CAREERS",
        body: "We're looking for people who love streetwear as much as we do: authenticators, photographers and operations. Send your portfolio to hello@avnyc.example.",
      },
      press: {
        num: "02",
        label: "PRESS",
        body: "Writing about fashion, vintage or urban culture? Email press@avnyc.example for samples, images and interviews.",
      },
      stores: {
        popups: "Monthly pop-ups: dates announced in the top banner and on Instagram.",
        cta: "BOOK A VISIT",
      },
    },
    archiveFacts: [
      "NO RESTOCKS",
      "AUTHENTICATED BY HAND",
      "ONE OWNER EACH",
      "NOLITA / 10013",
      "THU–SUN 12–7",
    ],
    announcementMessages: [
      {
        text: "Nolita showroom open Thu–Sun, 12–7.",
        links: [{ label: "Visit", href: "/about#stores" }],
      },
      {
        text: "One-of-one. When it sells, it is gone.",
        links: [{ label: "The archive", href: "/shop" }],
      },
      {
        text: "New pieces enter the archive every week.",
        links: [{ label: "Discover", href: "/shop/nuevos" }],
      },
      {
        text: "Join the crew — 10% off your first order.",
        links: [{ label: "Sign up", href: "/signup" }],
      },
    ],
    helpLabel: "Help",
    helpOptions: [
      { label: "Order Status", href: "/help#order-status" },
      { label: "Return Order", href: "/help#returns" },
      { label: "FAQ", href: "/help#faq" },
      { label: "Help", href: "/help" },
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
      subMarcas: ["Nike Vintage", "Carhartt WIP", "Supreme", "Stüssy", "Levi's Archive"],
    },
    footer: {
      newsletter: {
        title: "Join the crew",
        subtitle: "Get 10% off your first order and stay in the loop.",
        placeholder: "Enter your email",
        cta: "Subscribe",
        thanks: "Welcome to the crew. Check your inbox.",
        consent: "No spam. Unsubscribe anytime. See our Cookie Policy.",
      },
      brand: {
        desc: "One-of-one streetwear sourced from the streets of New York. Authentic vintage, curated with intention.",
      },
      store: {
        line: "Nolita showroom · Thu–Sun 12–7 · hello@avnyc.com",
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
    heroTitle: "VINTAGE\nAUTENTICO\nCOMO NUEVO",
    heroTagline: "AUTHENTIC VINTAGE STORE",
    heroEst: "EST. NYC",
    heroOneOfOne: "ÚNICO EN EL MUNDO",
    lookbookEdit: "LA EDICIÓN DE NUEVA YORK / 001",
    lookbookTitle1: "AUTHENTIC",
    lookbookTitle2: "VINTAGE STORE",
    lookbookDesc: "Streetwear único, seleccionado a mano.\nUsado antes. Listo para lo que viene.",
    lookbookCta: "VER LA COLECCIÓN",
    manifesto: {
      line1: "No fabricamos nada.",
      line2: "Rescatamos lo que ya existe —",
      line3: "una pieza, una historia, un dueño.",
      link: "NUESTRA HISTORIA",
    },
    process: {
      title: "Cómo curamos",
      steps: [
        {
          num: "01",
          title: "Rescate",
          body: "Mercados de Brooklyn, ventas de estate y una red de confianza en Nueva York. Si no tiene historia, no entra al archivo.",
        },
        {
          num: "02",
          title: "Autenticación",
          body: "Etiquetas, costuras y procedencia verificadas a mano. Solo restauramos lo que la pieza necesita.",
        },
        {
          num: "03",
          title: "Archivo",
          body: "Una pieza, documentada y publicada una sola vez. Cuando se vende, se fue — sin restocks, sin copias.",
        },
      ],
    },
    showroom: {
      title: "Showroom Nolita",
      body: "Mira el archivo en persona. Prueba piezas, pregunta por la procedencia y llévate algo que no se volverá a fabricar.",
      meta1: "Nueva York — Nolita / 10013",
      meta2: "Jue–Dom · 12–7 · Con cita previa",
      cta: "VISÍTANOS",
    },
    sourcing: {
      title: "Notas de campo",
      notes: [
        {
          num: "01",
          label: "RESCATE",
          body: "Cada pieza se selecciona a mano en mercados vintage y colecciones privadas de NYC. Autenticamos, restauramos y curamos cada prenda.",
          img: "brooklyn",
        },
        {
          num: "02",
          label: "PIEZA ÚNICA",
          body: "Desde deadstock raro hasta gráficas originales — cuando se vende, se fue. Sin restocks, sin copias, sin segunda oportunidad.",
          img: "deadstock",
        },
      ],
      link: "VER EL PROCESO",
    },
    about: {
      eyebrow: "AVNYC / NOSOTROS",
      title: "Nuestra historia",
      sub: "Streetwear único seleccionado de las calles de Nueva York.",
      toc: "Secciones",
      story: {
        line1: "Nacidos entre pulgas de Brooklyn",
        line2: "y ventas de estate de Manhattan —",
        line3: "una obsesión se volvió archivo.",
        body: "Cada prenda pasa por nuestras manos: se autentica, se restaura y se documenta antes de entrar al archivo. Lo que empezó como una caza de piezas únicas se convirtió en un registro curado del streetwear de Nueva York — sin restocks, sin copias, sin segundas oportunidades.",
      },
      sustainability: {
        label: "SOSTENIBILIDAD",
        title: "Una segunda vida, no una nueva",
        body: "Comprar vintage es la forma más honesta de moda sostenible: le damos una segunda vida a prendas que ya existen en lugar de fabricar nuevas.",
        body2: "Sin fast fashion, sin stock muerto. Piezas únicas, un solo dueño cada una.",
        stat: "0 prendas nuevas fabricadas",
      },
      join: {
        title: "Empleos y prensa",
        link: "VER EL PROCESO",
      },
      careers: {
        num: "01",
        label: "EMPLEOS",
        body: "Buscamos gente que ame el streetwear tanto como nosotros: autenticadores, fotógrafos y operaciones. Envíanos tu portfolio a hola@avnyc.example.",
      },
      press: {
        num: "02",
        label: "PRENSA",
        body: "¿Escribes sobre moda, vintage o cultura urbana? Escríbenos a prensa@avnyc.example para muestras, imágenes y entrevistas.",
      },
      stores: {
        popups: "Pop-ups mensuales: fechas anunciadas en el anuncio superior y en Instagram.",
        cta: "RESERVA TU VISITA",
      },
    },
    archiveFacts: [
      "SIN RESTOCKS",
      "AUTENTICADO A MANO",
      "UN SOLO DUEÑO",
      "NOLITA / 10013",
      "JUE–DOM 12–7",
    ],
    announcementMessages: [
      {
        text: "Showroom Nolita abierto jue–dom, 12–7.",
        links: [{ label: "Visitar", href: "/about#stores" }],
      },
      {
        text: "Pieza única. Cuando se vende, se fue.",
        links: [{ label: "El archivo", href: "/shop" }],
      },
      {
        text: "Nuevas piezas entran al archivo cada semana.",
        links: [{ label: "Descubrir", href: "/shop/nuevos" }],
      },
      {
        text: "Únete al crew — 10% en tu primer pedido.",
        links: [{ label: "Registrarse", href: "/signup" }],
      },
    ],
    helpLabel: "Ayuda",
    helpOptions: [
      { label: "Estado del pedido", href: "/help#order-status" },
      { label: "Devolver pedido", href: "/help#returns" },
      { label: "Preguntas frecuentes", href: "/help#faq" },
      { label: "Ayuda", href: "/help" },
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
      subMarcas: ["Nike Vintage", "Carhartt WIP", "Supreme", "Stüssy", "Levi's Archivo"],
    },
    footer: {
      newsletter: {
        title: "Únete al crew",
        subtitle: "Obtén 10% de descuento en tu primer pedido y mantente al día.",
        placeholder: "Ingresa tu email",
        cta: "Suscribirse",
        thanks: "Bienvenido al crew. Revisa tu bandeja.",
        consent: "Sin spam. Cancela cuando quieras. Ver Política de cookies.",
      },
      brand: {
        desc: "Streetwear único seleccionado de las calles de Nueva York. Vintage auténtico, curado con intención.",
      },
      store: {
        line: "Showroom Nolita · Jue–Dom 12–7 · hello@avnyc.com",
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
