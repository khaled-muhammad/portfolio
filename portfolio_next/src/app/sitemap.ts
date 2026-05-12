import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/contact",
    "/certs",
  ].map((path) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  try {
    const certs = await prisma.certificate.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { id: "desc" },
    });
    const certUrls: MetadataRoute.Sitemap = certs.map((c) => ({
      url: `${baseUrl}/certs/${c.id}`,
      lastModified: c.updatedAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    return [...staticRoutes, ...certUrls];
  } catch {
    return staticRoutes;
  }
}
