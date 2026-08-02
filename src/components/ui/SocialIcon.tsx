interface Props {
  name: "instagram" | "youtube" | "vimeo";
  className?: string;
}

/** Brand glyphs (lucide no longer ships brand icons). */
export default function SocialIcon({ name, className }: Props) {
  if (name === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden
      >
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "youtube") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden
      >
        <path d="M2.7 8.2a3 3 0 0 1 2.1-2.2C6.7 5.5 9.3 5.4 12 5.4s5.3.1 7.2.6a3 3 0 0 1 2.1 2.2c.3 1.2.3 2.5.3 3.8s0 2.6-.3 3.8a3 3 0 0 1-2.1 2.2c-1.9.5-4.5.6-7.2.6s-5.3-.1-7.2-.6a3 3 0 0 1-2.1-2.2 12.9 12.9 0 0 1-.3-3.8c0-1.3 0-2.6.3-3.8Z" />
        <path d="m10 9.2 5 2.8-5 2.8Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m7.5 9.5 3 5 3-5" />
      <path d="M16.5 9.5c1.2 0 2 .8 2 2s-.8 3-2 3-2-1.8-2-3 .8-2 2-2Z" />
    </svg>
  );
}
