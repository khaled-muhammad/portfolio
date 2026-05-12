import Link from "next/link";
import { SocialPlatform, type SocialMedia } from "@prisma/client";
import { deleteSocial, upsertSocial } from "@/actions/admin";
import { ArrowLeft, Trash2 } from "lucide-react";

const inputCls =
  "mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none placeholder-zinc-600 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";

const labelCls = "block text-xs font-semibold uppercase tracking-wide text-zinc-400";

export function SocialForm({ social }: { social?: SocialMedia | null }) {
  const isEdit = Boolean(social);
  return (
    <div className="space-y-8 max-w-md">
      <form action={upsertSocial} className="space-y-5">
        {social ? <input type="hidden" name="id" value={social.id} /> : null}

        <div>
          <label className={labelCls}>Platform</label>
          <select
            name="platform"
            defaultValue={social?.platform ?? SocialPlatform.GitHub}
            className={inputCls}
          >
            {Object.values(SocialPlatform).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>
            URL <span className="text-red-400">*</span>
          </label>
          <input
            name="url"
            type="url"
            required
            defaultValue={social?.url ?? ""}
            placeholder="https://github.com/username"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Username</label>
          <input
            name="username"
            defaultValue={social?.username ?? ""}
            placeholder="@username (optional)"
            className={inputCls}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-400"
          >
            {isEdit ? "Save changes" : "Add link"}
          </button>
          <Link
            href="/dashboard/social"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <ArrowLeft size={13} />
            Cancel
          </Link>
        </div>
      </form>

      {social ? (
        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-5">
          <p className="text-sm font-semibold text-red-300">Danger zone</p>
          <form action={deleteSocial} className="mt-3">
            <input type="hidden" name="id" value={social.id} />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg border border-red-700/50 bg-red-950/50 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-900/50 hover:text-red-300"
            >
              <Trash2 size={14} />
              Delete link
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
