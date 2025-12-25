import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo",
  description:
    "See Agryd in action. Experience how teams streamline contract workflows with version control and integrated payments.",
  openGraph: {
    title: "Demo - Agryd",
    description:
      "See Agryd in action. Experience how teams streamline contract workflows with version control and integrated payments.",
  },
  twitter: {
    title: "Demo - Agryd",
    description:
      "See Agryd in action. Experience how teams streamline contract workflows with version control and integrated payments.",
  },
  alternates: {
    canonical: "https://agryd.xyz/demo",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

