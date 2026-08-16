import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/Reveal";
import { categories, getProductsByCategory } from "@/data/products";

export function CategoryGrid({
  eyebrow = "Catalogo",
  title = "Quattro famiglie.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section aria-labelledby="categorie-title" className="page-x mx-auto max-w-[1440px] border-t border-border py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="categorie-title" className="display-lg mt-6 max-w-[14ch]">
          {title}
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, i) => {
          const count = getProductsByCategory(category.slug).length;
          return (
            <Reveal as="li" key={category.slug} delay={i * 0.06}>
              <Link
                to="/prodotti/categorie/$slug"
                params={{ slug: category.slug }}
                className="group flex h-full flex-col rounded-sm border border-border p-6 transition-colors hover:bg-secondary"
                style={{
                  backgroundColor: `color-mix(in oklab, ${category.accentColor} 7%, transparent)`,
                }}
              >
                <p className="eyebrow" style={{ color: category.accentColor }}>
                  {count} prodotti
                </p>
                <h3 className="mt-4 font-display text-2xl tracking-tight">{category.name}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{category.description}</p>
                <span className="mt-8 inline-flex min-h-10 items-center text-sm underline underline-offset-8 decoration-bronzo">
                  Scopri
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
