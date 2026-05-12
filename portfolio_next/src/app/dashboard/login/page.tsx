"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock } from "lucide-react";

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPw, setShowPw] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));

    const res = await signIn("credentials", { email, password, redirect: false });

    setPending(false);
    if (!res?.ok) {
      setError(
        res?.error === "CredentialsSignin"
          ? "Invalid email or password."
          : res?.error ?? "Sign-in failed.",
      );
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4">
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.08),transparent)]"
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
            <Lock size={20} className="text-cyan-400" />
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm">
          <h1 className="text-xl font-bold text-white">Welcome back</h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            Sign in to manage your portfolio.
          </p>

          <form className="mt-7 flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Email
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  name="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 pr-10 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error ? (
              <div className="flex items-start gap-2 rounded-lg border border-red-900/50 bg-red-950/30 px-3.5 py-2.5">
                <span className="mt-0.5 shrink-0 text-red-400">✕</span>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-zinc-950 shadow-md transition hover:bg-cyan-400 disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-300 transition"
        >
          <ArrowLeft size={13} />
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <LoginInner />
    </Suspense>
  );
}
