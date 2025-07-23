import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fona - Flow-Oriented Notes Application",
  description:
    "Fona is a distraction-free, flow-oriented notes app designed to help you capture thoughts, code snippets, and research while staying in the zone.",
  icons: {
    icon: "/fona.svg",
  },
  authors: [
    {
      name: "Meet Jain",
      url: "https://github.com/not-meet",
    },
  ],
  creator: "Meet Jain",
  robots: "index, follow",
  openGraph: {
    title: "Fona - Flow-Oriented Notes Application",
    locale: "en_US",
    type: "website",
    description:
      "Fona is a distraction-free, flow-oriented notes app designed to help you capture thoughts, code snippets, and research while staying in the zone.",
    url: "https://fona.meet-jain.in",
    siteName: "Fona",
    images: [
      {
        url: "https://fona.meet-jain.in/og.png",
        width: 1200,
        height: 630,
        alt: "Fona - Flow-Oriented Notes Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fona - Flow-Oriented Notes Application",
    description:
      "Stay in the flow while you take notes. Fona is optimized for quick capture of ideas, code, and context with minimal distractions.",
    creator: "@Heyy_Meet",
    images: [
      {
        url: "https://fona.meet-jain.in/og.png",
        alt: "Fona - Flow-Oriented Notes Application",
      },
    ],
  },
  alternates: {
    canonical: "https://fona.meet-jain.in",
  },
  category: "productivity",
  keywords: [
    "note-taking app",
    "developer notes",
    "flow-oriented productivity",
    "research notes",
    "developer tools",
    "snippets manager",
    "Fona",
    "notes app",
    "notes chrome extension",
    "notes chrome extension",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${inter.variable} ${ibmPlexMono.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
