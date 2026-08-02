import type { Client, GalleryChapter, NavLink, Service, Stat } from "@/types";

export const SITE = {
  name: "Omkar Langhe",
  brand: "Omkar Langhe Production",
  tagline: "Cinematic photography & videography",
  location: "Pune · Mumbai · Worldwide",
  established: "EST. 2016 — INDIA",
  email: "hello@omkarlanghe.com",
  phone: "+91 98220 00000",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Works", href: "#gallery", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Showreel", href: "#showreel", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
];

export const CHAPTERS: GalleryChapter[] = [
  {
    id: "portrait",
    index: "REEL 01",
    title: "Portrait",
    tagline: "depth & emotion",
    description:
      "Faces lit like film stills. Every portrait is a study of light, silence and the seconds between expressions.",
    items: [
      {
        src: "/images/gallery/portrait/01.png",
        alt: "Moody portrait of a man sculpted by hard shadow",
        title: "Shadow Study I",
        meta: "50MM · F/1.8 · ISO 200",
        ratio: "portrait",
      },
      {
        src: "/images/gallery/portrait/02.jpg",
        alt: "Woman's face illuminated by deep red light in darkness",
        title: "Crimson",
        meta: "85MM · F/2.0 · ISO 640",
        ratio: "portrait",
      },
      {
        src: "/images/gallery/portrait/03.jpg",
        alt: "Portrait woven with green light and drifting smoke",
        title: "Emerald Haze",
        meta: "35MM · F/2.8 · ISO 800",
        ratio: "portrait",
      },
      {
        src: "/images/gallery/portrait/04.jpg",
        alt: "Woman beside night glass, city light on her face",
        title: "Night Glass",
        meta: "50MM · F/1.4 · ISO 1250",
        ratio: "portrait",
      },
    ],
  },
  {
    id: "wedding",
    index: "REEL 02",
    title: "Wedding",
    tagline: "vows in motion",
    description:
      "Not documentation — cinema. The tremble before the vows, the laughter after, cut together like memory itself.",
    items: [
      {
        src: "/images/gallery/wedding/01.png",
        alt: "Couple holding each other on their wedding day",
        title: "The Embrace",
        meta: "35MM · F/2.2 · ISO 400",
        ratio: "landscape",
      },
      {
        src: "/images/gallery/wedding/02.jpg",
        alt: "Bride and groom beneath a veil at night",
        title: "Under the Veil",
        meta: "50MM · F/1.8 · ISO 1000",
        ratio: "landscape",
      },
      {
        src: "/images/gallery/wedding/03.jpg",
        alt: "Black and white frame of a couple descending stairs",
        title: "Grand Descent",
        meta: "24MM · F/4.0 · ISO 320",
        ratio: "landscape",
      },
      {
        src: "/images/gallery/wedding/04.jpg",
        alt: "Close-up of intertwined hands of bride and groom",
        title: "Promise, Held",
        meta: "85MM · F/2.0 · ISO 500",
        ratio: "landscape",
      },
    ],
  },
  {
    id: "landscape",
    index: "REEL 03",
    title: "Landscape",
    tagline: "the wide silence",
    description:
      "Mountains breathing fog, light spilling over ridgelines. Frames that wait hours for one honest minute.",
    items: [
      {
        src: "/images/gallery/landscape/01.jpg",
        alt: "Mist rolling over a mountain range under heavy clouds",
        title: "Sea of Peaks",
        meta: "16MM · F/8.0 · ISO 100",
        ratio: "landscape",
      },
      {
        src: "/images/gallery/landscape/02.jpg",
        alt: "Summit half-hidden by drifting storm clouds",
        title: "The Hidden Summit",
        meta: "70MM · F/7.1 · ISO 100",
        ratio: "landscape",
      },
      {
        src: "/images/gallery/landscape/03.jpg",
        alt: "Dramatic peaks engulfed in moving cloud",
        title: "Cloud Siege",
        meta: "24MM · F/9.0 · ISO 64",
        ratio: "landscape",
      },
      {
        src: "/images/gallery/landscape/04.jpg",
        alt: "Green mist-covered hills under a moody sky",
        title: "Sligo Rain",
        meta: "35MM · F/5.6 · ISO 200",
        ratio: "landscape",
      },
    ],
  },
  {
    id: "film",
    index: "REEL 04",
    title: "Film & Commercial",
    tagline: "sets & stories",
    description:
      "Brand films, music videos and commercials — built frame by frame with crew, craft and controlled chaos.",
    items: [
      {
        src: "/images/gallery/film/01.jpg",
        alt: "Camera operators working professional cinema rigs",
        title: "Crew Call",
        meta: "BTS · SONY FX6",
        ratio: "landscape",
      },
      {
        src: "/images/gallery/film/02.jpg",
        alt: "Videographer balancing a gimbal-mounted cinema camera",
        title: "Gimbal Work",
        meta: "BTS · DJI RS3 PRO",
        ratio: "landscape",
      },
      {
        src: "/images/gallery/film/03.jpg",
        alt: "Broadcast cameras lined up on tripods",
        title: "Three Cam Setup",
        meta: "BTS · MULTICAM",
        ratio: "landscape",
      },
      {
        src: "/images/gallery/film/04.jpg",
        alt: "Cinema lens close-up on an outdoor set",
        title: "Glass First",
        meta: "BTS · 35MM PRIME",
        ratio: "landscape",
      },
    ],
  },
];

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Wedding Films & Photography",
    description: "Full-day cinematic coverage, same-day edits, heirloom albums.",
  },
  {
    index: "02",
    title: "Commercial & Brand Films",
    description: "Concept to grade — product films, campaigns, launch stories.",
  },
  {
    index: "03",
    title: "Portraits & Editorial",
    description: "Studio and on-location portraits with a film-still finish.",
  },
  {
    index: "04",
    title: "Documentary & Events",
    description: "Real moments, covered quietly, cut with intent.",
  },
];

export const STATS: Stat[] = [
  { value: 9, suffix: "+", label: "Years behind the lens" },
  { value: 250, suffix: "+", label: "Stories captured" },
  { value: 40, suffix: "+", label: "Brand films delivered" },
  { value: 12, suffix: "", label: "Industry awards" },
];

export const CLIENTS: Client[] = [
  { name: "Aurora Films", kind: "Production House" },
  { name: "Meridian Hotels", kind: "Hospitality" },
  { name: "Kala Arts", kind: "Culture" },
  { name: "Pulse Records", kind: "Music" },
  { name: "Nova Studios", kind: "Agency" },
  { name: "Wander Travel Co.", kind: "Tourism" },
  { name: "Atelier Nine", kind: "Fashion" },
  { name: "Ink & Ivy", kind: "Publishing" },
  { name: "Crest Realty", kind: "Lifestyle" },
  { name: "Lumen Labs", kind: "Tech" },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", key: "instagram" },
  { label: "YouTube", href: "https://youtube.com", key: "youtube" },
  { label: "Vimeo", href: "https://vimeo.com", key: "vimeo" },
] as const;
