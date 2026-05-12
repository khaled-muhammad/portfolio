import { ProjectPlatform, type Project, type Skill } from "@prisma/client";
import Link from "next/link";
import { deleteProject, upsertProject } from "@/actions/admin";
import { ArrowLeft, Trash2 } from "lucide-react";

const inputCls =
  "mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none placeholder-zinc-600 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";

const labelCls = "block text-xs font-semibold uppercase tracking-wide text-zinc-400";

const platformLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  scripts: "Scripts",
  cli: "CLI",
  software_gui: "Software/GUI",
};

export function ProjectForm({
  project,
  allSkills,
}: {
  project?: (Project & { skills: Skill[] }) | null;
  allSkills: Skill[];
}) {
  const sel = new Set(project?.skills.map((s) => s.id));
  const isEdit = Boolean(project);

  const sd = project?.status ? project.status.toISOString().slice(0, 10) : "";
  const st = project?.startDate ? project.startDate.toISOString().slice(0, 10) : "";

  return (
    <div className="space-y-8 max-w-2xl">
      <form action={upsertProject} className="space-y-5">
        {project ? <input type="hidden" name="id" value={project.id} /> : null}

        {/* Name */}
        <div>
          <label className={labelCls}>
            Project name <span className="text-red-400">*</span>
          </label>
          <input
            required
            name="name"
            defaultValue={project?.name ?? ""}
            placeholder="My Awesome Project"
            className={inputCls}
          />
        </div>

        {/* Platforms */}
        <div>
          <label className={labelCls + " mb-2"}>Platforms</label>
          <div className="flex flex-wrap gap-3">
            {Object.values(ProjectPlatform).map((p) => (
              <label key={p} className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-300 has-[:checked]:border-cyan-500/60 has-[:checked]:bg-cyan-500/10 has-[:checked]:text-cyan-300 transition">
                <input
                  type="checkbox"
                  name="platform"
                  value={p}
                  defaultChecked={project?.platforms.includes(p)}
                  className="sr-only"
                />
                {platformLabels[p] ?? p}
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelCls}>Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={project?.description ?? ""}
            placeholder="What does this project do?"
            className={inputCls}
          />
        </div>

        {/* Image + Live URL */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Image URL</label>
            <input
              name="imageUrl"
              type="url"
              defaultValue={project?.imageUrl ?? ""}
              placeholder="https://…"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Live URL</label>
            <input
              name="url"
              type="url"
              defaultValue={project?.url ?? ""}
              placeholder="https://…"
              className={inputCls}
            />
          </div>
        </div>

        {/* GitHub URL */}
        <div>
          <label className={labelCls}>GitHub URL</label>
          <input
            name="githubUrl"
            type="url"
            defaultValue={project?.githubUrl ?? ""}
            placeholder="https://github.com/…"
            className={inputCls}
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Start date</label>
            <input type="date" name="startDate" defaultValue={st} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>End / status date</label>
            <input type="date" name="status" defaultValue={sd} className={inputCls} />
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className={labelCls + " mb-2"}>Tech stack (skills)</label>
          <div className="max-h-52 overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-900 p-3">
            {allSkills.length === 0 ? (
              <p className="text-xs text-zinc-600">Create skills first.</p>
            ) : (
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                {allSkills.map((s) => (
                  <label
                    key={s.id}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-zinc-400 hover:bg-zinc-800 has-[:checked]:text-cyan-300 transition"
                  >
                    <input
                      type="checkbox"
                      name="skillId"
                      value={s.id}
                      defaultChecked={sel.has(s.id)}
                      className="rounded border-zinc-600 accent-cyan-500"
                    />
                    {s.title}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-400"
          >
            {isEdit ? "Save changes" : "Create project"}
          </button>
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <ArrowLeft size={13} />
            Cancel
          </Link>
        </div>
      </form>

      {project ? (
        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-5">
          <p className="text-sm font-semibold text-red-300">Danger zone</p>
          <p className="mt-1 text-xs text-red-400/70">
            Deleting this project cannot be undone.
          </p>
          <form action={deleteProject} className="mt-4">
            <input type="hidden" name="id" value={project.id} />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg border border-red-700/50 bg-red-950/50 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-900/50 hover:text-red-300"
            >
              <Trash2 size={14} />
              Delete project
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
