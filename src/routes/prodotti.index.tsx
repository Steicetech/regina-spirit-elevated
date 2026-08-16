import { createFileRoute, Link } from "@tanstack/react-router";
import { featuredProducts, formatPrice } from "@/data/products";
import { site } from "@/data/site-content";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/prodotti/")({
  head: () => ({
    meta: [
      { title: "Prodotti — Regina Spirits" },
      {
        name: "description",
        content: "I quattro prodotti principali Regina Spirits: gin, aperitivi e liquori artigianali.",
      },
      { property: "og:title", content: "Prodotti — Regina Spirits" },
      {
        property: "og:description",
        content: "Gin, aperitivi e liquori artigianali dal laboratorio di Pomponesco.",
      },
      { property: "og:url", content: "/prodotti" },
    ],
    links: [{ rel: "canonical", href: "/prodotti" }],
  }),
  component: ProdottiPage,
});

function ProdottiPage() {
  return (
    <div className="page-x mx-auto max-w-[1440px] pb-24 pt-32 md:pt-44">
      <Reveal>
        <p className="eyebrow">Selezione</p>
        <h1 className="display-lg mt-6 max-w-[16ch]">I quattro prodotti principali</h1>
      </Reveal>

      <ul className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product, i) => (
          <Reveal as="li" key={product.id} delay={i * 0.06} className="flex flex-col">
            <Link
              to="/prodotti/$slug"
              params={{ slug: product.slug }}
              className="group block"
              style={{
                backgroundColor: `color-mix(in oklab, ${product.accentColor} 6%, transparent)`,
              }}
            >
              <img
                src={product.images[0]}
                alt={`Bottiglia ${product.name}`}
                width={1000}
                height={1300}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-sm object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </Link>
            <p className="eyebrow mt-5">{product.category}</p>
            <h2 className="mt-2 font-display text-2xl">{product.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {product.volume} · {product.alcohol}
            </p>
            <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
            <div className="mt-5 flex flex-col gap-2">
              <AddToCartButton product={product} className="w-full" />
              <Link
                to="/prodotti/$slug"
                params={{ slug: product.slug }}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 text-sm"
              >
                Scopri
              </Link>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-20 border-t border-border pt-10">
        <a
          href={site.catalogUrl}
          className="inline-flex min-h-12 items-center text-base underline underline-offset-8 decoration-bronzo"
        >
          Scopri il catalogo completo
        </a>
      </div>
    </div>
  );
}
