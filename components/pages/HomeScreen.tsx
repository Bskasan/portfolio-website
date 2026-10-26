import SocialLinks from "../elements/SocialLinks";
import TransitionLink from "../elements/TransitionLink";
import TypedText from "../elements/TypedText";

import { PROJECTS } from "@/constants/projects";
import { COURSE_GAMES, MY_GAMES } from "@/constants/games";
import { COPYRIGHT_YEARS, LOCATION_CODE, PROFILE } from "@/constants/profile";

interface HomeScreenProps {
  postCount: number;
}

const pad2 = (value: number) => String(value).padStart(2, "0");

const HomeScreen = ({ postCount }: HomeScreenProps) => {
  const stats = [
    { label: "Experience", value: PROFILE.experience },
    { label: "Projects", value: pad2(PROJECTS.length) },
    { label: "Games", value: pad2(MY_GAMES.length + COURSE_GAMES.length) },
    { label: "Posts", value: pad2(postCount) },
    { label: "Location", value: LOCATION_CODE },
    { label: "Status", value: PROFILE.openToWork ? "OPEN" : "BUSY" },
  ];

  return (
    <>
      <div
        className="flex flex-col font-display text-[clamp(18px,2.4vw,23px)] leading-[1.25] tracking-[0.06em]"
        aria-label="System header"
      >
        <span>{PROFILE.site.toUpperCase()} PERSONAL TERMINAL</span>
        <span className="text-phos-dim">
          © {COPYRIGHT_YEARS} {PROFILE.name.toUpperCase()} · ALL SYSTEMS NOMINAL
        </span>
        <span className="text-phos-dim">-SESSION 01 · GUEST ACCESS-</span>
      </div>

      <section
        aria-labelledby="hero-name"
        className="my-[30px] mb-[34px] grid grid-cols-1 items-center gap-[clamp(24px,4vw,64px)] cols:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
      >
        <div className="logo-wrap max-cols:max-w-[460px]">
          <div className="stripe-logo" role="img" aria-label="ronindev vVv logo" />
        </div>
        <div>
          <h1 id="hero-name" className="text-[clamp(64px,11vw,150px)] leading-[0.82] uppercase">
            Bekir
            <br />
            Kasan
          </h1>
          <p className="mt-4 font-display text-[clamp(24px,3vw,34px)] leading-[1.1]">
            &gt; <TypedText text={PROFILE.role.toUpperCase()} />
          </p>
          <p className="mt-1.5 text-phos-dim">Full-stack developer &amp; indie game developer</p>
          <div
            className="mt-3.5 flex flex-wrap gap-3.5 font-display text-[22px] tracking-[0.08em]"
            aria-label="Core stack"
          >
            {PROFILE.coreStack
              .map((skill) => skill.toUpperCase())
              .map((skill) => (
                <span key={skill}>
                  <span className="text-phos-dim">* </span>
                  {skill}
                </span>
              ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,64px)] split:grid-cols-[minmax(0,68ch)_minmax(0,1fr)]">
        <section className="panel" aria-labelledby="readme">
          <h2
            id="readme"
            className="border-b border-phos-faint px-3 py-0.5 text-xl tracking-[0.1em] text-phos-dim"
          >
            README.TXT
          </h2>
          <div className="flex max-w-[68ch] flex-col gap-3.5 px-3.5 py-4 [&_strong]:font-semibold">
            <p>
              Hi, I&apos;m <strong>Bekir</strong>, a <strong>Software Engineer</strong> based in{" "}
              <strong>Espoo, Finland</strong>. I&apos;m a hobbyist turned professional developer who
              enjoys all things computers and software engineering. In my most recent role, I worked
              as a Full-Stack Web Developer at Northfina Oy (Etufillari Oy), where I focused on
              building scalable web applications using Next.js, TypeScript, Node.js, and Azure Cloud
              Services.
            </p>
            <p>
              I also enjoy coding on stream, learning in public, and improving together with others.
              Alongside web development, I&apos;m interested in game development as a hobbyist and
              enjoy exploring low-level programming to better understand how software works under
              the hood.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m probably playing drums, lifting weights, or playing
              games.
            </p>
            <p>
              Currently, I am working on my personal projects and open to new opportunities and
              collaborations. If you&apos;re interested in working together or just want to say hi,
              feel free to reach out!
            </p>
          </div>
        </section>

        <aside className="flex flex-col gap-[26px]" aria-label="Quick actions">
          <div className="flex flex-col gap-2.5">
            <p className="eyebrow">Select program</p>
            <div className="flex flex-wrap items-start gap-2 split:flex-col">
              <TransitionLink href="/projects" className="cmdlink">
                &gt; VIEW PROJECTS
              </TransitionLink>
              <TransitionLink href="/cv" className="cmdlink">
                &gt; READ CV
              </TransitionLink>
              <TransitionLink href="/blogs" className="cmdlink">
                &gt; OPEN BLOG
              </TransitionLink>
              <TransitionLink href="/contact" className="cmdlink">
                &gt; GET IN TOUCH
              </TransitionLink>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="eyebrow">Channels</p>
            <SocialLinks />
          </div>
        </aside>
      </div>

      <div
        className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-6 gap-y-3.5 border-t border-phos-faint pt-3.5"
        aria-label="Summary"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-xs tracking-[0.1em] text-phos-dim uppercase">{stat.label}</span>
            <span className="font-display text-[34px] leading-none tabular-nums">{stat.value}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
