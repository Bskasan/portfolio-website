import BackLink from "@/components/elements/BackLink";
import ScrollReveal from "@/components/elements/ScrollReveal";
import Tag from "@/components/elements/Tag";
import CVEntry from "@/components/pages/CVEntry";
import CVHeader from "@/components/pages/CVHeader";
import CVSection from "@/components/pages/CVSection";
import CVExperienceList from "@/components/pages/CVExperienceList";
import PageWrapper from "@/components/animated/PageWrapper";

import type { Metadata } from "next";
import {
  CV_EDUCATION,
  CV_EXPERIENCE,
  CV_HEADER,
  CV_OTHER,
  CV_SKILL_GROUPS,
  CV_SUMMARY,
} from "@/constants/cv";

export const metadata: Metadata = {
  title: "Bekir Kasan - CV",
  description:
    "CV of Bekir Kasan, full-stack software developer in Espoo, Finland: experience, skills, education and certifications.",
};

const CVPage = () => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-[920px]">
        {/* Back navigation */}
        <div className="mb-[18px]">
          <BackLink href="/about" label="Go back" />
        </div>

        {/* CV sheet */}
        <article aria-labelledby="cv-name">
          <CVHeader header={CV_HEADER} />

          <div className="mt-[34px] flex flex-col gap-[34px]">
            {/* Summary */}
            <ScrollReveal>
              <CVSection id="cv-summary" number="01" title="Summary">
                <div className="flex max-w-[68ch] flex-col gap-3.5">
                  {CV_SUMMARY.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </CVSection>
            </ScrollReveal>

            {/* Experience — each role expands to its highlights */}
            <CVSection
              id="cv-experience"
              number="02"
              title="Experience"
              readout={`${CV_EXPERIENCE.length} ROLES`}
            >
              <CVExperienceList jobs={CV_EXPERIENCE} />
            </CVSection>

            {/* Skills */}
            <ScrollReveal>
              <CVSection id="cv-skills" number="03" title="Skills">
                <dl className="flex flex-col gap-3.5">
                  {CV_SKILL_GROUPS.map((group) => (
                    <div
                      key={group.label}
                      className="grid grid-cols-1 gap-x-4 gap-y-2 frame:grid-cols-[170px_minmax(0,1fr)]"
                    >
                      <dt className="dl-label">{group.label}</dt>
                      <dd>
                        <ul className="flex flex-wrap gap-1.5" aria-label={`${group.label} skills`}>
                          {group.skills.map((skill) => (
                            <li key={skill}>
                              <Tag name={skill} />
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ))}
                </dl>
              </CVSection>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal>
              <CVSection id="cv-education" number="04" title="Education">
                <ul className="flex flex-col gap-4">
                  {CV_EDUCATION.map((education) => (
                    <li key={education.institution.name}>
                      <CVEntry
                        organization={education.institution}
                        subtitle={education.degree}
                        location={education.location}
                        bullets={education.details}
                      />
                    </li>
                  ))}
                </ul>
              </CVSection>
            </ScrollReveal>

            {/* Other */}
            <ScrollReveal>
              <CVSection id="cv-other" number="05" title="Other">
                <dl className="flex flex-col gap-3.5">
                  {CV_OTHER.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-1 gap-x-4 gap-y-1 frame:grid-cols-[170px_minmax(0,1fr)]"
                    >
                      <dt className="dl-label">{item.label}</dt>
                      <dd className="text-sm">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </CVSection>
            </ScrollReveal>
          </div>
        </article>
      </div>
    </PageWrapper>
  );
};

export default CVPage;
