import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { keyFigures, processCopy, timeline } from "@/data/site-content";
import { cn } from "@/lib/utils";

export function KeyFigures() {
  return (
    <ul className="grid gap-10 border-t border-border py-12 sm:grid-cols-2 lg:grid-cols-4 md:py-16">
      {keyFigures.map((item, i) => (
        <Reveal as="li" key={item.label} delay={i * 0.06}>
          <p
            className={cn(
              "font-display leading-none tracking-tight",
              item.value.length > 4 ? "text-2xl md:text-3xl" : "text-5xl md:text-6xl",
            )}
          >
            {item.value}
          </p>
          <p className="mt-3 text-sm">{item.label}</p>
          <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export function Timeline() {
  return (
    <ol className="grid gap-10 border-t border-border py-12 md:grid-cols-4 md:py-16">
      {timeline.map((item, i) => (
        <Reveal as="li" key={`${item.year}-${i}`} delay={i * 0.06}>
          <p
            className={cn(
              "font-display leading-none text-bronzo",
              item.year.length > 4 ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl",
            )}
          >
            {item.year}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">{item.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function ProcessBlock({
  image,
  imageAlt,
  flip = false,
}: {
  image: string;
  imageAlt: string;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 py-12 md:grid-cols-12 md:gap-14 md:py-16">
      <MaskReveal className={cn("md:col-span-6", flip && "md:order-2")}>
        <img
          src={image}
          alt={imageAlt}
          width={1600}
          height={1100}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-sm object-cover"
        />
      </MaskReveal>
      <Reveal
        className={cn("md:col-span-5", flip ? "md:order-1 md:col-start-1" : "md:col-start-8")}
      >
        <p className="eyebrow eyebrow-rule">Il processo</p>
        <h2 className="display-md mt-6 max-w-[14ch]">{processCopy.title}</h2>
        <p className="measure mt-6 text-muted-foreground">{processCopy.intro}</p>
        <ol className="mt-8 space-y-6">
          {processCopy.steps.map((step, i) => (
            <li key={step.title}>
              <p className="font-display text-2xl">
                <span className="text-bronzo">{String(i + 1).padStart(2, "0")}</span> {step.title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}
