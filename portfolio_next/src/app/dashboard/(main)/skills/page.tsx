import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSkill } from "@/actions/admin";
import { Plus, Zap, Pencil, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

const sectionColors: Record<string, string> = {
  Programming_Language: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Framework: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Database: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  DevOp: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  Library: "bg-pink-500/15 text-pink-300 border-pink-500/30",
};

export default async function SkillsListPage() {
  let skills: Awaited<ReturnType<typeof prisma.skill.findMany>> = [];
  try {
    skills = await prisma.skill.findMany({
      orderBy: [{ section: "asc" }, { title: "asc" }],
    });
  } catch {
    skills = [];
  }

  // Group by section
  const groups = new Map<string, typeof skills>();
  for (const s of skills) {
    const key = s.section ?? "Other";
    const list = groups.get(key) ?? [];
    list.push(s);
    groups.set(key, list);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Technologies and tooling shown on the public site.{" "}
            <span className="text-zinc-500">{skills.length} total</span>
          </p>
        </div>
        <Link
          href="/dashboard/skills/new"
          className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-400"
        >
          <Plus size={15} />
          New skill
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-700 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-800">
            <Zap size={22} className="text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-400">No skills yet</p>
          <p className="text-xs text-zinc-600">Add your first skill or run the migration script.</p>
          <Link
            href="/dashboard/skills/new"
            className="mt-1 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Add skill
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {[...groups.entries()].map(([section, rows]) => (
            <div key={section}>
              <div className="mb-3 flex items-center gap-2">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${sectionColors[section] ?? "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                  {section.replace(/_/g, " ")}
                </span>
                <span className="text-xs text-zinc-600">{rows.length}</span>
              </div>
              <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
                {rows.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`flex flex-wrap items-center justify-between gap-4 px-5 py-4 transition hover:bg-zinc-800/50 ${idx !== 0 ? "border-t border-zinc-800" : ""}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {s.iconUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.iconUrl} alt="" className="size-7 shrink-0 object-contain" />
                      ) : (
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-[10px] font-bold text-zinc-400">
                          {s.title.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">{s.title}</p>
                        <p className="text-xs text-zinc-500">
                          {s.kind}
                          {s.yearsOfExperience ? ` · ${s.yearsOfExperience}y exp` : ""}
                          {typeof s.progress === "number" ? ` · ${s.progress}%` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/dashboard/skills/${s.id}`}
                        className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                      >
                        <Pencil size={12} />
                        Edit
                      </Link>
                      <form action={deleteSkill}>
                        <input type="hidden" name="id" value={s.id} />
                        <button
                          type="submit"
                          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition hover:bg-red-950/50 hover:text-red-400"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
