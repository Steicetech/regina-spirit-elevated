import { Reveal } from "@/components/motion/Reveal";
import { socialCards, site } from "@/data/site-content";
import { Play } from "lucide-react";

export function SocialSection() {
  return (
    <section className="page-x mx-auto max-w-[1440px] border-t border-border py-24 md:py-32">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <Reveal>
          <p className="eyebrow eyebrow-rule">Social</p>
          <h2 className="display-md mt-5">Dietro le quinte</h2>
        </Reveal>
        <span className="inline-flex min-h-11 items-center text-sm text-muted-foreground">
          Segui Regina Spirits · {site.socialHandle}
        </span>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
        {socialCards.map((card, i) => (
          <Reveal as="li" key={card.title} delay={i * 0.05}>
            <div className="flex aspect-[9/16] flex-col justify-between rounded-sm border border-border bg-card p-4">
              <Play className="size-4 text-muted-foreground" strokeWidth={1.5} />
              <div>
                <p className="eyebrow">{card.kind}</p>
                <p className="mt-1 font-display text-base leading-tight">{card.title}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
