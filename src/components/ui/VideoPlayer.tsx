"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn, formatTime } from "@/lib/utils";

interface Props {
  src: string;
  poster: string;
  title: string;
}

/** Cinematic custom player: amber controls, seek bar, auto-hiding chrome. */
export default function VideoPlayer({ src, poster, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [chrome, setChrome] = useState(true);

  const pokeChrome = useCallback(() => {
    setChrome(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setChrome((c) => (videoRef.current && !videoRef.current.paused ? false : c));
    }, 2600);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
    pokeChrome();
  }, [pokeChrome]);

  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = ratio * duration;
    setProgress(ratio);
    pokeChrome();
  };

  const fullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen();
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      setCurrent(v.currentTime);
      if (v.duration) setProgress(v.currentTime / v.duration);
    };
    const onMeta = () => setDuration(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => {
      setPlaying(false);
      setChrome(true);
    };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor={playing ? undefined : "play"}
      onMouseMove={pokeChrome}
      className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black transition-shadow duration-700 hover:shadow-[0_0_120px_rgba(245,158,11,0.12)]"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        loop
        onClick={togglePlay}
        className="h-full w-full object-cover"
        aria-label={title}
      />

      {/* center play toggle */}
      <button
        onClick={togglePlay}
        aria-label={playing ? "Pause showreel" : "Play showreel"}
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100",
        )}
      >
        <span className="relative flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
          <span
            className={cn(
              "absolute inset-0 rounded-full border border-gold/60",
              !playing && "animate-pulse-ring",
            )}
          />
          <span
            className={cn(
              "flex h-full w-full items-center justify-center rounded-full border border-white/20 backdrop-blur-md transition-all duration-500",
              playing ? "bg-black/30 opacity-0 group-hover:opacity-100" : "bg-black/55 glow-amber",
            )}
          >
            {playing ? (
              <Pause className="h-6 w-6 fill-current text-white md:h-7 md:w-7" />
            ) : (
              <Play className="ml-1 h-7 w-7 fill-current text-gold md:h-8 md:w-8" />
            )}
          </span>
        </span>
      </button>

      {/* control chrome */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pt-16 pb-4 transition-all duration-500 md:px-6",
          chrome ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        {/* seek */}
        <div
          onPointerDown={seek}
          className="group/bar relative h-5 cursor-pointer"
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-white/15">
            <div
              className="relative h-full rounded-full bg-gold"
              style={{ width: `${progress * 100}%` }}
            >
              <span className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-gold opacity-0 shadow-[0_0_12px_rgba(245,158,11,0.8)] transition-opacity group-hover/bar:opacity-100" />
            </div>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-4">
          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="text-white transition-colors hover:text-gold"
          >
            {playing ? (
              <Pause className="h-4.5 w-4.5 fill-current" />
            ) : (
              <Play className="h-4.5 w-4.5 fill-current" />
            )}
          </button>
          <span className="font-mono text-[11px] tracking-[0.14em] text-zinc-400 tabular-nums">
            {formatTime(current)} <span className="text-zinc-600">/</span> {formatTime(duration)}
          </span>
          <span className="ml-2 hidden font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase sm:block">
            {title}
          </span>
          <div className="ml-auto flex items-center gap-4">
            <button
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                v.muted = !v.muted;
                setMuted(v.muted);
              }}
              aria-label={muted ? "Unmute" : "Mute"}
              className="text-white transition-colors hover:text-gold"
            >
              {muted ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
            </button>
            <button
              onClick={fullscreen}
              aria-label="Fullscreen"
              className="text-white transition-colors hover:text-gold"
            >
              <Maximize className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
