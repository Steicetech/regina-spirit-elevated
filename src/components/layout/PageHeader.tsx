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
    <header className="page-x mx-auto max-w-[1440px] pb-8 pt-28 md:pt-36">
      <Reveal>
        <p className="eyebrow eyebrow-rule">{eyebrow}</p>
        <h1 className="display-lg mt-6 max-w-[16ch]">{title}</h1>
        {intro && <p className="measure mt-8 text-muted-foreground">{intro}</p>}
        {children}
      </Reveal>
    </header>
  );
}
