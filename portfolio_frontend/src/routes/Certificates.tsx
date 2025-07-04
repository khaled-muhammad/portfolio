import ThreeDBackground from "@/components/3DBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import { PGO } from "@/components/ParallaxGallery";
import { defaultAxios } from "@/lib/api";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { randInt } from "three/src/math/MathUtils.js";

const CertificatesRoute = () => {
  const [certificates, setCerts] = useState([]); 
  useEffect(() => {
    defaultAxios.get('certificates/').then((res) => {
      setCerts(res.data.map((cert) => {
        console.log(cert.title);
        console.log(cert.aspect_ratio);
        return {
              src: cert.image,
              alt: cert.title,
              link: `/certificates/${cert.id}`,
              style: PGO[randInt(0,6)],
              id: cert.id,
            };
      }));
    });
  }, []);

    return <section className="relative h-[100vh]">
        <ThreeDBackground
          effect="rain"
          useDefaultTexture={false}
          textureUrl="/media/los.png"
          className="fixed -z-10"
        />

        <Navbar />
        <div className="gall flex gap-[40px] p-5 flex-wrap justify-center">
            {
                certificates.map((cert) => <Link to={`${cert.id}/`} className="w-[calc(33.33333%-40px)] h-fit"><div className="opacity-70 relative rounded-2xl ring-white/50 ring-6 overflow-hidden gradient-outline before:rounded-2xl transition-all duration-500 hover:scale-110 hover:opacity-100 hover:translate-y-10" style={{zIndex: certificates.length - cert.id}}>
                    <img src={cert.src} className="w-full" />
                    <div className="absolute inset-0 shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]"></div>
                </div></Link>)
            }
        </div>
        <Footer />

        <Outlet />
</section>;
}

export default CertificatesRoute