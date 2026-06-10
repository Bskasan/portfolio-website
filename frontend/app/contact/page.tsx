import PersonalMetaData from "@/components/PersonalMetaData";

const ContactPage = () => {
  return (
    <>
      <div className="flex flex-col flex-1 items-center justify-center">
        <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-between py-32 px-16 sm:items-start">
          <PersonalMetaData />
          <section className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-12 w-full  mt-16">
            <div className="flex border-4 items-center justify-center mx-auto rounded-2xl mb-8 hover:bg-gray-100 transition-colors duration-200 cursor-pointer hover:border-gray-400">
              <a
                href="https://www.linkedin.com/in/bekirskasan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-bold p-4 "
              >
                Hire me!
              </a>
            </div>
            <div className="flex border-4 items-center justify-center mx-auto rounded-2xl mb-8 hover:bg-gray-100 transition-colors duration-200 cursor-pointer hover:border-gray-400">
              <a
                href="https://github.com/sponsors/Bskasan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-bold p-4 "
              >
                Sponsor Me!
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ContactPage;
