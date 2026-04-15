import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ContactProvider } from "@/components/contact-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://couple-coaching.kevinlourd.com"),
  title: {
    default: "Couple Coaching — Kevin Lourd",
    template: "%s | Kevin Lourd Couple Coaching",
  },
  description:
    "Polarity-based couple coaching for individuals in a relationship. Restore desire, rebuild the dynamic. 35+ years of practice.",
  keywords: [
    "couple coaching",
    "polarity coaching",
    "relationship coaching",
    "Kevin Lourd",
    "polarity",
    "masculine feminine",
    "restore desire",
    "intimacy coaching",
  ],
  authors: [{ name: "Kevin Lourd" }],
  creator: "Kevin Lourd",
  openGraph: {
    title: "Couple Coaching — Kevin Lourd",
    description:
      "Polarity-based couple coaching for individuals in a relationship. Restore desire, rebuild the dynamic.",
    url: "https://couple-coaching.kevinlourd.com",
    siteName: "Kevin Lourd Couple Coaching",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Couple Coaching — Kevin Lourd",
    description:
      "Polarity-based couple coaching for individuals in a relationship. Restore desire, rebuild the dynamic.",
    creator: "@KevinLourd",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://couple-coaching.kevinlourd.com",
  },
};

const coachingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Couple Coaching by Kevin Lourd",
  description:
    "Polarity-based couple coaching for individuals in a relationship. Analytical decomposition of relationship dynamics along the masculine-feminine axis.",
  provider: {
    "@type": "Person",
    name: "Kevin Lourd",
    url: "https://kevinlourd.com",
    image: "https://couple-coaching.kevinlourd.com/photos/kevin-portrait.jpg",
  },
  url: "https://couple-coaching.kevinlourd.com",
  serviceType: "Couple Coaching",
  areaServed: "Worldwide",
  offers: [
    {
      "@type": "Offer",
      name: "Single session",
      price: "150",
      priceCurrency: "EUR",
      description: "1-hour coaching session",
    },
    {
      "@type": "Offer",
      name: "10-hour package",
      price: "1350",
      priceCurrency: "EUR",
      description: "10 sessions of 1 hour each (10% off)",
    },
    {
      "@type": "Offer",
      name: "20-hour package",
      price: "2400",
      priceCurrency: "EUR",
      description: "20 sessions of 1 hour each (20% off)",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(coachingJsonLd),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-[#ededed]`}
      >
        <ContactProvider>
          {children}
        </ContactProvider>
      </body>
    </html>
  );
}
