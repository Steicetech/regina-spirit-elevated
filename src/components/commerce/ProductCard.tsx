import { Link } from "@tanstack/react-router";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { ProductImage } from "@/components/commerce/ProductImage";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { formatPrice, getCategoryName, type Product } from "@/data/products";

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  return (
    <Reveal as="li" delay={delay} className="flex flex-col">
      <Link
        to="/prodotti/$slug"
        params={{ slug: product.slug }}
        className="group block"
        style={{
          backgroundColor: `color-mix(in oklab, ${product.accentColor} 6%, transparent)`,
        }}
      >
        <ProductImage
          product={product}
          className="transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </Link>
      <p className="eyebrow mt-5">{getCategoryName(product.category)}</p>
      <h2 className="mt-2 font-display text-2xl font-normal tracking-tight">{product.name}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {product.volume} · {product.alcohol}
      </p>
      <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
      <div className="mt-5 flex flex-col gap-2">
        <AddToCartButton product={product} className="w-full" />
        <Button asChild variant="brandOutline" size="lg" className="w-full">
          <Link to="/prodotti/$slug" params={{ slug: product.slug }}>
            Scopri
          </Link>
        </Button>
      </div>
    </Reveal>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} delay={i * 0.06} />
      ))}
    </ul>
  );
}
