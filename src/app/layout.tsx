import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "InversEra | Flexible IT Services & Cloud Solutions",
    template: "%s | InversEra",
  },
  description:
    "Flexible onshore and offshore IT services for staffing, Azure cloud solutions, application development, and managed IT services. Get the right expertise and support to grow your business.",
  applicationName: "InversEra",
  manifest: "/manifest.json",
  keywords: [
    "InversEra",
    "IT staffing",
    "IT team augmentation",
    "Azure cloud solutions",
    "cloud development",
    "application development",
    "managed IT services",
    "IT outsourcing",
    "software integration",
    "onshore and offshore IT services",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/ie.svg",
  },
  openGraph: {
    type: "website",
    siteName: "InversEra",
    title: "InversEra | Flexible IT Services & Software Integration",
    description:
      "Access expert IT professionals, flexible onshore and offshore services, and cost-effective software solutions.",
    url: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#ffffff",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white">
        <Header />

        <div className="flex-1 bg-zinc-50 font-sans">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
