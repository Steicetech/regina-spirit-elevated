import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { KeyFigures, ProcessBlock, Timeline } from "@/components/sections/InstitutionalStory";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { Button } from "@/components/ui/button";
import { labIntro } from "@/data/site-content";
import laboratorio from "@/assets/laboratorio.jpg";
import mani from "@/assets/mani.jpg";
import cocktail from "@/assets/cocktail.jpg";
import mantovaImg from "@/assets/mantova.jpg";

export const Route = createFileRoute("/laboratorio")({
  head: () => ({
    meta: [
      { title: "Laboratorio — Regina Spirits" },
      {
        name: "description",
        content: "Il laboratorio Regina Spirits a Pomponesco: ricette, ingredienti, produzione.",
      },
      { property: "og:title", content: "Laboratorio — Regina Spirits" },
      { property: "og:description", content: "Dentro il laboratorio di Pomponesco." },
      { property: "og:url", content: "/laboratorio" },
    ],
    links: [{ rel: "canonical", href: "/laboratorio" }],
  }),
  component: Laboratorio,
});

function Laboratorio() {
  return (
    <div className="pb-16 md:pb-24">
      <PageHeader eyebrow="Laboratorio" title="Il luogo dove nasce tutto" intro={labIntro} />
      <ImageStreamHero
        images={[
          { src: laboratorio, alt: "Il laboratorio Regina Spirits" },
          { src: mani, alt: "Lavorazione delle botaniche" },
          { src: cocktail, alt: "Il risultato nel bicchiere" },
          { src: mantovaImg, alt: "Mantova" },
        ]}
        cards={8}
        speed={36}
        axis={50}
        className="mx-auto mt-6 h-[52vh] min-h-[320px] w-full bg-ink md:h-[62vh]"
      />
      <div className="page-x mx-auto max-w-[1440px]">
        <KeyFigures />
        <ProcessBlock image={laboratorio} imageAlt="Alambicco in rame nel laboratorio" flip />
        <Timeline />

        <div className="grid gap-5 py-12 md:grid-cols-2 md:py-16">
          <MaskReveal>
            <img
              src={mani}
              alt="Lavorazione manuale delle botaniche"
              width={1200}
              height={1200}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
          </MaskReveal>
          <MaskReveal className="md:mt-12">
            <img
              src={cocktail}
              alt="Il risultato nel bicchiere"
              width={1200}
              height={1200}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
          </MaskReveal>
        </div>

        <Reveal className="border-t border-border py-12 md:py-16">
          <p className="eyebrow eyebrow-rule">Conto terzi</p>
          <h2 className="display-md mt-6 max-w-[14ch]">Il laboratorio si apre.</h2>
          <p className="measure mt-6 text-muted-foreground">
            Capacità, ingredienti e tempi di produzione per i progetti conto terzi [DA CONFERMARE].
          </p>
          <Button asChild variant="brand" size="lg" className="mt-8">
            <Link to="/conto-terzi">Produzione conto terzi</Link>
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
