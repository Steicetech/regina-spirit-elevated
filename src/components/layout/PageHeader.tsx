import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-x mx-auto max-w-[1440px] pb-10 pt-32 md:pt-44">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-lg mt-6 max-w-[16ch]">{title}</h1>
        {intro && <p className="measure mt-8 text-muted-foreground">{intro}</p>}
        {children}
      </Reveal>
    </header>
  );
}
