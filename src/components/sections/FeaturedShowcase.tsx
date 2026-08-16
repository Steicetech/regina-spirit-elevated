import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { featuredProducts, formatPrice, hasConfirmedPrice, type Product } from "@/data/products";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { ExclusiveBadge } from "@/components/commerce/ExclusiveBadge";
import { CategoryGrid } from "@/components/commerce/CategoryGrid";
import { ProductBlock } from "@/components/sections/ProductShowcase";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function stageBackground(product: Product) {
  const accent =
    product.category === "creme-liquorose-artigianali" ? "var(--bronzo)" : "var(--botanico)";
  return `color-mix(in oklab, ${accent} 18%, var(--ink))`;
}

function Bottle({ product }: { product: Product }) {
  return (
    <img
      src={product.images[0]}
      alt={`Bottiglia ${product.name}`}
      width={1000}
      height={1300}
      className="aspect-[4/5] w-full rounded-sm object-cover"
    />
  );
}

function FeaturedCopy({
  product,
  index,
  onDark = false,
}: {
  product: Product;
  index: number;
  onDark?: boolean;
}) {
  return (
    <div className={onDark ? "text-background" : ""}>
      <p className="font-display text-6xl leading-none text-bronzo md:text-7xl">
        {String(index + 1).padStart(2, "0")}
      </p>
      {product.exclusive && <ExclusiveBadge className="mt-6" onDark={onDark} />}
      <h3
        className={
          product.exclusive ? "display-md mt-4 max-w-[14ch]" : "display-md mt-6 max-w-[14ch]"
        }
      >
        {product.name}
      </h3>
      <p
        className={cn(
          "measure mt-5 text-sm md:text-base",
          onDark ? "text-background/70" : "text-muted-foreground",
        )}
      >
        {product.shortDescription}
      </p>
      <p className={cn("mt-6 text-sm", onDark ? "text-background/60" : "text-muted-foreground")}>
        {product.volume} · {product.alcohol}
      </p>
      <p className={cn("mt-2 text-lg", !hasConfirmedPrice(product) && "text-muted-foreground")}>
        {formatPrice(product.price)}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          variant="brand"
          size="lg"
          className={onDark ? "bg-background text-ink" : undefined}
        >
          <Link to="/prodotti/$slug" params={{ slug: product.slug }}>
            Scopri
          </Link>
        </Button>
        <AddToCartButton
          product={product}
          className={cn(
            "w-full sm:w-auto",
            onDark &&
              "border-background/40 bg-transparent text-background hover:bg-background/10 hover:text-background",
          )}
        />
      </div>
    </div>
  );
}

function ProgressTicks({
  active,
  onSelect,
  count,
}: {
  active: number;
  onSelect: (index: number) => void;
  count: number;
}) {
  return (
    <div className="flex gap-2" role="tablist" aria-label="I quattro più venduti">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={active === i}
          aria-label={`Vai al prodotto ${String(i + 1).padStart(2, "0")}`}
          onClick={() => onSelect(i)}
          className="flex min-h-11 min-w-11 items-center justify-center"
        >
          <span
            className={cn(
              "block h-px w-8 transition-colors",
              active === i ? "bg-bronzo" : "bg-background/35",
            )}
          />
        </button>
      ))}
    </div>
  );
}

function StickyStage({ products }: { products: Product[] }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const last = Math.max(products.length - 1, 1);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, last]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    setActive(Math.min(products.length - 1, Math.max(0, Math.round(value))));
  });

  const scrollToIndex = (index: number) => {
    const node = pinRef.current;
    if (!node || products.length < 2) return;
    const top = window.scrollY + node.getBoundingClientRect().top;
    const scrollable = node.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + (scrollable * index) / (products.length - 1),
      behavior: "smooth",
    });
  };

  return (
    <div ref={pinRef} className="relative hidden h-[400svh] md:block">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div
          className="absolute inset-0 transition-[background-color] duration-500"
          style={{ backgroundColor: stageBackground(products[active] ?? products[0]) }}
        />
        <div className="page-x relative mx-auto grid h-full w-full max-w-[1440px] grid-cols-12 items-center gap-10 pt-20">
          <div className="relative col-span-5 min-h-[22rem]">
            {products.map((product, i) => (
              <StagePanel key={product.id} progress={progress} index={i}>
                <FeaturedCopy product={product} index={i} onDark />
              </StagePanel>
            ))}
          </div>
          <div className="relative col-span-6 col-start-7 h-[min(70vh,36rem)]">
            {products.map((product, i) => (
              <StageImage key={product.id} product={product} progress={progress} index={i} />
            ))}
          </div>
        </div>
        <div className="page-x relative mx-auto w-full max-w-[1440px] pb-8">
          <ProgressTicks active={active} onSelect={scrollToIndex} count={products.length} />
        </div>
      </div>
    </div>
  );
}

function StagePanel({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, (value) => {
    const d = Math.abs(value - index);
    return d < 1 ? 1 - d : 0;
  });
  const y = useTransform(progress, (value) => (value - index) * -28);
  const pointerEvents = useTransform(opacity, (value) => (value > 0.45 ? "auto" : "none"));

  return (
    <motion.div className="absolute inset-0" style={{ opacity, y, pointerEvents }}>
      {children}
    </motion.div>
  );
}

function StageImage({
  product,
  progress,
  index,
}: {
  product: Product;
  progress: MotionValue<number>;
  index: number;
}) {
  const opacity = useTransform(progress, (value) => {
    const d = Math.abs(value - index);
    return d < 1 ? 1 - d : 0;
  });
  const y = useTransform(progress, (value) => (value - index) * 20);
  const scale = useTransform(progress, (value) => 1 + Math.abs(value - index) * 0.04);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, y, scale }}
    >
      <div className="w-full max-w-md">
        <Bottle product={product} />
      </div>
    </motion.div>
  );
}

function MobileCarousel({ products }: { products: Product[] }) {
  return (
    <div className="md:hidden">
      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,env(safe-area-inset-left))] pb-6">
        {products.map((product, i) => (
          <li
            key={product.id}
            className="w-[min(85vw,24rem)] shrink-0 snap-center rounded-sm p-6 text-background"
            style={{ backgroundColor: stageBackground(product) }}
          >
            <Bottle product={product} />
            <div className="mt-6">
              <FeaturedCopy product={product} index={i} onDark />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FeaturedShowcase() {
  const reduced = useReducedMotion();
  const products = featuredProducts;

  return (
    <>
      <section aria-labelledby="prodotti-title" className="bg-background">
        <div className="page-x mx-auto max-w-[1440px] pb-8 pt-16 md:pt-20">
          <Reveal>
            <p className="eyebrow">I più venduti</p>
            <h2 id="prodotti-title" className="display-lg mt-6 max-w-[12ch]">
              Quattro bottiglie.
            </h2>
          </Reveal>
        </div>

        {reduced ? (
          products.map((product, i) => (
            <ProductBlock key={product.id} product={product} index={i} />
          ))
        ) : (
          <>
            <StickyStage products={products} />
            <MobileCarousel products={products} />
          </>
        )}
      </section>
      <CategoryGrid />
    </>
  );
}
