import CVLinkText from "@/components/pages/CVLinkText";

import { CVHeader as CVHeaderData } from "@/lib/types/cv";

interface CVHeaderProps {
  header: CVHeaderData;
}

const CVHeader = ({ header }: CVHeaderProps) => {
  return (
    <header className="flex flex-col gap-2.5 border border-phos-faint p-5">
      <p className="eyebrow">Document // CV.TXT</p>
      <h1 id="cv-name" className="text-[clamp(48px,7vw,72px)] uppercase">
        {header.name}
      </h1>
      <p className="font-display text-[26px] leading-[1.1]">
        {header.title}{" "}
        <span className="text-phos-dim">
          {header.stack.map((item) => (
            <span key={item}> · {item}</span>
          ))}
        </span>
      </p>
      <ul className="flex flex-wrap gap-x-[18px] gap-y-1 text-[13px] text-phos-dim">
        {header.contacts.map((contact) => (
          <li key={contact.name}>
            <CVLinkText link={contact} />
          </li>
        ))}
      </ul>
    </header>
  );
};

export default CVHeader;
