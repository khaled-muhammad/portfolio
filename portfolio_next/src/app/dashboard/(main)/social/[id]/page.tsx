import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SocialForm } from "@/components/social-form";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditSocialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const nid = Number(id);
  if (!Number.isFinite(nid)) notFound();

  let social: Awaited<ReturnType<typeof prisma.socialMedia.findUnique>> | null = null;
  try {
    social = await prisma.socialMedia.findUnique({ where: { id: nid } });
  } catch {
    social = null;
  }

  if (!social) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/social"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          <ArrowLeft size={13} />
          Social links
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-white">Edit social link</h1>
        <p className="mt-1 text-sm text-zinc-400">{social.platform}</p>
      </div>
      <SocialForm social={social} />
    </div>
  );
}
