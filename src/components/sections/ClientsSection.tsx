"use client";

import { CLIENTS } from "@/lib/constants";

const KEYWORDS = [
  "Weddings",
  "Commercials",
  "Documentary",
  "Portraits",
  "Editorial",
  "Music Videos",
  "Aerial",
  "Events",
];

/** "Trusted By" — two counter-scrolling marquees with pause-on-hover. */
export default function ClientsSection() {
  return (
    <section id="clients" className="relative overflow-hidden border-y border-white/8 py-24 md:py-32">
      <p className="kicker mb-14 flex items-center justify-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        Trusted by — selected clients
      </p>

      {/* row 1: client names */}
      <div
        className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-label="Client list"
      >
        <div className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {CLIENTS.map((client) => (
                <span key={`${dup}-${client.name}`} className="group/item flex items-center">
                  <span className="font-heading px-8 text-4xl font-bold whitespace-nowrap text-zinc-700 transition-colors duration-400 group-hover/item:text-white md:px-12 md:text-6xl">
                    {client.name}
                  </span>
                  <span className="h-2 w-2 rounded-full border border-gold/50 transition-colors duration-400 group-hover/item:bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* row 2: keywords, reversed */}
      <div
        className="group mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-hidden
      >
        <div className="animate-marquee-rev flex w-max items-center group-hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {KEYWORDS.map((word) => (
                <span key={`${dup}-${word}`} className="flex items-center">
                  <span className="text-stroke font-heading px-8 text-3xl font-extrabold whitespace-nowrap uppercase md:px-10 md:text-5xl">
                    {word}
                  </span>
                  <span className="font-accent text-2xl text-gold/60 italic">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-14 text-center font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
        …and 200+ couples who trusted me with their biggest day
      </p>
    </section>
  );
}
