import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSocial } from "@/actions/admin";
import { Plus, Share2, ExternalLink, Pencil, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SocialListPage() {
  let rows: Awaited<ReturnType<typeof prisma.socialMedia.findMany>> = [];
  try {
    rows = await prisma.socialMedia.findMany({ orderBy: { id: "asc" } });
  } catch {
    rows = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Social links</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Profiles shown in the footer and JSON‑LD.{" "}
            <span className="text-zinc-500">{rows.length} total</span>
          </p>
        </div>
        <Link
          href="/dashboard/social/new"
          className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-400"
        >
          <Plus size={15} />
          Add link
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-700 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-800">
            <Share2 size={22} className="text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-400">No social links yet</p>
          <Link
            href="/dashboard/social/new"
            className="mt-1 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Add link
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
          {rows.map((s, idx) => (
            <div
              key={s.id}
              className={`flex flex-wrap items-center justify-between gap-4 px-5 py-4 transition hover:bg-zinc-800/40 ${idx !== 0 ? "border-t border-zinc-800" : ""}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-[11px] font-bold text-zinc-400">
                  {s.platform.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white">{s.platform}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 truncate text-xs text-cyan-400 hover:underline max-w-[240px]"
                    >
                      <ExternalLink size={10} />
                      {s.url.replace(/^https?:\/\//, "")}
                    </a>
                    {s.username ? (
                      <span className="text-xs text-zinc-600">@{s.username}</span>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/dashboard/social/${s.id}`}
                  className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                >
                  <Pencil size={12} />Edit
                </Link>
                <form action={deleteSocial}>
                  <input type="hidden" name="id" value={s.id} />
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
  );
}
