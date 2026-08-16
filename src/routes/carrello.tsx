import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";
import { ProductImage } from "@/components/commerce/ProductImage";
import { Button } from "@/components/ui/button";

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
            <Button asChild variant="brand" size="lg" className="mt-6">
              <Link to="/prodotti">Scopri i prodotti</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12">
            <ul className="divide-y divide-border border-y border-border lg:col-span-8">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-5 py-6">
                  <div className="w-24 shrink-0">
                    <ProductImage product={product} sizes="thumb" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center rounded-xs border border-border">
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
                        className="link-text min-h-11 text-xs text-muted-foreground"
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
                <Button asChild variant="brand" size="lg" className="mt-6 w-full">
                  <Link to="/checkout">Procedi al checkout</Link>
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
