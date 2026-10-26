/*
  Page transition: a short CRT "vertical hold" wobble as the new screen comes in.
  The monitor frame, menu and command line have their own view-transition names,
  so only the page content animates.

  Skipped when the visitor prefers reduced motion or has screen effects off; the
  browser's plain cross-fade (disabled entirely under reduced motion in
  styles/globals.css) is used instead.
*/
export const pageAnimation = () => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || root.dataset.fx === "off") return;

  root.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 120,
    easing: "linear",
    fill: "forwards",
    pseudoElement: "::view-transition-old(root)",
  });

  root.animate(
    [
      { opacity: 0.2, transform: "translateY(6px)", filter: "brightness(1.8)" },
      { opacity: 0.7, transform: "translateY(-3px)", filter: "brightness(1.2)" },
      { opacity: 1, transform: "translateY(0)", filter: "brightness(1)" },
    ],
    {
      duration: 300,
      easing: "steps(4)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );
};
