type SimpleGlassyBtnProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  bgOpacity?: number;
  blurStrength?: string;
  rounded?: string;
  paddingX?: string;
  paddingY?: string;
  shadow?: string;
};

export const SimpleGlassyBtn = ({
  children,
  className = "",
  bgOpacity = 70,
  blurStrength = "lg",
  rounded = "xl",
  paddingX = "4",
  paddingY = "2",
  shadow = "shadow-[inset_5px_3px_4px_rgba(255,255,255,0.2)]",
  ...props
}: SimpleGlassyBtnProps) => {
  return (
    <button
      className={`glassy-btn
        rounded-${rounded}
        bg-white/${bgOpacity}
        backdrop-blur-${blurStrength}
        w-fit xl:min-w-32
        text-center
        px-${paddingX} py-${paddingY}
        font-bold gradient-outline
        relative before:rounded-${rounded}
        ${shadow}
        z-10 flex items-center justify-center gap-2
        ${className}`}
      {...props}
    >
      {children}

      <div
        className={`absolute rounded-${rounded} bg-slate-300/50 inset-0 mt-4 -z-10 blur-xs`}
      ></div>
    </button>
  );
};

export default SimpleGlassyBtn;