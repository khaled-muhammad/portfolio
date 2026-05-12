"use client";

import { Children, cloneElement, isValidElement, useId } from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";

function scaleChildForGlassy(child: ReactNode): ReactNode {
  if (!isValidElement(child)) return child;
  const el = child as ReactElement<{
    width?: string | number;
    height?: string | number;
    preserveAspectRatio?: string;
    style?: CSSProperties;
  }>;
  if (typeof el.type === "string" && el.type === "svg") {
    return cloneElement(el, {
      width: "100%",
      height: "100%",
      preserveAspectRatio: "xMidYMid meet",
      style: { display: "block", maxWidth: "100%", maxHeight: "100%", ...el.props.style },
    });
  }
  return child;
}

export default function GlassySVG({
  viewBox = "0 0 128 128",
  width = 100,
  height = 100,
  children,
}: {
  viewBox?: string;
  width?: number;
  height?: number;
  children: ReactNode;
}) {
  const raw = useId().replace(/:/g, "");
  const id = `gs-${raw}`;

  return (
    <svg viewBox={viewBox} width={width} height={height} className="block max-h-full max-w-full">
      <defs>
        <filter id={`glass-blur-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id={`glass-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <g
        filter={`url(#glass-blur-${id})`}
        fill={`url(#glass-gradient-${id})`}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1"
      >
        {Children.map(children, scaleChildForGlassy)}
      </g>
    </svg>
  );
}
