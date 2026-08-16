import { Link } from "@tanstack/react-router";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { labIntro } from "@/data/site-content";
import laboratorio from "@/assets/laboratorio.jpg";
import mani from "@/assets/mani.jpg";

export function LabSection() {
  return (
    <section className="bg-ink py-24 text-background md:py-36">
      <div className="page-x mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow eyebrow-rule text-background/50">Laboratorio</p>
              <h2 className="display-lg mt-6">Pomponesco</h2>
              <p className="measure mt-8 text-background/70">{labIntro}</p>
              <Link
                to="/laboratorio"
                className="mt-9 inline-flex min-h-12 items-center rounded-full border border-background/40 px-7 text-sm transition-colors hover:bg-background/10"
              >
                Entra nel laboratorio
              </Link>
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
