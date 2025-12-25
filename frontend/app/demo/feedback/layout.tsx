import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Share your feedback about Agryd. Help us improve our contract management platform.",
  openGraph: {
    title: "Feedback - Agryd",
    description:
      "Share your feedback about Agryd. Help us improve our contract management platform.",
  },
  twitter: {
    title: "Feedback - Agryd",
    description:
      "Share your feedback about Agryd. Help us improve our contract management platform.",
  },
  alternates: {
    canonical: "https://agryd.xyz/demo/feedback",
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

