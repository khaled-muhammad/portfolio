import { HashLink } from 'react-router-hash-link';
import WaterText from "./WaterText";
import GlassyButton from "./GooeyBtn";
import { Logo } from "./NavBar";
import { useEffect, useState } from "react";
import { defaultAxios } from "@/lib/api";
import { icons } from "@/icons";

const Footer = () => {
  const [personalContactInfo, setPersonalContactInfo] = useState([]);

  useEffect(() => {
    defaultAxios.get("info/").then((res) => {
      setPersonalContactInfo(res.data);
    });
  }, []);

  return (
    <footer className="pt-[5rem] pb-[2rem] px-10 relative flex flex-col gradient-outline gap-10 text-white quicksand-400 font-bold">
      <div className="absolute inset-0 backdrop-sepia-100 backdrop-blur-md -z-10">
        <WaterText text={undefined} />
      </div>
      <Logo width={100} className="self-center" />
      <h2 className="text-center text-5xl">Book Meeting today</h2>
      <p className="text-center font-medium text-white/60">
        We can discuss projects, make deals, collab together and more!
      </p>
      <HashLink to="/book" className="flex justify-center">
        <GlassyButton
          className="text-white/50 self-center"
          text="Book Meeting"
        />
      </HashLink>
      <div className="links flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between px-4">
        <div className="contact-links">
          <h2 className="text-2xl mb-5">Contact</h2>
          <ul className="flex flex-col items-start gap-3">
            {personalContactInfo.map((i) => <li>
              <a href={i.title == 'email'? `mailto:${i.info}`: null} className="flex justify-center items-center gap-2">
                <div className="bubble min-w-10">
                  {icons[i.title]}
                </div>
                {i.info}
              </a>
            </li>)}
          </ul>
        </div>
        <div className="navigate-links">
          <h2 className="text-2xl mb-5">Navigate</h2>
          <ul>
            <li>
              <HashLink to="/">Home</HashLink>
            </li>
            <li>
              <HashLink to="/book">Book</HashLink>
            </li>
          </ul>
        </div>
      </div>
      <WaterText
        text="All copyrights reserved © 2025"
        className="text-center comfortaa-700"
        color="rgba(255,255,255,0.6)"
      />
    </footer>
  );
};

export default Footer;
