import CVLinkText from "@/components/pages/CVLinkText";

import { CVLink } from "@/lib/types/cv";

interface CVEntryProps {
  organization: CVLink;
  subtitle: string;
  location: string;
  period?: string;
  bullets: string[];
}

/* A non-expandable CV entry (used for education). */
const CVEntry = ({ organization, subtitle, location, period, bullets }: CVEntryProps) => {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-0.5">
      <h3 className="text-[26px] leading-[1.05] uppercase">
        <CVLinkText link={organization} />
      </h3>
      <span className="text-[13px] text-phos-dim">{location}</span>
      <p className="col-span-2">{subtitle}</p>
      {period && <p className="col-span-2 text-[13px] text-phos-dim">{period}</p>}
      {bullets.map((bullet) => (
        <p key={bullet} className="col-span-2 text-sm text-phos-dim">
          {bullet}
        </p>
      ))}
    </div>
  );
};

export default CVEntry;
