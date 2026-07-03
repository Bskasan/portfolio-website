"use client";

import Link from "next/link";

import { pageAnimation } from "@/lib/animations/pageAnimation";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  classNameAttr?: string;
  // Fired right before navigation — lets the mobile menu close itself on select.
  onNavigate?: () => void;
}

const AnimatedNavLink = ({ href, children, classNameAttr, onNavigate }: NavLinkProps) => {
  const pathName = usePathname();
  const router = useTransitionRouter();

  // To syle active link
  const isActive = href === "/" ? pathName === "/" : pathName.startsWith(href);

  return (
    <Link
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onNavigate?.();

        router.push(href, {
          onTransitionReady: pageAnimation,
        });
      }}
      className={`
        px-2 py-1.5 rounded-md text-sm transition-colors sm:px-3 sm:text-base
        ${classNameAttr}
        ${isActive ? "font-bold" : "text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-surface-2"}
      `}
    >
      {children}
    </Link>
  );
};

export default AnimatedNavLink;
