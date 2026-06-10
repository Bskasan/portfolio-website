import DivisionLine from "@/components/DivisionLine";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { MOCK_PROJECTS } from "@/constants/mock-projects";
import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";
import PageWrapper from "@/components/PageWrapper";

const ThumbnailPlaceholder = ({ name }: { name: string }) => (
  <div className="w-full h-full flex items-center justify-center bg-zinc-100 border border-zinc-200 rounded-xl">
    <span className="text-2xl font-bold text-zinc-300 tracking-tight select-none">
      {name.charAt(0)}
    </span>
  </div>
);

const ProjectsPage = () => {
  // TODO: Replace MOCK_PROJECTS with real data fetched from your API or CMS
  const projects = MOCK_PROJECTS;

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
          <ul className="w-full flex flex-col">
            {projects.map((project) => (
              <li key={project.id}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10 py-10 w-full">
                  {/* Thumbnail */}
                  <a
                    href={project.liveUrl}
                    target={project.liveUrl.startsWith("/") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="shrink-0 w-full sm:w-56 h-56 rounded-xl overflow-hidden block group relative"
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
                  <div className="flex flex-col flex-1 gap-3 justify-between">
                    <div className="flex flex-col gap-2">
                      {/* Status + Year */}
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                          {project.status}
                        </span>
                        <span className="text-xs text-gray-400">{project.year}</span>
                      </div>

                      {/* Title */}
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith("/") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="group w-fit"
                      >
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-gray-500 transition-colors leading-snug flex items-center gap-2">
                          {project.name}
                          <FiExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </h2>
                      </a>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium tracking-wide uppercase text-gray-400 bg-zinc-100 border border-zinc-200 rounded-full px-3 py-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-2">
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith("/") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors px-4 py-2 rounded-lg"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        Visit Site
                      </a>

                      {/* TODO: Add githubUrl to project data to show this button */}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 hover:border-gray-500 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg"
                        >
                          <FaGithub className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <DivisionLine />
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
