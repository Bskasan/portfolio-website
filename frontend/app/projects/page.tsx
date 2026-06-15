"use client";

import DivisionLine from "@/components/elements/DivisionLine";
import { MOCK_PROJECTS } from "@/constants/mock-projects";
import Image from "next/image";
import SocialLinks from "@/components/elements/SocialLinks";
import PageWrapper from "@/components/animated/PageWrapper";
import { ProjectMetaData } from "@/lib/types/project";
import { useState } from "react";
import { ProjectModal } from "@/components/modals/ProjectModal";

const ThumbnailPlaceholder = ({ name }: { name: string }) => (
  <div className="w-full h-full flex items-center justify-center bg-zinc-100 border border-zinc-200 rounded-xl">
    <span className="text-2xl font-bold text-zinc-300 tracking-tight select-none">
      {name.charAt(0)}
    </span>
  </div>
);

// TODO: Replace MOCK_PROJECTS with real data fetched from your API or CMS
const projects: ProjectMetaData[] = MOCK_PROJECTS;

const ProjectsPage = () => {
  const [selected, setSelected] = useState<ProjectMetaData | null>(null);

  return (
    <PageWrapper>
      <div className="flex flex-col flex-1 items-center justify-center">
        <main className="flex flex-1 w-full max-w-6xl flex-col items-start py-12 px-8">
          {/* Page Header */}
          <div className="flex flex-col items-center mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Projects</h1>
            <p className="mt-3 text-base text-gray-500 max-w-lg text-center">
              Things I've built — side projects, tools, and experiments.
            </p>
          </div>

          <SocialLinks />

          <div className="w-full mt-8 mb-2">
            <DivisionLine />
          </div>

          {/* Project List */}
          {/* TODO: Map over real fetched projects once API is connected */}
          <ul className="w-full grid grid-cols-4 gap-72">
            {projects.map((project) => (
              <li key={project.id}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-10 w-full">
                  {/* Thumbnail */}
                  <a
                    onClick={() => setSelected(project)}
                    className="shrink-0 w-full sm:w-80 h-80 rounded-xl overflow-hidden block group relative hover:cursor-pointer"
                  >
                    {project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt={`${project.name} thumbnail`}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <ThumbnailPlaceholder name={project.name} />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" />
                  </a>

                  {/* Content */}
                  <ProjectModal
                    project={selected}
                    open={selected !== null}
                    onClose={() => setSelected(null)}
                  />
                </div>
              </li>
            ))}
          </ul>

          {/* Empty State */}
          {/* TODO: Remove once real projects are loading */}
          {projects.length === 0 && (
            <div className="w-full py-20 flex flex-col items-center justify-center text-gray-400 gap-2">
              <p className="text-lg font-medium">No projects yet.</p>
              <p className="text-sm">Check back soon.</p>
            </div>
          )}
        </main>
      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
