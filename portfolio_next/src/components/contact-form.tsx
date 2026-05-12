"use client";

import { useActionState } from "react";
import { submitContact } from "@/actions/contact";

/* ─── Dashboard-style (zinc, clean) ──────────────────────────── */
const inputCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-cyan-600";

const labelCls = "block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1.5";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, null);

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-semibold text-zinc-900 dark:text-white">Message sent!</p>
          <p className="mt-1 text-sm text-zinc-500">
            Thanks for reaching out. I&apos;ll get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Name <span className="text-red-400">*</span></label>
          <input name="name" required placeholder="Jane Smith" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email <span className="text-red-400">*</span></label>
          <input type="email" name="email" required placeholder="jane@example.com" className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Phone <span className="font-normal text-zinc-400">(optional)</span></label>
        <input name="phone" type="tel" placeholder="+1 555 000 0000" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Message <span className="text-red-400">*</span></label>
        <textarea name="message" required rows={6} minLength={10} placeholder="Tell me about your project, question, or opportunity…" className={inputCls + " resize-none"} />
      </div>
      {state?.error ? (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {state.error}
        </div>
      ) : null}
      <button type="submit" disabled={pending} className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

/* ─── Glassy (marketing) style ───────────────────────────────── */
const glassyInputCls =
  "w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/10";

const glassyLabelCls = "block text-xs font-semibold uppercase tracking-wide text-white/60 quicksand-400 mb-1.5";

export function GlassyContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, null);

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(52,211,153,1)" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-semibold text-white museomoderno-400">Message sent!</p>
          <p className="mt-1 text-sm text-white/60 quicksand-400">
            Thanks for reaching out. I&apos;ll get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={glassyLabelCls}>Name <span className="text-red-400">*</span></label>
          <input name="name" required placeholder="Your name" className={glassyInputCls} />
        </div>
        <div>
          <label className={glassyLabelCls}>Email <span className="text-red-400">*</span></label>
          <input type="email" name="email" required placeholder="your@email.com" className={glassyInputCls} />
        </div>
      </div>
      <div>
        <label className={glassyLabelCls}>Phone <span className="font-normal text-white/40">(optional)</span></label>
        <input name="phone" type="tel" placeholder="+1 555 000 0000" className={glassyInputCls} />
      </div>
      <div>
        <label className={glassyLabelCls}>Message <span className="text-red-400">*</span></label>
        <textarea name="message" required rows={6} minLength={10} placeholder="Tell me about your project or question…" className={glassyInputCls + " resize-none"} />
      </div>
      {state?.error ? (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="relative w-full px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),0_8px_20px_rgba(0,0,0,0.3)] hover:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),0_12px_24px_rgba(0,0,0,0.4)] text-white font-bold text-base transition-all duration-300 active:scale-95 disabled:opacity-60 cursor-pointer overflow-hidden"
      >
        <span className="relative z-10">{pending ? "Sending…" : "Send Message"}</span>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-full opacity-50 pointer-events-none" />
      </button>
    </form>
  );
}
