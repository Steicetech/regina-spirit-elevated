import { cn } from "@/lib/utils";

export function ExclusiveBadge({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <p
      className={cn(
        "eyebrow inline-flex items-center gap-3 text-bronzo",
        onDark && "text-bronzo",
        className,
      )}
    >
      <span aria-hidden className="block h-px w-6 bg-bronzo" />
      Unici a Mantova
    </p>
  );
}
