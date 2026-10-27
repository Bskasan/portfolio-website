import { ReactNode } from "react";

interface CVSectionProps {
  id: string;
  /** Section number shown before the title, e.g. "02". */
  number: string;
  title: string;
  /** Optional right-aligned readout, e.g. "5 ROLES". */
  readout?: string;
  children: ReactNode;
}

const CVSection = ({ id, number, title, readout, children }: CVSectionProps) => {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="headbar hbar mb-3.5">
        <span>
          {number} {title}
        </span>
        {readout && <span>{readout}</span>}
      </h2>
      {children}
    </section>
  );
};

export default CVSection;
