"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  FolderKanban,
  Award,
  MessageSquare,
  Share2,
  Search,
  Info,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/skills", label: "Skills", icon: Zap },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/certificates", label: "Certificates", icon: Award },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/social", label: "Social", icon: Share2 },
  { href: "/dashboard/seo", label: "SEO", icon: Search },
  { href: "/dashboard/info", label: "Info", icon: Info },
];

export function DashboardNav() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="flex items-center gap-2.5 border-b border-zinc-800 px-5 py-5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
          <span className="text-xs font-bold">P</span>
        </div>
        <span className="text-sm font-semibold text-zinc-100">Portfolio CMS</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
          Content
        </p>
        <ul className="space-y-0.5">
          {links.map((l) => {
            const active = isActive(l.href, l.exact);
            const Icon = l.icon;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all ${
                    active
                      ? "bg-cyan-500/15 text-cyan-300"
                      : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100"
                  }`}
                >
                  <Icon
                    size={15}
                    className={active ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"}
                  />
                  {l.label}
                  {active && (
                    <ChevronRight size={12} className="ml-auto text-cyan-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-zinc-800 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-300"
        >
          <ExternalLink size={12} />
          View public site
        </Link>
      </div>
    </aside>
  );
}
