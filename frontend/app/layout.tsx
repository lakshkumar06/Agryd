import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://agryd.xyz";
const ogImage = "https://agryd.xyz/og-imagev2.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Agryd ",
    template: "%s - Agryd",
  },
  description:
    "Stop chasing documents and start closing deals. Streamline workflows with version control, on-chain verification, and milestone-based escrow for trust-minimized deal execution.",
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
      "Stop chasing documents and start closing deals. Streamline workflows with version control, on-chain verification, and milestone-based escrow for trust-minimized deal execution.",
    images: [
      {
        url: `/og-imagev2.png`,
        width: 1200,
        height: 630,
        alt: "Agryd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Agryd_xyz",
    creator: "@Agryd_xyz",
    title: "Agryd",
    description:
      "Stop chasing documents and start closing deals. Streamline workflows with version control, on-chain verification, and milestone-based escrow for trust-minimized deal execution.",
    images: ["https://agryd.xyz/og-imagev2.png"],
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
      "Stop chasing documents and start closing deals. Streamline workflows with version control, on-chain verification, and milestone-based escrow for trust-minimized deal execution.",
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
