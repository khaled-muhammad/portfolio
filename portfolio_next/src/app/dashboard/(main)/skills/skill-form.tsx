import { SkillKind, SkillSection, type Skill } from "@prisma/client";
import Link from "next/link";
import { upsertSkill, deleteSkill } from "@/actions/admin";
import { ArrowLeft, Trash2 } from "lucide-react";

const inputCls =
  "mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none placeholder-zinc-600 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";

const labelCls = "block text-xs font-semibold uppercase tracking-wide text-zinc-400";

export function SkillForm({ skill }: { skill?: Skill | null }) {
  const isEdit = Boolean(skill);
  return (
    <div className="space-y-8 max-w-xl">
      <form action={upsertSkill} className="space-y-5">
        {skill ? <input type="hidden" name="id" value={skill.id} /> : null}

        {/* Title + Kind row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className={labelCls}>
              Title <span className="text-red-400">*</span>
            </label>
            <input
              name="title"
              required
              defaultValue={skill?.title ?? ""}
              placeholder="e.g. TypeScript"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Kind</label>
            <select
              name="kind"
              defaultValue={skill?.kind ?? SkillKind.skill}
              className={inputCls}
            >
              {Object.values(SkillKind).map((k) => (
                <option key={k} value={k}>
                  {k.charAt(0).toUpperCase() + k.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section */}
        <div>
          <label className={labelCls}>Section</label>
          <select
            name="section"
            defaultValue={skill?.section ?? "__none__"}
            className={inputCls}
          >
            <option value="__none__">— None —</option>
            {Object.values(SkillSection).map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Icon URL */}
        <div>
          <label className={labelCls}>Icon URL</label>
          <input
            name="iconUrl"
            type="url"
            defaultValue={skill?.iconUrl ?? ""}
            placeholder="https://cdn.jsdelivr.net/…"
            className={inputCls}
          />
          <p className="mt-1 text-[11px] text-zinc-600">
            SVG or PNG from devicons, shields.io, etc.
          </p>
        </div>

        {/* Years + Progress */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Years of experience</label>
            <input
              name="yearsOfExperience"
              type="number"
              min={0}
              max={50}
              defaultValue={skill?.yearsOfExperience ?? ""}
              placeholder="0"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Progress %</label>
            <input
              name="progress"
              type="number"
              min={0}
              max={100}
              defaultValue={skill?.progress ?? ""}
              placeholder="0–100"
              className={inputCls}
            />
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className={labelCls}>Short summary</label>
          <textarea
            name="summary"
            rows={2}
            defaultValue={skill?.summary ?? ""}
            placeholder="One-liner shown in tooltips or cards"
            className={inputCls}
          />
        </div>

        {/* About */}
        <div>
          <label className={labelCls}>About</label>
          <textarea
            name="about"
            rows={4}
            defaultValue={skill?.about ?? ""}
            placeholder="Longer description, experience, projects used in…"
            className={inputCls}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-400"
          >
            {isEdit ? "Save changes" : "Create skill"}
          </button>
          <Link
            href="/dashboard/skills"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <ArrowLeft size={13} />
            Cancel
          </Link>
        </div>
      </form>

      {skill ? (
        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-5">
          <p className="text-sm font-semibold text-red-300">Danger zone</p>
          <p className="mt-1 text-xs text-red-400/70">
            Deleting this skill cannot be undone.
          </p>
          <form action={deleteSkill} className="mt-4">
            <input type="hidden" name="id" value={skill.id} />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg border border-red-700/50 bg-red-950/50 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-900/50 hover:text-red-300"
            >
              <Trash2 size={14} />
              Delete skill
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
