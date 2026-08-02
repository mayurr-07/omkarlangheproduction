"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GalleryModal, { type FlatItem } from "@/components/ui/GalleryModal";
import { CHAPTERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "Cinematic Albums" — the page pins while a film reel of chapters
 * travels horizontally. Frames carry inner parallax and open a
 * full-screen lightbox on click.
 */
export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const flat = useMemo<FlatItem[]>(
    () =>
      CHAPTERS.flatMap((chapter) =>
        chapter.items.map((item) => ({ ...item, chapter: chapter.title })),
      ),
    [],
  );

  const globalIndex = (chapterIdx: number, itemIdx: number) =>
    CHAPTERS.slice(0, chapterIdx).reduce((acc, c) => acc + c.items.length, 0) + itemIdx;

  useGSAP(
    () => {
      const track = trackRef.current!;
      const amount = () => track.scrollWidth - track.parentElement!.clientWidth;

      const tween = gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${amount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // poster-style parallax inside each frame as it crosses the viewport
      gsap.utils.toArray<HTMLElement>(".reel-parallax").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -5 },
          {
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="gallery" className="relative overflow-hidden bg-surface">
      <div className="relative flex h-screen flex-col justify-center overflow-hidden">
        {/* sprocket strips */}
        <div aria-hidden className="sprockets absolute inset-x-0 top-0 h-3.5 opacity-60" />
        <div aria-hidden className="sprockets absolute inset-x-0 bottom-0 h-3.5 opacity-60" />

        {/* header */}
        <div className="absolute inset-x-5 top-8 z-10 flex items-end justify-between md:inset-x-10 md:top-12">
          <div>
            <p className="kicker mb-3 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Selected works — 2024 / 25
            </p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-6xl">
              The <span className="font-accent font-normal text-gold italic">archive</span>
            </h2>
          </div>
          <div className="hidden flex-col items-end gap-3 md:flex">
            <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
              Frame by frame
            </span>
            <div className="h-px w-44 bg-white/12">
              <div ref={barRef} className="h-px w-full origin-left scale-x-0 bg-gold" />
            </div>
          </div>
        </div>

        {/* the reel */}
        <div className="reel-fallback mt-10">
          <div
            ref={trackRef}
            className="flex w-max items-center gap-8 px-5 md:gap-14 md:px-10"
          >
            {CHAPTERS.map((chapter, ci) => (
              <div key={chapter.id} className="flex shrink-0 items-center gap-8 md:gap-14">
                {/* chapter title card */}
                <article className="flex w-[76vw] shrink-0 flex-col justify-center sm:w-[52vw] lg:w-[30vw]">
                  <p className="kicker mb-5 flex items-center gap-3">
                    <span className="text-gold">{chapter.index}</span>
                    <span className="h-px w-10 bg-white/20" />
                    {chapter.id}
                  </p>
                  <h3 className="font-heading text-6xl leading-[0.92] font-extrabold text-white md:text-8xl">
                    {chapter.title}
                  </h3>
                  <p className="font-accent mt-3 text-2xl text-gold italic md:text-3xl">
                    {chapter.tagline}
                  </p>
                  <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-400 md:text-base">
                    {chapter.description}
                  </p>
                  <p className="mt-8 font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                    0{chapter.items.length} frames — click to enlarge
                  </p>
                </article>

                {/* frames */}
                {chapter.items.map((item, ii) => (
                  <figure
                    key={item.src}
                    data-cursor="view"
                    onClick={() => setActive(globalIndex(ci, ii))}
                    className={cn(
                      "group relative my-auto h-[52vh] w-auto shrink-0 cursor-pointer md:h-[66vh]",
                      item.ratio === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]",
                    )}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-md border border-white/8 bg-carbon transition-colors duration-500 group-hover:border-gold/40">
                      <div className="reel-parallax absolute inset-y-0 -left-[7%] w-[114%]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 80vw, 45vw"
                          className="object-cover transition-[filter] duration-700 group-hover:brightness-110"
                        />
                      </div>
                      {/* hover veil + index */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.24em] text-zinc-400">
                        {chapter.index}.{ii + 1}
                      </span>
                    </div>
                    <figcaption className="pointer-events-none absolute bottom-5 left-5">
                      <p className="font-heading text-lg font-bold text-white md:text-xl">
                        {item.title}
                      </p>
                      <p className="mt-1 font-mono text-[10px] tracking-[0.24em] text-gold">
                        {item.meta}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}

            {/* end slate */}
            <div className="flex w-[70vw] shrink-0 flex-col items-start justify-center md:w-[36vw]">
              <p className="font-heading text-stroke text-7xl font-extrabold md:text-9xl">FIN</p>
              <p className="font-accent mt-2 text-xl text-zinc-400 italic">
                …and the next reel could be yours.
              </p>
            </div>
          </div>
        </div>
      </div>

      <GalleryModal
        items={flat}
        index={active}
        onClose={() => setActive(null)}
        onNav={setActive}
      />
    </section>
  );
}
