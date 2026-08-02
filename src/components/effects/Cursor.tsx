"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom magnetic-feel cursor: amber dot + trailing ring.
 * Elements opt-in via `data-cursor="view" | "play" | "drag"` to show labels.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("hide-native-cursor");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.("[data-cursor]");
      if (target) {
        hovering = true;
        setLabel(target.getAttribute("data-cursor") ?? "");
      } else {
        hovering = false;
        setLabel("");
      }
    };

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${hovering ? 2.1 : 1})`;
        ringRef.current.style.borderColor = hovering
          ? "rgba(245,158,11,0.9)"
          : "rgba(255,255,255,0.35)";
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove("hide-native-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99] h-1.5 w-1.5 rounded-full bg-gold"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[98] flex h-9 w-9 items-center justify-center rounded-full border transition-[border-color,background-color] duration-300"
      >
        {label && (
          <span className="font-mono text-[8px] font-medium tracking-[0.18em] text-gold uppercase">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
