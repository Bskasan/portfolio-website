"use client";

import PageWrapper from "@/components/animated/PageWrapper";
import EmptyState from "@/components/elements/EmptyState";
import ProjectModal from "@/components/modals/ProjectModal";
import PageHead from "@/components/pages/PageHead";
import CartridgeBay from "@/components/pages/CartridgeBay";

import { ProjectMetaData } from "@/lib/types/project";
import { COURSE_GAMES, MY_GAMES } from "@/constants/games";
import { useCartridgeSelection } from "@/hooks/useCartridgeSelection";

const courseGames: ProjectMetaData[] = COURSE_GAMES;
const myGames: ProjectMetaData[] = MY_GAMES;
const allGames = [...myGames, ...courseGames];

const GamesPage = () => {
  const { selected, open, close } = useCartridgeSelection(allGames);

  return (
    <PageWrapper>
      <PageHead
        eyebrow="Cartridge bay"
        title="Games"
        readout={`${allGames.length} CARTRIDGES LOADED`}
      >
        A collection of game projects I&apos;ve developed. You can check my GitHub page to see more
        about my game projects and source code.
      </PageHead>

      {myGames.length > 0 && (
        <section aria-labelledby="my-games">
          <h2 id="my-games" className="h-sec group-title mt-2.5 mb-[18px]">
            My game projects
          </h2>
          <CartridgeBay items={myGames} slotPrefix="G" onOpen={open} />
        </section>
      )}

      {courseGames.length > 0 && (
        <section aria-labelledby="course-games">
          <h2 id="course-games" className="h-sec group-title mt-[46px] mb-[18px]">
            Course games
          </h2>
          <CartridgeBay items={courseGames} slotPrefix="C" onOpen={open} />
        </section>
      )}

      {/* Empty state: only when there are no games at all. */}
      {allGames.length === 0 && <EmptyState title="NO CARTRIDGES FOUND." />}

      <ProjectModal project={selected} open={selected !== null} onClose={close} />
    </PageWrapper>
  );
};

export default GamesPage;
