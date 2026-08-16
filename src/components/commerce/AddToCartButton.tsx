import { useCart } from "@/lib/cart";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  product,
  className,
  label = "Acquista",
}: {
  product: Product;
  className?: string;
  label?: string;
}) {
  const { add } = useCart();

  if (!product.available) {
    return (
      <span
        className={cn(
          "inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 text-sm text-muted-foreground",
          className,
        )}
      >
        Non disponibile
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => add(product.id)}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm text-background transition-opacity hover:opacity-90",
        className,
      )}
    >
      {label}
    </button>
  );
}
