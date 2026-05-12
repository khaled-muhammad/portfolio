import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = Number((await params).id);
  if (!Number.isFinite(id)) return { title: "Certificate" };
  try {
    const c = await prisma.certificate.findUnique({ where: { id } });
    if (!c) return { title: "Certificate" };
    return {
      title: c.title ?? "Certificate",
      description: c.description ?? undefined,
    };
  } catch {
    return { title: "Certificate" };
  }
}

export default async function CertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  if (!Number.isFinite(id)) notFound();

  let certificate: Awaited<ReturnType<typeof prisma.certificate.findUnique>> | null = null;
  try {
    certificate = await prisma.certificate.findUnique({ where: { id } });
  } catch {
    certificate = null;
  }

  if (!certificate) notFound();

  const c = certificate;

  return (
    <section className="relative min-h-screen py-16 px-4 md:px-10 overflow-hidden">
      {/* Background decorative */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] -z-10" />

      {/* Back link */}
      <Link
        href="/certs"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition museomoderno-400 mb-10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        All Certificates
      </Link>

      <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-[3fr_2fr]">
        {/* Image */}
        <div
          className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 gradient-outline before:rounded-2xl shadow-2xl"
          style={{ aspectRatio: c.aspectRatio ?? 4 / 3 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.imageUrl}
            alt={c.title ?? "Certificate"}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          {c.category ? (
            <span className="w-fit rounded-full bg-cyan-500/20 border border-cyan-400/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-400 quicksand-400">
              {c.category}
            </span>
          ) : (
            <span className="w-fit rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/60 quicksand-400">
              Achievement
            </span>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight text-white museomoderno-700">
            {c.title ?? "Certificate"}
          </h1>

          <div className="space-y-3">
            {c.issuer ? (
              <div className="flex items-center gap-2.5 text-sm text-white/70 quicksand-400">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Issued by <strong className="text-white">{c.issuer}</strong></span>
              </div>
            ) : null}
            {c.dateIssued ? (
              <div className="flex items-center gap-2.5 text-sm text-white/70 quicksand-400">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <time dateTime={c.dateIssued.toISOString()}>
                  {c.dateIssued.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            ) : null}
          </div>

          {c.description ? (
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 gradient-outline before:rounded-xl">
              <p className="text-sm leading-relaxed text-white/70 quicksand-400">{c.description}</p>
            </div>
          ) : null}

          <div className="mt-auto flex gap-3 pt-4">
            <Link
              href="/certs"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white/70 hover:text-white hover:bg-white/15 transition gradient-outline before:rounded-xl"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to all
            </Link>
            <a
              href={c.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/30 transition"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View full size
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
