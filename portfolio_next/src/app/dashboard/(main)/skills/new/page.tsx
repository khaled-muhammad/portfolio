import Link from "next/link";
import { SkillForm } from "../skill-form";
import { ArrowLeft } from "lucide-react";

export default function NewSkillPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/skills"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          <ArrowLeft size={13} />
          Skills
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-white">New skill</h1>
        <p className="mt-1 text-sm text-zinc-400">Add a skill or tool to your portfolio.</p>
      </div>
      <SkillForm />
    </div>
  );
}
