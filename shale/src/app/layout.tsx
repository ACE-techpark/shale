import type { Metadata } from "next";
import { translations } from "@/lib/i18n";
import "@fontsource/noto-sans-georgian/400.css";
import "@fontsource/noto-sans-georgian/600.css";
import "./globals.css";
import { SiteProvider } from "@/components/providers/SiteProvider";

const themeBootstrap = `(()=>{try{const l=localStorage.getItem('site-language');const lang=l==='en'?'en':'ka';document.documentElement.lang=lang;document.documentElement.dataset.language=lang;const saved=localStorage.getItem('site-theme');const theme=saved==='dark'||saved==='light'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme}catch{document.documentElement.dataset.theme='light'}})()`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: translations.ka.metadata.title,
  description: translations.ka.metadata.description,
  openGraph: {
    images: [{ url: "/logo.png", width: 150, height: 150, alt: "Shemokmedi Chalet" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body><SiteProvider>{children}</SiteProvider></body>
    </html>
  );
}
