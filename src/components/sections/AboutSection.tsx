"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, STATS } from "@/lib/constants";
import { scrollToTarget } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** "The Craft" — portrait, story, animated stats and the service list. */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-img", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".about-reveal", {
        opacity: 0,
        y: 44,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      // count-up stats
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const target = Number(el.dataset.value ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      gsap.from(".service-row", {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".service-list", start: "top 80%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-20 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-12">
        {/* ——— Portrait ——— */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-3 translate-x-5 translate-y-5 rounded-lg border border-gold/25"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/about.jpg"
                alt="Omkar's hand gripping a professional camera against black"
                fill
                sizes="(max-width: 1024px) 90vw, 38vw"
                className="about-img scale-[1.15] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.3em] text-zinc-300 uppercase">
                In hand, always — Canon R5
              </p>
            </div>
          </div>
        </div>

        {/* ——— Story ——— */}
        <div className="lg:col-span-7 lg:pl-8">
          <p className="about-reveal kicker mb-5 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            The craft — about Omkar
          </p>
          <h2 className="about-reveal font-heading text-4xl leading-[0.98] font-bold text-white sm:text-5xl md:text-7xl">
            The eye behind <span className="font-accent font-normal text-gold italic">the lens</span>
          </h2>

          <p className="about-reveal mt-8 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            It started with a borrowed camera and a monsoon evening in Pune. Nine years
            later, Omkar Langhe Production has grown into a one-man film crew trusted by
            couples, brands and studios across India — obsessed with the same thing as day
            one: <span className="text-white">light that feels like memory.</span>
          </p>

          <blockquote className="about-reveal mt-8 border-l-2 border-gold pl-6">
            <p className="font-accent max-w-lg text-xl leading-snug text-zinc-300 italic sm:text-2xl md:text-3xl">
              “Anyone can record what happened. I shoot how it felt.”
            </p>
          </blockquote>

          {/* stats */}
          <div className="about-reveal mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/8 bg-white/8">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-noir px-4 py-5 sm:px-6 sm:py-7">
                <p className="font-heading text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                  <span className="stat-value tabular-nums" data-value={stat.value}>
                    {stat.value}
                  </span>
                  <span className="text-gold">{stat.suffix}</span>
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase sm:mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* services */}
          <div className="service-list mt-14">
            <p className="about-reveal kicker mb-2">Services</p>
            {SERVICES.map((service) => (
              <button
                key={service.index}
                onClick={() => scrollToTarget("#contact")}
                className="service-row group flex w-full items-center gap-6 border-b border-white/8 py-6 text-left transition-colors duration-400 hover:border-gold/30"
              >
                <span className="font-mono text-xs text-gold">{service.index}</span>
                <span className="flex-1">
                  <span className="font-heading block text-lg font-bold text-white transition-colors duration-300 group-hover:text-gold sm:text-xl md:text-2xl">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-sm text-zinc-500">{service.description}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
