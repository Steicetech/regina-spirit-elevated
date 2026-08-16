import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { featuredProducts, formatPrice, getCategoryName, type Product } from "@/data/products";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const AUTO_MS = 4000;
const SWIPE_PX = 48;
const SPRING = { type: "spring" as const, stiffness: 120, damping: 20 };

type Pose = {
  x: string;
  scale: number;
  rotateY: number;
  zIndex: number;
  opacity: number;
  filter: string;
};

function signedOffset(index: number, active: number, count: number) {
  const d = (index - active + count) % count;
  return d > count / 2 ? d - count : d;
}

function poseFor(signed: number, compact: boolean): Pose {
  if (compact) {
    if (signed === 0) {
      return {
        x: "0%",
        scale: 1,
        rotateY: 0,
        zIndex: 40,
        opacity: 1,
        filter: "blur(0px) brightness(1)",
      };
    }
    if (signed === -1) {
      return {
        x: "-40%",
        scale: 0.86,
        rotateY: 12,
        zIndex: 20,
        opacity: 0.9,
        filter: "blur(1.5px) brightness(0.6)",
      };
    }
    if (signed === 1) {
      return {
        x: "40%",
        scale: 0.86,
        rotateY: -12,
        zIndex: 20,
        opacity: 0.9,
        filter: "blur(1.5px) brightness(0.6)",
      };
    }
    return {
      x: "70%",
      scale: 0.74,
      rotateY: -18,
      zIndex: 10,
      opacity: 0,
      filter: "blur(3px) brightness(0.45)",
    };
  }

  if (signed === 0) {
    return {
      x: "0%",
      scale: 1,
      rotateY: 0,
      zIndex: 40,
      opacity: 1,
      filter: "blur(0px) brightness(1)",
    };
  }
  if (signed === -1) {
    return {
      x: "-58%",
      scale: 0.86,
      rotateY: 18,
      zIndex: 20,
      opacity: 0.9,
      filter: "blur(1.5px) brightness(0.6)",
    };
  }
  if (signed === 1) {
    return {
      x: "58%",
      scale: 0.86,
      rotateY: -18,
      zIndex: 20,
      opacity: 0.9,
      filter: "blur(1.5px) brightness(0.6)",
    };
  }
  return {
    x: "104%",
    scale: 0.74,
    rotateY: -26,
    zIndex: 10,
    opacity: 0.75,
    filter: "blur(3px) brightness(0.45)",
  };
}

function useIsMd() {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return matches;
}

function chipLabel(product: Product) {
  return product.exclusive ? "Unici a Mantova" : getCategoryName(product.category);
}

export function FeaturedCarousel() {
  const products = featuredProducts;
  const count = products.length;
  const reduced = useReducedMotion() === true;
  const compact = !useIsMd();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipe = useRef({ x: 0, tracking: false, swiped: false });

  const go = (delta: number) => {
    if (count < 2) return;
    setActive((current) => (current + delta + count) % count);
  };

  const show = (index: number) => {
    setActive(((index % count) + count) % count);
  };

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, count]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipe.current = { x: event.clientX, tracking: true, swiped: false };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!swipe.current.tracking) return;
    if (Math.abs(event.clientX - swipe.current.x) > SWIPE_PX) {
      swipe.current.swiped = true;
    }
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!swipe.current.tracking) return;
    const dx = event.clientX - swipe.current.x;
    if (dx < -SWIPE_PX) go(1);
    else if (dx > SWIPE_PX) go(-1);
    swipe.current.tracking = false;
  };

  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!swipe.current.swiped) return;
    event.preventDefault();
    event.stopPropagation();
    swipe.current.swiped = false;
  };

  const activeProduct = products[active];

  return (
    <section
      aria-labelledby="prodotti-title"
      className="overflow-x-hidden bg-ink text-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
      }}
    >
      <div className="page-x mx-auto max-w-[1440px] pb-6 pt-16 md:pt-20">
        <Reveal>
          <p className="eyebrow text-background/50">I più venduti</p>
          <h2 id="prodotti-title" className="display-lg mt-6 max-w-[12ch]">
            Quattro bottiglie.
          </h2>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div
          className="relative h-[72svh] md:h-[80svh]"
          style={{ perspective: "1400px" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            swipe.current.tracking = false;
          }}
          onClickCapture={onClickCapture}
        >
          <ul className="absolute inset-0 list-none">
            {products.map((product, index) => {
              const signed = signedOffset(index, active, count);
              const pose = poseFor(signed, compact);
              const front = signed === 0;

              return (
                <li
                  key={product.id}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    className="pointer-events-auto"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={false}
                    animate={{
                      x: pose.x,
                      scale: pose.scale,
                      rotateY: pose.rotateY,
                      opacity: pose.opacity,
                      filter: pose.filter,
                      zIndex: pose.zIndex,
                    }}
                    transition={reduced ? { duration: 0 } : SPRING}
                  >
                    <motion.div
                      animate={reduced ? { y: 0 } : { y: [0, -5, 0] }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : {
                              duration: 6,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.7,
                            }
                      }
                    >
                      <motion.div
                        whileHover={reduced || !front ? undefined : { scale: 1.02 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Link
                          to="/prodotti/$slug"
                          params={{ slug: product.slug }}
                          aria-label={`${product.name}, ${getCategoryName(product.category)}`}
                          onFocus={() => show(index)}
                          className={cn(
                            "group relative block aspect-[3/4] w-[clamp(260px,26vw,400px)] cursor-pointer overflow-hidden rounded-2xl",
                            compact && signed === 2 && "pointer-events-none",
                          )}
                        >
                          <img
                            src={product.images[0]}
                            alt=""
                            width={1000}
                            height={1300}
                            className="absolute inset-0 size-full object-cover"
                          />
                          <span className="absolute right-4 top-4 rounded-full bg-background px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink">
                            {chipLabel(product)}
                          </span>
                          {front && (
                            <span className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-ink/90 via-ink/45 to-transparent p-5 pt-16 text-left transition-colors md:block group-hover:from-ink">
                              <span className="block font-display text-2xl leading-tight">
                                {product.name}
                              </span>
                              <span className="mt-2 block line-clamp-2 text-sm text-background/75">
                                {product.shortDescription}
                              </span>
                              <span className="mt-3 block text-sm">
                                {formatPrice(product.price)}
                              </span>
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          aria-label="Prodotto precedente"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 z-50 hidden min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-background/70 hover:text-background md:flex"
        >
          <ChevronLeft strokeWidth={1.25} className="size-8" />
        </button>
        <button
          type="button"
          aria-label="Prodotto successivo"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 z-50 hidden min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-background/70 hover:text-background md:flex"
        >
          <ChevronRight strokeWidth={1.25} className="size-8" />
        </button>
      </div>

      {activeProduct && (
        <div className="page-x mx-auto max-w-[1440px] pb-2 text-center md:hidden">
          <p className="font-display text-2xl leading-tight">{activeProduct.name}</p>
          <p className="mt-2 line-clamp-2 text-sm text-background/70">
            {activeProduct.shortDescription}
          </p>
          <p className="mt-2 text-sm">{formatPrice(activeProduct.price)}</p>
        </div>
      )}

      <div className="flex justify-center gap-2 pb-16 pt-6">
        {products.map((product, index) => (
          <button
            key={product.id}
            type="button"
            aria-label={`Vai a ${product.name}`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => show(index)}
            className="flex min-h-11 min-w-11 items-center justify-center"
          >
            <span
              className={cn(
                "block h-px w-8 transition-colors",
                active === index ? "bg-bronzo" : "bg-background/35",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
