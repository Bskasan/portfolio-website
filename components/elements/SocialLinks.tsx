import { socialLinks } from "@/constants/socialLinks";
import { SocialLink } from "@/lib/types/socials";

interface SocialLinksProps {
  className?: string;
}

const isExternal = (url: string) => url.startsWith("http");

const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <ul className={`flex flex-wrap gap-x-[18px] gap-y-1 ${className ?? ""}`}>
      {socialLinks.map((link: SocialLink) => (
        <li key={link.name}>
          <a
            href={link.url}
            {...(isExternal(link.url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={`${link.name}: ${link.handle}`}
            className="group inline-flex items-baseline gap-2 py-0.5 no-underline"
          >
            <span className="social-code" aria-hidden="true">
              {link.code}
            </span>
            <span className="group-hover:underline group-hover:underline-offset-4">
              {link.handle}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
