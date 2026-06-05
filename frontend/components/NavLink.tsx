"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => {
  const pathName = usePathname();

  // To syle active link
  const isActive = href === "/" ? pathName === "/" : pathName.startsWith(href);

  return (
    <Link
      href={href}
      className={`
        px-3 py-1.5 rounded-md text-base transition-colors
        ${isActive ? "font-bold" : "hover:bg-zinc-200 text-zinc-700"}
      `}
    >
      {label}
    </Link>
  );
};

export default NavLink;
