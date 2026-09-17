import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import streetwearOne from "@/assets/vintage-streetwear-01.jpg";
import streetwearTwo from "@/assets/vintage-streetwear-02.jpg";
import streetwearThree from "@/assets/vintage-streetwear-03.jpg";
import streetwearFour from "@/assets/vintage-streetwear-04.jpg";

export interface MetroHeroProps {
  videoSrc?: string;
  title?: string;
  scrollHint?: string;
  tagline?: string;
  scrubDistance?: number;
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "True Vintage, Brand New",
  scrollHint = "SCROLL TO EXPLORE",
  tagline = "AUTHENTIC VINTAGE STORE",
  scrubDistance = 2600,
  className,
}: MetroHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let duration = 0;
    let frameId = 0;
    let target = reducedMotion ? 1 : 0;
    let current = target;
    let locked = false;
    let lockedScrollY = 0;
    let touchY = 0;
    let started = false;

    const updateVisuals = (progress: number) => {
      if (duration > 0 && Math.abs(video.currentTime - progress * duration) > 0.025) {
        video.currentTime = progress * duration;
      }
      video.style.transform = `scale(${1 + progress * 0.045})`;

      if (titleRef.current) {
        const visibility = 1 - clamp(progress / 0.34, 0, 1);
        titleRef.current.style.opacity = String(visibility);
        titleRef.current.style.transform = `translate3d(0, ${(1 - visibility) * -22}px, 0) scale(${0.97 + visibility * 0.03})`;
        titleRef.current.style.filter = `blur(${(1 - visibility) * 7}px)`;
      }
      if (hintRef.current) hintRef.current.style.opacity = started ? "0" : "1";
      if (taglineRef.current) {
        const visibility = clamp((progress - 0.76) / 0.2, 0, 1);
        taglineRef.current.style.opacity = String(visibility);
        taglineRef.current.style.transform = `translate3d(0, ${(1 - visibility) * 18}px, 0) scale(${0.98 + visibility * 0.02})`;
        taglineRef.current.style.filter = `blur(${(1 - visibility) * 6}px)`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const engageLock = () => {
      if (locked || reducedMotion) return;
      locked = true;
      lockedScrollY = window.scrollY;
      Object.assign(document.body.style, {
        position: "fixed",
        top: `-${lockedScrollY}px`,
        left: "0",
        right: "0",
        width: "100%",
        overflow: "hidden",
      });
    };

    const releaseLock = () => {
      if (!locked) return;
      locked = false;
      const y = lockedScrollY;
      Object.assign(document.body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
        overflow: "",
      });
      window.scrollTo(0, y);
    };

    const addDelta = (delta: number) => {
      target = clamp(target + delta / scrubDistance, 0, 1);
      if (target > 0.003) started = true;
    };

    const onWheel = (event: WheelEvent) => {
      if (!locked) {
        if (window.scrollY <= 1 && event.deltaY < 0 && target > 0) {
          engageLock();
        } else {
          return;
        }
      }
      addDelta(event.deltaY);
      event.preventDefault();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY ?? touchY;
      const delta = touchY - nextY;
      touchY = nextY;
      if (!locked) {
        if (window.scrollY <= 1 && delta < 0 && target > 0) engageLock();
        else return;
      }
      addDelta(delta * 1.2);
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const direction = event.key === "ArrowUp" || event.key === "PageUp" ? -1 :
        event.key === "ArrowDown" || event.key === "PageDown" || event.key === " " ? 1 : 0;
      if (!direction) return;
      if (!locked && direction < 0 && window.scrollY <= 1) engageLock();
      if (locked) {
        addDelta(direction * 180);
        event.preventDefault();
      }
    };

    const onLoaded = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      setReady(true);
      updateVisuals(current);
    };

    const animate = () => {
      current += (target - current) * 0.105;
      if (Math.abs(target - current) < 0.0001) current = target;
      updateVisuals(current);
      if (locked && target >= 1 && current >= 0.995) releaseLock();
      frameId = requestAnimationFrame(animate);
    };

    video.addEventListener("loadedmetadata", onLoaded);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    if (video.readyState >= 1) onLoaded();
    video.play().then(() => video.pause()).catch(() => undefined);
    engageLock();
    frameId = requestAnimationFrame(animate);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(frameId);
      releaseLock();
    };
  }, [scrubDistance]);

  return (
    <main className={className}>
      <section ref={heroRef} className="vintage-video-hero" aria-label="Vintage streetwear introduction">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className={`vintage-video-hero__video ${ready ? "is-ready" : ""}`}
        />
        <div className="vintage-video-hero__shade" />

        <div ref={titleRef} className="vintage-video-hero__title-wrap">
          <p className="vintage-video-hero__kicker">NEW YORK — CURATED ARCHIVE</p>
          <h1>{title}</h1>
        </div>

        <div ref={taglineRef} className="vintage-video-hero__finale">
          <span>EST. NYC</span>
          <p>{tagline}</p>
          <span>ONE OF ONE</span>
        </div>

        <div ref={hintRef} className="vintage-video-hero__hint">
          <span>{scrollHint}</span>
          <ArrowDown aria-hidden="true" size={16} strokeWidth={1.5} />
        </div>

        <div className="vintage-video-hero__progress" aria-hidden="true">
          <div ref={progressBarRef} />
        </div>
      </section>

      <section className="vintage-lookbook" aria-labelledby="lookbook-title">
        <div className="vintage-lookbook__copy">
          <p>THE NEW YORK EDIT / 001</p>
          <h2 id="lookbook-title">AUTHENTIC<br />VINTAGE STORE</h2>
          <div className="vintage-lookbook__details">
            <p>One-of-one streetwear, sourced by hand. Worn before. Ready for what’s next.</p>
            <a href="#archive">
              SHOP THE DROP <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>

        <div id="archive" className="vintage-lookbook__rail" aria-label="Vintage streetwear collection">
          <div className="vintage-lookbook__track">
            {[...LOOKBOOK, ...LOOKBOOK].map((image, index) => (
              <figure key={`${image.src}-${index}`}>
                <img src={image.src} alt={index < LOOKBOOK.length ? image.alt : ""} loading="lazy" width={768} height={1024} />
                <figcaption>{String((index % LOOKBOOK.length) + 1).padStart(2, "0")} / NYC ARCHIVE</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
