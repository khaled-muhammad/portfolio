/**
 * Migration script: fetch all data from Django API and upsert into Prisma DB.
 * Run: npx tsx scripts/migrate-from-django.ts
 */

import { PrismaClient, SkillSection, SocialPlatform, CertificateCategory, ProjectPlatform } from "@prisma/client";

const prisma = new PrismaClient();
const BASE = "https://khaledmuhmmed99.pythonanywhere.com/api/P";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

// ── helpers ──────────────────────────────────────────────────────────────────

function mapSection(raw: string | null | undefined): SkillSection | null {
  if (!raw) return null;
  const map: Record<string, SkillSection> = {
    "Programming Language": SkillSection.Programming_Language,
    "programming language": SkillSection.Programming_Language,
    "Framework": SkillSection.Framework,
    "framework": SkillSection.Framework,
    "Database": SkillSection.Database,
    "database": SkillSection.Database,
    "DevOp": SkillSection.DevOp,
    "devop": SkillSection.DevOp,
    "Library": SkillSection.Library,
    "library": SkillSection.Library,
  };
  return map[raw] ?? null;
}

function mapPlatform(raw: string): ProjectPlatform | null {
  const map: Record<string, ProjectPlatform> = {
    web: ProjectPlatform.web,
    mobile: ProjectPlatform.mobile,
    scripts: ProjectPlatform.scripts,
    cli: ProjectPlatform.cli,
    software_gui: ProjectPlatform.software_gui,
  };
  return map[raw] ?? null;
}

function mapSocialPlatform(raw: string): SocialPlatform {
  const valid = Object.values(SocialPlatform) as string[];
  return valid.includes(raw) ? (raw as SocialPlatform) : SocialPlatform.Other;
}

function mapCategory(raw: string | null | undefined): CertificateCategory | null {
  if (!raw) return null;
  const valid = Object.values(CertificateCategory) as string[];
  return valid.includes(raw) ? (raw as CertificateCategory) : null;
}

// ── types from Django API ─────────────────────────────────────────────────────

interface DjangoSkill {
  id: number;
  title: string;
  about: string | null;
  summary: string | null;
  icon: string | null;
  uses: string | null;
  abilites: string | null;
  kind: string;
  section: string | null;
  yearsOfExprience: number | null;
  progress: number | null;
}

interface DjangoProject {
  id: number;
  name: string;
  platforms: string[];
  url: string | null;
  description: string | null;
  image: string | null;
  status: string | null;
  start_date: string | null;
  github_url: string | null;
  stack: DjangoSkill[];
}

interface DjangoCertificate {
  id: number;
  image: string;
  title: string | null;
  description: string | null;
  category: string | null;
  aspect_ratio: number | null;
  date_issued: string | null;
  issuer: string | null;
}

interface DjangoSocial {
  id: number;
  platform: string;
  url: string;
  username: string;
}

interface DjangoInfo {
  id: number;
  title: string;
  info: string;
}

// ── migration steps ───────────────────────────────────────────────────────────

async function migrateSkills(djangoSkills: DjangoSkill[]) {
  console.log(`\n▸ Migrating ${djangoSkills.length} skills...`);
  const idMap = new Map<number, number>(); // django_id → prisma_id

  for (const s of djangoSkills) {
    const existing = await prisma.skill.findFirst({ where: { title: s.title } });
    const data = {
      title: s.title,
      about: s.about || undefined,
      summary: s.summary || undefined,
      iconUrl: s.icon || undefined,
      uses: s.uses || undefined,
      abilities: s.abilites || undefined,
      kind: s.kind === "tool" ? "tool" as const : "skill" as const,
      section: mapSection(s.section),
      yearsOfExperience: s.yearsOfExprience ?? undefined,
      progress: s.progress ?? undefined,
    };

    let skill;
    if (existing) {
      skill = await prisma.skill.update({ where: { id: existing.id }, data });
      console.log(`  ✓ Updated skill: ${s.title}`);
    } else {
      skill = await prisma.skill.create({ data });
      console.log(`  + Created skill: ${s.title}`);
    }
    idMap.set(s.id, skill.id);
  }
  return idMap;
}

