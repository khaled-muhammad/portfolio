import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WaterText from "@/components/WaterText";
import GlassyButton from "@/components/GooeyBtn";
import Navbar from "@/components/NavBar";

const FourOFour = () => {
  return (
    <>
      <Navbar />
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,600px)] h-[min(90vw,600px)] bg-cyan-500/5 rounded-full blur-[100px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center max-w-lg w-full"
        >
          <div className="mb-4 w-full">
            <WaterText
              text="404"
              className="comfortaa-700 text-center text-7xl sm:text-8xl md:text-9xl leading-none"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="w-full rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[inset_5px_3px_4px_rgba(255,255,255,0.15)] gradient-outline before:rounded-[2rem] px-8 py-10 text-white/90"
          >
            <h2 className="museomoderno-400 text-2xl sm:text-3xl mb-3 text-white">
              Page not found
            </h2>
            <p className="quicksand-400 text-white/70 text-base sm:text-lg mb-8 leading-relaxed">
              This URL doesn&apos;t exist or was moved. Head back home to explore
              projects, skills, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/">
                <GlassyButton text="Go Home" className="text-white" />
              </Link>
              <Link to="/book">
                <GlassyButton
                  text="Book Meeting"
                  className="text-white/80"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default FourOFour;
