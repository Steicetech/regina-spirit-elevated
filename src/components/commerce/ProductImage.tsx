import { Crown } from "@/components/layout/Crown";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductImage({
  product,
  className,
  sizes = "default",
}: {
  product: Product;
  className?: string;
  sizes?: "default" | "thumb";
}) {
  if (product.hasOfficialPhoto && product.images[0]) {
    return (
      <img
        src={product.images[0]}
        alt={`Bottiglia ${product.name}`}
        width={sizes === "thumb" ? 160 : 1000}
        height={sizes === "thumb" ? 200 : 1300}
        loading="lazy"
        className={cn("aspect-[4/5] w-full rounded-sm object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={product.name}
      className={cn(
        "relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm px-5 text-center",
        className,
      )}
      style={{
        backgroundColor: `color-mix(in oklab, ${product.accentColor} 16%, var(--background))`,
      }}
    >
      <Crown
        className={cn(
          "absolute text-foreground",
          sizes === "thumb" ? "size-14 opacity-[0.08]" : "size-36 opacity-[0.1] md:size-44",
        )}
      />
      <p
        className={cn(
          "relative font-display leading-tight tracking-tight",
          sizes === "thumb" ? "text-sm" : "text-2xl md:text-3xl",
        )}
      >
        {product.name}
      </p>
    </div>
  );
}
