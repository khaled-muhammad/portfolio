import type { Metadata } from "next";
import {
  Comfortaa,
  Molle,
  Montserrat,
  MuseoModerno,
  Pacifico,
  Quicksand,
} from "next/font/google";
import { prisma } from "@/lib/prisma";
import { Providers } from "@/components/providers";
import "./globals.css";

/* Same families as portfolio_frontend (Google Fonts import there) */
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-museomoderno",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
  display: "swap",
});

const molle = Molle({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-molle",
  display: "swap",
});

const fontVars = [
  quicksand.variable,
  museoModerno.variable,
  comfortaa.variable,
  montserrat.variable,
  pacifico.variable,
  molle.variable,
].join(" ");

export async function generateMetadata(): Promise<Metadata> {
  let settings: Awaited<
    ReturnType<typeof prisma.siteSettings.findUnique>
  > | null = null;
  try {
    settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  } catch {
    settings = null;
  }

  const raw =
    settings?.canonicalBaseUrl?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  let metadataBase: URL;
  try {
    metadataBase = new URL(raw);
  } catch {
    metadataBase = new URL("http://localhost:3000");
  }

  const title = settings?.siteTitle?.trim() || "Portfolio";
  const description =
    settings?.siteDescription?.trim() || "Developer portfolio.";
  const og = settings?.ogImageUrl?.trim() || null;
  const keywordsStr = settings?.keywords?.trim();
  const keywords = keywordsStr
    ? keywordsStr.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;
  let twitterCreator: string | undefined;
  const h = settings?.twitterHandle?.trim();
  if (h) twitterCreator = `@${h.startsWith("@") ? h.slice(1) : h}`;

  return {
    metadataBase,
    title: { default: title, template: `%s · ${title}` },
    description,
    ...(keywords?.length ? { keywords } : {}),
    openGraph: {
      type: "website",
      locale: "en_US",
      title,
      description,
      url: metadataBase.href,
      ...(og ? { images: [{ url: og }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      ...(twitterCreator ? { creator: twitterCreator } : {}),
      ...(og ? { images: [og] } : {}),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVars}>
      <body className={`${quicksand.className} min-h-screen antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
