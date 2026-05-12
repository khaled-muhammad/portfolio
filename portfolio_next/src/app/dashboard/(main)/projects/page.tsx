import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/actions/admin";
import { Plus, FolderKanban, Pencil, Trash2, Globe, GitBranch } from "lucide-react";

export const dynamic = "force-dynamic";

type ProjectWithSkills = Prisma.ProjectGetPayload<{ include: { skills: true } }>;

const platformColors: Record<string, string> = {
  web: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  mobile: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  scripts: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  cli: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  software_gui: "bg-orange-500/15 text-orange-300 border-orange-500/30",
};

export default async function ProjectsListPage() {
  let projects: ProjectWithSkills[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { id: "desc" },
      include: { skills: true },
    });
  } catch {
    projects = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Case studies and repos shown on the homepage.{" "}
            <span className="text-zinc-500">{projects.length} total</span>
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-400"
        >
          <Plus size={15} />
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-700 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-800">
            <FolderKanban size={22} className="text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-400">No projects yet</p>
          <Link
            href="/dashboard/projects/new"
            className="mt-1 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Add project
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 transition hover:border-zinc-700"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-zinc-800/60">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="size-full object-cover opacity-90 transition group-hover:opacity-100"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <FolderKanban size={28} className="text-zinc-600" />
                  </div>
                )}
                <div className="absolute left-3 top-3 flex flex-wrap gap-1">
                  {p.platforms.map((pl) => (
                    <span
                      key={pl}
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${platformColors[pl] ?? "bg-zinc-700 text-zinc-300 border-zinc-600"}`}
                    >
                      {pl.replace("_", "/")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="font-semibold text-white truncate">{p.name}</p>
                {p.description ? (
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{p.description}</p>
                ) : null}
                {p.skills.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.skills.slice(0, 5).map((s) => (
                      <span key={s.id} className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400">
                        {s.title}
                      </span>
                    ))}
                    {p.skills.length > 5 ? (
                      <span className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">
                        +{p.skills.length - 5}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-cyan-400 hover:underline">
                        <Globe size={11} />Live
                      </a>
                    ) : null}
                    {p.githubUrl ? (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white">
                        <GitBranch size={11} />GitHub
                      </a>
                    ) : null}
                  </div>
                  <div className="flex gap-1">
                    <Link
                      href={`/dashboard/projects/${p.id}`}
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                    >
                      <Pencil size={11} />Edit
                    </Link>
                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition hover:bg-red-950/50 hover:text-red-400"
                      >
                        <Trash2 size={11} />Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
