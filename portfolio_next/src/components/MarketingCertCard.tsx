"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export interface Certificate {
  id: number;
  title: string;
  image: string;
  link?: string;
  description?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

const MarketingCertCard: React.FC<CertificateCardProps> = ({
  certificate,
  index,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover={prefersReducedMotion ? undefined : { y: -10 }}
      transition={
        prefersReducedMotion
          ? ({ duration: 0 } as const)
          : {
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.23, 1, 0.32, 1],
            }
      }
      className="group relative flex flex-col h-full"
    >
      <div className="relative p-1 bg-gradient-to-br from-white/20 to-transparent rounded-2xl overflow-hidden h-full flex flex-col shadow-2xl">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl -z-10" />

        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-5"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />
        )}

        <div className="p-4 bg-black/20 rounded-xl h-full flex flex-col items-stretch">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-6 shadow-inner ring-1 ring-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute top-3 right-3 z-20">
              <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  Certified
                </span>
              </div>
            </div>
          </div>

          <div className="flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2 comfortaa-700 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
              {certificate.title}
            </h3>

            <p className="text-white/60 text-sm mb-6 line-clamp-2 font-light">
              {certificate.description ||
                "Official certification of achievement for professional development and skill mastery."}
            </p>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-white/40 font-mono tracking-tighter">
                REF: #{certificate.id.toString().padStart(4, "0")}
              </span>

              {certificate.link ? (
                <Link
                  href={certificate.link}
                  className="group/btn relative px-5 py-2 overflow-hidden rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/80"
                >
                  <div className="absolute inset-0 bg-white/10 group-hover/btn:bg-white/20 transition-colors" />
                  <div className="relative flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest">
                    Explore
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </Link>
              ) : (
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                  Internal
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketingCertCard;
