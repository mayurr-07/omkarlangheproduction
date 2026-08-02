export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  meta: string;
  /** aspect ratio class token for frame sizing */
  ratio: "portrait" | "landscape" | "square";
}

export interface GalleryChapter {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  items: GalleryItem[];
}

export interface Service {
  index: string;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Client {
  name: string;
  kind: string;
}

export interface NavLink {
  label: string;
  href: string;
  index: string;
}
