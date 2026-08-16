import { Reveal, MaskReveal } from "@/components/motion/Reveal";
import { aboutIntro, pillars } from "@/data/site-content";
import laboratorio from "@/assets/laboratorio.jpg";

export function Intro() {
  return (
    <section className="page-x mx-auto max-w-[1440px] py-24 md:py-36">
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <Reveal>
            <p className="eyebrow eyebrow-rule">Chi siamo</p>
            <h2 className="display-lg mt-6 max-w-[14ch]">Un laboratorio, una misura precisa.</h2>
            <p className="measure mt-8 text-muted-foreground">{aboutIntro}</p>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <MaskReveal>
            <img
              src={laboratorio}
              alt="Alambicco e vetreria nel laboratorio Regina Spirits"
              width={1600}
              height={1100}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
          </MaskReveal>
        </div>
      </div>

      <ul className="mt-20 grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.06}>
            <h3 className="font-display text-xl">{p.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
