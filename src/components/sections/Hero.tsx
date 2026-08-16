import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site-content";
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
            <Link
              to="/prodotti"
              className="flex min-h-12 items-center justify-center rounded-full bg-background px-8 text-sm text-ink transition-opacity hover:opacity-90"
            >
              Scopri i prodotti
            </Link>
            <Link
              to="/laboratorio"
              className="flex min-h-12 items-center justify-center rounded-full border border-background/40 px-8 text-sm text-background transition-colors hover:bg-background/10"
            >
              Conosci il laboratorio
            </Link>
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
