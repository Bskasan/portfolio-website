import { CVLink } from "@/lib/types/cv";

interface CVLinkTextProps {
  link: CVLink;
  className?: string;
}

const CVLinkText = ({ link, className }: CVLinkTextProps) => {
  if (!link.url) {
    return <span className={className}>{link.name}</span>;
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100 ${className ?? ""}`}
    >
      {link.name}
    </a>
  );
};

export default CVLinkText;
