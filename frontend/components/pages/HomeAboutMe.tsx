import Image from "next/image";
import SocialLinks from "../elements/SocialLinks";

const HomeAboutMe = () => {
  return (
    <div className="flex items-center mx-auto justify-center gap-2 max-w-3xl w-full">
      <section>
        <Image
          src="/images/developer-station.png"
          alt="Developer at workstation"
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
        />

        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">Bekir Kasan</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-center">Software Developer</h2>
          <h3 className="text-base sm:text-lg text-center">
            Full Stack Developer & Game Developer
          </h3>
        </div>

        <SocialLinks />

        <div className="flex flex-col items-center justify-center gap-2 mt-6 sm:mt-8">
          <p className="text-sm sm:text-base text-center sm:text-left">
            Hi 👋 I'm <span className="font-bold">Bekir</span>, a{" "}
            <span className="font-bold">Software Engineer</span> based in
            <span className="font-bold"> Espoo, Finland</span>. I'm a hobbyist turned professional
            developer who enjoys all things computers and software engineering. In my most recent
            role, I worked as a Full-Stack Web Developer at Northfina Oy (Etufillari Oy), where I
            focused on building scalable web applications using Next.js, TypeScript, Node.js, and
            Azure Cloud Services.
          </p>
          <p className="text-sm sm:text-base text-center sm:text-left">
            I also enjoy coding on stream, learning in public, and improving together with others.
            Alongside web development, I’m interested in game development as a hobbyist and enjoy
            exploring low-level programming to better understand how software works under the hood.
          </p>
          <p className="text-sm sm:text-base text-center sm:text-left">
            When I’m not coding, I’m probably playing drums, lifting weights, or playing games.
          </p>
          <p className="text-sm sm:text-base text-center sm:text-left">
            Currently working on my own hobby project,
            <span>
              {" "}
              <a
                href="https://mindbase-ten.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-700 hover:underline"
              >
                MindBase
              </a>
            </span>
             which is a personal content management app that helps you save, organize, and schedule
            the articles, videos, podcasts, and other resources you want to consume later.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomeAboutMe;
