import Image from "next/image";
const HomeAboutMe = () => {
  return (
    <div className="flex flex-col items-center mx-auto justify-center gap-4 max-w-3xl w-full">
      <section>
        <Image
          src="/images/developer-station.png"
          alt="Developer at workstation"
          width={200}
          height={200}
          className="rounded-full mx-auto mb-4 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40"
        />
        <h1 className="text-3xl sm:text-4xlfont-bold text-center">
          Bekir Kasan
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-center">
          Software Developer
        </h2>
        <h3 className="text-base sm:text-lg text-center">
          Full Stack Developer & Game Developer
        </h3>
        <div className="flex flex-col items-center justify-center gap-2 mt-6 sm:mt-8">
          <p className="text-sm sm:text-base text-center sm:text-left">
            Hi 👋 I'm <span className="font-bold">Bekir</span>, a{" "}
            <span className="font-bold">Software Engineer</span> based in
            <span className="font-bold"> Espoo, Finland</span>. I'm a hobbyist
            turned professional developer who enjoys all things computers and
            software engineering. In my most recent role, I worked as a
            Full-Stack Web Developer at Northfina Oy (Etufillari Oy), where I
            focused on building scalable web applications using Next.js,
            TypeScript, Node.js, and Azure Cloud Services.
          </p>
          <p className="text-sm sm:text-base text-center sm:text-left">
            I also enjoy coding on stream, learning in public, and improving
            together with others. Alongside web development, I’m interested in
            game development as a hobbyist and enjoy exploring low-level
            programming to better understand how software works under the hood.
          </p>
          <p className="text-sm sm:text-base text-center sm:text-left">
            When I’m not coding, I’m probably playing drums, lifting weights, or
            playing games.
          </p>
          <p className="text-sm sm:text-base text-center sm:text-left">
            Currently working on my own hobby project, MindBase which is a
            personal content management app that helps you save, organize, and
            schedule the articles, videos, podcasts, and other resources you
            want to consume later.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomeAboutMe;
