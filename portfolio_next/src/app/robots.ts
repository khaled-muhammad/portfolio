import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function robots(): Promise<MetadataRoute.Robots> {
  let baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 1 },
    });
    if (settings?.canonicalBaseUrl?.trim())
      baseUrl = settings.canonicalBaseUrl.trim();
  } catch {
    /* fallback */
  }
  baseUrl = baseUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
