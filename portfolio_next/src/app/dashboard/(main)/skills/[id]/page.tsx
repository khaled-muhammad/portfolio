import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SkillForm } from "../skill-form";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const nid = Number(id);
  if (!Number.isFinite(nid)) notFound();

  let skill: Awaited<ReturnType<typeof prisma.skill.findUnique>> = null;
  try {
    skill = await prisma.skill.findUnique({ where: { id: nid } });
  } catch {
    skill = null;
  }

  if (!skill) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/skills"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          <ArrowLeft size={13} />
          Skills
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-white">Edit skill</h1>
        <p className="mt-1 text-sm text-zinc-400">{skill.title}</p>
      </div>
      <SkillForm skill={skill} />
    </div>
  );
}
