import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type LegalPage = "privacy" | "terms" | "cookies";

const CONTENT = {
  en: {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: September 2026",
      sections: [
        {
          heading: "Information We Collect",
          text: "We collect information you provide directly, including your name, email address, shipping address, payment information, and any communications you send us. We also automatically collect certain data about your device and usage when you visit our website.",
        },
        {
          heading: "How We Use Your Information",
          text: "We use your information to process transactions, send order updates, provide customer support, improve our website and services, send promotional communications (with your consent), and comply with legal obligations.",
        },
        {
          heading: "Information Sharing",
          text: "We do not sell your personal information. We share data with service providers who assist in operations (payment processing, shipping, analytics), when required by law, or in connection with a business transfer.",
        },
        {
          heading: "Cookies",
          text: "We use cookies and similar technologies to enhance your experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.",
        },
        {
          heading: "Your Rights",
          text: "You have the right to access, correct, or delete your personal data. You can also opt out of marketing communications at any time. Contact us at privacy@avnyc.com to exercise these rights.",
        },
        {
          heading: "Data Security",
          text: "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.",
        },
        {
          heading: "Contact",
          text: "For questions about this policy, contact us at privacy@avnyc.com.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      updated: "Last updated: September 2026",
      sections: [
        {
          heading: "Acceptance of Terms",
          text: "By accessing or using the AVNYC website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.",
        },
        {
          heading: "Products and Pricing",
          text: "All products are subject to availability. We reserve the right to modify prices without notice. Product images are for illustration purposes; actual items may vary slightly due to their vintage nature.",
        },
        {
          heading: "Orders and Payment",
          text: "By placing an order, you represent that all information provided is accurate. We reserve the right to refuse or cancel orders at our discretion. Payment must be received before order processing.",
        },
        {
          heading: "Shipping and Delivery",
          text: "Shipping times are estimates and not guaranteed. We are not responsible for delays caused by carriers or customs. Risk of loss passes to you upon delivery to the carrier.",
        },
        {
          heading: "Returns and Exchanges",
          text: "Returns are accepted within 14 days of delivery for unworn items in original condition. Sale items are final sale. Contact support@avnyc.com to initiate a return.",
        },
        {
          heading: "Intellectual Property",
          text: "All content on this website, including text, images, logos, and designs, is the property of AVNYC and protected by intellectual property laws. You may not reproduce or distribute without permission.",
        },
        {
          heading: "Limitation of Liability",
          text: "AVNYC shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid for the product.",
        },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      updated: "Last updated: September 2026",
      sections: [
        {
          heading: "What Are Cookies",
          text: "Cookies are small text files stored on your device when you visit our website. They help us recognize your browser and remember certain information.",
        },
        {
          heading: "Essential Cookies",
          text: "Required for the website to function properly. These enable core features like shopping cart, checkout, and account authentication. They cannot be disabled.",
        },
        {
          heading: "Analytics Cookies",
          text: "Help us understand how visitors interact with our website by collecting anonymous usage data. This helps us improve site performance and user experience.",
        },
        {
          heading: "Marketing Cookies",
          text: "Used to track visitors across websites to display relevant advertisements. These cookies may be set by third-party advertising partners.",
        },
        {
          heading: "Managing Cookies",
          text: "You can control and manage cookies through your browser settings. Disabling certain cookies may affect website functionality. Most browsers allow you to block or delete cookies.",
        },
        {
          heading: "Updates",
          text: "We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated revision date.",
        },
      ],
    },
  },
  es: {
    privacy: {
      title: "Política de Privacidad",
      updated: "Última actualización: Septiembre 2026",
      sections: [
        {
          heading: "Información que recopilamos",
          text: "Recopilamos información que nos proporcionas directamente, incluyendo tu nombre, dirección de correo electrónico, dirección de envío, información de pago y cualquier comunicación que nos envíes. También recopilamos automáticamente ciertos datos sobre tu dispositivo y uso cuando visitas nuestro sitio web.",
        },
        {
          heading: "Cómo usamos tu información",
          text: "Usamos tu información para procesar transacciones, enviar actualizaciones de pedidos, brindar soporte al cliente, mejorar nuestro sitio web y servicios, enviar comunicaciones promocionales (con tu consentimiento) y cumplir con obligaciones legales.",
        },
        {
          heading: "Compartir información",
          text: "No vendemos tu información personal. Compartimos datos con proveedores de servicios que nos asisten en las operaciones (procesamiento de pagos, envíos, análisis), cuando la ley lo requiere o en conexión con una transferencia comercial.",
        },
        {
          heading: "Cookies",
          text: "Usamos cookies y tecnologías similares para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. Puedes gestionar las preferencias de cookies a través de la configuración de tu navegador.",
        },
        {
          heading: "Tus derechos",
          text: "Tienes derecho a acceder, corregir o eliminar tus datos personales. También puedes optar por no recibir comunicaciones de marketing en cualquier momento. Contáctanos a privacy@avnyc.com para ejercer estos derechos.",
        },
        {
          heading: "Seguridad de datos",
          text: "Implementamos medidas de seguridad estándar de la industria para proteger tu información personal. Sin embargo, ningún método de transmisión por Internet es 100% seguro.",
        },
        {
          heading: "Contacto",
          text: "Para preguntas sobre esta política, contáctanos a privacy@avnyc.com.",
        },
      ],
    },
    terms: {
      title: "Términos de Servicio",
      updated: "Última actualización: Septiembre 2026",
      sections: [
        {
          heading: "Aceptación de términos",
          text: "Al acceder o usar el sitio web y servicios de AVNYC, aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo, por favor no uses nuestros servicios.",
        },
        {
          heading: "Productos y precios",
          text: "Todos los productos están sujetos a disponibilidad. Nos reservamos el derecho de modificar precios sin previo aviso. Las imágenes de productos son solo ilustrativas; los artículos reales pueden variar ligeramente debido a su naturaleza vintage.",
        },
        {
          heading: "Pedidos y pago",
          text: "Al realizar un pedido, declaras que toda la información proporcionada es precisa. Nos reservamos el derecho de rechazar o cancelar pedidos a nuestra discreción. El pago debe recibirse antes del procesamiento del pedido.",
        },
        {
          heading: "Envíos y entregas",
          text: "Los tiempos de envío son estimados y no garantizados. No somos responsables de retrasos causados por transportistas o aduanas. El riesgo de pérdida se transfiere a ti al entregar al transportista.",
        },
        {
          heading: "Devoluciones y cambios",
          text: "Se aceptan devoluciones dentro de los 14 días posteriores a la entrega para artículos no usados en condición original. Los artículos en oferta son finales. Contacta support@avnyc.com para iniciar una devolución.",
        },
        {
          heading: "Propiedad intelectual",
          text: "Todo el contenido de este sitio web, incluyendo texto, imágenes, logotipos y diseños, es propiedad de AVNYC y está protegido por leyes de propiedad intelectual. No puedes reproducir ni distribuir sin permiso.",
        },
        {
          heading: "Limitación de responsabilidad",
          text: "AVNYC no será responsable por daños indirectos, incidentales o consecuentes que surjan de tu uso de nuestros servicios. Nuestra responsabilidad total no excederá el monto pagado por el producto.",
        },
      ],
    },
    cookies: {
      title: "Política de Cookies",
      updated: "Última actualización: Septiembre 2026",
      sections: [
        {
          heading: "Qué son las cookies",
          text: "Las cookies son pequeños archivos de texto almacenados en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a reconocer tu navegador y recordar cierta información.",
        },
        {
          heading: "Cookies esenciales",
          text: "Necesarias para que el sitio web funcione correctamente. Estas permiten funciones principales como el carrito de compras, checkout y autenticación de cuenta. No se pueden desactivar.",
        },
        {
          heading: "Cookies de análisis",
          text: "Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando datos de uso anónimos. Esto nos ayuda a mejorar el rendimiento del sitio y la experiencia del usuario.",
        },
        {
          heading: "Cookies de marketing",
          text: "Se utilizan para rastrear visitantes en sitios web para mostrar anuncios relevantes. Estas cookies pueden ser configuradas por socios publicitarios de terceros.",
        },
        {
          heading: "Gestionar cookies",
          text: "Puedes controlar y gestionar las cookies a través de la configuración de tu navegador. Desactivar ciertas cookies puede afectar la funcionalidad del sitio web. La mayoría de los navegadores permiten bloquear o eliminar cookies.",
        },
        {
          heading: "Actualizaciones",
          text: "Podemos actualizar esta Política de Cookies de vez en cuando. Los cambios se publicarán en esta página con una fecha de revisión actualizada.",
        },
      ],
    },
  },
};

export default function LegalPages() {
  const { lang } = useLanguage();
  const [activePage, setActivePage] = useState<LegalPage | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const content = activePage ? CONTENT[lang][activePage] : null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setActivePage(null);
      }
    };
    if (activePage) {
      document.addEventListener("mousedown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handler);
      document.body.style.overflow = "";
    };
  }, [activePage]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePage(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const open = (page: LegalPage) => setActivePage(page);
  const close = () => setActivePage(null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "AVNYC",
          }),
        }}
      />

      {/* Hidden links for footer */}
      <div className="sr-only" aria-hidden="true">
        <button onClick={() => open("privacy")} id="legal-privacy" />
        <button onClick={() => open("terms")} id="legal-terms" />
        <button onClick={() => open("cookies")} id="legal-cookies" />
      </div>

      {/* Sheet */}
      {activePage && content && (
        <div className="legal-overlay">
          <div
            ref={sheetRef}
            className={`legal-sheet ${activePage ? "is-open" : ""}`}
          >
            <div className="legal-sheet__header">
              <h2 className="legal-sheet__title">{content.title}</h2>
              <button className="legal-sheet__close" onClick={close} aria-label="Close">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <p className="legal-sheet__updated">{content.updated}</p>
            <div className="legal-sheet__body">
              {content.sections.map((section) => (
                <div key={section.heading} className="legal-sheet__section">
                  <h3 className="legal-sheet__heading">{section.heading}</h3>
                  <p className="legal-sheet__text">{section.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .legal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 100;
          display: flex;
          justify-content: flex-end;
          animation: legal-fade-in 0.2s ease-out;
        }

        @keyframes legal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .legal-sheet {
          width: min(520px, 90vw);
          height: 100vh;
          background: var(--vintage-ink);
          border-left: 1px solid var(--vintage-line);
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .legal-sheet::-webkit-scrollbar {
          display: none;
        }

        .legal-sheet.is-open {
          transform: translateX(0);
        }

        .legal-sheet__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--vintage-line);
          position: sticky;
          top: 0;
          background: var(--vintage-ink);
          z-index: 1;
        }

        .legal-sheet__title {
          margin: 0;
          font:
            700 16px/1.2 Arial,
            Helvetica,
            sans-serif;
          color: var(--vintage-paper);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .legal-sheet__close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          background: none;
          color: var(--vintage-fog);
          cursor: pointer;
          border-radius: 50%;
          transition: color 0.2s, background 0.2s;
        }

        .legal-sheet__close:hover {
          color: var(--vintage-paper);
          background: color-mix(in oklab, var(--vintage-paper) 8%, transparent);
        }

        .legal-sheet__updated {
          margin: 0;
          padding: 16px 24px 0;
          font: 400 12px/1 Arial, Helvetica, sans-serif;
          color: var(--vintage-fog);
        }

        .legal-sheet__body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .legal-sheet__section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .legal-sheet__heading {
          margin: 0;
          font:
            600 13px/1.2 Arial,
            Helvetica,
            sans-serif;
          color: var(--vintage-paper);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .legal-sheet__text {
          margin: 0;
          font: 400 13px/1.7 Arial, Helvetica, sans-serif;
          color: var(--vintage-fog);
        }
      `}</style>
    </>
  );
}
