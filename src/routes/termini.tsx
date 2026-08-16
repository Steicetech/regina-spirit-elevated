import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/termini")({
  head: () => ({
    meta: [
      { title: "Termini e condizioni — Regina Spirits" },
      { name: "description", content: "Termini e condizioni di vendita Regina Spirits." },
      { property: "og:title", content: "Termini e condizioni — Regina Spirits" },
      { property: "og:description", content: "Termini e condizioni di vendita Regina Spirits." },
      { property: "og:url", content: "/termini" },
    ],
    links: [{ rel: "canonical", href: "/termini" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Legale" title="Termini e condizioni" />
      <div className="page-x measure mx-auto max-w-[1440px] space-y-6 text-muted-foreground">
        <p>
          Testo legale [DA CONFERMARE]. Questo contenuto è un segnaposto in attesa della versione
          validata dalla Regina Spirits e dal proprio consulente.
        </p>
        <p>
          La vendita di bevande alcoliche è riservata ai maggiori di 18 anni. Bevi responsabilmente.
        </p>
      </div>
    </div>
  );
}
