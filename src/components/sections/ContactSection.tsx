"use client";

import { useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
} from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import { SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Status = "idle" | "sending" | "sent" | "error";

const PROJECT_TYPES = [
  { value: "wedding", label: "Wedding" },
  { value: "commercial", label: "Commercial / Brand" },
  { value: "portrait", label: "Portrait / Editorial" },
  { value: "film", label: "Film / Music Video" },
  { value: "event", label: "Event / Documentary" },
  { value: "other", label: "Something else" },
];

/** "Let's Create" — story pitch form persisted to the production inbox (DB). */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 74%" },
      });
      gsap.from(".form-field", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".contact-card", start: "top 80%" },
      });
    },
    { scope: sectionRef },
  );

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      projectType: String(form.get("projectType") ?? "other"),
      message: String(form.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Network hiccup — check your connection and retry.");
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-md border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 transition-all duration-300 focus:border-gold/70 focus:bg-black/60 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12)] focus:outline-none";
  const labelCls = "mb-2 block font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase";

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-28 md:py-40">
      {/* amber horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 left-1/2 h-[420px] w-[130%] -translate-x-1/2 rounded-[100%]"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.08), transparent 65%)" }}
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-5 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* ——— Pitch ——— */}
        <div>
          <p className="contact-reveal kicker mb-5 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Let&apos;s create — bookings open 2025/26
          </p>
          <h2 className="contact-reveal font-heading text-4xl leading-[0.98] font-bold text-white sm:text-5xl md:text-7xl">
            Tell me your <span className="font-accent font-normal text-gold italic">story.</span>
            <br />
            I&apos;ll bring the light.
          </h2>
          <p className="contact-reveal mt-7 max-w-md text-base leading-relaxed text-zinc-400">
            Share the date, the place and what it means to you. I&apos;ll come back with
            a treatment, a timeline and an honest quote — no templates, no fluff.
          </p>

          <div className="contact-reveal mt-10 space-y-5">
            <a
              href={`mailto:${SITE.email}`}
              className="group flex items-center gap-4 text-sm text-zinc-300 transition-colors hover:text-gold"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 transition-colors group-hover:border-gold">
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </span>
              {SITE.email}
            </a>
            <a
              href="tel:+919822000000"
              className="group flex items-center gap-4 text-sm text-zinc-300 transition-colors hover:text-gold"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 transition-colors group-hover:border-gold">
                <Phone className="h-4 w-4" strokeWidth={1.5} />
              </span>
              {SITE.phone}
            </a>
            <p className="flex items-center gap-4 text-sm text-zinc-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12">
                <MapPin className="h-4 w-4" strokeWidth={1.5} />
              </span>
              {SITE.location}
            </p>
          </div>

          <div className="contact-reveal mt-10 flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-zinc-400 transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <SocialIcon name="instagram" className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-zinc-400 transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <SocialIcon name="youtube" className="h-4 w-4" />
            </a>
            <span className="ml-2 flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-zinc-500 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              Replies within 24 hours
            </span>
          </div>
        </div>

        {/* ——— Form card ——— */}
        <div className="contact-card contact-reveal glass glow-amber rounded-2xl p-5 sm:p-7 md:p-10">
          {status === "sent" ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
              <span className="relative flex h-20 w-20 items-center justify-center">
                <span className="animate-pulse-ring absolute inset-0 rounded-full border border-gold/60" />
                <CheckCircle2 className="h-12 w-12 text-gold" strokeWidth={1.25} />
              </span>
              <h3 className="font-heading mt-8 text-3xl font-bold text-white">
                Message received.
              </h3>
              <p className="font-accent mt-3 text-xl text-zinc-400 italic">
                Roll credits — I&apos;ll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-10 flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-zinc-300 uppercase transition-colors hover:border-gold hover:text-gold"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="form-field">
                  <label htmlFor="name" className={labelCls}>
                    Your name
                  </label>
                  <input id="name" name="name" required placeholder="Asha Verma" className={inputCls} />
                </div>
                <div className="form-field">
                  <label htmlFor="email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@studio.com"
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="form-field mt-6">
                <label htmlFor="projectType" className={labelCls}>
                  Project type
                </label>
                <select id="projectType" name="projectType" className={inputCls} defaultValue="wedding">
                  {PROJECT_TYPES.map((t) => (
                    <option key={t.value} value={t.value} className="bg-black">
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field mt-6">
                <label htmlFor="message" className={labelCls}>
                  The story
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="We're getting married in Mahabaleshwar this December — mist, family, and a lot of dancing…"
                  className={`${inputCls} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="mt-4 rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="form-field group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-gold py-4 font-mono text-[11px] font-medium tracking-[0.24em] text-black uppercase transition-all duration-400 hover:bg-gold-soft disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <p className="mt-4 text-center font-mono text-[9px] tracking-[0.24em] text-zinc-600 uppercase">
                Your details stay between us. Always.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
