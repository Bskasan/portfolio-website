import { socialLinks } from "@/constants/socialLinks";
import { SocialLink } from "@/lib/types/socials";

const SocialLinks = () => {
  return (
    <div className="flex items-center mx-auto justify-center max-w-3xl mt-8 sm:mt-16 w-full px-4">
      <section className="w-full">
        <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {socialLinks.map((link: SocialLink) => {
            const Icon = link.icon;
            return (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  {link.name}
                  <Icon size={24} />
                  {link.name !== "Email" && <span>-</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default SocialLinks;
