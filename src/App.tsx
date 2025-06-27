import React, { useEffect, useRef } from "react";
import Navbar from "./components/NavBar";
import WaterText from "./components/WaterText";
import { motion, useMotionValue, useSpring } from "framer-motion";
import scrollDown from "./assets/scroll-down.gif";
import GooeyButton from "./components/GooeyBtn";
import AnimatedSection from "./components/AnimatedSection";
import SmoothScroll from "./components/SmoothScroll";
import SimpleGlassyBtn from "./components/SimpleGlassyBtn";

import GithubIcon from "./assets/icons/Github.svg";
import { Label } from "./components/Label";

const bornAt = 2007;
const startedCodingAt = bornAt + 9;
const yearsOfExperience = new Date().getFullYear() - startedCodingAt;

export const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const spring = useSpring(x, {
    stiffness: 300,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    const handleMousePlacement = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const midP = rect.left + rect.width / 2;

      if (e.clientX > rect.left && e.clientX < rect.right) {
        const distance = e.clientX - midP;
        x.set(distance);
      } else {
        x.set(0);
      }
    };

    window.addEventListener("mousemove", handleMousePlacement);

    return () => {
      window.removeEventListener("mousemove", handleMousePlacement);
    };
  }, [x]);

  return (
    <>
      <section
        id="landing"
        className="flex flex-col min-h-[100vh] justify-between"
      >
        <Navbar />
        <div className="sector-1 flex items-center flex-col gap-8 md:gap-0 lg:flex-row">
          <div className="text">
            <WaterText
              text="Hi, I am Khaled Muhammad"
              className="ps-6 comfortaa-700 text-center md:text-left text-[clamp(2.5rem,8vw,8rem)] mb-6 md:mb-0"
            />
            <div ref={ref} className="flex gap-3 items-center flex-wrap">
              <div className="label gradient-outline relative z-10">
                <h2 className="ps-10 quicksand-400 text-3xl text-white relative z-30">
                  A Senior Full Stack Dev.
                </h2>
              </div>
              <motion.div
                className="bubble z-20 pointer-events-none bg-white/10 gradient-outline"
                style={{ translateX: spring }}
              >
                <span className="text-3xl">{yearsOfExperience}</span>
              </motion.div>

              <Label>
                <h2 className="quicksand-400 text-3xl text-white relative z-30">
                  Years of experience.
                </h2>
              </Label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="my-pic overflow-hidden rounded-[60px] mx-4 md:mr-10 md:ml-0 p-10 bg-white/10 backdrop-blur-2xl gradient-outline relative before:rounded-[64px] shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]">
              <img
                src="https://ca.slack-edge.com/T0266FRGM-U08QKDF6F9B-edcd82c42589-512"
                alt="Me"
                className="rounded-[60px]"
              />
            </div>
            <div className="social-media flex gap-6 justify-center mr-0 md:mr-10">
              <a href="#">
                <div className="bubble">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="whiteGradient"
                        x1="0"
                        y1="0"
                        x2="48"
                        y2="48"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="rgba(255,255,255,0.6)" offset="0%" />
                        <stop
                          stop-color="rgba(255,255,255,0.4)"
                          offset="100%"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M24.0432 0.179932C10.8147 0.179932 0.0876465 11.0878 0.0876465 24.5445C0.0876465 35.3096 6.95165 44.4426 16.4699 47.6643C17.6671 47.8899 18.1067 47.1358 18.1067 46.4922C18.1067 45.9112 18.0845 43.9919 18.0742 41.956C11.4097 43.4299 10.0034 39.0812 10.0034 39.0812C8.9137 36.265 7.34358 35.5161 7.34358 35.5161C5.17009 34.0039 7.50742 34.035 7.50742 34.035C9.91297 34.2065 11.1796 36.5458 11.1796 36.5458C13.3162 40.2707 16.7837 39.1938 18.1507 38.5712C18.3657 36.9969 18.9866 35.9212 19.6716 35.3132C14.3508 34.6971 8.7574 32.6079 8.7574 23.2719C8.7574 20.6118 9.6932 18.4383 11.2256 16.732C10.9769 16.1179 10.1569 13.6402 11.4577 10.2841C11.4577 10.2841 13.4693 9.62928 18.0472 12.7816C19.9581 12.2418 22.0074 11.971 24.0432 11.9618C26.0791 11.971 28.13 12.2418 30.0444 12.7816C34.6167 9.62928 36.6256 10.2841 36.6256 10.2841C37.9295 13.6402 37.1091 16.1179 36.8604 16.732C38.3964 18.4383 39.3259 20.6118 39.3259 23.2719C39.3259 32.6301 33.7218 34.6906 28.3874 35.2938C29.2467 36.0499 30.0123 37.5327 30.0123 39.8059C30.0123 43.0655 29.9845 45.6893 29.9845 46.4922C29.9845 47.1406 30.4157 47.9003 31.63 47.6611C41.1431 44.4357 47.9984 35.3059 47.9984 24.5445C47.9984 11.0878 37.273 0.179932 24.0432 0.179932Z"
                      fill="url(#whiteGradient)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.16084 35.1623C9.10808 35.2837 8.92084 35.3196 8.75026 35.2365C8.57651 35.157 8.47892 34.992 8.53525 34.8706C8.58682 34.7459 8.77446 34.7116 8.94781 34.7943C9.12196 34.8742 9.22113 35.0408 9.16084 35.1623Z"
                      fill="rgba(255,255,255,1)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.1312 36.263C10.0169 36.3707 9.79356 36.3207 9.64203 36.1504C9.48533 35.9805 9.45598 35.7534 9.57181 35.644C9.68963 35.5363 9.90622 35.5867 10.0633 35.7566C10.22 35.9285 10.2506 36.154 10.1312 36.263Z"
                      fill="rgba(255,255,255,1)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.0757 37.6662C10.9289 37.7699 10.6889 37.6727 10.5405 37.456C10.3938 37.2394 10.3938 36.9795 10.5437 36.8754C10.6925 36.7713 10.9289 36.8649 11.0793 37.08C11.2256 37.2999 11.2256 37.5601 11.0757 37.6662Z"
                      fill="rgba(255,255,255,1)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3697 39.0219C12.2384 39.1692 11.9587 39.1296 11.754 38.9287C11.5446 38.7322 11.4863 38.4534 11.618 38.3062C11.7509 38.1585 12.0321 38.2 12.2384 38.3994C12.4463 38.5954 12.5097 38.8763 12.3697 39.0219Z"
                      fill="rgba(255,255,255,1)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.1548 39.8091C14.0969 39.9999 13.8275 40.0867 13.5562 40.0056C13.2853 39.9221 13.1079 39.6985 13.1627 39.5057C13.219 39.3136 13.4896 39.2232 13.7629 39.31C14.0334 39.3931 14.2112 39.615 14.1548 39.8091Z"
                      fill="rgba(255,255,255,1)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.1153 39.9552C16.122 40.1561 15.8919 40.3227 15.6071 40.3259C15.3207 40.3328 15.089 40.1702 15.0859 39.9725C15.0859 39.7696 15.3108 39.6045 15.5972 39.5997C15.882 39.594 16.1153 39.7554 16.1153 39.9552Z"
                      fill="rgba(255,255,255,1)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.9397 39.6392C17.9738 39.8353 17.7758 40.0367 17.493 40.0899C17.2149 40.142 16.9575 40.0209 16.9222 39.8264C16.8876 39.6255 17.0892 39.4242 17.3669 39.3721C17.6501 39.3221 17.9036 39.4399 17.9397 39.6392Z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                </div>
              </a>
              <a href="#">
                <div className="bubble">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="#blueGradient"
                        x1="0"
                        y1="0"
                        x2="48"
                        y2="48"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="rgba(255,255,255,0.6)" offset="0%" />
                        <stop
                          stop-color="rgba(255,255,255,0.4)"
                          offset="100%"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM16.9605 19.8778H11.5216V36.2196H16.9605V19.8778ZM17.3188 14.8227C17.2835 13.2204 16.1377 12 14.277 12C12.4164 12 11.2 13.2204 11.2 14.8227C11.2 16.3918 12.3805 17.6473 14.2064 17.6473H14.2412C16.1377 17.6473 17.3188 16.3918 17.3188 14.8227ZM36.5754 26.8497C36.5754 21.8303 33.8922 19.4941 30.3131 19.4941C27.4254 19.4941 26.1326 21.0802 25.4107 22.1929V19.8783H19.9711C20.0428 21.4117 19.9711 36.22 19.9711 36.22H25.4107V27.0934C25.4107 26.605 25.446 26.1178 25.5898 25.7681C25.9829 24.7924 26.8779 23.7822 28.3805 23.7822C30.3494 23.7822 31.1365 25.2807 31.1365 27.4767V36.2196H36.5752L36.5754 26.8497Z"
                      fill="url(##blueGradient)"
                    />
                  </svg>
                </div>
              </a>
              <a href="#">
                <div className="bubble">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="dBlueGradient"
                        x1="0"
                        y1="0"
                        x2="48"
                        y2="48"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="rgba(255,255,255,0.6)" offset="0%" />
                        <stop
                          stop-color="rgba(255,255,255,0.4)"
                          offset="100%"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM26.5016 38.1115V25.0542H30.1059L30.5836 20.5546H26.5016L26.5077 18.3025C26.5077 17.1289 26.6192 16.5001 28.3048 16.5001H30.5581V12H26.9532C22.6231 12 21.0991 14.1828 21.0991 17.8536V20.5551H18.4V25.0547H21.0991V38.1115H26.5016Z"
                      fill="url(#dBlueGradient)"
                    />
                  </svg>
                </div>
              </a>
              <a href="#">
                <div className="bubble">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="mailGradient"
                        x1="0"
                        y1="0"
                        x2="48"
                        y2="48"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stop-color="rgba(255,255,255,0.6)" />
                        <stop
                          offset="100%"
                          stop-color="rgba(255,255,255,0.4)"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM23.9639 26.0193L14.9987 19.5115V33.23H13.5009C12.6664 33.23 12.0031 32.5667 12.0031 31.7322V16.562C12.0031 16.4985 12.007 16.4389 12.0144 16.3831C12.0416 16.1451 12.1284 15.9122 12.2813 15.7061C12.7734 15.0428 13.7363 14.893 14.421 15.3851L23.9853 22.3391L33.6138 15.2996C34.2771 14.8074 35.2186 14.9572 35.7107 15.6419C35.9723 15.9945 36.0525 16.4256 35.9674 16.8261V31.7536C35.9674 32.5667 35.3041 33.23 34.4697 33.23H32.9719V19.4788L23.9639 26.0193Z"
                      fill="url(#mailGradient)"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        <a
          href="#projects"
          className="next-btn self-center mb-6 mt-20 flex flex-col justify-center items-center gap-6"
        >
          {/* <div className="glassy-btn rounded-xl bg-white/10 backdrop-blur-lg  w-fit min-w-32 text-center px-4 py-2 text-white font-bold gradient-outline relative before:rounded-xl shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)] z-10">
            <span className="text-white/70">See More</span>
            <div className="absolute rounded-xl bg-slate-50/15 inset-0 mt-4 -z-10"></div>
          </div> */}
          {/* <div className="3d-glassy-btn relative">
            <div className="bg-white/30 backdrop-blur-md rounded-xl absolute w-[114%] h-[100%] -translate-x-1/2 left-1/2 translate-y-3 -z-20 shadow-xl "></div>

            <div className="bg-white/20 backdrop-blur-md border border-white/40 rounded-xl absolute w-[104%] h-[96%] -translate-x-1/2 left-1/2 translate-y-1.5 -z-10 shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]"></div>

            <div className="bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-xl gradient-outline before:rounded-xl text-[#047e62] font-bold px-5 py-3 rounded-xl text-xl shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]">
              Read More
            </div>
          </div> */}
          <GooeyButton />

          <img src={scrollDown} width={80} />
        </a>
      </section>
      <section id="projects" className="flex justify-center px-10 py-11">
        <div className="relative">
          <div className="gallery w-[90vw] min-h-[90vh] bg-white/20 backdrop-blur-xl rounded-4xl shadow-[inset_4px_4px_8px_rgba(255,255,255,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.2)] gradient-outline before:rounded-4xl grid grid-cols-1 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-6 pt-8 pb-16 px-10 ring-6 ring-white/30">
            <div className="gallery-card relative p-4 bg-white/30 rounded-lg gradient-outline before:rounded-lg">
              <div className="content bg-white/30 rounded-lg w-full h-full px-4 pt-4 pb-30 flex flex-col md:flex-row lg:flex-col md:items-center lg:items-stretch gap-4 relative gradient-outline before:rounded-lg">
                <div className="img-group relative group">
                  <img
                    src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/1471febd1d4b7fad61b658e2a0e2fb4e3745e7ac_screenshot_2025-06-26_at_6.22.02___pm.png"
                    alt="Thoughty Preview"
                    className="w-full rounded-2xl ring-2 ring-white/40 transition-all duration-700 group-hover:blur md:hidden lg:block"
                  />
                  <div className="prj-category absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 opacity-0 w-0 gap-2 transition-all duration-500 group-hover:opacity-100 group-hover:w-[200px] overflow-hidden">
                    <span className="project-type text-white bg-white/20 rounded-xl p-1 backdrop-blur-2xl shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.28)]">
                      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="white-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="1"/>
                            <stop offset="1" stop-color="white" stop-opacity="0.6"/>
                          </linearGradient>
                        </defs>
                        <path d="M19 9C19 12.866 15.866 16 12 16M19 9C19 5.13401 15.866 2 12 2M19 9H5M12 16C8.13401 16 5 12.866 5 9M12 16C13.7509 14.0832 14.7468 11.5956 14.8009 9C14.7468 6.40442 13.7509 3.91685 12 2M12 16C10.2491 14.0832 9.25498 11.5956 9.20091 9C9.25498 6.40442 10.2491 3.91685 12 2M12 16V18M5 9C5 5.13401 8.13401 2 12 2M14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20M14 20C14 18.8954 13.1046 18 12 18M14 20H21M10 20C10 18.8954 10.8954 18 12 18M10 20H3" 
                          stroke="url(#white-gradient)" 
                          stroke-width="2" 
                          stroke-linecap="round" 
                          stroke-linejoin="round"/>
                      </svg>
                    </span>

                  </div>
                </div>
                <div className="main-text flex flex-col gap-0 lg:gap-2">
                  <h2 className="text-white font-bold text-2xl">Thoughty</h2>
                  <p className="text-muted">
                    Thoughty is a platform for sharing ideas of the youth with people and entrepreneurs across the world with the ability to clone ideas to other verses (Clone different version of the same idea using AI), Selling the idea at some point, or find investors.
                  </p>
                </div>
                <hr />
                <div className="cta flex gap-4 flex-wrap justify-around items-center">
                  <a href="https://thoughty.netlify.app/">
                    <SimpleGlassyBtn className="text-black/70">
                      <span className="hidden xl:block">
                      Live Demo
                      </span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 4.98951C5 4.01835 5 3.53277 5.20249 3.2651C5.37889 3.03191 5.64852 2.88761 5.9404 2.87018C6.27544 2.85017 6.67946 3.11953 7.48752 3.65823L18.0031 10.6686C18.6708 11.1137 19.0046 11.3363 19.1209 11.6168C19.2227 11.8621 19.2227 12.1377 19.1209 12.383C19.0046 12.6635 18.6708 12.886 18.0031 13.3312L7.48752 20.3415C6.67946 20.8802 6.27544 21.1496 5.9404 21.1296C5.64852 21.1122 5.37889 20.9679 5.20249 20.7347C5 20.467 5 19.9814 5 19.0103V4.98951Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </SimpleGlassyBtn>
                  </a>
                  <SimpleGlassyBtn className="text-black/70">
                    <span className="hidden xl:block">Github</span>
                    <img src={GithubIcon} width={18} />
                  </SimpleGlassyBtn>
                </div>
                <hr />
                <div className="stack flex-wrap gap-4 md:justify-center lg:justify-normal hidden sm:flex">
                  <Label>
                    <h4 className="quicksand-400 text-black relative z-30 flex gap-2 flex-wrap items-center justify-center">
                      <span className="hidden xl:block">React</span>
                      <svg width={18} height={18} viewBox="0 0 128 128">
                      <g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"></circle><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"></path></g>
                      </svg>
                    </h4>
                  </Label>
                  <Label>
                    <h4 className="quicksand-400 text-black relative z-30 flex gap-2 flex-wrap items-center justify-center">
                      <span className="hidden xl:block">Django</span>
                      <svg width={18} height={18} viewBox="0 0 128 128">
                      <path d="M59.448 0h20.93v96.88c-10.737 2.04-18.62 2.855-27.181 2.855-25.551-.001-38.87-11.551-38.87-33.705 0-21.338 14.135-35.2 36.015-35.2 3.398 0 5.98.272 9.106 1.087zm0 48.765c-2.446-.815-4.485-1.086-7.067-1.086-10.6 0-16.717 6.523-16.717 17.939 0 11.145 5.845 17.26 16.582 17.26 2.309 0 4.212-.136 7.202-.542z"></path><path d="M113.672 32.321V80.84c0 16.717-1.224 24.735-4.893 31.666-3.398 6.661-7.883 10.873-17.124 15.494l-19.435-9.241c9.242-4.35 13.726-8.153 16.58-14 2.99-5.979 3.943-12.91 3.943-31.122V32.321zM92.742.111h20.93v21.474h-20.93z"></path>
                      </svg>
                    </h4>
                  </Label>
                  <Label>
                    <h4 className="quicksand-400 text-black relative z-30 flex gap-2 flex-wrap items-center justify-center">
                      <span className="hidden xl:block">Tailwind</span>
                      <svg width={18} height={18} viewBox="0 0 128 128">
                      <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8"></path>
                      </svg>
                    </h4>
                  </Label>
                </div>
              </div>
              <div className="b-left absolute bottom-0 left-0 flex flex-col gap-4 w-full pr-4 justify-start items-start md:items-center lg:items-start">
                <div className="3d-glassy-btn relative self-end mr-5 sm:block md:hidden lg:block">
                  <div className="bg-white/30 backdrop-blur-md rounded-xl absolute w-[114%] h-[100%] left-1/2 -translate-x-1/2 translate-y-3 -z-20 shadow-xl"></div>

                  <div className="bg-white/20 backdrop-blur-md border border-white/40 rounded-xl absolute w-[104%] h-[96%] left-1/2 -translate-x-1/2 translate-y-1.5 -z-10 shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]"></div>

                  <div className="bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-xl gradient-outline before:rounded-xl text-[#047e62] font-bold px-5 py-3 rounded-xl text-sm shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]">
                    Read More
                  </div>
                </div>
                <div className="more-info px-5 py-2 min-w-50 rounded-bl-lg rounded-tr-4xl md:rounded-bl-none lg:rounded-bl-lg bg-white/30 inset-ring-2 inset-ring-white/20 shadow-[inset_2px_2px_3px_rgba(255,255,255,0.4),inset_-2px_-2px_3px_rgba(255,255,255,0.25)]">
                  <span>2025 • Completed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="categories flex absolute gap-2 bg-white/20 backdrop-blur-lg rounded-4xl px-6 py-3 bottom-0 -translate-x-1/2 left-1/2 translate-y-1/2 text-white font-semibold gradient-outline before:rounded-4xl shadow-[0_16px_20px_rgba(0,0,0,0.2)]">
            <button className="bg-white/20 px-6 py-2 rounded-full">Web</button>
            <button className="px-6 py-2 rounded-full">Mobile</button>
            <button className="px-6 py-2 rounded-full">Scripts</button>
            <button className="px-6 py-2 rounded-full">CLI</button>
            <button className="px-6 py-2 rounded-full">Software/GUI</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
