import { prisma } from "@/lib/prisma";
import { JsonLdOrganization } from "@/components/json-ld";
import { MarketingFooter, MarketingNav } from "@/components/marketing-nav";
import CustomCursor from "@/components/CustomCursor";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: Awaited<ReturnType<typeof prisma.siteSettings.findUnique>> = null;
  let socials: Awaited<ReturnType<typeof prisma.socialMedia.findMany>> = [];
  let info: Awaited<ReturnType<typeof prisma.info.findMany>> = [];

  try {
    [settings, socials, info] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: 1 } }),
      prisma.socialMedia.findMany({ orderBy: { id: "asc" } }),
      prisma.info.findMany(),
    ]);
  } catch {
    /* DB not reachable */
  }

  const title = settings?.personName || settings?.siteTitle || "Portfolio";
  const origin =
    settings?.canonicalBaseUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('/bg.png') no-repeat center center / cover fixed`,
      }}
    >
      <JsonLdOrganization
        name={title}
        url={origin}
        description={settings?.siteDescription}
      />
      <CustomCursor />
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter socials={socials} info={info} />
    </div>
  );
}
