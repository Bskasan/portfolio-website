"use client";

import ScrollReveal from "@/components/elements/ScrollReveal";
import Tag from "@/components/elements/Tag";
import CVLinkText from "@/components/pages/CVLinkText";

import { Fragment, useState } from "react";
import { ExperienceEntry } from "@/lib/types/experience";

interface ExperienceRegisterProps {
  entries: ExperienceEntry[];
}

/* The About page's experience as an expandable "register" table. */
const ExperienceRegister = ({ entries }: ExperienceRegisterProps) => {
  // The newest entry starts open.
  const [open, setOpen] = useState<Set<string>>(() => new Set(entries[0] ? [entries[0].id] : []));

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="mt-9">
      <h2 className="headbar hbar">
        <span>Register control // Experience</span>
        <span>{entries.length} entries</span>
      </h2>
      <div className="reg-cols" aria-hidden="true">
        <span>REG</span>
        <span>PERIOD</span>
        <span>ROLE</span>
        <span>ORGANISATION</span>
        <span />
      </div>
      <ul>
        {entries.map((entry, index) => {
          const isOpen = open.has(entry.id);
          const detailId = `experience-${entry.id}`;
          const orgNames = entry.organizations.map((org) => org.name);
          const orgLabel =
            orgNames.length > 1 ? `${orgNames[0]} (${orgNames.slice(1).join(", ")})` : orgNames[0];

          return (
            <li key={entry.id} className="reg-row">
              <ScrollReveal delay={index * 100}>
                <button
                  type="button"
                  className="reg-btn"
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  onClick={() => toggle(entry.id)}
                >
                  <span className="reg-id">{entry.id}</span>
                  <span className="reg-period">{entry.period}</span>
                  <span className="reg-role">{entry.role}</span>
                  <span className="reg-org">
                    {orgLabel} · {entry.where}
                  </span>
                  <span className="reg-chev" aria-hidden="true">
                    ›
                  </span>
                </button>
                <div id={detailId} className="reg-detail" hidden={!isOpen}>
                  <p className="text-meta text-phos-dim">
                    ORG:{" "}
                    {entry.organizations.map((org, orgIndex) => (
                      <Fragment key={org.name}>
                        {orgIndex === 1 && " ("}
                        {orgIndex > 1 && ", "}
                        <CVLinkText link={org} />
                        {orgIndex === entry.organizations.length - 1 && orgIndex > 0 && ")"}
                      </Fragment>
                    ))}
                  </p>
                  <p>{entry.description}</p>
                  <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
                    {entry.skills.map((skill) => (
                      <li key={skill.name}>
                        <Tag name={skill.name} />
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExperienceRegister;
