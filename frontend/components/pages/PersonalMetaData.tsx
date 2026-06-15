import Image from "next/image";
import SocialLinks from "@/components/elements/SocialLinks";

interface PersonalMetaDataProps {
  isSticky?: boolean;
}

const PersonalMetaData = ({ isSticky }: PersonalMetaDataProps) => {
  return (
    <section className={isSticky ? "lg:sticky top-8 self-start" : "self-start"}>
      <Image
        src="/images/profile-pic-bekir.jpg"
        alt="Bekir Kasan Profile Picture"
        width={200}
        height={200}
        style={{ objectFit: "cover" }}
        className="rounded-full mx-auto mb-4 w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52"
      />
      <h1 className="text-3xl sm:text-4xlfont-bold text-center font-semibold">Bekir Sadik Kasan</h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-center">Software Developer</h2>
      <p className="text-sm sm:text-base text-center sm:text-center mt-4">
        Building reliable full-stack applications with performance, accessibility, and scalability
        in mind.
      </p>
      <SocialLinks />
    </section>
  );
};

export default PersonalMetaData;
