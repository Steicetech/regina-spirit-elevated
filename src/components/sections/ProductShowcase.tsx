import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { featuredProducts, formatPrice, getCategoryName, type Product } from "@/data/products";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { CategoryGrid } from "@/components/commerce/CategoryGrid";
import { Reveal } from "@/components/motion/Reveal";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { cn } from "@/lib/utils";
import laboratorio from "@/assets/laboratorio.jpg";
import mantovaImg from "@/assets/mantova.jpg";
import cocktail from "@/assets/cocktail.jpg";
import mani from "@/assets/mani.jpg";

const streamImages = [
  ...featuredProducts.map((product) => ({
    src: product.images[0],
    alt: `Bottiglia ${product.name}`,
  })),
  { src: laboratorio, alt: "Laboratorio Regina Spirits" },
  { src: cocktail, alt: "Cocktail Regina Spirits" },
  { src: mantovaImg, alt: "Mantova" },
  { src: mani, alt: "Lavorazione artigianale" },
];

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
            <p className="eyebrow" style={{ color: product.accentColor }}>
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
              <Link
                to="/prodotti/$slug"
                params={{ slug: product.slug }}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-foreground px-7 text-sm transition-colors hover:bg-foreground hover:text-background"
              >
                Scopri
              </Link>
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
        <ImageStreamHero
          images={streamImages}
          cards={9}
          speed={20}
          axis={52}
          className="min-h-[70svh] w-full bg-ink text-background md:min-h-[80svh]"
        >
          <div className="relative z-10 flex min-h-[70svh] flex-col items-center justify-center px-5 py-20 text-center md:min-h-[80svh]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ink)_55%,transparent)_30%,color-mix(in_oklab,var(--ink)_88%,transparent)_78%)]"
            />
            <div className="relative">
              <p className="eyebrow text-background/60">I più venduti</p>
              <h2 id="prodotti-title" className="display-lg mx-auto mt-6 max-w-[12ch]">
                Quattro bottiglie.
              </h2>
            </div>
          </div>
        </ImageStreamHero>

        {featuredProducts.map((product, i) => (
          <ProductBlock key={product.id} product={product} index={i} />
        ))}
      </section>
      <CategoryGrid />
    </>
  );
}
