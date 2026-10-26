"use client";

import ScrollReveal from "@/components/elements/ScrollReveal";
import CVLinkText from "@/components/pages/CVLinkText";

import { useState } from "react";
import { CVExperience } from "@/lib/types/cv";

interface CVExperienceListProps {
  jobs: CVExperience[];
}

/* CV experience: each role expands to its highlights; the newest starts open. */
const CVExperienceList = ({ jobs }: CVExperienceListProps) => {
  const [open, setOpen] = useState<boolean[]>(() => jobs.map((_, index) => index === 0));
  const allOpen = open.every(Boolean);

  return (
    <>
      <div className="mb-2 flex justify-end">
        <button type="button" className="cmdlink" onClick={() => setOpen(jobs.map(() => !allOpen))}>
          [ {allOpen ? "COLLAPSE ALL" : "EXPAND ALL"} ]
        </button>
      </div>
      <ul>
        {jobs.map((job, index) => {
          const listId = `cv-job-${index}`;
          return (
            <li key={`${job.company.name}-${job.period}`} className="job">
              <ScrollReveal delay={index * 100}>
                <button
                  type="button"
                  className="job-btn"
                  aria-expanded={open[index]}
                  aria-controls={listId}
                  onClick={() =>
                    setOpen((prev) => prev.map((value, i) => (i === index ? !value : value)))
                  }
                >
                  <span className="font-display text-[28px] leading-none uppercase">
                    {job.company.name}
                  </span>
                  <span className="text-right text-[13px] text-phos-dim tabular-nums max-frame:text-left">
                    {job.period}
                  </span>
                  <span className="text-sm text-phos-dim">
                    {job.role} · {job.location}
                  </span>
                  <span className="job-count text-right font-display text-lg text-phos-dim max-frame:text-left">
                    {job.highlights.length} ITEMS
                  </span>
                </button>
                <ul
                  id={listId}
                  hidden={!open[index]}
                  className="flex max-w-[80ch] flex-col gap-[9px] px-2 pt-1 pb-[18px] text-sm"
                >
                  {job.company.url && (
                    <li className="text-phos-dim">
                      <CVLinkText link={job.company} className="underline" /> ↗
                    </li>
                  )}
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="relative pl-5">
                      <span className="absolute left-1 text-phos-dim" aria-hidden="true">
                        -
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CVExperienceList;
