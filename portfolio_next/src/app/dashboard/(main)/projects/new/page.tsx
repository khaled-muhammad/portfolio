import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "../project-form";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  let allSkills: Awaited<ReturnType<typeof prisma.skill.findMany>> = [];
  try {
    allSkills = await prisma.skill.findMany({ orderBy: { title: "asc" } });
  } catch {
    allSkills = [];
  }

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
        <h1 className="mt-3 text-2xl font-bold text-white">New project</h1>
        <p className="mt-1 text-sm text-zinc-400">Add a project to your portfolio.</p>
      </div>
      <ProjectForm allSkills={allSkills} />
    </div>
  );
}
