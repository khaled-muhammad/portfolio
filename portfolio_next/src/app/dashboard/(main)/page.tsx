import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Zap,
  FolderKanban,
  Award,
  MessageSquare,
  Share2,
  ArrowRight,
  Bell,
  TrendingUp,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  let counts = {
    skills: 0,
    projects: 0,
    certificates: 0,
    messages: 0,
    unread: 0,
  };
  try {
    const [skills, projects, certificates, messages, unread] = await Promise.all([
      prisma.skill.count(),
      prisma.project.count(),
      prisma.certificate.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);
    counts = { skills, projects, certificates, messages, unread };
  } catch {
    /* no DB */
  }

  type Stat = {
    label: string;
    value: number;
    href: string;
    icon: typeof Zap;
    color: string;
    bg: string;
    border: string;
    badge?: number;
  };

  const stats: Stat[] = [
    {
      label: "Skills",
      value: counts.skills,
      href: "/dashboard/skills",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    {
      label: "Projects",
      value: counts.projects,
      href: "/dashboard/projects",
      icon: FolderKanban,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Certificates",
      value: counts.certificates,
      href: "/dashboard/certificates",
      icon: Award,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      label: "Messages",
      value: counts.messages,
      href: "/dashboard/messages",
      icon: MessageSquare,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      badge: counts.unread > 0 ? counts.unread : undefined,
    },
  ];

  const quickActions = [
    { label: "Add skill", href: "/dashboard/skills/new" },
    { label: "Add project", href: "/dashboard/projects/new" },
    { label: "Add certificate", href: "/dashboard/certificates/new" },
    { label: "Add social link", href: "/dashboard/social/new" },
    { label: "Update SEO", href: "/dashboard/seo" },
    { label: "Update info", href: "/dashboard/info" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="mt-1 text-sm text-zinc-400">
          All your portfolio content at a glance.
        </p>
      </div>

      {/* Unread alert */}
      {counts.unread > 0 ? (
        <Link
          href="/dashboard/messages"
          className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 transition hover:bg-amber-500/15"
        >
          <Bell size={16} className="text-amber-400" />
          <span className="text-sm font-medium text-amber-200">
            {counts.unread} unread message{counts.unread !== 1 ? "s" : ""} — click to view
          </span>
          <ArrowRight size={14} className="ml-auto text-amber-400" />
        </Link>
      ) : null}

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, href, icon: Icon, color, bg, border, badge }) => (
          <Link
            key={label}
            href={href}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div className="flex items-start justify-between">
              <div className={`flex size-10 items-center justify-center rounded-xl ${bg} border ${border}`}>
                <Icon size={18} className={color} />
              </div>
              {badge !== undefined ? (
                <span className="flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {badge}
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-3xl font-bold tabular-nums text-white">{value}</p>
            <p className="mt-1 text-sm text-zinc-500">{label}</p>
            <div className="mt-3 flex items-center gap-1 text-xs font-medium text-zinc-600 transition group-hover:text-cyan-400">
              <span>Manage</span>
              <ArrowRight size={11} />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions + social */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick actions */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={15} className="text-cyan-400" />
            <h2 className="text-sm font-semibold text-zinc-200">Quick actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2.5 text-xs font-medium text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
              >
                <span className="size-1 rounded-full bg-cyan-500" />
                {a.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Social */}
        <SocialPreview />
      </div>
    </div>
  );
}

async function SocialPreview() {
  let rows: { id: number; platform: string; url: string }[] = [];
  try {
    rows = await prisma.socialMedia.findMany({ take: 6 });
  } catch {
    rows = [];
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 size={15} className="text-cyan-400" />
          <h2 className="text-sm font-semibold text-zinc-200">Social links</h2>
        </div>
        <Link href="/dashboard/social" className="text-xs text-zinc-500 hover:text-cyan-400 transition">
          Manage →
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="text-xs text-zinc-600">No social links added yet.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((s) => (
            <li key={s.id} className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">{s.platform}</span>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate max-w-[180px] text-xs text-cyan-400/80 hover:text-cyan-300 transition"
              >
                {s.url.replace(/^https?:\/\//, "")}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
