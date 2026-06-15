"use client";

import { pageAnimation } from "@/lib/animations/pageAnimation";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  classNameAttr?: string;
}

const AnimatedNavLink = ({ href, children, classNameAttr }: NavLinkProps) => {
  const pathName = usePathname();
  const router = useTransitionRouter();

  // To syle active link
  const isActive = href === "/" ? pathName === "/" : pathName.startsWith(href);

  return (
    <Link
      href={href}
      onClick={(event) => {
        event.preventDefault();

        router.push(href, {
          onTransitionReady: pageAnimation,
        });
      }}
      className={`
        px-3 py-1.5 rounded-md text-base transition-colors
        ${classNameAttr}
        ${isActive ? "font-bold" : "hover:bg-zinc-200 text-zinc-700"}
      `}
    >
      {children}
    </Link>
  );
};

export default AnimatedNavLink;
