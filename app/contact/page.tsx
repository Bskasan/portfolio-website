import PageWrapper from "@/components/animated/PageWrapper";
import PageHead from "@/components/pages/PageHead";
import SocialLinks from "@/components/elements/SocialLinks";
import CopyButton from "@/components/elements/CopyButton";

import { PROFILE } from "@/constants/profile";

const EMAIL = "b.kasan@hotmail.com";

const ContactPage = () => {
  return (
    <PageWrapper>
      <PageHead eyebrow="Open channel" title="Contact">
        {PROFILE.tagline} Pick a command below.
      </PageHead>

      <div className="grid grid-cols-1 gap-[22px] frame:grid-cols-2">
        {/* Hire me */}
        <section aria-labelledby="hire" className="shell-panel">
          <h2 id="hire" className="text-[28px] leading-[1.1]">
            <span className="mr-2 text-phos-dim">$</span>hire --email
          </h2>
          <p className="text-phos-dim">Open to freelance and full-time opportunities.</p>
          <p id="contact-email" className="text-[17px] font-semibold [overflow-wrap:anywhere]">
            {EMAIL}
          </p>
          <div className="mt-auto flex flex-wrap gap-2.5">
            <CopyButton value={EMAIL} label="COPY ADDRESS" fallbackTargetId="contact-email">
              <a href={`mailto:${EMAIL}`} className="cmdlink">
                [ OPEN MAIL APP ]
              </a>
            </CopyButton>
          </div>
        </section>

        {/* Sponsor me */}
        <section aria-labelledby="sponsor" className="shell-panel">
          <h2 id="sponsor" className="text-[28px] leading-[1.1]">
            <span className="mr-2 text-phos-dim">$</span>sponsor --github
          </h2>
          <p className="text-phos-dim">Support my open-source work on GitHub.</p>
          <p className="text-[17px] font-semibold [overflow-wrap:anywhere]">
            github.com/sponsors/Bskasan
          </p>
          <div className="mt-auto flex flex-wrap gap-2.5">
            <a
              href="https://github.com/sponsors/Bskasan"
              target="_blank"
              rel="noopener noreferrer"
              className="cmdlink is-solid"
            >
              [ OPEN SPONSORS ↗ ]
            </a>
          </div>
        </section>
      </div>

      <section aria-labelledby="channels" className="mt-10">
        <h2 id="channels" className="h-sec group-title mb-[18px]">
          Channels
        </h2>
        <SocialLinks />
      </section>
    </PageWrapper>
  );
};

export default ContactPage;
