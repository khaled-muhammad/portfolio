import React, { useEffect, useRef } from 'react';
import './WaterText.css';

const WaterText = ({
  text,
  className = '',
  color = 'transparent',
  style = {},
}) => {
  const textRef = useRef(null);
  const turbulenceRef = useRef(null);

  useEffect(() => {
    const h1 = textRef.current;
    for (let i = 0; i < 15; i++) {
      const droplet = document.createElement('div');
      droplet.classList.add('droplet');
      droplet.style.width = `${Math.random() * 8 + 3}px`;
      droplet.style.height = droplet.style.width;
      droplet.style.left = `${Math.random() * 100}%`;
      droplet.style.top = `${Math.random() * 100}%`;
      droplet.style.animationDuration = `${Math.random() * 5 + 5}s`;
      h1.appendChild(droplet);
    }

    let frames = 0;
    const animate = () => {
      frames += 0.02;
      const baseFrequency = 0.01 + Math.abs(Math.sin(frames) * 0.005);
      turbulenceRef.current.setAttribute('baseFrequency', `${baseFrequency} ${baseFrequency + 0.01}`);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className={`water-text-container ${className}`} style={{ position: 'relative', ...style }}>
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
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        {text}
      </h1>
    </div>
  );
};

export default WaterText;
