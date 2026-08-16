import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/Reveal";
import { latestStories } from "@/data/stories";

export function StoriesSection() {
  return (
    <section className="page-x mx-auto max-w-[1440px] border-t border-border py-16 md:py-24">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <Reveal>
          <p className="eyebrow eyebrow-rule">Storie</p>
          <h2 className="display-md mt-5">Dal laboratorio e dal territorio</h2>
        </Reveal>
        <Link
          to="/storie"
          className="inline-flex min-h-11 items-center text-sm underline decoration-bronzo underline-offset-8"
        >
          Tutte le storie
        </Link>
      </div>

      <ul className="mt-12 grid gap-10 md:grid-cols-3">
        {latestStories.map((story, i) => (
          <Reveal as="li" key={story.slug} delay={i * 0.07}>
            <Link to="/storie/$slug" params={{ slug: story.slug }} className="group block">
              <img
                src={story.image}
                alt={story.title}
                width={1200}
                height={900}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-sm object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <p className="eyebrow mt-5">
                {story.category} · {story.readingTime}
              </p>
              <h3 className="mt-3 font-display text-2xl">{story.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{story.excerpt}</p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
