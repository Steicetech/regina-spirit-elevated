import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site-content";
import bottiglia01 from "@/assets/bottiglia-01.jpg";
import bottiglia02 from "@/assets/bottiglia-02.jpg";
import bottiglia03 from "@/assets/bottiglia-03.jpg";
import bottiglia04 from "@/assets/bottiglia-04.jpg";
import laboratorio from "@/assets/laboratorio.jpg";
import mantovaImg from "@/assets/mantova.jpg";
import cocktail from "@/assets/cocktail.jpg";
import mani from "@/assets/mani.jpg";

const corridor = [
  bottiglia01,
  laboratorio,
  bottiglia02,
  cocktail,
  bottiglia03,
  mantovaImg,
  bottiglia04,
  mani,
];

function Column({ side, images }: { side: "left" | "right"; images: string[] }) {
  const dir = side === "left" ? -1 : 1;
  return (
    <div className="relative flex flex-col gap-6">
      <motion.div
        className="flex flex-col gap-6"
        initial={{ y: side === "left" ? "0%" : "-50%" }}
        animate={{ y: side === "left" ? "-50%" : "0%" }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        style={{ transform: `rotateY(${dir * 18}deg)` }}
      >
        {[...images, ...images].map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            width={520}
            height={640}
            loading={i < 2 ? "eager" : "lazy"}
            decoding="async"
            className="aspect-[4/5] w-full rounded-sm object-cover"
          />
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const [rich, setRich] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    setRich(wide && cores >= 4 && !reduced);
  }, [reduced]);

  const left = corridor.slice(0, 4);
  const right = corridor.slice(4);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ perspective: "900px" }}
      >
        {rich ? (
          <div className="absolute inset-0 grid grid-cols-2 gap-[36vw] px-[2vw] [transform-style:preserve-3d]">
            <Column side="left" images={left} />
            <Column side="right" images={right} />
          </div>
        ) : (
          <div className="absolute inset-0 grid grid-cols-2 gap-[40vw] px-2">
            <img
              src={left[0]}
              alt=""
              width={520}
              height={640}
              className="h-full w-full object-cover"
            />
            <img
              src={right[0]}
              alt=""
              width={520}
              height={640}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ink)_82%,transparent)_35%,var(--ink)_78%)]"
      />

      <div className="page-x relative mx-auto w-full max-w-[1440px] pb-24 pt-32 text-center">
        <motion.p
          className="eyebrow text-background/60"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Liquorificio artigianale · Mantova
        </motion.p>
        <motion.h1
          className="display-xl mx-auto mt-6 max-w-[16ch]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.claim}
        </motion.h1>
        <motion.p
          className="mx-auto mt-7 max-w-[46ch] text-base text-background/70 md:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {site.descrizione}
        </motion.p>
        <motion.div
          className="mx-auto mt-10 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
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
    </section>
  );
}
