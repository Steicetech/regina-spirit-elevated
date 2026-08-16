import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductGrid } from "@/components/commerce/ProductCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { getCategory, getProductsByCategory } from "@/data/products";

export const Route = createFileRoute("/prodotti/categorie/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category, products: getProductsByCategory(category.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Categoria non trovata — Regina Spirits" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.name} — Regina Spirits` },
        { name: "description", content: category.description },
        { property: "og:title", content: `${category.name} — Regina Spirits` },
        { property: "og:description", content: category.description },
        { property: "og:url", content: `/prodotti/categorie/${category.slug}` },
      ],
      links: [{ rel: "canonical", href: `/prodotti/categorie/${category.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();

  return (
    <div className="pb-24">
      <PageHeader eyebrow="Prodotti" title={category.name} intro={category.description} />
      <div className="page-x mx-auto max-w-[1440px]">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
