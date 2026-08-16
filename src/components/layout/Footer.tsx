import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { legalNav, nav, responsibleDrinking, site } from "@/data/site-content";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-ink text-background">
      <div className="page-x mx-auto max-w-[1440px] py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo className="text-background" />
            <p className="measure mt-6 text-sm text-background/60">
              {site.claim} — liquorificio artigianale a {site.citta}.
            </p>
            <p className="measure mt-4 text-xs text-background/50">{responsibleDrinking}</p>
          </div>

          <nav aria-label="Navigazione footer" className="md:col-span-2">
            <h2 className="eyebrow eyebrow-rule text-background/50">Naviga</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-text inline-flex min-h-9 items-center text-sm text-background/80 hover:text-background"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="eyebrow eyebrow-rule text-background/50">Contatti</h2>
            <address className="mt-5 space-y-2 text-sm not-italic text-background/80">
              <p>{site.indirizzo}</p>
              <p>Tel. {site.telefono}</p>
              <p>{site.email}</p>
              <p>P.IVA {site.partitaIva}</p>
            </address>
            <p className="mt-6">
              <a
                href={site.socialUrl}
                className="link-text inline-flex min-h-9 items-center text-sm text-background/80 hover:text-background"
                rel="noreferrer"
                target="_blank"
              >
                Instagram {site.socialHandle}
              </a>
            </p>
          </div>

          <div className="md:col-span-3">
            <NewsletterForm variant="dark" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-background/15 pt-8 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain}
          </p>
          <ul className="flex flex-wrap gap-6">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-text hover:text-background">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
