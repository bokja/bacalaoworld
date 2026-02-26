import type { Metadata, Viewport } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

const baseUrl = "https://bacalaoworld.no";

export const metadata: Metadata = {
  title: {
    default: "BacalaoWorld – Alt om bacalao og klippfisk",
    template: "%s | BacalaoWorld",
  },
  description:
    "Oppskrifter, historie og tips om bacalao og klippfisk. Fra klassisk norsk bacalao til internasjonale varianter.",
  metadataBase: new URL(baseUrl),
  alternates: { languages: { "nb-NO": baseUrl } },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "BacalaoWorld",
    images: [
      {
        url: "/og/?title=BacalaoWorld&subtitle=Alt+om+bacalao+og+klippfisk",
        width: 1200,
        height: 630,
        alt: "BacalaoWorld – Alt om bacalao og klippfisk",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#8B4513",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "BacalaoWorld",
      url: baseUrl,
      description: "Alt om bacalao og klippfisk – oppskrifter, historie og tips",
      inLanguage: "nb-NO",
      publisher: { "@id": `${baseUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "BacalaoWorld",
      url: baseUrl,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <Header />
        <main id="main-content" className="min-h-[70vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
