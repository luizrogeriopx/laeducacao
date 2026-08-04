import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { getGoogleTagId, getSeoKeywords, getChatWidgetUrl } from "@/lib/settings.functions";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async () => {
    try {
      const [tag, kw, widget] = await Promise.all([
        getGoogleTagId(),
        getSeoKeywords(),
        getChatWidgetUrl(),
      ]);
      return { googleTagId: tag.value, seoKeywords: kw.value, chatWidgetUrl: widget.value };
    } catch {
      return { googleTagId: "", seoKeywords: "", chatWidgetUrl: "" };
    }
  },
  head: ({ loaderData }) => {
    const gid = loaderData?.googleTagId?.trim();
    const keywords = loaderData?.seoKeywords?.trim();
    const widgetUrl = loaderData?.chatWidgetUrl?.trim();
    const scripts = gid
      ? [
          { src: `https://www.googletagmanager.com/gtag/js?id=${gid}`, async: true },
          {
            children: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${gid}');`,
          },
        ]
      : [];
    const defaultTitle = "EJA, Supletivo e Cursos Profissionalizantes EAD | LA Educação";
    const defaultDesc = "Conclua seus estudos ou faça um curso profissionalizante EAD com certificado reconhecido pelo MEC na LA Educação Polo Goiânia e Aparecida. Matrículas abertas!";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: defaultTitle },
        { name: "description", content: defaultDesc },
        ...(keywords ? [{ name: "keywords", content: keywords }] : []),
        { name: "author", content: "LA Educação" },
        { property: "og:site_name", content: "LA Educação Goiânia" },
        { property: "og:title", content: defaultTitle },
        { property: "og:description", content: defaultDesc },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "pt_BR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: defaultTitle },
        { name: "twitter:description", content: defaultDesc },
        { property: "og:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
        { name: "twitter:image", content: "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png" },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        {
          rel: "preload",
          href: "/img/banner-cursos-ead-goiania.png",
          as: "image",
          type: "image/png"
        }
      ],
      scripts: [
        ...scripts,
        ...(widgetUrl ? [{ src: widgetUrl, async: true }] : []),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "EducationalOrganization",
                "@id": "https://www.laeducacaogo.com.br/#organization",
                "name": "LA Educação Goiânia",
                "url": "https://www.laeducacaogo.com.br",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.laeducacaogo.com.br/img/selo-la-educacao-goiania.png",
                  "caption": "LA Educação Logo"
                },
                "description": "Polo Autorizado de Cursos EAD com Certificado MEC. Supletivo EJA, Graduação, Pós-Graduação e Cursos Profissionalizantes em Goiânia, Aparecida de Goiânia e Goiás.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Goiânia",
                  "addressRegion": "GO",
                  "addressCountry": "BR"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+55-62-99659-2952",
                  "contactType": "customer service",
                  "areaServed": "BR",
                  "availableLanguage": "Portuguese"
                },
                "sameAs": [
                  "https://www.instagram.com/lic.laeducacao.goiania",
                  "https://www.facebook.com/lic.laeducacao.goiania",
                  "https://www.youtube.com/@lic.laeducacao.goiania",
                  "https://www.tiktok.com/@lic.laeducacao.goiania"
                ]
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://www.laeducacaogo.com.br/#localbusiness",
                "name": "LA Educação Goiânia e Aparecida",
                "image": "https://www.laeducacaogo.com.br/img/banner-cursos-ead-goiania.png",
                "telephone": "+55-62-99659-2952",
                "url": "https://www.laeducacaogo.com.br",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Polo Autorizado EAD",
                  "addressLocality": "Goiânia",
                  "addressRegion": "GO",
                  "addressCountry": "BR"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "-16.6869",
                  "longitude": "-49.2648"
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                }
              }
            ]
          }),
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
      <Outlet />
    </QueryClientProvider>
  );
}
