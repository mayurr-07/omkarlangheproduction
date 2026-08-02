"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowRight, Play } from "lucide-react";
import { scrollToTarget } from "@/lib/lenis";
import type { LensProgress } from "@/components/three/LensScene";
import { SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LensScene = dynamic(() => import("@/components/three/LensScene"), {
  ssr: false,
});

/**
 * "The Lens Reveal" — a 340vh sticky stage. On scroll the 3D lens
 * extends into a mechanical zoom while the wordmark splits apart,
 * then the lens yields the frame to the intro panel.
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress: LensProgress = useRef({ p: 0 });

  useGSAP(
    () => {
      /* ——— Entrance, triggered by the preloader's iris-out ——— */
      const intro = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .fromTo(
          ".hero-line",
          { yPercent: 118 },
          { yPercent: 0, duration: 1.2, stagger: 0.13 },
        )
        .fromTo(".hero-sub", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.55")
        .fromTo(
          ".hero-meta-item",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.45",
        )
        .fromTo(".hero-scrollcue", { opacity: 0 }, { opacity: 1, duration: 0.7 }, "-=0.2");

      const play = () => intro.play();
      window.addEventListener("olp:loaded", play);
      const fallback = window.setTimeout(play, 2800);

      /* ——— Scroll choreography ——— */
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.to(progress.current, { p: 1, duration: 1 }, 0)
        // wordmark splits around the approaching lens
        .to(".hero-line-left", { xPercent: -135, opacity: 0, duration: 0.28 }, 0.03)
        .to(".hero-line-right", { xPercent: 135, opacity: 0, duration: 0.28 }, 0.03)
        .to(".hero-sub", { opacity: 0, y: -24, duration: 0.16 }, 0.03)
        .to(".hero-scrollcue", { opacity: 0, duration: 0.1 }, 0.02)
        .to(".hero-meta-item", { opacity: 0, y: -14, duration: 0.14 }, 0.04)
        // intro panel takes the stage
        .fromTo(
          ".hero-panel-inner",
          { opacity: 0, x: 70 },
          { opacity: 1, x: 0, duration: 0.22, ease: "power2.out" },
          0.5,
        )
        // gentle exit before the gallery takes over
        .to(".hero-panel-inner", { opacity: 0, y: -46, duration: 0.12 }, 0.88);

      return () => {
        window.removeEventListener("olp:loaded", play);
        window.clearTimeout(fallback);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="home" className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* ambient studio light */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 48% at 50% 46%, rgba(245,158,11,0.09), transparent 70%), radial-gradient(ellipse 40% 32% at 72% 20%, rgba(255,255,255,0.04), transparent 70%)",
          }}
        />

        {/* ——— Wordmark in front of the lens ——— */}
        <div className="pointer-events-none absolute inset-0 z-[15] flex flex-col items-center justify-center px-4 text-center">
          <div className="overflow-hidden pb-[0.12em]">
            <span className="hero-line hero-line-left font-heading block text-[15.5vw] leading-[0.84] font-extrabold tracking-[-0.03em] text-white sm:text-[15.5vw] md:text-[15.5vw]">
              OMKAR
            </span>
          </div>
          <div className="overflow-hidden pb-[0.12em]">
            <span className="hero-line hero-line-right font-heading block text-[15.5vw] leading-[0.84] font-extrabold tracking-[-0.03em] text-white sm:text-[15.5vw] md:text-[15.5vw]">
              LANGHE
            </span>
          </div>
          <p className="hero-sub font-accent mt-3 text-xl text-gold italic opacity-0 sm:text-2xl md:text-4xl">
            production
          </p>
        </div>

        {/* ——— 3D stage ——— */}
        <div className="absolute inset-0 z-10">
          <LensScene progress={progress} />
        </div>

        {/* ——— Corner metadata ——— */}
        <div className="pointer-events-none absolute inset-x-5 bottom-7 z-20 flex items-end justify-between md:inset-x-10">
          <p className="hero-meta-item font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase opacity-0">
            {SITE.established}
          </p>
          <p className="hero-meta-item hidden font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase opacity-0 sm:block">
            18.5204° N / 73.8567° E
          </p>
        </div>
        <div className="pointer-events-none absolute top-24 left-5 z-20 md:left-10">
          <p className="hero-meta-item font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase opacity-0">
            Cinematic photography &amp; film
          </p>
        </div>
        <p className="hero-meta-item pointer-events-none absolute top-1/2 right-4 z-20 hidden origin-right -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.34em] text-zinc-600 uppercase opacity-0 lg:block">
          35MM — f/1.4 — ISO 100
        </p>

        {/* ——— Scroll cue ——— */}
        <div className="hero-scrollcue absolute bottom-7 left-1/2 z-20 -translate-x-1/2 opacity-0">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.34em] text-zinc-400 uppercase">
              Scroll to focus
            </span>
            <ArrowDown className="h-4 w-4 animate-bounce text-gold" strokeWidth={1.5} />
          </div>
        </div>

        {/* ——— Phase two: intro panel ——— */}
        <div className="hero-panel pointer-events-none absolute inset-0 z-20 flex items-end pb-12 md:items-center md:pb-0">
          <div className="hero-panel-inner w-full px-5 opacity-0 sm:px-6 md:ml-auto md:max-w-xl md:pr-24 md:pl-0">
            <p className="kicker mb-4 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Cinematic photography &amp; film
            </p>
            <h2 className="font-heading text-3xl leading-[1.02] font-bold text-white sm:text-4xl md:text-6xl">
              Moments,
              <br />
              made <span className="font-accent font-normal text-gold italic">cinematic.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base md:text-lg">
              I&apos;m Omkar — a photographer and videographer who treats every frame like a
              film still. Weddings, portraits, brand films: stories told through light,
              depth and motion.
            </p>
            <div className="pointer-events-auto mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => scrollToTarget("#gallery")}
                className="group flex items-center gap-2.5 rounded-full bg-gold px-5 py-3 font-mono text-[11px] font-medium tracking-[0.2em] text-black uppercase transition-all duration-400 glow-amber hover:bg-gold-soft sm:px-7 sm:py-3.5"
              >
                View the work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToTarget("#showreel")}
                className="group flex items-center gap-2.5 rounded-full border border-white/20 px-5 py-3 font-mono text-[11px] tracking-[0.2em] text-white uppercase transition-all duration-400 hover:border-gold hover:text-gold sm:px-7 sm:py-3.5"
              >
                <Play className="h-4 w-4 fill-current" />
                Showreel
              </button>
            </div>
            <p className="mt-6 font-mono text-[10px] tracking-[0.28em] text-zinc-600 uppercase">
              250+ stories · 4K delivery · worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
