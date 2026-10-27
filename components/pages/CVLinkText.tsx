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
      className={`hover:underline hover:underline-offset-4 ${className ?? ""}`}
    >
      {link.name}
    </a>
  );
};

export default CVLinkText;
