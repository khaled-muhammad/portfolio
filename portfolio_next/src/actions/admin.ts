"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  SkillKind,
  SkillSection,
  ProjectPlatform,
  CertificateCategory,
  SocialPlatform,
} from "@prisma/client";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/dashboard/skills");
  revalidatePath("/");
}

export async function upsertSkill(formData: FormData) {
  await requireAdmin();
  const idRaw = formData.get("id");
  const id =
    idRaw && String(idRaw).trim() !== "" ? Number(idRaw) : undefined;

  const secRaw = formData.get("section");
  let section: SkillSection | null = null;
  if (
    typeof secRaw === "string" &&
    secRaw.trim() !== "" &&
    secRaw !== "__none__"
  ) {
    section = secRaw as SkillSection;
  }

  const kindCandidate = String(formData.get("kind") ?? "").trim();
  const kind = Object.values(SkillKind).includes(kindCandidate as SkillKind)
    ? (kindCandidate as SkillKind)
    : SkillKind.skill;

  function optNum(v: FormDataEntryValue | null): number | undefined {
    const s =
      v !== null && v !== undefined ?
        String(v).trim()
      : "";
    if (!s) return undefined;
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
  }

  const data = {
    title: String(formData.get("title") ?? "").slice(0, 200),
    kind,
    section,
    iconUrl: String(formData.get("iconUrl") ?? "").trim() || undefined,
    summary: String(formData.get("summary") ?? "").trim() || undefined,
    about: String(formData.get("about") ?? "").trim() || undefined,
    yearsOfExperience: optNum(formData.get("yearsOfExperience")),
    progress: optNum(formData.get("progress")),
  };

  if (!data.title.trim()) throw new Error("Title required");

  if (id) {
    await prisma.skill.update({
      where: { id },
      data,
    });
  } else {
    await prisma.skill.create({ data });
  }
  revalidatePath("/dashboard/skills");
  revalidatePath("/");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.project.delete({ where: { id } });
  revalidatePath("/dashboard/projects");
  revalidatePath("/");
}

export async function upsertProject(formData: FormData) {
  await requireAdmin();
  const idRaw = formData.get("id");
  const pid =
    idRaw && String(idRaw).trim() !== "" ? Number(idRaw) : undefined;

  const platformsRaw = formData.getAll("platform") as string[];
  const platforms = platformsRaw.filter(Boolean) as ProjectPlatform[];

  const skillIds = formData
    .getAll("skillId")
    .map((x) => Number(x))
    .filter((x) => !Number.isNaN(x));

  function optDate(key: string): Date | undefined {
    const raw = formData.get(key);
    const s =
      raw !== null && raw !== undefined ? String(raw).trim() : "";
    if (!s) return undefined;
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }

  const baseData = {
    name: String(formData.get("name") ?? "").trim(),
    platforms,
    description:
      String(formData.get("description") ?? "").trim() || undefined,
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || undefined,
    url: String(formData.get("url") ?? "").trim() || undefined,
    githubUrl: String(formData.get("githubUrl") ?? "").trim() || undefined,
    status: optDate("status"),
    startDate: optDate("startDate"),
  };

  if (!baseData.name) throw new Error("Project name required");

  if (pid) {
    await prisma.project.update({
      where: { id: pid },
      data: {
        ...baseData,
        skills: { set: skillIds.map((sid) => ({ id: sid })) },
      },
    });
  } else {
    await prisma.project.create({
      data: {
        ...baseData,
        ...(skillIds.length > 0 ?
          { skills: { connect: skillIds.map((sid) => ({ id: sid })) } }
        : {}),
      },
    });
  }
  revalidatePath("/dashboard/projects");
  revalidatePath("/");
}

export async function deleteCertificate(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/dashboard/certificates");
  revalidatePath("/");
  revalidatePath("/certs");
}

