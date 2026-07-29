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
import { I18nProvider, useI18n } from "@/lib/i18n";

const CONTACT = {
  phone: "+40 745 024 620-Biszak Levente\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 +40 752 780 498-Bartos Attila\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 +40 745 399 267-Paizs László",
  phoneFooter: "+40 745 024 620-Biszak Levente\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 +40 752 780 498-Bartos Attila\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 +40 745 399 267-Paizs László",
  phoneRaw: "+40745024620",
  whatsapp: "40745024620",
  email: "paizsdnsauto@gmail.com",
  address: "Kézdivásárhely, Kovászna megye, Románia     Str.Garii, nr.49/ A",
};

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-dvh items-center justify-center px-4" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">{t("notFound.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("notFound.text")}</p>
        <div className="mt-8">
          <Link to="/" className="btn-primary inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold">
            {t("notFound.home")}
          </Link>
        </div>
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
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary rounded-full px-5 py-2 text-sm font-semibold"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost rounded-full px-5 py-2 text-sm font-semibold">Home</a>
        </div>
      </div>
    </div>
  );
}

export { CONTACT };

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ITP Paizs DNS Auto SRL — Stație ITP Târgu Secuiesc / Kézdivásárhely" },
      { name: "description", content: "Stație ITP autorizată în Târgu Secuiesc. Inspecție tehnică periodică pentru autoturisme, motociclete, camioane, remorci și vehicule agricole. Autorizált ITP állomás Kézdivásárhelyen." },
      { name: "keywords", content: "ITP, Târgu Secuiesc, Kézdivásárhely, inspecție tehnică, műszaki vizsgálat, Paizs, DNS Auto, RAR" },
      { name: "author", content: "ITP Paizs DNS Auto SRL" },
      { name: "theme-color", content: "#1a2540" },
      { property: "og:site_name", content: "ITP Paizs DNS Auto SRL" },
      { property: "og:title", content: "ITP Paizs DNS Auto SRL — Stație ITP Târgu Secuiesc" },
      { property: "og:description", content: "Inspecție tehnică periodică profesională în Târgu Secuiesc. Modern, rapid, de încredere." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "hu_HU" },
      { property: "og:locale:alternate", content: "ro_RO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ITP Paizs DNS Auto SRL" },
      { name: "twitter:description", content: "Stație ITP autorizată în Târgu Secuiesc." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
      { rel: "canonical", href: "/" },
      { rel: "alternate", hrefLang: "hu", href: "/" },
      { rel: "alternate", hrefLang: "ro", href: "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "AutoRepair"],
          name: "ITP Paizs DNS Auto SRL",
          description: "Stație autorizată de inspecție tehnică periodică (ITP) în Târgu Secuiesc.",
          telephone: CONTACT.phone,
          email: CONTACT.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Târgu Secuiesc",
            addressRegion: "Covasna",
            addressCountry: "RO",
          },
          areaServed: "Târgu Secuiesc",
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "16:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <I18nProvider>
      <NotFoundComponent />
    </I18nProvider>
  ),
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="hu" className="dark">
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
      <I18nProvider>
        <Outlet />
      </I18nProvider>
    </QueryClientProvider>
  );
}
