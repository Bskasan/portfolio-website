"use client";

import { useEffect, useState } from "react";

const formatTime = () =>
  new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/Helsinki",
    hour: "2-digit",
    minute: "2-digit",
  });

/*
  Espoo time (HH:MM), updated every 15 s. Starts as "--:--" and fills in after
  mount, so server and client HTML match. Its own component so the ticking only
  re-renders this span, not the whole command line.
*/
const Clock = () => {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => setTime(formatTime());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 15000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  return <>{time}</>;
};

export default Clock;
