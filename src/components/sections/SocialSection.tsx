import { Reveal } from "@/components/motion/Reveal";
import { socialCards, site } from "@/data/site-content";
import { Image as ImageIcon, Play } from "lucide-react";

export function SocialSection() {
  return (
    <section className="page-x mx-auto max-w-[1440px] border-t border-border py-16 md:py-24">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <Reveal>
          <p className="eyebrow eyebrow-rule">Social</p>
          <h2 className="display-md mt-5">Dietro le quinte</h2>
        </Reveal>
        <a
          href={site.socialUrl}
          className="link-text inline-flex min-h-11 items-center text-sm text-muted-foreground"
          rel="noreferrer"
          target="_blank"
        >
          Segui Regina Spirits · {site.socialHandle}
        </a>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
        {socialCards.map((card, i) => {
          const Icon = card.kind === "Foto" ? ImageIcon : Play;
          return (
            <Reveal as="li" key={card.title} delay={i * 0.05}>
              <div className="flex aspect-[9/16] flex-col justify-between rounded-sm bg-secondary p-4">
                <Icon className="size-4 text-muted-foreground" strokeWidth={1.5} aria-hidden />
                <div>
                  <p className="eyebrow">{card.kind}</p>
                  <p className="mt-1 font-display text-base leading-tight">{card.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Contenuto in arrivo</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
