import Link from "next/link";
import { SocialForm } from "@/components/social-form";
import { ArrowLeft } from "lucide-react";

export default function NewSocialPage() {
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
        <h1 className="mt-3 text-2xl font-bold text-white">New social link</h1>
        <p className="mt-1 text-sm text-zinc-400">Add a social media profile link.</p>
      </div>
      <SocialForm />
    </div>
  );
}
