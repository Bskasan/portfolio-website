import BackLink from "@/components/elements/BackLink";
import DivisionLine from "@/components/elements/DivisionLine";
import ScrollReveal from "@/components/elements/ScrollReveal";
import SkillTag from "@/components/elements/SkillTag";
import CVEntry from "@/components/pages/CVEntry";
import CVHeader from "@/components/pages/CVHeader";
import CVSection from "@/components/pages/CVSection";
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
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="flex flex-1 w-full max-w-3xl flex-col items-start py-12 px-4 sm:px-8">
          {/* Back navigation */}
          <div className="mb-6">
            <BackLink href="/about" label="Go back" />
          </div>

          {/* CV sheet */}
          <article
            aria-labelledby="cv-name"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-8 sm:px-10 sm:py-12 dark:border-line dark:bg-surface"
          >
            <CVHeader header={CV_HEADER} />

            <div className="my-8">
              <DivisionLine />
            </div>

            <div className="flex flex-col gap-10">
              {/* Summary */}
              <ScrollReveal>
                <CVSection id="cv-summary" title="Summary">
                  <div className="flex flex-col gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {CV_SUMMARY.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </CVSection>
              </ScrollReveal>

              {/* Experience — entries reveal one by one (like the About page) so each
                  observed block stays small enough for ScrollReveal's threshold */}
              <CVSection id="cv-experience" title="Experience">
                <ul className="flex flex-col gap-7">
                  {CV_EXPERIENCE.map((job, index) => (
                    <li key={`${job.company.name}-${job.period}`}>
                      <ScrollReveal delay={index * 100}>
                        <CVEntry
                          organization={job.company}
                          subtitle={job.role}
                          location={job.location}
                          period={job.period}
                          bullets={job.highlights}
                        />
                      </ScrollReveal>
                    </li>
                  ))}
                </ul>
              </CVSection>

              {/* Skills — the PDF's comma lists rendered as label + SkillTag pills */}
              <ScrollReveal>
                <CVSection id="cv-skills" title="Skills">
                  <dl className="flex flex-col gap-5">
                    {CV_SKILL_GROUPS.map((group) => (
                      <div
                        key={group.label}
                        className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr] sm:gap-4"
                      >
                        <dt className="text-sm font-bold text-gray-900 sm:pt-1 dark:text-gray-100">
                          {group.label}
                        </dt>
                        <dd>
                          <ul className="flex flex-wrap gap-2" aria-label={`${group.label} skills`}>
                            {group.skills.map((skill) => (
                              <li key={skill}>
                                <SkillTag name={skill} />
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
                <CVSection id="cv-education" title="Education">
                  <ul className="flex flex-col gap-7">
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
                <CVSection id="cv-other" title="Other">
                  <dl className="flex flex-col gap-4">
                    {CV_OTHER.map((item) => (
                      <div
                        key={item.label}
                        className="grid grid-cols-1 gap-1 sm:grid-cols-[160px_1fr] sm:gap-4"
                      >
                        <dt className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {item.label}
                        </dt>
                        <dd className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </CVSection>
              </ScrollReveal>
            </div>
          </article>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CVPage;
