import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatPrice, getCategoryName, getProductBySlug } from "@/data/products";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/prodotti/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Prodotto non trovato — Regina Spirits" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Regina Spirits` },
        { name: "description", content: `${getCategoryName(product.category)}. ${product.shortDescription}` },
        { property: "og:title", content: `${product.name} — Regina Spirits` },
        { property: "og:description", content: product.shortDescription },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/prodotti/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/prodotti/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            category: getCategoryName(product.category),
            brand: { "@type": "Brand", name: "Regina Spirits" },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();

  return (
    <article
      className="pb-24 pt-28 md:pt-36"
      style={{ backgroundColor: `color-mix(in oklab, ${product.accentColor} 5%, transparent)` }}
    >
      <div className="page-x mx-auto grid max-w-[1440px] gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <img
            src={product.images[0]}
            alt={`Bottiglia ${product.name}`}
            width={1000}
            height={1300}
            className="mx-auto aspect-[4/5] w-full max-w-md rounded-sm object-cover md:max-w-none"
          />
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <Reveal>
            <Link
              to="/prodotti/categorie/$slug"
              params={{ slug: product.category }}
              className="inline-flex min-h-10 items-center text-xs text-muted-foreground underline underline-offset-4"
            >
              {getCategoryName(product.category)}
            </Link>
            <p className="eyebrow mt-6" style={{ color: product.accentColor }}>
              {getCategoryName(product.category)}
            </p>
            <h1 className="display-md mt-3">{product.name}</h1>
            <p className="measure mt-6 text-muted-foreground">{product.fullDescription}</p>

            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm sm:grid-cols-3">
              <div>
                <dt className="eyebrow">Formato</dt>
                <dd className="mt-1">{product.volume}</dd>
              </div>
              <div>
                <dt className="eyebrow">Gradazione</dt>
                <dd className="mt-1">{product.alcohol}</dd>
              </div>
              <div>
                <dt className="eyebrow">Prezzo</dt>
                <dd className="mt-1">{formatPrice(product.price)}</dd>
              </div>
            </dl>

            <AddToCartButton product={product} className="mt-8 w-full sm:w-auto" />

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="eyebrow">Note di degustazione</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {product.tastingNotes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="eyebrow">Come si serve</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {product.servingSuggestions.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
