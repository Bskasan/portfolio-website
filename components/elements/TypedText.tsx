"use client";

import { useEffect, useState } from "react";

interface TypedTextProps {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
}

/*
  Types `text` out one character at a time, followed by a blinking cursor.
  Screen readers get the full text immediately; reduced-motion visitors see it
  without the typing.
*/
const TypedText = ({ text, speed = 55 }: TypedTextProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setCount(text.length), 0);
      return () => window.clearTimeout(id);
    }
    let shown = 0;
    const id = window.setInterval(() => {
      shown += 1;
      setCount(shown);
      if (shown >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className="cursor" aria-hidden="true" />
    </>
  );
};

export default TypedText;
