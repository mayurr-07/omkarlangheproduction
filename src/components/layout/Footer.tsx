"use client";

import { ArrowUp } from "lucide-react";
import { NAV_LINKS, SITE, SOCIALS } from "@/lib/constants";
import { scrollToTarget } from "@/lib/lenis";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-black">
      {/* faint amber horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[100%]"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.09), transparent 65%)" }}
      />

      <div className="mx-auto max-w-[1600px] px-5 pt-16 md:px-10 md:pt-24">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="kicker mb-4">Fade out</p>
            <p className="font-accent max-w-sm text-2xl text-zinc-400 italic">
              “Every frame is a heartbeat —
              <span className="text-gold"> don&apos;t let yours go uncaptured.</span>”
            </p>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                Sitemap
              </span>
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollToTarget(l.href)}
                  className="text-left font-mono text-xs tracking-[0.18em] text-zinc-400 uppercase transition-colors hover:text-gold"
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                Elsewhere
              </span>
              {SOCIALS.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs tracking-[0.18em] text-zinc-400 uppercase transition-colors hover:text-gold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToTarget(0)}
          aria-label="Scroll to top"
          className="group absolute top-16 right-5 hidden h-12 w-12 items-center justify-center rounded-full border border-white/12 text-zinc-400 transition-all duration-400 hover:border-gold hover:text-gold md:flex"
        >
          <ArrowUp className="h-4 w-4 transition-transform duration-400 group-hover:-translate-y-1" />
        </button>

        {/* Giant outline wordmark */}
        <div className="mt-16 md:mt-20" aria-hidden>
          <h2 className="text-stroke font-heading text-[13.5vw] leading-[0.82] font-extrabold tracking-tight whitespace-nowrap select-none md:text-[11vw]">
            OMKAR LANGHE
          </h2>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 py-6 md:flex-row">
          <p className="font-mono text-[10px] tracking-[0.24em] text-zinc-600 uppercase">
            © {new Date().getFullYear()} {SITE.brand}
          </p>
          <p className="font-mono text-[10px] tracking-[0.24em] text-zinc-600 uppercase">
            Shot on location — {SITE.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
