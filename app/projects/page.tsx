"use client";

import PageWrapper from "@/components/animated/PageWrapper";
import EmptyState from "@/components/elements/EmptyState";
import ProjectModal from "@/components/modals/ProjectModal";
import PageHead from "@/components/pages/PageHead";
import CartridgeBay from "@/components/pages/CartridgeBay";

import { ProjectMetaData } from "@/lib/types/project";
import { useCallback, useState } from "react";
import { PROJECTS } from "@/constants/projects";
import { useOpenItem } from "@/hooks/useOpenItem";

const projects: ProjectMetaData[] = PROJECTS;

const ProjectsPage = () => {
  const [selected, setSelected] = useState<ProjectMetaData | null>(null);

  useOpenItem(
    useCallback((id: string) => {
      setSelected(projects.find((project) => String(project.id) === id) ?? null);
    }, []),
  );

  return (
    <PageWrapper>
      <PageHead
        eyebrow="Cartridge bay"
        title="Projects"
        readout={`${projects.length} CARTRIDGES LOADED`}
      >
        Things I&apos;ve built — side projects, tools, and experiments. You can check my GitHub page
        to see more about my projects.
      </PageHead>

      {projects.length > 0 ? (
        <CartridgeBay items={projects} slotPrefix="P" onOpen={setSelected} />
      ) : (
        <EmptyState title="NO CARTRIDGES FOUND." />
      )}

      <ProjectModal project={selected} open={selected !== null} onClose={() => setSelected(null)} />
    </PageWrapper>
  );
};

export default ProjectsPage;
