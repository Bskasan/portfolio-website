import CVLinkText from "@/components/pages/CVLinkText";

import { CVLink } from "@/lib/types/cv";

interface CVEntryProps {
  organization: CVLink;
  subtitle: string;
  location: string;
  period?: string;
  bullets: string[];
}

const CVEntry = ({ organization, subtitle, location, period, bullets }: CVEntryProps) => {
  return (
    <div>
      {/* "Organization – Role – Location" on one wrapping line, like the printed CV */}
      <h3 className="text-sm font-bold leading-snug text-gray-900 sm:text-base dark:text-gray-100">
        <CVLinkText link={organization} className="text-gray-700 dark:text-gray-300" />
        <span aria-hidden="true">{" – "}</span>
        {subtitle}
        <span aria-hidden="true">{" – "}</span>
        <span className="font-normal text-gray-700 dark:text-gray-300">{location}</span>
      </h3>
      {period && (
        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm dark:text-gray-400">{period}</p>
      )}
      {/* list-disc is explicit because Tailwind's preflight strips list styles */}
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
};

export default CVEntry;
