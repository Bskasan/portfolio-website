import PersonalMetaData from "@/components/pages/PersonalMetaData";
import PageWrapper from "@/components/animated/PageWrapper";
import TransitionLink from "@/components/elements/TransitionLink";
import ExperienceRegister from "@/components/pages/ExperienceRegister";

import { EXPERIENCE } from "@/constants/experience";

const AboutMePage = () => {
  return (
    <PageWrapper>
      <div className="grid grid-cols-1 items-start gap-[clamp(28px,4vw,64px)] cols:grid-cols-[300px_minmax(0,1fr)]">
        <PersonalMetaData isSticky={true} />
        <section className="min-w-0" aria-labelledby="about-title">
          <div className="mb-[18px] flex flex-col gap-1.5">
            <p className="eyebrow">Profile // Summary</p>
            <h2 id="about-title" className="h-page">
              About
            </h2>
          </div>
          {/* Description About Me */}
          <p className="max-w-[68ch] [&_strong]:font-semibold">
            I&apos;m a <strong>Full-Stack Developer</strong> with 3+ years of production experience
            building cloud-native applications, serverless APIs, and data-driven internal platforms
            using TypeScript, React/Next.js, Node.js, and SQL. Hands-on experience deploying and
            monitoring containerised workloads, managing cloud infrastructure, and integrating with
            PostgreSQL and NoSQL databases. Experienced in agile product teams, cross-functional
            collaboration, and taking ownership from implementation through deployment and
            observability. Fast learner with a strong product mindset.
          </p>

          <ExperienceRegister entries={EXPERIENCE} />

          {/* View Full Resume: routes to the /cv page with the site's page transition. */}
          <div className="mt-[26px]">
            <TransitionLink href="/cv" className="cmdlink">
              &gt; VIEW FULL RESUME
            </TransitionLink>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default AboutMePage;