export async function upsertCertificate(formData: FormData) {
  await requireAdmin();
  const idRaw = formData.get("id");
  const cid =
    idRaw && String(idRaw).trim() !== "" ? Number(idRaw) : undefined;

  const cat = formData.get("category");
  let dateIssued: Date | undefined;
  const dateStr =
    formData.get("dateIssued") !== null ?
      String(formData.get("dateIssued")).trim()
    : "";
  if (dateStr) {
    const d = new Date(dateStr);
    if (!Number.isNaN(d.getTime())) dateIssued = d;
  }

  const aspectRatioRaw = String(formData.get("aspectRatio") ?? "").trim();
  const aspectRatio = aspectRatioRaw ? Number(aspectRatioRaw) : undefined;

  const data = {
    title: String(formData.get("title") ?? "").trim() || undefined,
    description:
      String(formData.get("description") ?? "").trim() || undefined,
    category:
      cat && String(cat).trim() !== "" ?
        (String(cat) as CertificateCategory)
      : undefined,
    imageUrl: String(formData.get("imageUrl") ?? "").trim(),
    issuer: String(formData.get("issuer") ?? "").trim() || undefined,
    dateIssued,
    aspectRatio: aspectRatio !== undefined && !Number.isNaN(aspectRatio) ? aspectRatio : undefined,
  };

  if (!data.imageUrl) throw new Error("Image URL required");

  if (cid) {
    await prisma.certificate.update({
      where: { id: cid },
      data,
    });
  } else {
    await prisma.certificate.create({ data });
  }
  revalidatePath("/dashboard/certificates");
  revalidatePath("/");
  revalidatePath("/certs");
}

export async function deleteSocial(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.socialMedia.delete({ where: { id } });
  revalidatePath("/dashboard/social");
  revalidatePath("/");
}

export async function upsertSocial(formData: FormData) {
  await requireAdmin();
  const idRaw = formData.get("id");
  const sid =
    idRaw && String(idRaw).trim() !== "" ? Number(idRaw) : undefined;

  const platRaw = String(formData.get("platform") ?? "Other").trim();
  const platform = Object.values(SocialPlatform).includes(
    platRaw as SocialPlatform,
  ) ?
      (platRaw as SocialPlatform)
    : SocialPlatform.Other;

  const url = String(formData.get("url") ?? "").trim();
  if (!url) throw new Error("URL required");

  const data = {
    platform,
    url,
    username: String(formData.get("username") ?? "").trim(),
  };

  if (sid) {
    await prisma.socialMedia.update({
      where: { id: sid },
      data,
    });
  } else {
    await prisma.socialMedia.create({ data });
  }
  revalidatePath("/dashboard/social");
  revalidatePath("/");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/dashboard/messages");
}

export async function markMessageRead(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/dashboard/messages");
}

export async function updateSiteSEO(formData: FormData) {
  await requireAdmin();
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      siteTitle: String(formData.get("siteTitle") ?? ""),
      siteDescription: String(formData.get("siteDescription") ?? ""),
      canonicalBaseUrl: String(formData.get("canonicalBaseUrl") ?? ""),
      ogImageUrl: String(formData.get("ogImageUrl") ?? ""),
      twitterHandle: String(formData.get("twitterHandle") ?? ""),
      personName: String(formData.get("personName") ?? ""),
      keywords: String(formData.get("keywords") ?? ""),
    },
    update: {
      siteTitle: String(formData.get("siteTitle") ?? ""),
      siteDescription: String(formData.get("siteDescription") ?? ""),
      canonicalBaseUrl: String(formData.get("canonicalBaseUrl") ?? ""),
      ogImageUrl: String(formData.get("ogImageUrl") ?? ""),
      twitterHandle: String(formData.get("twitterHandle") ?? ""),
      personName: String(formData.get("personName") ?? ""),
      keywords: String(formData.get("keywords") ?? ""),
    },
  });
  revalidatePath("/");
}

export async function upsertInfo(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const info = String(formData.get("info") ?? "").trim();
  if (!title) throw new Error("Title required");

  await prisma.info.upsert({
    where: { title },
    create: { title, info },
    update: { info },
  });
  revalidatePath("/dashboard/info");
}

export async function deleteInfo(formData: FormData) {
  await requireAdmin();
  await prisma.info.delete({
    where: { id: Number(formData.get("id")) },
  });
  revalidatePath("/dashboard/info");
}
