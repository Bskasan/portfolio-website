"use client";

import DivisionLine from "@/components/elements/DivisionLine";
import Image from "next/image";
import SocialLinks from "@/components/elements/SocialLinks";
import PageWrapper from "@/components/animated/PageWrapper";
import ProjectModal from "@/components/modals/ProjectModal";

import { ThumbnailPlaceholder } from "@/components/elements/ThumbnailPlaceholder";
import { ProjectMetaData } from "@/lib/types/project";
import { useState } from "react";
import { GAMES } from "@/constants/games";

const games: ProjectMetaData[] = GAMES;

const GamesPage = () => {
  const [selected, setSelected] = useState<ProjectMetaData | null>(null);

  return (
    <PageWrapper>
      <div className="flex flex-col flex-1 items-center justify-center">
        <main className="flex flex-1 w-full max-w-6xl flex-col items-start py-12 px-4 sm:px-8">
          {/* Page Header */}
          <div className="flex flex-col items-center mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight dark:text-gray-100">
              Games
            </h1>
            <p className="mt-3 text-base text-gray-500 max-w-lg text-center dark:text-gray-400">
              Indie games, prototypes, and gameplay experiments. Visit my itch.io page to play my
              games and follow my journey as an indie game developer.
            </p>
          </div>

          <SocialLinks />

          <div className="w-full mt-8 mb-2">
            <DivisionLine />
          </div>

          {/* Game List */}
          <ul className="w-full flex flex-wrap justify-center gap-6 sm:gap-8 mt-2">
            {games.map((game) => (
              <li key={game.id} className="w-full sm:w-80">
                <button
                  type="button"
                  onClick={() => setSelected(game)}
                  className="w-full aspect-square rounded-xl overflow-hidden block group relative cursor-pointer"
                >
                  {game.thumbnail ? (
                    <Image
                      src={game.thumbnail}
                      alt={`${game.name} thumbnail`}
                      width={320}
                      loading="eager"
                      height={320}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ThumbnailPlaceholder name={game.name} />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" />
                </button>
              </li>
            ))}
          </ul>

          {/* Content */}
          <ProjectModal
            project={selected ? selected : null}
            open={selected !== null}
            onClose={() => setSelected(null)}
          />

          {games.length === 0 && (
            <div className="w-full py-20 flex flex-col items-center justify-center text-gray-400 gap-2 dark:text-gray-500">
              <p className="text-lg font-medium">No games yet.</p>
              <p className="text-sm">Check back soon.</p>
            </div>
          )}
        </main>
      </div>
    </PageWrapper>
  );
};

export default GamesPage;
