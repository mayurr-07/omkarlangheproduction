"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import VideoPlayer from "@/components/ui/VideoPlayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** "Showreel" — full-width player rising out of a giant outline word. */
export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".reel-player", {
        opacity: 0,
        y: 70,
        scale: 0.97,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".reel-header", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      gsap.to(".reel-ghost", {
        xPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="showreel" className="relative overflow-hidden py-28 md:py-40">
      {/* ghost word drifting behind */}
      <div
        aria-hidden
        className="reel-ghost pointer-events-none absolute top-10 left-0 font-heading text-[40vw] leading-none font-extrabold whitespace-nowrap text-stroke opacity-40 select-none sm:text-[26vw]"
      >
        SHOWREEL — SHOWREEL
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="reel-header mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="kicker mb-5 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Showreel — 2025
            </p>
            <h2 className="font-heading text-4xl leading-[0.98] font-bold text-white sm:text-5xl md:text-7xl">
              Motion, in <span className="font-accent font-normal text-gold italic">focus.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
            Thirty-six seconds above the Western Ghats — golden-hour fog, ridgelines and
            the kind of silence only a drone finds.
          </p>
        </div>

        <div className="reel-player">
          <VideoPlayer
            src="/videos/showreel.mp4"
            poster="/videos/poster.jpg"
            title="Aerial reel — Western Ghats"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase sm:gap-x-8 sm:tracking-[0.28em]">
          <span>4K UHD</span>
          <span className="h-1 w-1 rounded-full bg-gold/60" />
          <span>60 fps aerial</span>
          <span className="h-1 w-1 rounded-full bg-gold/60" />
          <span>Graded in-house</span>
          <span className="h-1 w-1 rounded-full bg-gold/60" />
          <span>Sound on recommended</span>
        </div>
      </div>
    </section>
  );
}
