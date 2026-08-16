import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout/successo")({
  head: () => ({
    meta: [
      { title: "Ordine confermato — Regina Spirits" },
      { name: "description", content: "Grazie per il tuo ordine." },
      { property: "og:title", content: "Ordine confermato — Regina Spirits" },
      { property: "og:description", content: "Grazie per il tuo ordine." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Successo,
});

function Successo() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="page-x mx-auto flex min-h-[70svh] max-w-[1440px] flex-col justify-center py-32">
      <h1 className="display-md">Grazie.</h1>
      <p className="measure mt-6 text-muted-foreground">
        Il pagamento di test è andato a buon fine. Riceverai una conferma via email.
      </p>
      <Button asChild variant="brand" size="lg" className="mt-10 w-full sm:w-auto sm:self-start">
        <Link to="/">Torna alla home</Link>
      </Button>
    </div>
  );
}
