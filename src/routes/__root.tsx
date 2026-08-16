import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeGate } from "@/components/layout/AgeGate";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { CartDrawer } from "@/components/commerce/CartDrawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <h1 className="display-md">Pagina non trovata</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-foreground px-7 text-sm text-background"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <h1 className="display-md">Qualcosa è andato storto</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Riprova o torna alla home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-12 items-center rounded-full bg-foreground px-7 text-sm text-background"
          >
            Riprova
          </button>
          <a
            href="/"
            className="inline-flex min-h-12 items-center rounded-full border border-border px-7 text-sm"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Regina Spirits — Liquorificio artigianale a Mantova" },
      {
        name: "description",
        content:
          "Dal 2004 gin, aperitivi e liquori artigianali dal laboratorio di Pomponesco, Mantova.",
      },
      { property: "og:site_name", content: "Regina Spirits" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "it_IT" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#F5F3EE" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Inter:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Regina Spirits",
          url: "https://reginaspirits.com",
          slogan: "Mantova da Gustare",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Pomponesco",
            addressRegion: "Mantova",
            addressCountry: "IT",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-3 focus:text-sm focus:text-background"
        >
          Vai al contenuto
        </a>
        <Header />
        <main id="contenuto">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <CookieConsent />
        <AgeGate />
      </CartProvider>
    </QueryClientProvider>
  );
}
