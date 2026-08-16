import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { mantovaIntro } from "@/data/site-content";
import mantovaImg from "@/assets/mantova.jpg";
import cocktail from "@/assets/cocktail.jpg";

export function MantovaSection() {
  return (
    <section className="page-x mx-auto max-w-[1440px] py-16 md:py-24">
      <Reveal>
        <p className="eyebrow eyebrow-rule">Territorio</p>
        <h2 className="display-lg mt-6 max-w-[14ch]">Il nostro territorio</h2>
        <p className="measure mt-8 text-muted-foreground">{mantovaIntro}</p>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-12">
        <MaskReveal className="md:col-span-8">
          <img
            src={mantovaImg}
            alt="Architettura di Mantova riflessa nell'acqua"
            width={1600}
            height={1100}
            loading="lazy"
            className="aspect-[16/10] w-full rounded-sm object-cover"
          />
        </MaskReveal>
        <MaskReveal className="md:col-span-4 md:mt-14">
          <img
            src={cocktail}
            alt="Aperitivo servito su tavolo in marmo"
            width={1200}
            height={1200}
            loading="lazy"
            className="aspect-square w-full rounded-sm object-cover"
          />
        </MaskReveal>
      </div>
    </section>
  );
}
