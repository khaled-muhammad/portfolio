import React from 'react';

const GlassyButton = ({ text = "Read More" }) => {
  return (
    <div className="relative flex items-center justify-center">
      <button
        className="
          relative px-8 py-4 rounded-full
          bg-white/10 backdrop-blur-xl
          border border-white/30
          shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),inset_-4px_-4px_8px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.3)]
          hover:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),inset_-2px_-2px_4px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,0,0,0.4)]
          text-white font-bold text-xl
          transition-all duration-300 ease-out
          active:scale-95
          cursor-pointer
          overflow-hidden
        "
      >
        <span className="relative z-10">{text}</span>

        {/* Top */}
        <div className="
          absolute top-0 left-0 w-full h-1/2
          bg-gradient-to-b from-white/10 to-transparent
          rounded-full
          opacity-50
          pointer-events-none
        "></div>

        {/* Bottom */}
        <div className="
          absolute bottom-0 left-0 w-full h-1/3
          bg-gradient-to-t from-white/10 to-transparent
          rounded-full
          opacity-20
          pointer-events-none
        "></div>

        {/* Inner Shading lights ... */}
        <div className="
          absolute inset-0 rounded-full
          bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent)]
          pointer-events-none
        "></div>

        {/* some highlighting and eye liner */}
        <div className="
          absolute inset-0 rounded-full
          border border-white/10
          opacity-50
          pointer-events-none
        "></div>
      </button>
    </div>
  );
};

export default GlassyButton;