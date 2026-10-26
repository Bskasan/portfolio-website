"use client";

import AnimatedNavLink from "./NavLink";
import ScreenSettings from "./ScreenSettings";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { NavLink } from "@/lib/types/link";

interface MobileNavProps {
  links: NavLink[];
}

// Name of the current screen shown on the MENU button ("MENU / PROJECTS").
function currentLabel(pathname: string, links: NavLink[]) {
  if (pathname.startsWith("/cv")) return "ABOUT / CV";
  const match = links.find((link) =>
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href),
  );
  return (match?.label ?? "HOME").toUpperCase();
}

const MobileNav = ({ links }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
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
    const desktop = window.matchMedia("(width >= 47.5rem)");
    const handleChange = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="frame:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="group crt-navlink border border-phos-faint"
      >
        MENU{" "}
        <span className="text-phos-dim group-hover:text-glass">
          / {currentLabel(pathname, links)}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-x-0 bottom-0 top-0 -z-10 bg-black/50"
            aria-hidden="true"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
        {open && (
          <motion.div
            key="panel"
            id="mobile-menu"
            className="pad absolute inset-x-0 top-full z-50 flex flex-col gap-0.5 border-b border-phos bg-glass pt-2 pb-4 shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <nav aria-label="Main navigation">
              <ul className="flex flex-col gap-0.5">
                {links.map((link, index) => (
                  <li key={link.href}>
                    <AnimatedNavLink
                      href={link.href}
                      shortcut={index + 1}
                      onNavigate={close}
                      classNameAttr="flex w-full px-2 py-1 !text-[28px]"
                    >
                      {link.label}
                    </AnimatedNavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-3 border-t border-phos-faint px-2 pt-3">
              <ScreenSettings variant="menu" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
