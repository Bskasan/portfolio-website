"use client";

import { useEffect, useRef } from "react";

/*
  Publishes the sticky top bar's real height as `--topbar-h` on <html>, so layout
  that must clear the bar (the About ID card's sticky offset, the scroll padding
  that keeps keyboard focus visible) never relies on a hard-coded number. The bar
  can change height when fonts load or the menu wraps; ResizeObserver tracks it.
  styles/crt.css holds the pre-hydration fallback values.
*/
const TopbarHeight = () => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = ref.current?.closest<HTMLElement>(".crt-topbar");
    if (!bar) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty("--topbar-h", `${bar.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} hidden />;
};

export default TopbarHeight;
