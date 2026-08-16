import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { labIntro } from "@/data/site-content";
import laboratorio from "@/assets/laboratorio.jpg";
import mani from "@/assets/mani.jpg";
import cocktail from "@/assets/cocktail.jpg";

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

const blocchi = [
  { titolo: "Processo", testo: "Descrizione del processo [DA CONFERMARE]." },
  { titolo: "Ingredienti", testo: "Selezione degli ingredienti [DA CONFERMARE]." },
  { titolo: "Squadra", testo: "Le persone del laboratorio [DA CONFERMARE]." },
];

function Laboratorio() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Laboratorio" title="Il luogo dove nasce tutto" intro={labIntro} />
      <div className="page-x mx-auto max-w-[1440px]">
        <MaskReveal>
          <img
            src={laboratorio}
            alt="Alambicco in rame nel laboratorio"
            width={1600}
            height={1100}
            loading="lazy"
            className="mt-8 aspect-[16/9] w-full rounded-sm object-cover"
          />
        </MaskReveal>

        <ul className="mt-20 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
          {blocchi.map((b, i) => (
            <Reveal as="li" key={b.titolo} delay={i * 0.06}>
              <h2 className="font-display text-xl">{b.titolo}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{b.testo}</p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
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

        <div className="mt-16 border-t border-border pt-10">
          <Link
            to="/conto-terzi"
            className="inline-flex min-h-12 items-center rounded-full bg-foreground px-7 text-sm text-background"
          >
            Produzione conto terzi
          </Link>
        </div>
      </div>
    </div>
  );
}
