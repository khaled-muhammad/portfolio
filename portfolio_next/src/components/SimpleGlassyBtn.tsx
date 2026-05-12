"use client";

import React from "react";

type SimpleGlassyBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  bgOpacity?: number;
  blurStrength?: string;
  rounded?: string;
  paddingX?: string;
  paddingY?: string;
};

export const SimpleGlassyBtn = ({
  children,
  className = "",
  type = "button",
  ...props
}: SimpleGlassyBtnProps) => {
  return (
    <button
      type={type}
      className={`
        glassy-btn rounded-xl
        bg-white/70 backdrop-blur-lg
        w-fit xl:min-w-32
        text-center
        px-4 py-2
        font-bold gradient-outline
        relative before:rounded-xl
        shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]
        z-10 flex items-center justify-center gap-2
        outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-transparent
        motion-reduce:transition-none
        ${className}
      `}
      {...props}
    >
      {children}
      <div className="absolute rounded-xl bg-slate-300/50 inset-0 mt-4 -z-10 blur-xs" />
    </button>
  );
};

export default SimpleGlassyBtn;
