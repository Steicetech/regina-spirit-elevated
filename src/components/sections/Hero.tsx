import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site-content";
import { Button } from "@/components/ui/button";
import bottiglia01 from "@/assets/bottiglia-01.jpg";

export function Hero() {
  const reduced = useReducedMotion();
  const fade = reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-background">
      <div className="page-x relative mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-10 py-28 md:grid-cols-2 md:gap-16 md:py-0">
        <div className="relative z-10 order-1 max-w-xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-12 bg-[radial-gradient(ellipse_at_left,color-mix(in_oklab,var(--ink)_70%,transparent)_40%,transparent_75%)] md:hidden"
          />
          <motion.p
            className="eyebrow eyebrow-rule relative text-background/60"
            {...fade}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            {site.eyebrow}
          </motion.p>
          <motion.h1
            className="display-xl relative mt-6 max-w-[12ch]"
            {...fade}
            transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.claim}
          </motion.h1>
          <motion.p
            className="relative mt-7 max-w-[42ch] text-base text-background/70 md:text-lg"
            {...fade}
            transition={{ duration: 0.7, delay: 0.24 }}
          >
            {site.descrizione}
          </motion.p>
          <motion.div
            className="relative mt-10 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row"
            {...fade}
            transition={{ duration: 0.7, delay: 0.34 }}
          >
            <Button asChild variant="brand" size="lg" className="bg-background text-ink">
              <Link to="/prodotti">Scopri i prodotti</Link>
            </Button>
            <Button
              asChild
              variant="brandOutline"
              size="lg"
              className="border-background/40 text-background hover:bg-background/10 hover:text-background"
            >
              <Link to="/laboratorio">Conosci il laboratorio</Link>
            </Button>
          </motion.div>
        </div>

        <div className="order-2 h-[42vh] min-h-[280px] md:h-[100svh]">
          <img
            src={bottiglia01}
            alt="Bottiglia Regina Spirits"
            width={1000}
            height={1300}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
