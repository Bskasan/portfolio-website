import PersonalMetaData from "@/components/pages/PersonalMetaData";
import DivisionLine from "@/components/elements/DivisionLine";
import PageWrapper from "@/components/animated/PageWrapper";

import { FiMail, FiHeart } from "react-icons/fi";

const ContactPage = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col flex-1 items-center justify-center">
        <main className="flex flex-1 w-full max-w-6xl flex-col items-start py-12 px-4 sm:px-8">
          <div className="flex mx-auto">
            <PersonalMetaData />
          </div>

          <div className="w-full mt-8 mb-2">
            <DivisionLine />
          </div>

          <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {/* Hire me */}
            <a
              href="mailto:b.kasan@hotmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-8 hover:bg-white hover:border-zinc-400 hover:shadow-sm transition-all duration-200"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-zinc-200 group-hover:border-zinc-300 transition-colors">
                <FiMail className="w-5 h-5 text-gray-500" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-gray-900">Hire me</span>
                <span className="text-sm text-gray-500">
                  Open to freelance and full-time opportunities.
                </span>
              </div>
              <span className="text-sm font-medium text-gray-400 group-hover:text-gray-900 transition-colors mt-auto">
                b.kasan@hotmail.com →
              </span>
            </a>

            {/* Sponsor me */}
            <a
              href="https://github.com/sponsors/Bskasan"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-8 hover:bg-white hover:border-zinc-400 hover:shadow-sm transition-all duration-200"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-zinc-200 group-hover:border-zinc-300 transition-colors">
                <FiHeart className="w-5 h-5 text-gray-500" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-gray-900">Sponsor me</span>
                <span className="text-sm text-gray-500">
                  Support my open-source work on GitHub.
                </span>
              </div>
              <span className="text-sm font-medium text-gray-400 group-hover:text-gray-900 transition-colors mt-auto">
                github.com/sponsors/Bskasan →
              </span>
            </a>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
};

export default ContactPage;
