"use client";

import Image from "next/image";
import SocialLinks from "@/components/elements/SocialLinks";

import { useState } from "react";

interface PersonalMetaDataProps {
  isSticky?: boolean;
}

/*
  The About page's ID card: phosphor-tinted portrait (DECODE shows the original
  colours), name, role, tagline and social links.
*/
const PersonalMetaData = ({ isSticky }: PersonalMetaDataProps) => {
  const [decoded, setDecoded] = useState(false);

  return (
    <section
      aria-labelledby="id-name"
      className={`grid grid-cols-[120px_minmax(0,1fr)] items-start gap-[18px] min-[481px]:grid-cols-[180px_minmax(0,1fr)] min-[900px]:flex min-[900px]:flex-col min-[900px]:gap-3.5 ${
        isSticky ? "min-[900px]:sticky min-[900px]:top-[calc(var(--screen-top)+110px)]" : ""
      } self-start`}
    >
      <div className="row-span-4 flex flex-col gap-1.5">
        <div
          className={`tint aspect-[3/4] max-w-full border border-phos-faint ${decoded ? "is-decoded" : ""}`}
        >
          <Image
            src="/images/profile-pic-bekir.jpg"
            alt="Bekir Kasan Profile Picture"
            width={600}
            height={800}
            priority
            sizes="(max-width: 480px) 120px, (max-width: 899px) 180px, 300px"
          />
        </div>
        <div className="flex justify-between font-display text-lg tracking-[0.08em] text-phos-dim">
          <span>IMG 01</span>
          <button
            type="button"
            aria-pressed={decoded}
            onClick={() => setDecoded((value) => !value)}
            className="font-display text-lg tracking-[0.08em] text-phos underline underline-offset-[3px]"
          >
            {decoded ? "ENCODE" : "DECODE"}
          </button>
        </div>
      </div>
      <h1 id="id-name" className="text-[32px] uppercase min-[481px]:text-[40px]">
        Bekir Sadik Kasan
      </h1>
      <p className="eyebrow !text-phos">Software Developer</p>
      <p className="text-sm text-phos-dim">
        Building reliable full-stack applications with performance, accessibility, and scalability
        in mind.
      </p>
      <SocialLinks className="col-span-2 min-[481px]:col-span-1 min-[481px]:col-start-2 min-[900px]:col-auto" />
    </section>
  );
};

export default PersonalMetaData;
