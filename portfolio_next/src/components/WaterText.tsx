"use client";

import React, { useEffect, useRef } from "react";
import "./WaterText.css";

interface WaterTextProps {
  text: string;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

const WaterText: React.FC<WaterTextProps> = ({
  text,
  className = "",
  color = "transparent",
  style = {},
}) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const h1 = textRef.current;
    if (!h1) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      h1.classList.add("water-text--reduced");
      return () => h1.classList.remove("water-text--reduced");
    }

    for (let i = 0; i < 15; i++) {
      const droplet = document.createElement("div");
      droplet.classList.add("droplet");
      droplet.style.width = `${Math.random() * 8 + 3}px`;
      droplet.style.height = droplet.style.width;
      droplet.style.left = `${Math.random() * 100}%`;
      droplet.style.top = `${Math.random() * 100}%`;
      droplet.style.animationDuration = `${Math.random() * 5 + 5}s`;
      h1.appendChild(droplet);
    }

    let frames = 0;
    let animationFrameId = 0;
    let settleTimeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const animate = () => {
      if (cancelled) return;
      frames += 0.05;
      const baseFrequency = 0.01 + Math.abs(Math.sin(frames) * 0.005);
      if (turbulenceRef.current) {
        turbulenceRef.current.setAttribute(
          "baseFrequency",
          `${baseFrequency} ${baseFrequency + 0.01}`
        );
      }
      settleTimeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
      }, 33);
    };
    animate();

    return () => {
      cancelled = true;
      clearTimeout(settleTimeoutId);
      cancelAnimationFrame(animationFrameId);
      h1.querySelectorAll(".droplet").forEach((d) => d.remove());
    };
  }, []);

  return (
    <div
      className={`water-text-container ${className}`}
      style={{ position: "relative", ...style }}
    >
      <svg width="0" height="0">
        <filter id="wavy">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <h1
        ref={textRef}
        className="water-text"
        style={{
          color,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          fontSize: "inherit",
          fontFamily: "inherit",
          lineHeight: "inherit",
          textAlign: "inherit",
        }}
      >
        {text}
      </h1>
    </div>
  );
};

export default WaterText;
