import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";

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
      <Link
        to="/"
        className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-7 text-sm text-background sm:w-auto sm:self-start"
      >
        Torna alla home
      </Link>
    </div>
  );
}
