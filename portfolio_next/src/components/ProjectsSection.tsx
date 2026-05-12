"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SimpleGlassyBtn from "./SimpleGlassyBtn";
import { MarketingLabel } from "./MarketingLabel";

interface Skill {
  id: number;
  title: string;
  iconUrl?: string | null;
}

interface Project {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  url: string | null;
  githubUrl: string | null;
  platforms: string[];
  status: string | null;
  stack: Skill[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

const stackIcons: Record<string, React.ReactNode> = {
  Django: (
    <svg width={18} height={18} viewBox="0 0 128 128">
      <path d="M59.448 0h20.93v96.88c-10.737 2.04-18.62 2.855-27.181 2.855-25.551-.001-38.87-11.551-38.87-33.705 0-21.338 14.135-35.2 36.015-35.2 3.398 0 5.98.272 9.106 1.087zm0 48.765c-2.446-.815-4.485-1.086-7.067-1.086-10.6 0-16.717 6.523-16.717 17.939 0 11.145 5.845 17.26 16.582 17.26 2.309 0 4.212-.136 7.202-.542z" />
      <path d="M113.672 32.321V80.84c0 16.717-1.224 24.735-4.893 31.666-3.398 6.661-7.883 10.873-17.124 15.494l-19.435-9.241c9.242-4.35 13.726-8.153 16.58-14 2.99-5.979 3.943-12.91 3.943-31.122V32.321zM92.742.111h20.93v21.474h-20.93z" />
    </svg>
  ),
  React: (
    <svg width={18} height={18} viewBox="0 0 128 128">
      <g fill="#61DAFB">
        <circle cx="64" cy="64" r="11.4" />
        <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8z" />
      </g>
    </svg>
  ),
  Tailwind: (
    <svg width={18} height={18} viewBox="0 0 128 128">
      <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64z" fill="#38bdf8" />
    </svg>
  ),
};

const FILTERS = [
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "scripts", label: "Scripts" },
  { value: "cli", label: "CLI" },
  { value: "Software/GUI", label: "Software/GUI" },
];

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [currentFilter, setCurrentFilter] = useState("web");

  const filteredProjects = projects.filter((proj) =>
    proj.platforms.includes(currentFilter)
  );

