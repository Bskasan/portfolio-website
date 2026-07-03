"use client";

import ThemeToggle from "./ThemeToggle";
import AnimatedNavLink from "./NavLink";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuMenu, LuX } from "react-icons/lu";
import { NAV_LINKS } from "@/constants/navbar";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 640px)");
    const handleChange = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="flex w-full items-center justify-between sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-zinc-700 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-300 dark:hover:bg-surface-2 dark:focus-visible:outline-zinc-100"
      >
        {open ? (
          <LuX className="h-6 w-6" aria-hidden="true" />
        ) : (
          <LuMenu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      <ThemeToggle />

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="absolute inset-x-0 top-full z-40 h-screen bg-black/40"
            aria-hidden="true"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
        {open && (
          <motion.ul
            key="panel"
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-50 flex flex-col gap-1 border-b border-zinc-200 bg-white px-4 py-3 shadow-lg dark:border-line dark:bg-background"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {NAV_LINKS.filter((link) => link.isVisible).map((link) => (
              <li key={link.href}>
                <AnimatedNavLink href={link.href} onNavigate={close} classNameAttr="block w-full">
                  {link.label}
                </AnimatedNavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
