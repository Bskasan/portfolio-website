"use client";

import Image from "next/image";
import SocialLinks from "@/components/elements/SocialLinks";

import { useState } from "react";
import { PROFILE } from "@/constants/profile";

interface ProfileCardProps {
  isSticky?: boolean;
}

/*
  The About page's ID card: phosphor-tinted portrait (DECODE shows the original
  colours), name, role, tagline and social links.
*/
const ProfileCard = ({ isSticky }: ProfileCardProps) => {
  const [decoded, setDecoded] = useState(false);

  return (
    <section
      aria-labelledby="id-name"
      className={`grid grid-cols-[120px_minmax(0,1fr)] items-start gap-[18px] xs:grid-cols-[180px_minmax(0,1fr)] cols:flex cols:flex-col cols:gap-3.5 ${
        isSticky ? "cols:sticky cols:top-[calc(var(--screen-top)+var(--topbar-h)+16px)]" : ""
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
      <h1 id="id-name" className="text-title uppercase xs:text-heading">
        {PROFILE.fullName}
      </h1>
      <p className="eyebrow !text-phos">{PROFILE.role}</p>
      <p className="text-sm text-phos-dim">{PROFILE.tagline}</p>
      <SocialLinks className="col-span-2 xs:col-span-1 xs:col-start-2 cols:col-auto" />
    </section>
  );
};

export default ProfileCard;
