import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CertificateForm } from "../certificate-form";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const nid = Number(id);
  if (!Number.isFinite(nid)) notFound();

  let certificate: Awaited<ReturnType<typeof prisma.certificate.findUnique>> | null = null;
  try {
    certificate = await prisma.certificate.findUnique({ where: { id: nid } });
  } catch {
    certificate = null;
  }

  if (!certificate) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/certificates"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          <ArrowLeft size={13} />
          Certificates
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-white">Edit certificate</h1>
        <p className="mt-1 text-sm text-zinc-400">{certificate.title ?? `Certificate #${certificate.id}`}</p>
      </div>
      <CertificateForm certificate={certificate} />
    </div>
  );
}
