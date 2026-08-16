import { Link } from "@tanstack/react-router";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { labIntro } from "@/data/site-content";
import laboratorio from "@/assets/laboratorio.jpg";
import mani from "@/assets/mani.jpg";

export function LabSection() {
  return (
    <section className="bg-ink py-16 text-background md:py-24">
      <div className="page-x mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow eyebrow-rule text-background/50">Laboratorio</p>
              <h2 className="display-lg mt-6">Pomponesco</h2>
              <p className="measure mt-8 text-background/70">{labIntro}</p>
              <Button
                asChild
                variant="brandOutline"
                size="lg"
                className="mt-9 border-background/40 text-background hover:bg-background/10 hover:text-background"
              >
                <Link to="/laboratorio">Entra nel laboratorio</Link>
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-5 md:col-span-7 md:grid-cols-2">
            <MaskReveal>
              <img
                src={laboratorio}
                alt="Il laboratorio Regina Spirits"
                width={1600}
                height={1100}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-sm object-cover"
              />
            </MaskReveal>
            <MaskReveal className="md:mt-16">
              <img
                src={mani}
                alt="Selezione manuale delle botaniche"
                width={1200}
                height={1200}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-sm object-cover"
              />
            </MaskReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
