import TransitionLink from "@/components/elements/TransitionLink";

interface BackLinkProps {
  href: string;
  label: string;
}

const BackLink = ({ href, label }: BackLinkProps) => {
  return (
    <TransitionLink href={href} className="cmdlink uppercase">
      <span aria-hidden="true">&lt;</span>
      {label}
    </TransitionLink>
  );
};

export default BackLink;
