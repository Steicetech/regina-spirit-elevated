import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { stories, storyCategories } from "@/data/stories";

export const Route = createFileRoute("/storie/")({
  head: () => ({
    meta: [
      { title: "Storie — Regina Spirits" },
      {
        name: "description",
        content: "Racconti dal laboratorio, dal territorio mantovano e dai nostri prodotti.",
      },
      { property: "og:title", content: "Storie — Regina Spirits" },
      { property: "og:description", content: "Racconti dal laboratorio e dal territorio." },
      { property: "og:url", content: "/storie" },
    ],
    links: [{ rel: "canonical", href: "/storie" }],
  }),
  component: StoriePage,
});

function StoriePage() {
  const [filter, setFilter] = useState<string>("tutte");
  const visible = filter === "tutte" ? stories : stories.filter((s) => s.category === filter);

  return (
    <div className="pb-24">
      <PageHeader eyebrow="Editoriale" title="Storie" intro="Prodotti, laboratorio, Mantova, aperitivo, cocktail, persone e conto terzi." />

      <div className="page-x mx-auto max-w-[1440px]">
        <div className="-mx-1 flex snap-x gap-2 overflow-x-auto pb-2">
          {["tutte", ...storyCategories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`min-h-11 shrink-0 snap-start rounded-full border px-5 text-sm capitalize ${
                filter === c ? "border-foreground bg-foreground text-background" : "border-border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((story, i) => (
            <Reveal as="li" key={story.slug} delay={i * 0.05}>
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
                  {story.category} ·{" "}
                  {new Date(story.date).toLocaleDateString("it-IT", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {story.readingTime}
                </p>
                <h2 className="mt-3 font-display text-2xl">{story.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{story.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
