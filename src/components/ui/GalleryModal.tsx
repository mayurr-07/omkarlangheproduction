"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/types";
import { pad2 } from "@/lib/utils";

export interface FlatItem extends GalleryItem {
  chapter: string;
}

interface Props {
  items: FlatItem[];
  index: number | null;
  onClose: () => void;
  onNav: (next: number) => void;
}

/** Full-screen cinematic lightbox with keyboard navigation. */
export default function GalleryModal({ items, index, onClose, onNav }: Props) {
  const open = index !== null;
  const item = open ? items[index] : null;

  const prev = useCallback(() => {
    if (index === null) return;
    onNav((index - 1 + items.length) % items.length);
  }, [index, items.length, onNav]);

  const next = useCallback(() => {
    if (index === null) return;
    onNav((index + 1) % items.length);
  }, [index, items.length, onNav]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, prev, next, onClose]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/92 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          {/* frame */}
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[72vh] w-[90vw] md:h-[78vh] md:w-auto md:max-w-[84vw]"
            style={{ aspectRatio: item.ratio === "portrait" ? "3/4" : "16/10" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 90vw, 84vw"
              className="rounded-md border border-white/10 object-contain md:object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 rounded-md glow-amber" />
          </motion.div>

          {/* caption */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
            className="pointer-events-none absolute bottom-6 left-6 md:bottom-10 md:left-10"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase">
              {item.chapter} — {item.meta}
            </p>
            <p className="font-heading mt-1 text-2xl font-bold text-white md:text-3xl">
              {item.title}
            </p>
          </motion.div>

          <p className="pointer-events-none absolute top-6 left-6 font-mono text-[11px] tracking-[0.3em] text-zinc-500 tabular-nums md:top-8 md:left-10">
            {pad2(index! + 1)} / {pad2(items.length)}
          </p>

          {/* controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:text-gold md:top-7 md:right-8"
          >
            <X className="h-4 w-4" />
          </button>
          {/* mobile: bottom-center nav row */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-4 md:hidden">
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 tabular-nums">
              {pad2(index! + 1)} / {pad2(items.length)}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          {/* desktop: side arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:text-gold md:flex md:left-6"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:text-gold md:flex md:right-6"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
