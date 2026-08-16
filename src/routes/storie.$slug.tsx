import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getStoryBySlug, stories } from "@/data/stories";

export const Route = createFileRoute("/storie/$slug")({
  loader: ({ params }) => {
    const story = getStoryBySlug(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Storia non trovata — Regina Spirits" }, { name: "robots", content: "noindex" }],
      };
    }
    const { story } = loaderData;
    return {
      meta: [
        { title: `${story.title} — Regina Spirits` },
        { name: "description", content: story.seoDescription },
        { property: "og:title", content: story.title },
        { property: "og:description", content: story.seoDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/storie/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/storie/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: story.title,
            datePublished: story.date,
            author: { "@type": "Organization", name: "Regina Spirits" },
          }),
        },
      ],
    };
  },
  component: StoryPage,
});

function StoryPage() {
  const { story } = Route.useLoaderData();
  const related = story.related
    .map((slug) => stories.find((s) => s.slug === slug))
    .filter((s): s is (typeof stories)[number] => Boolean(s));

  return (
    <article className="pb-24">
      <header className="page-x mx-auto max-w-[1440px] pt-32 md:pt-44">
        <p className="eyebrow">
          {story.category} ·{" "}
          {new Date(story.date).toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}{" "}
          · {story.readingTime}
        </p>
        <h1 className="display-lg mt-6 max-w-[18ch]">{story.title}</h1>
      </header>

      <div className="page-x mx-auto max-w-[1440px]">
        <img
          src={story.image}
          alt={story.title}
          width={1600}
          height={900}
          className="mt-10 aspect-[16/9] w-full rounded-sm object-cover"
        />
        <div className="measure mt-12 space-y-6 text-muted-foreground">
          {story.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-border pt-10">
            <h2 className="eyebrow">Continua a leggere</h2>
            <ul className="mt-8 grid gap-8 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to="/storie/$slug" params={{ slug: r.slug }} className="group block">
                    <img
                      src={r.image}
                      alt={r.title}
                      width={1200}
                      height={675}
                      loading="lazy"
                      className="aspect-[16/9] w-full rounded-sm object-cover"
                    />
                    <h3 className="mt-4 font-display text-xl">{r.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
