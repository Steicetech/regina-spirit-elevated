import { Reveal } from "@/components/motion/Reveal";
import { showAwardsSection, verifiedAwards } from "@/data/awards";

export function AwardsSection() {
  if (!showAwardsSection || verifiedAwards.length === 0) return null;

  return (
    <section className="page-x mx-auto max-w-[1440px] border-t border-border py-16">
      <Reveal>
        <p className="eyebrow eyebrow-rule">Riconoscimenti</p>
        <h2 className="display-md mt-5">Premi</h2>
      </Reveal>
      <ul className="mt-10 grid gap-8 md:grid-cols-2">
        {verifiedAwards.map((award, i) => (
          <Reveal as="li" key={i} delay={i * 0.06} className="border-t border-border pt-6">
            <p className="font-display text-xl">{award.placement}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {award.competition} · {award.fair} · {award.city} · {award.year}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{award.product}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
