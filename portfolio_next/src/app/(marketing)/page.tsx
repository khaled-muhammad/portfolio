import { prisma } from "@/lib/prisma";
import MarketingHero from "@/components/MarketingHero";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany<{ include: { skills: true } }>>> = [];
  let skills: Awaited<ReturnType<typeof prisma.skill.findMany>> = [];
  let certificates: Awaited<ReturnType<typeof prisma.certificate.findMany>> = [];
  let socials: Awaited<ReturnType<typeof prisma.socialMedia.findMany>> = [];
  let settings: Awaited<ReturnType<typeof prisma.siteSettings.findUnique>> = null;

  try {
    [projects, skills, certificates, socials, settings] = await Promise.all([
      prisma.project.findMany({
        orderBy: { id: "desc" },
        include: { skills: true },
      }),
      prisma.skill.findMany({ orderBy: [{ section: "asc" }, { title: "asc" }] }),
      prisma.certificate.findMany({ orderBy: { id: "desc" }, take: 3 }),
      prisma.socialMedia.findMany({ orderBy: { id: "asc" } }),
      prisma.siteSettings.findUnique({ where: { id: 1 } }),
    ]);
  } catch {
    /* DB not reachable */
  }

  const personName = settings?.personName || "Khaled Muhammad";

  const skillItems = skills.map((s) => ({
    title: s.title,
    iconUrl: s.iconUrl,
  }));

  const certItems = certificates.map((c) => ({
    id: c.id,
    title: c.title || `Certificate #${c.id}`,
    image: c.imageUrl,
    link: `/certs/${c.id}`,
    description: c.description || undefined,
  }));

  const projectItems = projects.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    imageUrl: p.imageUrl,
    url: p.url,
    githubUrl: p.githubUrl,
    platforms: p.platforms.map((pl) => pl as string),
    status: p.status ? p.status.toISOString() : null,
    stack: p.skills.map((s) => ({
      id: s.id,
      title: s.title,
      iconUrl: s.iconUrl,
    })),
  }));

  const socialItems = socials.map((s) => ({
    platform: s.platform as string,
    url: s.url,
  }));

  return (
    <MarketingHero
      personName={personName}
      socialItems={socialItems}
      projects={projectItems}
      skillItems={skillItems}
      certItems={certItems}
    />
  );
}
