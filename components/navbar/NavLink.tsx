"use client";

import Link from "next/link";

import { pageAnimation } from "@/lib/animations/pageAnimation";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  /** Keyboard shortcut shown before the label (1–6). */
  shortcut?: number;
  classNameAttr?: string;
  onNavigate?: () => void;
}

const AnimatedNavLink = ({ href, children, shortcut, classNameAttr, onNavigate }: NavLinkProps) => {
  const pathName = usePathname();
  const router = useTransitionRouter();

  // The CV is reached from About, so About stays highlighted there.
  const isActive =
    href === "/"
      ? pathName === "/"
      : pathName.startsWith(href) || (href === "/about" && pathName.startsWith("/cv"));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={(event) => {
        // Modified clicks (new tab / window) keep the browser's native behaviour.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        onNavigate?.();

        router.push(href, {
          onTransitionReady: pageAnimation,
        });
      }}
      className={`crt-navlink ${classNameAttr ?? ""}`}
    >
      {shortcut !== undefined && (
        <span className="crt-key" aria-hidden="true">
          {shortcut}
        </span>
      )}
      {children}
    </Link>
  );
};

export default AnimatedNavLink;
