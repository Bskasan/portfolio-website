import AnimatedNavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";
import { NAV_LINKS } from "@/constants/navbar";

const NavBar = () => {
  return (
    // relative + z-50 so the mobile dropdown overlays the page content below.
    <header
      className="relative z-50 w-full bg-white backdrop-blur-sm dark:bg-background"
      style={{ viewTransitionName: "navbar" }}
    >
      <nav
        className="relative mx-auto flex min-h-20 max-w-4xl items-center justify-between px-4 py-3 sm:h-28 sm:py-0"
        aria-label="Main navigation"
      >
        {/* Desktop / tablet: inline centered links (hidden on phones). */}
        <div className="mx-auto hidden flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:flex sm:gap-x-4">
          {NAV_LINKS.filter((link) => link.isVisible).map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </div>

        {/* Desktop / tablet theme toggle: absolutely positioned so the centered links stay put. */}
        <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 sm:right-4 sm:block">
          <ThemeToggle />
        </div>

        {/* Phones: hamburger + toggle bar with a dropdown menu (hidden at sm+). */}
        <MobileNav />
      </nav>
    </header>
  );
};

export default NavBar;
