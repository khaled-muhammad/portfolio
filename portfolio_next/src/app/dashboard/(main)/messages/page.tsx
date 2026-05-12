import { prisma } from "@/lib/prisma";
import { deleteMessage, markMessageRead } from "@/actions/admin";
import { MessageSquare, Mail, Phone, Check, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  let messages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: [{ read: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    messages = [];
  }

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Submissions from the contact form.{" "}
            {unread > 0 ? (
              <span className="font-semibold text-amber-400">{unread} unread</span>
            ) : (
              <span className="text-zinc-500">{messages.length} total</span>
            )}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-700 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-800">
            <MessageSquare size={22} className="text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-400">No messages yet</p>
          <p className="text-xs text-zinc-600">Messages will appear here when visitors fill out the contact form.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`overflow-hidden rounded-2xl border transition ${
                m.read
                  ? "border-zinc-800 bg-zinc-900/30"
                  : "border-amber-500/30 bg-amber-500/5"
              }`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4 border-b border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${m.read ? "bg-zinc-800 text-zinc-400" : "bg-amber-500/20 text-amber-300"}`}>
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{m.name}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <a
                        href={`mailto:${m.email}`}
                        className="flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                      >
                        <Mail size={11} />
                        {m.email}
                      </a>
                      {m.phone ? (
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Phone size={11} />
                          {m.phone}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!m.read ? (
                    <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-300">
                      New
                    </span>
                  ) : null}
                  <time className="text-[11px] text-zinc-600" dateTime={m.createdAt.toISOString()}>
                    {m.createdAt.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">{m.message}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-t border-zinc-800/50 px-5 py-3">
                <a
                  href={`mailto:${m.email}?subject=Re: Your message`}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <Mail size={11} />
                  Reply
                </a>
                {!m.read ? (
                  <form action={markMessageRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Check size={11} />
                      Mark read
                    </button>
                  </form>
                ) : null}
                <form action={deleteMessage} className="ml-auto">
                  <input type="hidden" name="id" value={m.id} />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-red-950/50 hover:text-red-400"
                  >
                    <Trash2 size={11} />
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
