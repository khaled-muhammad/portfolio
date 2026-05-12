"use client";

import { useRef, useState, useEffect, type JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import WaterText from "./WaterText";
import GlassyButton from "./GlassyButton";
import { marketingSocialBubbleIcon } from "./marketing-social-icons";

/* ─── Logo ─────────────────────────────────────────────────── */
export const Logo = ({ width = 40, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    viewBox="0 0 200 165"
    className={className}
  >
    <defs>
      <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
        <stop offset="40%" stopColor="rgba(255, 255, 255, 0.5)" />
        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
      </linearGradient>
      <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF" />
        <stop offset="100%" stopColor="#FF00FF" />
      </linearGradient>
    </defs>
    <path
      d="M 17.667 13.667 C 17.300 14.033, 17 22.430, 17 32.326 L 17 50.319 11.625 55.954 C 6.449 61.381, 1.960 68.522, 2.037 71.210 C 2.057 71.920, 3.258 70.049, 4.707 67.053 C 6.155 64.057, 9.720 59.149, 12.629 56.146 L 17.919 50.685 18.209 31.841 C 18.369 21.477, 18.462 12.998, 18.417 12.999 C 18.371 13, 18.033 13.300, 17.667 13.667 M 63 14.016 C 74.571 16.487, 85.104 24.398, 90.937 35 C 92.602 38.025, 93.968 40.050, 93.973 39.500 C 93.991 37.349, 88.002 28.281, 83.862 24.193 C 78.584 18.981, 68.820 13.984, 62.868 13.448 L 58.500 13.055 63 14.016 M 197 14.255 C 197 14.946, 181.475 31.031, 162.500 50 L 128 84.489 162.391 118.995 C 181.306 137.973, 197.020 154.175, 197.312 155 C 197.763 156.277, 197.854 156.265, 197.921 154.917 C 197.964 154.046, 182.460 137.849, 163.466 118.923 L 128.932 84.512 163.216 50.335 C 193.129 20.516, 200.045 13, 197.573 13 C 197.258 13, 197 13.565, 197 14.255"
      fill="url(#colorGradient)"
    />
    <path
      d="M 18.667 13.667 C 18.300 14.033, 18 22.493, 18 32.467 L 18 50.601 12.662 56.112 C 5.158 63.859, 1.771 71.395, 1.211 81.591 C 0.483 94.833, 4.917 106.175, 14.048 114.425 L 17.956 117.955 18.228 136.727 L 18.500 155.500 35.949 155.774 C 63.536 156.208, 72.731 154.008, 82.836 144.557 C 87.619 140.083, 94 129.825, 94 126.610 C 94 125.725, 94.320 125, 94.711 125 C 95.102 125, 102.446 131.975, 111.031 140.500 L 126.641 156 139.762 156 C 148.317 156, 153.121 155.613, 153.570 154.887 C 153.972 154.235, 144.981 144.451, 131.879 131.283 C 106.468 105.745, 104 104.026, 92.719 104.010 C 85.431 103.999, 85.594 104.126, 84.510 97.628 L 83.864 93.755 93.182 94.175 C 108.788 94.878, 109.728 95.519, 141.570 127.160 C 156.605 142.100, 169.490 154.694, 170.203 155.147 C 172.428 156.558, 197 156.199, 197 154.755 C 197 154.071, 181.475 137.981, 162.500 119 L 128 84.489 162.500 50 C 181.475 31.031, 197 14.946, 197 14.255 C 197 13.311, 193.694 13, 183.647 13 L 170.294 13 142.393 40.943 C 118.670 64.702, 113.595 69.305, 108.496 71.693 L 102.500 74.500 70 75 C 47.202 75.351, 36.869 75.862, 35.387 76.712 C 32.022 78.642, 30.580 83.197, 31.986 87.459 C 33.827 93.036, 36.768 94, 51.950 94 L 65 94 65 87.500 L 65 81 68.750 81.015 C 75.294 81.042, 75.195 80.704, 74.830 101.608 C 74.516 119.599, 74.381 120.707, 72.011 124.848 C 70.476 127.529, 67.797 130.207, 65.025 131.831 C 61.130 134.114, 59.391 134.468, 52.014 134.483 L 43.500 134.500 43.500 130 L 43.500 125.500 51.874 124.956 C 59.447 124.464, 60.476 124.148, 62.624 121.650 C 64.665 119.278, 65 117.839, 65 111.444 L 65 104 52.250 103.994 C 37.435 103.988, 33.292 103.073, 28.324 98.711 C 23.912 94.838, 22 90.540, 22 84.500 C 22 78.460, 23.912 74.162, 28.324 70.289 C 33.292 65.927, 37.435 65.012, 52.250 65.006 L 65 65 65 57.556 C 65 51.161, 64.665 49.722, 62.624 47.350 C 60.476 44.852, 59.447 44.536, 51.874 44.044 L 43.500 43.500 43.500 39 L 43.500 34.500 52.014 34.517 C 59.457 34.532, 61.113 34.876, 65.168 37.252 C 71.785 41.131, 75 47.815, 75 57.696 L 75 65 86.634 65 C 93.033 65, 100.120 64.469, 102.384 63.821 C 105.778 62.848, 110.689 58.490, 130.395 38.960 C 144.838 24.648, 154.012 14.828, 153.586 14.140 C 153.117 13.380, 148.501 13, 139.762 13 L 126.641 13 111.031 28.500 C 102.446 37.025, 95.102 44, 94.711 44 C 94.320 44, 94 43.275, 94 42.390 C 94 39.175, 87.619 28.917, 82.836 24.443 C 77.259 19.227, 69.786 15.477, 62.040 14.008 C 56.168 12.894, 19.726 12.608, 18.667 13.667"
      fill="url(#glassGradient)"
    />
  </svg>
);

/* ─── Notch nav link type ───────────────────────────────────── */
type NavLink = {
  name: string;
  path: string;
  icon: JSX.Element;
};

/* ─── Silver gradient icon helper ──────────────────────────── */
const silverDefs = (
  <defs>
    <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#f5f5f5" />
      <stop offset="50%" stopColor="#cfcfcf" />
      <stop offset="100%" stopColor="#f5f5f5" />
    </linearGradient>
  </defs>
);

const mainLinks: NavLink[] = [
  {
    name: "Home",
    path: "/#landing",
    icon: (
      <svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {silverDefs}
        <path d="M3 10.5651C3 9.9907 3 9.70352 3.07403 9.43905C3.1396 9.20478 3.24737 8.98444 3.39203 8.78886C3.55534 8.56806 3.78202 8.39175 4.23539 8.03912L11.0177 2.764C11.369 2.49075 11.5447 2.35412 11.7387 2.3016C11.9098 2.25526 12.0902 2.25526 12.2613 2.3016C12.4553 2.35412 12.631 2.49075 12.9823 2.764L19.7646 8.03913C20.218 8.39175 20.4447 8.56806 20.608 8.78886C20.7526 8.98444 20.8604 9.20478 20.926 9.43905C21 9.70352 21 9.9907 21 10.5651V17.8C21 18.9201 21 19.4801 20.782 19.908C20.5903 20.2843 20.2843 20.5903 19.908 20.782C19.4802 21 18.9201 21 17.8 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4801 3 18.9201 3 17.8V10.5651Z" fill="url(#silverGradient)" />
      </svg>
    ),
  },
  {
    name: "Projects",
    path: "/#projects",
    icon: (
      <svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {silverDefs}
        <path d="M13 7L11.8845 4.76892C11.5634 4.1268 11.4029 3.80573 11.1634 3.57116C10.9516 3.36373 10.6963 3.20597 10.4161 3.10931C10.0992 3 9.74021 3 9.02229 3H5.2C4.0799 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.0799 2 6.2V7M2 7H17.2C18.8802 7 19.7202 7 20.362 7.32698C20.9265 7.6146 21.3854 8.07354 21.673 8.63803C22 9.27976 22 10.1198 22 11.8V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V7Z" fill="url(#silverGradient)" />
      </svg>
    ),
  },
  {
    name: "Skills",
    path: "/#skills",
    icon: (
      <svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {silverDefs}
        <path d="M20 13V17.8C20 18.9201 20 19.4802 19.782 19.908C19.5903 20.2843 19.2843 20.5903 18.908 20.782C18.4802 21 17.9201 21 16.8 21H7.2C6.0799 21 5.51984 21 5.09202 20.782C4.71569 20.5903 4.40973 20.2843 4.21799 19.908C4 19.4802 4 18.9201 4 17.8V13M9 10H15M9.28571 14H14.7143C16.8467 14 17.913 14 18.7355 13.6039C19.552 13.2107 20.2107 12.552 20.6039 11.7355C21 10.913 21 9.84674 21 7.71429C21 6.11494 21 5.31527 20.7029 4.69835C20.408 4.08603 19.914 3.59197 19.3017 3.29709C18.6847 3 17.8851 3 16.2857 3H7.71429C6.11494 3 5.31527 3 4.69835 3.29709C4.08603 3.59197 3.59197 4.08603 3.29709 4.69835C3 5.31527 3 6.11494 3 7.71429C3 9.84674 3 10.913 3.39612 11.7355C3.7893 12.552 4.44803 13.2107 5.26447 13.6039C6.08703 14 7.15326 14 9.28571 14Z" fill="url(#silverGradient)" />
      </svg>
    ),
  },
  {
    name: "Certificates",
    path: "/certs",
    icon: (
      <svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {silverDefs}
        <path d="M6.5 20H5C3.89543 20 3 19.1046 3 18V4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V18C21 19.1046 20.1046 20 19 20H17.5M12 19C13.6569 19 15 17.6569 15 16C15 14.3431 13.6569 13 12 13C10.3431 13 9 14.3431 9 16C9 17.6569 10.3431 19 12 19ZM12 19L8.82867 22.1926L6.00024 19.3641L9.01965 16.3447M12 19L15.1928 22.1926L18.0212 19.3641L15.0018 16.3447M9 6H15M7 9.5H17" stroke="url(#silverGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Contact",
    path: "/contact",
    icon: (
      <svg width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {silverDefs}
        <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="url(#silverGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#silverGradient)" />
      </svg>
    ),
  },
];

/* ─── Notch ─────────────────────────────────────────────────── */
const Notch = ({ links }: { links: NavLink[] }) => {
  const notchRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<string>("7rem");
  const pathname = usePathname();

  const currentPath = pathname;

  const resizeNotch = () => {
    const notch = notchRef.current;
    if (notch) {
      const contentWidth = notch.scrollWidth;
      setWidth(
        isOpen
          ? `${contentWidth}px`
          : `${(iconRef.current?.clientWidth || 0) + (firstLinkRef.current?.clientWidth || 0) + 32}px`
      );
    }
  };

  useEffect(() => {
    resizeNotch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentPath]);

  const currentLink =
    links.find((l) => l.path === currentPath || (currentPath === "/" && l.path === "/#landing")) ||
    links[0];
  const sortedLinks = [...links].sort((a, b) => {
    if (a.path === currentLink.path) return -1;
    if (b.path === currentLink.path) return 1;
    return 0;
  });

  return (
    <div
      ref={notchRef}
      className="notch pointer-events-auto gradient-outline before:rounded-full"
      style={{ width }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div ref={iconRef} className="current-icon ps-3 transition-all">
        <div className={`ico transition-all duration-500 absolute ${isOpen ? "opacity-100" : "opacity-0"}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className={`ico transition-all duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
          {currentLink.icon}
        </div>
      </div>
      <div className="links flex items-center gap-6 museomoderno-400">
        {sortedLinks.map((link, index) => (
          <a
            key={link.path}
            ref={index === 0 ? firstLinkRef : null}
            href={link.path}
            className="text-white relative inline-block group"
          >
            {link.name}
            <span className="absolute left-0 bottom-0 h-0.5 bg-white transition-all w-0 group-hover:w-full before:absolute before:w-0 group-hover:before:w-0.5 before:h-0.5 rounded-full before:bg-white before:right-0 before:translate-x-1" />
          </a>
        ))}
      </div>
    </div>
  );
};

/* ─── Admin shortcut (logged-in only): same surface as .notch, icon only ─ */
function AdminDashboardOrb({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Link
      href="/dashboard"
      className={`notch-sibling-orb gradient-outline before:rounded-full outline-none motion-safe:hover:opacity-95 motion-safe:active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className}`}
      aria-label="Open admin dashboard"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="text-white/90"
        aria-hidden
      >
        <path
          d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

/* ─── Navbar ────────────────────────────────────────────────── */
export function MarketingNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { status } = useSession();
  const showAdminOrb = status === "authenticated";

  return (
    <>
      <nav className="py-5 px-5 flex z-[999] relative justify-between items-center">
        <a
          href="#"
          className="gradient-outline relative p-5 aspect-square flex justify-center items-center rounded-full before:rounded-full backdrop-blur-xl shadow-[inset_1px_3px_4px_rgba(255,255,255,0.6)]"
        >
          <Logo />
        </a>

        {/* Desktop: fixed centered notch + admin orb (absolute cluster from viewport) */}
        <div className="marketing-notch-cluster hidden md:flex">
          <Notch links={mainLinks} />
          {showAdminOrb ? <AdminDashboardOrb /> : null}
        </div>

        {/* Mobile: admin orb absolutely to the left of menu control */}
        <div className="relative flex items-center md:hidden">
          {showAdminOrb ? (
            <AdminDashboardOrb className="absolute right-full top-1/2 mr-2 -translate-y-1/2" />
          ) : null}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-[1] p-3 rounded-full backdrop-blur-md bg-black/50 border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-lg transition-all duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="flex flex-col items-center justify-center h-full pt-20">
          <div className="flex flex-col space-y-8">
            {mainLinks.map((link, index) => (
              <a
                key={link.path}
                href={link.path}
                className="text-white text-2xl font-medium hover:text-blue-400 transition-all duration-300 transform hover:scale-105 animate-slideInUp"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center">{link.icon}</div>
                  <span>{link.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-3 rounded-full backdrop-blur-md bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
          aria-label="Close mobile menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
type SocialRow = { id: number; platform: string; url: string; username: string | null };

export function MarketingFooter({
  socials,
  info,
}: {
  socials?: SocialRow[];
  info?: { title: string; info: string }[];
}) {
  return (
    <footer className="pt-[5rem] pb-[2rem] px-10 relative flex flex-col gradient-outline gap-10 text-white quicksand-400 font-bold">
      <div className="absolute inset-0 backdrop-blur-md -z-10">
        <WaterText text={""} />
      </div>
      <Logo width={100} className="self-center" />
      <h2 className="text-center text-5xl">Get in Touch</h2>
      <p className="text-center font-medium text-white/60">
        Let&apos;s discuss projects, collaborate, or just connect!
      </p>
      <Link href="/contact" className="flex justify-center">
        <GlassyButton className="text-white/50 self-center" text="Contact Me" />
      </Link>
      <div className="links flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between px-4">
        {info && info.length > 0 && (
          <div className="contact-links">
            <h2 className="text-2xl mb-5">Contact</h2>
            <ul className="flex flex-col items-start gap-3">
              {info.map((i) => (
                <li key={i.title}>
                  <a
                    href={i.title === "email" ? `mailto:${i.info}` : i.title === "phone" ? `tel:${i.info}` : undefined}
                    className="flex justify-center items-center gap-2 group"
                  >
                    <div className="bubble min-w-10 text-white">
                      {marketingSocialBubbleIcon(i.title) ?? null}
                    </div>
                    {i.info}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="navigate-links">
          <h2 className="text-2xl mb-5">Navigate</h2>
          <ul className="flex flex-col gap-2">
            <li><Link href="/#landing" className="hover:text-white/60 transition">Home</Link></li>
            <li><Link href="/#projects" className="hover:text-white/60 transition">Projects</Link></li>
            <li><Link href="/#skills" className="hover:text-white/60 transition">Skills</Link></li>
            <li><Link href="/certs" className="hover:text-white/60 transition">Certificates</Link></li>
            <li><Link href="/contact" className="hover:text-white/60 transition">Contact</Link></li>
          </ul>
        </div>
        {socials && socials.length > 0 && (
          <div className="social-links">
            <h2 className="text-2xl mb-5">Connect</h2>
            <ul className="flex gap-4 flex-wrap">
              {socials.map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform} className="group shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white">
                    <div className="bubble min-w-10 text-white">
                      {marketingSocialBubbleIcon(s.platform) ?? (
                                 <span className="text-xs font-bold text-white">{s.platform[0]}</span>
                               )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <WaterText
        text={`All copyrights reserved © ${new Date().getFullYear()}`}
        className="text-center comfortaa-700"
        color="rgba(255,255,255,0.6)"
      />
    </footer>
  );
}
