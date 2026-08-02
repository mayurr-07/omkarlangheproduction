"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const BLADES = 7;

/**
 * Cinematic iris loader — an aperture closes, counter rolls,
 * then the overlay irises out to reveal the site.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const counter = { v: 0 };
      document.documentElement.style.overflow = "hidden";

      const finish = () => {
        document.documentElement.style.overflow = "";
        window.dispatchEvent(new CustomEvent("olp:loaded"));
        setDone(true);
      };

      if (reduced) {
        finish();
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: finish,
      });

      tl.to(counter, {
        v: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          }
        },
      })
        .fromTo(
          ".pre-blade",
          { rotate: (i) => i * (360 / BLADES) + 24 },
          { rotate: (i) => i * (360 / BLADES) - 14, duration: 1.8, ease: "power2.inOut" },
          0,
        )
        .fromTo(
          ".pre-ring",
          { scale: 0.86, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 1.2 },
          0,
        )
        .fromTo(
          ".pre-word",
          { letterSpacing: "0.6em", opacity: 0 },
          { letterSpacing: "0.34em", opacity: 1, duration: 1.6 },
          0.1,
        )
        // lens "click" — amber flash ring
        .to(".pre-flash", { scale: 2.2, opacity: 0, duration: 0.5, ease: "power2.out" }, 1.75)
        // iris-out reveal
        .to(
          rootRef.current,
          {
            clipPath: "circle(0% at 50% 50%)",
            duration: 0.9,
            ease: "power4.inOut",
            onStart: () => window.dispatchEvent(new CustomEvent("olp:loaded")),
          },
          1.9,
        );
    },
    { scope: rootRef },
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      style={{ clipPath: "circle(141% at 50% 50%)" }}
    >
      {/* Aperture */}
      <div className="relative flex h-32 w-32 items-center justify-center">
        <div className="pre-flash absolute inset-0 rounded-full border border-gold opacity-70" />
        <div className="pre-ring absolute inset-0 rounded-full border border-white/15" />
        {Array.from({ length: BLADES }).map((_, i) => (
          <div
            key={i}
            className="pre-blade absolute inset-0"
            style={{ transform: `rotate(${i * (360 / BLADES) + 24}deg)` }}
          >
            <span
              className="absolute top-[7%] left-1/2 h-[30%] w-[10%] origin-bottom -translate-x-1/2 rounded-[2px] bg-zinc-800"
              style={{ clipPath: "polygon(0 0, 100% 12%, 78% 100%, 10% 88%)" }}
            />
          </div>
        ))}
        <span className="relative h-6 w-6 rounded-full border border-gold/70 bg-black" />
      </div>

      <p className="pre-word absolute bottom-1/3 translate-y-16 font-mono text-[11px] tracking-[0.34em] text-zinc-500 uppercase">
        Omkar Langhe Production
      </p>

      <div className="absolute right-8 bottom-8 flex items-baseline gap-2 font-mono text-zinc-600">
        <span className="text-[10px] tracking-[0.3em] uppercase">Loading</span>
        <span ref={countRef} className="text-2xl text-gold tabular-nums">
          000
        </span>
      </div>
    </div>
  );
}
