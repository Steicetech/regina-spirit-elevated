import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/cookie")({
  head: () => ({
    meta: [
      { title: "Cookie policy — Regina Spirits" },
      { name: "description", content: "Informativa cookie Regina Spirits." },
      { property: "og:title", content: "Cookie policy — Regina Spirits" },
      { property: "og:description", content: "Informativa cookie Regina Spirits." },
      { property: "og:url", content: "/cookie" },
    ],
    links: [{ rel: "canonical", href: "/cookie" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Legale" title="Cookie policy" />
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
