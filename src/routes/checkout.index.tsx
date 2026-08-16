import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageHeader } from "@/components/layout/PageHeader";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";
import { createCheckoutSession } from "@/lib/checkout.functions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout/")({
  head: () => ({
    meta: [
      { title: "Checkout — Regina Spirits" },
      { name: "description", content: "Completa il tuo ordine Regina Spirits." },
      { property: "og:title", content: "Checkout — Regina Spirits" },
      { property: "og:description", content: "Completa il tuo ordine Regina Spirits." },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal, lines } = useCart();
  const startCheckout = useServerFn(createCheckoutSession);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);

  const paga = async () => {
    setStatus("loading");
    setError(null);
    try {
      const result = await startCheckout({
        data: { lines, origin: window.location.origin },
      });
      if (result.ok) {
        window.location.href = result.url;
        return;
      }
      setError(result.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore imprevisto durante il checkout.");
    }
    setStatus("idle");
  };

  return (
    <div className="pb-24">
      <PageHeader eyebrow="Checkout" title="Riepilogo ordine" />
      <div className="page-x mx-auto max-w-[1440px]">
        {items.length === 0 ? (
          <div className="border-t border-border py-16">
            <p className="text-muted-foreground">Non ci sono articoli da acquistare.</p>
            <Button asChild variant="brand" size="lg" className="mt-6">
              <Link to="/prodotti">Scopri i prodotti</Link>
            </Button>
          </div>
        ) : (
          <div className="max-w-xl">
            <ul className="divide-y divide-border border-y border-border">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-4 py-4 text-sm"
                >
                  <span className="min-w-0 truncate">
                    {product.name} × {quantity}
                  </span>
                  <span className="shrink-0">{formatPrice(product.price * quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Totale</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <Button
              type="button"
              variant="brand"
              size="lg"
              onClick={paga}
              disabled={status === "loading"}
              className="mt-8 w-full sm:w-auto"
            >
              {status === "loading" ? "Reindirizzamento…" : "Paga con Stripe (test)"}
            </Button>

            <p aria-live="polite" className="mt-4 text-sm text-destructive">
              {error}
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              Pagamenti in modalità test. Carta, Apple Pay e Google Pay sono attivi solo dove
              supportati da Stripe e dal dispositivo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
