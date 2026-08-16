import { createFileRoute } from "@tanstack/react-router";
import { CategoryGrid } from "@/components/commerce/CategoryGrid";
import { ProductGrid } from "@/components/commerce/ProductCard";
import { featuredProducts } from "@/data/products";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/prodotti/")({
  head: () => ({
    meta: [
      { title: "Prodotti — Regina Spirits" },
      {
        name: "description",
        content:
          "I quattro prodotti più venduti Regina Spirits e il catalogo di liquori, creme liquorose, amari e gin artigianali.",
      },
      { property: "og:title", content: "Prodotti — Regina Spirits" },
      {
        property: "og:description",
        content: "Gin, aperitivi e liquori artigianali dal laboratorio di Pomponesco.",
      },
      { property: "og:url", content: "/prodotti" },
    ],
    links: [{ rel: "canonical", href: "/prodotti" }],
  }),
  component: ProdottiPage,
});

function ProdottiPage() {
  return (
    <div className="pb-24 pt-32 md:pt-44">
      <div className="page-x mx-auto max-w-[1440px]">
        <Reveal>
          <p className="eyebrow">I più venduti</p>
          <h1 className="display-lg mt-6 max-w-[16ch]">I quattro prodotti principali</h1>
        </Reveal>
        <ProductGrid products={featuredProducts} />
      </div>
      <CategoryGrid />
    </div>
  );
}
