"use client";

/**
 * Fixed cinematic atmosphere layers:
 * film grain (animated), scanlines and a soft vignette.
 */
export default function BackdropFX() {
  return (
    <>
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.42) 100%)",
        }}
      />
      {/* Scanlines */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[71] opacity-[0.05]"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 4px)",
        }}
      />
      {/* Animated grain */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[72] overflow-hidden">
        <div className="grain-source animate-grain absolute -inset-[100px] opacity-[0.06]" />
      </div>
    </>
  );
}
