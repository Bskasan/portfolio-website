import CVLinkText from "@/components/pages/CVLinkText";

import { CVHeader as CVHeaderData } from "@/lib/types/cv";

interface CVHeaderProps {
  header: CVHeaderData;
}

const CVHeader = ({ header }: CVHeaderProps) => {
  return (
    <header className="text-center">
      {/* Name — uppercase via CSS, like the printed CV */}
      <h1
        id="cv-name"
        className="text-2xl font-bold uppercase tracking-wide text-gray-900 sm:text-3xl dark:text-gray-100"
      >
        {header.name}
      </h1>
      {/* Title + focus keywords: two stacked lines on phones, one line from sm up */}
      <p className="mt-2 text-sm text-gray-700 sm:text-base dark:text-gray-300">
        <span className="block sm:inline">{header.title}</span>
        <span aria-hidden="true" className="hidden sm:inline">
          {" | "}
        </span>
        <span className="block sm:inline">{header.stack.join(" • ")}</span>
      </p>
      {/* Contact line */}
      <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
        {header.contacts.map((contact, index) => (
          <li key={contact.name} className="flex items-center gap-x-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-gray-400 dark:text-gray-500">
                |
              </span>
            )}
            <CVLinkText link={contact} />
          </li>
        ))}
      </ul>
    </header>
  );
};

export default CVHeader;
