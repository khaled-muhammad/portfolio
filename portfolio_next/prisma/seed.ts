import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.CANONICAL_BASE_URL ??
    "http://localhost:3000";

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      siteTitle: "Portfolio",
      siteDescription: "Developer portfolio powered by Next.js and PostgreSQL.",
      canonicalBaseUrl: baseUrl,
      ogImageUrl: "",
      twitterHandle: "",
      personName: "",
      keywords: "",
    },
    update: {},
  });

  console.log("Seeded SiteSettings row id=1 (no-op updates if existed).");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    void prisma.$disconnect();
    process.exit(1);
  });
