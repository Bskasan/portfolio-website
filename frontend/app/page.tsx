import HomeAboutMe from "@/components/HomeAboutMe";

const HomePage = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-between py-12 px-4 sm:px-8 sm:py-14 lg:py-24 lg:px-12 sm:items-start">
        <HomeAboutMe />
      </main>
    </div>
  );
};

export default HomePage;
