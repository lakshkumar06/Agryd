import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://agryd.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Agryd ",
    template: "%s - Agryd",
  },
  description:
    "The workspace where teams can stop chasing documents and start closing deals. Streamline contract workflows with version control and integrated payments.",
  keywords: [
    "contract management",
    "contract workflow",
    "legal operations",
    "document management",
    "approval workflow",
    "contract automation",
    "CLM",
    "contract lifecycle management",
    "legal tech",
    "contract tracking",
    "blockchain contracts",
    "web3",
    "on-chain approvals",
  ],
  authors: [{ name: "Agryd" }],
  creator: "Agryd",
  publisher: "Agryd",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Agryd",
    title: "Agryd",
    description:
      "The workspace where teams can stop chasing documents and start closing deals. Streamline contract workflows with version control and integrated payments.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agryd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agryd",
    description:
      "The workspace where teams can stop chasing documents and start closing deals. Streamline contract workflows with version control and integrated payments.",
    images: ["/og-image.png"],
    creator: "@agryd",
    site: "@agryd",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Agryd",
    applicationCategory: "BusinessApplication",
    description:
      "The workspace where teams can stop chasing documents and start closing deals. Streamline contract workflows with version control and integrated payments.",
    url: siteUrl,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
    },
    operatingSystem: "Web",
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Agryd",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