  return (
    <section id="projects" className="flex justify-center px-10 py-11">
      <div className="relative">
        <div className="gallery w-[90vw] min-h-[90vh] bg-white/20 backdrop-blur-xl rounded-[2rem] shadow-[inset_4px_4px_8px_rgba(255,255,255,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.2)] gradient-outline before:rounded-[2rem] grid grid-cols-1 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-6 pt-20 pb-10 px-10 ring-[6px] ring-white/30">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={prefersReducedMotion ? ({ duration: 0 } as const) : undefined}
                  className="gallery-card relative p-4 bg-white/30 rounded-lg gradient-outline before:rounded-lg"
                >
                  <div className="content bg-white/30 rounded-lg w-full h-full px-4 pt-4 pb-30 flex flex-col md:flex-row lg:flex-col md:items-center lg:items-stretch gap-4 relative gradient-outline before:rounded-lg">
                    <div className="img-group relative group">
                      {proj.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={proj.imageUrl}
                          alt={proj.name}
                          className="w-full rounded-2xl ring-2 ring-white/40 transition-all duration-700 group-hover:blur md:hidden lg:block"
                        />
                      )}
                    </div>
                    <div className="main-text flex flex-col gap-0 lg:gap-2">
                      <h2 className="text-white font-bold text-2xl">{proj.name}</h2>
                      <p className="text-white/70">{proj.description}</p>
                    </div>
                    <hr className="border-white/20" />
                    <div className="cta flex gap-4 flex-wrap justify-around items-center">
                      {proj.url && (
                        <a href={proj.url} target="_blank" rel="noopener noreferrer">
                          <SimpleGlassyBtn className="text-black/70 cursor-pointer">
                            <span className="hidden xl:block">Live Demo</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 4.98951C5 4.01835 5 3.53277 5.20249 3.2651C5.37889 3.03191 5.64852 2.88761 5.9404 2.87018C6.27544 2.85017 6.67946 3.11953 7.48752 3.65823L18.0031 10.6686C18.6708 11.1137 19.0046 11.3363 19.1209 11.6168C19.2227 11.8621 19.2227 12.1377 19.1209 12.383C19.0046 12.6635 18.6708 12.886 18.0031 13.3312L7.48752 20.3415C6.67946 20.8802 6.27544 21.1496 5.9404 21.1296C5.64852 21.1122 5.37889 20.9679 5.20249 20.7347C5 20.467 5 19.9814 5 19.0103V4.98951Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </SimpleGlassyBtn>
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">
                          <SimpleGlassyBtn className="text-black/70 cursor-pointer">
                            <span className="hidden xl:block">GitHub</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                          </SimpleGlassyBtn>
                        </a>
                      )}
                    </div>
                    <hr className="border-white/20" />
                    <div className="stack flex-wrap gap-4 md:justify-center lg:justify-normal hidden sm:flex">
                      {proj.stack.map((sk) => (
                        <MarketingLabel key={sk.id}>
                          <h4 className="quicksand-400 text-black relative z-30 flex gap-2 flex-wrap items-center justify-center">
                            <span className="hidden xl:block">{sk.title}</span>
                            {stackIcons[sk.title] != null ? (
                              stackIcons[sk.title]
                            ) : sk.iconUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={sk.iconUrl} alt={sk.title} width={18} />
                            ) : null}
                          </h4>
                        </MarketingLabel>
                      ))}
                    </div>
                  </div>
                  <div className="b-left absolute bottom-0 left-0 flex flex-col gap-4 w-full pr-4 justify-start items-start md:items-center lg:items-start">
                    <div className="more-info px-5 py-2 min-w-50 rounded-bl-lg rounded-tr-[2rem] md:rounded-bl-none lg:rounded-bl-lg bg-white/30 shadow-[inset_2px_2px_3px_rgba(255,255,255,0.4),inset_-2px_-2px_3px_rgba(255,255,255,0.25)] text-white/80">
                      <span>
                        {proj.status != null
                          ? `${proj.status.split("-")[0]} • Completed`
                          : "In Progress"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={prefersReducedMotion ? ({ duration: 0 } as const) : undefined}
                className="col-span-full flex flex-col items-center justify-center py-20 px-10 text-center"
              >
                <div className="relative mb-8">
                  <div className="relative bg-white/20 backdrop-blur-2xl p-8 rounded-full ring-2 ring-white/30 shadow-2xl">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-white/80">
                      <path d="M12 2V4M12 20V22M4 12H2M22 12H20M18.36 18.36L19.78 19.78M5.64 5.64L4.22 4.22M18.36 5.64L19.78 4.22M5.64 18.36L4.22 19.78M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">Exploring New Horizons</h3>
                <p className="text-white/60 text-lg max-w-md mx-auto leading-relaxed">
                  Crafting something amazing for the{" "}
                  <span className="text-white font-semibold uppercase tracking-wider">{currentFilter}</span>{" "}
                  category. Stay tuned!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories filter */}
        <div className="categories absolute bg-white/20 backdrop-blur-lg rounded-[2rem] px-6 py-3 top-0 -translate-x-1/2 left-1/2 -translate-y-1/2 text-white font-semibold gradient-outline before:rounded-[2rem] shadow-[0_16px_20px_rgba(0,0,0,0.2)] max-w-[90vw] z-50">
          <div className="flex gap-2 overflow-x-auto">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`${currentFilter === f.value ? "bg-white/20" : ""} px-6 py-2 rounded-full cursor-pointer`}
                onClick={() => setCurrentFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
