import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/carrello")({
  head: () => ({
    meta: [
      { title: "Carrello — Regina Spirits" },
      { name: "description", content: "Il tuo carrello Regina Spirits." },
      { property: "og:title", content: "Carrello — Regina Spirits" },
      { property: "og:description", content: "Il tuo carrello Regina Spirits." },
      { property: "og:url", content: "/carrello" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/carrello" }],
  }),
  component: Carrello,
});

function Carrello() {
  const { items, subtotal, setQuantity, remove } = useCart();

  return (
    <div className="pb-24">
      <PageHeader eyebrow="Acquista" title="Carrello" />
      <div className="page-x mx-auto max-w-[1440px]" aria-live="polite">
        {items.length === 0 ? (
          <div className="border-t border-border py-16">
            <p className="text-muted-foreground">Il tuo carrello è vuoto.</p>
            <Link
              to="/prodotti"
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-foreground px-7 text-sm text-background"
            >
              Scopri i prodotti
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12">
            <ul className="divide-y divide-border border-y border-border lg:col-span-8">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-5 py-6">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    width={96}
                    height={124}
                    loading="lazy"
                    className="w-24 shrink-0 rounded-sm object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          aria-label={`Riduci ${product.name}`}
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          className="grid size-11 place-items-center"
                        >
                          <Minus className="size-4" strokeWidth={1.5} />
                        </button>
                        <span className="w-6 text-center text-sm">{quantity}</span>
                        <button
                          type="button"
                          aria-label={`Aumenta ${product.name}`}
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          className="grid size-11 place-items-center"
                        >
                          <Plus className="size-4" strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="min-h-11 text-xs text-muted-foreground underline underline-offset-4"
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="lg:col-span-4">
              <div className="rounded-sm border border-border bg-card p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotale</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Spedizione e imposte calcolate al checkout.
                </p>
                <Link
                  to="/checkout"
                  className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-foreground text-sm text-background"
                >
                  Procedi al checkout
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
