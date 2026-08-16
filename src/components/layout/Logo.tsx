import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Crown } from "./Crown";

/**
 * Wordmark con corona SVG. Sostituire Crown.tsx con il file ufficiale
 * della marca quando arriverà, senza redesign.
 */
export function Logo({
  className,
  asLink = true,
  variant = "inline",
}: {
  className?: string;
  asLink?: boolean;
  variant?: "inline" | "stacked";
}) {
  const content =
    variant === "stacked" ? (
      <span className={cn("flex flex-col items-center text-center", className)}>
        <Crown className="mb-4 size-10" />
        <span className="font-display text-3xl font-normal uppercase leading-none tracking-[0.18em]">
          Regina
        </span>
        <span className="mt-2 font-sans text-[0.7rem] font-medium uppercase tracking-[0.42em] text-bronzo">
          Spirits
        </span>
        <span className="eyebrow mt-4 text-current/55">Liquori artigianali</span>
      </span>
    ) : (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        <Crown className="size-5 shrink-0" />
        <span className="font-display text-[0.95rem] font-normal uppercase leading-none tracking-[0.22em]">
          Regina <span className="text-bronzo">Spirits</span>
        </span>
      </span>
    );

  if (!asLink) return content;
  return (
    <Link to="/" aria-label="Regina Spirits — home" className="inline-flex items-center">
      {content}
    </Link>
  );
}
