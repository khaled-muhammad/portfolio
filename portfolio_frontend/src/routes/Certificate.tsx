import ThreeDBackground from "@/components/3DBackground";
import { PGO } from "@/components/ParallaxGallery";
import { defaultAxios } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { randInt } from "three/src/math/MathUtils.js";

const CertificateRoute = () => {
  const { id } = useParams();
  const [cert, setCert] = useState(null)

  const ref      = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentOvState = `${document.querySelector('#root').style.overflow}` || "";

    document.querySelector('#root').style.overflow = 'hidden';

    defaultAxios.get(`certificates/${id}/`).then((res) => {
      setCert(res.data);
    });

    return () => {
      document.querySelector('#root').style.overflow = currentOvState;
    };
  }, []);

  useEffect(() => {
    const handleBack = (e) => {
        if (ref.current && ref.current == e.target) {
            navigate(-1);
        }
    }

    document.addEventListener("mousedown", handleBack);
    return () => {
      document.removeEventListener("mousedown", handleBack);
    };
  }, [navigate])

    return <div className="fixed z-[99999] inset-0 overflow-hidden bg-black/40 backdrop-blur-sm transition-all museomoderno-400 text-white">{cert != null &&
    <section className="relative overflow-hidden h-[100vh] flex flex-col items-stretch" ref={ref}>
        <img src={cert.image} alt={cert.title} className="h-[50%] my-6 self-center" />
        <p className="font-bold text-3xl text-center">{cert.title}</p>
        <div className=" p-4 bg-white/50 rounded-2xl m-4 min-h-50">
        <h2 className="font-semibold text-2xl">The story behind that certificate:</h2>
        {cert.description}
        </div>
    </section>}</div>;
}

export default CertificateRoute