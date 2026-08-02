import { cn } from "@/lib/utils";

interface Props {
  kicker: string;
  title: string;
  accent?: string;
  align?: "left" | "center";
  className?: string;
}

/** Shared editorial section header: mono kicker + Syne title with an italic serif accent. */
export default function SectionHeading({ kicker, title, accent, align = "left", className }: Props) {
  return (
    <div className={cn("reveal", align === "center" && "text-center", className)}>
      <p
        className={cn(
          "kicker mb-5 flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        {kicker}
      </p>
      <h2 className="font-heading text-5xl leading-[0.98] font-bold text-white md:text-7xl">
        {title}{" "}
        {accent && <span className="font-accent font-normal text-gold italic">{accent}</span>}
      </h2>
    </div>
  );
}