async function migrateProjects(djangoProjects: DjangoProject[], skillIdMap: Map<number, number>) {
  console.log(`\n▸ Migrating ${djangoProjects.length} projects...`);

  for (const p of djangoProjects) {
    const platforms = p.platforms
      .map(mapPlatform)
      .filter(Boolean) as ProjectPlatform[];

    const skillIds = p.stack
      .map((s) => skillIdMap.get(s.id))
      .filter((id): id is number => id !== undefined);

    const existing = await prisma.project.findFirst({ where: { name: p.name } });
    const baseData = {
      name: p.name,
      platforms,
      url: p.url || undefined,
      description: p.description || undefined,
      imageUrl: p.image || undefined,
      githubUrl: p.github_url || undefined,
      status: p.status ? new Date(p.status) : undefined,
      startDate: p.start_date ? new Date(p.start_date) : undefined,
    };

    if (existing) {
      await prisma.project.update({
        where: { id: existing.id },
        data: {
          ...baseData,
          skills: { set: skillIds.map((id) => ({ id })) },
        },
      });
      console.log(`  ✓ Updated project: ${p.name}`);
    } else {
      await prisma.project.create({
        data: {
          ...baseData,
          ...(skillIds.length > 0 ? { skills: { connect: skillIds.map((id) => ({ id })) } } : {}),
        },
      });
      console.log(`  + Created project: ${p.name}`);
    }
  }
}

async function migrateCertificates(certs: DjangoCertificate[]) {
  console.log(`\n▸ Migrating ${certs.length} certificates...`);

  for (const c of certs) {
    const existing = await prisma.certificate.findFirst({
      where: { imageUrl: c.image },
    });
    const data = {
      imageUrl: c.image,
      title: c.title || undefined,
      description: c.description || undefined,
      category: mapCategory(c.category),
      aspectRatio: c.aspect_ratio ?? undefined,
      dateIssued: c.date_issued ? new Date(c.date_issued) : undefined,
      issuer: c.issuer || undefined,
    };

    if (existing) {
      await prisma.certificate.update({ where: { id: existing.id }, data });
      console.log(`  ✓ Updated cert: ${c.title}`);
    } else {
      await prisma.certificate.create({ data });
      console.log(`  + Created cert: ${c.title}`);
    }
  }
}

async function migrateSocial(socials: DjangoSocial[]) {
  console.log(`\n▸ Migrating ${socials.length} social links...`);

  for (const s of socials) {
    const existing = await prisma.socialMedia.findFirst({ where: { url: s.url } });
    const data = {
      platform: mapSocialPlatform(s.platform),
      url: s.url,
      username: s.username || "",
    };

    if (existing) {
      await prisma.socialMedia.update({ where: { id: existing.id }, data });
      console.log(`  ✓ Updated social: ${s.platform}`);
    } else {
      await prisma.socialMedia.create({ data });
      console.log(`  + Created social: ${s.platform}`);
    }
  }
}

async function migrateInfo(infos: DjangoInfo[]) {
  console.log(`\n▸ Migrating ${infos.length} info entries...`);

  for (const i of infos) {
    await prisma.info.upsert({
      where: { title: i.title },
      create: { title: i.title, info: i.info },
      update: { info: i.info },
    });
    console.log(`  ✓ Upserted info: ${i.title}`);
  }
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 Starting migration from Django API...");
  console.log(`   Source: ${BASE}`);

  try {
    // Fetch all data in parallel
    const [projects, certificates, socials, infos] = await Promise.all([
      fetchJson<DjangoProject[]>("/projects/"),
      fetchJson<DjangoCertificate[]>("/certificates/"),
      fetchJson<DjangoSocial[]>("/social-media/"),
      fetchJson<DjangoInfo[]>("/info/"),
    ]);

    // Collect unique skills from projects
    const skillMap = new Map<number, DjangoSkill>();
    for (const p of projects) {
      for (const s of p.stack) {
        skillMap.set(s.id, s);
      }
    }
    const djangoSkills = [...skillMap.values()];

    // Migrate in order (skills first, then projects reference them)
    const skillIdMap = await migrateSkills(djangoSkills);
    await migrateProjects(projects, skillIdMap);
    await migrateCertificates(certificates);
    await migrateSocial(socials);
    await migrateInfo(infos);

    console.log("\n✅ Migration complete!");
  } catch (err) {
    console.error("\n❌ Migration failed:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
