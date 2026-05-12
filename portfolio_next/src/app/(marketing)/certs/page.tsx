import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MarketingCertCard from "@/components/MarketingCertCard";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Credentials, courses, and achievements.",
};

export const dynamic = "force-dynamic";

export default async function CertsListingPage() {
  let certs: Awaited<ReturnType<typeof prisma.certificate.findMany>> = [];
  try {
    certs = await prisma.certificate.findMany({ orderBy: { id: "desc" } });
  } catch {
    certs = [];
  }

  const certItems = certs.map((c) => ({
    id: c.id,
    title: c.title || `Certificate #${c.id}`,
    image: c.imageUrl,
    link: `/certs/${c.id}`,
    description: c.description || undefined,
  }));

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center py-24 px-4 md:px-10 overflow-hidden">
      {/* Background decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] -z-10" />

      {/* Title */}
      <div className="text-center mb-20 w-full">
        <h1 className="text-6xl md:text-7xl museomoderno-700 text-white mb-4 tracking-tighter">
          Achievements
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        <p className="mt-6 text-white/60 text-lg">
          A collection of my completed courses, achievements, and credentials.{" "}
          <span className="font-semibold text-white/80">{certs.length} total.</span>
        </p>
      </div>

      {certItems.length === 0 ? (
        <div className="flex flex-col items-center gap-6 py-20">
          <div className="relative bg-white/20 backdrop-blur-2xl p-8 rounded-full ring-2 ring-white/30 shadow-2xl">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-white/80">
              <path d="M6.5 20H5C3.89543 20 3 19.1046 3 18V4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V18C21 19.1046 20.1046 20 19 20H17.5M12 19C13.6569 19 15 17.6569 15 16C15 14.3431 13.6569 13 12 13C10.3431 13 9 14.3431 9 16C9 17.6569 10.3431 19 12 19ZM9 6H15M7 9.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-white/50 text-lg">Certificates will appear here once added from the dashboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mx-auto mb-16">
          {certItems.map((cert, index) => (
            <MarketingCertCard key={cert.id} certificate={cert} index={index} />
          ))}
        </div>
      )}

      <Link href="/" className="mt-8">
        <div className="group relative px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center gap-3 text-white font-bold tracking-[0.2em] uppercase text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Home
          </div>
        </div>
      </Link>
    </section>
  );
}
