import React, { useState, useEffect, useRef } from "react";


import "../styles/InfiniteItemsScroll.css";

interface ItemsScrollProps {
  items: {
    title: string;
    icon: React.ReactNode;
  }[];
}

const InfiniteItemsScroll = ({ items }: ItemsScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mPos, setMPos] = useState({ x: 0, y: 0 });
  const iRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rCount = 3;
  const skillsPerRow = Math.ceil(items.length / rCount);
  
  const rows = Array.from({ length: rCount }, (_, rowIndex) => {
    const s = rowIndex * skillsPerRow;
    const e = Math.min(s + skillsPerRow, items.length);
    return items.slice(s, e);
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    iRefs.current.forEach((e) => {
      if (!e) return;

      const rect = e.getBoundingClientRect();
      const X = rect.left + rect.width / 2;
      const Y = rect.top + rect.height / 2;

      const dX = mPos.x - X;
      const dY = mPos.y - Y;
      const dis = Math.sqrt(dX * dX + dY * dY);

      const maxDis = 200;
      const strength = 60;

      if (dis < maxDis) {
        const force = (1 - dis / maxDis) * strength;
        
        const directionX = -dX / dis;
        const directionY = -dY / dis;
        
        e.style.transform = `translate(${directionX * force}px, ${directionY * force}px)`;
      } else {
        e.style.transform = 'translate(0, 0)';
      }
    });
  }, [mPos]);

  useEffect(() => {
    iRefs.current = iRefs.current.slice(0, items.length * 2 * rCount);
  }, [items, rCount]);

  return (
    <div className="scroll-items-container" ref={ref}>
      {rows.map((rowSkills, rowIndex) => (
        <div 
          key={`row-${rowIndex}`}
          className={`scroll-items-track ${rowIndex % 2 === 1 ? 'reverse' : ''}`}
          style={{ 
            animationDuration: `${30 + rowIndex * 5}s`
          }}
        >
          {rowSkills.map((skill, index) => (
            <div 
              key={`skill-${rowIndex}-1-${index}`}
              ref={(el) => { 
                const refIndex = rowIndex * skillsPerRow * 2 + index;
                iRefs.current[refIndex] = el; 
              }}
              className="iI-Item glassy-skill"
              title={skill.title}
            >
              {skill.icon}
              <span className="item-title">{skill.title}</span>
            </div>
          ))}
          
          {rowSkills.map((skill, index) => (
            <div 
              key={`skill-${rowIndex}-2-${index}`}
              ref={(el) => { 
                const refIndex = rowIndex * skillsPerRow * 2 + skillsPerRow + index;
                iRefs.current[refIndex] = el; 
              }}
              className="iI-Item glassy-skill"
              title={skill.title}
            >
              {skill.icon}
              <span className="item-title">{skill.title}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InfiniteItemsScroll;