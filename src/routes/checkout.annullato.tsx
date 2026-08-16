import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout/annullato")({
  head: () => ({
    meta: [
      { title: "Pagamento annullato — Regina Spirits" },
      { name: "description", content: "Il pagamento è stato annullato." },
      { property: "og:title", content: "Pagamento annullato — Regina Spirits" },
      { property: "og:description", content: "Il pagamento è stato annullato." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Annullato,
});

function Annullato() {
  return (
    <div className="page-x mx-auto flex min-h-[70svh] max-w-[1440px] flex-col justify-center py-32">
      <h1 className="display-md">Pagamento annullato</h1>
      <p className="measure mt-6 text-muted-foreground">
        Nessun addebito è stato effettuato. Il tuo carrello è ancora disponibile.
      </p>
      <Button asChild variant="brand" size="lg" className="mt-10 w-full sm:w-auto sm:self-start">
        <Link to="/carrello">Torna al carrello</Link>
      </Button>
    </div>
  );
}
