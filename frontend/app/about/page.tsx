import SkillTag from "@/components/elements/SkillTag";
import { LuNewspaper } from "react-icons/lu";
import {
  CLARUSWAY,
  ESPOO_GAME_LAB,
  INTEGRIFY_OY,
  NORTHFINA_SKILLS,
  RAIS_GAMES,
} from "@/constants/skills";
import ScrollReveal from "@/components/elements/ScrollReveal";
import {
  CLARUSWAY_LINK,
  ESPOO_GAME_LAB_LINK,
  ETUFILLARI_LINK,
  INTEGRIFY_LINK,
  NORTHFINA_LINK,
  RAIS_GAMES_LINK,
  RESUME_LINK,
} from "@/constants/links";
import PersonalMetaData from "@/components/pages/PersonalMetaData";
import PageWrapper from "@/components/animated/PageWrapper";

interface SkillTag {
  name: string;
}

const AboutMePage = () => {
  return (
    <PageWrapper>
      <div className="flex flex-1 items-center justify-center">
        <main className="flex w-full max-w-400 items-center justify-between py-32 px-16 sm:items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <PersonalMetaData isSticky={true} />
            <section>
              {/* Description About Me */}
              <p className="text-sm sm:text-base text-center sm:text-left">
                I&apos;m <span className="font-bold">Full-Stack Developer</span> with 3+ years of
                production experience building cloud-native applications, serverless APIs, and
                data-driven internal platforms using TypeScript, React/Next.js, Node.js, and SQL.
                Hands-on experience deploying and monitoring containerised workloads, managing cloud
                infrastructure, and integrating with PostgreSQL and NoSQL databases. Experienced in
                agile product teams, cross-functional collaboration, and taking ownership from
                implementation through deployment and observability. Fast learner with a strong
                product mindset.
              </p>
              <div>
                {/* Experience Header*/}
                <h2 className="text-lg sm:text-xl text-center sm:text-left mt-8 mb-4">
                  <span className="font-bold uppercase">Experience</span>
                </h2>
                {/* NorthFina Oy Experience */}
                <ScrollReveal delay={0}>
                  <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 mb-6">
                    <div>
                      {/* Date of experience */}
                      <p className="text-sm sm:text-base text-center sm:text-left">
                        Sep 2024 - Feb 2026
                      </p>
                    </div>
                    <div>
                      {/* Role, company name and experience description */}
                      <p className="text-base sm:text-lg text-center sm:text-left font-semibold mb-2 -pb-2">
                        Full-Stack Developer,{" "}
                        <a
                          href={NORTHFINA_LINK.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-gray-700 hover:underline"
                        >
                          NorthFina Oy
                        </a>{" "}
                        (
                        <a
                          href={ETUFILLARI_LINK.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-gray-700 hover:underline"
                        >
                          Etufillari Oy
                        </a>
                        )
                      </p>
                      <p className="text-sm sm:text-base text-center sm:text-left">
                        Designed and developed full-stack applications using Next.js and TypeScript,
                        with serverless backends powered by Azure Functions. Built scalable internal
                        tools and platforms for internal users to improve their efficiency across
                        teams. Worked closely with cross-functional teams, including developers,
                        designers, and product managers, to implement features with best
                        practises.{" "}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                        {/* Skill Tags*/}
                        {NORTHFINA_SKILLS.map((skill: SkillTag) => (
                          <SkillTag key={skill.name} name={skill.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
                {/* Espoo Game Lab Experience */}
                <ScrollReveal delay={100}>
                  <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 mb-6">
                    <div>
                      {/* Date of experience */}
                      <p className="text-sm sm:text-base text-center sm:text-left">
                        Mar 2023 - Sep 2024{" "}
                      </p>
                    </div>
                    <div>
                      {/* Role, company name and experience description */}
                      <p className="text-base sm:text-lg text-center sm:text-left font-semibold mb-2 -pb-2">
                        Software Developer(Game programming),{" "}
                        <a
                          href={ESPOO_GAME_LAB_LINK.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-gray-700 hover:underline"
                        >
                          Espoo Game LAB
                        </a>{" "}
                      </p>
                      <p className="text-sm sm:text-base text-center sm:text-left">
                        As an Espoo Game LAB program participant, my primary responsibility is game
                        programming. I used Unity and C# to bring our projects to life.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                        {/* Skill Tags*/}
                        {ESPOO_GAME_LAB.map((skill: SkillTag) => (
                          <SkillTag key={skill.name} name={skill.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
                {/* Integrify Experience*/}
                <ScrollReveal delay={200}>
                  <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 mb-6">
                    <div>
                      {/* Date of experience */}
                      <p className="text-sm sm:text-base text-center sm:text-left">
                        Mar 2023 - Sep 2024{" "}
                      </p>
                    </div>
                    <div>
                      {/* Role, company name and experience description */}
                      <p className="text-base sm:text-lg text-center sm:text-left font-semibold mb-2 -pb-2">
                        Full-stack Developer Trainee,{" "}
                        <a
                          href={INTEGRIFY_LINK.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-gray-700 hover:underline"
                        >
                          Integrify Oy
                        </a>{" "}
                        (Remote){" "}
                      </p>
                      <p className="text-sm sm:text-base text-center sm:text-left">
                        Joined and was accepted into Integrify Oy&apos;s comprehensive full stack
                        training program, where I&apos;ll be honing my skills in frontend, backend,
                        DevOps, and Cloud technologies.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                        {/* Skill Tags*/}
                        {INTEGRIFY_OY.map((skill: SkillTag) => (
                          <SkillTag key={skill.name} name={skill.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
                ``
                {/* Clarusway Experience*/}
                <ScrollReveal delay={300}>
                  <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 mb-6">
                    <div>
                      {/* Date of experience */}
                      <p className="text-sm sm:text-base text-center sm:text-left">
                        Mar 2023 - Sep 2024{" "}
                      </p>
                    </div>
                    <div>
                      {/* Role, company name and experience description */}
                      <p className="text-base sm:text-lg text-center sm:text-left font-semibold mb-2 -pb-2">
                        Full-stack Developer Trainee,{" "}
                        <a
                          href={CLARUSWAY_LINK.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-gray-700 hover:underline"
                        >
                          Clarusway
                        </a>{" "}
                        (Remote){" "}
                      </p>
                      <p className="text-sm sm:text-base text-center sm:text-left">
                        Collaborated within a team to successfully design and develop 15+ web
                        projects, ranging from small-scale applications to complex systems. Notably,
                        contributed to two significant projects: Stock app and Fireblog app.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                        {/* Skill Tags*/}
                        {CLARUSWAY.map((skill: SkillTag) => (
                          <SkillTag key={skill.name} name={skill.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
                {/* Rais Games Experience*/}
                <ScrollReveal delay={400}>
                  <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 mb-6">
                    <div>
                      {/* Date of experience */}
                      <p className="text-sm sm:text-base text-center sm:text-left">
                        Mar 2021 - Feb 2022
                      </p>
                    </div>
                    <div>
                      {/* Role, company name and experience description */}
                      <p className="text-base sm:text-lg text-center sm:text-left font-semibold mb-2 -pb-2">
                        Junior Game Developer,{" "}
                        <a
                          href={RAIS_GAMES_LINK.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-gray-700 hover:underline"
                        >
                          Rais Games Ltd.
                        </a>{" "}
                        (Remote){" "}
                      </p>
                      <p className="text-sm sm:text-base text-center sm:text-left">
                        Designed and developed 10+ games with many prototypes for IOS and Android
                        platforms. Collaborated with game designers and artists.{" "}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                        {/* Skill Tags*/}
                        {RAIS_GAMES.map((skill: SkillTag) => (
                          <SkillTag key={skill.name} name={skill.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
              {/* View Full Resume Button to open my resume on another tab.*/}
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-8">
                <LuNewspaper className="inline-block mr-2 text-gray-600" size={18} />
                <p className="text-sm sm:text-base text-center sm:text-left">
                  <a
                    href={RESUME_LINK.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:underline font-bold"
                  >
                    View Full Resume
                  </a>
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default AboutMePage;
