import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { aboutIntro, pillars } from "@/data/site-content";
import laboratorio from "@/assets/laboratorio.jpg";
import mantovaImg from "@/assets/mantova.jpg";

export const Route = createFileRoute("/chi-siamo")({
  head: () => ({
    meta: [
      { title: "Chi siamo — Regina Spirits" },
      {
        name: "description",
        content: "Regina Spirits, liquorificio artigianale a Pomponesco, Mantova, dal 2004.",
      },
      { property: "og:title", content: "Chi siamo — Regina Spirits" },
      { property: "og:description", content: "Un laboratorio artigianale a Pomponesco, dal 2004." },
      { property: "og:url", content: "/chi-siamo" },
    ],
    links: [{ rel: "canonical", href: "/chi-siamo" }],
  }),
  component: ChiSiamo,
});

function ChiSiamo() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Chi siamo" title="Dal 2004, a Pomponesco" intro={aboutIntro} />
      <div className="page-x mx-auto max-w-[1440px]">
        <MaskReveal>
          <img
            src={laboratorio}
            alt="Il laboratorio Regina Spirits"
            width={1600}
            height={1100}
            loading="lazy"
            className="mt-8 aspect-[16/9] w-full rounded-sm object-cover"
          />
        </MaskReveal>

        <ul className="mt-20 grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06}>
              <h2 className="font-display text-xl">{p.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <h2 className="display-md">Mantova da Gustare</h2>
            <p className="measure mt-6 text-muted-foreground">
              Il nostro concetto guida resta lo stesso: raccontare Mantova attraverso il gusto.
              Ulteriori contenuti istituzionali [DA CONFERMARE].
            </p>
          </Reveal>
          <MaskReveal className="md:col-span-6">
            <img
              src={mantovaImg}
              alt="Mantova"
              width={1600}
              height={1100}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}
