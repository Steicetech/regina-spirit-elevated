import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { FeaturedShowcase } from "@/components/sections/FeaturedShowcase";
import { LabSection } from "@/components/sections/LabSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { MantovaSection } from "@/components/sections/MantovaSection";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { SocialSection } from "@/components/sections/SocialSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Regina Spirits · Mantova da Gustare" },
      {
        name: "description",
        content:
          "Liquorificio artigianale a Pomponesco, Mantova. Dal 2004 gin, aperitivi e liquori creati nel nostro laboratorio.",
      },
      { property: "og:title", content: "Regina Spirits · Mantova da Gustare" },
      {
        property: "og:description",
        content: "Gin, aperitivi e liquori artigianali dal laboratorio di Pomponesco, Mantova.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <FeaturedShowcase />
      <Intro />
      <LabSection />
      <AwardsSection />
      <MantovaSection />
      <StoriesSection />
      <SocialSection />
    </>
  );
}
