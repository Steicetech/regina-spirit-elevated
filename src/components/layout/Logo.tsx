import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Wordmark testuale: il logo ufficiale esistente andrà qui, senza redesign. */
export function Logo({ className, asLink = true }: { className?: string; asLink?: boolean }) {
  const content = (
    <span
      className={cn(
        "font-display text-[0.95rem] font-medium uppercase leading-none tracking-[0.28em]",
        className,
      )}
    >
      Regina<span className="text-bronzo"> Spirits</span>
    </span>
  );

  if (!asLink) return content;
  return (
    <Link to="/" aria-label="Regina Spirits — home" className="inline-flex items-center">
      {content}
    </Link>
  );
}
