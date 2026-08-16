import { createFileRoute, Link } from "@tanstack/react-router";

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
      <Link
        to="/carrello"
        className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-foreground px-7 text-sm text-background sm:w-auto sm:self-start"
      >
        Torna al carrello
      </Link>
    </div>
  );
}
