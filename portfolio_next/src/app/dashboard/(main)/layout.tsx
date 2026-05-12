import { DashboardNav } from "@/components/dashboard-nav";
import { LogoutButton } from "@/components/logout-button";

export default function DashboardShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <DashboardNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/95 px-8 py-3.5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="text-zinc-400 font-medium">Admin Dashboard</span>
          </div>
          <LogoutButton />
        </header>
        <div className="flex-1 p-8 max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
