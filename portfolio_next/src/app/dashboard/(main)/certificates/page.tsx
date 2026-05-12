import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteCertificate } from "@/actions/admin";
import { Plus, Award, Pencil, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

const categoryColors: Record<string, string> = {
  courses: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  contests: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  benchmarks: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  participation: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  scholarships: "bg-orange-500/15 text-orange-300 border-orange-500/30",
};

export default async function CertificatesListPage() {
  let items: Awaited<ReturnType<typeof prisma.certificate.findMany>> = [];
  try {
    items = await prisma.certificate.findMany({ orderBy: { id: "desc" } });
  } catch {
    items = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Certificates</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Credentials and achievements on the public /certs page.{" "}
            <span className="text-zinc-500">{items.length} total</span>
          </p>
        </div>
        <Link
          href="/dashboard/certificates/new"
          className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950 shadow transition hover:bg-cyan-400"
        >
          <Plus size={15} />
          New certificate
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-700 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-800">
            <Award size={22} className="text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-400">No certificates yet</p>
          <Link
            href="/dashboard/certificates/new"
            className="mt-1 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Add certificate
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <div
              key={c.id}
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 transition hover:border-zinc-700"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
                <Image
                  src={c.imageUrl}
                  alt={c.title ?? "Certificate"}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="font-semibold text-white truncate">{c.title ?? `Certificate #${c.id}`}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {c.category ? (
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${categoryColors[c.category] ?? "bg-zinc-700 text-zinc-400 border-zinc-600"}`}>
                      {c.category}
                    </span>
                  ) : null}
                  {c.issuer ? (
                    <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
                      {c.issuer}
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  {c.dateIssued ? (
                    <span className="text-[11px] text-zinc-600">
                      {new Date(c.dateIssued).toLocaleDateString()}
                    </span>
                  ) : (
                    <span />
                  )}
                  <div className="flex gap-1">
                    <Link
                      href={`/dashboard/certificates/${c.id}`}
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                    >
                      <Pencil size={11} />Edit
                    </Link>
                    <form action={deleteCertificate}>
                      <input type="hidden" name="id" value={c.id} />
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
