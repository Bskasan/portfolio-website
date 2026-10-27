import AnimatedNavLink from "./NavLink";
import MobileNav from "./MobileNav";
import ScreenSettings from "./ScreenSettings";
import TopbarHeight from "@/components/crt/TopbarHeight";
import { NAV_LINKS } from "@/constants/navbar";
import { LOCATION_CODE, PROFILE } from "@/constants/profile";

/*
  Top of the screen: a system line (name + screen settings) and the terminal menu.
  Phones get the MENU button instead; its dropdown holds the links and the
  screen settings.
*/
const NavBar = () => {
  const links = NAV_LINKS.filter((link) => link.isVisible);

  return (
    <header className="crt-topbar">
      <div className="pad crt-sysline relative">
        <span>
          RONIN/OS 2.6{" "}
          <span className="text-phos-dim max-host:hidden">
            · {PROFILE.site.toUpperCase()} · NODE {LOCATION_CODE}
          </span>
        </span>

        <div className="max-frame:hidden">
          <ScreenSettings />
        </div>

        <MobileNav links={links} />
      </div>

      <nav className="pad crt-navline max-frame:hidden" aria-label="Main navigation">
        {links.map((link, index) => (
          <AnimatedNavLink key={link.href} href={link.href} shortcut={index + 1}>
            {link.label}
          </AnimatedNavLink>
        ))}
      </nav>

      <div className="crt-rule" />
      <TopbarHeight />
    </header>
  );
};

export default NavBar;
