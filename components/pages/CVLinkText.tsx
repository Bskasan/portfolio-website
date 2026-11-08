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
      // Always underlined at rest: these links sit next to plain text of the same
      // colour (e.g. the CV contact line), so colour alone doesn't mark them.
      className={`underline underline-offset-[3px] hover:decoration-2 ${className ?? ""}`}
    >
      {link.name}
    </a>
  );
};

export default CVLinkText;
