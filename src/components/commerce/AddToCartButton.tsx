import { useCart } from "@/lib/cart";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
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
      <Button variant="brandOutline" size="lg" disabled className={cn(className)}>
        Non disponibile
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="brand"
      size="lg"
      onClick={() => add(product.id)}
      className={className}
    >
      {label}
    </Button>
  );
}
