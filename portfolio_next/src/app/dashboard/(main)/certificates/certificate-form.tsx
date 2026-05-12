import { CertificateCategory, type Certificate } from "@prisma/client";
import Link from "next/link";
import { upsertCertificate, deleteCertificate } from "@/actions/admin";
import { ArrowLeft, Trash2 } from "lucide-react";

const inputCls =
  "mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none placeholder-zinc-600 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";

const labelCls = "block text-xs font-semibold uppercase tracking-wide text-zinc-400";

export function CertificateForm({ certificate }: { certificate?: Certificate | null }) {
  const isEdit = Boolean(certificate);
  const d = certificate?.dateIssued ? certificate.dateIssued.toISOString().slice(0, 10) : "";

  return (
    <div className="space-y-8 max-w-xl">
      <form action={upsertCertificate} className="space-y-5">
        {certificate ? <input type="hidden" name="id" value={certificate.id} /> : null}

        {/* Image URL (required) */}
        <div>
          <label className={labelCls}>
            Image URL <span className="text-red-400">*</span>
          </label>
          <input
            name="imageUrl"
            type="url"
            required
            defaultValue={certificate?.imageUrl ?? ""}
            placeholder="https://…/certificate.png"
            className={inputCls}
          />
          <p className="mt-1 text-[11px] text-zinc-600">
            Direct link to the certificate image. Hosted on any CDN or media server.
          </p>
        </div>

        {/* Preview */}
        {certificate?.imageUrl ? (
          <div className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={certificate.imageUrl}
              alt="Certificate preview"
              className="max-h-48 w-full object-contain"
            />
          </div>
        ) : null}

        {/* Title */}
        <div>
          <label className={labelCls}>Title</label>
          <input
            name="title"
            defaultValue={certificate?.title ?? ""}
            placeholder="e.g. AWS Certified Developer"
            className={inputCls}
          />
        </div>

        {/* Category + Issuer */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Category</label>
            <select
              name="category"
              defaultValue={certificate?.category ?? ""}
              className={inputCls}
            >
              <option value="">— None —</option>
              {Object.values(CertificateCategory).map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Issuer</label>
            <input
              name="issuer"
              defaultValue={certificate?.issuer ?? ""}
              placeholder="e.g. Coursera"
              className={inputCls}
            />
          </div>
        </div>

        {/* Date + Aspect ratio */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Date issued</label>
            <input type="date" name="dateIssued" defaultValue={d} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Aspect ratio</label>
            <input
              name="aspectRatio"
              type="number"
              step="0.001"
              min="0"
              defaultValue={certificate?.aspectRatio ?? ""}
              placeholder="e.g. 1.414"
              className={inputCls}
            />
            <p className="mt-1 text-[11px] text-zinc-600">Width ÷ Height</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelCls}>Description</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={certificate?.description ?? ""}
            placeholder="What was this certificate for?"
            className={inputCls}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-400"
          >
            {isEdit ? "Save changes" : "Add certificate"}
          </button>
          <Link
            href="/dashboard/certificates"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <ArrowLeft size={13} />
            Cancel
          </Link>
        </div>
      </form>

      {certificate ? (
        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-5">
          <p className="text-sm font-semibold text-red-300">Danger zone</p>
          <p className="mt-1 text-xs text-red-400/70">Deleting this certificate cannot be undone.</p>
          <form action={deleteCertificate} className="mt-4">
            <input type="hidden" name="id" value={certificate.id} />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg border border-red-700/50 bg-red-950/50 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-900/50 hover:text-red-300"
            >
              <Trash2 size={14} />
              Delete certificate
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
