import { useEffect, useRef } from 'react';
import { gsap } from '../lib/scrolls';

type AnimatedSectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  animation?: boolean;
};

const AnimatedSection = ({
  children,
  className = '',
  animation = true,
  ...props
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;

    if (animation && el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
            scroller: 'html',
          },
        }
      );
    }
  }, [animation]);

  return (
    <section
      ref={sectionRef}
      {...props}
      className={`${className}`}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;