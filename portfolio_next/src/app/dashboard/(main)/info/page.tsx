import { prisma } from "@/lib/prisma";
import { upsertInfo, deleteInfo } from "@/actions/admin";
import { Info, Plus, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

const inputCls =
  "mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none placeholder-zinc-600 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";

const labelCls = "block text-xs font-semibold uppercase tracking-wide text-zinc-400";

export default async function InfoAdminPage() {
  let rows: Awaited<ReturnType<typeof prisma.info.findMany>> = [];
  try {
    rows = await prisma.info.findMany({ orderBy: { title: "asc" } });
  } catch {
    rows = [];
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Info snippets</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Key–value contact/personal info displayed on the public site.
        </p>
      </div>

      {/* Add form */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="mb-5 flex items-center gap-2">
          <Plus size={15} className="text-cyan-400" />
          <h2 className="text-sm font-semibold text-white">Add or update snippet</h2>
        </div>
        <p className="mb-4 text-xs text-zinc-500">
          The title acts as a unique key. Saving an existing title will update its value.
        </p>
        <form action={upsertInfo} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                Title / key <span className="text-red-400">*</span>
              </label>
              <input
                name="title"
                required
                placeholder="e.g. email, phone, location"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>
                Value <span className="text-red-400">*</span>
              </label>
              <input
                name="info"
                required
                placeholder="e.g. me@example.com"
                className={inputCls}
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-400"
          >
            <Plus size={13} />
            Save snippet
          </button>
        </form>
      </div>

      {/* Existing */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-zinc-300">Existing snippets</h2>
        {rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-zinc-800 py-12 text-center">
            <Info size={20} className="text-zinc-600" />
            <p className="text-sm text-zinc-600">No snippets yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
            {rows.map((row, idx) => (
              <div
                key={row.id}
                className={`flex items-start justify-between gap-4 px-5 py-4 transition hover:bg-zinc-800/40 ${idx !== 0 ? "border-t border-zinc-800" : ""}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{row.title}</p>
                  <p className="mt-1 font-medium text-white truncate">{row.info}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {/* Inline edit */}
                  <details className="group relative">
                    <summary className="cursor-pointer list-none rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:bg-zinc-700 hover:text-white transition">
                      Edit
                    </summary>
                    <div className="absolute right-0 top-full z-10 mt-1 w-72 rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-xl">
                      <form action={upsertInfo} className="space-y-3">
                        <input type="hidden" name="title" value={row.title} />
                        <div>
                          <label className={labelCls}>Value</label>
                          <textarea
                            name="info"
                            required
                            rows={3}
                            defaultValue={row.info}
                            className={inputCls}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full rounded-lg bg-cyan-500 py-2 text-xs font-semibold text-zinc-950 hover:bg-cyan-400 transition"
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </details>
                  <form action={deleteInfo}>
                    <input type="hidden" name="id" value={row.id} />
                    <button
                      type="submit"
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition hover:bg-red-950/50 hover:text-red-400"
                    >
                      <Trash2 size={12} />Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
