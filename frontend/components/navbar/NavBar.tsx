import AnimatedNavLink from "./NavLink";
import { NAV_LINKS } from "@/constants/navbar";

const NavBar = () => {
  return (
    <header className="w-full bg-white backdrop-blur-sm" style={{ viewTransitionName: "navbar" }}>
      <nav
        className="mx-auto flex min-h-20 max-w-4xl items-center justify-between px-4 py-3 sm:h-28 sm:py-0"
        aria-label="Main navigation"
      >
        <div className="flex flex-wrap items-center justify-center mx-auto gap-x-2 gap-y-1 sm:gap-x-4">
          {NAV_LINKS.filter((link) => link.isVisible).map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
