import HomeAboutMe from "@/components/HomeAboutMe";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-between py-12 px-4 sm:px-8 sm:py-20 lg:py-32 lg:px-16 sm:items-start">
        <HomeAboutMe />
      </main>
    </div>
  );
}
