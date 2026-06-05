import { SocialLink } from "@/lib/types/socials";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Bskasan",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/bekirskasan/",
    icon: FaLinkedin,
  },
  {
    name: "X",
    url: "https://x.com/BekirKasan1",
    icon: FaSquareXTwitter,
  },
  {
    name: "Email",
    url: "b.kasan@hotmail.com",
    icon: MdEmail,
  },
];
