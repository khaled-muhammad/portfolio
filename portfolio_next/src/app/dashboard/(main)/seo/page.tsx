import { prisma } from "@/lib/prisma";
import { updateSiteSEO } from "@/actions/admin";
import { Search, Globe, User, Tag, Link2 } from "lucide-react";

export const dynamic = "force-dynamic";

const inputCls =
  "mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none placeholder-zinc-600 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";

const labelCls = "block text-xs font-semibold uppercase tracking-wide text-zinc-400";

export default async function SeoAdminPage() {
  let settings: Awaited<ReturnType<typeof prisma.siteSettings.findUnique>> | null = null;
  try {
    settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  } catch {
    settings = null;
  }

  const s = settings ?? null;

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Site SEO & Identity</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Controls metadata, Open Graph tags, and structured data on the public site.
        </p>
      </div>

      <form action={updateSiteSEO} className="space-y-6">
        {/* Basic identity */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="mb-5 flex items-center gap-2">
            <User size={15} className="text-cyan-400" />
            <h2 className="text-sm font-semibold text-white">Identity</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Site title</label>
              <input
                name="siteTitle"
                defaultValue={s?.siteTitle ?? ""}
                placeholder="Khaled Muhammad"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Person name (structured data)</label>
              <input
                name="personName"
                defaultValue={s?.personName ?? ""}
                placeholder="Your Full Name"
                className={inputCls}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelCls}>Description</label>
            <textarea
              name="siteDescription"
              rows={3}
              defaultValue={s?.siteDescription ?? ""}
              placeholder="Full-stack developer specialising in…"
              className={inputCls}
            />
          </div>
        </div>

        {/* URLs */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="mb-5 flex items-center gap-2">
            <Globe size={15} className="text-cyan-400" />
            <h2 className="text-sm font-semibold text-white">URLs</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Canonical base URL</label>
              <input
                name="canonicalBaseUrl"
                type="url"
                placeholder="https://yoursite.com"
                defaultValue={s?.canonicalBaseUrl ?? ""}
                className={inputCls}
              />
              <p className="mt-1 text-[11px] text-zinc-600">
                Should match NEXT_PUBLIC_SITE_URL in production.
              </p>
            </div>
            <div>
              <label className={labelCls}>Open Graph image URL</label>
              <input
                name="ogImageUrl"
                type="url"
                defaultValue={s?.ogImageUrl ?? ""}
                placeholder="https://…/og.png"
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="mb-5 flex items-center gap-2">
            <Link2 size={15} className="text-cyan-400" />
            <h2 className="text-sm font-semibold text-white">Social</h2>
          </div>
          <div>
            <label className={labelCls}>Twitter / X handle</label>
            <input
              name="twitterHandle"
              placeholder="@username"
              defaultValue={s?.twitterHandle ?? ""}
              className={inputCls}
            />
          </div>
        </div>

        {/* Keywords */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="mb-5 flex items-center gap-2">
            <Tag size={15} className="text-cyan-400" />
            <h2 className="text-sm font-semibold text-white">Keywords</h2>
          </div>
          <div>
            <label className={labelCls}>Keywords <span className="font-normal text-zinc-600">(comma separated)</span></label>
            <textarea
              name="keywords"
              rows={2}
              defaultValue={s?.keywords ?? ""}
              placeholder="full-stack developer, React, Next.js, Django…"
              className={inputCls}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-400"
        >
          <Search size={14} />
          Save SEO settings
        </button>
      </form>
    </div>
  );
}
