import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import AnnouncementBar from "@/components/ui/announcement-bar";
import VintageNavbar from "@/components/ui/vintage-navbar";
import Footer from "@/components/ui/footer";
import { useLanguage } from "@/lib/i18n";
import streetwearOne from "@/assets/vintage-streetwear-01.jpg";
import streetwearTwo from "@/assets/vintage-streetwear-02.jpg";
import streetwearThree from "@/assets/vintage-streetwear-03.jpg";
import streetwearFour from "@/assets/vintage-streetwear-04.jpg";

export interface MetroHeroProps {
  videoSrc?: string;
  className?: string;
}

const DEFAULT_VIDEO =
  "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4";

const LOOKBOOK = [
  { src: streetwearOne, alt: "Vintage varsity jacket and loose denim on a New York street" },
  { src: streetwearTwo, alt: "Curated vintage racing jackets in a New York store" },
  { src: streetwearThree, alt: "Vintage leather bomber styled on a New York subway platform" },
  { src: streetwearFour, alt: "Archive graphic tees, workwear and faded denim" },
];

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function MetroHero({ videoSrc = DEFAULT_VIDEO, className }: MetroHeroProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const textARef = useRef<HTMLDivElement>(null);
  const textBRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const lookbookRef = useRef<HTMLElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [poster, setPoster] = useState<string | null>(null);
  const transitioned = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fallbackTimer: ReturnType<typeof setTimeout>;

    const extractFrame = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 1920;
        canvas.height = video.videoHeight || 1080;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setPoster(canvas.toDataURL("image/jpeg", 0.6));
        }
      } catch {
        // canvas tainted or error — ignore
      }
    };

    const onLoaded = () => {
      clearTimeout(fallbackTimer);
      video.currentTime = 0;
      setReady(true);
      video.play().catch(() => undefined);
      // Capture first frame as fallback after a short delay
      setTimeout(extractFrame, 200);
    };

    const onError = () => {
      clearTimeout(fallbackTimer);
      setReady(true); // show hero with poster fallback
    };

    // Fallback: if video doesn't load in 8s, show hero anyway
    fallbackTimer = setTimeout(() => {
      setReady(true);
    }, 8000);

    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("error", onError);
    if (video.readyState >= 2) onLoaded();

    let frameId = 0;
    let lastVideoT = -1;
    let lastA = -1;
    let lastB = -1;

    const update = () => {
      const dur = Number.isFinite(video.duration) ? video.duration : 0;
      const t = video.currentTime;
      const p = dur > 0 ? clamp(t / dur, 0, 1) : 0;

      // Video zoom — only update on meaningful change
      if (Math.abs(t - lastVideoT) > 0.05) {
        lastVideoT = t;
        video.style.transform = `scale(${1 + p * 0.08})`;
      }

      // Text A: visible 0→35%, fades out 30→45%
      if (textARef.current) {
        const a = Math.round((1 - clamp((p - 0.3) / 0.15, 0, 1)) * 100) / 100;
        if (a !== lastA) {
          lastA = a;
          textARef.current.style.opacity = String(a);
          textARef.current.style.transform = `translateY(${(1 - a) * -16}px)`;
          textARef.current.style.filter = `blur(${(1 - a) * 3}px)`;
        }
      }

      // Text B: fades in 50→65%, stays
      if (textBRef.current) {
        const b = Math.round(clamp((p - 0.5) / 0.15, 0, 1) * 100) / 100;
        if (b !== lastB) {
          lastB = b;
          textBRef.current.style.opacity = String(b);
          textBRef.current.style.transform = `translateY(${(1 - b) * 14}px)`;
          textBRef.current.style.filter = `blur(${(1 - b) * 3}px)`;
        }
      }

      // Progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${p})`;
      }

      // Auto-transition at 80% — before video pauses
      if (p >= 0.8 && !transitioned.current) {
        transitioned.current = true;
        if (heroRef.current) {
          heroRef.current.style.transition = "opacity 2.4s ease-in-out";
          heroRef.current.style.opacity = "0";
        }
        setTimeout(() => {
          announcementRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 1600);
        setTimeout(() => {
          if (heroRef.current) {
            heroRef.current.style.height = "0";
            heroRef.current.style.minHeight = "0";
            heroRef.current.style.overflow = "hidden";
          }
        }, 3200);
      }

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    // Scroll listener — pause video and collapse hero on scroll down
    let scrollTriggered = false;
    const onScroll = () => {
      if (scrollTriggered) return;
      if (window.scrollY > 50) {
        scrollTriggered = true;
        video.pause();
        if (heroRef.current) {
          heroRef.current.style.transition = "opacity 0.6s ease-out, height 0.6s ease-out";
          heroRef.current.style.opacity = "0";
          setTimeout(() => {
            if (heroRef.current) {
              heroRef.current.style.height = "0";
              heroRef.current.style.minHeight = "0";
              heroRef.current.style.overflow = "hidden";
            }
          }, 600);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("error", onError);
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main className={className}>
      <section ref={heroRef} className="vintage-hero" aria-label="Vintage streetwear introduction">
        {/* Poster fallback — shows first frame or black while video loads */}
        {poster && (
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            className={`vintage-hero__poster ${ready ? "is-hidden" : ""}`}
          />
        )}

        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%23000'/%3E%3C/svg%3E"
          className={`vintage-hero__video ${ready ? "is-ready" : ""}`}
        />
        <div className="vintage-hero__shade" />

        <div ref={textARef} className="vintage-hero__text vintage-hero__text--a">
          <p className="vintage-hero__kicker">{t.heroKicker}</p>
          <h1>{t.heroTitle}</h1>
        </div>

        <div ref={textBRef} className="vintage-hero__text vintage-hero__text--b">
          <span>{t.heroEst}</span>
          <p>{t.heroTagline}</p>
          <span>{t.heroOneOfOne}</span>
        </div>

        <div className="vintage-hero__progress" aria-hidden="true">
          <div ref={progressBarRef} />
        </div>
      </section>

      <div ref={announcementRef}>
        <AnnouncementBar />
      </div>

      <VintageNavbar />

      <section ref={lookbookRef} className="vintage-lookbook" aria-labelledby="lookbook-title">
        <div className="vintage-lookbook__copy">
          <p>{t.lookbookEdit}</p>
          <h2 id="lookbook-title">
            {t.lookbookTitle1}
            <br />
            {t.lookbookTitle2}
          </h2>
          <div className="vintage-lookbook__details">
            <p>{t.lookbookDesc}</p>
            <a href="#archive">
              {t.lookbookCta} <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>

        <div
          id="archive"
          className="vintage-lookbook__rail"
          aria-label="Vintage streetwear collection"
        >
          <div className="vintage-lookbook__track">
            {[...LOOKBOOK, ...LOOKBOOK].map((image, index) => (
              <figure key={`${image.src}-${index}`}>
                <img
                  src={image.src}
                  alt={index < LOOKBOOK.length ? image.alt : ""}
                  loading="lazy"
                  width={768}
                  height={1024}
                />
                <figcaption>
                  {String((index % LOOKBOOK.length) + 1).padStart(2, "0")} / NYC ARCHIVE
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
