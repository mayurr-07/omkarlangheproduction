"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Aperture, ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { scrollToTarget } from "@/lib/lenis";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    // wait for the mobile menu to close before scrolling
    setTimeout(() => scrollToTarget(href), open ? 350 : 0);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          scrolled ? "glass py-3" : "bg-transparent py-5",
        )}
        style={
          scrolled
            ? { borderLeft: "none", borderRight: "none", borderTop: "none" }
            : undefined
        }
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
          <button
            onClick={() => scrollToTarget(0)}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:rotate-90 group-hover:border-gold">
              <Aperture className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <span className="hidden flex-col items-start leading-none sm:flex">
              <span className="font-heading text-[13px] font-bold tracking-[0.14em] text-white">
                OMKAR LANGHE
              </span>
              <span className="font-accent text-[13px] text-gold italic">production</span>
            </span>
          </button>

          <div className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="group relative font-mono text-[11px] tracking-[0.24em] text-zinc-400 uppercase transition-colors duration-300 hover:text-white"
              >
                <span className="mr-1.5 text-[9px] text-gold/70">{link.index}</span>
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-400 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => go("#contact")}
              className="group flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-white uppercase transition-all duration-400 hover:border-gold hover:bg-gold hover:text-black"
            >
              Book a shoot
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] flex flex-col bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                {SITE.brand}
              </span>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(link.href)}
                  className="group flex items-baseline gap-4 py-3 text-left"
                >
                  <span className="font-mono text-xs text-gold">{link.index}</span>
                  <span className="font-heading text-5xl font-bold text-white transition-colors group-active:text-gold">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="px-8 pb-10">
              <button
                onClick={() => go("#contact")}
                className="w-full rounded-full border border-gold bg-gold py-4 font-mono text-xs tracking-[0.24em] text-black uppercase"
              >
                Book a shoot
              </button>
              <p className="mt-6 text-center font-mono text-[10px] tracking-[0.28em] text-zinc-600 uppercase">
                {SITE.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
