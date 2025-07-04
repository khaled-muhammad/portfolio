import { Label } from "./Label";
import SimpleGlassyBtn from "./SimpleGlassyBtn";
import GithubIcon from "../assets/icons/Github.svg";
import { useEffect, useState } from "react";
import { defaultAxios } from "@/lib/api";
import { toast } from "react-toastify";

const stackIcons = {
  Django: (
    <svg width={18} height={18} viewBox="0 0 128 128">
      <path d="M59.448 0h20.93v96.88c-10.737 2.04-18.62 2.855-27.181 2.855-25.551-.001-38.87-11.551-38.87-33.705 0-21.338 14.135-35.2 36.015-35.2 3.398 0 5.98.272 9.106 1.087zm0 48.765c-2.446-.815-4.485-1.086-7.067-1.086-10.6 0-16.717 6.523-16.717 17.939 0 11.145 5.845 17.26 16.582 17.26 2.309 0 4.212-.136 7.202-.542z"></path>
      <path d="M113.672 32.321V80.84c0 16.717-1.224 24.735-4.893 31.666-3.398 6.661-7.883 10.873-17.124 15.494l-19.435-9.241c9.242-4.35 13.726-8.153 16.58-14 2.99-5.979 3.943-12.91 3.943-31.122V32.321zM92.742.111h20.93v21.474h-20.93z"></path>
    </svg>
  ),
  Tailwind: (
    <svg width={18} height={18} viewBox="0 0 128 128">
      <path
        d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"
        fill="#38bdf8"
      ></path>
    </svg>
  ),
  React: (
    <svg width={18} height={18} viewBox="0 0 128 128">
      <g fill="#61DAFB">
        <circle cx="64" cy="64" r="11.4"></circle>
        <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"></path>
      </g>
    </svg>
  ),
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("web");

  useEffect(() => {
    defaultAxios.get("projects/").then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <section id="projects" className="flex justify-center px-10 py-11">
      <div className="relative">
        <div className="gallery w-[90vw] min-h-[90vh] bg-white/20 backdrop-blur-xl rounded-4xl shadow-[inset_4px_4px_8px_rgba(255,255,255,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.2)] gradient-outline before:rounded-4xl grid grid-cols-1 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-6 pt-8 pb-16 px-10 ring-6 ring-white/30">
          {projects
            .filter((proj) => proj.platforms.indexOf(currentFilter) != -1)
            .map((proj) => (
              <div className="gallery-card relative p-4 bg-white/30 rounded-lg gradient-outline before:rounded-lg">
                <div className="content bg-white/30 rounded-lg w-full h-full px-4 pt-4 pb-30 flex flex-col md:flex-row lg:flex-col md:items-center lg:items-stretch gap-4 relative gradient-outline before:rounded-lg">
                  <div className="img-group relative group">
                    <img
                      src={proj.image}
                      alt="Thoughty Preview"
                      className="w-full rounded-2xl ring-2 ring-white/40 transition-all duration-700 group-hover:blur md:hidden lg:block"
                    />
                    <div className="prj-category absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 opacity-0 w-0 gap-2 transition-all duration-500 group-hover:opacity-100 group-hover:w-[200px] overflow-hidden">
                      <span className="project-type text-white bg-white/20 rounded-xl p-1 backdrop-blur-2xl shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.28)]">
                        {currentFilter == "web" ? (
                          <svg
                            width="27"
                            height="27"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs>
                              <linearGradient
                                id="white-gradient"
                                x1="0"
                                y1="0"
                                x2="24"
                                y2="24"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" stop-opacity="1" />
                                <stop
                                  offset="1"
                                  stopColor="white"
                                  stop-opacity="0.6"
                                />
                              </linearGradient>
                            </defs>
                            <path
                              d="M19 9C19 12.866 15.866 16 12 16M19 9C19 5.13401 15.866 2 12 2M19 9H5M12 16C8.13401 16 5 12.866 5 9M12 16C13.7509 14.0832 14.7468 11.5956 14.8009 9C14.7468 6.40442 13.7509 3.91685 12 2M12 16C10.2491 14.0832 9.25498 11.5956 9.20091 9C9.25498 6.40442 10.2491 3.91685 12 2M12 16V18M5 9C5 5.13401 8.13401 2 12 2M14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20M14 20C14 18.8954 13.1046 18 12 18M14 20H21M10 20C10 18.8954 10.8954 18 12 18M10 20H3"
                              stroke="url(#white-gradient)"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        ) : currentFilter == "mobile" ? (
                          <svg
                            width="27"
                            height="27"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs>
                              <linearGradient
                                id="white-gradient"
                                x1="0"
                                y1="0"
                                x2="24"
                                y2="24"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" stop-opacity="1" />
                                <stop
                                  offset="1"
                                  stopColor="white"
                                  stop-opacity="0.6"
                                />
                              </linearGradient>
                            </defs>
                            <path
                              d="M15 2V3.4C15 3.96005 15 4.24008 14.891 4.45399C14.7951 4.64215 14.6422 4.79513 14.454 4.89101C14.2401 5 13.9601 5 13.4 5H10.6C10.0399 5 9.75992 5 9.54601 4.89101C9.35785 4.79513 9.20487 4.64215 9.10899 4.45399C9 4.24008 9 3.96005 9 3.4V2M8.2 22H15.8C16.9201 22 17.4802 22 17.908 21.782C18.2843 21.5903 18.5903 21.2843 18.782 20.908C19 20.4802 19 19.9201 19 18.8V5.2C19 4.07989 19 3.51984 18.782 3.09202C18.5903 2.71569 18.2843 2.40973 17.908 2.21799C17.4802 2 16.9201 2 15.8 2H8.2C7.0799 2 6.51984 2 6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202C5 3.51984 5 4.0799 5 5.2V18.8C5 19.9201 5 20.4802 5.21799 20.908C5.40973 21.2843 5.71569 21.5903 6.09202 21.782C6.51984 22 7.07989 22 8.2 22Z"
                              stroke="url(#white-gradient)"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        ) : currentFilter == "cli" ? (
                          <svg
                            width="27"
                            height="27"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 9H2M6 17.5L8.5 15L6 12.5M11 17.5L15 17.5M2 7.8L2 16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27977 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3L6.8 3C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="main-text flex flex-col gap-0 lg:gap-2">
                    <h2 className="text-white font-bold text-2xl">
                      {proj.name}
                    </h2>
                    <p className="text-muted">{proj.description}</p>
                  </div>
                  <hr />
                  <div className="cta flex gap-4 flex-wrap justify-around items-center">
                    <a href={proj.url} target="_blank">
                      <SimpleGlassyBtn className="text-black/70 cursor-pointer">
                        <span className="hidden xl:block">Live Demo</span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 4.98951C5 4.01835 5 3.53277 5.20249 3.2651C5.37889 3.03191 5.64852 2.88761 5.9404 2.87018C6.27544 2.85017 6.67946 3.11953 7.48752 3.65823L18.0031 10.6686C18.6708 11.1137 19.0046 11.3363 19.1209 11.6168C19.2227 11.8621 19.2227 12.1377 19.1209 12.383C19.0046 12.6635 18.6708 12.886 18.0031 13.3312L7.48752 20.3415C6.67946 20.8802 6.27544 21.1496 5.9404 21.1296C5.64852 21.1122 5.37889 20.9679 5.20249 20.7347C5 20.467 5 19.9814 5 19.0103V4.98951Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </SimpleGlassyBtn>
                    </a>
                    {proj.github_url && (
                      <a href={proj.github_url} target="_blank">
                        <SimpleGlassyBtn className="text-black/70 cursor-pointer">
                          <span className="hidden xl:block">Github</span>
                          <img src={GithubIcon} width={18} />
                        </SimpleGlassyBtn>
                      </a>
                    )}
                  </div>
                  <hr />
                  <div className="stack flex-wrap gap-4 md:justify-center lg:justify-normal hidden sm:flex">
                    {proj.stack.map((sk) => (
                      <Label>
                        <h4 className="quicksand-400 text-black relative z-30 flex gap-2 flex-wrap items-center justify-center">
                          <span className="hidden xl:block">{sk.title}</span>
                          {stackIcons[sk.title] != null? stackIcons[sk.title] : <img src={sk.icon} width={18} />}
                        </h4>
                      </Label>
                    ))}
                  </div>
                </div>
                <div className="b-left absolute bottom-0 left-0 flex flex-col gap-4 w-full pr-4 justify-start items-start md:items-center lg:items-start">
                  <div
                    className="3d-glassy-btn relative self-end mr-5 sm:block md:hidden lg:block cursor-pointer"
                    onClick={() => toast("Coming Soon ...")}
                  >
                    <div className="bg-white/30 backdrop-blur-md rounded-xl absolute w-[114%] h-[100%] left-1/2 -translate-x-1/2 translate-y-3 -z-20 shadow-xl"></div>

                    <div className="bg-white/20 backdrop-blur-md border border-white/40 rounded-xl absolute w-[104%] h-[96%] left-1/2 -translate-x-1/2 translate-y-1.5 -z-10 shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]"></div>

                    <div className="bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-xl gradient-outline before:rounded-xl text-[#047e62] font-bold px-5 py-3 rounded-xl text-sm shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]">
                      Read More
                    </div>
                  </div>
                  <div className="more-info px-5 py-2 min-w-50 rounded-bl-lg rounded-tr-4xl md:rounded-bl-none lg:rounded-bl-lg bg-white/30 inset-ring-2 inset-ring-white/20 shadow-[inset_2px_2px_3px_rgba(255,255,255,0.4),inset_-2px_-2px_3px_rgba(255,255,255,0.25)]">
                    <span>
                      {proj.status != null
                        ? `${proj.status.split("-")[0]} • Completed`
                        : "In Progress"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="categories absolute bg-white/20 backdrop-blur-lg rounded-4xl px-6 py-3 bottom-0 -translate-x-1/2 left-1/2 translate-y-1/2 text-white font-semibold gradient-outline before:rounded-4xl shadow-[0_16px_20px_rgba(0,0,0,0.2)] max-w-[90vw]">
          <div className="flex gap-2" style={{ overflowY: "auto" }}>
            <button
              className={`${
                currentFilter == "web" && "bg-white/20"
              } px-6 py-2 rounded-full cursor-pointer`}
              onClick={() => setCurrentFilter("web")}
            >
              Web
            </button>
            <button
              className={`${
                currentFilter == "mobile" && "bg-white/20"
              } px-6 py-2 rounded-full cursor-pointer`}
              onClick={() => setCurrentFilter("mobile")}
            >
              Mobile
            </button>
            <button
              className={`${
                currentFilter == "scripts" && "bg-white/20"
              } px-6 py-2 rounded-full cursor-pointer`}
              onClick={() => setCurrentFilter("scripts")}
            >
              Scripts
            </button>
            <button
              className={`${
                currentFilter == "cli" && "bg-white/20"
              } px-6 py-2 rounded-full cursor-pointer`}
              onClick={() => setCurrentFilter("cli")}
            >
              CLI
            </button>
            <button
              className={`${
                currentFilter == "Software/GUI" && "bg-white/20"
              } px-6 py-2 rounded-full cursor-pointer`}
              onClick={() => setCurrentFilter("Software/GUI")}
            >
              Software/GUI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
