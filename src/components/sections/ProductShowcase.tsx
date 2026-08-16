import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { featuredProducts, formatPrice, getCategoryName, type Product } from "@/data/products";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { CategoryGrid } from "@/components/commerce/CategoryGrid";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ProductBlock({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [24, -24]);
  const flip = index % 2 === 1;

  return (
    <article
      ref={ref}
      className="border-t border-border py-16 md:py-28"
      style={{ backgroundColor: `color-mix(in oklab, ${product.accentColor} 5%, transparent)` }}
    >
      <div className="page-x mx-auto grid max-w-[1440px] items-center gap-10 md:grid-cols-12 md:gap-14">
        <div className={cn("md:col-span-6", flip && "md:order-2")}>
          <motion.img
            style={{ y }}
            src={product.images[0]}
            alt={`Bottiglia ${product.name}`}
            width={1000}
            height={1300}
            loading="lazy"
            className="mx-auto aspect-[4/5] w-full max-w-md rounded-sm object-cover md:max-w-none"
          />
        </div>
        <div className={cn("md:col-span-5", flip ? "md:order-1 md:col-start-1" : "md:col-start-8")}>
          <Reveal>
            <p className="font-display text-5xl leading-none text-bronzo md:text-6xl">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="eyebrow mt-6" style={{ color: product.accentColor }}>
              {getCategoryName(product.category)}
            </p>
            <h3 className="display-md mt-4">{product.name}</h3>
            <p className="measure mt-5 text-muted-foreground">{product.shortDescription}</p>
            <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm sm:grid-cols-3">
              <div>
                <dt className="eyebrow">Formato</dt>
                <dd className="mt-1">{product.volume}</dd>
              </div>
              <div>
                <dt className="eyebrow">Gradazione</dt>
                <dd className="mt-1">{product.alcohol}</dd>
              </div>
              <div>
                <dt className="eyebrow">Prezzo</dt>
                <dd className="mt-1">{formatPrice(product.price)}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="brandOutline" size="lg">
                <Link to="/prodotti/$slug" params={{ slug: product.slug }}>
                  Scopri
                </Link>
              </Button>
              <AddToCartButton product={product} className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

export function ProductShowcase() {
  return (
    <>
      <section aria-labelledby="prodotti-title">
        <div className="page-x mx-auto max-w-[1440px] pb-6 pt-20 md:pt-28">
          <Reveal>
            <p className="eyebrow eyebrow-rule">I più venduti</p>
            <h2 id="prodotti-title" className="display-lg mt-6 max-w-[12ch]">
              Quattro bottiglie.
            </h2>
          </Reveal>
        </div>

        {featuredProducts.map((product, i) => (
          <ProductBlock key={product.id} product={product} index={i} />
        ))}
      </section>
      <CategoryGrid />
    </>
  );
}
