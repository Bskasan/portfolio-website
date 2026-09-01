"use client";
// Client component: internal links rendered from Server Components need the
// next-view-transitions router (a context hook) to play the same page animation
// as the navbar (see components/navbar/NavLink.tsx).

import Link from "next/link";

import { pageAnimation } from "@/lib/animations/pageAnimation";
import { useTransitionRouter } from "next-view-transitions";
import { MouseEvent, ReactNode } from "react";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const TransitionLink = ({ href, children, className }: TransitionLinkProps) => {
  const router = useTransitionRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Modified clicks (new tab / window) keep the browser's native behaviour.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    router.push(href, {
      onTransitionReady: pageAnimation,
    });
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

export default TransitionLink;
