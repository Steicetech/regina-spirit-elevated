import { Link } from "@tanstack/react-router";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { lotoCopy } from "@/data/site-content";
import mantovaImg from "@/assets/mantova.jpg";

export function LotoSection() {
  return (
    <section className="bg-ink py-16 text-background md:py-24">
      <div className="page-x mx-auto grid max-w-[1440px] items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <p className="font-display text-[clamp(4.5rem,14vw,9rem)] leading-none text-bronzo">
              {lotoCopy.year}
            </p>
            <p className="eyebrow mt-8 text-background/50">{lotoCopy.eyebrow}</p>
            <h2 className="display-lg mt-6 max-w-[12ch]">{lotoCopy.title}</h2>
            <p className="measure mt-8 text-background/70">{lotoCopy.lead}</p>
            <p className="measure mt-5 text-background/70">{lotoCopy.body}</p>
            <Button
              asChild
              variant="brandOutline"
              size="lg"
              className="mt-9 border-background/40 text-background hover:bg-background/10 hover:text-background"
            >
              <Link to="/prodotti/$slug" params={{ slug: "lotus-gin-con-fiore-di-loto" }}>
                {lotoCopy.cta}
              </Link>
            </Button>
          </Reveal>
        </div>
        <MaskReveal className="md:col-span-7">
          <img
            src={mantovaImg}
            alt={lotoCopy.imageAlt}
            width={1600}
            height={1100}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-sm object-cover md:aspect-[4/3]"
          />
        </MaskReveal>
      </div>
    </section>
  );
}
