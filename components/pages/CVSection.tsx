import { ReactNode } from "react";

interface CVSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

const CVSection = ({ id, title, children }: CVSectionProps) => {
  return (
    <section aria-labelledby={id}>
      {/* Centered uppercase title with a thin rule, mirroring the printed CV */}
      <h2
        id={id}
        className="text-center text-base font-bold uppercase tracking-widest text-gray-900 sm:text-lg dark:text-gray-100"
      >
        {title}
      </h2>
      <div aria-hidden="true" className="mt-2 mb-5 border-t border-zinc-300 dark:border-line" />
      {children}
    </section>
  );
};

export default CVSection;
