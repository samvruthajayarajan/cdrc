'use client';
import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeIn' | 'scaleUp' | 'stagger' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'rotateIn';
  delay?: number; // ms
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimateOnScroll({ children, animation = 'fadeUp', delay = 0, className = '', style = {} }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.filter = 'none';
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const initial: React.CSSProperties = {
    opacity: 0,
    transition: `opacity 0.65s ease, transform 0.65s ease, filter 0.65s ease`,
    ...(animation === 'fadeUp'      && { transform: 'translateY(40px)' }),
    ...(animation === 'fadeDown'    && { transform: 'translateY(-40px)' }),
    ...(animation === 'fadeLeft'    && { transform: 'translateX(-40px)' }),
    ...(animation === 'fadeRight'   && { transform: 'translateX(40px)' }),
    ...(animation === 'slideLeft'   && { transform: 'translateX(60px)' }),
    ...(animation === 'slideRight'  && { transform: 'translateX(-60px)' }),
    ...(animation === 'scaleUp'     && { transform: 'scale(0.88)' }),
    ...(animation === 'zoomIn'      && { transform: 'scale(0.7)' }),
    ...(animation === 'rotateIn'    && { transform: 'rotate(-5deg) scale(0.9)' }),
    ...(animation === 'fadeIn'      && { filter: 'blur(4px)' }),
    ...(animation === 'stagger'     && { transform: 'translateY(30px)' }),
  };

  return (
    <div ref={ref} className={className} style={{ ...initial, ...style }}>
      {children}
    </div>
  );
}
