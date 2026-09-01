import TransitionLink from "@/components/elements/TransitionLink";

import { LuArrowLeft } from "react-icons/lu";

interface BackLinkProps {
  href: string;
  label: string;
}

const BackLink = ({ href, label }: BackLinkProps) => {
  return (
    <TransitionLink
      href={href}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:border-line dark:text-slate-200 dark:hover:bg-surface-2 dark:focus-visible:outline-slate-100"
    >
      <LuArrowLeft size={16} aria-hidden="true" />
      {label}
    </TransitionLink>
  );
};

export default BackLink;
