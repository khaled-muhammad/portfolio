import type { Metadata } from "next";
import { GlassyContactForm } from "@/components/contact-form";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for opportunities, collaborations, or questions.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  let info: { title: string; info: string }[] = [];
  let socials: { id: number; platform: string; url: string }[] = [];
  try {
    [info, socials] = await Promise.all([
      prisma.info.findMany(),
      prisma.socialMedia.findMany({ orderBy: { id: "asc" } }),
    ]);
  } catch {
    /* no DB */
  }

  const email = info.find((i) => i.title === "email")?.info;
  const phone = info.find((i) => i.title === "phone")?.info;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-10 overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10" />

      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl museomoderno-700 text-white mb-4 tracking-tighter">
          Get in Touch
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        <p className="mt-6 text-white/60 text-lg max-w-md mx-auto">
          Have a project in mind, a question, or just want to say hello? Send me a message.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5 w-full max-w-5xl">
        {/* Contact info sidebar */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 gradient-outline before:rounded-2xl shadow-[inset_2px_2px_3px_rgba(255,255,255,0.1)] transition hover:bg-white/15 group"
            >
              <div className="bubble min-w-12 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50 quicksand-400">Email</p>
                <p className="font-medium text-white museomoderno-400">{email}</p>
              </div>
            </a>
          )}

          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-4 p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 gradient-outline before:rounded-2xl shadow-[inset_2px_2px_3px_rgba(255,255,255,0.1)] transition hover:bg-white/15 group"
            >
              <div className="bubble min-w-12 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 7.39 7.39l1.96-1.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50 quicksand-400">Phone</p>
                <p className="font-medium text-white museomoderno-400">{phone}</p>
              </div>
            </a>
          )}

          {socials.length > 0 && (
            <div className="p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 gradient-outline before:rounded-2xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-white/50 quicksand-400">Connect</p>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/70 transition hover:border-white/40 hover:text-white hover:bg-white/10 quicksand-400"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 p-5 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="mt-0.5 shrink-0">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-sm text-white/50 quicksand-400">
              I typically respond within 24–48 hours. For urgent matters, reach out directly by email.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 gradient-outline before:rounded-2xl shadow-[inset_4px_4px_8px_rgba(255,255,255,0.05)]">
            <GlassyContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
