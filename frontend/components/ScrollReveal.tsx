"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // stagger support in ms e.g. 100, 200
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  );
}
