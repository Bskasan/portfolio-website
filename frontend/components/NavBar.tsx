import { NAV_LINKS } from "@/constants/navbar";
import NavLink from "./NavLink";

const NavBar = () => {
  return (
    <header className="w-full bg-white backdrop-blur-sm" style={{ viewTransitionName: "navbar" }}>
      <nav
        className="mx-auto flex h-28 max-w-4xl items-center justify-between px-4"
        aria-label="Main navigation"
      >
        <div className="flex items-center mx-auto space-x-4">
          {NAV_LINKS.filter((link) => link.isVisible).map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
