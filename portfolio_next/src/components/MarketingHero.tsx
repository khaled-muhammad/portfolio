"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import WaterText from "./WaterText";
import GlassyButton from "./GlassyButton";
import ProjectsSection from "./ProjectsSection";
import InfiniteItemsScroll from "./InfiniteItemsScroll";
import MarketingCertCard, { type Certificate } from "./MarketingCertCard";
import { marketingSocialBubbleIcon } from "./marketing-social-icons";
import { marketingSkillIconForTitle } from "@/data/marketing-skills-static";

/* ─── Types ────────────────────────────────────────────────── */
interface SkillItem {
  title: string;
  iconUrl?: string | null;
}

interface SocialItem {
  platform: string;
  url: string;
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
  stack: { id: number; title: string; iconUrl?: string | null }[];
}

interface Props {
  personName: string;
  socialItems: SocialItem[];
  projects: Project[];
  skillItems: SkillItem[];
  certItems: Certificate[];
}

const motionTransition = { duration: 0.6, ease: "easeOut" as const };

/* ─── MarketingHero ─────────────────────────────────────────── */
export default function MarketingHero({
  personName,
  socialItems,
  projects,
  skillItems,
  certItems,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  const scrollDownSvg = (
    <svg width="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const items = skillItems.map((s) => {
    const fromOriginal = marketingSkillIconForTitle(s.title);
    const icon = fromOriginal ? (
      <div className="skill-scroll-icon">{fromOriginal}</div>
    ) : s.iconUrl ? (
      <div className="skill-scroll-icon">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.iconUrl} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
    ) : (
      <div className="skill-scroll-icon">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 12,
            fontSize: 22,
            fontWeight: 700,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {s.title.slice(0, 2).toUpperCase()}
        </div>
      </div>
    );
    return { title: s.title, icon };
  });

  return (
    <>
      {/* ── Landing ───────────────────────────────────────────────── */}
      <section id="landing" className="flex flex-col min-h-[100vh] justify-between">
        <div className="sector-1 flex items-center flex-col gap-8 lg:flex-row">
          <div className="text">
            <WaterText
              text={`Hi, I am ${personName}`}
              className="ps-6 comfortaa-700 text-center md:text-left text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-tight mb-6 md:mb-0"
            />
            <div className="flex gap-3 items-center flex-wrap">
              <div className="label gradient-outline relative z-10">
                <h2 className="ps-10 quicksand-400 text-3xl text-white relative z-30">
                  A Full Stack Developer.
                </h2>
              </div>
              <div className="label-rounded-full gradient-outline relative z-10">
                <h2 className="quicksand-400 text-3xl text-white relative z-30">
                  Building since 2018
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 m-5">
            <div className="my-pic overflow-hidden rounded-[60px] mx-4 md:mr-10 md:ml-0 p-10 bg-white/10 backdrop-blur-2xl gradient-outline relative before:rounded-[64px] shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ca.slack-edge.com/T0266FRGM-U08QKDF6F9B-edcd82c42589-512"
                alt="Me"
                className="rounded-[60px]"
              />
            </div>
            <div className="social-media flex gap-6 justify-center mr-0 md:mr-10">
              {socialItems.slice(0, 4).map((sm) => (
                <a
                  key={sm.platform + sm.url}
                  href={sm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${sm.platform} profile (opens in a new tab)`}
                  className="group shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900/90"
                >
                  <div className="bubble">
                    {marketingSocialBubbleIcon(sm.platform) ?? (
                      <span className="text-xs font-bold text-white/80">{sm.platform[0]}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-5 items-start mt-10 md:mt-0">
          <a href="#projects" className="flex flex-col justify-center items-center gap-6 rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-white">
            <GlassyButton />
          </a>
          <Link href="/contact">
            <GlassyButton className="text-white" text="Get in Touch" />
          </Link>
        </div>

        <div className="self-center animate-float pb-4">{scrollDownSvg}</div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────── */}
      <ProjectsSection projects={projects} />

      {/* ── Skills ────────────────────────────────────────────────── */}
      <section
        id="skills"
        className="min-h-[80vh] flex flex-col justify-center items-center bg-white/5 backdrop-blur-xl shadow-[inset_4px_4px_8px_rgba(255,255,255,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.2)] gradient-outline"
      >
        <h2 className="text-center text-5xl bg-white/40 w-fit pt-3 pb-2 px-4 rounded-b-2xl gradient-outline relative before:rounded-b-2xl museomoderno-400 text-white/70">
          My Skills
        </h2>
        {items.length > 0 ? (
          <InfiniteItemsScroll items={items} />
        ) : (
          <p className="text-white/50 mt-10">Skills will appear once added from the dashboard.</p>
        )}
      </section>

      {/* ── Achievements / Certificates ───────────────────────────── */}
      <section id="certs" className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 px-4 md:px-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] -z-10" />

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={motionTransition}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl museomoderno-700 text-white mb-4 tracking-tighter">
            Achievements
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {certItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mx-auto mb-16">
            {certItems.map((cert, index) => (
              <MarketingCertCard key={cert.id} certificate={cert} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-white/50 mb-16">No certificates yet.</p>
        )}

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? ({ duration: 0 } as const) : { delay: 0.5 }}
        >
          <Link
            href="/certs"
            className="inline-block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900/80"
          >
            <div className="group relative px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all motion-reduce:transition-none hover:scale-105 motion-reduce:hover:scale-100 active:scale-95 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-3 text-white font-bold tracking-[0.2em] uppercase text-sm">
                Show All Certificates
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* ── About ─────────────────────────────────────────────────── */}
      <section id="about" className="relative flex justify-center items-center min-h-[100vh] text-white/70 museomoderno-400">
        <div className="absolute inset-0 backdrop-blur-sm -z-10" />
        <div className="content flex flex-col gap-15 p-10 2xl:px-80 xl:px-50 lg:px-25 lg:flex-row lg:gap-5">
          <div className="personal-info flex flex-col gap-3 flex-[2]">
            <h1 className="text-2xl font-bold">Hi, I am {personName}</h1>
            <h3>Full Stack Developer</h3>
            <h3>Alexandria, Egypt 🇪🇬</h3>
            <div className="flex flex-col gap-6 mt-5">
              <div className="secondary-info bg-gradient-to-bl from-white/40 to-white/30 py-3 rounded-2xl flex flex-col gap-3 relative gradient-outline before:rounded-2xl">
                <h1 className="mx-3 text-3xl">Full Stack &amp; Mobile Developer</h1>
                <p className="mx-3">Focus areas: Mobile apps, AI-backed tools, UI/UX, problem-solving</p>
              </div>
            </div>
            <div className="ring-2 ring-white/50 rounded-2xl p-2 mt-4">
              <h1 className="mx-3 text-3xl text-center">Values</h1>
              <p className="text-center">Curiosity, growth &amp; impact</p>
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/contact">
                <GlassyButton text="Get in Touch" />
              </Link>
            </div>
          </div>

          <div className="flex-[1.8] flex flex-col justify-center items-center">
            <div className="two-layer-img relative">
              <div className="back-layer absolute inset-0 bg-gradient-to-br from-white/60 rounded-md -translate-x-5 -translate-y-5 -z-10 gradient-outline before:rounded-md backdrop-invert overflow-hidden">
                <div className="circle absolute w-[50%] bg-gradient-to-b from-white/20 to-white/60 aspect-square rounded-full blur-sm -translate-x-1/2 -translate-y-1/2" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ca.slack-edge.com/T0266FRGM-U08QKDF6F9B-edcd82c42589-2048"
                alt="Me"
                className="rounded-md aspect-[2/3] object-cover w-85 animate-float"
                style={{ width: 340 }}
              />
            </div>
            <div className="px-8 mt-5">
              <p>Engineering Ideas. Hacking Problems. Designing with Purpose.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center flex-[2]">
            <div className="main-info bg-gradient-to-bl from-white/40 to-white/30 py-3 rounded-2xl flex flex-col gap-3 relative gradient-outline before:rounded-2xl w-full">
              <h1 className="mx-3 text-3xl">About Me</h1>
              <h3 className="label bg-green-500/20">Open To Work</h3>
              <hr className="border-white/20" />
              <p className="mx-3">
                I&apos;m {personName}, a developer building full-stack and mobile products. I started coding at age 9
                and focus on React frontends with Django backends, plus Flutter when the project calls for mobile. I&apos;ve shipped
                many personal and competition projects and competed in programming, science, and entrepreneurship.
              </p>
            </div>
            <div className="flex gap-8 items-center mt-4">
              {socialItems.slice(0, 2).map((sm) => (
                <a
                  key={sm.platform + sm.url}
                  href={sm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sm.platform}
                  className="group shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <div className="bubble">
                    {marketingSocialBubbleIcon(sm.platform) ?? (
                      <span className="text-xs font-bold text-white/80">{sm.platform[0]}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
            {socialItems.length > 2 && (
              <div className="flex gap-4 flex-wrap">
                {socialItems.slice(2).map((sm) => (
                  <a
                    key={sm.platform + sm.url}
                    href={sm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={sm.platform}
                    className="group shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <div className="bubble">
                      {marketingSocialBubbleIcon(sm.platform) ?? (
                        <span className="text-xs font-bold text-white/80">{sm.platform[0]}</span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
