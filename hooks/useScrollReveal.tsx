import { useEffect, useRef } from "react";

/*
  Scroll reveal that never hides content it doesn't have to.

  The element renders visible (server HTML, no-JS visitors, crawlers). After
  mount, only an element that starts *below* the screen is put in the
  `reveal-pending` state and revealed when it scrolls into view; anything already
  on screen stays put. Classes are toggled directly, so revealing causes no
  React re-render. Styles: .reveal-pending / .reveal-in in styles/crt.css.
*/
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen

    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("reveal-in");
        el.classList.remove("reveal-pending");
        observer.disconnect(); // animate once only
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref };
}
