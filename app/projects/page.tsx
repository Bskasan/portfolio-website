"use client";

import DivisionLine from "@/components/elements/DivisionLine";
import Image from "next/image";
import SocialLinks from "@/components/elements/SocialLinks";
import PageWrapper from "@/components/animated/PageWrapper";
import ProjectModal from "@/components/modals/ProjectModal";

import { ProjectMetaData } from "@/lib/types/project";
import { useState } from "react";
import { ThumbnailPlaceholder } from "@/components/elements/ThumbnailPlaceholder";
import { PROJECTS } from "@/constants/projects";

const projects: ProjectMetaData[] = PROJECTS;

const ProjectsPage = () => {
  const [selected, setSelected] = useState<ProjectMetaData | null>(null);

  return (
    <PageWrapper>
      <div className="flex flex-col flex-1 items-center justify-center">
        <main className="flex flex-1 w-full max-w-6xl flex-col items-start py-12 px-4 sm:px-8">
          {/* Page Header */}
          <div className="flex flex-col items-center mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Projects</h1>
            <p className="mt-3 text-base text-gray-500 max-w-lg text-center">
              Things I&apos;ve built — side projects, tools, and experiments. You can check my
              github page to see more about my projects.
            </p>
          </div>

          <SocialLinks />

          <div className="w-full mt-8 mb-2">
            <DivisionLine />
          </div>

          {/* Project List */}
          {/* TODO: Map over real fetched projects once API is connected */}
          <ul className="w-full flex flex-wrap justify-center gap-6 sm:gap-8 mt-2">
            {projects.map((project) => (
              <li key={project.id} className="w-full sm:w-80">
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="w-full aspect-square rounded-xl overflow-hidden block group relative cursor-pointer"
                >
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={`${project.name} thumbnail`}
                      width={320}
                      loading="eager"
                      height={320}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ThumbnailPlaceholder name={project.name} />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" />
                </button>
              </li>
            ))}
          </ul>

          {/* Content */}
          <ProjectModal
            project={selected}
            open={selected !== null}
            onClose={() => setSelected(null)}
          />

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
