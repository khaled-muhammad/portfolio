import Link from "next/link";
import { notFound } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "../project-form";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

type ProjectWithSkills = Prisma.ProjectGetPayload<{ include: { skills: true } }>;

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const nid = Number(id);
  if (!Number.isFinite(nid)) notFound();

  let project: ProjectWithSkills | null = null;
  let allSkills: Awaited<ReturnType<typeof prisma.skill.findMany>> = [];

  try {
    [project, allSkills] = await Promise.all([
      prisma.project.findUnique({ where: { id: nid }, include: { skills: true } }),
      prisma.skill.findMany({ orderBy: { title: "asc" } }),
    ]);
  } catch {
    project = null;
    allSkills = [];
  }

  if (!project) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          <ArrowLeft size={13} />
          Projects
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-white">Edit project</h1>
        <p className="mt-1 text-sm text-zinc-400">{project.name}</p>
      </div>
      <ProjectForm project={project} allSkills={allSkills} />
    </div>
  );
}
