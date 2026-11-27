import { createFileRoute, Link } from "@tanstack/react-router";
import SiteChrome from "@/components/ui/site-chrome";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — Authentic Vintage Store" },
      {
        name: "description",
        content: "FAQ, shipping, returns, size guide and contact — Authentic Vintage Store customer help.",
      },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  const { lang } = useLanguage();
  const es = lang === "es";

  const sections = [
    {
      id: "faq",
      title: es ? "Preguntas frecuentes" : "FAQ",
      body: [
        es
          ? "¿Son auténticas las piezas? Sí. Cada prenda pasa por un proceso de autenticación: etiquetas, costuras, materiales y procedencia. Si no supera el chequeo, no entra al archivo."
          : "Are the pieces authentic? Yes. Every garment goes through an authentication process: labels, stitching, materials and provenance. If it doesn't pass, it doesn't make the archive.",
        es
          ? "¿Por qué no hay dos iguales? Trabajamos con piezas one-of-one seleccionadas a mano. Cuando una pieza se vende, no se repone."
          : "Why are there no duplicates? We work with one-of-one pieces, hand-selected. Once a piece sells, it isn't restocked.",
        es
          ? "¿Puedo reservar una pieza? Sí, escríbenos y la reservamos por 24 horas."
          : "Can I hold a piece? Yes — email us and we'll hold it for 24 hours.",
      ],
    },
    {
      id: "shipping",
      title: es ? "Envíos y entregas" : "Shipping & Delivery",
      body: [
        es
          ? "Envío estándar 3–5 días hábiles en EE.UU. Gratis en pedidos mayores a $150. Express 1–2 días hábiles disponible al checkout."
          : "Standard shipping 3–5 business days in the US. Free on orders over $150. Express 1–2 business days available at checkout.",
        es
          ? "Internacional: 7–14 días hábiles. Los aranceles e impuestos corren por cuenta del comprador."
          : "International: 7–14 business days. Duties and taxes are the buyer's responsibility.",
        es
          ? "Recibes un número de rastreo por email en cuanto tu pedido sale del archivo."
          : "You'll receive a tracking number by email as soon as your order leaves the archive.",
      ],
    },
    {
      id: "returns",
      title: es ? "Devoluciones y cambios" : "Returns & Exchanges",
      body: [
        es
          ? "Tienes 14 días desde la recepción para devolver o cambiar una pieza. Debe estar en el mismo estado en que llegó."
          : "You have 14 days from delivery to return or exchange a piece. It must arrive in the same condition it left us.",
        es
          ? "El reembolso se emite al método de pago original dentro de 5 días hábiles tras recibir la devolución."
          : "Refunds go back to the original payment method within 5 business days of receiving the return.",
        es
          ? "Las piezas en liquidación (SALE) son finales de venta salvo defecto."
          : "Sale pieces are final sale unless defective.",
      ],
    },
    {
      id: "size-guide",
      title: es ? "Guía de tallas" : "Size Guide",
      body: [
        es
          ? "Las piezas vintage siguen etiquetas de su época: revisa las medidas en centímetros antes de comprar. Cada producto incluye talla y condición."
          : "Vintage pieces follow the labels of their era: check the measurements in centimeters before buying. Every product lists size and condition.",
        es
          ? "¿Dudas entre dos tallas? Escríbenos con tus medidas (pecho, largo de manga, cintura) y te recomendamos."
          : "Between sizes? Email us your measurements (chest, sleeve, waist) and we'll recommend.",
        es
          ? "Sneakers: usa tu talla de sneakers actual. El calzado vintage se marca en US."
          : "Sneakers: go with your current sneaker size. Vintage footwear is listed in US sizing.",
      ],
    },
    {
      id: "contact",
      title: es ? "Contáctanos" : "Contact Us",
      body: [
        es
          ? "Email: hola@avnyc.example — respondemos en 24 horas hábiles."
          : "Email: hello@avnyc.example — we reply within 24 business hours.",
        es
          ? "Instagram DM: @avnyc — para consultas rápidas de piezas disponibles."
          : "Instagram DM: @avnyc — for quick availability questions.",
        es
          ? "Showroom en Nueva York con cita previa: escríbenos para agendar."
          : "New York showroom by appointment: email us to book a visit.",
      ],
    },
    {
      id: "order-status",
      title: es ? "Estado del pedido" : "Order Status",
      body: [
        es
          ? "Inicia sesión para ver el estado de tus pedidos, facturas y números de rastreo."
          : "Sign in to see your order status, invoices and tracking numbers.",
        es
          ? "¿No tienes cuenta? Crea una con el email que usaste en tu compra."
          : "No account yet? Create one with the email you used at checkout.",
      ],
    },
  ];

  return (
    <SiteChrome>
      <div className="page page--narrow">
        <header className="page__head">
          <p className="page__eyebrow">HELP</p>
          <h1 className="page__title">{es ? "Ayuda" : "Help"}</h1>
          <p className="page__sub">
            {es
              ? "Envíos, devoluciones, tallas y contacto — todo en un solo lugar."
              : "Shipping, returns, sizing and contact — all in one place."}
          </p>
        </header>

        <nav className="help-toc" aria-label={es ? "Secciones" : "Sections"}>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="chip">
              {s.title}
            </a>
          ))}
        </nav>

        {sections.map((s) => (
          <section key={s.id} id={s.id} className="content-block" aria-labelledby={`${s.id}-title`}>
            <h2 id={`${s.id}-title`}>{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {s.id === "order-status" && (
              <Link to="/login" className="btn btn--outline">
                {es ? "Iniciar sesión" : "Log in"}
              </Link>
            )}
          </section>
        ))}
      </div>
    </SiteChrome>
  );
}
